import { Dispatch, ComponentType, SVGProps } from "react";

export interface Card {
  id: string;
  pairID: number;
  icon?: string | ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  fill?: string;
  stroke?: string;
}

export interface GameStates {
  status: "ready" | "in_progress" | "comparing" | "finished";
  cards: Card[];
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
