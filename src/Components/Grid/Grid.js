import { useState } from 'react';
import Square from '../Square/Square';
import Clock from '../Clock/Clock';
import SettingsIcon from '../Icons/Settings/Settings';
import { GAME_STATE_DEFEAT, GAME_STATE_VICTORY } from '../../State/State';
import GameOverOverlay from '../Overlay/GameOverOverlay';
import SettingsOverlay from '../Overlay/SettingsOverlay';

import styles from './Grid.module.scss';

function Grid(props) {

    let [showSettings, setShowSettings] = useState(false);

    let { state: { state, grid } } = props;
    let rows = [];

    for (var r = 0; r < grid.length; r++) {
        
        let row = [];
        for (var c = 0; c < grid[r].length; c++) {
            let item = grid[r][c];
            row.push(              
                <Square
                    gameState={state}
                    key={[r, c]} 
                    value={item.value} 
                    state={item.state} 
                    row={r} 
                    col={c}
                    updateState={props.updateState}
                />
            );
        }
        
        rows.push(<div key={r} className={styles.row}> { row } </div> );
    }

    let clickOpenSettings = () => {
        setShowSettings(true);
    }

    return (
        <div className={styles.grid}>
            { showSettings && <SettingsOverlay {...props} setShowSettings={setShowSettings} /> }

            <div className={styles.header}> 
                <div className={styles.minesLeft}> { props.state.minesRemaining }  </div>
                <div className={styles.settings} onClick={clickOpenSettings}> <SettingsIcon /> </div>
                <div className={styles.timeLeft}> <Clock {...props} /> </div>
            </div>
            { (state === GAME_STATE_DEFEAT || state === GAME_STATE_VICTORY) && <GameOverOverlay {...props} />}
            { rows }
        </div>
    );
}

export default Grid;
