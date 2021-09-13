import { useState } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import TaskCreationOverlay from "./modification/TaskCreationOverlay"
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


const TaskGroup: React.FC<Props> = ({name, tasks, id}) => {
    const [showCreateTask, setShowCreateTask] = useState(false)

    const toggleShowCreateTask = () => setShowCreateTask(!showCreateTask)

    return (
        <>
        {/* Task group column */}
        <div className="taskGroup border-round padding">
            <h2>{name}</h2>
            <Droppable
                droppableId={id}
                type="CARD"
                direction="vertical"
                isCombineEnabled={false}
                >   
                {dropProvided => (
                    <div className="tasks" {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                    {tasks.length !== 0
                    ? tasks.map(({id, color, subtasks, tags, title, deadline}, index) =>
                        <Draggable key={`task${id}`} draggableId={id} index={index}>
                            {dragProvided => (
                                <Task
                                    id={id}
                                    color={color}
                                    subtasks={subtasks}
                                    tags={tags}
                                    title={title}
                                    deadline={deadline}

                                    // dnd
                                    innerRef={dragProvided.innerRef}
                                    draggableProps={dragProvided.draggableProps}
                                    dragHandleProps={dragProvided.dragHandleProps}
                                />
                            )}
                        </Draggable>)
                        : null
                    // : (<div className="placeholder"><h1>There are no tasks to show</h1></div>)
                    }
                    {dropProvided.placeholder}
                </div>)}
            </Droppable>

            <button onClick={toggleShowCreateTask} className="noStyle inverse">+</button>
        </div>

        {showCreateTask && <TaskCreationOverlay groupID={parseInt(id)} displayToggle={toggleShowCreateTask}/>}
        </>
    )
}


export default TaskGroup