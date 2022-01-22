/* eslint-disable array-callback-return */
import type { Maybe } from "../../generated/graphql"
import useDate from "../../hooks/useDate"
import type { SubtaskData } from "./Subtask"
import "./task.scss"
import type { TaskTagData } from "./TaskTag"


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
    draggableProps: any
    dragHandleProps: any
    innerRef: (element?: HTMLElement | null | undefined) => any
}

// TODO: add in the tags and subtask components
// TODO: allow for creation of taskpages, subtasks, taskgroups, etc
const Task: React.FC<Props> = ({title, tags, deadline, color, subtasks, id, innerRef, draggableProps, dragHandleProps}) => {
    return (
        <div className={`task-card ${color} border-round padding`} ref={innerRef} {...dragHandleProps} {...draggableProps}>
            <h3>{title}</h3>
            <div className="taskTags">Not-implemented</div>
            <div className="deadline">{deadline ? useDate.toNiceText(deadline) : "No deadline\n"}</div>
            <div className="subtasksCompletionCounter">
                {
                    subtasks.length !== 0
                    ? `${subtasks.filter((subtask) => subtask.isCompleted === true).length} / ${subtasks.length}`
                    : "No subtasks"
                }
            </div>
        </div>
    )
}


export default Task