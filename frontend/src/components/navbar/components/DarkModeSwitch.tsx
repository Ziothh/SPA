import React from "react";

import { BsMoon } from "react-icons/bs";

interface Props {
    isDark: boolean
}

const DarkModeSwitch: React.FC<Props> = ({isDark}) => {
    return (
        <div className="nav-element" id="dark-mode-switch">
            <BsMoon/>
        </div>
    )
}

export default DarkModeSwitch