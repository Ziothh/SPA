import {FaUserAstronaut} from "react-icons/fa"
import {BiLogOutCircle} from "react-icons/bi"

import "./PageHeader.scss"

interface Props {
    title: string
}

const PageHeader: React.FC<Props> = ({title}) => {
    return (
        <div className="PageHeader">
            <h1>{title}</h1>
            <div className="quick-actions">
                <button className="btn btn-primary">something cool</button>
                <button className="btn btn-neutral">another action</button>
            </div>
            <div className="right-buttons">
                <button className="account-button btn btn-primary">
                    <FaUserAstronaut/>
                </button>
                <button><BiLogOutCircle/></button>
            </div>
        </div>
    )
}


export default PageHeader