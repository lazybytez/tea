import { green, red, yellow } from "chalk";
import { CliArguments } from "./interface/CliArguments";
import { JsonCache } from "./interface/JsonCache";
import Teapot from "./Teapot";
import { execSync } from "child_process";
import { Command, CommandCollection } from "./interface/TemporaryYmlJson";

export default class Tea {

    _cwd = process.cwd();

    public get cwd(): string {
        return this._cwd;
    }

    constructor() {
        this.main();
    }

    /**
     * The main function which executes all other functions
     */
    private main(): void {
        const args: CliArguments = this.getArgs();

        // tea
        if (!args.namespace) {
            const globalCacheIndex: string[] = <string[]>this.getCache("global", true);
            const localCacheIndex: string[] = <string[]>this.getCache("local", true);

            // Get global and local namespaces
            console.log(red("\nPlease enter a namespace you want to access!"));
            console.log(green("If you want some test commands you can run: ") + yellow("tea init:example:commands"));
            console.log(yellow("\nGlobal Namespaces:"));
            for (let i = 0; i < globalCacheIndex.length; i++) {
                const e = globalCacheIndex[i];
                console.log(green("    " + e.charAt(0).toUpperCase() + e.slice(1)));
            }
            console.log(yellow("\nLocal Namespaces:"));
            for (let i = 0; i < localCacheIndex.length; i++) {
                const e = localCacheIndex[i];
                console.log(green("    " + e.charAt(0).toUpperCase() + e.slice(1)));
            }
            console.log();
        }

        // tea init:example:commands
        if (args.namespace == "init" && args.cmd[0] == "example" && args.cmd[1] == "commands") {
            const cacher = new Teapot();
            cacher.writeCache(__dirname + "/../../example/brew.tea.yml");

            console.log(green("\nExample commands successfully created!\n"));
        } else if (args.namespace) {
            // if there is a namespace given, select current namespace
            const cacheLocal: JsonCache = <JsonCache>this.getCache("global", false);
            const currentNamespace: string = args.namespace.toLowerCase();

            if (cacheLocal.cache[currentNamespace]) {
                let tmpCacheIndex: CommandCollection|Command = cacheLocal.cache[currentNamespace].commands;

                // for every cmd in args go deeper in the cache file
                for (let i = 0; i < args.cmd.length; i++) {
                    const cmdarg = args.cmd[i];

                    tmpCacheIndex = <CommandCollection>tmpCacheIndex[cmdarg];
                }

                // get sub commands
                try {
                    if (!tmpCacheIndex.help) {
                        const commands: string[] = Object.getOwnPropertyNames(tmpCacheIndex);
                        console.log(yellow("\nAvailable subcommands:"));
                        for (let i = 0; i < commands.length; i++) {
                            const e = commands[i];
                            console.log(green("    " + e));
                        }
                        console.log();
                    } else if (tmpCacheIndex.help && args.options["help"]) {
                        console.log(yellow("\nWhat this command does:"));
                        console.log(green(tmpCacheIndex.help));
                        console.log();
                    } else if (tmpCacheIndex.run && !args.options["help"]) {
                        console.log(green("\n" + execSync((<Command><unknown>tmpCacheIndex).run).toString()));
                    }
                } catch (err) {
                    console.log(red("\nThere is no such subcommand!\n"));
                }
            } else {
                console.log("\n" + red("There is no such command or namespace as: ") + currentNamespace + "\n");
            }
        }
    }

    /**
     * This returns the parsed command line arguments
     */
    private getArgs(): CliArguments {
        // example: chmod +x dist/index.js && ./dist/index.js math do:example -n 42 --force
        const args: string[] = process.argv;
        const array = args.slice(2);

        const rawArray: string[] = [];

        const parsedArray: CliArguments = {
            namespace: "",
            cmd: [],
            options: {}
        };

        array.forEach(element => {
            element.split(":").forEach(element => {
                rawArray.push(element);
            });
        });

        for (let i = 0; i < rawArray.length; i++) {
            let e: string = rawArray[i];

            if (e.startsWith("-") || e.startsWith("--")) {
                let j = i;
                const futureArray: string = rawArray[++j];
                let optionValue: unknown = "none";

                if (j !== rawArray.length) {
                    if (!futureArray.startsWith("-") && !futureArray.startsWith("--")) {
                        i++;
                        optionValue = futureArray;
                    }
                }

                if (e.startsWith("-") && !e.startsWith("--")) {
                    e = e.substring(1);
                } else if (e.startsWith("--")) {
                    e = e.substring(2);
                }

                parsedArray["options"][e] = optionValue;
            } else if (i == 0) {
                parsedArray["namespace"] = e;
            } else {
                parsedArray["cmd"].push(e);
            }
        }

        return parsedArray;
    }

    /**
     * Get cache
     */
    private getCache(cacheCode: string, onlyIndex: boolean) {
        const cacher = new Teapot();
        const data = cacher.readCache(cacheCode);

        let output: string[]|JsonCache = data;

        if (onlyIndex) {
            output = Object.getOwnPropertyNames(data.cache);
        }

        return output;
    }
}
