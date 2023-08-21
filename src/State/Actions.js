
export const SELECT_CELL="SELECT_CELL";
export const FLAG_CELL="FLAG_CELL";
export const UPDATE_TIME="UPDATE_TIME";

export function ClickCellAction(cellId) {
    return { type: SELECT_CELL, cellId };
}

export function FlagCellAction(cellId) {
    return { type: FLAG_CELL, cellId};
}

export function UpdateTimeAction(time) {
    return { type: UPDATE_TIME, time };
}
