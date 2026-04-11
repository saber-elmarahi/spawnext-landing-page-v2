"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Badge }  from "@/components/ui/Badge";

const AVATARS = [
  { initials: "JD", color: "#5843d1" },
  { initials: "KL", color: "#ffab69" },
  { initials: "AR", color: "#715eeb" },
];

export function HeroSection() {
  const { t }    = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Gentle parallax on the video layer as the user scrolls down
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (video) {
          // Moves up at half scroll speed → classic parallax feel
          video.style.transform = `translateY(${window.scrollY * 0.20}px)`;
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* ══════════════════════════════════════════
          BACKGROUND — pixel-art office video
          The video starts with the empty office
          and animates agents appearing.
          poster= end-frame so it shows fully on
          hover-pause or slow networks.
      ══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          src="/assets/hero.mp4"
          poster="/assets/hero-poster.png"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          style={{
            // slight zoom so parallax movement doesn't show edges
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
          }}
        />

        {/* ── Layered overlays ── */}

        {/* 1. Background-colour wash — adapts to light/dark via CSS var */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--color-background) 72%, transparent) 0%, color-mix(in srgb, var(--color-background) 45%, transparent) 35%, color-mix(in srgb, var(--color-background) 30%, transparent) 60%, color-mix(in srgb, var(--color-background) 85%, transparent) 100%)",
          }}
        />

        {/* 2. Subtle purple tint — always brand-consistent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(88,67,209,0.10) 0%, rgba(113,94,235,0.05) 50%, transparent 100%)",
          }}
        />

        {/* 3. Bottom fog — blends into next section using CSS var */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-background))",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════
          FOREGROUND CONTENT
      ══════════════════════════════════════════ */}
      <div className="relative z-10 text-center max-w-4xl px-6 space-y-8 pt-28 pb-24">

        {/* Beta badge */}
        <div className="animate-fade-up">
          <Badge variant="beta" pulse>
            {t("hero.badge")}
          </Badge>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up delay-100 text-5xl md:text-7xl font-extrabold font-headline leading-[1.08] tracking-tight text-on-surface"
          style={{ hyphens: "auto" }}
        >
          {t("hero.h1.line1")}
          <br />
          <span className="gradient-text">{t("hero.h1.line2")}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up delay-200 text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
          style={{ hyphens: "auto" }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button size="lg" icon="arrow_forward">
            {t("hero.cta.primary")}
          </Button>
          <Button variant="secondary" size="lg" icon="play_circle" iconPosition="left">
            {t("hero.cta.secondary")}
          </Button>
        </div>

        {/* Social proof */}
        <div className="animate-fade-up delay-400 pt-6 flex flex-col items-center gap-3">
          <div className="flex -space-x-3">
            {AVATARS.map((av) => (
              <div
                key={av.initials}
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: av.color }}
                aria-hidden="true"
              >
                {av.initials}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-container flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
              +2.4k
            </div>
          </div>
          <span className="text-sm text-outline">{t("hero.social")}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 z-10"
        aria-hidden="true"
      >
        <span className="material-symbols-outlined text-3xl text-on-surface">
          keyboard_double_arrow_down
        </span>
      </div>
    </section>
  );
}
