export interface CliArguments {
    namespace: string,
    cmd: string[],
    options: OptionCollection
}

export interface OptionCollection {
    [key: string]: unknown,
}
