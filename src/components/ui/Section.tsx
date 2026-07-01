import * as React from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/** Vertical section rhythm wrapper. Pass `bleed` to skip the Container. */
export function Section({
  id,
  className,
  containerClassName,
  bleed = false,
  children,
  "aria-label": ariaLabel,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("scroll-mt-24 py-20 md:py-28", className)}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
