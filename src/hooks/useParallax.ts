"use client";

import { useEffect, useRef } from "react";

/**
 * Applies a CSS translateY parallax effect to an element as the user scrolls.
 * @param speed  Fraction of scroll offset to apply (e.g. 0.3 = moves at 30% scroll speed).
 *               Negative values make the element move upward faster.
 */
export function useParallax<T extends HTMLElement>(speed = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewCenter = window.innerHeight / 2;
        const offset = (rect.top + rect.height / 2 - viewCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once immediately

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}
