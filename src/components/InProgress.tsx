import { useAppSelector, useAppDispatch } from "../hooks";
import { LargeTask } from "./LargeTask";
import { Fragment, ReactElement } from "react";
import React from "react";

export function InProgress() {
  const state = useAppSelector((state) => state.tasksInfo.inProgressTasks);
  const dispatch = useAppDispatch();
  const source: string = "inProgress";
  const tasks: ReactElement[] = [];
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
