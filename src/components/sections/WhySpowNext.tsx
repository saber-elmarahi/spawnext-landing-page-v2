"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation }     from "@/lib/i18n";
import type { Translations }  from "@/lib/i18n";

// ── Pillar data ───────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon:    "model_training",
    tagKey:  "why.p1.tag"   as keyof Translations,
    titleKey:"why.p1.title" as keyof Translations,
    descKey: "why.p1.desc"  as keyof Translations,
    num:     "01",
    iconBg:  "linear-gradient(135deg, #5843d1 0%, #715eeb 100%)",
    glowColor: "rgba(88,67,209,0.30)",
    borderGradient:
      "linear-gradient(135deg, rgba(88,67,209,0.35) 0%, rgba(113,94,235,0.40) 50%, rgba(168,85,247,0.25) 100%)",
  },
  {
    icon:    "groups",
    tagKey:  "why.p2.tag"   as keyof Translations,
    titleKey:"why.p2.title" as keyof Translations,
    descKey: "why.p2.desc"  as keyof Translations,
    num:     "02",
    iconBg:  "linear-gradient(135deg, #a855f7 0%, #c084fc 100%)",
    glowColor: "rgba(168,85,247,0.30)",
    borderGradient:
      "linear-gradient(135deg, #5843d1 0%, #a855f7 55%, #06b6d4 100%)",
    featured: true,
  },
  {
    icon:    "hub",
    tagKey:  "why.p3.tag"   as keyof Translations,
    titleKey:"why.p3.title" as keyof Translations,
    descKey: "why.p3.desc"  as keyof Translations,
    num:     "03",
    iconBg:  "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)",
    glowColor: "rgba(6,182,212,0.30)",
    borderGradient:
      "linear-gradient(135deg, rgba(6,182,212,0.30) 0%, rgba(34,211,238,0.35) 50%, rgba(168,85,247,0.20) 100%)",
  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────
export function WhySpowNext() {
  const { t } = useTranslation();
  const ref   = useScrollAnimation<HTMLDivElement>({ delay: 120 });

  return (
    <section
      id="why"
      className="relative py-28 px-6 md:px-8 overflow-hidden"
      ref={ref}
    >
      {/* Section background — subtle radial glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(88,67,209,0.08) 0%, transparent 70%), var(--color-background)",
        }}
      />

      {/* Decorative blurred blobs */}
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, #5843d1, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 top-1/3 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16 space-y-4 reveal">
          <span className="inline-flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase font-label">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lightbulb
            </span>
            {t("why.label")}
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-surface"
            style={{ hyphens: "auto" }}
          >
            {t("why.title")}
          </h2>
          <p
            className="text-on-surface-variant max-w-xl mx-auto text-lg leading-relaxed"
            style={{ hyphens: "auto" }}
          >
            {t("why.subtitle")}
          </p>
        </div>

        {/* ── Pillar Cards ── */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              className="reveal"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {"featured" in p && p.featured
                ? <FeaturedCard pillar={p} />
                : <StandardCard pillar={p} />}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Featured (center) card ────────────────────────────────────────────────────
function FeaturedCard({ pillar }: { pillar: (typeof PILLARS)[number] }) {
  const { t } = useTranslation();
  return (
    <div className="relative rounded-3xl p-px h-full">
      {/* gradient border */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{ background: pillar.borderGradient, opacity: 0.9 }}
      />
      {/* inner */}
      <div
        className="relative rounded-[22px] h-full flex flex-col p-8 overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #2a1f6e 0%, #1e1650 50%, #1a1440 100%)",
        }}
      >
        {/* glow blob */}
        <div
          className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: `radial-gradient(circle,${pillar.glowColor},transparent 70%)` }}
        />

        {/* Number watermark */}
        <span
          className="absolute top-5 right-6 text-7xl font-extrabold font-headline select-none pointer-events-none"
          style={{ color: "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        >
          {pillar.num}
        </span>

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 shadow-lg"
          style={{ background: pillar.iconBg }}
        >
          <span
            className="material-symbols-outlined text-white text-[26px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {pillar.icon}
          </span>
        </div>

        {/* Tag */}
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-3 font-label">
          {t(pillar.tagKey)}
        </span>

        {/* Title */}
        <h3
          className="text-xl font-extrabold font-headline text-white mb-3 leading-snug"
          style={{ hyphens: "auto" }}
        >
          {t(pillar.titleKey)}
        </h3>

        {/* Divider */}
        <div
          className="h-px mb-4 w-12"
          style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.8), transparent)" }}
        />

        {/* Description */}
        <p className="text-sm text-white/65 leading-relaxed flex-1" style={{ hyphens: "auto" }}>
          {t(pillar.descKey)}
        </p>
      </div>
    </div>
  );
}

// ── Standard card ─────────────────────────────────────────────────────────────
function StandardCard({ pillar }: { pillar: (typeof PILLARS)[number] }) {
  const { t } = useTranslation();
  return (
    <div
      className="relative h-full flex flex-col rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group"
      style={{
        border: "1px solid transparent",
        background:
          `linear-gradient(var(--color-surface-container-lowest), var(--color-surface-container-lowest)) padding-box, ` +
          `${pillar.borderGradient} border-box`,
      }}
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${pillar.glowColor.replace("0.30", "0.07")} 0%, transparent 70%)`,
        }}
      />

      {/* Number watermark */}
      <span
        className="absolute top-5 right-6 text-7xl font-extrabold font-headline select-none pointer-events-none text-on-surface/[0.04]"
        aria-hidden="true"
      >
        {pillar.num}
      </span>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 shadow-md"
        style={{ background: pillar.iconBg }}
      >
        <span
          className="material-symbols-outlined text-white text-[26px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {pillar.icon}
        </span>
      </div>

      {/* Tag */}
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-3 font-label">
        {t(pillar.tagKey)}
      </span>

      {/* Title */}
      <h3
        className="text-xl font-extrabold font-headline text-on-surface mb-3 leading-snug"
        style={{ hyphens: "auto" }}
      >
        {t(pillar.titleKey)}
      </h3>

      {/* Divider */}
      <div
        className="h-px mb-4 w-12"
        style={{
          background: `linear-gradient(90deg, ${pillar.glowColor}, transparent)`,
        }}
      />

      {/* Description */}
      <p className="text-sm text-on-surface-variant leading-relaxed flex-1" style={{ hyphens: "auto" }}>
        {t(pillar.descKey)}
      </p>
    </div>
  );
}
