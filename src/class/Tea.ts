import { ExecutedCommand } from "./interface/ExecutedCommand";
import { LooseObject } from "./interface/LooseObject";

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
        // example: pnpm run build && chmod +x dist/src/index.js && ./dist/src/index.js test test:test --test a -test 22
        const args: string[] = process.argv;
        const array = args.slice(2);

        const rawArray: string[] = [];

        const parsedArray: ExecutedCommand = {
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
                parsedArray.options.push(e);
            } else {
                parsedArray.cmd.push(e);
            }
        }

        const obj: LooseObject = {};
        obj["value"] = 22;

        return obj;
    }
}