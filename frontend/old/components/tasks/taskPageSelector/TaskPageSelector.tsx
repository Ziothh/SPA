import { useState } from "react";
import { BsFillBookmarkFill, BsPencilSquare, BsThreeDotsVertical } from "react-icons/bs";
import FullPageOverlay from "../../general/FullPageOverlay";
import IconButton from "../../general/IconButton";
import TaskPageOption from "./TaskPageOption";
import "./TaskPageSelector.scss";

export type PageTitle = {
    id: number
    name: string,
    colorClass: string,
    isBookmarked: boolean,
}
interface Props {
    pageTitles: PageTitle[] | [],
    currentPageID: number
    currentPageIDSetter: React.Dispatch<React.SetStateAction<number | undefined>>
}

const TaskPageSelector: React.FC<Props> = ({pageTitles, currentPageID, currentPageIDSetter}) => {
    const [showOtherPageTitles, setShowOtherPageTitles] = useState(false) // show list of page titles
    const [inEdit, setInEdit] = useState(false) // double click on title to change the name
    
    const currentPageTitleData = pageTitles.find(title => title.id === currentPageID) as PageTitle
    const [pageTitle, setPageTitle] = useState(currentPageTitleData!.name)

    const toggleShowOtherPageTitles = () => pageTitles.length > 1 && setShowOtherPageTitles(!showOtherPageTitles)
    const toggleIsBookmarked = () => { if (currentPageTitleData)  currentPageTitleData.isBookmarked = !currentPageTitleData?.isBookmarked }
    const toggleInEdit = () => {
        setInEdit(!inEdit)
        setShowOtherPageTitles(false)
    }
    return (
        <div id="task-page-selector" className="border-round">
            <div id="selector" onClick={() => !inEdit && toggleShowOtherPageTitles()} > 
                <div className={`circle ${currentPageTitleData.colorClass}`}></div>
                {
                    !inEdit 
                    ? <p className="text-dark">{pageTitle}</p>
                    : <input type="text" autoFocus value={pageTitle} onChange={e => setPageTitle(e.target.value)}/>
                }
            </div>

            {/* Side icons */}
            {/* <IconButton 
                isActive={currentPageTitleData.isBookmarked} 
                className="fill"
                fillOnActive={true}
                title="Bookmark"
                onClick={toggleIsBookmarked}
            >
                <BsFillBookmarkFill/>
            </IconButton> */}
            <IconButton 
                isActive={currentPageTitleData.isBookmarked} 
                className="fill"
                fillOnActive={true}
                title="Bookmark"
                onClick={toggleIsBookmarked}
            >
                <BsFillBookmarkFill/>
            </IconButton>
            <IconButton 
                isActive={inEdit} 
                className="fill"
                title="Edit"
                onClick={toggleInEdit}
            >
                <BsPencilSquare/>
            </IconButton>
            <IconButton 
                isActive={false} 
                className="fill"
                title="Options"
            >
                <BsThreeDotsVertical/>
            </IconButton>
            {
                // List of other page titles
                showOtherPageTitles && (<>
                    <div id="other-page-titles" className="border-round" >
                        {pageTitles.map(
                            title => title.id !== currentPageID && 
                            <TaskPageOption 
                                name={title.name} 
                                colorClass={title.colorClass}
                                id={title.id}
                                pageSetter={currentPageIDSetter}
                                key={title.name}
                            />
                        )}
                    </div>
                    <FullPageOverlay onClick={toggleShowOtherPageTitles}/>
                </>)
            }       
        </div>
    )
}


export default TaskPageSelector