import { useReducer } from 'react';
import reducer from '../../State/Reducer';
import Grid from '../Grid/Grid';

import styles from './Game.module.scss';

function Game(props) {

    const [state, updateState] = useReducer(reducer, props.initialGameState);

    return (
        <div className={styles.game}>
            <Grid state={state} updateState={updateState} />
        </div>
    );
}

export default Game;
