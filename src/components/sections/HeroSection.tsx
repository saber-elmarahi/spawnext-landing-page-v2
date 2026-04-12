"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Badge }  from "@/components/ui/Badge";

const AVATARS = [
  { initials: "JD", color: "#5843d1" },
  { initials: "KL", color: "#f97316" },
  { initials: "AR", color: "#715eeb" },
];


export function HeroSection() {
  const { t }    = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax on video
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (video) video.style.transform = `translateY(${window.scrollY * 0.20}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const line1 = t("hero.h1.line1");   // "Build your dream team."
  const line2 = t("hero.h1.line2");   // "No code. No complexity."
  const line2Delay = line1.length * 38 + 100; // starts after line 1 finishes

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* ══════ VIDEO BACKGROUND ══════ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          src="/assets/hero.mp4"
          poster="/assets/hero-poster.png"
          autoPlay loop muted playsInline
          aria-hidden="true"
        />

        {/* Light mode overlay */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(249,249,247,0.78) 0%, rgba(249,249,247,0.52) 40%, rgba(249,249,247,0.38) 62%, rgba(249,249,247,0.92) 100%)",
          }}
        />

        {/* Dark mode overlay */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,11,26,0.82) 0%, rgba(13,11,26,0.60) 40%, rgba(13,11,26,0.45) 62%, rgba(13,11,26,0.95) 100%)",
          }}
        />

        {/* Purple tint — always */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(88,67,209,0.10) 0%, rgba(113,94,235,0.04) 50%, transparent 100%)",
          }}
        />

        {/* Bottom fog */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-background))" }}
        />
      </div>

      {/* ══════ FOREGROUND CONTENT ══════ */}
      <div className="relative z-10 text-center max-w-5xl px-6 space-y-10 pt-32 pb-24">

        {/* Beta badge */}
        <div className="animate-fade-up">
          <Badge variant="beta" pulse>{t("hero.badge")}</Badge>
        </div>

        {/* ── Headline — letter by letter ── */}
        <h1 className="font-extrabold font-headline leading-[1.06] tracking-tight">

          {/* Line 1 — text stroke gradient + letter by letter */}
          <span className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl text-on-surface mb-1 whitespace-nowrap headline-stroke-line1">
            {line1.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block letter-animate"
                style={{ animationDelay: `${i * 38}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>

          {/* Line 2 — gradient, animates as one block after line 1 finishes */}
          <span
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl gradient-text-hero headline-stroke line2-animate"
            style={{ animationDelay: `${line2Delay}ms` }}
          >
            {line2}
          </span>
        </h1>

        {/* ── Subtitle — word-by-word reveal + shimmer sweep ── */}
        {(() => {
          const subtitle  = t("hero.subtitle");
          const words     = subtitle.split(" ");
          const startMs   = line2Delay + 700;
          const stepMs    = 60;
          const lastDelay = startMs + (words.length - 1) * stepMs;
          // shimmer starts after all words are fully visible
          const shimmerDelay = lastDelay + 600;
          return (
            <p
              className={[
                "inline-block",
                "text-lg sm:text-xl md:text-2xl",
                "font-medium leading-relaxed",
                "px-6 py-3 rounded-2xl",
                "bg-surface-container-lowest/70 dark:bg-surface-container/60",
                "backdrop-blur-sm",
                "text-on-surface",
                "shadow-sm",
                "max-w-2xl",
                "relative overflow-hidden",
              ].join(" ")}
              style={{ hyphens: "auto" }}
            >
              {/* words */}
              {words.map((word, i) => (
                <span key={i}>
                  <span
                    className="word-animate"
                    style={{ animationDelay: `${startMs + i * stepMs}ms` }}
                  >
                    {word}
                  </span>
                  {i < words.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
              {/* shimmer overlay — appears after words, sweeps in loop */}
              <span
                className="subtitle-shimmer-overlay"
                style={{ animationDelay: `${shimmerDelay}ms` }}
                aria-hidden="true"
              />
            </p>
          );
        })()}

        {/* CTA buttons */}
        <div className="animate-fade-up delay-[600ms] flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" icon="arrow_forward">
            {t("hero.cta.primary")}
          </Button>
          <Button variant="secondary" size="lg" icon="play_circle" iconPosition="left">
            {t("hero.cta.secondary")}
          </Button>
        </div>

        {/* ── Social proof — frosted pill ── */}
        <div className="animate-fade-up delay-[700ms] flex flex-col items-center gap-4">
          <div className="flex -space-x-3">
            {AVATARS.map((av) => (
              <div
                key={av.initials}
                className="w-11 h-11 rounded-full border-2 border-surface-container-lowest flex items-center justify-center text-xs font-bold text-white shadow-md"
                style={{ backgroundColor: av.color }}
                aria-hidden="true"
              >
                {av.initials}
              </div>
            ))}
            <div className="w-11 h-11 rounded-full border-2 border-surface-container-lowest bg-primary flex items-center justify-center text-[10px] text-white font-bold shadow-md">
              +2.4k
            </div>
          </div>

          {/* Text with frosted pill */}
          <span
            className={[
              "text-sm md:text-base font-medium",
              "px-5 py-2 rounded-full",
              "bg-surface-container-lowest/75 dark:bg-surface-container/70",
              "backdrop-blur-sm",
              "text-on-surface",
              "shadow-sm",
            ].join(" ")}
          >
            {t("hero.social")}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60 z-10"
        aria-hidden="true"
      >
        <span className="material-symbols-outlined text-3xl text-on-surface-variant">
          keyboard_double_arrow_down
        </span>
      </div>
    </section>
  );
}
