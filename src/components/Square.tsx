import React, { MouseEventHandler, SetStateAction, useState } from "react";
import Pin from "./Pin";
import "./styles/Square.css";

interface Props {
    onClickCallback: Function,
    color: "black" | "white" | "transparent",
    index: number,
};

function Square({onClickCallback, color, index}: Props) {


    return (
        <div className="Square" onClick={() => onClickCallback(index)}>
            {color !== "transparent" ? <Pin color={color} /> : null}
        </div>
    )
}

export default Square;