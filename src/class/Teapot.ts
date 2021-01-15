import { red } from "chalk";
import { existsSync, writeFileSync, mkdirSync, readFileSync } from "fs";
import { JsonCache } from "./interface/JsonCache";
import { safeLoad } from "js-yaml";
import { TmpYmlJson } from "./interface/TemporaryYmlJson";
import hash from "object-hash";
import path from "path";

export default class Teapot {

    _cacheCode: string = "global"

    public get cacheCode(): string {
        return this._cacheCode;
    }

    public set cacheCode(cacheCode: string) {
        this._cacheCode = cacheCode;
    }

    _homeDir = require("os").homedir();

    public get homeDir(): string {
        return this._homeDir;
    }

    _cachePath = path.join(this.homeDir, ".tea");

    public get cachePath(): string {
        return this._cachePath;
    }

    constructor() {
    }

    /**
     * This generates cache
     */
    public writeCache(toCacheFile: string) {
        const cacheName: string = this.cacheCode + ".json";
        const cacheFile: string = path.join(this.cachePath, cacheName);

        if (!existsSync(cacheFile)) {
            const jsonContent: JsonCache = {
                "date": new Date,
                "cache": {}
            };
            console.log(red("\nCache file doesnt exist yet and will be created!\n"));
            this.jsonCreate(this.cachePath, cacheFile, jsonContent);
        }

        const jsonFile: TmpYmlJson = <TmpYmlJson> this.ymlToJson(toCacheFile);
        const cacheNamespace: string = jsonFile.prefix.toLowerCase();
        const jsonName: string = cacheNamespace;
        const obj = this.jsonRead(cacheFile);

        // this.transformCache();

        obj.cache[jsonName] = jsonFile;
        obj.cache[jsonName].hash = hash(jsonFile);
        this.jsonWrite(cacheFile, obj);

    }

    /**
     * This reads the generated cache
     */
    public readCache(tmpCacheCode: string) {
        const tmpJsonFile = path.join(this.cachePath, tmpCacheCode + ".json");

        if (!existsSync(tmpJsonFile)) {
            const jsonContent: JsonCache = {
                "date": new Date,
                "cache": {}
            };
            this.jsonCreate(this.cachePath, tmpJsonFile, jsonContent);
        }

        const parsedCache = this.jsonRead(tmpJsonFile);
        return parsedCache;
    }

    /**
     * Creates json files
     */
    public jsonCreate(jsonPath: string, jsonFilePath: string, jsonContent: JsonCache) {
        if (!existsSync(jsonPath)) {
            mkdirSync(jsonPath, { recursive: true });
        }
        this.jsonWrite(jsonFilePath, jsonContent);
    }

    /**
     * Writes json files
     */
    public jsonWrite(jsonFilePath: string, jsonContent: unknown) {
        writeFileSync(jsonFilePath, JSON.stringify( jsonContent, null, 2), "utf8");
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
