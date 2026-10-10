"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;

export function SheetContent({
  className,
  children,
  closeLabel = "Close",
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-ink/30 fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-[fade-in_200ms_ease-out]" />
      <DialogPrimitive.Content
        className={cn(
          "bg-bg shadow-lift fixed inset-y-0 right-0 z-50 flex h-dvh w-full flex-col p-6 data-[state=open]:animate-[slide-in_280ms_cubic-bezier(.2,.8,.2,1)] sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="text-ink hover:bg-surface-2 absolute top-4 right-4 grid size-11 place-items-center rounded-full"
          aria-label={closeLabel}
        >
          <X className="size-5" strokeWidth={1.75} aria-hidden />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
