import styles from './Layout.module.scss';

import Game from '../Game/Game';
import { useGameContext } from '../../Context/Game/GameContext';
import GithubIcon from '../Icons/Github/GithubIcon';
import HomeIcon from '../Icons/Home/HomeIcon';

function Layout() {
    let { gameContext } = useGameContext();

    return (
        <div className={styles.container}>
            <div className={styles.gameContainer}> 
                <div className={styles.game}>
                    <Game key={gameContext.gameId} initialGameState={gameContext.initialGameState} />            
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.footerRow}>
                    <div className={styles.footerIcon}>
                        <HomeIcon />
                    </div>

                    <div className={styles.footerIcon}>
                        <GithubIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;
