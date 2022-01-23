import React, { createContext, useContext, useMemo } from "react";
import { useToggle } from "../hooks";



interface AppThemeContext {
    darkMode: boolean
    toggleDarkMode: (newValue?: boolean) => void
}

const appThemeCtx = createContext<AppThemeContext>(null!)

export const useAppTheme = () => useContext(appThemeCtx)

const AppThemeProvider: React.FC = ({children}) => {
    //useMediaQuery('(prefers-color-scheme: dark)')
    const [darkMode, toggleDarkMode] = useToggle(true) 
    
    return (
        <appThemeCtx.Provider value={{
            darkMode,
            toggleDarkMode
        }}>
                {children}
        </appThemeCtx.Provider>
    )
}

export default AppThemeProvider