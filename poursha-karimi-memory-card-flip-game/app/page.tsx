import Game from "@/components/game/Game";
import { GameProvider } from "@/utils/GameContext";

export default function Home() {
  return (
    <div className="w-full h-dvh">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}
