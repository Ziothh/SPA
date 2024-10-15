export namespace std {
    export namespace String {
        export function toTitle(string: string) {
            return string
                .split(" ")
                .flatMap((x) => x.split("_"))
                .map((x) => `${x[0]?.toUpperCase()}${x.slice(1).toLowerCase()}`)
                .join(" ");
        }
    }
}
