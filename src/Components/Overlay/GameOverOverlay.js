import { GAME_STATE_DEFEAT, GAME_STATE_VICTORY } from '../../State/State';
import { useGameContext } from '../../Context/Game/GameContext';
import { NewGameAction } from '../../Context/Game/GameContextReducer';

import styles from './Overlay.module.scss';

function GetContentClass(props) {
    let classes = [styles.content];

    if (props.state.state === GAME_STATE_VICTORY) {
        classes.push(styles.victory);
    }

    if (props.state.state === GAME_STATE_DEFEAT) {
        classes.push(styles.defeat);
    }

    return classes.join(" ");
}

export default function GameOverOverlay(props) {

    let { setGameContext } = useGameContext();

    let message = "Defeat";
    if (props.state.state === GAME_STATE_VICTORY) {
        message = "Victory!";
    }

    let playAgain = () => {
        setGameContext(NewGameAction());
    }

    return (
        <div className={styles.overlay}> 
            <div className={styles.container}>
                <div className={GetContentClass(props)}>
                    <div className={styles.top}> 
                        <div className={styles.topContent}>
                            <div className={styles.heading}> { message } </div>
                            { props.state.state === GAME_STATE_VICTORY && <div className={styles.details}> Completed in { props.state.time } seconds </div> }
                        </div>
                    </div>
                    <div className={styles.bottom}> 
                        <div className={styles.options}>
                            <div className={styles.button} onClick={playAgain}> Play Again </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
