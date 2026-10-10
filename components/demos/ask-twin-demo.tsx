"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { askTwin, sampleDataLabel, type TwinQuestion } from "@/content/copy";
import { ASK_TIMINGS, askReducer, initialAskState, isAskBusy } from "@/lib/demos/ask-twin-machine";
import { parseRich, plainLength, renderRich } from "@/lib/rich-text";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/logo";
import { MemoryCard } from "@/components/ui/memory-card";

const byId = new Map(askTwin.questions.map((q) => [q.id, q]));
const plain = (q: TwinQuestion) =>
  parseRich(q.answer)
    .map((s) => s.text)
    .join("");

export function AskTwinDemo() {
  const reduce = useReducedMotion();
  const [state, dispatch] = useReducer(askReducer, initialAskState);
  const [typedQ, setTypedQ] = useState(0);
  const [typedA, setTypedA] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = state.activeId ? byId.get(state.activeId) : undefined;
  const answerSegments = useMemo(() => (active ? parseRich(active.answer) : []), [active]);
  const busy = isAskBusy(state);

  // Scripted typing → thinking → answering timeline.
  useEffect(() => {
    if (!active) return;
    if (state.phase === "asking") {
      let n = 0;
      const t = window.setInterval(() => {
        n += 1;
        setTypedQ(n);
        if (n >= active.question.length) {
          window.clearInterval(t);
          dispatch({ type: "QUESTION_TYPED" });
        }
      }, ASK_TIMINGS.questionCharMs);
      return () => window.clearInterval(t);
    }
    if (state.phase === "thinking") {
      const t = window.setTimeout(
        () => dispatch({ type: "THINKING_DONE" }),
        ASK_TIMINGS.thinkingMs,
      );
      return () => window.clearTimeout(t);
    }
    if (state.phase === "answering") {
      const total = plainLength(answerSegments);
      let n = 0;
      const t = window.setInterval(() => {
        n += 2;
        setTypedA(Math.min(n, total));
        if (n >= total) {
          window.clearInterval(t);
          dispatch({ type: "ANSWER_TYPED" });
        }
      }, ASK_TIMINGS.answerCharMs);
      return () => window.clearInterval(t);
    }
  }, [state.phase, active, answerSegments]);

  // Keep the newest message in view inside the chat window (never scrolls the page).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [typedA, state.phase, state.history.length, reduce]);

  const ask = (id: string) => {
    if (busy) return;
    setTypedQ(0);
    setTypedA(0);
    dispatch(reduce ? { type: "SELECT_INSTANT", id } : { type: "SELECT", id });
  };

  // Completed exchanges, plus the in-flight one (once its question has been "sent").
  const exchanges = state.history.map((id) => ({ q: byId.get(id)! }));
  const inFlight = active && (state.phase === "thinking" || state.phase === "answering");
  const lastDone = state.phase === "done" && active ? active : undefined;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="card shadow-lift overflow-hidden p-0">
        {/* Window header */}
        <div className="border-border bg-surface-2/60 flex items-center gap-3 border-b px-5 py-3.5">
          <LogoMark className="size-7" />
          <div className="leading-tight">
            <p className="font-display text-ink font-bold">{askTwin.windowTitle}</p>
            <p className="text-ink-muted flex items-center gap-1.5 text-xs">
              <span className="bg-success size-1.5 rounded-full" aria-hidden />
              {askTwin.windowStatus}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex h-[400px] flex-col gap-4 overflow-y-auto px-4 py-6 sm:h-[440px] sm:px-6"
          data-testid="twin-chat"
        >
          {exchanges.length === 0 && !inFlight && (
            <p className="text-ink-muted m-auto max-w-xs text-center">{askTwin.emptyState}</p>
          )}

          {exchanges.map(({ q }, i) => (
            <Exchange
              key={`${q.id}-${i}`}
              q={q}
              typed={Infinity}
              showSources
              animateIn={q === lastDone && i === exchanges.length - 1}
            />
          ))}

          {inFlight && (
            <div className="flex flex-col gap-3">
              <UserBubble text={active.question} />
              {state.phase === "thinking" ? (
                <ThinkingBubble />
              ) : (
                <TwinBubble>{renderRich(answerSegments, typedA)}</TwinBubble>
              )}
            </div>
          )}
        </div>

        {/* Faux input */}
        <div className="border-border border-t p-3 sm:p-4">
          <div className="border-border bg-surface-2 flex items-center gap-2 rounded-full border py-1.5 pr-1.5 pl-5">
            <p
              aria-hidden
              className={cn(
                "min-w-0 flex-1 truncate text-[0.95rem]",
                state.phase === "asking" ? "text-ink" : "text-ink-muted",
              )}
            >
              {state.phase === "asking" && active ? (
                <>
                  {active.question.slice(0, typedQ)}
                  <span className="bg-accent ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse" />
                </>
              ) : (
                askTwin.inputPlaceholder
              )}
            </p>
            <span
              aria-hidden
              className={cn(
                "grid size-10 place-items-center rounded-full transition-colors",
                busy ? "bg-signature text-on-accent" : "bg-border text-ink-muted",
              )}
            >
              <ArrowUp className="size-4" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>

      {/* Question chips */}
      <div className="mt-6">
        <p id="twin-chips-label" className="sr-only">
          {askTwin.chipsLabel}
        </p>
        <ul aria-labelledby="twin-chips-label" className="flex flex-wrap justify-center gap-2">
          {askTwin.questions.map((q) => (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => ask(q.id)}
                disabled={busy}
                aria-pressed={state.activeId === q.id}
                data-testid={`twin-chip-${q.id}`}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2 text-left text-sm font-medium transition-[background-color,border-color,color,transform] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
                  state.activeId === q.id
                    ? "border-twin/40 bg-twin/12 text-twin-text"
                    : "border-border bg-surface text-ink hover:border-twin/40",
                )}
              >
                {q.question}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-ink-muted mt-4 text-center text-sm italic">{sampleDataLabel}</p>
      </div>

      {/* Screen-reader announcement once each answer completes */}
      <div className="sr-only" aria-live="polite" role="status">
        {lastDone ? `${lastDone.question} — ${plain(lastDone)}` : busy ? askTwin.thinking : ""}
      </div>
    </div>
  );
}

