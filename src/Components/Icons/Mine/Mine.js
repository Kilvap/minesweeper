// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:release_alert:FILL@1;wght@400;GRAD@0;opsz@40&icon.set=Material+Symbols&icon.query=danger

import styles from './Mine.module.scss';

export default function MineIcon() {
    return (
        <div className={styles.Icon}>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m345.333-60-76-129.333-148.666-31.334 16-147.333L40-480l96.667-111.333-16-147.334L269.333-770l76-130L480-839.333 614.667-900l76.666 130 148 31.333-16 147.334L920-480l-96.667 112 16 147.333-148 31.334L614.667-60 480-120.667 345.333-60ZM480-280q15 0 25.167-10.167 10.166-10.166 10.166-25.166T505.167-340.5Q495-350.666 480-350.666q-15 0-25.167 10.166-10.166 10.167-10.166 25.167 0 15 10.166 25.166Q465-280 480-280Zm-31.333-155.333h66.666V-684h-66.666v248.667Z"/></svg>
        </div>
    )
}
