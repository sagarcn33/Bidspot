import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { plans } from "@/data/content";
import { cn } from "@/lib/cn";

export function Pricing() {
  return (
    <Section id="pricing" aria-label="Pricing and engagement models">
      <SectionHeading
        eyebrow="Get started"
        title="Two ways to run Bid Spot"
        lead="Fund a self-serve seat and go live today, or partner with our trading team. No long-term lock-in."
        align="center"
      />

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08}>
            <article
              className={cn(
                "flex h-full flex-col rounded-lg border p-8",
                plan.featured
                  ? "border-accent bg-surface-raised shadow-[var(--shadow-glow-accent)]"
                  : "border-border-subtle bg-surface-raised",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-pill bg-accent px-2.5 py-1 text-xs font-semibold text-text-inverse">
                    Most popular
                  </span>
                )}
              </div>

              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-bold text-text-primary">
                  {plan.price}
                </span>
                <span className="text-sm text-text-tertiary">{plan.cadence}</span>
              </p>

              <p className="mt-3 text-sm text-text-secondary">{plan.summary}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent-text"
                    >
                      <path d="M4 10.5 8 14l8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href={plan.cta.href}
                variant={plan.featured ? "primary" : "secondary"}
                size="lg"
                className="mt-8 w-full"
              >
                {plan.cta.label}
              </Button>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-xs text-text-tertiary">
        {/* TODO(Sagar): replace with confirmed minimums, fees, and terms. */}
        Placeholder pricing — exact minimums and fee percentages to be confirmed.
      </p>
    </Section>
  );
}
