import { Dispatch } from "react";

export interface Card {
  id: string;
  pairID: number;
  image?: string;
  name: string;
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
