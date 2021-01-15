export interface TmpYmlJson {
    hash: string,
    name: string,
    prefix: string,
    namespaces: NamespaceCollection,
}

export interface NamespaceCollection {
    [key: string]: NamespaceCollection|Command
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
