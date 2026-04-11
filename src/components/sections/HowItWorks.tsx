"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation }     from "@/lib/i18n";
import { Badge }              from "@/components/ui/Badge";

const STEPS = [
  {
    number: "01",
    titleKey: "how.step1.title",
    descKey:  "how.step1.desc",
    icon: "edit_note",
    color: "#5843d1",
  },
  {
    number: "02",
    titleKey: "how.step2.title",
    descKey:  "how.step2.desc",
    icon: "group",
    color: "#ffab69",
  },
  {
    number: "03",
    titleKey: "how.step3.title",
    descKey:  "how.step3.desc",
    icon: "rocket_launch",
    color: "#715eeb",
  },
] as const;

export function HowItWorks() {
  const { t }  = useTranslation();
  const ref    = useScrollAnimation<HTMLDivElement>({ delay: 120 });

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 md:px-8 max-w-7xl mx-auto"
      ref={ref}
    >
      {/* Header */}
      <div className="text-center mb-20 space-y-4 reveal">
        <Badge variant="primary">{t("how.label")}</Badge>
        <h2
          className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-surface"
          style={{ hyphens: "auto" }}
        >
          {t("how.title")}
        </h2>
        <p className="text-on-surface-variant max-w-xl mx-auto" style={{ hyphens: "auto" }}>
          {t("how.subtitle")}
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid md:grid-cols-3 gap-12 relative">
        {/* Connector line — desktop only */}
        <div
          className="absolute top-10 left-[16.6%] right-[16.6%] h-px hidden md:block"
          style={{ background: "linear-gradient(to right, transparent, rgba(88,67,209,0.2), transparent)" }}
          aria-hidden="true"
        />

        {STEPS.map((step) => (
          <StepCard
            key={step.number}
            step={step}
            title={t(step.titleKey)}
            desc={t(step.descKey)}
          />
        ))}
      </div>
    </section>
  );
}

function StepCard({
  step,
  title,
  desc,
}: {
  step: (typeof STEPS)[number];
  title: string;
  desc: string;
}) {
  return (
    <div className="group text-center space-y-6 reveal">
      {/* Icon box */}
      <div className="relative mx-auto w-20 h-20">
        <div
          className={[
            "w-20 h-20 mx-auto",
            "bg-surface-container-lowest rounded-2xl",
            "flex items-center justify-center",
            "shadow-card",
            "group-hover:-translate-y-3 group-hover:shadow-elevated",
            "transition-all duration-300 ease-spring",
          ].join(" ")}
        >
          <span
            className="material-symbols-outlined text-[2rem]"
            style={{
              color: step.color,
              fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 40",
            }}
          >
            {step.icon}
          </span>
        </div>

        {/* Step number badge */}
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white font-label shadow-sm"
          style={{ backgroundColor: step.color }}
        >
          {step.number}
        </div>
      </div>

      {/* Text */}
      <div>
        <h3
          className="text-xl font-bold font-headline mb-2 text-on-surface"
          style={{ hyphens: "auto" }}
        >
          {title}
        </h3>
        <p
          className="text-on-surface-variant text-sm px-4 leading-relaxed"
          style={{ hyphens: "auto" }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
