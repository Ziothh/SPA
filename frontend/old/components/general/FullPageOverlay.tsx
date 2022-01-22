import { CSSProperties, MouseEvent } from "react"
import ReactDOM from "react-dom"

interface Props {
    onClick?: (e?: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void
    className?: string
    zIndex?: number
    style?: CSSProperties
    onClickBackgroundOnly?: boolean
    id?: string
}

/**You'll need a z-index > 10 to display over the overlay */
const FullPageOverlay: React.FC<Props> = ({onClick, children, className, style, zIndex, onClickBackgroundOnly = true, id}) => {
    const overlayID = id ?? "fullpage-overlay"

    const onlyBackgroundOnClick = (ev: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (ev.target["id"] !== overlayID) return
        onClick!(ev)
    }


    return ReactDOM.createPortal(
        <div 
            id={overlayID}
            onClick={onClick ? (e) => onClickBackgroundOnly ? onlyBackgroundOnClick(e) : onClick(e) : undefined}
            className={className}
            style={{...style, zIndex}}
        >
            {children}
        </div>,
        document.getElementById("modal")!
    )
}


export default FullPageOverlay