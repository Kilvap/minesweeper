import { memo } from 'react';
import { CELL_STATE_HIDDEN, CELL_STATE_SHOWN, CELL_STATE_FLAGGED } from '../../State/State';
import { ClickCellAction, FlagCellAction } from '../../State/Actions';
import FlagIcon from '../Icons/Flag/Flag';
import MineIcon from '../Icons/Mine/Mine';
import { GAME_DIFFICULTY_BEGINNER, GAME_DIFFICULTY_INTERMEDIATE, GAME_DIFFICULTY_EXPERT } from '../../Context/Game/GameContextReducer';

import styles from './Cell.module.scss';

let colors = {
    1: styles.blue,
    2: styles.green,
    3: styles.red,
    4: styles.purple,
    5: styles.brown,
    6: styles.pink,
    7: styles.yellow,
    8: styles.teal
};

let cellSizeClasses = {
    [GAME_DIFFICULTY_BEGINNER]: styles.beginner,
    [GAME_DIFFICULTY_INTERMEDIATE]: styles.intermediate,
    [GAME_DIFFICULTY_EXPERT]: styles.expert,
};

function GetCellClass(props) {
    
    let classes = [styles.cell];
    classes.push(cellSizeClasses[props.difficulty]);
    
    if (props.state === CELL_STATE_HIDDEN) {
        classes.push(styles.hidden);
    }

    if (props.state === CELL_STATE_FLAGGED) {
        classes.push(styles.hidden);
    }

    if (props.state === CELL_STATE_SHOWN) {
        classes.push(styles.shown);
    }

    if (props.state === CELL_STATE_SHOWN && props.value > 0) {
        classes.push(colors[props.value]);
    }

    if (props.state === CELL_STATE_SHOWN && props.value < 0) {
        classes.push(styles.bomb);
    }

    return classes.join(" ");
}

function Cell(props) {

    let displayValue = "";

    if (props.state === CELL_STATE_SHOWN && props.value > 0) {
        displayValue = props.value;
    }

    if (props.state === CELL_STATE_SHOWN && props.value < 0) {
        displayValue = <MineIcon />;
    }

    if (props.state === CELL_STATE_FLAGGED) {
        displayValue = <FlagIcon />;
    }

    let clickCell = (props) => (e) => {

        if (e.nativeEvent.button === 0) {
            props.updateState(ClickCellAction(props.cellId));
        } else if (e.nativeEvent.button === 2) {
            e.preventDefault();
            props.updateState(FlagCellAction(props.cellId));
        }

        return false;
    }

    return (
        <div className={GetCellClass(props)} onClick={clickCell(props)} onContextMenu={clickCell(props)}> { displayValue } </div>
    )
}

export default memo(Cell);
