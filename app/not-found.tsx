import Link from "next/link";
import { Home } from "lucide-react";
import { notFoundPage } from "@/content/copy";
import { buttonVariants } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70dvh] flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="relative">
        <div aria-hidden className="bg-accent/25 absolute inset-0 rounded-full blur-3xl" />
        <LogoMark className="animate-float text-ink relative size-24" />
      </div>
      <p className="text-ink-muted font-mono text-sm">404</p>
      <h1 className="h2 max-w-2xl">{notFoundPage.title}</h1>
      <p className="text-ink-muted max-w-md text-lg">{notFoundPage.body}</p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        <Home aria-hidden /> {notFoundPage.cta}
      </Link>
    </section>
  );
}
