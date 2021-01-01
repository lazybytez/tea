export interface CliArguments {
    cmd: string[],
    options: OptionCollection[]
}

export interface OptionCollection {
    option: string,
    value?: unknown
}
