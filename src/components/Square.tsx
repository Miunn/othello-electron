import React, { MouseEventHandler, SetStateAction, useState } from "react";
import Pin from "./Pin";
import "./styles/Square.css";

interface Props {
    currentPlayer: SetStateAction<"black" | "white" | "transparent">,
    onClickCallback: Function,
    defaultColor: "black" | "white" | "transparent",
    index: number,
};

function Square({currentPlayer, onClickCallback, defaultColor, index}: Props) {

    const [color, setColor] = useState<"black"|"white"|"transparent">(defaultColor);

    const onClickSquare = () => {
        setColor(currentPlayer);
        onClickCallback(index);
    }

    return (
        <div className="Square" onClick={onClickSquare}>
            {color !== "transparent" ? <Pin color={color} /> : null}
        </div>
    )
}

export default Square;