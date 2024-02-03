import React, { useState } from "react";
import Square from "./Square";
import "./styles/Board.css";

function Board() {

    const [currentPlayer, setCurrentPlayer] = useState<"black"|"white">("black");

    const play = (event: React.MouseEvent) => {
        setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
    }

    const getSquares = () => {
        let squares = [];
        for (let i = 0; i < 8 * 8; i++) {
            squares.push(<Square currentPlayer={currentPlayer} onClickCallback={play} />);
        }
        return squares;
    }

    return (
        <div className="Board">
            <div className="Board-Wrapper">
                {getSquares()}
            </div>
        </div>
    )
}

export default Board;