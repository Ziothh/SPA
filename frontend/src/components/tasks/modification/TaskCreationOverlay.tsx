import { useState } from "react"
import type { availableClassColors } from "../../../constants/colors"
import { useCreateSubtaskMutation, useCreateTaskMutation, useCreateTaskTagMutation } from "../../../generated/graphql"
import FormInput from "../../general/form/FormInput"
import SubtaskCreator from "../form/SubtaskCreator"
import FullPageOverlay from "../../general/FullPageOverlay"
import ModificationContainer from "../../general/ModificationContainer"
import "./taskCreationOverlay.scss"
import TagCreator from "../form/TagCreator"
import { taskOperations } from "../../../pages/TaskManager"



interface Props {
    groupID: number
    displayToggle: () => void
}

const TaskCreationOverlay: React.FC<Props> = ({displayToggle, children, groupID}) => {
    const [, createTask] = useCreateTaskMutation()
    const [, createSubtask] = useCreateSubtaskMutation()
    const [, createTaskTag] = useCreateTaskTagMutation()

    const [taskTitle, setTaskTitle] = useState("")
    const [colorClass, setColorClass] = useState("red")
    const [deadline, setDeadline] = useState("")
    const [subtasks, setSubtasks] = useState<{title: string, entryID: number}[]>([])
    const [tags, setTags] = useState<{title: string, colorClass: availableClassColors, entryID: number}[]>([])
    
    const createTaskOnSubmit = async () => {
        if (taskOperations.reFetchPages === undefined) return

        const {data} = await createTask(
            {
                groupID, 
                taskData: {
                    color: colorClass, 
                    title: taskTitle, 
                    deadline: deadline !== "" ? new Date(deadline) : undefined
                }
            }
        )

        if (data?.createTask) {
            const taskID  = parseInt(data.createTask.id)
            await subtasks.forEach(({title}) => {if (title) createSubtask({taskId: taskID, title: title})})
            await tags.forEach(({title, colorClass}) => {
                console.log("tagsdata", {taskID, title, colorClass})
                if (title) createTaskTag({taskId: taskID, title: title, colorClass: colorClass})
            })
            
            await taskOperations.reFetchPages()
            
            displayToggle()
        } else {
            alert("Something went wrong!")
        }
    }


    return (
        <FullPageOverlay onClick={displayToggle}>
            <ModificationContainer title="New Task" onSubmit={()=> createTaskOnSubmit()} onDelete={displayToggle}>
                <div id="formInputs">
                    <FormInput name="Task Name" className="titleInput" type="text" value={taskTitle} onChange={setTaskTitle} required/>
                    <FormInput name="Highlight Color" className="colorInput" type="text" value={colorClass} onChange={setColorClass} required/>
                    <FormInput name="Deadline" className="dateInput" type="date" value={deadline} onChange={setDeadline} resetAble/>
                    
                    <SubtaskCreator 
                        key="subtaskCreator" 
                        id="subtaskCreation" 
                        title="Subtasks" 
                        maxAmount={5}
                        subtasks={subtasks}
                        setSubtasks={setSubtasks}
                    />

                    <TagCreator 
                        key="tagCreator" 
                        id="tagCreation" 
                        title="Tags" 
                        maxAmount={4}
                        tags={tags}
                        setTags={setTags}
                    />
                </div>
                {children}
            </ModificationContainer>
        </FullPageOverlay>
    )
}


export default TaskCreationOverlay