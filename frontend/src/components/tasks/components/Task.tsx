import React from "react"
import TaskTag from "./TaskTag"

export type TaskData = {
    title: string,
    color: string,
    tags: TaskTag[] | []
    isBookmarked: boolean,
}

interface Props {
    title: string,
    description: string
}

const Task: React.FC<Props> = () => {
    return (
        <div>
            
        </div>
    )
}


export default Task