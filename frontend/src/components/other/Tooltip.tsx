import { useUpdateEffect, useDebounce, useTimeout } from "@hooks"
import { useState } from "react"
import { Direction } from "@myTypes";

import "./Tooltip.scss"
import { useRef } from "react";
import { useEffect } from "react";
import { classNames } from "../../helpers";

// import { useAppTheme } from "@context/themeContext"

interface Props {
    title: string | JSX.Element
    direction?: Direction
    delay?: number
    activeClassName?: string
    style?: MyTypes.CSS.Properties
    
}


const Tooltip: React.FC<Props> = ({direction="top", title, children, delay = 200, activeClassName, style}) => {
    const [showing, setShowing] = useState(false);

    const hoverTimeout = useTimeout(() => {
        setShowing(true)
    }, delay, false)

    const unHoverTimeout = useTimeout(() => {
        setShowing(false)
    }, delay, false)

    return (
        <div className="tooltip-container"
            onMouseEnter={() => {
                unHoverTimeout.clear()
                hoverTimeout.reset()
            }}
            onMouseLeave={() => {
                hoverTimeout.clear()
                unHoverTimeout.reset()
            }}
        >
            {children}
            <div className={classNames(`tooltip tooltip-${direction}`, showing && "tooltip-showing")}>
                <div className="tooltip-arrow"></div>
                <div style={style} className="tooltip-label layer rounded">{title}</div>
            </div>
        </div>
    )
}


export default Tooltip