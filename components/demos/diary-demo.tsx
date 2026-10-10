"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useReducer, useState } from "react";
import { Lock, MapPin, Mic, RotateCcw, Square } from "lucide-react";
import { diary } from "@/content/copy";
import {
  DIARY_TIMINGS,
  diaryReducer,
  initialDiaryState,
  tokenizeTranscript,
  type TranscriptMode,
} from "@/lib/demos/diary-machine";
import { cn } from "@/lib/utils";
import { Waveform } from "@/components/ui/waveform";
import { Chip } from "@/components/ui/chip";

const d = diary.demo;

export function DiaryDemo({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [state, dispatch] = useReducer(diaryReducer, initialDiaryState);
  const tokens = useMemo(() => tokenizeTranscript(d.raw), []);
  const [wordsShown, setWordsShown] = useState(0);
  const { phase, mode } = state;

  // Drive the scripted timeline.
  useEffect(() => {
    if (phase === "recording") {
      const t = window.setTimeout(
        () => dispatch({ type: "RECORDING_DONE" }),
        DIARY_TIMINGS.recordingMs,
      );
      return () => window.clearTimeout(t);
    }
    if (phase === "transcribing") {
      let n = 0;
      const t = window.setInterval(() => {
        n += 1;
        setWordsShown(n);
        if (n >= tokens.length) {
          window.clearInterval(t);
          dispatch({ type: "TRANSCRIPT_DONE" });
        }
      }, DIARY_TIMINGS.wordMs);
      return () => window.clearInterval(t);
    }
    if (phase === "review") {
      const t = window.setTimeout(
        () => dispatch({ type: "ENTRY_READY" }),
        DIARY_TIMINGS.entryDelayMs,
      );
      return () => window.clearTimeout(t);
    }
  }, [phase, tokens.length]);

  const onMic = () => {
    if (phase === "idle" && reduce) {
      setWordsShown(tokens.length);
      dispatch({ type: "SKIP_TO_END" });
      return;
    }
    if (phase === "idle") setWordsShown(0);
    dispatch({ type: "TAP" });
  };

  const replay = () => {
    setWordsShown(0);
    dispatch({ type: "REPLAY" });
  };

  const recording = phase === "recording";
  const showTranscript = phase === "transcribing" || phase === "review";
  const showToggle = phase === "review" || phase === "entry";
  const status =
    phase === "idle"
      ? d.idleLabel
      : recording
        ? d.recordingLabel
        : phase === "transcribing"
          ? "Transcribing…"
          : phase === "review"
            ? "Writing your entry…"
            : "Saved to your diary";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="ruled-paper border-border shadow-lift relative overflow-hidden rounded-[var(--radius-card)] border p-5 sm:p-7">
        {/* Notebook margin line */}
        <span
          aria-hidden
          className="bg-accent/25 absolute top-0 bottom-0 left-10 w-px sm:left-12"
        />

        <div className="relative flex items-center gap-4 pl-8 sm:pl-10">
          <div className="relative">
            {(phase === "idle" || recording) && (
              <span
                aria-hidden
                className={cn(
                  "bg-accent/40 absolute inset-0 rounded-full",
                  "animate-pulse-ring",
                  recording && "[animation-duration:1.2s]",
                )}
              />
            )}
            <button
              type="button"
              onClick={onMic}
              disabled={phase !== "idle" && !recording}
              aria-pressed={recording}
              aria-label={recording ? d.stopLabel : d.idleLabel}
              data-testid="diary-mic"
              className="bg-signature text-on-accent relative grid size-16 place-items-center rounded-full shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--accent)_80%,transparent)] transition-transform hover:scale-105 active:scale-95 disabled:cursor-default disabled:opacity-70 disabled:hover:scale-100"
            >
              {recording ? (
                <Square className="size-5 fill-current" strokeWidth={1.75} aria-hidden />
              ) : (
                <Mic className="size-6" strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-ink font-semibold">{status}</p>
            {recording ? (
              <Waveform bars={26} className="mt-1 h-8" />
            ) : (
              <p className="text-ink-muted font-mono text-xs">
                {phase === "idle" ? "0:00 · sample" : "1:12 · sample"}
              </p>
            )}
          </div>
        </div>

        {/* Transcript / entry area */}
        <div
          className="relative mt-6 min-h-[260px] pl-8 sm:pl-10"
          aria-live="polite"
          aria-atomic="false"
        >
          <AnimatePresence mode="wait" initial={false}>
            {phase === "idle" || recording ? (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-display text-ink-muted/70 text-2xl leading-8 italic"
              >
                Dear diary…
              </motion.p>
            ) : showTranscript ? (
              <motion.div
                key="transcript"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                data-testid="diary-transcript"
              >
                <p className="text-ink-muted mb-1 font-mono text-[0.7rem] tracking-wider uppercase">
                  {d.transcriptLabel}
                </p>
                <TranscriptText mode={mode} tokens={tokens} wordsShown={wordsShown} />
              </motion.div>
            ) : (
              <motion.article
                key="entry"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                data-testid="diary-entry"
                aria-label="Diary entry"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-display text-ink text-2xl leading-8 font-bold">
                    {d.entry.date}
                  </h3>
                  <Chip tone="twin" className="gap-1">
                    <Lock className="size-3" strokeWidth={2} aria-hidden /> {d.entry.locked}
                  </Chip>
                </div>
                <p className="text-ink-muted flex h-8 items-center gap-1 text-sm">
                  <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden /> {d.entry.place}
                </p>
                <div className="flex flex-wrap gap-2 py-1">
                  <EntryChip delay={0.15}>{d.entry.mood}</EntryChip>
                  <EntryChip delay={0.3}>{d.entry.highlight}</EntryChip>
                </div>
                <div className="mt-1">
                  <TranscriptText mode={mode} tokens={tokens} wordsShown={tokens.length} />
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mt-4 flex min-h-11 flex-wrap items-center justify-between gap-3 pl-8 sm:pl-10">
          {showToggle ? (
            <ModeToggle mode={mode} onChange={(m) => dispatch({ type: "TOGGLE", mode: m })} />
          ) : (
            <span />
          )}
          {phase === "entry" && (
            <button
              type="button"
              onClick={replay}
              data-testid="diary-replay"
              className="text-twin-text inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-sm font-semibold hover:underline"
            >
              <RotateCcw className="size-4" strokeWidth={1.75} aria-hidden />
              {d.replay}
            </button>
          )}
        </div>
      </div>
      <p className="text-ink-muted text-center text-sm italic">{d.note}</p>
    </div>
  );
}

function EntryChip({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: reduce ? 0 : delay, duration: 0.35 }}
      className="border-border bg-surface text-ink inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium"
    >
      {children}
    </motion.span>
  );
}

function TranscriptText({
  mode,
  tokens,
  wordsShown,
}: {
  mode: TranscriptMode;
  tokens: { word: string; filler: boolean }[];
  wordsShown: number;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.p
        key={mode}
        initial={{ opacity: 0, filter: reduce ? "none" : "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: reduce ? "none" : "blur(4px)" }}
        transition={{ duration: 0.3 }}
        className="text-ink text-[1.05rem] leading-8"
        data-testid="diary-text"
        data-mode={mode}
      >
        {mode === "polished"
          ? d.polished
          : tokens.slice(0, wordsShown).map((t, i) => (
              <span key={i} className={cn(t.filler && "text-ink-muted/60 italic")}>
                {t.word}{" "}
              </span>
            ))}
      </motion.p>
    </AnimatePresence>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: TranscriptMode;
  onChange: (m: TranscriptMode) => void;
}) {
  const options: { value: TranscriptMode; label: string }[] = [
    { value: "mine", label: d.toggleMine },
    { value: "polished", label: d.togglePolished },
  ];
  return (
    <div
      role="group"
      aria-label={d.toggleLabel}
      className="border-border bg-surface shadow-soft relative inline-flex rounded-full border p-1"
    >
      {options.map((o) => {
        const active = mode === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            data-testid={`diary-toggle-${o.value}`}
            className={cn(
              "relative min-h-10 rounded-full px-4 text-sm font-semibold transition-colors",
              active ? "text-bg" : "text-ink-muted hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId="diary-toggle-pill"
                className="bg-ink absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
