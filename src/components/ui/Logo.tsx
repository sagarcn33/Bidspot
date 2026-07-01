/** Bid Spot wordmark + bid-tick glyph. The visible "BidSpot" text is the
 *  accessible name; no aria-label override (avoids label/name mismatch). */
export function Logo({ className }: { className?: string }) {
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
          <circle cx="11" cy="11" r="10" stroke="var(--color-border-strong)" strokeWidth="1.5" />
          <circle cx="11" cy="11" r="5.5" stroke="var(--color-accent)" strokeWidth="1.5" />
          <circle cx="11" cy="11" r="2" fill="var(--color-accent)" />
        </svg>
        <span className="text-lg font-semibold tracking-tight text-text-primary">
          Bid<span className="text-accent-text">Spot</span>
        </span>
      </span>
    </span>
  );
}
