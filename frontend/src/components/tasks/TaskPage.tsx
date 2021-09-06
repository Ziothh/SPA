import type { TaskGroupData } from "./TaskGroup"
import TaskGroup from "./TaskGroup"

import "./taskPage.scss"


interface Props {
    id: number,
    name: string,
    taskGroups: TaskGroupData[]
}


// eslint-disable-next-line @typescript-eslint/no-redeclare
const TaskPage: React.FC<Props> = ({ taskGroups, name }) => {
    return (
        <div id="taskPage">
            {taskGroups.map(
                ({id, name, tasks}) => 
                <TaskGroup
                    key={`group${name}`}
                    id={id}
                    name={name}
                    tasks={tasks}
                /> 
            )}
        </div>
    )
}


export default TaskPage