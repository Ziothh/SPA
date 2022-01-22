import { DraggableLocation } from "react-beautiful-dnd"
import type { taskMap } from "../components/tasks/TaskPage"

const reorder = (list: any[],  startIndex: number, endIndex: number): any[] => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

export default reorder

export const reorderTaskMap = (
    taskMap: taskMap,
    source: DraggableLocation,
    destination: DraggableLocation,
    switchTaskGroupFunction: any
): taskMap => {
    const current = [...taskMap[source.droppableId]]
    const next = [...taskMap[destination.droppableId]]
    const target = current[source.index]
    
    // Updating the DB
    const switchTaskGroup = async () => await switchTaskGroupFunction({taskID: parseInt(target.id), groupID: parseInt(destination.droppableId)})
    switchTaskGroup()

    // Moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(
            current,
            source.index,
            destination.index
        )
        return {
            ...taskMap,
            [source.droppableId]: reordered
        }
    } 

    // Moving to different list

    // Remove from original
    current.splice(source.index, 1)
    // Insert into next
    next.splice(destination.index, 0, target)
    
    return {
        ...taskMap,
        [source.droppableId]: current,
        [destination.droppableId]: next
    }
} 