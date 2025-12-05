import { Card, CardFooter } from "@/components/ui/card";
import { useGame } from "@/utils/GameContext";
import { GameCard } from "@/types/gameTypes";
import { hexToRGBA } from "@/utils/hexToRGBA";
import { FileQuestionMark } from "lucide-react";
export default function FlipCard({ card }: { card: GameCard }) {
  const Icon = card.icon;
  const { status, flipped, match, dispatch } = useGame();
  const isMatchedCard = match.includes(card.id);

  function handleClick() {
    if (match.includes(card.id)) return;
    return dispatch({ type: "flipped", payload: card.id });
  }
  return (
    <Card
      className={` w-full h-full p-0 shadow-none border-none bg-transparent gap-0 flex items-center justify-center cursor-pointer perspective-[1000]`}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-3d ${
          flipped.includes(card.id) || isMatchedCard
            ? "transform-[rotateY(180deg)]"
            : ""
        }`}
      >
        <div
          className={`absolute inset-0 w-full h-full flex items-center justify-center bg-gray-400 rounded-3xl backface-hidden ${
            isMatchedCard ? "opacity-0" : ""
          }`}
        >
          <span className={`text-gray-400 flex items-center justify-center`}>
            <FileQuestionMark
              className="size-18"
              strokeWidth={0.6}
              stroke="#fff"
            />
          </span>
        </div>
        <div
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center rounded-3xl backface-hidden transform-[rotateY(180deg)] "
          style={
            isMatchedCard
              ? { backgroundColor: hexToRGBA(card.fill, 0.4) }
              : flipped.includes(card.id)
              ? { backgroundColor: hexToRGBA(card.fill, 0.7) }
              : {}
          }
        >
          <Icon fill={card.fill} className="size-18" strokeWidth={0.6} />
          {status !== "finished" && (
            <CardFooter
              className={`${
                isMatchedCard || flipped.includes(card.id)
                  ? "text-gray-800"
                  : "text-gray-400"
              } sm:text-lg text-sm font-medium absolute bottom-1 `}
            >
              {card.name}
            </CardFooter>
          )}
        </div>
      </div>
    </Card>
  );
}
