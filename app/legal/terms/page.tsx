import type { Metadata } from "next";
import { legal } from "@/content/copy";
import { siteConfig } from "@/lib/site-config";
import { LegalLayout } from "@/components/sections/legal-layout";

export const metadata: Metadata = {
  title: legal.terms.meta.title,
  description: legal.terms.meta.description,
  alternates: { canonical: "/legal/terms" },
  robots: { index: false, follow: true },
};

// TODO(legal): placeholder template — must be replaced/reviewed by legal counsel before launch.
export default function TermsPage() {
  return (
    <LegalLayout title={legal.terms.title} updated={legal.terms.updated}>
      <p>
        These Terms govern your use of the MindTwin website (the “Site”) and the early-access
        waitlist. Separate terms will apply to the MindTwin app when it launches.
      </p>

      <h2>1. The waitlist</h2>
      <p>
        Joining the waitlist doesn’t guarantee access by a particular date. Early-access offers
        (such as 3 months of Pro free) are indicative and may change before launch.
      </p>

      <h2>2. Acceptable use</h2>
      <ul>
        <li>Don’t submit someone else’s email address without their permission.</li>
        <li>Don’t attempt to disrupt, scrape or overload the Site.</li>
      </ul>

      <h2>3. Pricing</h2>
      <p>Prices shown on the Site are indicative and may change before launch.</p>

      <h2>4. Intellectual property</h2>
      <p>
        The MindTwin name, logo and Site content belong to [Legal entity name]. Demo content uses
        sample data only.
      </p>

      <h2>5. Disclaimer and liability</h2>
      <p>
        The Site is provided “as is”. [Limitation of liability clause to be drafted by counsel.]
      </p>

      <h2>6. Governing law</h2>
      <p>These Terms are governed by the laws of India. Courts at [City] have jurisdiction.</p>

      <h2>7. Contact</h2>
      <p>Questions? Email {siteConfig.email.hello}.</p>
    </LegalLayout>
  );
}
