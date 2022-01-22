namespace useDate {
    export const toNiceText = (dateString: string) => new Date(dateString).toUTCString().split(" ").slice(0,4).join(" ")
}



export default useDate