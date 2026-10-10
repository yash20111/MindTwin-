import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/sections/hero";
import { ProblemStrip } from "@/components/sections/problem-strip";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { DiarySection } from "@/components/sections/diary-section";
import { AskTwinSection } from "@/components/sections/ask-twin-section";
import { TimelineShowcase } from "@/components/sections/timeline-showcase";
import { PrivacySection } from "@/components/sections/privacy-section";
import { UseCases } from "@/components/sections/use-cases";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemStrip />
      <HowItWorks />
      <FeatureGrid />
      <DiarySection />
      <AskTwinSection />
      <TimelineShowcase />
      <PrivacySection />
      <UseCases />
      <PricingTeaser />
      <FAQ />
      <FinalCTA />
    </>
  );
}
