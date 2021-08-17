interface Props {
    onClick: () => void
}


const FullPageClickListener: React.FC<Props> = ({onClick}) => {
    return (
        <div 
            onClick={onClick}
            style={{position: "absolute", width: "100vw", height: "100vh", top: "-20px", left: "-85px"}}
        >
        </div>
    )
}


export default FullPageClickListener