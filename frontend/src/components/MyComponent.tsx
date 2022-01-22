import { useThemeContext } from "../context/ThemeContext"

interface Props {
    
}


const MyComponent: React.FC<Props> = ({}) => {
    const themeCtx = useThemeContext()
    console.log(themeCtx);
    return (
        <div>
            <h2>This is a component</h2>
            <p>The theme context is currently set to {themeCtx.darkMode ? "true" : "false"}</p>

            <button onClick={() => themeCtx.toggleDarkMode()}>Click me to toggle the theme</button>
        </div>
    )
}


export default MyComponent