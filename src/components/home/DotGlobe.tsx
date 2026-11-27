"use client";

import { useEffect, useRef } from "react";

/**
 * Globe de points en rotation, la signature « Built to move ».
 * Canvas 2D léger. Une seule image fixe si l'utilisateur préfère moins d'animations.
 */
export function DotGlobe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    const fg = styles.getPropertyValue("--color-fg").trim() || "#0e0e10";
    const accent = styles.getPropertyValue("--color-accent").trim() || "#ec4a17";

    const N = 1100;
    const pts: [number, number, number, boolean][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      // Quelques points d'accent regroupés en bandes, comme des trajectoires.
      const isAccent = Math.abs(Math.sin(t * 0.5) + y * 0.8) < 0.06;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r, isAccent]);
    }

    let w = 0, h = 0, dpr = 1, raf = 0, angle = 0.6, tilt = 0.35, targetTilt = 0.35, targetSpin = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.44;
      const cx = w / 2, cy = h / 2;
      const ca = Math.cos(angle), sa = Math.sin(angle), ct = Math.cos(tilt), st = Math.sin(tilt);
      for (const [x, y, z, acc] of pts) {
        const x1 = x * ca - z * sa;
        const z1 = x * sa + z * ca;
        const y1 = y * ct - z1 * st;
        const z2 = y * st + z1 * ct;
        const depth = (z2 + 1) / 2; // 0 derrière, 1 devant
        const size = (acc ? 1.7 : 1.1) * (0.45 + depth * 0.9);
        ctx.globalAlpha = acc ? 0.35 + depth * 0.65 : 0.06 + depth * 0.5;
        ctx.fillStyle = acc ? accent : fg;
        ctx.beginPath();
        ctx.arc(cx + x1 * R, cy + y1 * R, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const loop = () => {
      angle += 0.0022 + targetSpin;
      targetSpin *= 0.94;
      tilt += (targetTilt - tilt) * 0.05;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetTilt = 0.35 + ny * 0.4;
    };
    const onScroll = () => { targetSpin = Math.min(targetSpin + 0.004, 0.03); };

    resize();
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);
    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`block h-full w-full ${className}`} />;
}
