import React from "react"


interface Props {
    name: string, 
    colorClass: string,
    id: number,
    pageSetter: React.Dispatch<React.SetStateAction<number | undefined>>
}


const TaskPageOption: React.FC<Props> = ({colorClass, name, id, pageSetter}) => {
    return (
        <div className={`task-page-option ${colorClass}`} onClick={() => pageSetter(id)}>
            <p>{name}</p>
        </div>
    )
}


export default TaskPageOption