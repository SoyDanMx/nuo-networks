import type { Metadata } from "next";

import AuthorityPartnersSection from "@/components/AuthorityPartnersSection";
import CapabilityHighlights from "@/components/CapabilityHighlights";
import ClosingCTASection from "@/components/ClosingCTASection";
import CyberAuditFAB from "@/components/CyberAuditFAB";
import ConvergenceItOtSection from "@/components/ConvergenceItOtSection";
import CyberShieldSection from "@/components/CyberShieldSection";
import EngineeringPhilosophySection from "@/components/EngineeringPhilosophySection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IndustryUseCasesSection from "@/components/IndustryUseCasesSection";
import LandingNetworkBackdrop from "@/components/LandingNetworkBackdrop";
import NuoVsTraditionalSection from "@/components/NuoVsTraditionalSection";
import OtCybersecuritySection from "@/components/OtCybersecuritySection";
import PartnerMarquee from "@/components/PartnerMarquee";
import ProjectJourneySection from "@/components/ProjectJourneySection";
import SectorsScroller from "@/components/SectorsScroller";
import SocDashboardPreview from "@/components/SocDashboardPreview";
import SocialProofRibbon from "@/components/SocialProofRibbon";
import TrustTickerSection from "@/components/TrustTickerSection";
import SoftwareHardwareSplitSection from "@/components/SoftwareHardwareSplitSection";
import ThreatIntelFeedSection from "@/components/ThreatIntelFeedSection";
import ThreatMapComparisonSection from "@/components/ThreatMapComparisonSection";
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
    <main className="relative min-h-screen w-full min-w-0 max-w-full overflow-x-clip bg-background">
      <LandingNetworkBackdrop />
      <Header />
      <div className="relative z-10">
        <HeroSection />
        <ThreatMapComparisonSection />
        <SocialProofRibbon />
        <TrustTickerSection />
        <PartnerMarquee />
        <AuthorityPartnersSection />
        <OtCybersecuritySection />
        <SocDashboardPreview />
        <SoftwareHardwareSplitSection />
        <IndustryUseCasesSection />
        <SectorsScroller />
        <CyberShieldSection />
        <NuoVsTraditionalSection />
        <ConvergenceItOtSection />
        <CapabilityHighlights />
        <ProjectJourneySection />
        <EngineeringPhilosophySection />
        <WhyNuoSection />
        <ThreatIntelFeedSection />
        <ClosingCTASection />
        <Footer />
        <CyberAuditFAB />
      </div>
    </main>
  );
};

export default Index;
