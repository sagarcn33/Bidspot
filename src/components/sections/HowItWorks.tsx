"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/data/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export function HowItWorks() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-step]");
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="how-it-works" aria-label="How it works" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Live in a day, optimized every second after"
          lead="From seat activation to continuous optimization — a workflow your team controls end to end."
        />

        <div ref={rootRef} className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Sticky visual — pins while the steps scroll past. */}
          <div className="lg:sticky lg:top-28 lg:h-[60vh] lg:self-start">
            <div className="flex h-full flex-col justify-between rounded-lg border border-border-subtle bg-surface-raised p-8">
              <p className="font-mono text-sm text-text-tertiary">
                Step {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
              <div>
                <p className="font-mono text-6xl font-bold text-accent-text">
                  {steps[active].n}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-text-primary">
                  {steps[active].title}
                </h3>
              </div>
              {/* Progress rail */}
              <div className="flex gap-2" aria-hidden="true">
                {steps.map((s, i) => (
                  <span
                    key={s.n}
                    className={cn(
                      "h-1 flex-1 rounded-pill transition-colors duration-normal ease-standard",
                      i <= active ? "bg-accent" : "bg-border-strong",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol className="flex flex-col gap-6 lg:gap-0">
            {steps.map((step, i) => (
              <li
                key={step.n}
                data-step={i}
                className={cn(
                  // Active vs. inactive is conveyed by border + surface only.
                  // We deliberately avoid opacity dimming: it drops the dark
                  // text below AA contrast on the light surface.
                  "rounded-lg border p-6 transition-[border-color,background-color] duration-normal ease-standard lg:min-h-[46vh] lg:flex lg:flex-col lg:justify-center",
                  active === i
                    ? "border-border-strong bg-surface-raised shadow-[var(--shadow-card)]"
                    : "border-border-subtle bg-surface-base",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-accent-text">{step.n}</span>
                  <h4 className="text-xl font-semibold text-text-primary">
                    {step.title}
                  </h4>
                </div>
                <p className="mt-3 max-w-md text-text-secondary">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
