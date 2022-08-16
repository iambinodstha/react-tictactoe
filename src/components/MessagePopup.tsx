import { ReactComponent as CircleIcon } from "../assets/svg/circle.svg";
import { ReactComponent as CrossIcon } from "../assets/svg/cross.svg";

type Props = {
    player: number;
    restartGame: () => void;
}

const MessagePopup = ({ player, restartGame }: Props) => {
    return (
        <div className='popup-backdrop'>
            <div className='popup-view'>

                {player === 0 ? (
                    <div>
                        <CircleIcon style={{ width: "90px" }} stroke="rgba(0, 0, 0, 0.8)" />
                        <CrossIcon style={{ width: "95px", marginLeft: "20px" }} />
                    </div>
                ) : player === 1 ? (
                    <CircleIcon style={{ width: "180px" }} stroke="rgba(0, 0, 0, 0.8)" />
                ) : (
                    <CrossIcon style={{ width: "190px" }} />
                )}

                <h1>{player === 0 ? "DRAW" : "WINNER"}!</h1>
                <button onClick={restartGame} className='restart-button'>Restart game</button>
            </div>
        </div>
    )
}

export default MessagePopup;