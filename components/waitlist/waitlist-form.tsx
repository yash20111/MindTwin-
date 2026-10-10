"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Copy, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { waitlistForm as copy } from "@/content/copy";
import {
  waitlistSchema,
  type WaitlistData,
  type WaitlistInput,
  type WaitlistResponse,
} from "@/lib/waitlist/schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

type Result = { kind: "joined" | "already_joined"; email: string };

export async function submitWaitlist(data: WaitlistData): Promise<WaitlistResponse> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (await res.json()) as WaitlistResponse;
}

export function WaitlistForm({
  variant = "inline",
  className,
  tone = "default",
}: {
  /** inline = email + button; full = all fields (waitlist page) */
  variant?: "inline" | "full";
  className?: string;
  /** "glow" for use on top of gradient/dark cards */
  tone?: "default" | "glow";
}) {
  const id = useId();
  const [result, setResult] = useState<Result | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInput, unknown, WaitlistData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", name: "", persona: "", platform: "", website: "" },
  });

  const onSubmit = async (data: WaitlistData) => {
    setFormError(null);
    let res: WaitlistResponse;
    try {
      res = await submitWaitlist(data);
    } catch {
      setFormError(copy.errors.network);
      return;
    }
    switch (res.status) {
      case "joined":
        setResult({ kind: "joined", email: data.email });
        toast.success(copy.success.toast);
        return;
      case "already_joined":
        setResult({ kind: "already_joined", email: data.email });
        return;
      case "invalid":
        for (const [field, messages] of Object.entries(res.errors)) {
          if (field in waitlistSchema.shape && messages?.[0]) {
            setError(field as keyof WaitlistInput, { message: messages[0] });
          } else if (messages?.[0]) setFormError(messages[0]);
        }
        return;
      case "rate_limited":
        setFormError(copy.errors.rateLimited);
        return;
      default:
        setFormError(copy.errors.generic);
    }
  };

  if (result) {
    return (
      <div className={className}>
        <SuccessState result={result} variant={variant} tone={tone} />
      </div>
    );
  }

  const emailId = `${id}-email`;
  const emailErrId = `${id}-email-error`;
  const statusId = `${id}-status`;

  const submitButton = (
    <Button
      type="submit"
      size={variant === "full" ? "lg" : "md"}
      variant={tone === "glow" ? "ink" : "gradient"}
      disabled={isSubmitting}
      aria-describedby={formError ? statusId : undefined}
      className={cn(variant === "full" && "w-full")}
    >
      {isSubmitting ? (
        <>
          <LoaderCircle className="animate-spin" aria-hidden />
          {copy.submitting}
        </>
      ) : (
        <>
          {copy.submit}
          <ArrowRight aria-hidden />
        </>
      )}
    </Button>
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn("w-full", className)}
      aria-busy={isSubmitting}
      data-testid={`waitlist-form-${variant}`}
    >
      {/* Honeypot: hidden from people and assistive tech, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {variant === "inline" ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor={emailId} className="sr-only">
              {copy.emailLabel}
            </label>
            <Input
              id={emailId}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? emailErrId : undefined}
              className={cn("sm:flex-1", tone === "glow" && "border-transparent")}
              {...register("email")}
            />
            {submitButton}
          </div>
          <FieldError id={emailErrId} message={errors.email?.message} />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <Field id={emailId} label={copy.emailLabel} required error={errors.email?.message}>
            <Input
              id={emailId}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              aria-required
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
              {...register("email")}
            />
          </Field>
          <Field id={`${id}-name`} label={copy.nameLabel} error={errors.name?.message}>
            <Input
              id={`${id}-name`}
              autoComplete="given-name"
              placeholder={copy.namePlaceholder}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              {...register("name")}
            />
          </Field>
          <Field id={`${id}-persona`} label={copy.personaLabel} error={errors.persona?.message}>
            <Select
              id={`${id}-persona`}
              aria-invalid={errors.persona ? true : undefined}
              aria-describedby={errors.persona ? `${id}-persona-error` : undefined}
              {...register("persona")}
            >
              <option value="">{copy.personaPlaceholder}</option>
              {copy.personas.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </Select>
          </Field>
          <fieldset aria-describedby={errors.platform ? `${id}-platform-error` : undefined}>
            <legend className="text-ink mb-2 text-sm font-semibold">{copy.platformLabel}</legend>
            <div className="grid grid-cols-3 gap-2">
              {copy.platforms.map((p) => (
                <label key={p.value} className="relative">
                  <input
                    type="radio"
                    value={p.value}
                    className="peer sr-only"
                    {...register("platform")}
                  />
                  <span className="border-border bg-surface text-ink-muted peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-ink peer-focus-visible:outline-accent hover:border-ink-muted/40 flex min-h-12 cursor-pointer items-center justify-center rounded-[var(--radius-input)] border px-3 text-sm font-semibold transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
                    {p.label}
                  </span>
                </label>
              ))}
            </div>
            <FieldError id={`${id}-platform-error`} message={errors.platform?.message} />
          </fieldset>
          {submitButton}
        </div>
      )}

      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={cn("text-danger-text text-sm font-medium", formError && "mt-3")}
      >
        {formError}
      </p>
      <p
        className={cn(
          "text-sm",
          variant === "full" ? "mt-1 text-center" : "mt-1",
          tone === "glow" ? "text-on-accent/80" : "text-ink-muted",
        )}
      >
        {copy.reassurance}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-ink text-sm font-semibold">
        {label}
        {required && (
          <span className="text-accent-text" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-danger-text text-sm font-medium">
      {message}
    </p>
  );
}

function SuccessState({
  result,
  variant,
  tone,
}: {
  result: Result;
  variant: "inline" | "full";
  tone: "default" | "glow";
}) {
  const joined = result.kind === "joined";
  const title = joined ? copy.success.title : copy.already.title;
  const body = joined ? copy.success.body(result.email) : copy.already.body(result.email);
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="waitlist-success"
      className={cn(
        "relative flex flex-col gap-1 rounded-[var(--radius-card)] p-5",
        variant === "full" ? "items-center py-10 text-center" : "items-start",
        tone === "glow" ? "bg-surface/90" : "border-success/30 bg-success/8 border",
      )}
    >
      {variant === "full" && joined && <ConfettiLite />}
      <span className="bg-success/15 text-success-text mb-2 grid size-11 place-items-center rounded-full">
        <Check className="size-5" strokeWidth={2} aria-hidden />
      </span>
      <p className="font-display text-ink text-xl font-bold">{title}</p>
      <p className="text-ink-muted">{body}</p>
      {variant === "full" && <ShareButton />}
    </div>
  );
}

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = `${window.location.origin}/waitlist`;
    try {
      await navigator.clipboard.writeText(`${copy.share.text} ${url}`);
      setCopied(true);
      toast.success(copy.share.copied);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(copy.share.label, url);
    }
  };
  return (
    <Button type="button" variant="outline" size="sm" className="mt-5" onClick={share}>
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      {copied ? copy.share.copied : copy.share.label}
    </Button>
  );
}

const CONFETTI_COLORS = ["var(--accent)", "var(--accent-2)", "var(--twin)", "var(--success)"];

function ConfettiLite() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const pieces = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    const dist = 90 + (i % 3) * 30;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 30,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rotate: (i * 47) % 360,
      round: i % 2 === 0,
    };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute top-14 left-1/2">
      <AnimatePresence>
        {pieces.map((p, i) => (
          <motion.span
            key={i}
            className={cn("absolute block size-2", p.round ? "rounded-full" : "rounded-[2px]")}
            style={{ backgroundColor: p.color }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
            animate={{ x: p.x, y: p.y + 60, opacity: 0, scale: 1, rotate: p.rotate }}
            transition={{ duration: 1.4, ease: [0.2, 0.8, 0.3, 1], delay: (i % 4) * 0.03 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
