import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand() {
  return (
    <section id="contact" aria-label="Book a demo" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-border-strong bg-surface-raised px-8 py-14 text-center md:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 80% at 50% 0%, rgba(245,166,35,0.14), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-text-primary text-balance md:text-4xl">
                See Bid Spot bid your budget in real time
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
                Book a 30-minute walkthrough. We&apos;ll show live bidding, targeting,
                and log-level reporting against your goals.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="mailto:hello@bidspot.example" size="lg">
                  Book a demo
                </Button>
                <Button href="#platform" size="lg" variant="secondary">
                  Explore the platform
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
