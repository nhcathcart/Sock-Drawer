import { Fragment } from "react"
import { subtask } from "../reducers/taskInfo";

interface props {
    subTasks: Array<subtask>
}
export function SubTasks (props: props) {
    const subTasks: Array<JSX.Element> = [];
    console.log(props.subTasks)
    for (let i=0; i<props.subTasks.length; i++){
        subTasks.push(
            <div className="flex w-full space-x-20">
                <p>{props.subTasks[i].text}</p><input type="checkbox"/>
            </div>
        )
    }
    return (
        <Fragment>
            {subTasks}
        </Fragment>
    )
}