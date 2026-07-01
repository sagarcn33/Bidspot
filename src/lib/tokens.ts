/**
 * Motion tokens as JS constants so GSAP / Framer Motion never carry
 * magic numbers. Mirrors the CSS custom properties in globals.css.
 */
export const duration = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.28,
  slow: 0.45,
} as const;

/** Standard easing as a cubic-bezier array (Framer) and string (GSAP/CSS). */
export const easeStandard = [0.2, 0.8, 0.2, 1] as const;
export const easeStandardCss = "cubic-bezier(0.2, 0.8, 0.2, 1)";
