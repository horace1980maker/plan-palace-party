import HeroSection from "@/components/landing/HeroSection";
import CommitmentsSection from "@/components/landing/CommitmentsSection";
import TimelineSection from "@/components/landing/TimelineSection";
import SessionsSection from "@/components/landing/SessionsSection";
import ChecklistSection from "@/components/landing/ChecklistSection";
import ToolsSection from "@/components/landing/ToolsSection";
import RulesSection from "@/components/landing/RulesSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import CTASection from "@/components/landing/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CommitmentsSection />
      <TimelineSection />
      <SessionsSection />
      <ChecklistSection />
      <ToolsSection />
      <RulesSection />
      <BenefitsSection />
      <CTASection />
    </main>
  );
};

export default Index;
