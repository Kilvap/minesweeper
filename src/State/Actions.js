
export const SELECT_SQUARE="SELECT_SQUARE";
export const FLAG_SQUARE="FLAG_SQUARE";
export const UPDATE_TIME="UPDATE_TIME";

export function ClickSquareAction(row, col) {
    return { type: SELECT_SQUARE, row, col };
}

export function FlagSquareAction(row, col) {
    return { type: FLAG_SQUARE, row, col};
}

export function UpdateTimeAction(time) {
    return { type: UPDATE_TIME, time };
}
