"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

// Server + first client paint assume motion is allowed; the store
// re-syncs immediately on mount. Prevents hydration mismatch without
// a setState-in-effect (rejected by the compiler-era react-hooks rules).
function getServerSnapshot(): boolean {
  return false;
}

/** True when the user has requested reduced motion. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
