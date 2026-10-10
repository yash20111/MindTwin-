"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-border border-b last:border-b-0", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header asChild>
      <h3>
        <AccordionPrimitive.Trigger
          className={cn(
            "group font-display text-ink hover:text-accent-text flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold transition-colors",
            className,
          )}
          {...props}
        >
          {children}
          <span className="bg-surface-2 text-ink-muted group-data-[state=open]:text-accent-text grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-300 group-data-[state=open]:rotate-45">
            <Plus className="size-4" strokeWidth={1.75} aria-hidden />
          </span>
        </AccordionPrimitive.Trigger>
      </h3>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=open]:animate-[accordion-down_250ms_ease-out]"
      {...props}
    >
      <div className={cn("text-ink-muted pr-12 pb-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
