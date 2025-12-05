import { Card, CardFooter } from "@/components/ui/card";
import { useGame } from "@/utils/GameContext";
import { GameCard } from "@/types/gameTypes";
import { hexToRGBA } from "@/utils/hexToRGBA";
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
      className={`bg-gray-400 w-full h-full py-0 shadow-none gap-0 rounded-3xl  flex items-center justify-center cursor-pointer`}
      onClick={handleClick}
      style={
        isMatchedCard ? { backgroundColor: hexToRGBA(card.fill, 0.5) } : {}
      }
    >
      {flipped.includes(card.id) || match.includes(card.id) ? (
        <Icon fill={card.fill} className="size-18" strokeWidth={0.6} />
      ) : (
        <span
          className={`${
            isMatchedCard || flipped.includes(card.id)
              ? "text-gray-100"
              : "text-gray-400"
          }`}
        >
          {Array.from({ length: 5 }, () => "*").join("")}
        </span>
      )}
      {status !== "finished" && (
        <CardFooter
          className={`${
            isMatchedCard || flipped.includes(card.id)
              ? "text-gray-100"
              : "text-gray-400"
          } sm:text-lg text-sm font-medium  `}
        >
          {card.name}
        </CardFooter>
      )}
    </Card>
  );
}
