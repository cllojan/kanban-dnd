import { useRef } from "react";
import { XYCoord, useDrag,useDrop } from "react-dnd";
import { ItemType } from "../utils/enums";
import { DragItem,TaskModel } from "../utils/models";

export function useTaskDragAndDrop<T extends HTMLElement>({
    task,
    index,
    handleDropHover,
}:{
    task:TaskModel;
    index:number;
    handleDropHover: (i:number, j:number) => void
}){
    const ref = useRef<T>(null);
    const [{isDragging}, drag] = useDrag<
        DragItem,
        void,
        {isDragging:boolean}
    >({
        type:ItemType.TASK,
        item:{from:task.column,id:task.id,index},
        collect:(monitor) =>({
            isDragging:monitor.isDragging(),
        }),
    })

    const [_,drop] = useDrop<DragItem, void, unknown>({
        accept:ItemType.TASK,
        hover:(item, monitor) => {
            if(!ref.current){
                return;
            }
            const draggedItemIndex = item.index;
            const hoveredItemIndex = index;
            if(draggedItemIndex === hoveredItemIndex){
                return;
            }
            const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex;
            const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

            const { x:mouseX, y:mouseY} = monitor.getClientOffset() as XYCoord;

            const hoveredBoundingRect = ref.current.getBoundingClientRect();
            const hoveredMiddleheight = (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

            const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
            const isMouseYAboveHoveredMiddleHeight = mouseYRelativeToHovered < hoveredMiddleheight;
            const isMouseYBelowHoveredMiddleHeight = mouseYRelativeToHovered > hoveredMiddleheight;

            if(isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight){
                return;

            }
            if(isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight){
                return;

            }

            handleDropHover(draggedItemIndex, hoveredItemIndex);

            item.index = hoveredItemIndex;
        }
    }) 
    drag(drop(ref));
    return {
        ref,
        isDragging,
    }
}