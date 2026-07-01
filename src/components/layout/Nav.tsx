"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/data/content";
import { duration, easeStandard } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const SCROLL_THRESHOLD = 24;

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > SCROLL_THRESHOLD;
    if (next !== scrolled) setScrolled(next);
  });

  const solid = scrolled || menuOpen;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0)",
        borderColor: solid ? "var(--color-border-subtle)" : "rgba(231,231,236,0)",
      }}
      transition={{ duration: reduced ? 0 : duration.normal, ease: easeStandard }}
      style={{ backdropFilter: solid ? "blur(12px)" : "none" }}
    >
      <div className="border-b" style={{ borderColor: "inherit" }}>
        <Container className="flex h-16 items-center justify-between">
          <Link href="#main" className="rounded-md" aria-label="BidSpot home">
            <Logo tone={solid ? "dark" : "light"} />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors duration-fast ease-standard",
                  solid
                    ? "text-text-secondary hover:text-text-primary"
                    : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="#contact" size="md">
              Book a demo
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-md md:hidden",
              solid ? "text-text-primary" : "text-white",
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Burger open={menuOpen} />
          </button>
        </Container>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : duration.fast, ease: easeStandard }}
          className="border-b border-border-subtle bg-surface-base/95 backdrop-blur-md md:hidden"
          onKeyDown={(e) => {
            if (e.key === "Escape") setMenuOpen(false);
          }}
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-3 text-base text-text-secondary hover:bg-surface-raised hover:text-text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="#contact" size="lg" className="mt-2 w-full" onClick={() => setMenuOpen(false)}>
              Book a demo
            </Button>
          </Container>
        </motion.nav>
      )}
    </motion.header>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 h-0.5 w-5 bg-current transition-all duration-fast ease-standard",
          open ? "top-1.5 rotate-45" : "top-0.5",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-fast ease-standard",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-0.5 w-5 bg-current transition-all duration-fast ease-standard",
          open ? "top-1.5 -rotate-45" : "top-2.5",
        )}
      />
    </span>
  );
}
