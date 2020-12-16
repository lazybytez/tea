import nodefetch from "node-fetch";
import { yellow, white, magenta, red, green } from "chalk";
import fs from "fs";

/**
 * Compare your current version with the newest version in the GitHub repo.
 */
export default class UpdateChecker {

    private _url: string

    constructor(url: string) {
        this._url = url;
    }

    public get url(): string {
        return this._url;
    }

    /**
     * If there is a connection to the internet check if update is available.
     */
    public checkForUpdates(): void {
        /* set variables */
        const remoteVersion: string = this.url;
        const self = this;

        const version = self.getLocalVersion();

        /* execute function */
        nodefetch(remoteVersion)
            .then((response) => { return response.json(); })
            // .then((res: { json: () => any; }) => res.json())
            .then((data) => {
                const versionLocal: number = self.normalizeVersion(version);
                const versionOnline: number = self.normalizeVersion(data.version);

                console.log(versionLocal);
                console.log(versionOnline);
                if (versionLocal < versionOnline) {
                    console.log("\n\n" +
                        yellow("╭" + "─".repeat(64) + "╮") + "\n" +
                        yellow("│" + " ".repeat(64) + "│") + "\n" +
                        yellow("│" + self.evalStrCenter(version, data.version) + "│") + "\n" +
                        yellow("│" + " ".repeat(64) + "│") + "\n" +
                        yellow("│" + " ".repeat(17)  + white("Run " + magenta("npm i -g teabrew") + " to update!")
                        + " ".repeat(16) + "│") + "\n" +
                        yellow("│" + " ".repeat(64) + "│") + "\n" +
                        yellow("╰" + "─".repeat(64) + "╯") + "\n\n");
                }
            })
            .catch((err) => {
                console.log(err);
                console.log(red("\n\nNo internet connection. Continuing without checking for updates.\n\n"));
            });
    }

    /**
     * Center text so right and left is space until the box ends
     */
    private evalStrCenter(currentVersion: string, remoteVersion: number): string {
        /* set variables */
        let colorText: string = white("New Tea version available! " + red(currentVersion) + " → "
        + green(remoteVersion));
        const plainText: string = "New Tea version available! " + currentVersion + remoteVersion;
        const stringLength: number = plainText.length;
        const lineLength: number = 64;

        /* calculate */
        if (stringLength < lineLength) {
            if (stringLength % 2 === 0) {
                const diffLength = (lineLength - stringLength) / 2;
                colorText = " ".repeat(diffLength - 1) + colorText + " ".repeat(diffLength - 2);
            }
            if (stringLength % 2 !== 0) {
                const diffLength = (lineLength - stringLength + 1) / 2;
                colorText = " ".repeat(diffLength - 2) + colorText + " ".repeat(diffLength - 2);
            }
        }
        return colorText;
    }

    /**
     * Get a unified number fron the versions
     */
    private normalizeVersion(version: string): number {
        return parseInt((version.match(/\d+/g) ?? ["0"]).join(""));
    }

    /**
     * Gets current version
     */
    private getLocalVersion(): string {
        const fullpath = __dirname + "/../../package.json";

        const rawdata = fs.readFileSync(fullpath, {encoding: "utf8"});
        const test = JSON.parse(rawdata);

        return test.version;
    }
}
