import React from "react";
import { useGame } from "@/utils/GameContext";
export default function GameBoard() {
  const { cards, dispatch, flipped } = useGame();
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          className="bg-gray-500 w-full h-full rounded-2xl p-6 flex items-center justify-center"
          key={card.id}
          onClick={() => dispatch({ type: "flipped", payload: card.id })}
        >
          {flipped.includes(card.id) ? card.name : ""}
        </div>
      ))}
    </div>
  );
}
