export interface CacheFile {
    date: Date,
    cache: CommandCache
}

export interface CommandCache {
    [key: string]: TestCache
}

export interface TestCache {
    hash: string,
    name: string,
    prefix: string,
    namespaces: NamespaceCollection,
}

export interface NamespaceCollection {
    namespaces?: NamespaceCollection[],
    commands: Command[]
}

export interface Command {
    help?: string,
    arguments: CommandArugments[],
    run: string
}

export interface CommandArugments {
    alias: string[],
    required?: boolean,
    type: string,
    standard: unknown
}
