import nodefetch from "node-fetch";
import dns from "dns";
import { yellow, white, magenta, red, green } from "chalk";

export default class UpdateChecker {

    _url: any

    constructor() {
    }

    set url(url: any) {
        this._url = url;
    }

    get url() {
        return this._url;
    }

    checkForUpdates() {
        /* set variables */
        let remoteversion = this.url;
        console.log(remoteversion);
        let currentversion = require("../../package.json");

        /* execute function */
        dns.lookupService("8.8.8.8", 53, function(err: any){
            if (err) {
                console.log(red("\n\nNo internet connection. Continuing without checking for updates.\n\n"));
            } else {
                nodefetch(remoteversion)
                    .then((res: { json: () => any; }) => res.json())
                    .then((data: any) => {
                        remoteversion = data.version;
                        currentversion = currentversion.version;
                        const RV = remoteversion;
                        const CV = currentversion;
                        if (CV < RV) {
                            console.log("\n\n" +
                            yellow("╭────────────────────────────────────────────────────────────────╮") + "\n" +
                            yellow("│                                                                │") + "\n" +
                            yellow("│            " + white("New Tea version available! " + red(currentversion) + " → " + green(remoteversion) + " ") + "           │") + "\n" +
                            yellow("│                                                                │") + "\n" +
                            yellow("│             " + white("Run " + magenta("npm i -g @lazybytez/tea") + " to update!") + "             │") + "\n" +
                            yellow("│                                                                │") + "\n" +
                            yellow("╰────────────────────────────────────────────────────────────────╯") + "\n\n");
                        }
                    });
            }
        });
    }
}
