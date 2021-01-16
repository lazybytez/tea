export interface TmpYmlJson {
    hash: string,
    name: string,
    prefix: string,
    commands: CommandCollection,
}

export interface CommandCollection {
    [key: string]: CommandCollection|Command
}

export interface Command {
    help?: string,
    arguments: CommandArugments,
    run: string
}

export interface CommandArugments {
    alias: string[],
    required?: boolean,
    type: string,
    standard: unknown
}
