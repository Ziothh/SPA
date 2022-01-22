import { Dispatch, SetStateAction, useState } from "react"
import PlusButton from "../../general/buttons/PlusButton"
import XButton from "../../general/buttons/XButton"

import "./ElementListCreator.scss"

interface Props {
    id: string
    subtasks:{title: string, entryID: number}[]
    setSubtasks: Dispatch<SetStateAction<{title: string, entryID: number}[]>>
    className?: string
    title?: string
    maxAmount: number
}


const SubtaskCreator: React.FC<Props> = ({id, title, className, maxAmount, subtasks, setSubtasks}) => {
    const [highesEntryID, setHighestEntryID] = useState(0) // to prevent a bug where multiple subtasks have the same entryID

    const subtaskPlaceholder = "New subtask"
   

    return (
        <div {...{id}} className={`${className} ElementListCreator font-inverse`}>
            <h2>{title}</h2>
            <div>
                {
                    subtasks.map(({title: subtaskTitle, entryID}) => {
                        return (
                            <div key={`subtaskInput${entryID}`} className="subtaskInput" >
                                <input 
                                    type="text" 
                                    placeholder={subtaskPlaceholder}  
                                    value={subtaskTitle !== subtaskPlaceholder ? subtaskTitle : ""}
                                    onChange={(e) => {
                                        setSubtasks(prev => prev.map(p => p.entryID === entryID ? {entryID, title: e.target.value} : p))
                                    }}
                                />
                                <XButton onClick={() => (setSubtasks(prev => prev.filter((p => p.entryID !== entryID))))}/>
                            </div>
                        )
                    })
                }
            </div>
            {
                subtasks.length < maxAmount && 
                <PlusButton onClick={
                    ()=>{
                        setSubtasks(prev => [...prev,{title: subtaskPlaceholder, entryID: highesEntryID + 1}])
                        setHighestEntryID(prevID => prevID + 1)
                    }
                }/>
            }
        </div>
    )
}


export default SubtaskCreator