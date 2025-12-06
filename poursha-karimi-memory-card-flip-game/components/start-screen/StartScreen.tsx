import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/utils/GameContext";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { MorphingText } from "@/components/ui/morphing-text";

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
    <div className="w-full h-full relative">
      <BackgroundGradientAnimation>
        <div className="absolute z-50 inset-0 flex flex-col items-center justify-evenly gap-6  p-2 md:max-w-[40%] max-w-[90%] max-h-[50%] w-full backdrop-blur-3xl bg-gray-800/30 m-auto rounded-3xl ">
          <h1 className="sm:text-3xl text-xl font-medium text-gray-50/90">
            🎮 بازی کارت حافظه 🃏
          </h1>
          <MorphingText texts={texts} />
          <Button
            className="hover:bg-gray-800/40 bg-gray-800/10 transition-colors rounded-3xl p-6 sm:text-lg text-base cursor-pointer"
            onClick={() => dispatch({ type: "start" })}
          >
            شروع
          </Button>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
}
