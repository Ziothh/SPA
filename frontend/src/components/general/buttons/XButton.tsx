interface Props {
    className?: string
    onClick: () => void
}


const XButton: React.FC<Props> = ({ className, onClick }) => {
    return (
        <button className={`btn-red btn-rect ${className} xButton`} type="button" onClick={onClick}>
            x
        </button>
    )
}


export default XButton