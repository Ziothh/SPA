import { Route,  Routes } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"
import Dashboard from "./Dashboard"
import ExpenseTracker from "./ExpenseTracker"

import Page404 from "./Page404"


const PageRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path="/"  element={<Dashboard/>} />
                <Route path="/expense"  element={<ExpenseTracker/>} />
                <Route path="/other" element={<h1>other</h1>} />
            </Route>
            <Route path="/*" element={<Page404/>}/>
        </Routes>
    )
}


export default PageRoutes