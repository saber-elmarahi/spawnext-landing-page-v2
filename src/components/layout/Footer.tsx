"use client";

import { useTranslation, type Lang } from "@/lib/i18n";

export function Footer() {
  const { t, lang, setLang } = useTranslation();

  const productLinks = [
    { label: t("footer.p1"), href: "#" },
    { label: t("footer.p2"), href: "#" },
    { label: t("footer.p3"), href: "#" },
    { label: t("footer.p4"), href: "#" },
  ];
  const companyLinks = [
    { label: t("footer.c1"), href: "#" },
    { label: t("footer.c2"), href: "#" },
    { label: t("footer.c3"), href: "#" },
    { label: t("footer.c4"), href: "#" },
  ];
  const legalLinks = [
    { label: t("footer.l1"), href: "#" },
    { label: t("footer.l2"), href: "#" },
  ];

  return (
    <footer className="bg-surface-container-low w-full py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand col */}
        <div className="space-y-6">
          <div className="text-xl font-extrabold text-text-primary font-headline">SpowNext</div>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs" style={{ hyphens: "auto" }}>
            {t("footer.tagline")}
          </p>
          {/* Lang toggle */}
          <div className="flex items-center gap-3">
            {(["fr", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={[
                  "w-9 h-9 rounded-full border text-[11px] font-bold font-label transition-all",
                  lang === l
                    ? "border-primary bg-primary text-on-primary"
                    : "border-outline-variant text-on-surface-variant hover:bg-surface-container",
                ].join(" ")}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Product */}
        <FooterCol title={t("footer.product")} links={productLinks} />

        {/* Company */}
        <FooterCol title={t("footer.company")} links={companyLinks} />

        {/* Legal + Easter egg */}
        <div className="space-y-6">
          <FooterCol title={t("footer.legal")} links={legalLinks} />
          <EasterEgg label={t("footer.easter")} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-on-surface-variant">{t("footer.copy")}</p>
        <div className="flex items-center gap-5">
          <SocialIcon icon="public"          href="#" />
          <SocialIcon icon="alternate_email" href="#" />
          <SocialIcon icon="smart_display"   href="#" />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="space-y-4">
      <h6 className="font-bold font-headline text-xs uppercase tracking-widest text-text-primary">
        {title}
      </h6>
      <ul className="space-y-2.5 text-sm text-on-surface-variant">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="hover:text-primary transition-colors duration-200">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EasterEgg({ label }: { label: string }) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2",
        "bg-surface-container-high px-4 py-2 rounded-xl",
        "border border-outline-variant/15",
        "hover:scale-105 transition-transform cursor-pointer",
        "shadow-card",
      ].join(" ")}
      title="Find me…"
    >
      {/* Mini pixel person SVG */}
      <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx={8} cy={4} r={3} fill="#5843d1" opacity={0.8} />
        <rect x={5} y={8} width={6} height={5} rx={2} fill="#5843d1" opacity={0.8} />
        <rect x={3} y={9} width={3} height={1.5} rx={0.75} fill="#5843d1" opacity={0.6} />
        <rect x={10} y={9} width={3} height={1.5} rx={0.75} fill="#5843d1" opacity={0.6} />
      </svg>
      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter font-label">
        {label}
      </span>
    </div>
  );
}

function SocialIcon({ icon, href }: { icon: string; href: string }) {
  return (
    <a
      href={href}
      className="text-on-surface-variant hover:text-primary transition-colors duration-200"
      aria-label={icon}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </a>
  );
}
