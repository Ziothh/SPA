import type { TaskData } from "./Task"

export type TaskGroupData = {
    id: number,
    name: string,
    tasks: TaskData[] | []
}


interface Props {
    data: string,
}


const TaskGroup: React.FC<Props> = ({}) => {
    return (
        <div>
            
        </div>
    )
}


export default TaskGroup