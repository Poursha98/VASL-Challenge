"use client";
import { useGame } from "@/utils/GameContext";
import StartScreen from "@/components/start-screen/StartScreen";
import GameBoard from "@/components/game-board/GameBoard";
// import { useEffect } from "react";
export default function Game() {
  const { status } = useGame();
  // useEffect(() => {

  // }, [])
  return (
    <main className="">
      {status === "ready" && <StartScreen />}
      {(status === "in_progress" || status === "comparing") && <GameBoard />}
    </main>
  );
}
