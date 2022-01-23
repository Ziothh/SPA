import AppContextProvider from "./context/appContext"
import AppLayout from "./layouts/AppLayout"
import PageRoutes from "./pages"

import "./scss/main.scss"



const App: React.FC = () => {

    return (
        <AppContextProvider>
            <PageRoutes/>
        </AppContextProvider>
    )
}


export default App