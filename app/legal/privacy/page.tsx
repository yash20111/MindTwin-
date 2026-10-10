import type { Metadata } from "next";
import { legal } from "@/content/copy";
import { siteConfig } from "@/lib/site-config";
import { LegalLayout } from "@/components/sections/legal-layout";

export const metadata: Metadata = {
  title: legal.privacy.meta.title,
  description: legal.privacy.meta.description,
  alternates: { canonical: "/legal/privacy" },
  robots: { index: false, follow: true },
};

// TODO(legal): placeholder template — must be replaced/reviewed by legal counsel before launch.
export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title={legal.privacy.title} updated={legal.privacy.updated}>
      <p>
        This Privacy Policy explains how MindTwin (“MindTwin”, “we”, “us”) collects, uses and
        protects information when you visit mindtwin.app (the “Site”) or join our waitlist. A
        separate policy will cover the MindTwin app before it launches.
      </p>

      <h2>1. Information we collect on this Site</h2>
      <ul>
        <li>
          Waitlist details you provide: email address and, optionally, your name, role and phone
          platform.
        </li>
        <li>
          Basic technical data needed to run and protect the Site, such as IP address (used briefly
          for rate limiting).
        </li>
        <li>Your theme preference (light/dark), stored only in your own browser.</li>
      </ul>

      <h2>2. How we use it</h2>
      <ul>
        <li>To email you when early access opens and send essential launch updates.</li>
        <li>To understand which platforms and languages to prioritize.</li>
        <li>To prevent spam and abuse of the waitlist.</li>
      </ul>

      <h2>3. What we don’t do</h2>
      <p>
        We don’t sell your personal data, we don’t use it for advertising, and we don’t use it to
        train AI models.
      </p>

      <h2>4. Storage and retention</h2>
      <p>
        Waitlist data is stored with our infrastructure provider [Provider, Region]. We keep it
        until launch plus [N] months, or until you ask us to delete it.
      </p>

      <h2>5. Your rights</h2>
      <p>
        Depending on where you live — including under India’s Digital Personal Data Protection Act,
        2023 and the EU GDPR — you may have the right to access, correct or erase your data, and to
        withdraw consent. Email {siteConfig.email.privacy} and we’ll respond within [N] days.
      </p>

      <h2>6. Contact</h2>
      <p>
        [Legal entity name], [Registered address]. Grievance Officer: [Name],{" "}
        {siteConfig.email.privacy}.
      </p>
    </LegalLayout>
  );
}
