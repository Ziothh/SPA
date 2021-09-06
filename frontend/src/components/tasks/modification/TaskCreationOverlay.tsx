import { useState } from "react"
import { useCreateTaskMutation } from "../../../generated/graphql"
// import { taskOperations } from "../../../pages/TaskManager"
import FormInput from "../../general/form/FormInput"
import FullPageOverlay from "../../general/FullPageOverlay"
import ModificationContainer from "../../general/ModificationContainer"


import "./taskCreationOverlay.scss"

interface Props {
    groupID: number
    displayToggle: () => void
}


const TaskCreationOverlay: React.FC<Props> = ({displayToggle, children, groupID}) => {
    const [, createTask] = useCreateTaskMutation()
    const [taskTitle, setTaskTitle] = useState("")
    const [colorClass, setColorClass] = useState("red")
    const [deadline, setDeadline] = useState("")

    const onSubmit = async () => {
        // await createTask({groupID, taskData: {color: colorClass, title: taskTitle, deadline: deadline || undefined}})
        // await taskOperations.reFetch()
    }

    return (
        <FullPageOverlay onClick={displayToggle}>
            <ModificationContainer title="New Task" onSubmit={()=> onSubmit()} onDelete={displayToggle}>
                <div id="formInputs">
                    <FormInput name="Task Name" className="titleInput" type="text" value={taskTitle} onChange={setTaskTitle} required/>
                    <FormInput name="Highlight Color" className="colorInput" type="text" value={colorClass} onChange={setColorClass} required/>
                    <FormInput name="Deadline" className="dateInput" type="date" value={deadline} onChange={setDeadline} resetAble/>
                </div>
                {children}
            </ModificationContainer>
        </FullPageOverlay>
    )
}


export default TaskCreationOverlay