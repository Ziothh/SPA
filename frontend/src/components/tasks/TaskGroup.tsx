import type { TaskData } from "./Task"
import Task from "./Task"

import "./taskGroup.scss"

export type TaskGroupData =  { 
    __typename?: 'TaskGroup', 
    id: string, 
    name: string, 
    tasks: TaskData[]
}


interface Props {
    id: string, 
    name: string, 
    tasks: TaskData[]
}


const TaskGroup: React.FC<Props> = ({name, tasks}) => {
    return (
        <div className="taskGroup border-round padding">
            <h2>{name}</h2>
            <div className="tasks">
                {
                    tasks.length !== 0
                    ? tasks.map(
                        ({id, color, subtasks, tags, title, deadline}) =>
                        <Task
                            key={`task${id}`}
                            id={id}
                            color={color}
                            subtasks={subtasks}
                            tags={tags}
                            title={title}
                            deadline={deadline}
                        />)
                    : <div className="placeholder">
                        <h1>There are no tasks to show</h1>
                    </div>
                }
            </div>
            <button onClick={() => alert("test")}  className="noStyle inverse">+</button>
        </div>
    )
}


export default TaskGroup