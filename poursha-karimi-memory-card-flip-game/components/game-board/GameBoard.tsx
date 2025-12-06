import { useGame } from "@/utils/GameContext";
import { useEffect } from "react";
import FlipCard from "@/components/flip-card/FlipCard";
export default function GameBoard() {
  const { status, cards, dispatch } = useGame();
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
    <div className="flex flex-col gap-4 max-w-[900px] mx-auto h-full p-4 pt-[65px] relative z-50">
      <div className="grid grid-cols-4 grid-rows-5 flex-1 h-full gap-2 min-h-0 ">
        {cards.map((card) => (
          <FlipCard card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}
