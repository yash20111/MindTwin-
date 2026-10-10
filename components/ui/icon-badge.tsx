import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** Lucide icon inside a soft tinted rounded square. */
export function IconBadge({
  icon,
  tone = "accent",
  size = "md",
  className,
}: {
  icon: IconName;
  tone?: "accent" | "twin" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const Icon = icons[icon];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl",
        size === "sm" && "size-9 rounded-xl",
        size === "md" && "size-11",
        size === "lg" && "size-14",
        tone === "accent" && "bg-accent/12 text-accent-text",
        tone === "twin" && "bg-twin/12 text-twin-text",
        tone === "dark" && "bg-white/8 text-[#FFB08C]",
        className,
      )}
    >
      <Icon
        className={cn(size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5")}
        strokeWidth={1.75}
        aria-hidden
      />
    </span>
  );
}
