import "./Grid.scss"

interface Props {
    className?: string
    id?: string
}

const Grid: React.FC<Props> = ({children, className, id}) => {
    return (
        <div id={id} className={"app-grid" + (className || "")}>
            {children}
        </div>
    )
}


export default Grid