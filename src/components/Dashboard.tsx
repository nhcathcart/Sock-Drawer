import { useAppSelector, useAppDispatch } from "../hooks";
import { useEffect, Fragment, useState, ReactNode } from "react";
import {
  addTask,
  updateNewTaskTitle,
  addFreshTask,
  addInProgressTask,
  addCompletedTask,
  removeFreshTask,
  removeInProgressTask,
  removeCompletedTask,
} from "../reducers/taskInfo";
import { Modal } from "./Modal";
import { Task } from "./Task";
import { v4 as uuid } from "uuid";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

export function Dashboard() {
  const state = useAppSelector((state) => state.tasksInfo);
  const dispatch = useAppDispatch();

  const freshTasks: any = [];
  const inProgressTasks: any = [];
  const completedTasks: any = [];

  for (let i = 0; i < state.freshTasks?.length; i++) {
    freshTasks.push(
      <Task
        title={state.freshTasks[i].title}
        key={uuid()}
        draggableId={uuid()}
        index={i}
      />
    );
  }

  for (let i = 0; i < state.inProgressTasks?.length; i++) {
    inProgressTasks.push(
      <Task
        title={state.inProgressTasks[i].title}
        key={uuid()}
        draggableId={uuid()}
        index={i}
      />
    );
  }

  for (let i = 0; i < state.completedTasks?.length; i++) {
    completedTasks.push(
      <Task
        title={state.completedTasks[i].title}
        key={uuid()}
        draggableId={uuid()}
        index={i}
      />
    );
  }

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    let toAdd;
    let fresh = state.freshTasks;
    let inProgress = state.inProgressTasks;
    let completed = state.completedTasks;

    if (source.droppableId === "freshDrop") {
      toAdd = fresh[source.index];
      dispatch(removeFreshTask(source.index));
    } else if (source.droppableId === "inProgressDrop") {
      toAdd = inProgress[source.index];
      dispatch(removeInProgressTask(source.index));
    } else if (source.droppableId === "completedDrop") {
      toAdd = completed[source.index];
      dispatch(removeCompletedTask(source.index));
    }

    if (destination.droppableId === "freshDrop") {
      dispatch(addFreshTask({ toAdd: toAdd, index: destination.index }));
    } else if (destination.droppableId === "inProgressDrop") {
      console.log("here");
      dispatch(addInProgressTask({ toAdd: toAdd, index: destination.index }));
    } else if (destination.droppableId === "completedDrop") {
      dispatch(addCompletedTask({ toAdd: toAdd, index: destination.index }));
    }
  }
  //modal state
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <div className="flex w-full h-full flex-col p-2 md:flex-row space-x-3">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col shadow-inner bg-gray-50 h-full rounded-xl border-solid items-center w-full md:w-1/3">
            <div className="bg-blue-400 text-stone-50 flex justify-center text-2xl w-10/12 rounded m-3 p-2 shadow-xl">
              <h4>fresh</h4>
            </div>
            <Droppable droppableId="freshDrop">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-10/12 h-[100%] rounded space-y-2 ${
                    snapshot.isDraggingOver ? "bg-blue-200" : null
                  }`}
                >
                  {freshTasks}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <button
              className="flex text-stone-200 bg-blue-800 rounded p-2 justify-self-end hover:bg-blue-500"
              onClick={() => {
                setShowModal(true);
              }}
            >
              add task
            </button>
          </div>
          <div className="flex flex-col h-full shadow-inner bg-gray-50 rounded-xl border-solid items-center w-full md:w-1/3">
            <div className="bg-orange-500 text-stone-50 flex justify-center text-2xl w-10/12 rounded m-3 p-2 shadow-xl">
              <h4>folding</h4>
            </div>
            <Droppable droppableId="inProgressDrop">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-10/12 h-[100%] rounded space-y-2 ${
                    snapshot.isDraggingOver ? "bg-blue-200" : null
                  }`}
                >
                  {inProgressTasks}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="flex flex-col h-full shadow-inner bg-gray-50 rounded-xl border-solid items-center w-full md:w-1/3">
            <div className="bg-blue-800 text-stone-50 flex justify-center text-2xl w-10/12 rounded m-3 p-2 shadow-xl">
              <h4>put away</h4>
            </div>
            <Droppable droppableId="completedDrop">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-10/12 h-[100%] rounded space-y-2 ${
                    snapshot.isDraggingOver ? "bg-blue-200" : null
                  }`}
                >
                  {completedTasks}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl">New Task</h1>
          <label>Title:</label>
          <input
            type="text"
            className="rounded border p-3"
            onChange={(e) => dispatch(updateNewTaskTitle(e.target.value))}
          />
          <button className="bg-blue-800 text-stone-200 p-3 rounded hover:bg-blue-600 justify-self-end"
            onClick={() => {
              dispatch(
                addTask({
                  title: state.newTask.title,
                  status: state.newTask.status,
                  notes: [],
                  subTasks: [],
                })
              );
            }}
          >
            add
          </button>
        </div>
      </Modal>
    </Fragment>
  );
}

export function AddTask() {
  return <div>this is the add Task</div>;
}
