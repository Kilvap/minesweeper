// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:tour:FILL@1;wght@400;GRAD@0;opsz@40&icon.set=Material+Symbols&icon.query=flag

import styles from './Flag.module.scss';

export default function FlagIcon() {
    return (
        <div className={styles.Icon}>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M200-80v-800h66.666v82.667H840L759.333-602 840-406.667H266.666V-80H200Zm300.808-447.334q30.859 0 52.692-21.974 21.833-21.975 21.833-52.834 0-30.858-21.975-52.691-21.975-21.834-52.833-21.834-30.858 0-52.692 21.975Q426-632.717 426-601.858q0 30.858 21.975 52.691 21.975 21.833 52.833 21.833Z"/></svg>
        </div>
    )
}
