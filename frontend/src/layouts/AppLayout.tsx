import { BsFillGrid1X2Fill } from "react-icons/bs";
import { BsCalendarFill } from "react-icons/bs";
import { BsBarChartFill } from "react-icons/bs";
import { HiAdjustments } from "react-icons/hi";
import { SiCashapp } from "react-icons/si";
import { CgGoogleTasks } from "react-icons/cg";

import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const AppLayout: React.FC = ({children}) => {
    return (
        <div id="app">
            <Navbar
                links={[
                    {
                        title: "Dashboard",
                        href: "/",
                        icon: <BsFillGrid1X2Fill/>
                    },
                    {
                        title: "Charts",
                        href: "/charts",
                        icon: <BsBarChartFill/>
                    },
                    {
                        title: "Tasks",
                        href: "/tasks",
                        icon: <CgGoogleTasks/>
                    },
                    {
                        title: "Schedule",
                        href: "/schedule",
                        icon: <BsCalendarFill/>
                    },
                    {
                        title: "Expense",
                        href: "/expense",
                        icon: <SiCashapp/>
                    },
                    {
                        title: "Settings",
                        href: "/settings",
                        icon: <HiAdjustments/>
                    },
                ]}
            />
            <div className="app-content">
                <Outlet/>
            </div>
        </div>
    )
}


export default AppLayout
