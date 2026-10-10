/**
 * State machine for the scripted "Ask your twin" demo (no real AI call).
 *
 * idle ──SELECT──▶ asking ──QUESTION_TYPED──▶ thinking ──THINKING_DONE──▶ answering
 *                                                                          │
 *        ◀────────────────────────── SELECT (when done) ◀── done ◀─ANSWER_TYPED
 */
export type AskPhase = "idle" | "asking" | "thinking" | "answering" | "done";

export type AskState = {
  phase: AskPhase;
  /** Question currently being asked / answered. */
  activeId: string | null;
  /** Question ids whose answers have fully finished, in order. */
  history: string[];
};

export type AskEvent =
  | { type: "SELECT"; id: string }
  | { type: "QUESTION_TYPED" }
  | { type: "THINKING_DONE" }
  | { type: "ANSWER_TYPED" }
  /** Reduced motion: skip all intermediate phases. */
  | { type: "SELECT_INSTANT"; id: string }
  | { type: "RESET" };

export const initialAskState: AskState = { phase: "idle", activeId: null, history: [] };

export const isAskBusy = (s: AskState) =>
  s.phase === "asking" || s.phase === "thinking" || s.phase === "answering";

export function askReducer(state: AskState, event: AskEvent): AskState {
  switch (event.type) {
    case "SELECT":
      if (isAskBusy(state)) return state;
      return { ...state, phase: "asking", activeId: event.id };
    case "SELECT_INSTANT":
      if (isAskBusy(state)) return state;
      return { phase: "done", activeId: event.id, history: [...state.history, event.id] };
    case "QUESTION_TYPED":
      return state.phase === "asking" ? { ...state, phase: "thinking" } : state;
    case "THINKING_DONE":
      return state.phase === "thinking" ? { ...state, phase: "answering" } : state;
    case "ANSWER_TYPED":
      if (state.phase !== "answering" || !state.activeId) return state;
      return { ...state, phase: "done", history: [...state.history, state.activeId] };
    case "RESET":
      return initialAskState;
    default:
      return state;
  }
}

export const ASK_TIMINGS = {
  questionCharMs: 28,
  thinkingMs: 900,
  answerCharMs: 16,
} as const;
