import { Bell, MapPin } from "lucide-react";
import { featureGrid } from "@/content/copy";
import { cn } from "@/lib/utils";
import { Waveform } from "@/components/ui/waveform";

const f = featureGrid.cards;

/** Small decorative CSS mockups used by the bento grid and the /features page. */

export function VoiceVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex flex-col gap-3", className)}>
      <div className="border-border bg-surface-2 flex items-center gap-3 rounded-2xl border p-3">
        <Waveform bars={28} className="h-9 flex-1" />
        <span className="text-ink-muted font-mono text-xs">0:12</span>
      </div>
      <p className="border-border text-ink-muted decoration-ink-muted/40 rounded-2xl border border-dashed p-3 font-mono text-[0.78rem] leading-relaxed line-through">
        {f.voice.demoRaw}
      </p>
      <p className="border-accent/30 bg-accent/8 text-ink rounded-2xl border p-3 text-sm font-medium">
        ✦ {f.voice.demoClean}
      </p>
    </div>
  );
}

export function TimelineVisual({ className }: { className?: string }) {
  return (
    <ol aria-hidden className={cn("relative flex flex-col gap-3 pl-6", className)}>
      <span className="bg-border absolute top-2 bottom-2 left-[7px] w-px" />
      {f.timeline.items.map((item, i) => (
        <li key={item.time} className="relative flex items-center gap-3">
          <span
            className={cn(
              "border-surface absolute -left-6 grid size-[15px] place-items-center rounded-full border-2",
              i === 1 ? "bg-accent" : "bg-twin",
            )}
          />
          <span className="text-ink-muted font-mono text-xs">{item.time}</span>
          <span className="text-ink flex items-center gap-1 text-sm font-medium">
            <MapPin className="text-accent-text size-3.5" strokeWidth={1.75} />
            {item.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function AskVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex flex-col gap-2 text-sm", className)}>
      <p className="bg-ink text-bg ml-auto max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2">
        {f.ask.q}
      </p>
      <p className="border-twin/25 bg-twin/10 text-ink max-w-[90%] rounded-2xl rounded-bl-md border px-3.5 py-2">
        {f.ask.a}
      </p>
    </div>
  );
}

export function RemindersVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-3", className)}>
      <span className="bg-accent/12 text-accent-text grid size-12 place-items-center rounded-2xl">
        <Bell className="size-6" strokeWidth={1.75} />
      </span>
      <span className="border-border h-px flex-1 border-t-2 border-dotted" />
      <span className="bg-twin/12 text-twin-text grid size-12 place-items-center rounded-2xl">
        <MapPin className="size-6" strokeWidth={1.75} />
      </span>
    </div>
  );
}

export function PeopleVisual({ className }: { className?: string }) {
  const colors = ["bg-accent", "bg-twin", "bg-accent-2", "bg-surface-2"];
  return (
    <div aria-hidden className={cn("flex -space-x-2.5", className)}>
      {f.people.initials.map((init, i) => (
        <span
          key={init}
          className={cn(
            "border-surface grid size-11 place-items-center rounded-full border-2 font-mono text-xs font-semibold",
            colors[i],
            i === 3 ? "text-ink-muted" : "text-[#14161C]",
          )}
        >
          {init}
        </span>
      ))}
    </div>
  );
}

export function ReflectionVisual({ className }: { className?: string }) {
  const max = Math.max(...f.reflection.values);
  return (
    <div aria-hidden className={cn("flex flex-col gap-3", className)}>
      <div className="flex h-28 items-end gap-2">
        {f.reflection.values.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={cn(
                "w-full rounded-t-lg rounded-b-sm",
                v === max ? "bg-signature" : "bg-twin/25",
              )}
              style={{ height: `${(v / max) * 88}px` }}
            />
            <span className="text-ink-muted font-mono text-[0.68rem]">{f.reflection.days[i]}</span>
          </div>
        ))}
      </div>
      <p className="text-ink-muted font-mono text-xs">{f.reflection.summary}</p>
    </div>
  );
}
