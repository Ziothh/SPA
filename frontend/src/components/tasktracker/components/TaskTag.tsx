import React from "react"

export type TaskTagData = {
    name: string,
    color: string,
}

interface Props {
    data: TaskTagData
}


const TaskTag: React.FC<Props> = ({data}) => {
    return (
        <div>
            
        </div>
    )
}


export default TaskTag