import { GAME_DIFFICULTY_BEGINNER, GAME_DIFFICULTY_INTERMEDIATE, GAME_DIFFICULTY_EXPERT } from "./GameContextReducer";

export function GetBeginnerState() {
    return {
        gameId: 0,
        rows: 8,
        columns: 8,
        mines: 10,
        initialGameState: null,
        difficulty: GAME_DIFFICULTY_BEGINNER,
    };
}

export function GetIntermediateState() {
    return {
        gameId: 0,
        rows: 16,
        columns: 16,
        mines: 40,
        initialGameState: null,
        difficulty: GAME_DIFFICULTY_INTERMEDIATE,
    };
}

export function GetExpertState() {
    return {
        gameId: 0,
        rows: 16,
        columns: 30,
        mines: 99,
        initialGameState: null,
        difficulty: GAME_DIFFICULTY_EXPERT,
    };
}
