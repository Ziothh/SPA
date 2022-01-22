import { useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { useSwitchTaskGroupMutation } from "../../generated/graphql"
import { reorderTaskMap } from "../../hooks/useReorder"
import type { TaskData } from "./Task"
import type { TaskGroupData } from "./TaskGroup"
import TaskGroup from "./TaskGroup"
import "./taskPage.scss"


export type taskMap = {[taskGroupID: string]: TaskData[]}
const createTaskMap = (taskGroups: TaskGroupData[]): taskMap  => {
    const taskMap = {}
    taskGroups.forEach(({id, tasks}) => taskMap[id] = tasks)
    return taskMap
}

interface Props {
    id: number,
    name: string,
    taskGroups: TaskGroupData[]
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const TaskPage: React.FC<Props> = ({ taskGroups, name }) => {
    const [, switchTaskGroup] = useSwitchTaskGroupMutation()
    const [taskMap, setTaskMap] = useState(createTaskMap(taskGroups))
    
  
    return (
        <DragDropContext onDragEnd={({destination, source}) => {
            if (!destination) return
            

            setTaskMap(reorderTaskMap(taskMap, source, destination, switchTaskGroup))
        }}>


            <div id="taskPage">
                {Object.entries(taskMap).map(([taskGroupID, tasks]) => {
                    const taskGroupName = taskGroups.find(({id}) => id === taskGroupID)!.name
                    return  (
                        <TaskGroup
                            key={`group${taskGroupName}`}
                            id={taskGroupID}
                            name={taskGroupName}
                            tasks={tasks}
                        />
                    )
                }
                )}
            </div>
        </DragDropContext> 
    )
}


export default TaskPage