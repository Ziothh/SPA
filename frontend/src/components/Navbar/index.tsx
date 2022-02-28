import './Navbar.scss';

import NavLogo from './components/NavLogo';
import DarkModeToggle from "./components/DarkModeToggle"
import { NavLink } from "react-router-dom";
import { classNames } from "../../helpers";
import Tooltip from "../other/Tooltip";
import { Direction } from "@myTypes";
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import type { ReactElement } from 'react';

type NavLinkData = {
    title: string
    href: string
    icon: ReactElement
}

interface Props {
    links: NavLinkData[]
}


const Navbar: React.FC<Props> = ({links}) => {
    return (
        <aside id="navbar">
            <nav>
                <NavLogo/>
                <ul>
                    {links.map(l => (
                        <li key={l.title}>
                            <Tooltip title={l.title} direction={Direction.RIGHT}>
                                <NavLink to={l.href} className={({isActive}) => classNames(isActive && "active", "fill flex-center")}>
                                    {l.icon}
                                </NavLink>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </nav>
                <DarkModeToggle isDark={true}/>
        </aside>
    )
}

export default Navbar
