import { Dispatch, ComponentType, SVGProps } from "react";

export interface GameCard {
  id: string;
  pairID: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  fill: string;
  stroke?: string;
}

export interface GameStates {
  status: "ready" | "in_progress" | "comparing" | "finished";
  cards: GameCard[];
  flipped: string[];
  match: string[];
}

export type GameAction =
  | { type: "start" }
  | { type: "check_match" }
  | { type: "reset" }
  | { type: "flipped"; payload: string };

export interface GameContextType extends GameStates {
  dispatch: Dispatch<GameAction>;
}
