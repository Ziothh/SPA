import AppThemeProvider from "./themeContext"

const AppContextProvider: React.FC = ({children}) => {
    return (
        <AppThemeProvider>
            {children}
        </AppThemeProvider>
    )
}


export default AppContextProvider