import { createTheme } from "@mui/material";
import React, { createContext } from "react";
import { contextFactory, useToggle } from "../hooks";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#222"
        }

    }
})

export const [ThemeProvider, useThemeContext] = contextFactory(() => {
    const [darkMode, toggleDarkMode] = useToggle(true)


    return {
        darkMode,
        toggleDarkMode
    }
})


// interface ThemeContext {
//     darkMode: boolean
//     toggleDarkMode: () => void
// }

// export const themeContext = createContext<ThemeContext>(null!)

// export const ThemeProvider: React.FC = ({children}) => {
//     const [darkMode, toggleDarkMode] = useToggle(true)

//     const value = {
//         darkMode,
//         toggleDarkMode
//     } as const


//     return (
//         <themeContext.Provider value={value}>
//             {children}
//         </themeContext.Provider>
//     )
// }