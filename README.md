# MindTwin — marketing website

Pre-launch marketing site for **MindTwin**, a privacy-first AI that remembers your life for you.
Goal: explain the product in 5 seconds, feel trustworthy, and convert visitors to the **early-access waitlist**.

Built with Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript (strict),
Tailwind CSS 4, shadcn-style Radix primitives, `motion`, `lucide-react`, `react-hook-form` + `zod`,
Vitest + Testing Library, and Playwright.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | What it does                                                  |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Dev server (Turbopack)                                        |
| `npm run build`     | Production build — every page is statically prerendered       |
| `npm start`         | Serve the production build                                    |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript)                 |
| `npm run typecheck` | `next typegen` + `tsc --noEmit`                               |
| `npm run format`    | Prettier (with Tailwind class sorting)                        |
| `npm test`          | Vitest unit/component tests                                   |
| `npm run test:e2e`  | Playwright smoke tests (builds + starts the app on port 3100) |

First time running e2e on a new machine: `npx playwright install chromium`.

## Environment variables

Copy `.env.example` → `.env.local`.

| Variable                    | Required | Purpose                                                                     |
| --------------------------- | -------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | no       | Canonical URL for metadata, sitemap and OG (default `https://mindtwin.app`) |
| `SUPABASE_URL`              | no       | Enables Supabase storage for the waitlist                                   |
| `SUPABASE_SERVICE_ROLE_KEY` | no       | Server-only key for inserting signups. **Never** prefix with `NEXT_PUBLIC_` |

Without the Supabase variables, signups go to `ConsoleWaitlistStore`, which logs a masked email
(`y***@domain.com`) to the server console. It's fine for local dev but doesn't persist anything.

## Connecting Supabase

1. Create a Supabase project.
2. Open the SQL editor and run [`supabase/schema.sql`](supabase/schema.sql). This creates the
   `waitlist` table (unique email) and enables RLS with no public policies, so only the service
   role can read or write it.
3. Copy **Project URL** → `SUPABASE_URL` and **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
   (in `.env.local` locally, and in Vercel → Project → Settings → Environment Variables).
4. Restart the server. `lib/waitlist/store.ts` picks `SupabaseWaitlistStore` automatically.

Duplicate emails return `200 { status: "already_joined" }` and the UI shows "You're already on the list 🎉".

## Editing copy

**All marketing text lives in [`content/copy.ts`](content/copy.ts)**: nav, hero, every home section,
demo scripts (Ask-your-twin questions/answers, diary transcript), pricing, FAQ, secondary pages and
the 404. It's typed, so a typo in a structure fails `npm run typecheck`.

- Demo answers support `**bold**` and `*italic*`.
- In the diary transcript, words wrapped in `~tildes~` are rendered as faded filler words.
- Icons are referenced by name (see `lib/icons.ts`).
- The legal templates (`app/legal/*`) keep their text inline because they're drafts for counsel,
  not marketing copy.

## Deploying to Vercel

1. Push the repo to GitHub/GitLab and import it in Vercel (framework preset: Next.js).
2. Add the env vars above for Production (and Preview if you want real signups there).
3. Deploy. All pages are static; only `/api/waitlist` runs as a function. Nothing is written to
   the filesystem.
4. Point the domain at Vercel and set `NEXT_PUBLIC_SITE_URL` to it.

## Project structure

```
app/                     routes (home, features, how-it-works, privacy-promise, pricing, about,
                         waitlist, legal/*, not-found), api/waitlist, sitemap, robots, OG image, icon
components/
  layout/                Navbar, Footer, ThemeToggle, MobileMenu, CurrentYear
  sections/              Hero, ProblemStrip, HowItWorks, FeatureGrid, DiarySection, AskTwinSection,
                         TimelineShowcase, PrivacySection, UseCases, PricingTeaser, FAQ, FinalCTA, …
  demos/                 DiaryDemo, AskTwinDemo (scripted, client-side, no mic / no AI calls)
  ui/                    Button, Input, Accordion, Tabs, Sheet, Toaster + Logo, SectionHeading,
                         GradientButton, Chip, MemoryCard, PhoneMockup, Reveal, IconBadge, Waveform
  waitlist/              WaitlistForm (inline + full variants, shared zod schema)
  seo/                   JSON-LD (Organization, SoftwareApplication, FAQPage)
content/copy.ts          ALL marketing copy
lib/
  waitlist/              schema.ts (zod, shared), store.ts (Supabase / Console), handler.ts (route logic)
  demos/                 pure state machines for both demos (unit-tested)
  rate-limit.ts          in-memory sliding-window limiter behind an interface
  site-config.ts         name, URL, emails
supabase/schema.sql      waitlist table
tests/unit, tests/e2e    Vitest + Playwright
```

## Notable decisions & assumptions

- **Pre-launch content integrity.** There are no testimonials, user counts, press logos or ratings.
  Hero trust badges are labelled "Planned product principles". Every demo says "Demo with sample
  data". Priya, Rahul, Arjun and the places are illustrative.
- **Contrast.** The spec's light-mode ember `#FF7A45`, blue `#4C6FFF`, green and red fail WCAG AA as
  text on cream. They're still used for fills and gradients, and darker `*-text` tokens
  (`--accent-text: #B8481C`, `--twin-text: #3555E0`, …) are used whenever the color is text. Gradient
  buttons use ink text (≈7:1).
- **Theme.** Follows `prefers-color-scheme` and has a manual toggle (saved in `localStorage` inside
  try/catch). A blocking inline script sets the `dark` class before paint, so there's no flash.
- **CSP.** Static (no nonces) so every page can be prerendered. It needs `'unsafe-inline'` for scripts
  because of the theme script and Next's inline RSC payload. Camera, mic and geolocation are disabled
  through `Permissions-Policy`, and `frame-ancestors 'none'` is set.
- **Cache Components.** The footer year is a `"use cache"` server component revalidated daily, because
  reading the clock during prerender isn't allowed.
- **Honeypot.** Submissions that fill the hidden `website` field get a fake `200 joined` and are
  never stored.
- **Reduced motion.** Loops and parallax stop. Demos jump to their final state, and reveals become
  plain fades.
- Prices are in INR, with `availability: PreOrder` in the JSON-LD.

## TODOs before launch

- [ ] `TODO(legal)`: counsel review of `/legal/privacy`, `/legal/terms`, the privacy promise page and
      the privacy section (DPDP Act / GDPR wording, entity name, grievance officer, retention).
- [ ] Real social profile URLs (`content/copy.ts` → `footer.social`, currently `#`).
- [ ] Production rate limiter: swap `InMemoryRateLimiter` for Upstash Redis / `@upstash/ratelimit`
      (serverless instances don't share memory).
- [ ] Buy the domain and set `NEXT_PUBLIC_SITE_URL`. Update `hello@` / `privacy@` mailboxes.
- [ ] Replace `[Founder Name]` and refine the About story.
- [ ] Optional: send a confirmation email on signup (e.g. Resend) and add privacy-friendly analytics
      (update the CSP `connect-src` accordingly).
- [ ] Run Lighthouse against the deployed URL (target ≥ 95 on mobile in all four categories).
