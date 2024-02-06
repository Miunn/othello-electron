import Pin from "./Pin";
import "./styles/CurrentPlayer.css";

interface Props {
    defaultPlayer: "black" | "white",
}

function CurrentPlayer({defaultPlayer}: Props) {
    return (
        <div className="Current-Wrapper">
            <h1>Current</h1>

            <Pin color={defaultPlayer} />
        </div>
    )
}

export default CurrentPlayer;