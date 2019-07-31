import { Grid, GridBoard } from "./GridBoard";
import RelatiRole from "./RelatiRole";

export type RelatiBoard = GridBoard<RelatiRole>;
export type RelatiGrid = Grid<RelatiRole>;
export type RelatiRouteType = "normal" | "common";
export type RelatiSymbol = "" | "O" | "X" | "D" | "R" | "A";
export type RelatiStatus = "launcher" | "repeater" | "receiver";