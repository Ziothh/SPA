import React from "react"
import type { TaskCategoryData } from "./TaskCategory"

export type TaskPageData = {
    title: {
        name: string,
        colorClass: string,
    },
    id: number,
    isBookmarked: boolean,
    categories: TaskCategoryData[] | []
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