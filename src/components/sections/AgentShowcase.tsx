"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation }     from "@/lib/i18n";
import { AgentCard }          from "@/components/ui/AgentCard";
import { AGENTS }             from "@/lib/constants";

export function AgentShowcase() {
  const { t } = useTranslation();
  const ref   = useScrollAnimation<HTMLDivElement>({ delay: 80 });

  return (
    <section
      className="py-24 bg-surface px-6 md:px-8"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 reveal">
          <h2
            className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface"
            style={{ hyphens: "auto" }}
          >
            {t("agents.title")}
          </h2>
          <p className="text-on-surface-variant" style={{ hyphens: "auto" }}>
            {t("agents.subtitle")}
          </p>
        </div>

        {/* Agent grid — 4 cols on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {AGENTS.map((agent) => (
            <div key={agent.id} className="reveal">
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>

        {/* "See all" subtle link */}
        <div className="text-center mt-12 reveal">
          <button
            className={[
              "inline-flex items-center gap-1.5",
              "text-sm text-on-surface-variant hover:text-primary",
              "transition-colors duration-200",
              "font-medium",
            ].join(" ")}
          >
            <span className="material-symbols-outlined text-base">person_search</span>
            Browse all agents
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
