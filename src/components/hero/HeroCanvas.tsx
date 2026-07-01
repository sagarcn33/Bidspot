"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Deterministic PRNG so particle layout is stable across renders and
// never trips the react-hooks "no Math.random in render" rule (kept
// here for parity even though this runs in an effect).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIELD_COUNT = 1200; // drifting depth particles
const NODE_COUNT = 64; // network nodes (proximity lines) — O(n^2) kept small
const LINK_DIST = 3.4;

/** Dark data-viz palette tuned to read on the light surface. */
const PALETTE = [
  new THREE.Color("#1e293b"), // slate navy
  new THREE.Color("#2563eb"), // data blue
  new THREE.Color("#0d9488"), // data teal
  new THREE.Color("#f5a623"), // amber accent
];

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      // Defer to a microtask so we don't setState synchronously inside the
      // effect body (react-hooks/set-state-in-effect). The static fallback
      // renders a tick later — visually identical for a hard WebGL failure.
      queueMicrotask(() => setFailed(true));
      return;
    }

    const rand = mulberry32(20260601);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 18;

    // --- Depth particle field ---
    const fieldGeo = new THREE.BufferGeometry();
    const fieldPos = new Float32Array(FIELD_COUNT * 3);
    const fieldCol = new Float32Array(FIELD_COUNT * 3);
    for (let i = 0; i < FIELD_COUNT; i++) {
      fieldPos[i * 3] = (rand() - 0.5) * 46;
      fieldPos[i * 3 + 1] = (rand() - 0.5) * 26;
      fieldPos[i * 3 + 2] = (rand() - 0.5) * 30;
      const c = PALETTE[Math.floor(rand() * PALETTE.length)];
      fieldCol[i * 3] = c.r;
      fieldCol[i * 3 + 1] = c.g;
      fieldCol[i * 3 + 2] = c.b;
    }
    fieldGeo.setAttribute("position", new THREE.BufferAttribute(fieldPos, 3));
    fieldGeo.setAttribute("color", new THREE.BufferAttribute(fieldCol, 3));
    const fieldMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      // Normal (not additive) blending: on a light surface additive washes
      // every color toward white and disappears. Normal composites dark
      // points over white so they stay legible.
      blending: THREE.NormalBlending,
    });
    const field = new THREE.Points(fieldGeo, fieldMat);
    scene.add(field);

    // --- Network nodes + links ("bid flow") ---
    const nodePos = new Float32Array(NODE_COUNT * 3);
    const nodeVel = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePos[i * 3] = (rand() - 0.5) * 22;
      nodePos[i * 3 + 1] = (rand() - 0.5) * 13;
      nodePos[i * 3 + 2] = (rand() - 0.5) * 8;
      nodeVel[i * 3] = (rand() - 0.5) * 0.01;
      nodeVel[i * 3 + 1] = (rand() - 0.5) * 0.01;
      nodeVel[i * 3 + 2] = (rand() - 0.5) * 0.008;
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.24,
      color: new THREE.Color("#1e293b"),
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    const maxSegments = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const linePos = new Float32Array(maxSegments * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#2563eb"),
      transparent: true,
      opacity: 0.16,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const links = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(links);

    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    // --- Sizing ---
    function resize() {
      const w = mount!.clientWidth;
      const h = mount!.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // --- Pointer parallax ---
    const pointer = { x: 0, y: 0 };
    function onPointer(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("pointermove", onPointer, { passive: true });

    function updateLinks() {
      const arr = links.geometry.attributes.position.array as Float32Array;
      let s = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        const ax = nodePos[i * 3], ay = nodePos[i * 3 + 1], az = nodePos[i * 3 + 2];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = ax - nodePos[j * 3];
          const dy = ay - nodePos[j * 3 + 1];
          const dz = az - nodePos[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) {
            arr[s++] = ax; arr[s++] = ay; arr[s++] = az;
            arr[s++] = nodePos[j * 3]; arr[s++] = nodePos[j * 3 + 1]; arr[s++] = nodePos[j * 3 + 2];
          }
        }
      }
      links.geometry.setDrawRange(0, s / 3);
      links.geometry.attributes.position.needsUpdate = true;
    }

    function renderOnce() {
      updateLinks();
      camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.05;
      camera.position.y += (-pointer.y * 0.8 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }

    let raf = 0;
    let running = false;
    function tick() {
      // Drift nodes within a bounded box.
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let a = 0; a < 3; a++) {
          const idx = i * 3 + a;
          nodePos[idx] += nodeVel[idx];
          const bound = a === 0 ? 12 : a === 1 ? 7 : 5;
          if (nodePos[idx] > bound || nodePos[idx] < -bound) nodeVel[idx] *= -1;
        }
      }
      nodes.geometry.attributes.position.needsUpdate = true;
      field.rotation.y += 0.0004;
      renderOnce();
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // Reduced motion: paint a single static frame, never animate.
    if (reduced) {
      renderOnce();
    } else {
      start();
    }

    // Pause when tab is hidden (perf + battery).
    function onVisibility() {
      if (document.hidden || reduced) stop();
      else start();
    }
    document.addEventListener("visibilitychange", onVisibility);

    // Graceful degradation on context loss.
    function onContextLost(e: Event) {
      e.preventDefault();
      stop();
      setFailed(true);
    }
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      fieldGeo.dispose();
      fieldMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  // Static CSS fallback: WebGL missing/lost, or as the reduced-motion floor.
  if (failed) {
    return <StaticHeroBackdrop />;
  }

  return (
    <>
      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
      {/* Vignette + gradient wash layered over the canvas for legibility. */}
      <StaticHeroBackdrop overlayOnly />
    </>
  );
}

function StaticHeroBackdrop({ overlayOnly = false }: { overlayOnly?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background: overlayOnly
          ? "radial-gradient(60% 55% at 50% 0%, rgba(245,166,35,0.12), transparent 70%), linear-gradient(to bottom, transparent 45%, var(--color-surface-base))"
          : "radial-gradient(50% 50% at 50% 30%, rgba(37,99,235,0.10), transparent 70%), radial-gradient(45% 45% at 60% 60%, rgba(245,166,35,0.10), transparent 70%), var(--color-surface-base)",
      }}
    />
  );
}
