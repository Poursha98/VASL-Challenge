import { useGame } from "@/utils/GameContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function GameBoard() {
  const { status, cards, dispatch, flipped, match } = useGame();
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
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
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            className={`bg-gray-500  w-full h-full rounded-2xl p-6 flex items-center justify-center ${
              match.includes(card.id) ? "bg-gray-500/20 text-red-800" : ""
            } ${
              match.includes(card.id) || flipped.includes(card.id)
                ? "text-black"
                : "text-gray-500"
            }`}
            key={card.id}
            disabled={match.includes(card.id)}
            onClick={() => dispatch({ type: "flipped", payload: card.id })}
          >
            {flipped.includes(card.id) || match.includes(card.id)
              ? card.name
              : Array.from({ length: 5 }, () => "*").join("")}
          </button>
        ))}
      </div>
      {status === "finished" && (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <h4>بازی تمام شد!</h4>
          <Button onClick={() => dispatch({ type: "reset" })}>شروع مجدد</Button>
        </div>
      )}
    </div>
  );
}
