"use client";

interface SectionHeaderProps {
  icon:       string;           // Material Symbols name
  label:      string;           // small uppercase tag line
  title:      string;           // main h2
  subtitle?:  string;           // optional description paragraph
  align?:     "center" | "left";
  className?: string;
}

export function SectionHeader({
  icon,
  label,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={[
        "space-y-4 reveal",
        isCenter ? "text-center" : "text-left",
        className,
      ].join(" ")}
    >
      {/* ── Label + icon ── */}
      <span
        className={[
          "inline-flex items-center gap-2",
          "text-primary font-bold tracking-widest text-xs uppercase font-label",
          isCenter ? "justify-center" : "",
        ].join(" ")}
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
        className="text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-on-surface leading-[1.08]"
        style={{ hyphens: "auto" }}
      >
        {title}
      </h2>

      {/* ── Subtitle ── */}
      {subtitle && (
        <p
          className={[
            "text-on-surface-variant text-lg leading-relaxed",
            isCenter ? "max-w-xl mx-auto" : "max-w-xl",
          ].join(" ")}
          style={{ hyphens: "auto" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
