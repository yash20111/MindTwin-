import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/** Link styled as the signature gradient pill. */
export function GradientButton({
  href,
  children,
  size = "md",
  arrow = true,
  className,
}: {
  href: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant: "gradient", size }), className)}>
      {children}
      {arrow && <ArrowRight aria-hidden />}
    </Link>
  );
}
