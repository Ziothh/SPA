import MyComponent from "@components/MyComponent"
import { ThemeProvider } from "./context/ThemeContext"

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <div>
                <h1>REact code </h1>
                <MyComponent/>
            </div>
        </ThemeProvider>
    )
}


export default App