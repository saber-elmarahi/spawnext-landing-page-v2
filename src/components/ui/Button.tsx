"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary font-bold shadow-[0_8px_32px_rgba(88,67,209,0.25)] " +
    "hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(88,67,209,0.35)] " +
    "active:scale-[0.97] active:translate-y-0",
  secondary:
    "bg-surface-container-lowest text-on-surface font-semibold border border-outline-variant/20 " +
    "hover:bg-surface-container-low hover:border-primary/30 " +
    "active:scale-[0.97]",
  outline:
    "border border-primary text-primary font-bold bg-transparent " +
    "hover:bg-primary/5 hover:border-primary/60 " +
    "active:scale-[0.97]",
  ghost:
    "text-on-surface-variant font-medium bg-transparent " +
    "hover:text-primary hover:bg-primary/5 " +
    "active:scale-[0.97]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-full font-headline",
        "transition-all duration-200 ease-spring",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="material-symbols-outlined text-[1.1em] leading-none">{icon}</span>
      )}
      <span style={{ hyphens: "auto" }}>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="material-symbols-outlined text-[1.1em] leading-none">{icon}</span>
      )}
    </button>
  );
}
