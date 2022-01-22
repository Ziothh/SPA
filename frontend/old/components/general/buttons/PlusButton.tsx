interface Props {
    className?: string
    onClick: () => void
}

const PlusButton: React.FC<Props> = ({ className, onClick }) => {
    return (
        <button className={`btn-green btn-rect ${className} plusButton`} type="button" onClick={onClick}>
            +
        </button>
    )
}


export default PlusButton