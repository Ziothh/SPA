import { useState } from "react"

interface Props {
    className?: string,
    id?: string,
    components: [JSX.Element, JSX.Element?],
}

/** Will conditionally render one or two elements(either the first or the second). Can be toggled with the button */
const RenderSwitch: React.FC<Props> = ({className, components, id}) => {
    const [showFirstElement, setShowFirstElement] = useState(true)
    
    
    return (
        <div id={id ?? ""} className={className ?? ""}>
            <button onClick={() => setShowFirstElement(!showFirstElement)}>Text</button>
            {showFirstElement ? components[0] : components[1]}
        </div>
    )
}

export default RenderSwitch
