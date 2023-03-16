import { Component, FunctionComponent, JSXElementConstructor, ReactElement, ReactNode } from "react";
import { useAppDispatch } from "../hooks";
import { clearNewStates } from '../reducers/taskInfo'

interface props {
  isVisible: boolean;
  onClose: Function;
  children: ReactNode
}

export function Modal({ isVisible, onClose, children }: props) {
  if (!isVisible) return null;
  const dispatch = useAppDispatch();
  function handleClose(e: any) {
    if (e.target.id === "modal-wrapper"){
      dispatch(clearNewStates())
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="modal-wrapper"
      onClick={(e) => handleClose(e)}
    >
      <div className="w-1/2 bg-white rounded p-4">{children}</div>
    </div>
  );
}
