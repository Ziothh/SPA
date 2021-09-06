import type { Maybe } from "../../generated/graphql"
import type { SubtaskData } from "./Subtask"
import type { TaskTagData } from "./TaskTag"

import "./task.scss"

export type TaskData = { 
    __typename?: 'Task', 
    id: string, 
    title: string, 
    color: string, 
    deadline?: Maybe<any>, 
    subtasks: SubtaskData[], 
    tags: TaskTagData[]
}

interface Props {
    id: string, 
    title: string, 
    color: string, 
    deadline?: Maybe<any>, 
    subtasks: SubtaskData[], 
    tags: TaskTagData[]
}

// TODO: add in the tags and subtask components
// TODO: allow for creation of taskpages, subtasks, taskgroups, etc
const Task: React.FC<Props> = ({title, tags, deadline, color, subtasks}) => {
    return (
        <div className={`task-card ${color} border-round padding`}>
            <h3>{title}</h3>
            <div>tags</div>
            <div>{deadline}</div>
            <div>1/4</div>
        </div>
    )
}


export default Task