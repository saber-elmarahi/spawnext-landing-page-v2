"use client";

interface SectionHeaderProps {
  icon:       string;           // Material Symbols name
  label:      string;           // small uppercase tag line
  title:      string;           // main h2
  subtitle?:  string;           // optional description paragraph
  className?: string;
}

export function SectionHeader({
  icon,
  label,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {

  return (
    <div
      className={[
        "space-y-4 text-center",
        className,
      ].join(" ")}
    >
      {/* ── Label + icon ── */}
      <span
        className="inline-flex items-center justify-center gap-2 text-primary font-bold tracking-widest text-xs uppercase font-label"
      >
        <span
          className="material-symbols-outlined text-[14px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
        {label}
      </span>

      {/* ── Title ── */}
      <h2
        className="text-6xl md:text-7xl font-extrabold font-headline tracking-tight text-on-surface leading-[1.06]"
        style={{ hyphens: "auto" }}
      >
        {title}
      </h2>

      {/* ── Subtitle ── */}
      {subtitle && (
        <p
          className="text-on-surface-variant text-lg leading-relaxed max-w-xl mx-auto"
          style={{ hyphens: "auto" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
