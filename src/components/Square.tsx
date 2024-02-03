import React, { MouseEventHandler, SetStateAction, useState } from "react";
import "./styles/Square.css";

interface Props {
    currentPlayer: SetStateAction<"black" | "white" | "transparent">,
    onClickCallback: MouseEventHandler
};

function Square({currentPlayer, onClickCallback}: Props) {

    const [color, setColor] = useState<"black"|"white"|"transparent">("transparent");

    const onClickSquare = (event: React.MouseEvent) => {
        setColor(currentPlayer);
        onClickCallback(event);
    }

    return (
        <div className="Square" onClick={onClickSquare}>
            <div className="Square-object" style={{backgroundColor: `${color}`}}>

            </div>
        </div>
    )
}

export default Square;