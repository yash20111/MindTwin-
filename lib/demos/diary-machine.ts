/**
 * State machine for the scripted "Speak your diary" demo (no real mic access).
 *
 * idle ─TAP─▶ recording ─RECORDING_DONE─▶ transcribing ─TRANSCRIPT_DONE─▶ review ─ENTRY_READY─▶ entry
 *                 └─TAP (stop early)─┘                                     ▲ TOGGLE works in review & entry
 * any ─REPLAY─▶ idle      idle ─SKIP_TO_END─▶ entry (reduced motion)
 */
export type DiaryPhase = "idle" | "recording" | "transcribing" | "review" | "entry";
export type TranscriptMode = "mine" | "polished";

export type DiaryState = {
  phase: DiaryPhase;
  mode: TranscriptMode;
};

export type DiaryEvent =
  | { type: "TAP" }
  | { type: "RECORDING_DONE" }
  | { type: "TRANSCRIPT_DONE" }
  | { type: "TOGGLE"; mode: TranscriptMode }
  | { type: "ENTRY_READY" }
  | { type: "SKIP_TO_END" }
  | { type: "REPLAY" };

export const initialDiaryState: DiaryState = { phase: "idle", mode: "mine" };

export function diaryReducer(state: DiaryState, event: DiaryEvent): DiaryState {
  switch (event.type) {
    case "TAP":
      if (state.phase === "idle") return { ...state, phase: "recording" };
      if (state.phase === "recording") return { ...state, phase: "transcribing" };
      return state;
    case "RECORDING_DONE":
      return state.phase === "recording" ? { ...state, phase: "transcribing" } : state;
    case "TRANSCRIPT_DONE":
      return state.phase === "transcribing" ? { ...state, phase: "review" } : state;
    case "TOGGLE":
      return state.phase === "review" || state.phase === "entry"
        ? { ...state, mode: event.mode }
        : state;
    case "ENTRY_READY":
      return state.phase === "review" ? { ...state, phase: "entry" } : state;
    case "SKIP_TO_END":
      return { phase: "entry", mode: state.mode };
    case "REPLAY":
      return initialDiaryState;
    default:
      return state;
  }
}

export const DIARY_TIMINGS = {
  recordingMs: 2200,
  wordMs: 70,
  entryDelayMs: 1100,
} as const;

/** Splits a transcript with ~filler~ markers into words, flagging filler words. */
export function tokenizeTranscript(text: string): { word: string; filler: boolean }[] {
  const tokens: { word: string; filler: boolean }[] = [];
  const parts = text.split(/(~[^~]+~)/g).filter(Boolean);
  for (const part of parts) {
    const filler = part.startsWith("~") && part.endsWith("~");
    const clean = filler ? part.slice(1, -1) : part;
    for (const word of clean.split(/\s+/).filter(Boolean)) tokens.push({ word, filler });
  }
  return tokens;
}
