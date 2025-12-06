import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/utils/GameContext";
import { MorphingText } from "@/components/ui/morphing-text";
import { motion } from "motion/react";

const texts = [
  "🃏",
  "🔧",
  "🃏🔧",
  "🔧🔧",
  "🃏",
  "🍎",
  "🃏🍎",
  "🍎🍎",
  "🃏",
  "🛎️",
  "🃏🛎️",
  "🛎️🛎️",
  "🃏",
  "✈️",
  "🃏✈️",
  "✈️✈️",
];
export default function StartScreen() {
  const { dispatch } = useGame();
  return (
    <motion.div className="w-full h-full relative">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute z-50 inset-0 flex flex-col items-center justify-evenly gap-6  p-2 md:max-w-[40%] max-w-[90%] max-h-[50%] w-full backdrop-blur-3xl bg-gray-900/40 m-auto rounded-3xl "
      >
        <h1 className="sm:text-3xl text-xl font-medium text-[#20ca7b]">
          🎮 بازی کارت حافظه 🃏
        </h1>
        <MorphingText texts={texts} />
        <Button
          className="hover:bg-gray-800/30 bg-[#352c5e]/30 text-[#8b77e2] transition-colors rounded-2xl p-6 px-8 sm:text-lg text-base cursor-pointer"
          onClick={() => dispatch({ type: "start" })}
        >
          شروع
        </Button>
      </motion.div>
    </motion.div>
  );
}
