import { createContext, useContext, useReducer } from "react";
import { reducer } from "./GameContextReducer";
import { GetBeginnerState } from "./GameContextState";
import { InitState } from "../../State/State";

export const GameContext = createContext({gameContext: null, setGameContext: () => {} });

export function GameContextProvider(props) {

    // creates the first initial state
    let initialState = GetBeginnerState();
    let initialGameState = InitState(initialState.rows, initialState.columns, initialState.mines);
    let state = { ...initialState, gameId: 0, initialGameState };
    let [gameContext, setGameContext] = useReducer(reducer, state);

    return (
        <GameContext.Provider value={{gameContext, setGameContext}}>
            { props.children }
        </GameContext.Provider>
    );
}

// convenience wrapper
export function useGameContext() {
    return useContext(GameContext);
}
