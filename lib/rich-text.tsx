import { Fragment, type ReactNode } from "react";

export type RichSegment = { text: string; bold?: boolean; italic?: boolean };

/** Parses a tiny subset of markdown: **bold** and *italic*. */
export function parseRich(input: string): RichSegment[] {
  const segments: RichSegment[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  for (const match of input.matchAll(re)) {
    const idx = match.index ?? 0;
    if (idx > last) segments.push({ text: input.slice(last, idx) });
    const token = match[0];
    if (token.startsWith("**")) segments.push({ text: token.slice(2, -2), bold: true });
    else segments.push({ text: token.slice(1, -1), italic: true });
    last = idx + token.length;
  }
  if (last < input.length) segments.push({ text: input.slice(last) });
  return segments;
}

export const plainLength = (segments: RichSegment[]) =>
  segments.reduce((n, s) => n + s.text.length, 0);

/** Renders segments, optionally truncated to the first `limit` characters (for typing effects). */
export function renderRich(segments: RichSegment[], limit = Infinity): ReactNode {
  let remaining = limit;
  return segments.map((s, i) => {
    if (remaining <= 0) return null;
    const text = s.text.slice(0, remaining);
    remaining -= text.length;
    const content = s.italic ? <em>{text}</em> : text;
    return (
      <Fragment key={i}>
        {s.bold ? <strong className="text-ink font-semibold">{content}</strong> : content}
      </Fragment>
    );
  });
}

export function RichText({ text }: { text: string }) {
  return <>{renderRich(parseRich(text))}</>;
}
