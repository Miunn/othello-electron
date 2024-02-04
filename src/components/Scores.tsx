import Pin from "./Pin";
import "./styles/Scores.css";

interface Props {
    blackPins: number,
    whitePins: number,
}

function Scores({blackPins, whitePins}: Props) {
    return (
        <div className="Scores">
            <h1 className="Scores-Headline">Scores</h1>
            <div className="Score">
                <Pin color="black" />

                <p>{blackPins}</p>
            </div>
            <div className="Score">
                <Pin color="white" />

                <p>{whitePins}</p>
            </div>
        </div>
    )
}

export default Scores;