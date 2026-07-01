"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HeroSlideshow } from "./HeroSlideshow";

// The particle canvas is decorative — load it client-side after hydration so
// three.js doesn't block first paint / the hero image LCP on mobile.
const HeroCanvas = dynamic(() => import("./HeroCanvas").then((m) => m.HeroCanvas), {
  ssr: false,
});
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

// The headline is a fast-paint element. It must NOT start at opacity:0 — that
// keeps it invisible until hydration (behind three.js/gsap on throttled
// mobile). Animate position only so the server-rendered text paints at once.
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
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-surface-base"
    >
      {/* Layer 1: cross-fading photo backdrop */}
      <HeroSlideshow />

      {/* Layer 2: dark scrim — left-weighted for text legibility, and a
          bottom fade that blends the dark hero into the light page below. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8,8,10,0.90) 0%, rgba(8,8,10,0.62) 42%, rgba(8,8,10,0.30) 100%), linear-gradient(to bottom, rgba(8,8,10,0.35) 0%, transparent 30%, transparent 62%, var(--color-surface-base) 100%)",
        }}
      />

      {/* Layer 3: bid-flow particle network (glows over the dark scrim) */}
      <HeroCanvas />

      {/* Layer 4: content */}
      <Container className="relative z-10 py-28">
        <div className="max-w-3xl">
          <motion.p
            {...line(reduced, 0)}
            className="mb-4 inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white/90 backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-data-teal" aria-hidden="true" />
            Demand-side platform
          </motion.p>

          <motion.h1
            {...headline(reduced)}
            className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
          >
            Bid across 40+ SSPs in real time, with precision at scale.
          </motion.h1>

          <motion.p
            {...line(reduced, 0.12)}
            className="mt-6 max-w-xl text-pretty text-lg text-white/80"
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
