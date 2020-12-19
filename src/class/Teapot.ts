import { red } from "chalk";
import { existsSync, writeFile, mkdirSync, readFileSync } from "fs";
import { JsonCache } from "./interface/JsonCache";
import { safeLoad } from "js-yaml";
import { TmpYmlJson } from "./interface/TemporaryYmlJson";
import hash from "object-hash";

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
        const cachePath: string = __dirname + "/../../.cache/";
        const cacheName: string = this.cacheCode + ".json";
        const cacheFile: string = cachePath + cacheName;

        const self = this;

        if (!existsSync(cacheFile)) {
            const jsonContent: JsonCache = {
                "date": new Date,
                "cache": {}
            };
            console.log(red("\nCache file doesnt exist yet and will be created!\n"));
            this.jsonCreate(cachePath, cacheFile, jsonContent);
        }

        const jsonFile: TmpYmlJson = <TmpYmlJson> this.ymlToJson(this.toCacheFile);

        if (!this.jsonRead(cacheFile).cache[cacheFile]
            || hash(jsonFile) !== this.jsonRead(cacheFile).cache[cacheFile].hash) {
            const obj = this.jsonRead(cacheFile);
            obj.cache[cacheFile] = jsonFile;
            obj.cache[cacheFile].hash = hash(jsonFile);
            self.jsonWrite(cacheFile, obj);
        }
    }

    /**
     * Creates json files
     */
    public jsonCreate(jsonPath: string, jsonFilePath: string, jsonContent: unknown) {
        if (!existsSync(jsonPath)) {
            mkdirSync(jsonPath, { recursive: true });
        }
        writeFile(jsonFilePath, JSON.stringify( jsonContent, null, 2), "utf8", (err: unknown) => {
            if(err) console.log(err);
        });
    }

    /**
     * Writes json files
     */
    public jsonWrite(jsonFilePath: string, jsonContent: unknown) {
        writeFile(jsonFilePath, JSON.stringify( jsonContent, null, 2), "utf8", (err: unknown) => {
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
     * Converts yml to json
     */
    public ymlToJson(ymlFile: string): object {
        const jsonFile = safeLoad(readFileSync(ymlFile, "utf8"));
        return <object> jsonFile;
    }
}
