import { useGame } from "@/utils/GameContext";
import { useEffect } from "react";
export default function GameBoard() {
  const { status, cards, dispatch, flipped, match } = useGame();
  useEffect(() => {
    let timer;
    if (status === "comparing") {
      timer = setTimeout(() => {
        dispatch({ type: "check_match" });
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [status, dispatch]);
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <button
          className={`bg-gray-500 w-full h-full rounded-2xl p-6 flex items-center justify-center ${
            match.includes(card.id) ? "bg-gray-500/20 text-red-800" : ""
          }`}
          key={card.id}
          disabled={match.includes(card.id)}
          onClick={() => dispatch({ type: "flipped", payload: card.id })}
        >
          {flipped.includes(card.id) || match.includes(card.id)
            ? card.name
            : ""}
        </button>
      ))}
    </div>
  );
}
