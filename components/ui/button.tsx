import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 select-none items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.75]",
  {
    variants: {
      variant: {
        /** Signature gradient pill — primary CTA. Ink text keeps AA contrast. */
        gradient:
          "bg-signature text-on-accent shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--accent)_70%,transparent)] hover:shadow-[0_14px_32px_-10px_color-mix(in_oklab,var(--accent)_80%,transparent)]",
        ink: "bg-ink text-bg shadow-soft hover:shadow-lift",
        outline:
          "border border-border bg-surface text-ink shadow-soft hover:border-ink-muted/40 hover:shadow-lift",
        ghost: "text-ink hover:bg-surface-2",
        link: "min-h-0 rounded-md px-0 text-twin-text underline-offset-4 hover:translate-y-0 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "gradient", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
