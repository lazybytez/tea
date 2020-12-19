import { TmpYmlJson } from "./TemporaryYmlJson";

export interface JsonCache {
    date: Date,
    cache: CacheObject
}

export interface CacheObject {
    [key: string]: TmpYmlJson
}
