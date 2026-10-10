import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/features", priority: 0.9 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/privacy-promise", priority: 0.8 },
  { path: "/pricing", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/waitlist", priority: 0.9 },
  { path: "/legal/privacy", priority: 0.2 },
  { path: "/legal/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly",
    priority,
  }));
}
