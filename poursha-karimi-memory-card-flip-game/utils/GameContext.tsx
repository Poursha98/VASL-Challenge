"use client";

import { cards } from "@/data/Cards";
import { shuffleCards } from "@/utils/shuffleCards";
import { ReactNode, useContext, useMemo, useReducer } from "react";
import { createContext } from "react";
import { GameAction, GameStates, GameContextType } from "@/types/gameTypes";

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialState: GameStates = {
  status: "ready",
  cards,
  flipped: [],
  match: [],
};
function reducer(state: GameStates, action: GameAction): GameStates {
  switch (action.type) {
    case "start":
      return { ...state, status: "in_progress", cards: shuffleCards(cards) };
    case "flipped":
      if (state.status === "comparing") return state;
      const clickedID = action.payload;
      if (state.flipped.length === 0) return { ...state, flipped: [clickedID] };
      if (state.flipped.length === 1 && state.flipped[0] === clickedID)
        return { ...state, flipped: [] };

      if (state.flipped.length === 1 && state.flipped[0] !== clickedID)
        return {
          ...state,
          status: "comparing",
          flipped: [...state.flipped, clickedID],
        };

      return state;
    case "check_match":
      const [first, second] = state.cards?.filter((card) =>
        state.flipped.includes(card.id)
      );
      const isMatched = first.pairID === second.pairID;

      if (isMatched) {
        const newMatches = [...state.match, ...state.flipped];
        if (newMatches.length === cards.length)
          return {
            ...state,
            status: "finished",
            match: newMatches,
            flipped: [],
          };

        return {
          ...state,
          match: newMatches,
          status: "in_progress",
          flipped: [],
        };
      } else {
        return { ...state, status: "in_progress", flipped: [] };
      }
    case "reset":
      return {
        ...initialState,
        status: "in_progress",
        cards: shuffleCards(cards),
      };
    default:
      throw new Error("Action Unkown");
  }
}
function GameProvider({ children }: { children: ReactNode }) {
  const [{ status, cards, flipped, match }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const values = useMemo(
    () => ({ status, cards, flipped, match, dispatch }),
    [status, cards, flipped, match, dispatch]
  );

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}
function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("GameContext was used outside of the GameProvider!");
  }
  return context;
}

export { useGame, GameProvider };
