import { CliArguments, OptionCollection } from "./interface/CliArguments";
// import Teapot from "./Teapot";

export default class Tea {

    constructor() {
        this.main();
    }

    /**
     * The main function which executes all other functions
     */
    private main(): void {
        const args: CliArguments = this.getArgs();
        console.log(args);

        // const data = this.getCache();
        // console.log(data);
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
    // private getCache() {
    //     const cacher = new Teapot();
    //     cacher.cacheCode = "ExampleCommands";
    //     const data = cacher.readCache();
    //     return data.cache;
    // }
}
