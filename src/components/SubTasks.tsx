import { Fragment } from "react"
import { useAppDispatch } from "../hooks";
import { subtask, toggleCompletedTaskSub, toggleFreshTaskSub, toggleInProgressTaskSub } from "../reducers/taskInfo";

interface props {
    subTasks: Array<subtask>
    source: string
    index: number
}
export function SubTasks (props: props) {
    const subTasks: Array<JSX.Element> = [];
    const dispatch = useAppDispatch()
    for (let i=0; i<props.subTasks.length; i++){
        subTasks.push(
            <div className="flex w-full space-x-20">
                <p>{props.subTasks[i].text}</p><input type="checkbox" checked={props.subTasks[i].completed? true: false} onClick={(e)=>{
                    if (props.source === 'inProgress'){
                        dispatch(toggleInProgressTaskSub({index: props.index, i: i}))
                    }else if (props.source === 'completed'){
                        dispatch(toggleCompletedTaskSub({index: props.index, i: i}))
                    }else if (props.source === 'fresh'){
                        dispatch(toggleFreshTaskSub({index: props.index, i: i}))
                    }
                }}/>
            </div>
        )
    }
    return (
        <Fragment>
            {subTasks}
        </Fragment>
    )
}