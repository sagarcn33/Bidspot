import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold " +
  "transition-[background-color,box-shadow,color,transform] duration-fast ease-standard " +
  "select-none whitespace-nowrap active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-text-inverse shadow-[var(--shadow-glow-accent)] " +
    "hover:bg-accent-hover active:bg-accent-active",
  secondary:
    "bg-surface-raised text-text-primary border border-border-strong " +
    "hover:border-accent hover:text-text-primary active:bg-surface-overlay",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-raised",
};

// Error state overrides variant coloring (e.g. a failed submit CTA).
const errorState = "border border-error text-error hover:text-error bg-transparent";

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  error?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    error = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    sizes[size],
    error ? errorState : variants[variant],
    loading && "cursor-progress",
    className,
  );

  const content = (
    <>
      {loading && <Spinner />}
      <span className={cn(loading && "opacity-90")}>{children}</span>
    </>
  );

  // Link CTA
  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    // A disabled/loading link is rendered as an inert span for a11y.
    if (loading) {
      return (
        <span className={classes} role="link" aria-disabled="true" aria-busy="true">
          {content}
        </span>
      );
    }
    return (
      <Link href={href} className={classes} aria-live={error ? "polite" : undefined} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonRest.type ?? "button"}
      className={classes}
      aria-busy={loading || undefined}
      disabled={loading || buttonRest.disabled}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
