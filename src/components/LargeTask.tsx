import { useAppDispatch, useAppSelector } from "../hooks";
import { Notes } from "./Notes";
import {
  addNoteToInProgressTask,
  addNoteToCompletedTask,
  addNoteToFreshTask,
  updateNewNote,
  updateNewSubTask,
  addInProgressSubTask,
  addCompletedSubTask,
  addFreshSubTask,
  subtask,
} from "../reducers/taskInfo";
import { useState } from "react";
import { Modal } from "./Modal";
import { SubTasks } from "./SubTasks";
import { useDispatch } from "react-redux";
import React from "react";
interface props {
  title: string;
  notes: Array<string>;
  index: number;
  subTasks: Array<subtask>;
  source: string;
}

export function LargeTask(props: props) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.tasksInfo);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showSubTaskModal, setShowSubTaskModal] = useState(false);

  return (
    <div className="rounded-lg border w-full p-4 shadow-md">
      <div className="flex  w-full justify-between items-center">
        <h1 className="text-4xl mb-2">{props.title}</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowNoteModal(true)}
            className="bg-blue-800 rounded p-2 text-stone-50"
          >
            Add Note
          </button>
          <button
            onClick={() => setShowSubTaskModal(true)}
            className="bg-blue-800 rounded p-2 text-stone-50"
          >
            Add SubTask
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h1 className="text-lg">Subtasks: </h1>
        <SubTasks
          subTasks={props.subTasks}
          index={props.index}
          source={props.source}
        />
        <h1 className="text-lg">Notes:</h1>
        <Notes notes={props.notes} />
      </div>
      <div className="flex w-full justify-self-end"></div>
      <Modal isVisible={showNoteModal} onClose={() => setShowNoteModal(false)}>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            className="border rounded w-100 p-3"
            onChange={(e) => {
              dispatch(updateNewNote(e.target.value));
            }}
          />
          <button
            className="bg-blue-800 text-stone-200 p-3 rounded hover:bg-blue-600 justify-self-end"
            onClick={() => {
              //   dispatch(
              //     addNoteToInProgressTask({
              //       index: props.index,
              //       addNote: state.newNote,
              //     })
              //   );
              if (props.source === "inProgress") {
                dispatch(
                  addNoteToInProgressTask({
                    index: props.index,
                    addNote: state.newNote,
                  })
                );
              } else if (props.source === "completed") {
                dispatch(
                  addNoteToCompletedTask({
                    index: props.index,
                    addNote: state.newNote,
                  })
                );
              } else if (props.source === "fresh") {
                dispatch(
                  addNoteToFreshTask({
                    index: props.index,
                    addNote: state.newNote,
                  })
                );
              }
              setShowNoteModal(false);
            }}
          >
            Add Note
          </button>
        </div>
      </Modal>
      <Modal
        isVisible={showSubTaskModal}
        onClose={() => setShowSubTaskModal(false)}
      >
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            className="border rounded w-full p-3"
            onChange={(e) => {
              dispatch(updateNewSubTask(e.target.value));
            }}
          />
          <button
            className="bg-blue-800 text-stone-200 p-3 rounded hover:bg-blue-600 justify-self-end"
            onClick={() => {
              if (props.source === "inProgress") {
                dispatch(
                  addInProgressSubTask({
                    index: props.index,
                    addSubTask: state.newSubTask,
                  })
                );
              } else if (props.source === "completed") {
                dispatch(
                  addCompletedSubTask({
                    index: props.index,
                    addSubTask: state.newSubTask,
                  })
                );
              } else if (props.source === "fresh") {
                dispatch(
                  addFreshSubTask({
                    index: props.index,
                    addSubTask: state.newSubTask,
                  })
                );
              }
              setShowNoteModal(false);
            }}
          >
            Add SubTask
          </button>
        </div>
      </Modal>
    </div>
  );
}