function Exchange({
  q,
  typed,
  showSources,
  animateIn,
}: {
  q: TwinQuestion;
  typed: number;
  showSources: boolean;
  animateIn: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col gap-3" data-testid="twin-exchange">
      <UserBubble text={q.question} />
      <TwinBubble testId="twin-answer">{renderRich(parseRich(q.answer), typed)}</TwinBubble>
      {showSources && (
        <div className="flex flex-col gap-2 pl-9 sm:pl-10">
          <p className="text-ink-muted font-mono text-[0.68rem] tracking-wider uppercase">
            {askTwin.sourcesLabel}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <AnimatePresence>
              {q.sources.map((s, i) => (
                <motion.div
                  key={i}
                  initial={animateIn ? { opacity: 0, x: reduce ? 0 : -16 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.1 + i * 0.12, duration: 0.4 }}
                >
                  <MemoryCard
                    emoji={s.emoji}
                    meta={
                      <>
                        {s.label} · {s.time}
                      </>
                    }
                    className="bg-surface-2/60"
                  >
                    {s.place && <span className="text-ink-muted block text-xs">{s.place}</span>}
                    {s.snippet}
                  </MemoryCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <p className="bg-ink text-bg ml-auto max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-[0.95rem]">
      {text}
    </p>
  );
}

function TwinBubble({ children, testId }: { children: React.ReactNode; testId?: string }) {
  return (
    <div className="flex max-w-[92%] items-start gap-2">
      <LogoMark className="mt-1 size-7" />
      <p
        data-testid={testId}
        className="border-twin/20 bg-twin/8 text-ink rounded-2xl rounded-bl-md border px-4 py-2.5 text-[0.95rem]"
      >
        {children}
      </p>
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div className="flex items-center gap-2">
      <LogoMark className="size-7" />
      <div className="border-twin/20 flex flex-col gap-1.5 rounded-2xl rounded-bl-md border px-4 py-3">
        <span className="text-twin-text text-xs font-medium">{askTwin.thinking}</span>
        <span className="shimmer block h-2.5 w-44 rounded-full" />
        <span className="shimmer block h-2.5 w-28 rounded-full" />
      </div>
    </div>
  );
}
