"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function Navbar() {
  const { t, lang, setLang } = useTranslation();
  const { theme, toggle: toggleTheme } = useTheme();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeHref, setActive]   = useState("");

  // Scroll shadow
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    function onResize() { if (window.innerWidth >= 768) setMenuOpen(false); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = ["how-it-works", "features", "use-cases", "pricing"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { threshold: 0.4 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const navLinks = [
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.features"),   href: "#features"    },
    { label: t("nav.useCases"),   href: "#use-cases"   },
    { label: t("nav.pricing"),    href: "#pricing"      },
  ];

  return (
    <>
      <nav
        className={[
          "fixed top-0 w-full z-50 h-[72px]",
          "bg-surface-container-lowest glass-nav",
          "nav-border-bottom",
          "transition-all duration-300",
          scrolled
            ? "shadow-[0_2px_24px_rgba(88,67,209,0.10)]"
            : "shadow-none",
        ].join(" ")}
      >
        <div className="grid grid-cols-3 items-center px-6 md:px-10 w-full h-full">

          {/* ── LEFT — Logo ── */}
          <a
            href="#"
            className="flex items-center gap-2 group w-fit"
            aria-label="SpowNext home"
          >
            {/* Icon mark */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg,#5843d1 0%,#a855f7 100%)" }}
            >
              <span className="material-symbols-outlined text-white text-[17px]"
                style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            </div>
            <span className="text-xl font-extrabold tracking-tight font-headline text-on-surface group-hover:text-primary transition-colors duration-200">
              SpowNext
            </span>
          </a>

          {/* ── CENTER — Desktop nav links ── */}
          <div className="hidden md:flex items-center justify-center">
            <div
              className="flex items-center gap-1 px-2 py-1.5 rounded-2xl nav-pill-gradient"
              role="navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={[
                      "relative px-4 py-1.5 rounded-xl text-sm font-medium font-headline",
                      "transition-all duration-200",
                      isActive
                        ? "text-primary bg-primary/8"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
                    ].join(" ")}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-xl opacity-10"
                        style={{ background: "linear-gradient(135deg,#5843d1,#a855f7)" }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT — Controls + CTA ── */}
          <div className="flex items-center justify-end gap-3">
            {/* Language toggle */}
            <LangToggle lang={lang} setLang={setLang} />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className={[
                "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                "border border-outline-variant/20",
                "bg-surface-container-low hover:bg-surface-container",
                "text-on-surface-variant hover:text-primary",
                "transition-all duration-200",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* ── Gradient CTA button ── */}
            <a
              href="#pricing"
              className="hidden md:inline-flex items-center gap-2 nav-cta-gradient"
            >
              <span className="material-symbols-outlined text-[16px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
              <span>{t("nav.cta")}</span>
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="material-symbols-outlined text-on-surface">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={[
          "fixed top-[72px] left-0 w-full z-40",
          "bg-surface-container-lowest/95 glass-nav border-b border-outline-variant/10",
          "transition-all duration-300 overflow-hidden",
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-4 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all font-medium text-base"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 pb-2">
            <a
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 nav-cta-gradient w-full"
            >
              <span className="material-symbols-outlined text-[16px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
              <span>{t("nav.cta")}</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

// ── Language dropdown ──────────────────────────────────────
const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className={[
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl",
          "text-sm font-medium font-label",
          "border border-transparent",
          "text-on-surface-variant hover:text-on-surface",
          "hover:bg-surface-container",
          "transition-all duration-200",
          open ? "bg-surface-container text-on-surface" : "",
        ].join(" ")}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <span
          className="material-symbols-outlined text-[14px] transition-transform duration-200"
          style={{ fontVariationSettings: "'FILL' 0", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label="Language"
        className={[
          "absolute right-0 top-[calc(100%+6px)] w-40 z-50",
          "rounded-2xl overflow-hidden",
          "bg-surface-container-lowest",
          "nav-pill-gradient",
          "shadow-elevated",
          "transition-all duration-200 origin-top-right",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none",
        ].join(" ")}
      >
        {LANGS.map((l) => {
          const isSelected = l.code === lang;
          return (
            <button
              key={l.code}
              role="option"
              aria-selected={isSelected}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={[
                "w-full flex items-center gap-3 px-4 py-2.5",
                "text-sm font-medium font-label text-left",
                "transition-colors duration-150",
                isSelected
                  ? "text-primary bg-primary/8"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
              ].join(" ")}
            >
              <span className="text-base">{l.flag}</span>
              <span className="flex-1">{l.label}</span>
              {isSelected && (
                <span className="material-symbols-outlined text-[14px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
