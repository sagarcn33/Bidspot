"use client";

import { motion } from "framer-motion";
import { HeroCanvas } from "./HeroCanvas";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { duration, easeStandard } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/useReducedMotion";

const line = (reduced: boolean, delay: number) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: duration.slow, ease: easeStandard, delay },
      };

// The headline is the LCP element. It must NOT start at opacity:0 — that
// keeps it invisible until hydration, and on throttled mobile CPU (behind
// three.js/gsap) that pushes LCP past 4s. Animate position only, so the
// server-rendered text paints immediately at full opacity.
const headline = (reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { y: 24 },
        animate: { y: 0 },
        transition: { duration: duration.slow, ease: easeStandard, delay: 0.06 },
      };

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Introduction"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden"
    >
      <HeroCanvas />

      <Container className="relative z-10 py-28">
        <div className="max-w-3xl">
          <motion.p
            {...line(reduced, 0)}
            className="mb-4 inline-flex items-center gap-2 rounded-pill border border-border-subtle bg-surface-raised/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-data-blue backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            Demand-side platform
          </motion.p>

          <motion.h1
            {...headline(reduced)}
            className="text-balance text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl"
          >
            Bid across 40+ SSPs in real time, with precision at scale.
          </motion.h1>

          <motion.p
            {...line(reduced, 0.12)}
            className="mt-6 max-w-xl text-pretty text-lg text-text-secondary"
          >
            Bid Spot gives buyers, agencies, and enterprise teams one seat for
            real-time bidding, audience targeting, and transparent, log-level
            reporting across every channel.
          </motion.p>

          <motion.div
            {...line(reduced, 0.18)}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#contact" size="lg">
              Book a demo
            </Button>
            <Button href="#platform" size="lg" variant="secondary">
              See the platform
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
