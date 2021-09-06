export type SubtaskData = { 
    __typename?: 'Subtask', 
    id: string, 
    isCompleted: string, 
    title: string 
}

interface Props {
    id: string, 
    isCompleted: string, 
    title: string 
}


const Subtask: React.FC<Props> = ({}) => {
    return (
        <div>
            
        </div>
    )
}


export default Subtask