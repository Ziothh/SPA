import { useState, useEffect } from "react";
import { useMutation, useQuery } from "urql";
import type { TaskPageData } from "../components/tasks/components/TaskPage";
import TaskPage from "../components/tasks/components/TaskPage";
import TaskPageSelector, { PageTitle } from "../components/tasks/components/taskPageSelector/TaskPageSelector";
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
    // Data Fetching
    const [setupIsDone, setSetupIsDone] = useState(false) // This will be set to true if there aren't any pages yet and the default page has been created
    const [{fetching, data, error}, getTaskPages] = useGetTaskPagesQuery()
    const [, createTaskPage] = useCreateTaskPageMutation()
    const [, createTaskGroup] = useCreateTaskGroupMutation()
    
    // Client-side
    const [taskPageTitles, setTaskPageTitles] = useState<PageTitle[]>()
    const [currentTaskPageID, setCurrentTaskPageID] = useState<number>()

    const createDefaultPage = async () => {
        console.log("creating default values")
        // Set to true so that we don't get into an infinite loop
        setSetupIsDone(true) // Needs to go first or the infinite loop still appears
        const { data } = await createTaskPage({name: "Main Page"})

        const defaultPageID = parseInt(data!.createTaskPage.id)
        await createTaskGroup({name: "Unprocessed", pageId: defaultPageID})
        await createTaskGroup({name: "On Hold", pageId: defaultPageID})
        await createTaskGroup({name: "Processing", pageId: defaultPageID})
        await createTaskGroup({name: "Complete", pageId: defaultPageID})

        await getTaskPages({requestPolicy: "cache-and-network"})
    }

    const getTaskPageTitles = () => {
        const titles: PageTitle[] = data!.getAllTaskPages!.map(({id, isBookmarked, name}) => {return {id: parseInt(id), isBookmarked, name, colorClass: "red"}})
        setTaskPageTitles(titles)
        setCurrentTaskPageID(titles[0].id)
    }


    if (fetching) {return <h1>Loading...</h1>}
    if (error) {return <h1>Oops! Something went wrong!</h1>}
    if (!setupIsDone && !fetching && data?.getAllTaskPages?.length === 0 ) { 
        createDefaultPage()
    }
    if (!data) return <h1>Loading...</h1>
    else if (!taskPageTitles) {
        getTaskPageTitles()
        return <h1>Loading...</h1>
    }

    return (
        <div id="task-manager" className="fill">
            <TaskPageSelector
                key={currentTaskPageID} 
                pageTitles={taskPageTitles as PageTitle[]} 
                currentPageID={currentTaskPageID as number}
                currentPageIDSetter={setCurrentTaskPageID}
            />
            {/* {currentTaskPageName && <TaskPage/>} */}
        </div>
    )
}


export default TaskManager
