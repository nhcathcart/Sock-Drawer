import { useAppSelector, useAppDispatch } from "../hooks";
import { LargeTask } from "./LargeTask";
import { Fragment, ReactElement } from "react";
import React from "react";

export function Completed() {
  const state = useAppSelector((state) => state.tasksInfo.completedTasks);
  const tasks: ReactElement[] = [];
  const source = "completed";
  for (let i = 0; i < state.length; i++) {
    tasks.push(
      <LargeTask
        title={state[i].title}
        notes={state[i].notes}
        subTasks={state[i].subTasks}
        index={i}
        source={source}
      />
    );
  }
  return <div className="flex p-6 w-full justify-start flex-col">{tasks}</div>;
}
