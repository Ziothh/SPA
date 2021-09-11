export type SubtaskData = { 
    __typename?: 'Subtask', 
    id: string, 
    isCompleted: boolean, 
    title: string 
}

interface Props {
    id: string, 
    isCompleted: boolean, 
    title: string 
}


const Subtask: React.FC<Props> = ({}) => {
    return (
        <div>
            
        </div>
    )
}


export default Subtask