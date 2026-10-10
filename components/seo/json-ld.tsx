import { siteConfig, absoluteUrl } from "@/lib/site-config";
import { pricing, type FaqItem } from "@/content/copy";

/** Escapes `<` so JSON can't break out of the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/icon.svg"),
  email: siteConfig.email.hello,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
};

export const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "iOS, Android",
  description: siteConfig.description,
  url: siteConfig.url,
  offers: pricing.plans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.price.replace(/[^\d.]/g, "") || "0",
    priceCurrency: "INR",
    // Pre-launch: offers are upcoming, available via the waitlist.
    availability: "https://schema.org/PreOrder",
    url: absoluteUrl("/waitlist"),
  })),
};

export function faqLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
