import { ExecutedCommand } from "./interface/ExecutedCommand";

export default class Tea {

    constructor() {
        this.main();
    }

    /**
     * The main function which executes all other functions
     */
    private main(): void {
        const args: object = this.getArgs();
        console.log(args);
    }

    /**
     * This returns the parsed command line arguments
     */
    private getArgs(): object {
        const args: string[] = process.argv;
        const array = args.slice(2);

        const parsedArray: ExecutedCommand = {
            cmd: [],
            options: []
        };

        // pnpm run build && chmod +x dist/src/index.js && ./dist/src/index.js test test:test --test a -test 22

        array.forEach(element => {
            const splitArray = element.split(":");

            splitArray.forEach(k => {
                if (k.startsWith("-") || k.startsWith("--")) {
                    // parsedArray.options.push(k);
                    parsedArray.options.push(k);
                } else {
                    parsedArray.cmd.push(k);
                }
            });
        });

        return parsedArray;
    }
}
