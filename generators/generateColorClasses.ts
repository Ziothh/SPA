import * as fs from "fs"


const generateColorClasses = (...colors: string[]) => {
    const categories = ["text", "background"] as const

    const generated = categories.map(category => [
            `// ${category}`,
            colors.map(color => [
                `.${category}-${color} {`,
                `    ${category === "background" ? "background" : "color"}: var(--clr-${color});`,
                "}"
            ].join("\n")).join("\n"),
            ""
        ].join("\n")
    ).join("\n")

    // styles.innerHTML = colors.map(color => categories.map(
    //         category => `
    //             .${category}-${color} {
    //                 ${category === "background" ? "background" : "color"}: var(--clr-${color});
    //             }
    //         `
    //     ).join("\n")
    // ).join("\n")

    // document.head.appendChild(
    //     styles
    // )
    if (! fs.existsSync("./generated")) fs.mkdirSync("./generated")
    fs.writeFileSync("./generated/colorClasses.scss", generated)
}

generateColorClasses("primary", "white", "black")