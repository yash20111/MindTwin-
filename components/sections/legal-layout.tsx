import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { legal } from "@/content/copy";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="container-page max-w-3xl pt-10 pb-24 md:pt-16">
      <div
        role="note"
        className="border-accent/40 bg-accent/10 text-ink mb-10 flex items-start gap-3 rounded-2xl border p-4"
      >
        <TriangleAlert
          className="text-accent-text mt-0.5 size-5 shrink-0"
          strokeWidth={1.75}
          aria-hidden
        />
        <p className="font-semibold">{legal.draftBanner}</p>
      </div>
      <h1 className="h2">{title}</h1>
      <p className="text-ink-muted mt-2 font-mono text-sm">{updated}</p>
      <div className="prose-legal mt-6">{children}</div>
    </article>
  );
}
