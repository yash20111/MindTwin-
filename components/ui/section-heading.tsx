import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  as: Heading = "h2",
  id,
  className,
  invert,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  /** For dark bands: light text regardless of theme. */
  invert?: boolean;
}) {
  // Page titles (h1) render immediately so they're never hidden while JS loads (LCP).
  const Wrapper = Heading === "h1" ? "div" : Reveal;
  return (
    <Wrapper
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <p className={cn("eyebrow", invert && "text-[#FF9A6E]")}>{eyebrow}</p>}
      <Heading id={id} className={cn(Heading === "h1" ? "h1" : "h2", invert && "text-[#F2EFEA]")}>
        {title}
      </Heading>
      {sub && (
        <p className={cn("text-ink-muted max-w-2xl text-lg", invert && "text-[#B9BDC8]")}>{sub}</p>
      )}
    </Wrapper>
  );
}
