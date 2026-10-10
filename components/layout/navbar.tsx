"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { nav } from "@/content/copy";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { GradientButton } from "@/components/ui/gradient-button";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
const getScrolled = () => window.scrollY > 8;
const getServerScrolled = () => false;

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "glass border-border backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-[72px] items-center justify-between gap-4"
      >
        <Link href="/" aria-label="MindTwin home" className="rounded-lg">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-medium transition-colors",
                    active ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden
                      className="bg-signature absolute bottom-1.5 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <GradientButton
            href="/waitlist"
            size="sm"
            arrow={false}
            className="hidden sm:inline-flex"
          >
            {nav.cta}
          </GradientButton>
          <MobileMenu pathname={pathname} />
        </div>
      </nav>
    </header>
  );
}
