// import { FaIdCard } from "react-icons/fa";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { BsCalendarFill } from "react-icons/bs";
import { BsBarChartFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { HiAdjustments } from "react-icons/hi";
import { SiCashapp } from "react-icons/si";
import { CgGoogleTasks } from "react-icons/cg";

import './navbar.scss';

import NavbarLink from './components/NavbarLink';
import NavLogo from './components/NavLogo';
import DarkModeSwitch from "./components/DarkModeSwitch"


const Navbar: React.FC = () => {
    return (
        <header id="navbar">
            <nav>
                <NavLogo/>
                <NavbarLink destination={""}>
                    <HiHome/>
                </NavbarLink>
                <NavbarLink destination={"charts"}>
                    <BsBarChartFill/>
                </NavbarLink>
                <NavbarLink destination={"modules"}>
                    <BsFillGrid1X2Fill/>
                </NavbarLink>
                <NavbarLink destination={"tasks"}>
                    <CgGoogleTasks/>
                </NavbarLink>
                <NavbarLink destination={"schedule"}>
                    <BsCalendarFill/>
                </NavbarLink>
                <NavbarLink destination={"expense"}>
                    <SiCashapp/>
                </NavbarLink>
                {/* <NavbarLink destination={"about"}>
                    <FaIdCard/>
                </NavbarLink> */}
                <NavbarLink destination={"settings"}>
                    <HiAdjustments/>
                </NavbarLink>
                <DarkModeSwitch isDark={true}/>
            </nav>
        </header>
    )
}

export default Navbar
