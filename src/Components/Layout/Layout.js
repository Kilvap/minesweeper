import styles from './Layout.module.scss';

import Game from '../Game/Game';
import { useGameContext } from '../../Context/Game/GameContext';
import Nav from '../Nav/Nav';

let navLinks = {
    home: "https://kilvap.github.io",
    info: "https://en.wikipedia.org/wiki/Minesweeper_(video_game)",
    github: "https://github.com/Kilvap/minesweeper"
};

function Layout() {
    let { gameContext } = useGameContext();

    return (
        <div className={styles.container}>
            <div className={styles.layout}> 
                <div className={styles.nav}>
                    <Nav links={navLinks} />
                </div>
                <div className={styles.game}>
                    <Game key={gameContext.gameId} initialGameState={gameContext.initialGameState} />            
                </div>
            </div>
        </div>
    )
}

export default Layout;
