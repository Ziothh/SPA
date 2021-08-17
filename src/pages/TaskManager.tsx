import { useState, useEffect } from "react";
import type {  TaskPageData } from "../components/tasktracker/components/TaskPage";
import TaskPage from "../components/tasktracker/components/TaskPage";
import TaskPageSelector from "../components/tasktracker/components/taskPageSelector/TaskPageSelector";
import "../scss/pages/TaskManager.scss";

const dummyPages: TaskPageData[] = [
    {
        id: 1,
        categories: [],
        isBookmarked: false,
        title:{name: "Rosseel", colorClass: "red"}
    },
    {
        id: 2,
        categories: [],
        isBookmarked: false,
        title:{name: "Self", colorClass: "cyan"}
    },
    {
        id: 3,
        categories: [],
        isBookmarked: false,
        title:{name: "Main", colorClass: "light-blue"}
    },
    {
        id: 4,
        categories: [],
        isBookmarked: false,
        title:{name: "Test", colorClass: "red"}
    },
    {
        id: 5,
        categories: [],
        isBookmarked: false,
        title:{name: "Value", colorClass: "red"}
    }
]

const TaskManager = () => {
    const [taskPages, setTaskPages] = useState(dummyPages)
    const [taskPageTitles, setTaskPageTitles] = useState<{name: string, colorClass: string, isBookmarked: boolean, id: number}[]>([])
    const [currentTaskPageID, setCurrentTaskPageID] = useState<number | undefined>(taskPages[0]?.id)

    useEffect(() => {
        setTaskPageTitles(taskPages.map(({title, isBookmarked, id}) => ({isBookmarked, ...title, id,})))
    }, [taskPages])

        return (
        <div id="task-manager" className="fill">
            <TaskPageSelector 
                pageTitles={taskPageTitles} 
                currentPageID={currentTaskPageID}
                currentPageIDSetter={setCurrentTaskPageID}
            />
            {/* {currentTaskPageName && <TaskPage/>} */}
        </div>
    )
}

export default TaskManager
