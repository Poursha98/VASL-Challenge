"use client";

import { cards } from "@/data/Cards";
import { shuffleCards } from "@/utils/shuffleCards";
import { useContext, useMemo, useReducer } from "react";
import { createContext } from "react";
const GameContext = createContext(undefined);

const initialState = {
  status: "ready",
  cards,
  flipped: [],
  compare: null,
  match: [],
};
function reducer(state, action) {
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
function GameProvider({ children }) {
  const [{ status, cards, flipped, compare, match, reset }, dispatch] =
    useReducer(reducer, initialState);
  const values = useMemo(
    () => ({ status, cards, flipped, compare, match, reset, dispatch }),
    [status, cards, flipped, compare, match, reset, dispatch]
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
