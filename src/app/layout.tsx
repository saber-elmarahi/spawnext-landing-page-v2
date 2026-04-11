import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title:       "SpowNext | Build your dream team. No code. No complexity.",
  description: "Empower your vision with autonomous AI agents. Configure, deploy and scale your virtual workforce in minutes.",
  keywords:    ["AI agents", "autonomous", "no-code", "SaaS", "workflow automation", "SpowNext"],
  authors:     [{ name: "SpowNext" }],
  openGraph: {
    title:       "SpowNext — Build your dream team.",
    description: "No code. No complexity. Deploy autonomous AI agents that work together.",
    siteName:    "SpowNext",
    type:        "website",
    locale:      "en_US",
  },
  twitter: {
    card:    "summary_large_image",
    title:   "SpowNext",
    description: "Build your autonomous dream team.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   "#5843d1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Material Symbols — outline style, only used glyphs (dynamic subset) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
