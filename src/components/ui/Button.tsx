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
  // Gradient fill — most important CTA
  primary:
    "btn-primary-gradient text-white font-bold " +
    "shadow-[0_8px_32px_rgba(88,67,209,0.30),0_2px_8px_rgba(0,0,0,0.12)] " +
    "hover:scale-[1.04] hover:-translate-y-[3px] " +
    "hover:shadow-[0_14px_44px_rgba(88,67,209,0.42),0_4px_12px_rgba(0,0,0,0.15)] " +
    "active:scale-[0.97] active:translate-y-0",
  // Glass pill — secondary CTA
  secondary:
    "btn-secondary-glass font-semibold " +
    "hover:scale-[1.03] hover:-translate-y-[2px] " +
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
