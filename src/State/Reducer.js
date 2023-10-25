import { CELL_STATE_SHOWN, CELL_STATE_FLAGGED, CELL_STATE_FLAGGED_INCORRECTLY, CELL_STATE_HIDDEN, GAME_STATE_DEFEAT, GAME_STATE_VICTORY, GAME_STATE_ACTIVE } from './State';
import { SELECT_CELL, FLAG_CELL, UPDATE_TIME } from './Actions';

export default function reducer(state, action) {

    switch(action.type) {
        case SELECT_CELL:
            var newState = { ...state };
            var cellId = action.cellId;
            var newCellData = { ...newState.cellData };

            // Clicked on a flag, no-op
            if (newCellData[cellId].state === CELL_STATE_FLAGGED) {
                return newState;
            }

            // Clicked on a bomb
            if (newCellData[cellId].value < 0) {
                
                newState.state = GAME_STATE_DEFEAT;
                newState.losingCellId = cellId;
                
                ShowAllBombs(newCellData, state.mines);
                ShowFalseFlags(newCellData, state.falseFlags);
                
                return { ...newState, cellData: newCellData };
            }

            // Mark game as active
            newState.state = GAME_STATE_ACTIVE;

            let row = newCellData[cellId].row;
            let col = newCellData[cellId].col;
            
            var cellsRevealed = SelectEmptyCells(state.grid, newCellData, row, col);
            let cellsRemaining = state.cellsRemaining - cellsRevealed;

            // Won the game
            if (cellsRemaining <= 0) {
                newState.state = GAME_STATE_VICTORY;
                newState.minesRemaining = 0;
                FlagAllBombs(newCellData, state.mines);
            }

            return { ...newState, cellData: newCellData, cellsRemaining };
        
        case FLAG_CELL:
            newState = { ...state };
            cellId = action.cellId;
            newCellData = { ...newState.cellData };

            var target = newCellData[cellId];
            var minesRemaining = state.minesRemaining;
            
            // Mark game as active
            newState.state = GAME_STATE_ACTIVE;

            // No op on shown cells
            if (target.state === CELL_STATE_SHOWN) {
                return newState;
            }

            // No op when flagging too many
            if (minesRemaining <= 0 && target.state === CELL_STATE_HIDDEN) {
                return newState;
            }
                        
            // Toggle marked cells
            if (target.state === CELL_STATE_FLAGGED) {
                newCellData[cellId] = { ...newCellData[cellId], state: CELL_STATE_HIDDEN };
                minesRemaining += 1;
                
                // Remove from false flags set
                var index = newState.falseFlags.indexOf(cellId);
                if (index > -1) {
                    newState.falseFlags = [...state.falseFlags.slice(0, index), ...state.falseFlags.slice(index+1)];
                }

            } else {
                newCellData[cellId] = { ...newCellData[cellId], state: CELL_STATE_FLAGGED };
                minesRemaining -= 1;

                // Add to false flags set
                if (newCellData[cellId].value >= 0) {
                    newState.falseFlags = [...state.falseFlags, cellId];
                }
            }
            
            return { ...newState, cellData: newCellData, minesRemaining };

        case UPDATE_TIME:
            var time = action.time;
            return {...state, time };

        default:
            return { ...state };
    }
}

function ShowAllBombs(cellData, mines) {

    for (var i = 0; i < mines.length; i++) {
        let mineId = mines[i];
        cellData[mineId] = { ...cellData[mineId] };

        if (cellData[mineId].state !== CELL_STATE_FLAGGED) {
            cellData[mineId].state = CELL_STATE_SHOWN;
        }
    }
}

function ShowFalseFlags(cellData, falseFlags) {

    for (var i = 0; i < falseFlags.length; i++) {
        let cellId = falseFlags[i];
        cellData[cellId] = { ...cellData[cellId] };
        cellData[cellId].state = CELL_STATE_FLAGGED_INCORRECTLY;
    }
}

function FlagAllBombs(cellData, mines) {

    for (var i = 0; i < mines.length; i++) {
        let mineId = mines[i];
        cellData[mineId] = { ...cellData[mineId] };
        cellData[mineId].state = CELL_STATE_FLAGGED;
    }
}

function SelectEmptyCells(grid, cellData, row, col) {

    if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
        return 0;
    }

    let cellId = grid[row][col];
    let target = cellData[cellId];

    if (target.state === CELL_STATE_SHOWN) {
        return 0;
    }

    if (target.state === CELL_STATE_FLAGGED) {
        return 0;
    }

    cellData[cellId] = { ...cellData[cellId], state: CELL_STATE_SHOWN };

    if (target.value > 0) {
        return 1;
    }

    let numOfCellsRevealed = 1;

    // Top
    if (row-1 >= 0 && col-1 >= 0 && (cellData[grid[row-1][col-1]].state !== CELL_STATE_SHOWN || cellData[grid[row-1][col-1]].state !== CELL_STATE_FLAGGED)) {
        numOfCellsRevealed += SelectEmptyCells(grid, cellData, row-1, col-1);
    }

    if (row-1 >= 0 && (cellData[grid[row-1][col]].state !== CELL_STATE_SHOWN && cellData[grid[row-1][col]].state !== CELL_STATE_FLAGGED)) {
        numOfCellsRevealed += SelectEmptyCells(grid, cellData, row-1, col,);
    }

    if (row-1 >= 0 && col+1 < grid[row-1].length && (cellData[grid[row-1][col+1]].state !== CELL_STATE_SHOWN && cellData[grid[row-1][col+1]].state !== CELL_STATE_FLAGGED)) {
        numOfCellsRevealed += SelectEmptyCells(grid, cellData, row-1, col+1);
    }

    // Sides
    if (col-1 >= 0 && (cellData[grid[row][col-1]].state !== CELL_STATE_SHOWN && cellData[grid[row][col-1]].state !== CELL_STATE_FLAGGED)) {
        numOfCellsRevealed += SelectEmptyCells(grid, cellData, row, col-1);
    }

    if (col+1 < grid[row].length && (cellData[grid[row][col+1]].state !== CELL_STATE_SHOWN && cellData[grid[row][col+1]].state !== CELL_STATE_FLAGGED)) {
        numOfCellsRevealed += SelectEmptyCells(grid, cellData, row, col+1);
    }

    // Bottom
    if (row+1 < grid.length && col-1 >= 0 && (cellData[grid[row+1][col-1]].state !== CELL_STATE_SHOWN && cellData[grid[row+1][col-1]].state !== CELL_STATE_FLAGGED)) {
        numOfCellsRevealed += SelectEmptyCells(grid, cellData, row+1, col-1);
    }

    if (row+1 < grid.length && (cellData[grid[row+1][col]].state !== CELL_STATE_SHOWN && cellData[grid[row+1][col]].state !== CELL_STATE_FLAGGED)) {
        numOfCellsRevealed += SelectEmptyCells(grid, cellData, row+1, col);
    }

    if (row+1 < grid.length && col+1 < grid[row+1].length && (cellData[grid[row+1][col+1]].state !== CELL_STATE_SHOWN && cellData[grid[row+1][col+1]].state !== CELL_STATE_FLAGGED)) {
        numOfCellsRevealed += SelectEmptyCells(grid, cellData, row+1, col+1);
    }

    return numOfCellsRevealed;
}
