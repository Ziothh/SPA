import { cloneElement, useEffect, useState } from "react"
import "./IconButton.scss"

interface Props {
    color?: string
    isActive?: boolean
    activeColor?: string
    fillOnActive?: boolean
    className?: string,
    children: JSX.Element

    onClick?: () => void
}


const IconButton: React.FC<Props> = ({
    isActive = false, 
    activeColor, 
    children, 
    onClick, 
    color = "#1c1c28",
    fillOnActive = false,
    className
}) => {
    const [active, setActive] = useState(isActive)
    const [styling, setStyling] = useState<React.CSSProperties>()

    useEffect(() => {
        const coloring: React.CSSProperties = fillOnActive 
            ? active 
                ? {
                    stroke: activeColor ?? color,
                    strokeWidth: "1.5px",
                    fill: activeColor ?? color
                } 
                : {
                    stroke: color,
                    strokeWidth: "1.5px",
                    fill: "none"
                }
            : {
                stroke: active && activeColor ? activeColor : color,
                strokeWidth: "1.1px",
                fill: active && activeColor ? activeColor : color
            }
        
        console.log(coloring);
        
        setStyling(coloring)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active])
    
    console.log(`
    .icon-button svg ${JSON.stringify(styling)}
`);
    
    return (
        <>
            <button
                className={`icon-button ${className}`}
                onClick={() => {
                    setActive(!active)
                    return onClick
                }}
            >
                {cloneElement(children, { style: styling, className: "fill" })}
            </button>
        </>
    )
}


export default IconButton