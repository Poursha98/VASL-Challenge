"use client";
import { useGame } from "@/utils/GameContext";
import StartScreen from "@/components/start-screen/StartScreen";
import GameBoard from "@/components/game-board/GameBoard";
const whilePlaying = ["in_progress", "comparing", "finished"];
export default function Game() {
  const { status } = useGame();
  return (
    <main className="">
      {status === "ready" && <StartScreen />}
      {whilePlaying.includes(status) && <GameBoard />}
    </main>
  );
}
