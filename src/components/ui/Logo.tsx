/** Bid Spot wordmark + bid-tick glyph. The visible "BidSpot" text is the
 *  accessible name; no aria-label override (avoids label/name mismatch).
 *  `tone="light"` is used over the dark hero (white wordmark, bright amber
 *  accent); `tone="dark"` (default) is used on light surfaces. */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <span className={className}>
      <span className="inline-flex items-center gap-2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          {/* Concentric bid pulse */}
          <circle
            cx="11"
            cy="11"
            r="10"
            stroke={light ? "rgba(255,255,255,0.4)" : "var(--color-border-strong)"}
            strokeWidth="1.5"
          />
          <circle cx="11" cy="11" r="5.5" stroke="var(--color-accent)" strokeWidth="1.5" />
          <circle cx="11" cy="11" r="2" fill="var(--color-accent)" />
        </svg>
        <span
          className={`text-lg font-semibold tracking-tight ${
            light ? "text-white" : "text-text-primary"
          }`}
        >
          Bid
          <span className={light ? "text-accent" : "text-accent-text"}>Spot</span>
        </span>
      </span>
    </span>
  );
}
