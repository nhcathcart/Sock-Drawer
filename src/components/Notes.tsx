import React from "react";
import { Fragment } from "react"

interface props {
    notes: Array<string>
}
export function Notes (props: props) {
    const notes: Array<JSX.Element> = [];
    for (let i=0; i<props.notes.length; i++){
        notes.push(
            <p>{props.notes[i]}</p>
        )
    }
    return (
        <Fragment>
            {notes}
        </Fragment>
    )
}