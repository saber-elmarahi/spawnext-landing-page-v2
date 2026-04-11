"use client";

import { useTranslation } from "@/lib/i18n";
import { BRANDS } from "@/lib/constants";

export function SocialProofBar() {
  const { t } = useTranslation();
  // Double the list to create a seamless marquee loop
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section
      className="py-10 overflow-hidden bg-primary/[0.04]"
      aria-label="Trusted brands"
    >
      <p className="text-center text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-6 opacity-60">
        {t("social.label")}
      </p>

      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #f9f9f7, transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #f9f9f7, transparent)" }} />

        {/* Scrolling row */}
        <div className="flex animate-marquee gap-16 whitespace-nowrap" aria-hidden="true">
          {doubled.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="inline-flex items-center gap-3 text-on-surface font-headline font-bold text-lg opacity-40 hover:opacity-80 transition-opacity cursor-default"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                {brand.icon}
              </span>
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
