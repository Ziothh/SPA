import { useState, useEffect } from "react";
import { useMutation, useQuery } from "urql";
import type { TaskPageData } from "../components/tasks/components/TaskPage";
import TaskPage from "../components/tasks/components/TaskPage";
import TaskPageSelector from "../components/tasks/components/taskPageSelector/TaskPageSelector";
import { useCreateTaskGroupMutation, useCreateTaskPageMutation, useGetTaskPagesQuery } from "../generated/graphql";
// 
import "../scss/pages/TaskManager.scss";

type TaskTitleData = {
    id: number,
    name: string,
    color: string,
    isBookmarked: boolean
}


const TaskManager = () => {
    const [loading, setLoading] = useState(true)
    const [result, getTaskPages] = useGetTaskPagesQuery()
    const [, createTaskPage] = useCreateTaskPageMutation()
    const [, createTaskGroup] = useCreateTaskGroupMutation()
    const [taskPages, setTaskPages] = useState(result.data?.getAllTaskPages)

    useEffect(() => {
        if (result.data?.getAllTaskPages) setTaskPages(result.data.getAllTaskPages)
        console.log("render")
    },[result.data?.getAllTaskPages])
    
    useEffect(() => {
        const init = async () => {
            if (result.data?.getAllTaskPages?.length !== 0) setTaskPages(result.data?.getAllTaskPages)
            else {
                const {data} = await createTaskPage({name: "Created Main Page"})
                if (data?.createTaskPage) {
                    await ["Unprocessed", "On Hold", "In Process", "Complete"].forEach(title => {
                        console.log("creating pages")
                        createTaskGroup({name: title, pageId: parseInt(data.createTaskPage.id)})
                    })
                    console.log("getting pages")
                    await getTaskPages()
                }
            }
            // else 
            // setLoading(false)
        }

        if (result.fetching === false) setLoading(false)
        if (!loading && !result.fetching) init()
    }, [loading, result.fetching])
    // const [taskPages, setTaskPages] = useState<TaskPageData[]>([])
    // const [taskPageTitles, setTaskPageTitles] = useState<TaskTitleData[]>([])
    // const [currentTaskPageID, setCurrentTaskPageID] = useState<number | undefined>(taskPages[0]?.id)





    // if (fetching) return <p>Loading...</p>
    // if (error) return <p>Oh no... {error.message}</p>


    return (
        <div id="task-manager" className="fill">
            {taskPages && <h1>{JSON.stringify(taskPages)}</h1>}
            {/* <TaskPageSelector 
                pageTitles={taskPageTitles} 
                currentPageID={currentTaskPageID}
                currentPageIDSetter={setCurrentTaskPageID}
            /> */}
            {/* {currentTaskPageName && <TaskPage/>} */}
        </div>
    )
}


export default TaskManager
