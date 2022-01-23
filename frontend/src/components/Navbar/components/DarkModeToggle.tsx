import { BsMoon } from "react-icons/bs";

interface Props {
    isDark: boolean
}

const DarkModeToggle: React.FC<Props> = ({isDark}) => {
    return (
        <button className="flex-center" id="dark-mode-toggle">
            <BsMoon/>
        </button>
    )
}

export default DarkModeToggle