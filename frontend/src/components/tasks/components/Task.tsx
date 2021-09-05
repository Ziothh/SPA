import type { SubtaskData } from "./Subtask"
import type { TaskTagData } from "./TaskTag"

export type TaskData = {
    id: number,
    title: string,
    color: string,
    deadline: Date | null,
    subtasks: SubtaskData[]
    tags: TaskTagData[]
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