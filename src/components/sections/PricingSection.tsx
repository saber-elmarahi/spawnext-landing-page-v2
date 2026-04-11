"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation }     from "@/lib/i18n";
import { PRICING_PLANS }      from "@/lib/constants";
import type { Translations }  from "@/lib/i18n";

export function PricingSection() {
  const { t } = useTranslation();
  const ref   = useScrollAnimation<HTMLDivElement>({ delay: 100 });

  return (
    <section
      id="pricing"
      className="py-24 px-6 md:px-8 max-w-7xl mx-auto"
      ref={ref}
    >
      {/* Header */}
      <div className="text-center mb-16 space-y-4 reveal">
        <span className="text-primary font-bold tracking-widest text-xs uppercase font-label">
          {t("pricing.label")}
        </span>
        <h2
          className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-surface"
          style={{ hyphens: "auto" }}
        >
          {t("pricing.title")}
        </h2>
        <p className="text-on-surface-variant" style={{ hyphens: "auto" }}>
          {t("pricing.subtitle")}
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {PRICING_PLANS.map((plan) => (
          <div key={plan.id} className="reveal">
            <PricingCard plan={plan} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: (typeof PRICING_PLANS)[number] }) {
  const { t } = useTranslation();
  const name  = t(plan.nameKey as keyof Translations);
  const desc  = t(plan.descKey as keyof Translations);
  const cta   = t(plan.ctaKey  as keyof Translations);

  if (plan.popular) {
    // ── Elevated "Pro" card ──
    return (
      <div
        className={[
          "relative rounded-3xl p-10 overflow-hidden",
          "-mt-4 md:-mb-4 scale-105",
          "shadow-[0_20px_60px_rgba(88,67,209,0.35)]",
        ].join(" ")}
        style={{ background: "var(--gradient-primary)" }}
      >
        {/* Popular badge */}
        <div className="absolute top-4 right-4 bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {t("pricing.badge")}
        </div>

        {/* Name & desc */}
        <div className="text-white space-y-1 mb-6">
          <h4 className="text-xl font-bold font-headline">{name}</h4>
          <p className="text-sm opacity-80" style={{ hyphens: "auto" }}>{desc}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline text-white mb-8">
          <span className="text-5xl font-extrabold font-headline">${plan.price}</span>
          <span className="opacity-80 text-sm ml-1">{t("pricing.monthly")}</span>
        </div>

        {/* Features */}
        <ul className="space-y-3 text-sm text-white mb-8">
          {plan.features.map((fk) => (
            <li key={fk} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span style={{ hyphens: "auto" }}>{t(fk as keyof Translations)}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className={[
            "w-full py-4 rounded-full",
            "bg-white text-primary",
            "font-bold font-headline",
            "hover:scale-[1.02] hover:shadow-xl",
            "transition-all duration-200",
          ].join(" ")}
        >
          {cta}
        </button>
      </div>
    );
  }

  // ── Standard card ──
  return (
    <div
      className={[
        "bg-surface-container-lowest p-10 rounded-2xl",
        "border border-outline-variant/20",
        "space-y-8",
        "hover:shadow-elevated hover:border-primary/20",
        "transition-all duration-300",
        "shadow-card",
      ].join(" ")}
    >
      <div>
        <h4 className="text-xl font-bold font-headline mb-1 text-on-surface">{name}</h4>
        <p className="text-sm text-on-surface-variant" style={{ hyphens: "auto" }}>{desc}</p>
      </div>

      <div className="flex items-baseline">
        <span className="text-4xl font-extrabold font-headline text-on-surface">${plan.price}</span>
        <span className="text-on-surface-variant text-sm ml-1">{t("pricing.monthly")}</span>
      </div>

      <ul className="space-y-3 text-sm text-on-surface">
        {plan.features.map((fk) => (
          <li key={fk} className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-500 dark:text-green-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <span style={{ hyphens: "auto" }}>{t(fk as keyof Translations)}</span>
          </li>
        ))}
      </ul>

      <button
        className={[
          "w-full py-3 rounded-full",
          "border border-primary text-primary",
          "font-bold font-headline",
          "hover:bg-primary/5 hover:scale-[1.02]",
          "transition-all duration-200",
        ].join(" ")}
      >
        {cta}
      </button>
    </div>
  );
}
