import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { nav } from "@/content/copy";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { themeScript } from "@/components/layout/theme-toggle";
import { Toaster } from "@/components/ui/toaster";
import { MotionProvider } from "@/components/ui/motion-provider";
import { JsonLd, organizationLd, softwareApplicationLd } from "@/components/seo/json-ld";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s · MindTwin" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "AI memory",
    "voice notes",
    "spoken diary",
    "journal app",
    "personal AI",
    "Hindi",
    "Gujarati",
    "privacy-first",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1116" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="bg-ink text-bg sr-only z-[60] rounded-full px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {nav.skipToContent}
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <Toaster />
        <JsonLd data={organizationLd} />
        <JsonLd data={softwareApplicationLd} />
      </body>
    </html>
  );
}
