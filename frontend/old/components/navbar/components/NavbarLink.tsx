import { NavLink } from "react-router-dom"

interface Props {
    destination: string
}

const NavbarLink: React.FC<Props> = ({children, destination}) => {
    return (
        <div className="nav-element center">
            <NavLink 
                exact
                to={`/${destination ?? ""}`}
                activeClassName={"is-current-page"}
                >
                {children}
            </NavLink>
        </div>
    )
}

export default NavbarLink
