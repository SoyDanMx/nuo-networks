import type { Metadata } from "next";

import CapabilityHighlights from "@/components/CapabilityHighlights";
import ClosingCTASection from "@/components/ClosingCTASection";
import ConvergenceItOtSection from "@/components/ConvergenceItOtSection";
import CyberShieldSection from "@/components/CyberShieldSection";
import NuoVsTraditionalSection from "@/components/NuoVsTraditionalSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ThreatMapComparisonSection from "@/components/ThreatMapComparisonSection";
import ProjectJourneySection from "@/components/ProjectJourneySection";
import SectorsScroller from "@/components/SectorsScroller";
import PartnerMarquee from "@/components/PartnerMarquee";
import SocialProofRibbon from "@/components/SocialProofRibbon";
import WhyNuoSection from "@/components/WhyNuoSection";
import { getHomeKeywords } from "@/lib/seo/keywords";
import { isLocale, type Locale } from "@/lib/i18n/config";

interface IndexPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: IndexPageProps): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {};
  }
  const locale = params.locale as Locale;
  return {
    keywords: getHomeKeywords(locale)
  };
}

const Index = (): JSX.Element => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ThreatMapComparisonSection />
      <SocialProofRibbon />
      <PartnerMarquee />
      <SectorsScroller />
      <CyberShieldSection />
      <NuoVsTraditionalSection />
      <ConvergenceItOtSection />
      <CapabilityHighlights />
      <ProjectJourneySection />
      <WhyNuoSection />
      <ClosingCTASection />
      <Footer />
    </main>
  );
};

export default Index;
