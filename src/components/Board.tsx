import React, { useState } from "react";
import Square from "./Square";
import CurrentPlayer from "./CurrentPlayer";
import "./styles/Board.css";

function Board() {

    const [currentPlayer, setCurrentPlayer] = useState<"black"|"white">("black");

    const play = (index: number) => {
        setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
    }

    const initSquares = () => {
        let squares = [];
        for (let i = 0; i < 8 * 8; i++) {
            let defaultColor: "black"|"white"|"transparent" = "transparent";
            if (i === 27 || i === 36) defaultColor = "white";
            if (i === 28 || i === 35) defaultColor = "black";
            squares.push(
                <Square
                    key={i}
                    currentPlayer={currentPlayer}
                    onClickCallback={play}
                    defaultColor={defaultColor}
                    index={i}
                    />
            );
        }

        return squares;
    }

    return (
        <div className="Board">
            <CurrentPlayer defaultPlayer={currentPlayer} />

            <div className="Board-Wrapper">
                {initSquares()}
            </div>
        </div>
    )
}

export default Board;