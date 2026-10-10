"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { nav } from "@/content/copy";
import { cn } from "@/lib/utils";

export const THEME_STORAGE_KEY = "mindtwin-theme";

/** Inline, render-blocking script: sets the theme class before first paint (no flash). */
export const themeScript = `(function(){var d=document.documentElement,m=window.matchMedia('(prefers-color-scheme: dark)').matches,t=null;try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}d.classList.toggle('dark',t?t==='dark':m)})()`;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => null;

function readStored(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow the OS setting live until the user picks a theme manually.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!readStored()) document.documentElement.classList.toggle("dark", e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable (private mode) — theme still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? nav.themeToggle.toLight : nav.themeToggle.toDark}
      title={isDark ? nav.themeToggle.toLight : nav.themeToggle.toDark}
      className={cn(
        "text-ink hover:bg-surface-2 relative grid size-11 place-items-center rounded-full transition-colors",
        className,
      )}
    >
      <Sun
        className="size-5 scale-100 rotate-0 transition-transform duration-300 dark:scale-0 dark:-rotate-90"
        strokeWidth={1.75}
        aria-hidden
      />
      <Moon
        className="absolute size-5 scale-0 rotate-90 transition-transform duration-300 dark:scale-100 dark:rotate-0"
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );
}
