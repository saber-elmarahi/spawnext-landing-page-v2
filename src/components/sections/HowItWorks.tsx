"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation }              from "@/lib/i18n";
import { Badge }                       from "@/components/ui/Badge";

// ── Step definitions ──────────────────────────────────────────────────────
const STEPS = [
  {
    number:   "01",
    titleKey: "how.step1.title" as const,
    descKey:  "how.step1.desc"  as const,
    icon:     "edit_note",
    color:    "#5843d1",
    bg:       "rgba(88,67,209,0.10)",
    ring:     "rgba(88,67,209,0.30)",
  },
  {
    number:   "02",
    titleKey: "how.step2.title" as const,
    descKey:  "how.step2.desc"  as const,
    icon:     "group",
    color:    "#f97316",
    bg:       "rgba(249,115,22,0.10)",
    ring:     "rgba(249,115,22,0.30)",
  },
  {
    number:   "03",
    titleKey: "how.step3.title" as const,
    descKey:  "how.step3.desc"  as const,
    icon:     "groups",
    color:    "#06b6d4",
    bg:       "rgba(6,182,212,0.10)",
    ring:     "rgba(6,182,212,0.30)",
  },
  {
    number:   "04",
    titleKey: "how.step4.title" as const,
    descKey:  "how.step4.desc"  as const,
    icon:     "deployed_code",
    color:    "#22c55e",
    bg:       "rgba(34,197,94,0.10)",
    ring:     "rgba(34,197,94,0.30)",
  },
] as const;

const STEP_DURATION = 2800; // ms each step stays "active"

export function HowItWorks() {
  const { t }           = useTranslation();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef          = useRef<HTMLElement>(null);

  // ── Auto-cycle through steps ──────────────────────────────────────────
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((s) => (s + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, [paused]);

  // ── Start cycling only once the section is in view ────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 px-6 md:px-8 bg-surface-container-low"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16 space-y-4">
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

        {/* ── Steps + connectors — desktop horizontal, mobile vertical ── */}
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex flex-col md:flex-row items-center flex-1 min-w-0">

              {/* ── Step card ── */}
              <button
                className="w-full text-left focus-visible:outline-none"
                onMouseEnter={() => { setActive(i); setPaused(true); }}
                onMouseLeave={() => setPaused(false)}
                aria-label={`Step ${step.number}`}
              >
                <StepCard
                  step={step}
                  title={t(step.titleKey)}
                  desc={t(step.descKey)}
                  state={i < active ? "done" : i === active ? "active" : "idle"}
                />
              </button>

              {/* ── Connector (between steps, not after last) ── */}
              {i < STEPS.length - 1 && (
                <Connector
                  filled={i < active}
                  animating={i === active}
                  duration={STEP_DURATION}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Progress dots indicator ── */}
        <div className="flex items-center justify-center gap-2 mt-12" aria-hidden="true">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={[
                "rounded-full transition-all duration-300",
                i === active
                  ? "w-6 h-2 bg-primary"
                  : i < active
                  ? "w-2 h-2 bg-primary/40"
                  : "w-2 h-2 bg-outline-variant",
              ].join(" ")}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Step card ─────────────────────────────────────────────────────────────
type StepState = "idle" | "active" | "done";

function StepCard({
  step,
  title,
  desc,
  state,
}: {
  step: (typeof STEPS)[number];
  title: string;
  desc: string;
  state: StepState;
}) {
  const isActive = state === "active";
  const isDone   = state === "done";

  return (
    <div
      className={[
        "relative flex flex-col items-center text-center p-6 rounded-2xl",
        "transition-all duration-500",
        isActive
          ? "bg-surface-container-lowest shadow-elevated scale-[1.04] -translate-y-1"
          : isDone
          ? "bg-surface-container-lowest/60"
          : "bg-transparent",
      ].join(" ")}
      style={{
        border: isActive
          ? `1.5px solid ${step.ring}`
          : isDone
          ? "1.5px solid rgba(88,67,209,0.12)"
          : "1.5px solid transparent",
      }}
    >
      {/* ── Icon container ── */}
      <div className="relative mb-5">
        {/* Pulse ring — only when active */}
        {isActive && (
          <span
            className="absolute inset-0 rounded-2xl animate-ping opacity-30"
            style={{ backgroundColor: step.color }}
          />
        )}

        <div
          className={[
            "w-16 h-16 rounded-2xl flex items-center justify-center",
            "transition-all duration-500",
          ].join(" ")}
          style={{
            backgroundColor: isActive || isDone ? step.bg : "var(--color-surface-container)",
            boxShadow: isActive ? `0 0 0 4px ${step.ring}` : "none",
          }}
        >
          <span
            className="material-symbols-outlined text-[1.75rem] transition-all duration-300"
            style={{
              color: isActive ? step.color : isDone ? step.color : "var(--color-on-surface-variant)",
              fontVariationSettings: isActive
                ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 40"
                : isDone
                ? "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 40"
                : "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 40",
            }}
          >
            {isDone ? "check_circle" : step.icon}
          </span>
        </div>

        {/* Step number badge */}
        <div
          className={[
            "absolute -top-2 -right-2 w-6 h-6 rounded-full",
            "flex items-center justify-center text-[10px] font-bold text-white font-label",
            "transition-all duration-500",
          ].join(" ")}
          style={{
            backgroundColor: isActive || isDone ? step.color : "var(--color-outline)",
            transform: isActive ? "scale(1.2)" : "scale(1)",
          }}
        >
          {step.number}
        </div>
      </div>

      {/* ── Title ── */}
      <h3
        className={[
          "text-base font-bold font-headline mb-1.5 transition-colors duration-300",
          isActive ? "text-on-surface" : isDone ? "text-on-surface" : "text-on-surface-variant",
        ].join(" ")}
        style={{ hyphens: "auto" }}
      >
        {title}
      </h3>

      {/* ── Description — visible only when active ── */}
      <div
        className={[
          "overflow-hidden transition-all duration-500",
          isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <p
          className="text-on-surface-variant text-xs leading-relaxed pt-1"
          style={{ hyphens: "auto" }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

// ── Connector between steps ───────────────────────────────────────────────
function Connector({
  filled,
  animating,
  duration,
}: {
  filled: boolean;
  animating: boolean;
  duration: number;
}) {
  return (
    <>
      {/* Desktop — horizontal bar */}
      <div
        className="hidden md:block relative h-0.5 flex-1 mx-2 overflow-hidden rounded-full bg-outline-variant/30 shrink-0"
        style={{ minWidth: 24 }}
        aria-hidden="true"
      >
        {/* Filled portion */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all"
          style={{
            width: filled ? "100%" : animating ? "100%" : "0%",
            transitionDuration: animating ? `${duration}ms` : "400ms",
            transitionTimingFunction: animating ? "linear" : "ease",
          }}
        />
        {/* Traveling dot */}
        {animating && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_2px_rgba(88,67,209,0.5)]"
            style={{
              left: "100%",
              animation: `connector-dot ${duration}ms linear forwards`,
            }}
          />
        )}
      </div>

      {/* Mobile — vertical bar */}
      <div
        className="md:hidden relative w-0.5 h-8 mx-auto my-1 overflow-hidden rounded-full bg-outline-variant/30"
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 top-0 rounded-full bg-primary transition-all"
          style={{
            height: filled ? "100%" : animating ? "100%" : "0%",
            transitionDuration: animating ? `${duration}ms` : "400ms",
            transitionTimingFunction: animating ? "linear" : "ease",
          }}
        />
      </div>
    </>
  );
}
