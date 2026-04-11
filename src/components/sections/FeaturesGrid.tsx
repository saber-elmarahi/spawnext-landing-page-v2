"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation }     from "@/lib/i18n";
import { Card }               from "@/components/ui/Card";
import { FEATURES }           from "@/lib/constants";
import type { Translations }  from "@/lib/i18n";

export function FeaturesGrid() {
  const { t }  = useTranslation();
  const ref    = useScrollAnimation<HTMLDivElement>({ delay: 80 });

  return (
    <section
      id="features"
      className="py-24 bg-surface-container-low px-6 md:px-8"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 reveal">
          <div className="max-w-xl space-y-3">
            <span className="text-primary font-bold tracking-widest text-xs uppercase font-label">
              {t("features.label")}
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface"
              style={{ hyphens: "auto" }}
            >
              {t("features.title")}
            </h2>
          </div>
          <div className="hidden md:block">
            <button
              className={[
                "bg-primary-container text-white px-6 py-3 rounded-full",
                "font-bold font-headline text-sm",
                "hover:bg-primary transition-colors duration-200",
              ].join(" ")}
            >
              {t("features.cta")}
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="reveal">
              <Card tilt className="h-full group">
                <span
                  className="material-symbols-outlined text-primary text-3xl mb-6 block transition-transform duration-300 group-hover:scale-110"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {feature.icon}
                </span>
                <h4
                  className="text-xl font-bold font-headline mb-3 text-on-surface"
                  style={{ hyphens: "auto" }}
                >
                  {t(feature.titleKey as keyof Translations)}
                </h4>
                <p
                  className="text-on-surface-variant text-sm leading-relaxed"
                  style={{ hyphens: "auto" }}
                >
                  {t(feature.descKey as keyof Translations)}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
