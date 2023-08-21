import { useState, memo } from 'react';
import Cell from '../Cell/Cell';
import Clock from '../Clock/Clock';
import SettingsIcon from '../Icons/Settings/Settings';
import { GAME_STATE_DEFEAT, GAME_STATE_VICTORY } from '../../State/State';
import GameOverOverlay from '../Overlay/GameOverOverlay';
import SettingsOverlay from '../Overlay/SettingsOverlay';

import styles from './Grid.module.scss';
import { useGameContext } from '../../Context/Game/GameContext';

function Grid(props) {

    let [showSettings, setShowSettings] = useState(false);
    let { gameContext } = useGameContext();

    let { state: { state, grid, cellData } } = props;
    let rows = [];

    for (var r = 0; r < grid.length; r++) {
        
        let row = [];
        for (var c = 0; c < grid[r].length; c++) {
            let cellId = grid[r][c];

            row.push(              
                <Cell
                    difficulty={gameContext.difficulty}
                    key={cellId}
                    cellId={cellId}
                    value={cellData[cellId].value} 
                    state={cellData[cellId].state} 
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

export default memo(Grid);
