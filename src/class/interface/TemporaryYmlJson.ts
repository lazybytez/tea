export interface TmpYmlJson {
    name: string,
    prefix: string,
    commands: CommandCollection,
}

export interface CommandCollection {
    namespaces: NamespaceCollection[]
}

export interface NamespaceCollection {
    namespaces?: NamespaceCollection[],
    commands: Command[]
}

export interface Command {
    help?: string,
    run: string
}
