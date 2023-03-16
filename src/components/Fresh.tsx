import { useAppSelector, useAppDispatch } from "../hooks";
import { LargeTask } from "./LargeTask"
import {Fragment} from "react"

export function Fresh() {
  const state = useAppSelector(state => state.tasksInfo.freshTasks)
  const tasks = [];
  const source = 'fresh'
  for (let i=0; i<state.length; i++){
    tasks.push(<LargeTask title={state[i].title} notes={state[i].notes} subTasks={state[i].subTasks} index={i} source={source}/>)
  }
  return (
    <div className="flex p-6 w-full justify-start flex-col space-y-2">
      {tasks}
    </div>
  )
}