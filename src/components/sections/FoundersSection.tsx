"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation }     from "@/lib/i18n";

const FOUNDERS = [
  {
    name:  "Julien",
    role:  "founders.julien.role",
    quote: "founders.julien.quote",
    side:  "left",
  },
  {
    name:  "Saber",
    role:  "founders.saber.role",
    quote: "founders.saber.quote",
    side:  "center",
    featured: true,
  },
  {
    name:  "Abdel",
    role:  "founders.abdel.role",
    quote: "founders.abdel.quote",
    side:  "right",
  },
] as const;

export function FoundersSection() {
  const { t } = useTranslation();
  const ref   = useScrollAnimation<HTMLDivElement>({ delay: 100 });

  return (
    <section
      id="founders"
      className="relative py-28 px-6 md:px-8 overflow-hidden"
      ref={ref}
    >
      {/* Dark section background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(88,67,209,0.10) 0%, transparent 70%), var(--color-background)",
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute -left-40 top-1/3 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, #5843d1, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 bottom-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14 space-y-4 reveal">
          <span className="inline-flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase font-label">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              groups
            </span>
            {t("founders.label")}
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-surface"
            style={{ hyphens: "auto" }}
          >
            {t("founders.title")}
          </h2>
          <p
            className="text-on-surface-variant max-w-lg mx-auto text-lg leading-relaxed"
            style={{ hyphens: "auto" }}
          >
            {t("founders.subtitle")}
          </p>
        </div>

        {/* ── Photo card ── */}
        <div className="reveal mb-12">
          <div
            className="relative rounded-3xl p-px mx-auto max-w-2xl"
          >
            {/* gradient border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #5843d1 0%, #a855f7 50%, #06b6d4 100%)",
                opacity: 0.85,
              }}
            />
            {/* image wrapper */}
            <div className="relative rounded-[22px] overflow-hidden">
              {/* top glow */}
              <div
                className="absolute inset-x-0 top-0 h-24 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(88,67,209,0.35) 0%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              {/* bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, var(--color-background) 0%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              {/* the photo */}
              <img
                src="/assets/background-2.png"
                alt="SpowNext founders — Julien, Saber and Abdel"
                className="w-full object-cover"
                style={{ imageRendering: "pixelated", aspectRatio: "16/9" }}
              />
            </div>
          </div>
        </div>

        {/* ── Founder cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {FOUNDERS.map((f, i) => (
            <div
              key={f.name}
              className="reveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {"featured" in f && f.featured ? (
                // ── Featured center card ──
                <div className="relative rounded-3xl p-px h-full">
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: "linear-gradient(135deg, #5843d1 0%, #a855f7 55%, #06b6d4 100%)",
                      opacity: 0.9,
                    }}
                  />
                  <div
                    className="relative rounded-[22px] h-full flex flex-col items-center text-center p-8 overflow-hidden"
                    style={{
                      background: "linear-gradient(145deg, #2a1f6e 0%, #1e1650 55%, #1a1440 100%)",
                    }}
                  >
                    {/* glow */}
                    <div
                      className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-25 pointer-events-none"
                      style={{ background: "radial-gradient(circle, rgba(168,85,247,0.6), transparent 70%)" }}
                    />

                    {/* Avatar initials */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-extrabold text-xl font-headline mb-4 shadow-lg shrink-0"
                      style={{ background: "linear-gradient(135deg, #5843d1 0%, #a855f7 100%)" }}
                    >
                      {f.name[0]}
                    </div>

                    {/* CEO badge */}
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/15 text-white border border-white/20 mb-3">
                      <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      {t(f.role as Parameters<typeof t>[0])}
                    </span>

                    <h3 className="text-2xl font-extrabold font-headline text-white mb-1">{f.name}</h3>

                    <div
                      className="h-px w-10 my-3"
                      style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.8), transparent)" }}
                    />

                    <p className="text-sm text-white/65 leading-relaxed italic" style={{ hyphens: "auto" }}>
                      "{t(f.quote as Parameters<typeof t>[0])}"
                    </p>
                  </div>
                </div>
              ) : (
                // ── Standard side card ──
                <div
                  className="relative h-full flex flex-col items-center text-center rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    border: "1px solid transparent",
                    background:
                      "linear-gradient(var(--color-surface-container-lowest), var(--color-surface-container-lowest)) padding-box, " +
                      "linear-gradient(135deg, rgba(88,67,209,0.30) 0%, rgba(168,85,247,0.35) 50%, rgba(6,182,212,0.20) 100%) border-box",
                  }}
                >
                  {/* hover glow */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(88,67,209,0.06) 0%, transparent 70%)",
                    }}
                  />

                  {/* Avatar initials */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-extrabold text-xl font-headline mb-4 shadow-md shrink-0"
                    style={{ background: "linear-gradient(135deg, #5843d1 0%, #715eeb 100%)" }}
                  >
                    {f.name[0]}
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2 font-label">
                    {t(f.role as Parameters<typeof t>[0])}
                  </span>

                  <h3 className="text-2xl font-extrabold font-headline text-on-surface mb-1">{f.name}</h3>

                  <div
                    className="h-px w-10 my-3"
                    style={{ background: "linear-gradient(90deg, rgba(88,67,209,0.6), transparent)" }}
                  />

                  <p className="text-sm text-on-surface-variant leading-relaxed italic" style={{ hyphens: "auto" }}>
                    "{t(f.quote as Parameters<typeof t>[0])}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
