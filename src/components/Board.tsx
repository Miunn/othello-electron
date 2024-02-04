import React, { useEffect, useState } from "react";
import Square from "./Square";
import CurrentPlayer from "./CurrentPlayer";
import "./styles/Board.css";

type SquareType = {
    index: number,
    color: "black" | "white" | "transparent",
    highlightColor: "black" | "white" | "transparent",
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
        let sqs: SquareType[] = [];
        for (let i = 0; i < 8 * 8; i++) {
            let defaultColor: "black" | "white" | "transparent" = "transparent";
            if (i === 27 || i === 36) defaultColor = "white";
            if (i === 28 || i === 35) defaultColor = "black";
            sqs.push({
                index: i,
                color: defaultColor,
                highlightColor: "transparent",
            });
        }

        console.log(sqs);
        return sqs;
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

    const switchPins = (direction: DirectionType, color: 'black' | 'white', index: number, pins: SquareType[]): SquareType[] => {
        switch (direction) {
            case DirectionType.TOP:
                return switchPinsTop(color, index, pins);

            case DirectionType.RIGHT:
                return switchPinsRight(color, index, pins);

            case DirectionType.BOTTOM:
                return switchPinsBottom(color, index, pins);

            case DirectionType.LEFT:
                return switchPinsLeft(color, index, pins);

            case DirectionType.DTR:
                return switchPinsDTR(color, index, pins);

            case DirectionType.DBR:
                return switchPinsDBR(color, index, pins);

            case DirectionType.DBL:
                return switchPinsDBL(color, index, pins);

            case DirectionType.DTL:
                return switchPinsDTL(color, index, pins);

            default:
                return pins;
        }
    }

    const switchPinsTop = (color: "black" | "white", index: number, pins: SquareType[]): SquareType[] => {
        for (let i = index - 8; i >= 0; i -= 8) {
            const currPin = pins[i].color;
            if (currPin === "transparent" || currPin === color) break;

            pins[i].color = color;
        }
        return pins;
    }

    const switchPinsBottom = (color: "black" | "white", index: number, pins: SquareType[]): SquareType[] => {
        for (let i = index + 8; i < 64; i += 8) {
            const currPin = pins[i].color;
            if (currPin === "transparent" || currPin === color) break;

            pins[i].color = color;
        }
        return pins;
    }

    const switchPinsLeft = (color: "black" | "white", index: number, pins: SquareType[]): SquareType[] => {
        for (let i = index - 1; i >= index - (index % 8); i--) {
            const currPin = pins[i].color;
            if (currPin === "transparent" || currPin === color) break;

            pins[i].color = color;
        }
        return pins;
    }

    const switchPinsRight = (color: "black" | "white", index: number, pins: SquareType[]): SquareType[] => {
        for (let i = index + 1; i < index + 8 - (index % 8); i++) {
            const currPin = pins[i].color;
            if (currPin === "transparent" || currPin === color) break;

            pins[i].color = color;
        }
        return pins;
    }

    const switchPinsDTR = (color: "black" | "white", index: number, pins: SquareType[]): SquareType[] => {
        // DTR
        for (let i = index - 7; i > index + 8 - (index % 8) - (7-index%8)*8 && i >= 0; i -= 7) {
            const currPin = pins[i].color;
            if (currPin === "transparent" || currPin === color) break;

            pins[i].color = color;
        }
        return pins;
    }

    const switchPinsDBR = (color: "black"|"white", index: number, pins: SquareType[]): SquareType[] => {
        // DBR
        for (let i = index + 9; i < index + 8 - (index % 8) + (7-index%8)*8 && i < 64; i += 9) {
            const currPin = pins[i].color;

            if (currPin === "transparent" || currPin === color) break;
            pins[i].color = color;
        }
        return pins;
    }

    const switchPinsDBL = (color: "black"|"white", index: number, pins: SquareType[]): SquareType[] => {
        // DBL
        for (let i = index + 7; i < index - (index%8) + index%8*8 && i < 64; i += 7) {
            const currPin = pins[i].color;

            if (currPin === "transparent" || currPin === color) break;
            pins[i].color = color;
        }
        return pins;
    }

    const switchPinsDTL = (color: "black"|"white", index: number, pins: SquareType[]): SquareType[] => {
        // DTL
        for (let i = index - 9; i >= index - (index%8) - index%8*8 && i >= 0; i -= 9) {
            const currPin = pins[i].color;

            if (currPin === "transparent" || currPin === color) break;
            pins[i].color = color;
        }
        return pins;
    }

    const play = (index: number) => {
        const square = squares[index];

        if (square.color !== "transparent") return;

        const validDirections = getValidDirection(index, currentPlayer);

        if (validDirections.length < 1) return;

        let switchedSquares = [...squares];
        switchedSquares[index].color = currentPlayer;
        for (let direction of validDirections) {
            switchPins(direction, currentPlayer, index, switchedSquares);
        }
        setSquares(switchedSquares);

        setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
    }

    const highlightValidMoves = () => {
        const newHighLight = squares.map((sq, i) => {
            let updated: SquareType = {
                ...sq
            };

            updated.highlightColor = "transparent";

            if (squares[i].color !== "transparent") return updated;
            if (getValidDirection(i, currentPlayer).length === 0) return updated;

            console.log("should update highlight color at", i, "to", currentPlayer);
            updated.highlightColor = currentPlayer;
            return updated
        });
        setSquares(newHighLight);
    }

    useEffect(() => {
        setSquares(initSquares());
        console.log("Sat squares", squares);
    }, []);

    useEffect(() => {
        if (squares.length === 0) return;

        // If we run it on squares empty (before initial setSquares finishes)
        // This will map on an empty array and setSquares with that empty array
        // Overwriting the init setSquares
        highlightValidMoves();
    }, [currentPlayer]);

    return (
        <div className="Board">
            <CurrentPlayer defaultPlayer={currentPlayer} />

            <div className="Board-Wrapper">
                {squares.map((sq) =>
                    <Square
                        key={sq.index}
                        color={sq.color}
                        highlightColor={sq.highlightColor}
                        index={sq.index}
                        onClickCallback={play}
                    />
                )}
            </div>
        </div>
    )
}

export default Board;