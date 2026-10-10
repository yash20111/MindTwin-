"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { nav, hero } from "@/content/copy";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="text-ink hover:bg-surface-2 grid size-11 place-items-center rounded-full lg:hidden"
        aria-label={nav.openMenu}
      >
        <Menu className="size-6" strokeWidth={1.75} aria-hidden />
      </SheetTrigger>
      <SheetContent closeLabel={nav.closeMenu} aria-describedby={undefined}>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <div className="flex h-11 items-center">
          <Logo />
        </div>
        <ul className="mt-10 flex flex-col gap-1">
          {[{ label: "Home", href: "/" }, ...nav.links].map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "font-display flex min-h-14 items-center rounded-2xl px-4 text-2xl font-semibold transition-colors",
                      active ? "bg-surface-2 text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto flex flex-col gap-3">
          <p className="text-ink-muted text-sm">{hero.eyebrow}</p>
          <SheetClose asChild>
            <Link href="/waitlist" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
              {hero.primaryCta}
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
