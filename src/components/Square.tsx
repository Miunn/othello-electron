import Pin from "./Pin";
import "./styles/Square.css";

interface Props {
    onClickCallback: Function,
    color: "black" | "white" | "transparent",
    index: number,
    highlightColor: "black" | "white" | "transparent",
};

function Square({onClickCallback, color, index, highlightColor}: Props) {

    return (
        <div className="Square" onClick={() => onClickCallback(index)} style={{position: "relative"}}>
            {color !== "transparent" ? <Pin color={color} /> : null}
            <div style={{opacity: 0.5}}>
                {highlightColor !== "transparent" ? <Pin color={highlightColor} /> : null}
            </div>
        </div>
    )
}

export default Square;