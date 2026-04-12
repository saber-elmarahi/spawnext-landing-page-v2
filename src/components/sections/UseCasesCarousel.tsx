"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation }     from "@/lib/i18n";
import { USE_CASES }          from "@/lib/constants";
import type { Translations }  from "@/lib/i18n";

// ── One gradient theme per card (cycles over 6 cards × 2 rows) ───────────
// bg = CSS gradient string for the card background
// iconBg = icon container fill
// border = ring color
const CARD_THEMES = [
  {
    bg:       "linear-gradient(135deg, rgba(88,67,209,0.13) 0%, rgba(113,94,235,0.06) 100%)",
    iconBg:   "rgba(88,67,209,0.12)",
    border:   "rgba(88,67,209,0.18)",
  },
  {
    bg:       "linear-gradient(135deg, rgba(255,140,60,0.14) 0%, rgba(255,200,150,0.07) 100%)",
    iconBg:   "rgba(255,140,60,0.13)",
    border:   "rgba(255,140,60,0.22)",
  },
  {
    bg:       "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(14,165,233,0.05) 100%)",
    iconBg:   "rgba(6,182,212,0.12)",
    border:   "rgba(6,182,212,0.20)",
  },
  {
    bg:       "linear-gradient(135deg, rgba(244,63,94,0.11) 0%, rgba(251,113,133,0.05) 100%)",
    iconBg:   "rgba(244,63,94,0.11)",
    border:   "rgba(244,63,94,0.18)",
  },
  {
    bg:       "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(74,222,128,0.05) 100%)",
    iconBg:   "rgba(34,197,94,0.12)",
    border:   "rgba(34,197,94,0.20)",
  },
  {
    bg:       "linear-gradient(135deg, rgba(168,85,247,0.13) 0%, rgba(192,132,252,0.06) 100%)",
    iconBg:   "rgba(168,85,247,0.12)",
    border:   "rgba(168,85,247,0.20)",
  },
];

// Double the array for a seamless infinite loop
const LOOPED = [...USE_CASES, ...USE_CASES];

export function UseCasesCarousel() {
  const { t }    = useTranslation();
  const titleRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="use-cases" className="py-24 overflow-hidden">
      {/* ── Header ── */}
      <div ref={titleRef} className="max-w-7xl mx-auto px-6 md:px-8 mb-14">
        <div className="reveal">
          <span className="text-primary font-bold tracking-widest text-xs uppercase font-label mb-3 block">
            Use Cases
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface"
            style={{ hyphens: "auto" }}
          >
            {t("usecases.title")}
          </h2>
        </div>
      </div>

      {/* ── Looping track ──────────────────────────────────────────────
          Two identical rows scrolling in opposite directions.
          Each row contains 6 cards × 2 (duplicated) = 12 cards.
          The inner strip is 200% wide; we animate translateX(0 → -50%).
      ──────────────────────────────────────────────────────────────── */}

      {/* Row 1 — left to right (reverse) */}
      <LoopRow cases={LOOPED} direction="reverse" rowOffset={0} t={t} />

      {/* Row 2 — right to left (normal), offset by 3 for variety */}
      <LoopRow cases={LOOPED} direction="normal" rowOffset={3} t={t} />
    </section>
  );
}

// ── Loop row ──────────────────────────────────────────────────────────────
function LoopRow({
  cases,
  direction,
  rowOffset,
  t,
}: {
  cases: typeof LOOPED;
  direction: "normal" | "reverse";
  rowOffset: number;
  t: (k: keyof Translations) => string;
}) {
  return (
    <div
      className="relative mt-5 group/row"
      // Pause animation when mouse enters the row
    >
      {/* Fade masks on the edges */}
      <div
        className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }}
      />

      <div
        className={[
          "flex gap-5 w-max",
          direction === "reverse"
            ? "animate-marquee-reverse group-hover/row:[animation-play-state:paused]"
            : "animate-marquee-fwd   group-hover/row:[animation-play-state:paused]",
        ].join(" ")}
      >
        {cases.map((uc, i) => {
          const themeIndex = ((i + rowOffset) % CARD_THEMES.length);
          const theme = CARD_THEMES[themeIndex];
          return (
            <UseCaseCard
              key={`${uc.id}-${i}`}
              icon={uc.icon}
              iconColorClass={uc.iconColorClass}
              title={t(uc.titleKey as keyof Translations)}
              desc={t(uc.descKey as keyof Translations)}
              theme={theme}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────
function UseCaseCard({
  icon,
  iconColorClass,
  title,
  desc,
  theme,
}: {
  icon: string;
  iconColorClass: string;
  title: string;
  desc: string;
  theme: (typeof CARD_THEMES)[number];
}) {
  return (
    <div
      className={[
        // Fixed dimensions for visual consistency
        "w-[320px] shrink-0",
        "flex flex-col",
        "rounded-2xl p-7",
        "border",
        "hover:scale-[1.03] hover:-translate-y-1",
        "transition-all duration-300 ease-spring",
        "cursor-default",
        "shadow-card hover:shadow-elevated",
      ].join(" ")}
      style={{
        background: theme.bg,
        borderColor: theme.border,
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
        style={{ background: theme.iconBg }}
      >
        <span
          className={["material-symbols-outlined text-xl", iconColorClass].join(" ")}
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
        >
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-base font-bold font-headline text-on-surface mb-2 leading-snug"
        style={{ hyphens: "auto" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-sm text-on-surface-variant leading-relaxed flex-1"
        style={{ hyphens: "auto" }}
      >
        {desc}
      </p>
    </div>
  );
}
