import { Draggable } from "react-beautiful-dnd";
interface taskProps {
  title: string;
  draggableId: string;
  index: number
}

export function Task(props: taskProps) {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided) => (
        <div className="border p-2 rounded justify-center bg-white shadow-md" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <h1>{props.title}</h1>
        </div>
      )}
    </Draggable>
  );
}
