"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { heroImages } from "@/data/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

const SLIDE_MS = 4200; // time each image is shown before crossfade

/**
 * Full-bleed background that cross-fades through the hero images with a slow
 * Ken Burns zoom — the Targetoo-style cycling backdrop. Sits behind the
 * particle canvas and a dark scrim. Reduced motion → a single static image.
 */
export function HeroSlideshow() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Only the first image is in the initial HTML (it's the LCP element).
  // The rest mount shortly after first paint so they don't compete with it
  // for bandwidth on throttled mobile. setState is deferred (timeout
  // callback), never synchronous in the effect body.
  const [deferredReady, setDeferredReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDeferredReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduced || heroImages.length < 2) return;

    let id: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      id ??= setInterval(
        () => setIndex((i) => (i + 1) % heroImages.length),
        SLIDE_MS,
      );
    };
    const stop = () => {
      if (id) clearInterval(id);
      id = undefined;
    };

    start();
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-surface-base" aria-hidden="true">
      {heroImages.map((img, i) => (
        <div
          key={img.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-standard",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div className={cn("relative h-full w-full", !reduced && "animate-kenburns")}>
            {(i === 0 || deferredReady) && (
              <Image
                src={img.src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                quality={62}
                className="object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
