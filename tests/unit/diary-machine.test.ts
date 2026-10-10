import { describe, expect, it } from "vitest";
import {
  diaryReducer,
  initialDiaryState,
  tokenizeTranscript,
  type DiaryEvent,
} from "@/lib/demos/diary-machine";

const run = (events: DiaryEvent[]) => events.reduce(diaryReducer, initialDiaryState);

describe("Diary demo state machine", () => {
  it("idle → recording → transcript → polished toggle → entry card → replay", () => {
    let s = diaryReducer(initialDiaryState, { type: "TAP" });
    expect(s.phase).toBe("recording");
    s = diaryReducer(s, { type: "RECORDING_DONE" });
    expect(s.phase).toBe("transcribing");
    s = diaryReducer(s, { type: "TRANSCRIPT_DONE" });
    expect(s).toEqual({ phase: "review", mode: "mine" });
    s = diaryReducer(s, { type: "TOGGLE", mode: "polished" });
    expect(s.mode).toBe("polished");
    s = diaryReducer(s, { type: "ENTRY_READY" });
    expect(s).toEqual({ phase: "entry", mode: "polished" });
    s = diaryReducer(s, { type: "TOGGLE", mode: "mine" });
    expect(s.mode).toBe("mine");
    s = diaryReducer(s, { type: "REPLAY" });
    expect(s).toEqual(initialDiaryState);
  });

  it("tapping while recording stops early", () => {
    expect(run([{ type: "TAP" }, { type: "TAP" }]).phase).toBe("transcribing");
  });

  it("can't toggle before the transcript is ready", () => {
    const s = run([{ type: "TAP" }, { type: "TOGGLE", mode: "polished" }]);
    expect(s.mode).toBe("mine");
  });

  it("ignores out-of-order events", () => {
    expect(diaryReducer(initialDiaryState, { type: "TRANSCRIPT_DONE" })).toBe(initialDiaryState);
    expect(diaryReducer(initialDiaryState, { type: "ENTRY_READY" })).toBe(initialDiaryState);
    const entry = run([{ type: "SKIP_TO_END" }]);
    expect(diaryReducer(entry, { type: "TAP" })).toBe(entry);
  });

  it("skips straight to the entry for reduced motion", () => {
    expect(run([{ type: "SKIP_TO_END" }]).phase).toBe("entry");
  });
});

describe("tokenizeTranscript", () => {
  it("flags ~filler~ words", () => {
    expect(tokenizeTranscript("So ~um,~ good ~kind of~ day")).toEqual([
      { word: "So", filler: false },
      { word: "um,", filler: true },
      { word: "good", filler: false },
      { word: "kind", filler: true },
      { word: "of", filler: true },
      { word: "day", filler: false },
    ]);
  });
});
