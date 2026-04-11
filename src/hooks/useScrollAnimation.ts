"use client";

import { useEffect, useRef } from "react";

interface ScrollAnimationOptions {
  threshold?: number;   // 0–1, fraction of element visible to trigger
  rootMargin?: string;
  once?: boolean;       // only animate once (default true)
  delay?: number;       // ms stagger delay for sequential children
}

/**
 * Attaches an IntersectionObserver to a container ref.
 * All direct children with class "reveal" get class "visible" when they enter the viewport.
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {},
) {
  const { threshold = 0.15, rootMargin = "0px", once = true, delay = 0 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>(".reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const index = targets.indexOf(target);
            setTimeout(() => {
              target.classList.add("visible");
            }, index * delay);
            if (once) observer.unobserve(target);
          } else if (!once) {
            (entry.target as HTMLElement).classList.remove("visible");
          }
        });
      },
      { threshold, rootMargin },
    );

    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [threshold, rootMargin, once, delay]);

  return ref;
}
