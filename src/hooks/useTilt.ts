"use client";

import { useEffect, useRef } from "react";

interface TiltOptions {
  maxAngle?: number;   // max tilt in degrees (default 8)
  scale?: number;      // scale on hover (default 1.02)
  perspective?: number;// CSS perspective (default 800)
}

/**
 * Adds a CSS 3D tilt effect that follows mouse position within the element.
 * Cleans up gracefully on unmount and respects reduced motion.
 */
export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const { maxAngle = 8, scale = 1.02, perspective = 800 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);   // -1 to +1
      const dy = (e.clientY - cy) / (rect.height / 2);   // -1 to +1
      const rotX = -dy * maxAngle;
      const rotY =  dx * maxAngle;
      el!.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      el!.style.transition = "transform 0.1s ease-out";
    }

    function onLeave() {
      el!.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
      el!.style.transition = "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxAngle, scale, perspective]);

  return ref;
}
