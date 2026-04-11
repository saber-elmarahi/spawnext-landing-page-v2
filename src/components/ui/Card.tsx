import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  tilt?: boolean;
  elevated?: boolean;
  className?: string;
}

export function Card({ children, tilt = false, elevated = false, className = "" }: CardProps) {
  return (
    <div
      className={[
        "bg-surface-container-lowest rounded-2xl p-8",
        elevated
          ? "shadow-elevated border border-outline-variant/[0.08]"
          : "shadow-card border border-outline-variant/[0.06]",
        tilt ? "hover-tilt cursor-default" : "transition-shadow duration-300 hover:shadow-elevated",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
