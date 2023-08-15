import styles from './Layout.module.scss';

import Game from '../Game/Game';
import { useGameContext } from '../../Context/Game/GameContext';

function Layout() {
    let { gameContext } = useGameContext();

    return (
        <div className={styles.container}>
            <div className={styles.gameContainer}> 
                <div className={styles.game}>
                    <Game key={gameContext.gameId} initialGameState={gameContext.initialGameState} />            
                </div>
            </div>
        </div>
    )
}

export default Layout;
