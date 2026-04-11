import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Material Design 3 tokens from maquette
        "surface":                  "var(--color-surface)",
        "background":               "var(--color-background)",
        "on-surface":               "var(--color-on-surface)",
        "on-surface-variant":       "var(--color-on-surface-variant)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "surface-container-low":    "var(--color-surface-container-low)",
        "surface-container":        "var(--color-surface-container)",
        "surface-container-high":   "var(--color-surface-container-high)",
        "surface-container-highest":"var(--color-surface-container-highest)",
        "primary":                  "var(--color-primary)",
        "primary-container":        "var(--color-primary-container)",
        "on-primary":               "var(--color-on-primary)",
        "primary-fixed":            "var(--color-primary-fixed)",
        "primary-fixed-dim":        "var(--color-primary-fixed-dim)",
        "secondary":                "var(--color-secondary)",
        "secondary-container":      "var(--color-secondary-container)",
        "on-secondary":             "var(--color-on-secondary)",
        "tertiary":                 "var(--color-tertiary)",
        "tertiary-fixed-dim":       "var(--color-tertiary-fixed-dim)",
        "outline":                  "var(--color-outline)",
        "outline-variant":          "var(--color-outline-variant)",
        "error":                    "var(--color-error)",
        "error-container":          "var(--color-error-container)",
        // Aliases for convenience
        "text-primary":             "var(--color-text-primary)",
        "text-secondary":           "var(--color-text-secondary)",
        "text-muted":               "var(--color-text-muted)",
        "accent":                   "var(--color-primary)",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "sans-serif"],
        body:     ["var(--font-body)", "sans-serif"],
        label:    ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "var(--radius-md)",
        sm:      "var(--radius-sm)",
        md:      "var(--radius-md)",
        lg:      "var(--radius-lg)",
        xl:      "var(--radius-xl)",
        "2xl":   "1.5rem",
        "3xl":   "2rem",
        full:    "var(--radius-pill)",
      },
      boxShadow: {
        card:     "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        hover:    "var(--shadow-hover)",
      },
      animation: {
        float:    "float 6s ease-in-out infinite",
        marquee:  "marquee 30s linear infinite",
        "fade-up":"fade-up 0.6s ease-out both",
        pulse:    "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
