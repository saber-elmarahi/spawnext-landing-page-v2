"use client";

import { useState }            from "react";
import { useScrollAnimation }  from "@/hooks/useScrollAnimation";
import { useTranslation }      from "@/lib/i18n";
import { PRICING_PLANS }       from "@/lib/constants";
import type { Translations }   from "@/lib/i18n";
import { SectionHeader }       from "@/components/ui/SectionHeader";

type Billing = "monthly" | "annual";

const ANNUAL_DISCOUNT = 0.20;

export function PricingSection() {
  const { t }                   = useTranslation();
  const ref                     = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const [billing, setBilling]   = useState<Billing>("monthly");

  return (
    <section
      id="pricing"
      className="relative py-28 px-6 md:px-8 overflow-hidden"
      ref={ref}
    >
      {/* Section background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(88,67,209,0.10) 0%, transparent 70%), var(--color-background)",
        }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <SectionHeader
          icon="local_activity"
          label={t("pricing.label")}
          title={t("pricing.title")}
          subtitle={t("pricing.subtitle")}
          className="mb-12"
        />

        {/* ── Billing toggle ── */}
        <div className="flex items-center justify-center gap-3 mb-14 reveal">
          <BillingToggle billing={billing} onChange={setBilling} />
          {billing === "annual" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 animate-fade-up">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                savings
              </span>
              Save 20%
            </span>
          )}
        </div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className="reveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <PricingCard plan={plan} billing={billing} />
            </div>
          ))}
        </div>

        {/* ── Trust line ── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-on-surface-variant reveal">
          {[
            { icon: "verified",      text: "No hidden fees"      },
            { icon: "autorenew",     text: "Cancel anytime"      },
            { icon: "lock",          text: "Secure payments"     },
            { icon: "support_agent", text: "Priority support"    },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-primary text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {icon}
              </span>
              {text}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Billing Toggle ────────────────────────────────────────────────────────────
function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-2xl"
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(var(--color-surface-container-lowest), var(--color-surface-container-lowest)) padding-box, " +
          "linear-gradient(135deg, rgba(88,67,209,0.40), rgba(168,85,247,0.45), rgba(6,182,212,0.30)) border-box",
      }}
    >
      {(["monthly", "annual"] as Billing[]).map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={[
            "px-5 py-2 rounded-xl text-sm font-semibold font-headline transition-all duration-250",
            billing === opt
              ? "text-white shadow-[0_2px_12px_rgba(88,67,209,0.30)]"
              : "text-on-surface-variant hover:text-on-surface",
          ].join(" ")}
          style={
            billing === opt
              ? { background: "linear-gradient(135deg,#5843d1 0%,#a855f7 100%)" }
              : {}
          }
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </button>
      ))}
    </div>
  );
}

// ── Pricing Card ──────────────────────────────────────────────────────────────
function PricingCard({
  plan,
  billing,
}: {
  plan: (typeof PRICING_PLANS)[number];
  billing: Billing;
}) {
  const { t } = useTranslation();
  const name  = t(plan.nameKey as keyof Translations);
  const desc  = t(plan.descKey as keyof Translations);
  const cta   = t(plan.ctaKey  as keyof Translations);

  const rawPrice   = plan.price === "custom" ? null : plan.price as number;
  const finalPrice = rawPrice !== null && billing === "annual" && rawPrice > 0
    ? Math.round(rawPrice * (1 - ANNUAL_DISCOUNT))
    : rawPrice;

  if (plan.popular) {
    // ── Popular card — gradient fill ──
    return (
      <div className="relative rounded-3xl p-px h-full pricing-popular-card">
        {/* gradient border shell */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "linear-gradient(135deg,#5843d1 0%,#a855f7 55%,#06b6d4 100%)",
            opacity: 0.9,
          }}
        />
        <div
          className="relative rounded-[22px] h-full flex flex-col p-8 overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #2a1f6e 0%, #1e1650 50%, #1a1440 100%)",
          }}
        >
          {/* glow blob */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle,#a855f7,transparent 70%)" }}
          />

          {/* Popular badge */}
          <div className="absolute top-5 right-5">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/15 text-white border border-white/20">
              <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              {t("pricing.badge")}
            </span>
          </div>

          {/* Name */}
          <div className="mb-6">
            <h4 className="text-lg font-extrabold font-headline text-white mb-1">{name}</h4>
            <p className="text-sm text-white/65" style={{ hyphens: "auto" }}>{desc}</p>
          </div>

          {/* Price */}
          <div className="flex items-end gap-1 mb-1">
            {finalPrice !== null ? (
              <>
                <span className="text-5xl font-extrabold font-headline text-white leading-none">
                  ${finalPrice}
                </span>
                <span className="text-white/60 text-sm mb-1">{t("pricing.monthly")}</span>
              </>
            ) : (
              <span className="text-4xl font-extrabold font-headline text-white">Custom</span>
            )}
          </div>
          {billing === "annual" && rawPrice !== null && rawPrice > 0 && (
            <p className="text-white/50 text-xs mb-6 line-through">${rawPrice}{t("pricing.monthly")}</p>
          )}
          {(billing !== "annual" || rawPrice === 0) && <div className="mb-6" />}

          {/* Features */}
          <ul className="space-y-3 text-sm flex-1 mb-8">
            {plan.features.map((fk) => (
              <li key={fk} className="flex items-start gap-2.5 text-white/85">
                <span
                  className="material-symbols-outlined text-[16px] mt-[1px] shrink-0 text-[#a855f7]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span style={{ hyphens: "auto" }}>{t(fk as keyof Translations)}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="w-full py-3.5 rounded-2xl bg-white text-[#5843d1] font-bold font-headline text-sm hover:scale-[1.02] hover:shadow-[0_8px_28px_rgba(255,255,255,0.20)] transition-all duration-200">
            {cta}
          </button>
        </div>
      </div>
    );
  }

  // ── Standard card — glass with gradient border ──
  return (
    <div
      className="relative h-full flex flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated group"
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(var(--color-surface-container-lowest), var(--color-surface-container-lowest)) padding-box, " +
          "linear-gradient(135deg, rgba(88,67,209,0.25) 0%, rgba(168,85,247,0.28) 50%, rgba(6,182,212,0.20) 100%) border-box",
      }}
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(88,67,209,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Name */}
      <div className="mb-6">
        <h4 className="text-lg font-extrabold font-headline text-on-surface mb-1">{name}</h4>
        <p className="text-sm text-on-surface-variant" style={{ hyphens: "auto" }}>{desc}</p>
      </div>

      {/* Price */}
      <div className="flex items-end gap-1 mb-1">
        {finalPrice !== null ? (
          <>
            <span className="text-5xl font-extrabold font-headline text-on-surface leading-none">
              {finalPrice === 0 ? "Free" : `$${finalPrice}`}
            </span>
            {finalPrice > 0 && (
              <span className="text-on-surface-variant text-sm mb-1">{t("pricing.monthly")}</span>
            )}
          </>
        ) : (
          <span className="text-4xl font-extrabold font-headline text-on-surface">Custom</span>
        )}
      </div>
      {billing === "annual" && rawPrice !== null && rawPrice > 0 && (
        <p className="text-on-surface-variant/50 text-xs mb-6 line-through">${rawPrice}{t("pricing.monthly")}</p>
      )}
      {(billing !== "annual" || rawPrice === 0) && <div className="mb-6" />}

      {/* Divider */}
      <div
        className="h-px mb-6 w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(88,67,209,0.30), rgba(168,85,247,0.30), transparent)",
        }}
      />

      {/* Features */}
      <ul className="space-y-3 text-sm flex-1 mb-8">
        {plan.features.map((fk) => (
          <li key={fk} className="flex items-start gap-2.5 text-on-surface-variant">
            <span
              className="material-symbols-outlined text-primary text-[16px] mt-[1px] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span style={{ hyphens: "auto" }}>{t(fk as keyof Translations)}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className="w-full py-3.5 rounded-2xl font-bold font-headline text-sm transition-all duration-200 hover:scale-[1.02]"
        style={{
          border: "1.5px solid transparent",
          background:
            "linear-gradient(var(--color-surface-container-lowest), var(--color-surface-container-lowest)) padding-box, " +
            "linear-gradient(135deg, rgba(88,67,209,0.60) 0%, rgba(168,85,247,0.65) 50%, rgba(6,182,212,0.50) 100%) border-box",
          color: "var(--color-primary)",
        }}
      >
        {cta}
      </button>
    </div>
  );
}
