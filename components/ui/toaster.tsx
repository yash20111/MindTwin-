"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !border-border !bg-surface !text-ink !shadow-lift !font-sans",
          icon: "!text-success-text",
        },
      }}
    />
  );
}
