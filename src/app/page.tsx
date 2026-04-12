import { Navbar }            from "@/components/layout/Navbar";
import { Footer }            from "@/components/layout/Footer";
import { HeroSection }       from "@/components/sections/HeroSection";
import { WhySpowNext }       from "@/components/sections/WhySpowNext";
import { SocialProofBar }    from "@/components/sections/SocialProofBar";
import { HowItWorks }        from "@/components/sections/HowItWorks";
import { FeaturesGrid }      from "@/components/sections/FeaturesGrid";
import { UseCasesCarousel }  from "@/components/sections/UseCasesCarousel";
import { AgentShowcase }     from "@/components/sections/AgentShowcase";
import { PricingSection }    from "@/components/sections/PricingSection";
import { FoundersSection }   from "@/components/sections/FoundersSection";
import { FinalCTA }          from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <WhySpowNext />
        <SocialProofBar />
        <HowItWorks />
        <FeaturesGrid />
        <UseCasesCarousel />
        <AgentShowcase />
        <PricingSection />
        <FoundersSection />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
