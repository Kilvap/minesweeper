import { useRef } from 'react';
import { useGameContext } from '../../Context/Game/GameContext';
import { GAME_DIFFICULTY_BEGINNER, GAME_DIFFICULTY_EXPERT, GAME_DIFFICULTY_INTERMEDIATE, SetGameAction } from '../../Context/Game/GameContextReducer';

import styles from './SettingsOverlay.module.scss';

function GetContentClass() {
    let classes = [styles.content, styles.settings];
    return classes.join(" ");
}


export default function SettingsOverlay(props) {

    let { gameContext, setGameContext } = useGameContext();
    let difficultyOption = useRef(0);

    let applySettings = () => {
        setGameContext(SetGameAction(difficultyOption.current.value));
        props.setShowSettings(false);
    }

    let cancelSettings = () => {
        props.setShowSettings(false);
    }

    return (
        <div className={styles.overlay}> 
            <div className={styles.container}>
                <div className={GetContentClass()}>
                    <div className={styles.top}> 
                        <div className={styles.topContent}>
                            <div className={styles.heading}> Settings </div>
                        </div>

                        <div className={styles.middle}> 
                            <div className={styles.content}>
                                <div className={styles.difficulty}>
                                    <label htmlFor="difficulty">Difficulty</label>
                                    <select defaultValue={gameContext.difficulty} ref={difficultyOption} className={styles.difficultySelect} id="difficulty">
                                        <option value={GAME_DIFFICULTY_BEGINNER}>Beginner</option>
                                        <option value={GAME_DIFFICULTY_INTERMEDIATE}>Intermediate</option>
                                        <option value={GAME_DIFFICULTY_EXPERT}>Expert</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bottom}> 
                        <div className={styles.options}>
                            <div className={styles.button} onClick={applySettings}> Apply </div>
                            <div className={styles.button} onClick={cancelSettings}> Cancel </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
