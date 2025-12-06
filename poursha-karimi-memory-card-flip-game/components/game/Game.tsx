"use client";
import { useGame } from "@/utils/GameContext";
import StartScreen from "@/components/start-screen/StartScreen";
import GameBoard from "@/components/game-board/GameBoard";
import { AnimatePresence } from "motion/react";

const whilePlaying = ["in_progress", "comparing", "finished"];
export default function Game() {
  const { status } = useGame();
  return (
    <main className="h-dvh">
      <AnimatePresence>
        {status === "ready" && <StartScreen key="start" />}
        {whilePlaying.includes(status) && <GameBoard key="game" />}
      </AnimatePresence>
    </main>
  );
}
