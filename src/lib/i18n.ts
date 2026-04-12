"use client";

import { createContext, useContext, useState, useEffect, type ReactNode, createElement } from "react";

// ── Types ──────────────────────────────────────────────────
export type Lang = "en" | "fr";

export type Translations = typeof translations.en;

// ── Translations ───────────────────────────────────────────
export const translations = {
  en: {
    // Navbar
    "nav.howItWorks":  "How it works",
    "nav.features":    "Features",
    "nav.useCases":    "Use cases",
    "nav.pricing":     "Pricing",
    "nav.cta":         "Start for free",

    // Hero
    "hero.badge":       "Now in Public Beta",
    "hero.h1.line1":    "Spawn your agents team...",
    "hero.h1.line2":    "Build What's Next !",
    "hero.subtitle":    "Empower your vision with autonomous AI agents that work together. Configure, deploy, and scale your virtual workforce in minutes.",
    "hero.cta.primary": "Assemble Your Team",
    "hero.cta.secondary":"View Demo",
    "hero.social":      "Trusted by 2,400+ creators and startups worldwide.",

    // Why SpowNext
    "why.label":    "Why SpowNext",
    "why.title":    "Intelligence without complexity.",
    "why.subtitle": "Three pillars that set SpowNext apart from everything else.",
    "why.p1.tag":   "Smart Routing",
    "why.p1.title": "The right model, always.",
    "why.p1.desc":  "SpowNext automatically routes each task to the most capable AI model available. No prompt engineering, no model juggling — the best expert is deployed the moment you need it.",
    "why.p2.tag":   "Zero Friction",
    "why.p2.title": "Your team, zero skills required.",
    "why.p2.desc":  "Compose powerful multi-agent workflows without writing a single line of code or mastering any automation tool. If you can describe your goal, SpowNext can build it.",
    "why.p3.tag":   "Live Canvas",
    "why.p3.title": "Watch your team work, in real time.",
    "why.p3.desc":  "A live digital workspace where you can see your agents collaborate, track their progress, and experience the magic of autonomous teamwork unfolding right before you.",

    // Social Proof
    "social.label":     "Trusted by fast-growing teams",

    // How It Works
    "how.label":        "The Process",
    "how.title":        "Four steps to deployment.",
    "how.subtitle":     "Go from idea to a fully functioning autonomous team in minutes.",
    "how.step1.title":  "Describe your goal",
    "how.step1.desc":   "Simply tell SpowNext what you want to achieve. No coding required.",
    "how.step2.title":  "Team assembled",
    "how.step2.desc":   "Our engine selects the best agents with specific roles for your task.",
    "how.step3.title":  "Work together",
    "how.step3.desc":   "Watch your autonomous agents collaborate and deliver results in real-time.",
    "how.step4.title":  "Deploy & Preview",
    "how.step4.desc":   "Export, publish, or preview your deliverables instantly — from reports to live apps.",

    // Features
    "features.label":   "The Toolbox",
    "features.title":   "Everything you need to orchestrate.",
    "features.cta":     "Explore all features",
    "features.f1.title":"Team Manager",
    "features.f1.desc": "Directly oversee individual agents or groups with our intuitive dashboard.",
    "features.f2.title":"Agent Catalog",
    "features.f2.desc": "Access 50+ pre-trained specialized agents for every possible niche.",
    "features.f3.title":"Auto-builder",
    "features.f3.desc": "Leverage AI to automatically generate the perfect workflow logic for you.",
    "features.f4.title":"Live Insights",
    "features.f4.desc": "Monitor tokens, costs, and performance metrics in real-time dashboards.",
    "features.f5.title":"Safe-guard",
    "features.f5.desc": "Enterprise-grade security ensuring your data and logic remains private.",
    "features.f6.title":"Cloud Sync",
    "features.f6.desc": "Instantly deploy to any cloud provider with zero configuration needed.",

    // Use Cases
    "usecases.title":   "Infinite possibilities.",
    "usecases.c1.title":"Web Application",
    "usecases.c1.desc": "Deploy a team of designers, coders, and QA testers to build your next SaaS MVP from scratch.",
    "usecases.c2.title":"Book Publishing",
    "usecases.c2.desc": "From research to editing and cover design. Your automated editorial suite ready 24/7.",
    "usecases.c3.title":"Expatriation",
    "usecases.c3.desc": "Simplify complex relocation tasks. Let agents handle visa forms, housing searches, and school enrollments.",
    "usecases.c4.title":"Social Growth",
    "usecases.c4.desc": "Content creation, scheduling, and engagement monitoring handled by a specialized marketing pod.",
    "usecases.c5.title":"E-commerce",
    "usecases.c5.desc": "Automate product listings, customer support, inventory alerts, and ad campaigns at scale.",
    "usecases.c6.title":"Research",
    "usecases.c6.desc": "Orchestrate data-gathering, synthesis, and report generation without lifting a finger.",

    // Agents
    "agents.title":     "Meet your top performers.",
    "agents.subtitle":  "The best talent in the world — always available.",
    "agents.online":    "Online",
    "agents.working":   "Working",
    "agents.busy":      "Busy",
    "agents.resting":   "Resting",

    // Pricing
    "pricing.label":    "Pricing",
    "pricing.title":    "Scale at your own pace.",
    "pricing.subtitle": "Choose the plan that fits your ambition.",
    "pricing.badge":    "Most Popular",
    "pricing.monthly":  "/mo",
    "pricing.plan1.name":  "Free",
    "pricing.plan1.desc":  "Perfect for exploring.",
    "pricing.plan1.f1":    "2 Active Agents",
    "pricing.plan1.f2":    "Standard Templates",
    "pricing.plan1.f3":    "100 Runs / Month",
    "pricing.plan1.cta":   "Get Started",
    "pricing.plan2.name":  "Pro",
    "pricing.plan2.desc":  "For serious creators.",
    "pricing.plan2.f1":    "10 Active Agents",
    "pricing.plan2.f2":    "Custom Workflows",
    "pricing.plan2.f3":    "Priority Infrastructure",
    "pricing.plan2.f4":    "Advanced Analytics",
    "pricing.plan2.cta":   "Go Professional",
    "pricing.plan3.name":  "Team",
    "pricing.plan3.desc":  "For growing startups.",
    "pricing.plan3.f1":    "Unlimited Agents",
    "pricing.plan3.f2":    "Shared Workspaces",
    "pricing.plan3.f3":    "Role-based Access",
    "pricing.plan3.f4":    "SSO & Security",
    "pricing.plan3.cta":   "Contact Sales",

    // Founders
    "founders.label":        "The Team",
    "founders.title":        "Built by builders, for builders.",
    "founders.subtitle":     "Three developers who got tired of stitching tools together — so they built the platform they always needed.",
    "founders.julien.role":  "Co-Founder & CTO",
    "founders.julien.quote": "I wanted to build complex systems without the complexity. SpowNext is that dream made real.",
    "founders.saber.role":   "Co-Founder & CEO",
    "founders.saber.quote":  "We didn't just build a product — we built the teammate every developer deserves.",
    "founders.abdel.role":   "Co-Founder & CPO",
    "founders.abdel.quote":  "The best products are invisible. SpowNext lets you focus on what matters, not the tooling.",

    // Final CTA
    "cta.title":    "Your team is waiting.",
    "cta.subtitle": "Stop managing tools. Start managing talent. Deploy your autonomous workforce in just a few clicks.",
    "cta.button":   "Assemble Free Team",

    // Footer
    "footer.tagline":  "Building the future of autonomous collaboration, one agent at a time.",
    "footer.product":  "Product",
    "footer.company":  "Company",
    "footer.legal":    "Legal",
    "footer.p1":       "Team Manager",
    "footer.p2":       "Agent Catalog",
    "footer.p3":       "API Docs",
    "footer.p4":       "Changelog",
    "footer.c1":       "About Us",
    "footer.c2":       "Careers",
    "footer.c3":       "Security",
    "footer.c4":       "Contact",
    "footer.l1":       "Privacy Policy",
    "footer.l2":       "Terms of Service",
    "footer.copy":     "© 2025 SpowNext. All rights reserved.",
    "footer.easter":   "Easter Egg: Find Alex",
  },

  fr: {
    // Navbar
    "nav.howItWorks":  "Comment ça marche",
    "nav.features":    "Fonctionnalités",
    "nav.useCases":    "Cas d'usage",
    "nav.pricing":     "Tarifs",
    "nav.cta":         "Démarrer gratuitement",

    // Hero
    "hero.badge":       "Maintenant en bêta publique",
    "hero.h1.line1":    "Spawnez votre équipe d'agents...",
    "hero.h1.line2":    "Construisez ce qui vient ensuite !",
    "hero.subtitle":    "Donnez vie à votre vision avec des agents IA autonomes qui collaborent. Configurez, déployez et faites évoluer votre équipe virtuelle en quelques minutes.",
    "hero.cta.primary": "Assembler mon équipe",
    "hero.cta.secondary":"Voir la démo",
    "hero.social":      "Approuvé par plus de 2 400 créateurs et startups dans le monde.",

    // Why SpowNext
    "why.label":    "Pourquoi SpowNext",
    "why.title":    "L'intelligence sans la complexité.",
    "why.subtitle": "Trois piliers qui distinguent SpowNext de tout le reste.",
    "why.p1.tag":   "Routage intelligent",
    "why.p1.title": "Le bon modèle, toujours.",
    "why.p1.desc":  "SpowNext sélectionne automatiquement le modèle IA le plus performant pour chaque tâche. Pas d'ingénierie de prompts, pas de jonglage — le meilleur expert est déployé au bon moment.",
    "why.p2.tag":   "Zéro friction",
    "why.p2.title": "Votre équipe, sans aucune compétence requise.",
    "why.p2.desc":  "Composez des workflows multi-agents puissants sans écrire une seule ligne de code. Si vous pouvez décrire votre objectif, SpowNext peut le construire.",
    "why.p3.tag":   "Espace digital",
    "why.p3.title": "Voyez votre équipe travailler, en direct.",
    "why.p3.desc":  "Un espace de travail digital vivant où vous observez vos agents collaborer, suivez leur progression et vivez l'expérience unique de l'autonomie en action.",

    // Social Proof
    "social.label":     "Adopté par des équipes en forte croissance",

    // How It Works
    "how.label":        "Le processus",
    "how.title":        "Quatre étapes pour déployer.",
    "how.subtitle":     "De l'idée à une équipe autonome opérationnelle en quelques minutes.",
    "how.step1.title":  "Décrivez votre objectif",
    "how.step1.desc":   "Dites simplement à SpowNext ce que vous voulez accomplir. Aucun code requis.",
    "how.step2.title":  "Équipe assemblée",
    "how.step2.desc":   "Notre moteur sélectionne les meilleurs agents avec des rôles précis pour votre tâche.",
    "how.step3.title":  "Travaillez ensemble",
    "how.step3.desc":   "Regardez vos agents autonomes collaborer et livrer des résultats en temps réel.",
    "how.step4.title":  "Déployez & Prévisualisez",
    "how.step4.desc":   "Exportez, publiez ou prévisualisez vos livrables instantanément — rapports, apps ou contenus.",

    // Features
    "features.label":   "La boîte à outils",
    "features.title":   "Tout ce qu'il faut pour orchestrer.",
    "features.cta":     "Explorer toutes les fonctionnalités",
    "features.f1.title":"Chef d'équipe",
    "features.f1.desc": "Supervisez directement les agents individuels ou les groupes via notre tableau de bord intuitif.",
    "features.f2.title":"Catalogue d'agents",
    "features.f2.desc": "Accédez à plus de 50 agents spécialisés pré-entraînés pour chaque niche.",
    "features.f3.title":"Auto-constructeur",
    "features.f3.desc": "Utilisez l'IA pour générer automatiquement la logique de workflow parfaite.",
    "features.f4.title":"Insights en direct",
    "features.f4.desc": "Surveillez tokens, coûts et métriques de performance en temps réel.",
    "features.f5.title":"Garde-fou",
    "features.f5.desc": "Sécurité de niveau entreprise garantissant la confidentialité de vos données.",
    "features.f6.title":"Sync Cloud",
    "features.f6.desc": "Déployez instantanément sur n'importe quel fournisseur cloud sans configuration.",

    // Use Cases
    "usecases.title":   "Possibilités infinies.",
    "usecases.c1.title":"Application Web",
    "usecases.c1.desc": "Déployez une équipe de designers, développeurs et testeurs QA pour construire votre prochain MVP.",
    "usecases.c2.title":"Édition de livres",
    "usecases.c2.desc": "De la recherche au design de couverture. Votre suite éditoriale automatisée disponible 24h/24.",
    "usecases.c3.title":"Expatriation",
    "usecases.c3.desc": "Simplifiez les démarches de relocalisation. Laissez les agents gérer visas, logement et inscriptions scolaires.",
    "usecases.c4.title":"Croissance sociale",
    "usecases.c4.desc": "Création de contenu, planification et suivi d'engagement gérés par un pod marketing spécialisé.",
    "usecases.c5.title":"E-commerce",
    "usecases.c5.desc": "Automatisez les fiches produits, le support client, les alertes de stock et les campagnes publicitaires.",
    "usecases.c6.title":"Recherche",
    "usecases.c6.desc": "Orchestrez la collecte de données, la synthèse et la génération de rapports sans effort.",

    // Agents
    "agents.title":     "Rencontrez vos meilleurs talents.",
    "agents.subtitle":  "Les meilleurs talents au monde — toujours disponibles.",
    "agents.online":    "En ligne",
    "agents.working":   "En train de travailler",
    "agents.busy":      "Occupé",
    "agents.resting":   "Au repos",

    // Pricing
    "pricing.label":    "Tarification",
    "pricing.title":    "Évoluez à votre rythme.",
    "pricing.subtitle": "Choisissez le plan adapté à vos ambitions.",
    "pricing.badge":    "Le plus populaire",
    "pricing.monthly":  "/mois",
    "pricing.plan1.name":  "Gratuit",
    "pricing.plan1.desc":  "Parfait pour explorer.",
    "pricing.plan1.f1":    "2 agents actifs",
    "pricing.plan1.f2":    "Modèles standards",
    "pricing.plan1.f3":    "100 exécutions / mois",
    "pricing.plan1.cta":   "Commencer",
    "pricing.plan2.name":  "Pro",
    "pricing.plan2.desc":  "Pour les créateurs sérieux.",
    "pricing.plan2.f1":    "10 agents actifs",
    "pricing.plan2.f2":    "Workflows personnalisés",
    "pricing.plan2.f3":    "Infrastructure prioritaire",
    "pricing.plan2.f4":    "Analyses avancées",
    "pricing.plan2.cta":   "Passer au Pro",
    "pricing.plan3.name":  "Équipe",
    "pricing.plan3.desc":  "Pour les startups en croissance.",
    "pricing.plan3.f1":    "Agents illimités",
    "pricing.plan3.f2":    "Espaces de travail partagés",
    "pricing.plan3.f3":    "Accès par rôles",
    "pricing.plan3.f4":    "SSO & Sécurité",
    "pricing.plan3.cta":   "Contacter les ventes",

    // Founders
    "founders.label":        "L'équipe",
    "founders.title":        "Créé par des builders, pour des builders.",
    "founders.subtitle":     "Trois développeurs qui en avaient assez d'assembler des outils — alors ils ont construit la plateforme dont ils avaient toujours besoin.",
    "founders.julien.role":  "Co-fondateur & CTO",
    "founders.julien.quote": "Je voulais construire des systèmes complexes sans la complexité. SpowNext, c'est ce rêve rendu réel.",
    "founders.saber.role":   "Co-fondateur & CEO",
    "founders.saber.quote":  "On n'a pas juste créé un produit — on a créé le coéquipier que chaque développeur mérite.",
    "founders.abdel.role":   "Co-fondateur & CPO",
    "founders.abdel.quote":  "Les meilleurs produits sont invisibles. SpowNext vous laisse vous concentrer sur ce qui compte.",

    // Final CTA
    "cta.title":    "Votre équipe vous attend.",
    "cta.subtitle": "Arrêtez de gérer des outils. Commencez à gérer des talents. Déployez votre équipe autonome en quelques clics.",
    "cta.button":   "Assembler mon équipe gratuite",

    // Footer
    "footer.tagline":  "Construire l'avenir de la collaboration autonome, un agent à la fois.",
    "footer.product":  "Produit",
    "footer.company":  "Entreprise",
    "footer.legal":    "Légal",
    "footer.p1":       "Chef d'équipe",
    "footer.p2":       "Catalogue d'agents",
    "footer.p3":       "Documentation API",
    "footer.p4":       "Changements",
    "footer.c1":       "À propos",
    "footer.c2":       "Carrières",
    "footer.c3":       "Sécurité",
    "footer.c4":       "Contact",
    "footer.l1":       "Politique de confidentialité",
    "footer.l2":       "Conditions d'utilisation",
    "footer.copy":     "© 2025 SpowNext. Tous droits réservés.",
    "footer.easter":   "Easter Egg : Trouver Alex",
  },
} as const;

// ── Context ────────────────────────────────────────────────
interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations.en) => string;
}

// @ts-expect-error — populated by provider
const I18nContext = createContext<I18nContextType>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("spownext-lang") as Lang | null;
    if (stored === "en" || stored === "fr") setLangState(stored);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("spownext-lang", l);
  }

  function t(key: keyof typeof translations.en): string {
    return (translations[lang] as Record<string, string>)[key] ?? key;
  }

  return createElement(I18nContext.Provider, { value: { lang, setLang, t } }, children);
}

export function useTranslation() {
  return useContext(I18nContext);
}
