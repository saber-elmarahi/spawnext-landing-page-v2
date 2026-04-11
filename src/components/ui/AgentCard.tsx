"use client";

import { PixelAvatar } from "./PixelAvatar";
import { useTranslation } from "@/lib/i18n";
import type { Agent } from "@/lib/constants";
import type { Translations } from "@/lib/i18n";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const { t } = useTranslation();
  const statusLabel = t(agent.statusKey as keyof Translations);

  return (
    <div
      className={[
        "group relative",
        "bg-surface-container-lowest p-6 rounded-2xl text-center",
        "border border-outline-variant/10",
        "hover:border-primary/40 hover:-translate-y-2",
        "transition-all duration-300",
        "shadow-card hover:shadow-elevated",
      ].join(" ")}
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="rounded-full overflow-hidden border-4 border-primary/20 ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all">
          <PixelAvatar
            name={agent.name}
            initials={agent.initials}
            color={agent.avatarColor}
            size={88}
          />
        </div>
      </div>

      {/* Name */}
      <h5 className="font-bold font-headline text-on-surface">{agent.name}</h5>

      {/* Role */}
      <p className="text-xs text-primary font-bold mb-3 font-label uppercase tracking-wider">
        {agent.role}
      </p>

      {/* Status */}
      <div className="flex items-center justify-center gap-1.5">
        <span className={["w-2 h-2 rounded-full", agent.statusColor].join(" ")} />
        <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter font-label">
          {statusLabel}
        </span>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
