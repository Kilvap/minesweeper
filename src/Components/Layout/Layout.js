import styles from './Layout.module.scss';

import Game from '../Game/Game';
import { useGameContext } from '../../Context/Game/GameContext';
import Shell from '../Shell/Shell';

let navLinks = {
    home: "https://kilvap.github.io",
    info: "https://en.wikipedia.org/wiki/Minesweeper_(video_game)",
    github: "https://github.com/Kilvap/minesweeper"
};

function Layout() {
    let { gameContext } = useGameContext();

    return (
        <Shell navLinks={navLinks}>
            <div className={styles.container}>
                <div className={styles.layout}>
                    <div className={styles.game}>
                        <Game key={gameContext.gameId} initialGameState={gameContext.initialGameState} />            
                    </div>
                </div>
            </div>
        </Shell>
    )
}

export default Layout;
