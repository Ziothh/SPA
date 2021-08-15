import { useState, useEffect } from "react";
import type {  TaskPageData } from "../components/tasktracker/components/TaskPage";
import TaskPage from "../components/tasktracker/components/TaskPage";
import TaskPageSelector from "../components/tasktracker/components/taskPageSelector/TaskPageSelector";
import "../scss/pages/TaskManager.scss";

const dummyPages: TaskPageData[] = [
    {
        categories: [],
        isBookmarked: false,
        title:{name: "TestTitle", color: "#222"}
    },
    {
        categories: [],
        isBookmarked: false,
        title:{name: "TestTitle", color: "#222"}
    },
    {
        categories: [],
        isBookmarked: false,
        title:{name: "TestTitle", color: "#222"}
    }
]

const TaskManager = () => {
    const [taskPages, setTaskPages] = useState(dummyPages)

    useEffect(() => {
        setTaskPageTitles(taskPages.map(({title, isBookmarked}) => ({isBookmarked,...title})))
    }, [taskPages])

    const [taskPageTitles, setTaskPageTitles] = useState<{name: string, color: string}[]>([])
    const [currentTaskPageName, setCurrentTaskPageName] = useState<{name: string} | undefined>(undefined)
        return (
        <div id="task-manager" className="fill">
            <TaskPageSelector pageTitles={taskPageTitles} pageSetter={setCurrentTaskPageName}/>
            {/* {currentTaskPageName && <TaskPage/>} */}
        </div>
    )
}

export default TaskManager
