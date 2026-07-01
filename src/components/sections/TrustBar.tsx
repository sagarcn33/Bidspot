"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { partners } from "@/data/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export function TrustBar() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  // Empty state: nothing to show → render nothing rather than an empty rail.
  if (partners.length === 0) return null;

  // With only a couple of partners the track can't fill the viewport, so we
  // don't animate — just center them. Otherwise duplicate for a seamless loop.
  const canScroll = partners.length >= 5 && !reduced;
  const track = canScroll ? [...partners, ...partners] : partners;

  return (
    <section aria-label="Supply and demand partners" className="border-y border-border-subtle bg-surface-raised/40 py-8">
      <Container>
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-wider text-text-tertiary">
          Bidding into the supply you already trust
        </p>
      </Container>

      <div
        className={cn("relative overflow-hidden", canScroll && "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]")}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <ul
          className={cn(
            "flex items-center gap-12 px-6",
            canScroll ? "w-max animate-marquee" : "flex-wrap justify-center",
            paused && "[animation-play-state:paused]",
          )}
        >
          {track.map((p, i) => (
            <li
              key={`${p.name}-${i}`}
              aria-hidden={canScroll && i >= partners.length ? true : undefined}
              className="whitespace-nowrap text-lg font-semibold text-text-secondary transition-colors duration-fast ease-standard hover:text-text-primary"
            >
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
