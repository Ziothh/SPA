import React from "react"
import type { TaskGroupData } from "./TaskGroup"
import TaskGroup from "./TaskGroup"

export type TaskPageData = {
    id: number,
    name: string,
    color: string,
    isBookmarked: boolean,
    taskGroups: TaskGroupData[]
}

interface Props {
    
}


// eslint-disable-next-line @typescript-eslint/no-redeclare
const TaskPage: React.FC<Props> = ({}) => {
    return (
        <div>
            
        </div>
    )
}


export default TaskPage