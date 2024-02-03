import React, { MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import Pin from "./Pin";
import "./styles/Square.css";

interface Props {
    onClickCallback: Function,
    color: "black" | "white" | "transparent",
    index: number,
    highlightColor: "black" | "white" | "transparent",
};

function Square({onClickCallback, color, index, highlightColor}: Props) {

    useEffect(() => {
        console.log("CHANGED HIGHLIGHT COLOR AT INDEX:", index, "TO:", highlightColor);
    }, [highlightColor, index]);

    return (
        <div className="Square" onClick={() => onClickCallback(index)} style={{position: "relative"}}>
            <div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, color: "red"}}>{index}</div>
            {color !== "transparent" ? <Pin color={color} /> : null}
            <div style={{opacity: 0.5}}>
                {highlightColor !== "transparent" ? <Pin color={highlightColor} /> : null}
            </div>
        </div>
    )
}

export default Square;