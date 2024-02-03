import "./styles/Pin.css";

interface Props {
    color: "black" | "white",
};

function Pin({color}: Props) {
    return (
        <div className="Pin" style={{backgroundColor: `${color}`}}></div>
    )
}

export default Pin;