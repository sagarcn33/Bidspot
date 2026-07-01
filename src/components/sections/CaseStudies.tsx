"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/data/content";
import { duration, easeStandard } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export function CaseStudies() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const baseId = useId();

  if (caseStudies.length === 0) return null;

  const current = caseStudies[index];
  const go = (next: number) =>
    setIndex((next + caseStudies.length) % caseStudies.length);

  return (
    <Section id="case-studies" aria-label="Customer results" className="bg-surface-raised/30">
      <SectionHeading
        eyebrow="Proof"
        title="Teams that moved programmatic in-house"
        lead="Outcomes from advertisers and agencies running on Bid Spot."
      />

      <div className="mt-12 rounded-lg border border-border-subtle bg-surface-raised p-8 md:p-10">
        <div
          role="region"
          aria-live="polite"
          aria-roledescription="carousel"
          aria-label={`Case study ${index + 1} of ${caseStudies.length}`}
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.client}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduced ? 0 : duration.normal, ease: easeStandard }}
              className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center"
            >
              <div>
                <blockquote className="text-xl font-medium leading-relaxed text-text-primary text-pretty md:text-2xl">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">{current.client}</span>
                  {" · "}
                  {current.sector}
                </figcaption>
              </div>
              <div className="rounded-md border border-border-subtle bg-surface-overlay p-6 text-center md:text-left">
                <p className="font-mono text-5xl font-bold text-data-teal">
                  {current.metricValue}
                </p>
                <p className="mt-2 text-sm text-text-secondary">{current.metricLabel}</p>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2" role="tablist" aria-label="Select case study">
            {caseStudies.map((cs, i) => (
              <button
                key={cs.client}
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={i === index}
                aria-label={`${cs.client} case study`}
                onClick={() => setIndex(i)}
                className="group/tab flex h-6 min-w-6 items-center justify-center"
              >
                {/* 24px hit area (WCAG 2.5.8) wraps the small visual pill. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-2 rounded-pill transition-[width,background-color] duration-normal ease-standard",
                    i === index
                      ? "w-8 bg-accent"
                      : "w-2 bg-border-strong group-hover/tab:bg-text-tertiary",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <CarouselButton label="Previous case study" onClick={() => go(index - 1)}>
              ‹
            </CarouselButton>
            <CarouselButton label="Next case study" onClick={() => go(index + 1)}>
              ›
            </CarouselButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-10 items-center justify-center rounded-md border border-border-strong bg-surface-base text-lg text-text-primary transition-colors duration-fast ease-standard hover:border-accent hover:text-accent-text active:bg-surface-overlay"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
