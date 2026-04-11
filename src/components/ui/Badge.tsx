import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "beta" | "new" | "live";
  pulse?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-primary/10 border-primary/20 text-primary",
  beta:    "bg-primary/10 border-primary/20 text-primary",
  new:     "bg-secondary-container/30 border-secondary-container/40 text-secondary",
  live:    "bg-green-50 border-green-200 text-green-700",
};

export function Badge({ children, variant = "primary", pulse = false, className = "" }: BadgeProps) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2",
        "border rounded-full",
        "px-4 py-1.5",
        "text-xs font-bold tracking-widest uppercase font-label",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {pulse && (
        <span
          className={[
            "w-2 h-2 rounded-full",
            variant === "live" ? "bg-green-500" : "bg-primary",
            "animate-pulse",
          ].join(" ")}
        />
      )}
      {children}
    </div>
  );
}
