export const CELL_STATE_SHOWN = "shown";
export const CELL_STATE_HIDDEN = "hidden";
export const CELL_STATE_FLAGGED = "flagged";

export const GAME_STATE_PREGAME = "pregame";
export const GAME_STATE_ACTIVE = "active";
export const GAME_STATE_DEFEAT = "defeat";
export const GAME_STATE_VICTORY = "victory";

function InitCellObject(row, col) {
    return { state: CELL_STATE_HIDDEN, value: 0, row, col }
}

export function InitState(rows, cols, numOfMines) {

    // Initial State object:
    let state =  {
        state: GAME_STATE_PREGAME,
        grid: [],
        cellData: {},
        mines: [], // set of mine cellIds,
        cellsRemaining: (rows * cols) - numOfMines,
        minesRemaining: numOfMines,
        losingCellId: -1, // cellId clicked on defeat
        time: 0,
    };

    let cellId = 0;
    for (var r = 0; r < rows; r++) {
        let row = [];

        for (var c = 0; c < cols; c++) {
            row.push(cellId);
            state.cellData[cellId] = InitCellObject(r, c);
            cellId += 1;
        }

        state.grid.push(row);
    }

    // Updates the grid in place
    PopulateMines(state.grid, state.cellData, state.mines, numOfMines);

    return state;
}

function GetRandomInt(_min, _max) {
    var min = Math.ceil(_min);
    var max = Math.floor(_max);
    
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min);
}

export function PopulateMines(grid, cellData, mines, amount) {

    let place = function (grid, amount) {

        if (amount === 0) {
            return;
        }

        let randomRow = GetRandomInt(0, grid.length);
        let randomCol = GetRandomInt(0, grid[0].length);
        let cellId = grid[randomRow][randomCol];

        if (cellData[cellId].value < 0) {
            // Try again, this is already a mine
            return place(grid, amount);
        }

        // Update us
        cellData[cellId].value = -1;
        mines.push(cellId);

        // Update around us

        // Top Left
        if (randomRow-1 >= 0 && randomCol-1 >= 0 && cellData[grid[randomRow-1][randomCol-1]].value >= 0) {
            cellData[grid[randomRow-1][randomCol-1]].value += 1;
        }

        // Top
        if (randomRow-1 >= 0 && cellData[grid[randomRow-1][randomCol]].value >= 0) {
            cellData[grid[randomRow-1][randomCol]].value += 1;
        }

        // Top Right
        if (randomRow-1 >= 0 && randomCol+1 < grid[randomRow-1].length && cellData[grid[randomRow-1][randomCol+1]].value >= 0) {
            cellData[grid[randomRow-1][randomCol+1]].value += 1;
        }

        // Left
        if (randomCol-1 >= 0 && cellData[grid[randomRow][randomCol-1]].value >= 0) {
            cellData[grid[randomRow][randomCol-1]].value += 1;
        }

        // Right
        if (randomCol+1 < grid[randomRow].length && cellData[grid[randomRow][randomCol+1]].value >= 0) {
            cellData[grid[randomRow][randomCol+1]].value += 1;
        }

        // Bottom Left
        if (randomRow+1 < grid.length && randomCol-1 >= 0 && cellData[grid[randomRow+1][randomCol-1]].value >= 0) {
            cellData[grid[randomRow+1][randomCol-1]].value += 1;
        }

        // Bottom
        if (randomRow+1 < grid.length && cellData[grid[randomRow+1][randomCol]].value >= 0) {
            cellData[grid[randomRow+1][randomCol]].value += 1;
        }

        // Bottom Right
        if (randomRow+1 < grid.length && randomCol+1 < grid[randomRow+1].length && cellData[grid[randomRow+1][randomCol+1]].value >= 0) {
            cellData[grid[randomRow+1][randomCol+1]].value += 1;
        }

        place(grid, amount-1);
    }

    place(grid, amount);
}
