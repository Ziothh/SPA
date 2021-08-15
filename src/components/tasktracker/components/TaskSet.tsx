import type { TaskData } from "./Task"

type TaskSet = {
    name: string,
    tasks: TaskData[]
}

interface Props {
    name: string,
    color: string,
}


const TaskSet: React.FC<Props> = ({}) => {
    return (
        <div>
            
        </div>
    )
}


export default TaskSet