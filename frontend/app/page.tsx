import { HeroSection } from "@/features/landing/components/HeroSection";
import { Navbar } from "@/features/landing/components/Navbar";
import { FeaturesSection } from "../features/landing/components/FeaturesSection";
import { CommunitySection } from "@/features/landing/components/CommunitySection";
import { WhyChooseUsSection } from "@/features/landing/components/WhyChooseUsSection";
import { CtaSection } from "@/features/landing/components/CtaSection";
import { Footer } from "@/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-primary-foreground text-accent-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <Navbar />

      {/* Page Content */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <CommunitySection />
        <WhyChooseUsSection />
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
