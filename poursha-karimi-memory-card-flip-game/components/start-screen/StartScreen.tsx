import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/utils/GameContext";
export default function StartScreen() {
  const { dispatch } = useGame();
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-6">
      <h1>بازی کارت ها</h1>
      <Button onClick={() => dispatch({ type: "start" })}>شروع</Button>
    </div>
  );
}
