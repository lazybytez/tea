import { red } from "chalk";
import { existsSync, writeFile, mkdirSync, readFileSync } from "fs";
import { JsonCache } from "./interface/JsonCache";
import { safeLoad } from "js-yaml";
import { TmpYmlJson } from "./interface/TemporaryYmlJson";
// import hash from "object-hash";

export default class Teapot {

    private _toCacheFile: string

    public get toCacheFile(): string {
        return this._toCacheFile;
    }

    private _cacheCode: string

    public get cacheCode(): string {
        return this._cacheCode;
    }

    constructor(toCacheFile: string, cacheCode: string) {
        this._toCacheFile = toCacheFile;
        this._cacheCode = cacheCode;
        this.validCache();
    }

    /**
     * This generates cache of an example file
     */
    public validCache() {
        /**
         * 1 Look if cache fily by cache code already exists
         * 2 If not create it
         * 3 Make yml from toCacheFile to json
         * 4 Get json data and insert into cache
         */
        const cachePath: string = __dirname + "/../../.cache/";
        const cacheName: string = this.cacheCode + ".json";
        const cacheFile: string = cachePath + cacheName;

        //const datetime = new Date();

        // "hash(this.jsonRead(this.toCacheFile))"

        if (existsSync(cacheFile)) {
            console.log(red("\nCache file doesnt exist yet and will be created!\n"));

            const jsonContent: JsonCache = {
                "date": new Date,
                "cache": []
            };

            const jsonFile: TmpYmlJson = <TmpYmlJson> this.ymlToJson(this.toCacheFile);
            jsonContent.cache.push(jsonFile);

            this.jsonCreate(cachePath, cacheFile, jsonContent);
        }

        // if (!this.getFileBuffer().equals(this.getCacheBuffer(cacheFile))) {
        //     console.log("Files are not same!");
        // } else {
        //     console.log("Files are same!");
        // }

        // const fileBuffer = readFileSync(this.toCacheFile);
        // const cacheBuffer = readFileSync(this.toCacheFile);

        // const content: LooseObject = {};
        // content["hash"] = fileBuffer;
        // content["content"] = [];

        // if (fileBuffer.equals(cacheBuffer)) {
        //     console.log("File did not change!");
        //     console.log(this.toCacheFile);
        // } else {
        //     this.jsonWrite(cacheFile, content);
        // }

        // // Just get the name of the file
        // glob(this.toCacheFile, function (err: unknown, files: string[]) {
        //     if (err) console.log(err);
        //     files.forEach(e => {
        //         const filename = path.basename(e, ".tea.yml");
        //         filename;
        //     });
        // });
    }

    /**
     * Creates json files
     */
    public jsonCreate(jsonPath: string, jsonFilePath: string, jsonContent: unknown) {
        if (!existsSync(jsonPath)) {
            mkdirSync(jsonPath, { recursive: true });
        }
        writeFile(jsonFilePath, JSON.stringify( jsonContent, null, 4), "utf8", (err: unknown) => {
            if(err) console.log(err);
        });
    }

    /**
     * Writes json files
     */
    public jsonWrite(jsonFilePath: string, jsonContent: unknown) {
        writeFile(jsonFilePath, JSON.stringify( jsonContent, null, 4), "utf8", (err: unknown) => {
            if(err) console.log(err);
        });
    }

    /**
     * Reads json files
     */
    public jsonRead(jsonFile: string): JsonCache {
        const jsonData = JSON.parse(readFileSync(jsonFile, "utf8"));
        return jsonData;
    }

    /**
     * Gets Buffer from file wich will be cached
     */
    public getFileBuffer(): Buffer {
        return readFileSync(this.toCacheFile);
    }

    /**
     * Gets Buffer from already cached file
     */
    public getCacheBuffer(cacheFile: string): Buffer {
        const buffer: Buffer = Buffer.from(this.jsonRead(cacheFile));
        return buffer;
    }

    /**
     * Makes yml to json
     */
    public ymlToJson(ymlFile: string): object {
        const jsonFile = safeLoad(readFileSync(ymlFile, "utf8"));
        return <object> jsonFile;
    }
}
