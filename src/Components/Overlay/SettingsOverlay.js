import { useRef } from 'react';
import { useGameContext } from '../../Context/Game/GameContext';

import styles from './Overlay.module.scss';
import settingsOverlayStyles from './SettingsOverlay.module.scss';
import { GAME_DIFFICULTY_BEGINNER, GAME_DIFFICULTY_EXPERT, GAME_DIFFICULTY_INTERMEDIATE, SetGameAction } from '../../Context/Game/GameContextReducer';

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
        <div className={settingsOverlayStyles.overlay}> 
            <div className={styles.container}>
                <div className={GetContentClass()}>
                    <div className={settingsOverlayStyles.top}> 
                        <div className={styles.topContent}>
                            <div className={styles.heading}> Settings </div>
                        </div>

                        <div className={settingsOverlayStyles.middle}> 
                            <div className={settingsOverlayStyles.content}>
                                <div className={settingsOverlayStyles.difficulty}>
                                    <label for="difficulty">Difficulty</label>
                                    <select defaultValue={gameContext.difficulty} ref={difficultyOption} className={settingsOverlayStyles.difficultySelect} id="difficulty">
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
