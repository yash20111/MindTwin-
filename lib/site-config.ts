export const siteConfig = {
  name: "MindTwin",
  // TODO: replace with the production domain once purchased.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mindtwin.app").replace(/\/$/, ""),
  title: "MindTwin — Your mind, remembered.",
  tagline: "Your mind, remembered.",
  description:
    "MindTwin is your private AI memory. Capture notes and diary entries by voice or text, see your day as a timeline, and ask your twin anything about your life.",
  email: {
    hello: "hello@mindtwin.app",
    privacy: "privacy@mindtwin.app",
  },
  locale: "en_IN",
} as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}
