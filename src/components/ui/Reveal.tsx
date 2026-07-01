"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { duration, easeStandard } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Fade-and-rise on scroll into view. The motion element is NOT clipped
 * (no overflow-hidden here) so its IntersectionObserver always sees a
 * non-zero area — the failure mode hit on the prior build.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li" | "span";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: duration.slow, ease: easeStandard, delay }}
    >
      {children}
    </MotionTag>
  );
}
