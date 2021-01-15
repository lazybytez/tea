import { green, red, yellow } from "chalk";
import { CliArguments, OptionCollection } from "./interface/CliArguments";
import { JsonCache } from "./interface/JsonCache";
import Teapot from "./Teapot";

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
        if (!args.cmd[0]) {
            const globalCacheIndex: string[] = <string[]>this.getCache("global", true);
            const localCacheIndex: string[] = <string[]>this.getCache("local", true);

            // Get global and local namespaces
            console.log(red("\nPlease enter a namespace you want to access!"));
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
            console.log("\n");
        }

        // tea init:example:commands
        if (args.cmd[0] == "init" && args.cmd[1] == "example" && args.cmd[2] == "commands") {
            const cacher = new Teapot();
            cacher.writeCache(__dirname + "/../../example/brew.tea.yml");

            console.log(green("\nExample commands successfully created!\n"));
        } else if (args.cmd[0]) {
            const cacheLocal: JsonCache = <JsonCache>this.getCache("global", false);
            const currentNamespace: string = args.cmd[0].toLowerCase();
            const tmpCacheIndex = cacheLocal.cache[currentNamespace];

            for (let i = 0; i < args.cmd.length; i++) {
                console.log(args.cmd[i]);
                // tmpCacheIndex[args.cmd[j]];
                // if (tmpCacheIndex.namespaces) {
                //     console.log(tmpCacheIndex.namespaces);
                // }

                // if (obj.help) {
                //     console.log(obj.help);
                // }
            }

            console.log(tmpCacheIndex.namespaces["cache"]);

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
            cmd: [],
            options: []
        };

        array.forEach(element => {
            element.split(":").forEach(element => {
                rawArray.push(element);
            });
        });

        for (let i = 0; i < rawArray.length; i++) {
            const e: string = rawArray[i];

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

                const options: OptionCollection = {
                    option: e,
                    value: optionValue
                };

                parsedArray["options"].push(options);
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
