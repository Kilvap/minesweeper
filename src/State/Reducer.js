import { SQUARE_STATE_SHOWN, SQUARE_STATE_FLAGGED, SQUARE_STATE_HIDDEN, GAME_STATE_DEFEAT, GAME_STATE_VICTORY, GAME_STATE_ACTIVE } from './State';
import { SELECT_SQUARE, FLAG_SQUARE, UPDATE_TIME } from './Actions';

export default function reducer(state, action) {

    switch(action.type) {
        case SELECT_SQUARE:
            var newState = { ...state };
            var grid = JSON.parse(JSON.stringify(state.grid));

            // Mark game as active
            newState.state = GAME_STATE_ACTIVE;

            // Clicked on a bomb
            if (grid[action.row][action.col].value < 0) {
                
                newState.state = GAME_STATE_DEFEAT;
                ShowAllBombs(grid);
                
                return {...newState, grid: grid};
            }

            var cellsRevealed = SelectEmptySquares(grid, action.row, action.col);
            let cellsRemaining = state.cellsRemaining - cellsRevealed;

            // Won the game
            if (cellsRemaining <= 0) {
                newState.state = GAME_STATE_VICTORY;
                newState.minesRemaining = 0;
                FlagAllBombs(grid);
            }

            return {...newState, grid: grid, cellsRemaining};
        
        case FLAG_SQUARE:
            newState = { ...state };
            grid = JSON.parse(JSON.stringify(state.grid));
            var target = grid[action.row][action.col];
            var minesRemaining = state.minesRemaining;

            // Mark game as active
            newState.state = GAME_STATE_ACTIVE;

            // No op on shown squares
            if (target.state === SQUARE_STATE_SHOWN) {
                return newState;
            }

            // Toggle marked squares
            if (target.state === SQUARE_STATE_FLAGGED) {
                grid[action.row][action.col].state = SQUARE_STATE_HIDDEN;
                minesRemaining += 1;
            } else {
                grid[action.row][action.col].state = SQUARE_STATE_FLAGGED;
                minesRemaining -= 1;
            }
            
            return {...newState, grid: grid, minesRemaining };

        case UPDATE_TIME:
            var time = action.time;
            return {...state, time };

        default:
            return { ...state };
    }
}

function ShowAllBombs(grid) {

    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {

            let target = grid[r][c];

            if (target.value < 0) {
                target.state = SQUARE_STATE_SHOWN;
            }
        }
    }
}

function FlagAllBombs(grid) {

    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            let target = grid[r][c];

            if (target.value < 0) {
                target.state = SQUARE_STATE_FLAGGED;
            }
        }
    }

}

function SelectEmptySquares(grid, row, col) {

    if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
        return 0;
    }

    let target = grid[row][col];

    if (target.state === SQUARE_STATE_SHOWN) {
        return 0;
    }

    if (target.state === SQUARE_STATE_FLAGGED) {
        return 0;
    }

    target.state = SQUARE_STATE_SHOWN;

    if (target.value > 0) {
        return 1;
    }

    return 1 +
        SelectEmptySquares(grid, row-1, col-1) +
        SelectEmptySquares(grid, row-1, col) +
        SelectEmptySquares(grid, row-1, col+1) +
        SelectEmptySquares(grid, row, col-1) +
        SelectEmptySquares(grid, row, col+1) +
        SelectEmptySquares(grid, row+1, col-1) +
        SelectEmptySquares(grid, row+1, col) +
        SelectEmptySquares(grid, row+1, col+1);
}
