"use client";

import { cards } from "@/data/Cards";
import { shuffleCards } from "@/utils/shuffleCards";
import { useContext, useReducer } from "react";
import { createContext } from "react";
const GameContext = createContext(undefined);

const initialState = {
  status: "ready",
  cards,
  flipped: [],
  compare: null,
  match: [],
  reset: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, status: "in_progress", cards: shuffleCards(cards) };
    case "flipped":
      const clickedID = action.payload;
      if (state.flipped.length === 0) return { ...state, flipped: [clickedID] };
      if (state.flipped.length === 1 && state.flipped[0] === clickedID)
        return { ...state, flipped: [] };

      if (state.flipped.length === 1 && state.flipped[0] !== clickedID)
        return { ...state, flipped: [...state.flipped, clickedID] };

      if (state.flipped.length === 2) return { ...state, flipped: [clickedID] };
      return state;
    default:
      throw new Error("Action Unkown");
  }
}
function GameProvider({ children }) {
  const [{ status, cards, flipped, compare, match, reset }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <GameContext.Provider
      value={{ status, flipped, compare, match, reset, dispatch, cards }}
    >
      {children}
    </GameContext.Provider>
  );
}
function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("GameContext was used outside of the GameProvider!");
  }
  return context;
}

export { useGame, GameProvider };
