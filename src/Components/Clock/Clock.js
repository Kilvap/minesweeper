import { useState, useEffect } from "react";
import { GAME_STATE_PREGAME, GAME_STATE_ACTIVE } from "../../State/State";
import { UpdateTimeAction } from "../../State/Actions";

function Clock(props) {

    let { state: { state }, updateState } = props;
    let [time, setTime] = useState(0);

    useEffect(() => {

        // Update state.time when game is over
        if (state !== GAME_STATE_PREGAME && time > 0 && state !== GAME_STATE_ACTIVE) {
            updateState(UpdateTimeAction(time));
            return;
        }

        let performTick = () => {
            return () => {
                setTime(time + 1);
            }
        }

        if (state === GAME_STATE_ACTIVE) {
            let intervalId = setInterval(performTick(), 1000);
            return () => clearInterval(intervalId);
        }

    }, [state, updateState, time]);

    return (
        <div>
            { time }
        </div>
    )
}

export default Clock;
