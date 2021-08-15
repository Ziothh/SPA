import React from "react"
import type { TaskData } from "./Task"

export type TaskCategoryData = {
    name: string,
    task: TaskData[] | []
}


interface Props {
    data: string,
}


const TaskCategory: React.FC<Props> = ({}) => {
    return (
        <div>
            
        </div>
    )
}


export default TaskCategory