import { InitState } from "../../State/State";
import { GetBeginnerState, GetIntermediateState, GetExpertState } from "./GameContextState";

export const NEW_GAME = "NEW_GAME";
export const SET_GAME = "SET_GAME";

export const GAME_DIFFICULTY_BEGINNER="beginner";
export const GAME_DIFFICULTY_INTERMEDIATE="intermediate";
export const GAME_DIFFICULTY_EXPERT="expert";

export function NewGameAction() {
    return { type: NEW_GAME };
}

export function SetGameAction(difficulty) {
    return { type: SET_GAME, difficulty };
}

function getInitialStateFromDifficulty(difficulty) {
    switch (difficulty) {
        case GAME_DIFFICULTY_BEGINNER:
            return GetBeginnerState();
        case GAME_DIFFICULTY_INTERMEDIATE:
            return GetIntermediateState();
        case GAME_DIFFICULTY_EXPERT:
            return GetExpertState();
        default:
            return GetBeginnerState();
    }
}

export function reducer(state, action) {

    switch(action.type) {
        case NEW_GAME:
            var initialGameState = InitState(state.rows, state.columns, state.mines);
            var newGameId = state.gameId + 1;
            return { ...state, gameId: newGameId,  initialGameState };

        case SET_GAME:
            var newState = getInitialStateFromDifficulty(action.difficulty);
            initialGameState = InitState(newState.rows, newState.columns, newState.mines);

            return {
                ...newState,
                gameId: state.gameId + 1,
                initialGameState
            }

        default:
            return state;
    }
}
