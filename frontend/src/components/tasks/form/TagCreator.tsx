import { Dispatch, SetStateAction, useState } from "react"
import type { availableClassColors } from "../../../constants/colors"
import PlusButton from "../../general/buttons/PlusButton"
import XButton from "../../general/buttons/XButton"

import "./TagCreator.scss"

interface Props {
    id: string
    tags: {title: string, colorClass: availableClassColors, entryID: number}[]
    setTags: Dispatch<SetStateAction<{title: string, colorClass: availableClassColors, entryID: number}[]>>
    className?: string
    title?: string
    maxAmount: number
}


const TagCreator: React.FC<Props> = ({id, title, className, maxAmount, tags, setTags}) => {
    const [highesEntryID, setHighestEntryID] = useState(0) // to prevent a bug where multiple subtasks have the same entryID

    const tagPlaceholder = "New tag"
    const colorPlaceholder = "Accent color"
   

    return (
        <div {...{id}} className={`${className} ElementListCreator font-inverse`}>
            <h2>{title}</h2>
            <div>
                {
                    tags.map(({title: tagTitle, colorClass ,entryID}) => {
                        return (
                            <div key={`tagInput${entryID}`} className="tagInput" >
                                <input 
                                    type="text" 
                                    placeholder={tagPlaceholder}  
                                    value={tagTitle !== tagPlaceholder ? tagTitle : ""}
                                    onChange={(e) => {
                                        setTags(prev => prev.map(p => p.entryID === entryID ? {entryID, colorClass: p.colorClass, title: e.target.value} : p))
                                    }}
                                />
                                <input 
                                    type="text" 
                                    placeholder={colorPlaceholder}  
                                    value={colorClass as string !== colorPlaceholder ? colorClass : ""}
                                    onChange={(e) => {
                                        setTags(prev => prev.map(p => p.entryID === entryID ? {entryID, colorClass: e.target.value as availableClassColors, title: tagTitle} : p))
                                    }}
                                />
                                <XButton onClick={() => (setTags(prev => prev.filter((p => p.entryID !== entryID))))}/>
                            </div>
                        )
                    })
                }
            </div>
            {
                tags.length < maxAmount && 
                <PlusButton onClick={
                    ()=>{
                        setTags(prev => [...prev,{title: tagPlaceholder, colorClass: colorPlaceholder as availableClassColors,entryID: highesEntryID + 1}])
                        setHighestEntryID(prevID => prevID + 1)
                    }
                }/>
            }
        </div>
    )
}


export default TagCreator