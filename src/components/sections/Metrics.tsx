"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { metrics, type Metric } from "@/data/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

function formatValue(value: number, m: Metric): string {
  const rounded =
    m.decimals != null ? value.toFixed(m.decimals) : Math.round(value).toLocaleString("en-US");
  return `${m.prefix ?? ""}${rounded}${m.suffix ?? ""}`;
}

export function Metrics() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-metric]"),
    );

    // Set final values immediately for reduced motion or missing data.
    const setFinal = (el: HTMLElement) => {
      const target = Number(el.dataset.metric);
      const idx = Number(el.dataset.index);
      el.textContent = formatValue(target, metrics[idx]);
    };

    if (reduced) {
      nodes.forEach(setFinal);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      nodes.forEach((el) => {
        const target = Number(el.dataset.metric);
        const idx = Number(el.dataset.index);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = formatValue(counter.v, metrics[idx]);
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section aria-label="Platform performance" className="border-y border-border-subtle bg-surface-base py-16 md:py-20">
      <Container>
        <div ref={rootRef} className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={m.label} className="text-center lg:text-left">
              {m.value == null ? (
                // Empty state: metric not yet available.
                <p className="font-mono text-3xl font-semibold text-text-tertiary md:text-4xl">
                  —
                </p>
              ) : (
                <p
                  data-metric={m.value}
                  data-index={i}
                  className="font-mono text-3xl font-semibold tabular-nums text-text-primary md:text-4xl"
                >
                  0
                </p>
              )}
              <p className="mt-2 text-sm text-text-secondary">{m.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
