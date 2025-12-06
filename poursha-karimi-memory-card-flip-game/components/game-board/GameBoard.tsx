import { useGame } from "@/utils/GameContext";
import { useEffect } from "react";
import FlipCard from "@/components/flip-card/FlipCard";
import { motion } from "motion/react";
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
    <motion.div className="flex flex-col gap-4 max-w-[900px] mx-auto h-full p-4 pt-[65px] relative z-50">
      <motion.div className="grid grid-cols-4 grid-rows-5 flex-1 h-full gap-2 min-h-0 ">
        {cards.map((card, i) => {
          const delayDuration = i / 10 + 0.05;
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: delayDuration }}
              key={card.id}
            >
              <FlipCard card={card} />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
