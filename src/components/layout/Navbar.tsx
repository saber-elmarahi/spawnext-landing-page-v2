"use client";

import { useState, useEffect } from "react";
import { useTranslation, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function Navbar() {
  const { t, lang, setLang } = useTranslation();
  const { theme, toggle: toggleTheme } = useTheme();
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);

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
          "bg-surface-container-lowest",
          "border-b border-outline-variant/10",
          "transition-all duration-300",
          scrolled
            ? "shadow-[0_2px_16px_rgba(88,67,209,0.07)]"
            : "shadow-none",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 md:px-8 max-w-[1440px] mx-auto w-full h-full">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-extrabold tracking-tight font-headline text-text-primary hover:text-primary transition-colors"
            aria-label="SpowNext home"
          >
            SpowNext
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 font-headline font-medium text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-on-surface-variant hover:text-primary transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <LangToggle lang={lang} setLang={setLang} />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className={[
                "w-9 h-9 rounded-full flex items-center justify-center",
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

            {/* CTA */}
            <a
              href="#pricing"
              className={[
                "hidden md:inline-flex items-center gap-1.5",
                "bg-primary text-on-primary",
                "px-5 py-2.5 rounded-full",
                "font-headline font-bold text-sm",
                "shadow-[0_4px_20px_rgba(88,67,209,0.25)]",
                "hover:scale-[1.03] hover:-translate-y-0.5",
                "hover:shadow-[0_8px_28px_rgba(88,67,209,0.35)]",
                "transition-all duration-200",
              ].join(" ")}
            >
              {t("nav.cta")}
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

      {/* Mobile drawer */}
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
              className="flex items-center justify-center bg-primary text-on-primary px-6 py-3 rounded-full font-headline font-bold text-sm w-full shadow-[0_4px_20px_rgba(88,67,209,0.25)]"
            >
              {t("nav.cta")}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

// ── Language toggle ──────────────────────────────────────
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <button
      className="flex items-center gap-1 text-sm font-medium font-label"
      onClick={() => setLang(lang === "en" ? "fr" : "en")}
      aria-label="Switch language"
    >
      <span className={lang === "fr" ? "text-primary font-bold" : "text-on-surface-variant"}>FR</span>
      <span className="text-outline-variant mx-0.5">/</span>
      <span className={lang === "en" ? "text-primary font-bold" : "text-on-surface-variant"}>EN</span>
    </button>
  );
}
