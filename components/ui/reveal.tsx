"use client";

import { motion, type HTMLMotionProps } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Initial values are identical on server and client (no reduced-motion branching) to avoid
 * hydration mismatches. <MotionProvider> sets reducedMotion="user", so motion itself drops the
 * 16px rise for users who prefer reduced motion and keeps a simple fade.
 */

/** Fade + 16px rise, once, when scrolled into view. */
export function Reveal({
  delay = 0,
  as = "div",
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; as?: "div" | "li" | "section" }) {
  // Same props at runtime; cast keeps the polymorphic wrapper simple to type.
  const Comp = (
    as === "li" ? motion.li : as === "section" ? motion.section : motion.div
  ) as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...props}
    />
  );
}

/** Container that staggers its <RevealItem> children. */
export function RevealGroup({
  stagger = 0.08,
  as = "div",
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number; as?: "div" | "ul" | "ol" }) {
  const Comp = (
    as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div
  ) as typeof motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    />
  );
}

export function RevealItem({
  as = "div",
  ...props
}: HTMLMotionProps<"div"> & { as?: "div" | "li" }) {
  const Comp = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Comp
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      {...props}
    />
  );
}
