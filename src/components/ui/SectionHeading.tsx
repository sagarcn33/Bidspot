import * as React from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/** Eyebrow + title + optional lead, reused across marketing sections. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-text">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-3xl font-bold tracking-tight text-text-primary text-balance md:text-4xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-text-secondary text-pretty">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
