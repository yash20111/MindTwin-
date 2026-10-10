import { describe, expect, it } from "vitest";
import {
  askReducer,
  initialAskState,
  isAskBusy,
  type AskEvent,
  type AskState,
} from "@/lib/demos/ask-twin-machine";

const run = (events: AskEvent[], from: AskState = initialAskState) =>
  events.reduce(askReducer, from);

describe("Ask-your-twin state machine", () => {
  it("walks idle → asking → thinking → answering → done", () => {
    let s = askReducer(initialAskState, { type: "SELECT", id: "gym" });
    expect(s).toMatchObject({ phase: "asking", activeId: "gym" });
    expect(isAskBusy(s)).toBe(true);
    s = askReducer(s, { type: "QUESTION_TYPED" });
    expect(s.phase).toBe("thinking");
    s = askReducer(s, { type: "THINKING_DONE" });
    expect(s.phase).toBe("answering");
    s = askReducer(s, { type: "ANSWER_TYPED" });
    expect(s).toEqual({ phase: "done", activeId: "gym", history: ["gym"] });
    expect(isAskBusy(s)).toBe(false);
  });

  it("ignores new questions while busy", () => {
    const busy = run([{ type: "SELECT", id: "gym" }, { type: "QUESTION_TYPED" }]);
    expect(askReducer(busy, { type: "SELECT", id: "idea" })).toBe(busy);
  });

  it("accepts a new question once done and keeps history", () => {
    const done = run([
      { type: "SELECT", id: "gym" },
      { type: "QUESTION_TYPED" },
      { type: "THINKING_DONE" },
      { type: "ANSWER_TYPED" },
    ]);
    const next = run(
      [
        { type: "SELECT", id: "mood" },
        { type: "QUESTION_TYPED" },
        { type: "THINKING_DONE" },
        { type: "ANSWER_TYPED" },
      ],
      done,
    );
    expect(next.history).toEqual(["gym", "mood"]);
  });

  it("ignores out-of-order events", () => {
    expect(askReducer(initialAskState, { type: "THINKING_DONE" })).toBe(initialAskState);
    expect(askReducer(initialAskState, { type: "ANSWER_TYPED" })).toBe(initialAskState);
    const asking = run([{ type: "SELECT", id: "gym" }]);
    expect(askReducer(asking, { type: "ANSWER_TYPED" })).toBe(asking);
  });

  it("supports instant answers for reduced motion", () => {
    const s = askReducer(initialAskState, { type: "SELECT_INSTANT", id: "pune" });
    expect(s).toEqual({ phase: "done", activeId: "pune", history: ["pune"] });
  });

  it("resets", () => {
    const s = run([{ type: "SELECT", id: "gym" }, { type: "RESET" }]);
    expect(s).toEqual(initialAskState);
  });
});
