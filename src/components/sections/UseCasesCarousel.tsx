"use client";

import { useRef }             from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation }     from "@/lib/i18n";
import { USE_CASES }          from "@/lib/constants";
import type { Translations }  from "@/lib/i18n";

export function UseCasesCarousel() {
  const { t }    = useTranslation();
  const titleRef = useScrollAnimation<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === "right" ? 440 : -440, behavior: "smooth" });
  }

  return (
    <section id="use-cases" className="py-24 px-6 md:px-8 overflow-hidden">
      {/* Header */}
      <div ref={titleRef} className="max-w-7xl mx-auto mb-12">
        <div className="flex items-end justify-between gap-6 reveal">
          <h2
            className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface"
            style={{ hyphens: "auto" }}
          >
            {t("usecases.title")}
          </h2>

          {/* Arrow controls */}
          <div className="flex items-center gap-3 shrink-0">
            {(["left", "right"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className={[
                  "w-11 h-11 rounded-full border border-outline-variant/20",
                  "flex items-center justify-center",
                  "bg-surface-container-lowest",
                  "hover:bg-primary hover:text-white hover:border-transparent",
                  "transition-all duration-200 shadow-card",
                ].join(" ")}
                aria-label={`Scroll ${dir}`}
              >
                <span className="material-symbols-outlined text-xl">
                  {dir === "left" ? "arrow_back" : "arrow_forward"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Perspective carousel track */}
      <div
        ref={trackRef}
        className="flex flex-nowrap gap-6 pb-6 overflow-x-auto no-scrollbar px-6 md:px-8 perspective-1000"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {USE_CASES.map((uc, i) => (
          <UseCaseCard
            key={uc.id}
            icon={uc.icon}
            accentClass={uc.accentClass}
            iconColorClass={uc.iconColorClass}
            title={t(uc.titleKey as keyof Translations)}
            desc={t(uc.descKey as keyof Translations)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

function UseCaseCard({
  icon, accentClass, iconColorClass, title, desc, index,
}: {
  icon: string;
  accentClass: string;
  iconColorClass: string;
  title: string;
  desc: string;
  index: number;
}) {
  // Slight 3D Y-rotation for depth, resets on hover
  const isEven = index % 2 === 0;

  return (
    <div
      className={[
        "min-w-[300px] md:min-w-[380px]",
        "bg-surface-container-lowest rounded-3xl p-10",
        "shadow-elevated",
        "transition-all duration-500 ease-spring",
        "hover:scale-[1.03] hover:shadow-hover",
        "cursor-default shrink-0",
      ].join(" ")}
      style={{
        transform: `rotateY(${isEven ? "6deg" : "-6deg"})`,
        scrollSnapAlign: "start",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "rotateY(0deg) scale(1.03)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          `rotateY(${isEven ? "6deg" : "-6deg"})`;
      }}
    >
      <div className={["w-14 h-14 rounded-2xl flex items-center justify-center mb-8", accentClass].join(" ")}>
        <span
          className={["material-symbols-outlined text-2xl", iconColorClass].join(" ")}
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
        >
          {icon}
        </span>
      </div>
      <h3
        className="text-xl font-bold font-headline mb-4 text-on-surface"
        style={{ hyphens: "auto" }}
      >
        {title}
      </h3>
      <p
        className="text-on-surface-variant leading-relaxed text-sm"
        style={{ hyphens: "auto" }}
      >
        {desc}
      </p>
    </div>
  );
}
