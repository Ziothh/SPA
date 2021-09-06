import "./modificationContainer.scss"

interface Props {
    title: string
    className?: string
    onSubmit: () => void
    onDelete: () => void
    submitButtonText?: string
}


const ModificationContainer: React.FC<Props> = ({className, children, title, onSubmit, onDelete, submitButtonText = "Save Changes"}) => {
    
    return (
        <div id={"modificationContainer"} className={`padding border-round bg-inverse ${className}`}>
            <form onSubmit={(e) => {e.preventDefault(); onSubmit()}}>
                <h1 className="font-inverse header">{title}</h1>
                
                {children /* { these are the form inputs }  */}
                <div className="actionButtons">
                    <button className="btn btn-red" type="button" onClick={onDelete}>Delete Changes</button>
                    <button className="btn btn-green" type="submit" >{submitButtonText}</button>
                </div>
            </form>
        </div>
    )
}


export default ModificationContainer