import { AppState } from "../AppState";

export type StateChange<ST = AppState> = (s: ST) => ST;

export type StateTransformer<ST, DT> = (d: DT) => StateChange<ST>;