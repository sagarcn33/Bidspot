import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import { capabilities } from "@/data/content";

export function Platform() {
  return (
    <Section id="platform" aria-label="Platform capabilities">
      <SectionHeading
        eyebrow="The platform"
        title="One seat for the entire programmatic buy"
        lead="Plan, bid, and measure across every channel — with the transparency your finance team will actually sign off on."
      />

      <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap, i) => (
          <Reveal as="li" key={cap.title} delay={i * 0.06}>
            <article className="group h-full rounded-lg border border-border-subtle bg-surface-raised p-6 transition-[transform,border-color,box-shadow] duration-normal ease-standard hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-card)] focus-within:border-border-strong">
              <span className="inline-flex size-11 items-center justify-center rounded-md border border-border-subtle bg-surface-overlay text-accent-text transition-colors duration-normal ease-standard group-hover:border-accent">
                <CapabilityIcon name={cap.icon} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-text-primary">
                {cap.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {cap.copy}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
