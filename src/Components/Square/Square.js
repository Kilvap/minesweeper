import styles from './Square.module.scss';
import { SQUARE_STATE_HIDDEN, SQUARE_STATE_SHOWN, SQUARE_STATE_FLAGGED, GAME_STATE_ACTIVE, GAME_STATE_PREGAME } from '../../State/State';
import { ClickSquareAction, FlagSquareAction } from '../../State/Actions';
import FlagIcon from '../Icons/Flag/Flag';
import MineIcon from '../Icons/Mine/Mine';
import { GAME_DIFFICULTY_BEGINNER, GAME_DIFFICULTY_INTERMEDIATE, GAME_DIFFICULTY_EXPERT } from '../../Context/Game/GameContextReducer';

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

let squareSizeClasses = {
    [GAME_DIFFICULTY_BEGINNER]: styles.beginner,
    [GAME_DIFFICULTY_INTERMEDIATE]: styles.intermediate,
    [GAME_DIFFICULTY_EXPERT]: styles.expert,
};

function GetSquareClass(props) {
    
    let classes = [styles.square];
    classes.push(squareSizeClasses[props.difficulty]);
    
    if (props.state === SQUARE_STATE_HIDDEN) {
        classes.push(styles.hidden);
    }

    if (props.state === SQUARE_STATE_FLAGGED) {
        classes.push(styles.hidden);
    }

    if (props.state === SQUARE_STATE_SHOWN) {
        classes.push(styles.shown);
    }

    if (props.state === SQUARE_STATE_SHOWN && props.value > 0) {
        classes.push(colors[props.value]);
    }

    if (props.state === SQUARE_STATE_SHOWN && props.value < 0) {
        classes.push(styles.bomb);
    }

    return classes.join(" ");
}

function Square(props) {

    let displayValue = "";

    if (props.state === SQUARE_STATE_SHOWN && props.value > 0) {
        displayValue = props.value;
    }

    if (props.state === SQUARE_STATE_SHOWN && props.value < 0) {
        displayValue = <MineIcon />;
    }

    if (props.state === SQUARE_STATE_FLAGGED) {
        displayValue = <FlagIcon />;
    }

    let clickSquare = (props) => (e) => {

        if (props.gameState !== GAME_STATE_ACTIVE && props.gameState !== GAME_STATE_PREGAME) {
            return false;
        }

        if (e.nativeEvent.button === 0) {
            props.updateState(ClickSquareAction(props.row, props.col));
        } else if (e.nativeEvent.button === 2) {
            e.preventDefault();
            props.updateState(FlagSquareAction(props.row, props.col));
        }

        return false;
    }

    return (
        <div className={GetSquareClass(props)} onClick={clickSquare(props)} onContextMenu={clickSquare(props)}> { displayValue } </div>
    )
}

export default Square;
