"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to a media query without setState-in-effect (which the
 * compiler-era react-hooks lint rejects). Returns false on the server.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
