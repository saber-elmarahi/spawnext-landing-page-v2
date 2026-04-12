"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation }     from "@/lib/i18n";

export function FinalCTA() {
  const { t } = useTranslation();
  const ref   = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-24 px-6 md:px-8 relative overflow-hidden bg-surface" ref={ref}>
      <div
        className={[
          "max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20",
          "text-center text-white relative z-10 overflow-hidden",
        ].join(" ")}
        style={{ background: "var(--gradient-primary)" }}
      >
        {/* Floating decorative circles */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-8 right-20 w-6 h-6 rounded-full bg-white/20 animate-float pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-12 left-24 w-4 h-4 rounded-full bg-white/20 animate-float pointer-events-none" style={{ animationDelay: "2s" }} aria-hidden="true" />

        {/* Floating pixel silhouettes (SVG inline) */}
        <div className="absolute top-8 left-12 w-16 opacity-15 animate-float hidden md:block pointer-events-none" aria-hidden="true">
          <PersonSVG />
        </div>
        <div className="absolute bottom-8 right-12 w-16 opacity-15 animate-float hidden md:block pointer-events-none" style={{ animationDelay: "1.5s" }} aria-hidden="true">
          <PersonSVG />
        </div>

        {/* Content */}
        <div className="relative z-10 reveal space-y-8">
          <h2
            className="text-4xl md:text-6xl font-extrabold font-headline"
            style={{ hyphens: "auto" }}
          >
            {t("cta.title")}
          </h2>
          <p
            className="text-xl opacity-90 max-w-xl mx-auto leading-relaxed"
            style={{ hyphens: "auto" }}
          >
            {t("cta.subtitle")}
          </p>
          <button
            className={[
              "inline-flex items-center gap-3 mx-auto",
              "bg-white text-primary",
              "px-10 py-5 rounded-full",
              "font-bold font-headline text-xl",
              "hover:scale-[1.04] hover:-translate-y-1",
              "hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]",
              "transition-all duration-200",
              "shadow-[0_8px_32px_rgba(0,0,0,0.15)]",
            ].join(" ")}
          >
            {t("cta.button")}
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

// Simple pixel-art style person SVG
function PersonSVG() {
  return (
    <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <rect x="22" y="4" width="20" height="20" rx="10" fill="white" />
      {/* Body */}
      <rect x="16" y="28" width="32" height="24" rx="8" fill="white" />
      {/* Left arm */}
      <rect x="4" y="30" width="12" height="8" rx="4" fill="white" />
      {/* Right arm */}
      <rect x="48" y="30" width="12" height="8" rx="4" fill="white" />
      {/* Legs */}
      <rect x="18" y="54" width="12" height="20" rx="6" fill="white" />
      <rect x="34" y="54" width="12" height="20" rx="6" fill="white" />
    </svg>
  );
}
