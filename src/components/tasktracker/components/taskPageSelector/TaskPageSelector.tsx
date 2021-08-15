import React from "react";
import { BsFillBookmarkFill, BsPencilSquare, BsThreeDotsVertical } from "react-icons/bs";
import IconButton from "../../../general/IconButton";
import "./TaskPageSelector.scss";

type pageTitle = {
    name: string,
    color: string,
    // isBookmarked: boolean
}
interface Props {
    pageTitles: pageTitle[] | [],
    pageSetter: React.Dispatch<React.SetStateAction<{name: string} | undefined>>
}

const TaskPageSelector: React.FC<Props> = ({pageTitles, pageSetter}) => {
    return (
        <div id="task-page-selector" className="border-round">
            <div id="selector"> <p className="text-dark">Input field</p></div>
            <IconButton 
                isActive={true} 
                // activeColor={"yellow"} 
                className="fill"
                // color="red"
                fillOnActive={true}
            >
                <BsFillBookmarkFill/>
            </IconButton>
            <IconButton 
                isActive={false} 
                className="fill"
                // color="red"
            >
                <BsPencilSquare/>
            </IconButton>
            <IconButton 
                isActive={true} 
                // activeColor={"yellow"} 
                className="fill"
                // color="red"
                fillOnActive={true}
            >
                <BsThreeDotsVertical/>
            </IconButton>
        </div>
    )
}


export default TaskPageSelector