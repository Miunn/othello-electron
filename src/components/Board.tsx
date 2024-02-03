import React, { SetStateAction, useEffect, useState } from "react";
import Square from "./Square";
import CurrentPlayer from "./CurrentPlayer";
import "./styles/Board.css";
import { copyFile, copyFileSync } from "fs";

type SquareType = {
    index: number,
    color: "black" | "white" | "transparent",
}

enum DirectionType {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
    DTR,
    DBR,
    DBL,
    DTL,
}

function Board() {

    const [squares, setSquares] = useState<SquareType[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<"black" | "white">("black");

    const initSquares = (): SquareType[] => {
        let squares: SquareType[] = [];
        for (let i = 0; i < 8 * 8; i++) {
            let defaultColor: "black" | "white" | "transparent" = "transparent";
            if (i === 27 || i === 36) defaultColor = "white";
            if (i === 28 || i === 35) defaultColor = "black";
            squares.push({
                index: i,
                color: defaultColor,
            });
        }

        return squares;
    }

    const getValidDirection = (index: number, color: "black" | "white") => {
        const directions: DirectionType[] = [];

        // Top
        for (let i = index - 8; i >= 0; i -= 8) {
            const currPin = squares[i].color;
            if (currPin === "transparent") break;
            if (currPin === color && index - i > 8) {
                directions.push(DirectionType.TOP);
                break;
            } else if (currPin === color) break;
        }

        // Bottom
        for (let i = index + 8; i < 64; i += 8) {
            const currPin = squares[i].color;
            if (currPin === "transparent") break;
            if (currPin === color && i - index > 8) {
                directions.push(DirectionType.BOTTOM);
                break;
            } else if (currPin === color) break;
        }

        // Left
        for (let i = index - 1; i >= index - (index % 8); i--) {
            const currPin = squares[i].color;
            if (currPin === "transparent") break;
            if (currPin === color && index - i > 1) {
                directions.push(DirectionType.LEFT);
                break;
            } else if (currPin === color) break;
        }

        // Right
        for (let i = index + 1; i < index + 8 - (index % 8); i++) {
            const currPin = squares[i].color;
            if (currPin === "transparent") break;
            if (currPin === color && i - index > 1) {
                directions.push(DirectionType.RIGHT);
                break;
            } else if (currPin === color) break;
        }

        // DTR
        for (let i = index - 7; i > index + 8 - (index % 8) - (7-index%8)*8 && i >= 0; i -= 7) {
            const currPin = squares[i].color;
            console.log(currPin, index);

            if (currPin === "transparent") break;
            if (currPin === color && index - i > 7) {
                directions.push(DirectionType.DTR);
                break;
            } else if (currPin === color) break;
        }

        // DBR
        for (let i = index + 9; i < index + 8 - (index % 8) + (7-index%8)*8 && i < 64; i += 9) {
            const currPin = squares[i].color;

            if (currPin === "transparent") break;
            if (currPin === color && i - index > 9) {
                directions.push(DirectionType.DBR);
                break;
            } else if (currPin === color) break;
        }

        // DBL
        for (let i = index + 7; i < index - (index%8) + index%8*8 && i < 64; i += 7) {
            const currPin = squares[i].color;

            if (currPin === "transparent") break;
            if (currPin === color && i - index > 8) {
                directions.push(DirectionType.DBL);
                break;
            } else if (currPin === color) break;
        }

        // DTL
        for (let i = index - 9; i >= index - (index%8) - index%8*8 && i >= 0; i -= 9) {
            const currPin = squares[i].color;

            if (currPin === "transparent") break;
            if (currPin === color && index - i > 9) {
                directions.push(DirectionType.DTL);
                break;
            } else if (currPin === color) break;
        }
        return directions;
    }

    const switchPins = (direction: DirectionType, color: 'black' | 'white', index: number) => {
        switch (direction) {
            case DirectionType.TOP:
                switchPinsTop(color, index);
                break;

            case DirectionType.RIGHT:
                switchPinsRight(color, index);
                break;

            case DirectionType.BOTTOM:
                switchPinsBottom(color, index);
                break;

            case DirectionType.LEFT:
                switchPinsLeft(color, index);
                break;

            case DirectionType.DTR:
                switchPinsDTR(color, index);
                break;

            case DirectionType.DBR:
                switchPinsDBR(color, index);
                break;

            case DirectionType.DBL:
                switchPinsDBL(color, index);
                break;

            case DirectionType.DTL:
                switchPinsDTL(color, index);
                break;

            default:
                break;
        }
    }

    const switchPinsTop = (color: "black" | "white", index: number) => {
        for (let i = index - 8; i >= 0; i -= 8) {
            const currPin = squares[i].color;
            if (currPin === "transparent" || currPin === color) break;

            squares[i].color = color;
        }
    }

    const switchPinsBottom = (color: "black" | "white", index: number) => {
        for (let i = index + 8; i < 64; i += 8) {
            const currPin = squares[i].color;
            if (currPin === "transparent" || currPin === color) break;

            squares[i].color = color;
        }
    }

    const switchPinsLeft = (color: "black" | "white", index: number) => {
        for (let i = index - 1; i >= index - (index % 8); i--) {
            const currPin = squares[i].color;
            if (currPin === "transparent" || currPin === color) break;

            squares[i].color = color;
        }
    }

    const switchPinsRight = (color: "black" | "white", index: number) => {
        for (let i = index + 1; i < index + 8 - (index % 8); i++) {
            const currPin = squares[i].color;
            if (currPin === "transparent" || currPin === color) break;

            squares[i].color = color;
        }
    }

    const switchPinsDTR = (color: "black" | "white", index: number) => {
        // DTR
        for (let i = index - 7; i > index + 8 - (index % 8) - (7-index%8)*8 && i >= 0; i -= 7) {
            const currPin = squares[i].color;
            if (currPin === "transparent" || currPin === color) break;

            squares[i].color = color;
        }
    }

    const switchPinsDBR = (color: "black"|"white", index: number) => {
        // DBR
        for (let i = index + 9; i < index + 8 - (index % 8) + (7-index%8)*8 && i < 64; i += 9) {
            const currPin = squares[i].color;

            if (currPin === "transparent" || currPin === color) break;
            squares[i].color = color;
        }
    }

    const switchPinsDBL = (color: "black"|"white", index: number) => {
        // DBL
        for (let i = index + 7; i < index - (index%8) + index%8*8 && i < 64; i += 7) {
            const currPin = squares[i].color;

            if (currPin === "transparent" || currPin === color) break;
            squares[i].color = color;
        }
    }

    const switchPinsDTL = (color: "black"|"white", index: number) => {
        // DTL
        console.log("Switch DTL for index:", index);
        for (let i = index - 9; i >= index - (index%8) - index%8*8 && i >= 0; i -= 9) {
            const currPin = squares[i].color;
            console.log(currPin);

            if (currPin === "transparent" || currPin === color) break;
            squares[i].color = color;
        }
    }

    const play = (index: number) => {
        const square = squares[index];

        if (square.color !== "transparent") return;

        const validDirections = getValidDirection(index, currentPlayer);

        console.log(validDirections);
        if (validDirections.length < 1) return;

        square.color = currentPlayer;

        for (let direction of validDirections) {
            switchPins(direction, currentPlayer, index);
        }

        setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
    }

    useEffect(() => {
        setSquares(initSquares());
    }, []);

    return (
        <div className="Board">
            <CurrentPlayer defaultPlayer={currentPlayer} />

            <div className="Board-Wrapper">
                {squares.map((sq) =>
                    <Square
                        key={sq.index}
                        color={sq.color}
                        index={sq.index}
                        onClickCallback={play}
                    />
                )}
            </div>
        </div>
    )
}

export default Board;