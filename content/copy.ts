/**
 * ALL marketing copy for the MindTwin site lives here.
 * Edit text in this file — components only render what's defined below.
 *
 * Inline formatting supported in demo answers / some strings:
 *   **bold**   *italic*
 *
 * Content integrity: MindTwin is pre-launch. No testimonials, user counts,
 * press logos or ratings. Names (Priya, Rahul, Arjun) and places are sample data.
 */
import type { IconName } from "@/lib/icons";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type NavLink = { label: string; href: string };
export type IconItem = { icon: IconName; title: string; body: string };
export type FaqItem = { q: string; a: string };

export type MemoryKind = "voice" | "place" | "person" | "diary" | "task" | "note" | "reflection";

export type SourceMemory = {
  kind: MemoryKind;
  emoji: string;
  label: string;
  time: string;
  place?: string;
  snippet: string;
};

export type TwinQuestion = {
  id: string;
  question: string;
  /** Supports **bold** and *italic* */
  answer: string;
  sources: SourceMemory[];
};

export type TimelineFilter = "all" | "places" | "notes" | "diary" | "people";
export type TimelineItem = {
  time: string;
  emoji: string;
  title: string;
  detail: string;
  categories: Exclude<TimelineFilter, "all">[];
};

export type Plan = {
  id: string;
  name: string;
  price: string;
  period?: string;
  note?: string;
  badge?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  comingSoon?: boolean;
  cta: string;
};

/* ------------------------------------------------------------------ */
/* Global                                                              */
/* ------------------------------------------------------------------ */

export const nav = {
  links: [
    { label: "Features", href: "/features" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Privacy", href: "/privacy-promise" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ] satisfies NavLink[],
  cta: "Join waitlist",
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  themeToggle: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
};

export const footer = {
  pitch: "Your private AI memory. Speak it, write it, live it — MindTwin remembers.",
  newsletterLabel: "Get one email when we launch",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "How it works", href: "/how-it-works" },
        { label: "Pricing", href: "/pricing" },
        { label: "Waitlist", href: "/waitlist" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "mailto:hello@mindtwin.app" },
      ],
    },
    {
      title: "Trust",
      links: [
        { label: "Privacy promise", href: "/privacy-promise" },
        { label: "Privacy policy", href: "/legal/privacy" },
        { label: "Terms", href: "/legal/terms" },
      ],
    },
  ],
  // TODO: replace "#" with real social profile URLs before launch.
  social: [
    { label: "MindTwin on X", network: "x", href: "#" },
    { label: "MindTwin on LinkedIn", network: "linkedin", href: "#" },
    { label: "MindTwin on Instagram", network: "instagram", href: "#" },
    { label: "MindTwin on GitHub", network: "github", href: "#" },
  ] as const,
  madeIn: "MindTwin. Made with care in India.",
  promise: "Your memories are yours. Always.",
};

export const sampleDataLabel = "Demo with sample data.";

/* ------------------------------------------------------------------ */
/* Waitlist form (shared)                                              */
/* ------------------------------------------------------------------ */

export const waitlistForm = {
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  nameLabel: "Name (optional)",
  namePlaceholder: "What should we call you?",
  personaLabel: "I am a…",
  personaPlaceholder: "Choose one (optional)",
  personas: [
    { value: "student", label: "Student" },
    { value: "professional", label: "Professional" },
    { value: "founder", label: "Founder" },
    { value: "parent", label: "Parent" },
    { value: "other", label: "Other" },
  ],
  platformLabel: "Your phone",
  platforms: [
    { value: "ios", label: "iOS" },
    { value: "android", label: "Android" },
    { value: "both", label: "Both" },
  ],
  submit: "Join the waitlist",
  submitting: "Joining…",
  reassurance: "No spam. One email when we launch. Unsubscribe anytime.",
  success: {
    title: "You're on the list!",
    body: (email: string) => `We'll email you at ${email}.`,
    toast: "You're on the waitlist 🎉",
  },
  already: {
    title: "You're already on the list 🎉",
    body: (email: string) => `${email} is already signed up. We'll be in touch.`,
  },
  errors: {
    generic: "Something went wrong. Please try again in a moment.",
    rateLimited: "Too many attempts. Please wait a few minutes and try again.",
    network: "We couldn't reach the server. Check your connection and try again.",
  },
  share: {
    label: "Share with a friend",
    copied: "Link copied!",
    text: "I just joined the MindTwin waitlist — a private AI that remembers your life for you.",
  },
};

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "✦ Early access opening soon",
  titleStart: "Your mind,",
  titleHighlight: "remembered.",
  sub: "MindTwin is a private AI that captures your thoughts, notes and days — by voice or text — and answers when you ask. Like a twin who never forgets.",
  primaryCta: "Join the waitlist",
  secondaryCta: "See how it works",
  principlesLabel: "Planned product principles",
  principles: [
    { emoji: "🔒", label: "End-to-end encrypted" },
    { emoji: "🎙", label: "Voice-first" },
    { emoji: "🇮🇳", label: "Hindi, Gujarati & English" },
    { emoji: "✋", label: "You own your data" },
  ],
  phone: {
    recording: "Recording…",
    time: "0:07",
    memoryMeta: "🎙 9:41 AM · Café Coffee Day, Satellite",
    memoryText: "Idea: weekly digest for parents about kids' school updates.",
    tags: ["#idea", "#startup"],
    savedLabel: "Saved to your memories",
    today: "Today",
    greeting: "Good morning",
  },
  floatingCards: [
    { emoji: "📍", text: "Gym · 1h 05m" },
    { emoji: "👤", text: "Met Priya — talked about the Pune trip" },
    { emoji: "📔", text: "Diary · 'A quiet, good day.' 😊" },
    { emoji: "✅", text: "Pay electricity bill — reminder set for Friday" },
  ],
};

export const problem = {
  title: "Your brain is for thinking, not for storing.",
  cards: [
    { emoji: "🚿", text: "That brilliant idea in the shower? Gone by breakfast." },
    { emoji: "🗂️", text: "Notes scattered across 5 apps, 3 chats and a napkin." },
    { emoji: "🤔", text: "“When did I last…?” — and no way to find out." },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "Three steps. Zero filing.",
  sub: "You live your life. MindTwin quietly does the remembering.",
  steps: [
    {
      icon: "mic",
      title: "Capture",
      body: "Talk, type, or just live your day. Voice notes, quick texts, your spoken diary, and (if you allow it) the places you go.",
    },
    {
      icon: "sparkles",
      title: "Understand",
      body: "MindTwin transcribes, summarizes and organizes everything into memories — people, places, tasks and ideas.",
    },
    {
      icon: "ask",
      title: "Ask",
      body: "Ask your twin anything: “What did Rahul say about the budget?” Get an answer with the exact memory it came from.",
    },
  ] satisfies IconItem[],
  link: "Explore how it works",
};

export const featureGrid = {
  eyebrow: "Features",
  title: "Everything you'd want to remember. Nothing you have to organize.",
  cards: {
    voice: {
      title: "Voice-first notes",
      body: "Speak naturally in English, Hindi, Gujarati or Hinglish. MindTwin turns rambling into clean, searchable notes.",
      demoRaw: "so um the thing is we should, like, send parents one weekly update…",
      demoClean: "Idea: send parents one weekly update.",
    },
    timeline: {
      title: "Your day, as a timeline",
      body: "See where you were, who you met and what you did — hour by hour.",
      items: [
        { time: "09:15", label: "Office" },
        { time: "13:00", label: "Lunch with Arjun" },
        { time: "18:45", label: "Gym" },
      ],
    },
    ask: {
      title: "Ask your twin",
      body: "Natural-language questions about your own life, answered with sources.",
      q: "Where did I park on Saturday?",
      a: "Level P2, near the lift — you left a voice note at 4:12 PM.",
    },
    reminders: {
      title: "Smart reminders",
      body: "“Remind me when I reach the office.” Time- and place-based nudges.",
    },
    people: {
      title: "People memory",
      body: "Remember what you discussed with whom, and when.",
      initials: ["PR", "AR", "RA", "+4"],
    },
    reflection: {
      title: "Weekly reflection",
      body: "A gentle Sunday summary: ideas captured, places visited, habits forming.",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      values: [3, 5, 2, 6, 4, 7, 3],
      summary: "This week: 8 ideas · 12 places · 5 diary entries",
    },
  },
  link: "See all features",
};

export const diary = {
  eyebrow: "📔 Your diary, without the writing",
  title: "Dear diary… just say it.",
  sub: "End your day by talking for a minute. MindTwin turns your words into a clean, private diary entry — with the date, place and mood saved automatically.",
  bullets: [
    {
      icon: "mic",
      title: "Dictate, don't type",
      body: "Speak in English, Hindi, Gujarati or Hinglish; pause, ramble, restart — it's fine.",
    },
    {
      icon: "pen",
      title: "Your words, or polished",
      body: "Keep your exact words, or let MindTwin tidy grammar and filler words. Your original audio and transcript are always kept.",
    },
    {
      icon: "smile",
      title: "Mood & highlights",
      body: "MindTwin suggests a mood and the day's highlight; you can change them.",
    },
    {
      icon: "lightbulb",
      title: "Gentle prompts",
      body: "“What made you smile today?” for nights you don't know where to start.",
    },
    {
      icon: "calendar",
      title: "On this day",
      body: "Revisit what you wrote one month or one year ago.",
    },
    {
      icon: "fingerprint",
      title: "Diary lock",
      body: "Protect your diary with a PIN or Face ID / fingerprint, separate from the rest of the app.",
    },
    {
      icon: "notebook",
      title: "Write when you want",
      body: "Prefer typing or handwriting-style writing? The diary works with text too.",
    },
  ] satisfies IconItem[],
  demo: {
    idleLabel: "Tap to try a sample entry",
    recordingLabel: "Listening to sample entry…",
    stopLabel: "Stop sample recording",
    transcriptLabel: "Transcript",
    /** Words wrapped in ~tildes~ are filler and rendered faded. */
    raw: "So today was… ~um,~ actually pretty good. Finally finished the client presentation, and they liked it. Had chai with Arjun after, and, ~uh,~ we talked about maybe starting something together. Feeling ~kind of~ tired but happy.",
    polished:
      "Today was a good day. I finally finished the client presentation — and they liked it. Afterwards I had chai with Arjun, and we talked about maybe starting something together. Tired, but happy.",
    toggleMine: "My words",
    togglePolished: "Polished ✨",
    toggleLabel: "Transcript style",
    entry: {
      date: "Thursday, 9 October",
      place: "Satellite, Ahmedabad",
      mood: "😊 Happy · Tired",
      highlight: "⭐ Client loved the presentation",
      locked: "Locked diary",
    },
    replay: "Replay",
    note: "Demo with sample data. Your real diary is private and encrypted.",
  },
};

export const askTwin = {
  eyebrow: "Ask your twin",
  title: "Go on. Ask your twin.",
  sub: "Tap a question. Your twin answers from your own memories — and shows you where it found them.",
  windowTitle: "MindTwin",
  windowStatus: "Your twin · private",
  inputPlaceholder: "Ask anything about your past…",
  inputLabel: "Question for your twin",
  sendLabel: "Ask",
  thinking: "Your twin is thinking…",
  emptyState: "Pick a question below to see how your twin answers.",
  chipsLabel: "Example questions",
  sourcesLabel: "From your memories",
  questions: [
    {
      id: "gym",
      question: "When did I last go to the gym?",
      answer:
        "Last Thursday, 7:10 PM at **Gold's Gym, Prahlad Nagar** — you stayed 1h 05m. That's 3 visits this month 💪",
      sources: [
        {
          kind: "place",
          emoji: "📍",
          label: "Location memory",
          time: "Thu · 7:10 PM",
          place: "Gold's Gym, Prahlad Nagar",
          snippet: "Visit · 1h 05m",
        },
      ],
    },
    {
      id: "idea",
      question: "What was that app idea I had last week?",
      answer:
        "On Tuesday at 9:41 AM you recorded: *“A weekly digest for parents about kids' school updates.”* You tagged it #startup.",
      sources: [
        {
          kind: "voice",
          emoji: "🎙",
          label: "Voice memory",
          time: "Tue · 9:41 AM",
          place: "Café Coffee Day, Satellite",
          snippet: "“Idea: weekly digest for parents about kids' school updates.”",
        },
      ],
    },
    {
      id: "pune",
      question: "What did Priya and I decide about the Pune trip?",
      answer:
        "You both agreed on **Dec 12–15**, train not flight, and Priya will book the homestay. You said you'd handle the itinerary.",
      sources: [
        {
          kind: "person",
          emoji: "👤",
          label: "Conversation note",
          time: "Sat · 6:30 PM",
          place: "with Priya",
          snippet: "Pune: Dec 12–15 · train · Priya books homestay · I plan itinerary",
        },
      ],
    },
    {
      id: "mood",
      question: "How have I been feeling this week?",
      answer:
        "Mostly good 😊 — 4 of your 5 diary entries were happy or calm. Monday felt stressful (the deadline), but Thursday was your best day: *“Tired, but happy.”*",
      sources: [
        {
          kind: "diary",
          emoji: "📔",
          label: "Diary entry",
          time: "Thu · 9:30 PM",
          snippet: "“Tired, but happy.” · 😊 Happy",
        },
        {
          kind: "diary",
          emoji: "📔",
          label: "Diary entry",
          time: "Mon · 10:05 PM",
          snippet: "“Deadline day. Long, but done.” · 😮‍💨 Stressed",
        },
      ],
    },
  ] satisfies TwinQuestion[],
};

export const timeline = {
  eyebrow: "Timeline",
  title: "Your day, beautifully remembered.",
  sub: "Every place, note and conversation — stitched into one calm view of your day.",
  dayLabel: "Thursday · sample day",
  filtersLabel: "Filter timeline",
  filters: [
    { id: "all", label: "All" },
    { id: "places", label: "Places" },
    { id: "notes", label: "Notes" },
    { id: "diary", label: "Diary" },
    { id: "people", label: "People" },
  ] satisfies { id: TimelineFilter; label: string }[],
  items: [
    {
      time: "07:30",
      emoji: "🏠",
      title: "Home",
      detail: "Morning voice note: 3 priorities for today",
      categories: ["places", "notes"],
    },
    {
      time: "09:15",
      emoji: "🏢",
      title: "Office",
      detail: "Standup notes auto-summarized",
      categories: ["places", "notes"],
    },
    {
      time: "13:00",
      emoji: "🍜",
      title: "Lunch with Arjun",
      detail: "Talked about switching to Supabase",
      categories: ["places", "people"],
    },
    {
      time: "18:45",
      emoji: "🏋️",
      title: "Gym",
      detail: "1h 05m",
      categories: ["places"],
    },
    {
      time: "21:30",
      emoji: "📔",
      title: "Diary",
      detail: "Spoken entry, 1m 12s · 😊 Happy · “Tired, but happy.”",
      categories: ["diary"],
    },
    {
      time: "21:35",
      emoji: "🌙",
      title: "Reflection",
      detail: "Today you captured 2 ideas and finished 4 tasks.",
      categories: ["notes", "diary"],
    },
  ] as TimelineItem[],
};

// TODO(legal): review all privacy commitments with counsel before launch.
export const privacy = {
  eyebrow: "Privacy",
  title: "Your memories are yours. Full stop.",
  sub: "Trust isn't a feature of MindTwin. It's the product. These are the commitments we're building on.",
  principles: [
    {
      icon: "lock",
      title: "Encrypted by design",
      body: "Your memories are encrypted in transit and at rest.",
    },
    {
      icon: "toggle",
      title: "You're in control",
      body: "Location is off by default. Turn any sense on or off, anytime.",
    },
    {
      icon: "eyeOff",
      title: "Never sold. Never used to train.",
      body: "Your data isn't used to train AI models or sold to anyone.",
    },
    {
      icon: "download",
      title: "Export or delete in one tap",
      body: "Take everything with you, or erase it completely.",
    },
    {
      icon: "fingerprint",
      title: "A diary only you can open",
      body: "Lock your diary with a PIN or biometrics — even inside the app.",
    },
  ] satisfies IconItem[],
  link: "Read our privacy promise",
};

export const useCases = {
  eyebrow: "Made for real life",
  title: "One twin. Many kinds of busy.",
  tabsLabel: "Use cases",
  tabs: [
    {
      id: "students",
      label: "Students",
      icon: "graduation",
      scenario:
        "Lectures, group projects, exam dates and that one thing your professor said was “definitely on the test.” Capture it all by voice and find it when it matters.",
      moments: [
        "Record a 30-second summary after every lecture",
        "“When is the DBMS assignment due?” — answered instantly",
        "Remember which friend has your notes",
      ],
      card: {
        emoji: "🎙",
        meta: "Tue · 11:20 AM · Library",
        text: "Prof said Unit 4 normalization is on the test.",
      },
    },
    {
      id: "professionals",
      label: "Professionals",
      icon: "briefcase",
      scenario:
        "Meetings blur together. MindTwin keeps the decisions, the follow-ups and the “I'll send that by Friday” promises you made along the way.",
      moments: [
        "Standups summarized into three lines",
        "Follow-ups turned into reminders automatically",
        "“What did Rahul say about the budget?”",
      ],
      card: {
        emoji: "👤",
        meta: "Wed · 3:00 PM · with Rahul",
        text: "Budget: hold Q3 spend, revisit after the board review.",
      },
    },
    {
      id: "founders",
      label: "Founders",
      icon: "rocket",
      scenario:
        "Capture ideas on the go, remember every investor conversation, and get a weekly digest of what you shipped.",
      moments: [
        "Voice-note ideas between meetings",
        "Recall exactly what each investor asked",
        "A Sunday digest of the week's progress",
      ],
      card: {
        emoji: "💡",
        meta: "Mon · 8:05 AM · Auto rickshaw",
        text: "Pricing idea: annual plan with family seats.",
      },
    },
    {
      id: "parents",
      label: "Parents",
      icon: "baby",
      scenario:
        "School circulars, pediatrician advice, birthday party RSVPs and the name of that teacher. MindTwin holds the household's details so you don't have to.",
      moments: [
        "“When is the next PTM?” — with the date and room",
        "Doctor's advice saved straight from a voice note",
        "First words and little moments, kept forever",
      ],
      card: {
        emoji: "📍",
        meta: "Fri · 5:30 PM · Clinic",
        text: "Dr. Mehta: next vaccine due in 6 weeks.",
      },
    },
    {
      id: "journalers",
      label: "Journalers",
      icon: "book",
      scenario:
        "Keep a diary every night in one minute — just talk. Track your moods over months, and read what you felt exactly a year ago.",
      moments: [
        "A one-minute spoken entry before bed",
        "Mood trends across weeks and months",
        "“On this day” memories from a year ago",
      ],
      card: { emoji: "📔", meta: "Thu · 9:30 PM · Home", text: "“Tired, but happy.” · 😊 Happy" },
    },
  ] as const satisfies readonly {
    id: string;
    label: string;
    icon: IconName;
    scenario: string;
    moments: readonly string[];
    card: { emoji: string; meta: string; text: string };
  }[],
  momentsLabel: "MindTwin moments",
};

export const pricing = {
  eyebrow: "Pricing",
  title: "Simple pricing, when we launch.",
  sub: "Start free. Upgrade when your twin becomes indispensable.",
  note: "Pricing is indicative and may change before launch.",
  plans: [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Everything you need to start remembering.",
      features: [
        "50 memories / month",
        "Voice & text capture",
        "Spoken diary (1 entry/day, up to 3 min)",
        "Basic search",
      ],
      cta: "Join the waitlist",
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹249",
      period: "/month",
      note: "≈ $6",
      badge: "Early-access: 3 months free",
      description: "Your full-time twin.",
      features: [
        "Unlimited memories & diary",
        "Polished diary entries",
        "Mood insights & “On this day”",
        "Timeline & places",
        "Ask your twin",
        "Weekly reflections",
        "Priority support",
      ],
      highlighted: true,
      cta: "Join the waitlist",
    },
  ] satisfies Plan[],
  family: {
    id: "family",
    name: "Family",
    price: "Coming soon",
    description: "Pro for up to 5 people, plus optional shared family memories.",
    features: [
      "Everything in Pro, for up to 5 people",
      "Shared family memories (opt-in)",
      "Separate, private diaries for everyone",
    ],
    comingSoon: true,
    cta: "Get notified",
  } satisfies Plan,
  cta: "Join the waitlist",
  fullLink: "Compare plans",
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  items: [
    {
      q: "What exactly is MindTwin?",
      a: "MindTwin is a private AI memory for your phone. You capture thoughts by voice or text, it organizes them into memories — people, places, tasks, ideas and diary entries — and you can ask it anything about your own past.",
    },
    {
      q: "Can I use MindTwin as my diary?",
      a: "Yes. Speak or type your entries; keep your exact words or a polished version (your original audio and transcript are always kept). You can lock the diary separately with a PIN or biometrics.",
    },
    {
      q: "Is my data private? Who can see it?",
      a: "Only you. Your memories are encrypted in transit and at rest, they're never sold, and they're never used to train AI models. You can export or delete everything at any time.",
    },
    {
      q: "Does it track my location all the time?",
      a: "No. Location is off by default. If you turn it on, MindTwin uses battery-friendly significant-location updates to note places you spend time at — and you can pause or turn it off anytime.",
    },
    {
      q: "Which languages does it understand?",
      a: "At launch we're focusing on English, Hindi, Gujarati and Hinglish — including switching between them mid-sentence. More Indian languages are on the roadmap.",
    },
    {
      q: "Will there be a web app or only mobile?",
      a: "MindTwin is mobile-first, on iOS and Android. A web dashboard for browsing your timeline and asking your twin from a laptop will follow.",
    },
    {
      q: "How much will it cost?",
      a: "There will be a free plan, and Pro is planned at ₹249/month (about $6). Waitlist members get 3 months of Pro free. Pricing is indicative and may change before launch.",
    },
    {
      q: "When can I start using it?",
      a: "We're opening early access in small batches soon. Join the waitlist and we'll email you once — when your spot is ready.",
    },
  ] satisfies FaqItem[],
};

export const finalCta = {
  title: "Give your mind a twin.",
  sub: "Be among the first to try MindTwin. Early members get 3 months of Pro free.",
  reassurance: "No spam. One email when we launch. Unsubscribe anytime.",
};

/* ------------------------------------------------------------------ */
/* Secondary pages                                                     */
/* ------------------------------------------------------------------ */

export const featuresPage = {
  meta: {
    title: "Features",
    description:
      "Voice-first notes, a spoken diary, a timeline of your day, smart reminders and a twin you can ask anything — all private by design.",
  },
  eyebrow: "Features",
  title: "A memory that works the way you do.",
  sub: "Every MindTwin feature starts from one idea: you should be able to remember anything, without organizing anything.",
  sections: [
    {
      id: "voice",
      icon: "mic",
      title: "Voice-first notes",
      body: "Speak naturally in English, Hindi, Gujarati or Hinglish. MindTwin turns rambling into clean, searchable notes — with the time and place attached.",
      points: [
        "Works offline, syncs later",
        "Mixed-language speech",
        "Auto-tags people, tasks and ideas",
      ],
      mockup: "voice",
    },
    {
      id: "timeline",
      icon: "calendarClock",
      title: "Your day, as a timeline",
      body: "See where you were, who you met and what you did — hour by hour. Location is optional and off by default.",
      points: [
        "Places you spent time at",
        "Notes and conversations in context",
        "Filter by people, places or diary",
      ],
      mockup: "timeline",
    },
    {
      id: "ask",
      icon: "ask",
      title: "Ask your twin",
      body: "Ask questions in plain language and get answers grounded in your own memories — with the exact source, so you can trust it.",
      points: [
        "Answers cite their source memory",
        "Understands time: “last week”, “in March”",
        "Never guesses beyond your data",
      ],
      mockup: "ask",
    },
    {
      id: "reminders",
      icon: "bell",
      title: "Smart reminders",
      body: "“Remind me when I reach the office.” MindTwin turns what you say into time- and place-based nudges.",
      points: [
        "Time, place or person triggers",
        "Created straight from voice notes",
        "Gentle, never naggy",
      ],
      mockup: "reminders",
    },
    {
      id: "people",
      icon: "users",
      title: "People memory",
      body: "Remember what you discussed with whom, and when — so every conversation picks up where you left off.",
      points: [
        "A private page for each person",
        "Promises and follow-ups tracked",
        "Initials only — no contact syncing required",
      ],
      mockup: "people",
    },
    {
      id: "reflection",
      icon: "chart",
      title: "Weekly reflection",
      body: "A gentle Sunday summary: ideas captured, places visited, habits forming. A minute of perspective, every week.",
      points: ["Ideas and tasks recap", "Habits and patterns", "Your best moment of the week"],
      mockup: "reflection",
    },
  ] as const satisfies readonly {
    id: string;
    icon: IconName;
    title: string;
    body: string;
    points: readonly string[];
    mockup: "voice" | "timeline" | "ask" | "reminders" | "people" | "reflection";
  }[],
  diarySection: {
    eyebrow: "📔 The diary",
    title: "A diary you'll actually keep.",
    sub: "Speak for a minute at night. MindTwin writes it down, notes the mood, and keeps it locked — just for you.",
    heatmapTitle: "Your month in moods",
    heatmapLegend: [
      { level: 0, label: "No entry" },
      { level: 1, label: "Low" },
      { level: 2, label: "Okay" },
      { level: 3, label: "Good" },
      { level: 4, label: "Great" },
    ],
    // 35 cells (5 weeks). 0 = no entry, 1–4 = mood level. Sample data.
    heatmap: [
      3, 2, 3, 4, 0, 3, 3, 2, 1, 3, 3, 4, 3, 0, 3, 3, 2, 3, 4, 4, 3, 2, 3, 0, 3, 3, 4, 3, 3, 2, 4,
      3, 0, 0, 0,
    ],
    onThisDay: {
      label: "On this day · 1 year ago",
      date: "9 October 2025",
      text: "“First day at the new office. Nervous, but the team feels kind. Bought a plant for my desk.”",
      mood: "🌱 Hopeful",
    },
  },
  roadmap: {
    title: "Coming later",
    sub: "On the roadmap after launch. Shaped by early members.",
    items: [
      {
        icon: "image",
        title: "Photo memories",
        body: "Attach photos and let your twin remember what's in them.",
      },
      {
        icon: "calendar",
        title: "Calendar sync",
        body: "Meetings become memories, with notes attached.",
      },
      { icon: "watch", title: "Wearable integration", body: "Capture a thought from your wrist." },
      {
        icon: "family",
        title: "Shared family memories",
        body: "Opt-in spaces for the moments you share.",
      },
    ] satisfies IconItem[],
  },
};

export const howItWorksPage = {
  meta: {
    title: "How it works",
    description:
      "Capture by voice or text, let MindTwin understand and organize it, keep it in an encrypted memory vault, and ask your twin anything.",
  },
  eyebrow: "How it works",
  title: "From a passing thought to a memory you can ask about.",
  sub: "No folders. No tags to manage. Here's what happens behind the scenes — in plain language.",
  steps: [
    {
      icon: "mic",
      title: "1. Capture",
      body: "Tap once and talk, or type a quick note. End the day with a spoken diary entry. If you choose to, MindTwin can also note the places you spend time at.",
      details: [
        "Voice notes in English, Hindi, Gujarati or Hinglish",
        "Quick text notes and spoken diary entries",
        "Optional places — off by default",
      ],
    },
    {
      icon: "sparkles",
      title: "2. Understand",
      body: "MindTwin transcribes what you said, writes a short summary and picks out the important bits: people, places, tasks, dates and ideas.",
      details: [
        "Accurate transcripts, with the original audio kept",
        "Summaries you can edit",
        "Tasks become reminders automatically",
      ],
    },
    {
      icon: "lock",
      title: "3. Keep it safe",
      body: "Every memory goes into your memory vault — encrypted in transit and at rest. Your diary can be locked separately with a PIN or biometrics.",
      details: [
        "Encrypted memory vault",
        "Separate diary lock",
        "Export or delete everything anytime",
      ],
    },
    {
      icon: "ask",
      title: "4. Ask",
      body: "Ask a question the way you'd ask a friend. Your twin searches your memories, answers in a sentence or two, and shows the exact memory it used.",
      details: [
        "Plain-language questions",
        "Answers with sources",
        "If it doesn't know, it says so",
      ],
    },
  ] satisfies (IconItem & { details: string[] })[],
  diagram: {
    title: "The journey of a memory",
    nodes: [
      { icon: "mic", label: "Capture", sub: "Voice · text · places" },
      { icon: "sparkles", label: "Understand", sub: "Transcribe · summarize · organize" },
      { icon: "lock", label: "Memory vault", sub: "Encrypted, yours" },
      { icon: "ask", label: "Ask", sub: "Answers with sources" },
    ] satisfies { icon: IconName; label: string; sub: string }[],
  },
};

// TODO(legal): review privacy promise wording with counsel before launch.
export const privacyPromisePage = {
  meta: {
    title: "Privacy promise",
    description:
      "MindTwin's plain-language privacy commitments: encrypted memories, location off by default, never sold, never used to train AI, and export or delete anytime.",
  },
  eyebrow: "Privacy promise",
  title: "The promise behind every memory.",
  sub: "You're trusting MindTwin with your thoughts, your days and your diary. Here's exactly what we commit to — in plain language.",
  commitments: privacy.principles,
  table: {
    title: "What we collect — and what we never do",
    collectTitle: "What we collect (only to make MindTwin work)",
    collect: [
      "The notes, voice recordings and diary entries you choose to capture",
      "Places you spend time at — only if you turn location on",
      "Your email address, to sign you in and send essential updates",
      "Basic, anonymous app diagnostics to fix crashes (you can opt out)",
    ],
    neverTitle: "What we never do",
    never: [
      "Sell your data — to anyone, ever",
      "Use your memories to train AI models",
      "Show you ads or share data with advertisers",
      "Track your location in the background without your permission",
      "Read your diary — it's locked, even inside the app",
    ],
  },
  controls: {
    title: "Your controls",
    items: [
      {
        icon: "toggle",
        title: "Senses on/off",
        body: "Turn microphone, location or reminders on or off individually.",
      },
      {
        icon: "download",
        title: "Export everything",
        body: "Download all your memories in an open format.",
      },
      {
        icon: "trash",
        title: "Delete everything",
        body: "Erase your account and every memory, permanently.",
      },
      {
        icon: "key",
        title: "Diary lock",
        body: "A separate PIN or biometric lock for your diary.",
      },
    ] satisfies IconItem[],
  },
  regulations:
    "We're designing MindTwin to meet India's Digital Personal Data Protection (DPDP) Act, 2023 and the EU's GDPR from day one.",
  contactTitle: "Questions about privacy?",
  contactBody: "Write to us anytime. A real person reads every message.",
  legalLink: "Read the privacy policy (draft)",
};

export const pricingPage = {
  meta: {
    title: "Pricing",
    description:
      "MindTwin pricing: a free plan to start, Pro at ₹249/month with 3 months free for early members, and a Family plan coming soon.",
  },
  eyebrow: "Pricing",
  title: "Simple, honest pricing.",
  sub: "Start free. Waitlist members get 3 months of Pro on us.",
  comparison: {
    title: "Compare plans",
    columns: ["Free", "Pro", "Family"],
    rows: [
      { feature: "Memories per month", values: ["50", "Unlimited", "Unlimited"] },
      { feature: "Voice & text capture", values: [true, true, true] },
      { feature: "Spoken diary", values: ["1/day, up to 3 min", "Unlimited", "Unlimited"] },
      { feature: "Polished diary entries", values: [false, true, true] },
      { feature: "Mood insights & “On this day”", values: [false, true, true] },
      { feature: "Timeline & places", values: [false, true, true] },
      { feature: "Ask your twin", values: [false, true, true] },
      { feature: "Weekly reflections", values: [false, true, true] },
      { feature: "Search", values: ["Basic", "Full", "Full"] },
      { feature: "Shared family memories", values: [false, false, true] },
      { feature: "Priority support", values: [false, true, true] },
    ] as { feature: string; values: (string | boolean)[] }[],
  },
  faq: [
    {
      q: "Is the free plan really free?",
      a: "Yes. No card needed, no trial timer. The free plan is meant to be genuinely useful on its own.",
    },
    {
      q: "What does “3 months free” mean for early members?",
      a: "Everyone who joins the waitlist before launch gets Pro free for their first 3 months. After that you can continue on Pro or move to the free plan — your memories stay either way.",
    },
    {
      q: "What happens to my memories if I downgrade?",
      a: "Nothing is deleted. You keep access to everything you've captured; only Pro features like Ask your twin and polished entries pause.",
    },
    {
      q: "Will prices change?",
      a: "Possibly — pricing is indicative until launch. We'll always tell you before anything changes, and early members will be looked after.",
    },
  ] satisfies FaqItem[],
};

export const aboutPage = {
  meta: {
    title: "About",
    description:
      "MindTwin's mission is to help people think more and remember less. Meet the team, our story and the values we build by.",
  },
  eyebrow: "About",
  title: "Help people think more and remember less.",
  sub: "That's the whole mission. Everything else is detail.",
  story: {
    title: "Why MindTwin exists",
    // TODO: replace [Founder Name] with the real founder's name and refine the story.
    paragraphs: [
      "We started MindTwin after one too many “wait, what did we decide?” moments. Ideas lost between meetings. Promises made to friends and quietly forgotten. Diaries started every January and abandoned by February.",
      "[Founder Name] kept a notes app, three to-do lists, a journal and a habit of sending voice notes to themself on WhatsApp. None of them talked to each other, and none of them could answer the simplest question: “When did I last…?”",
      "So we're building the thing we wanted: a calm, private companion that listens when you want it to, organizes everything quietly, and answers when you ask. Not another productivity app to maintain — a twin that does the remembering, so you can do the living.",
      "We're a small team building from India, for people everywhere who think in more than one language.",
    ],
  },
  values: {
    title: "What we believe",
    items: [
      {
        icon: "shield",
        title: "Privacy first",
        body: "Your memories are the most personal data there is. We design for privacy before features, every time.",
      },
      {
        icon: "leaf",
        title: "Calm technology",
        body: "No streaks to guilt you, no feeds to scroll. MindTwin should make your day quieter, not louder.",
      },
      {
        icon: "heart",
        title: "Built for real life",
        body: "Mixed languages, noisy cafés, tired nights. We build for how people actually live — not how demos look.",
      },
    ] satisfies IconItem[],
  },
  hiring: {
    title: "We're hiring soon",
    body: "If you care about privacy, language and calm software, we'd love to hear from you.",
    cta: "Say hello",
  },
};

export const waitlistPage = {
  meta: {
    title: "Join the waitlist",
    description:
      "Join the MindTwin early-access waitlist. Early members get 3 months of Pro free and help shape the product.",
  },
  eyebrow: "Early access",
  title: "Be first to meet your twin.",
  sub: "We're opening MindTwin in small batches. Join the list and we'll email you once — when your spot is ready.",
  benefits: [
    {
      icon: "sparkles",
      title: "3 months of Pro, free",
      body: "Every early member gets Pro on us for their first three months.",
    },
    {
      icon: "users",
      title: "Shape the product",
      body: "Early members get a direct line to the team and a say in what we build next.",
    },
    {
      icon: "languages",
      title: "Your language, first",
      body: "Tell us which languages you speak — we'll prioritize them.",
    },
  ] satisfies IconItem[],
};

export const notFoundPage = {
  title: "Even your twin can't remember this page.",
  body: "The page you're looking for doesn't exist — or maybe it never did.",
  cta: "Take me home",
};

export const legal = {
  draftBanner: "Draft — to be reviewed by legal counsel before launch.",
  privacy: {
    meta: { title: "Privacy policy", description: "MindTwin privacy policy (draft)." },
    title: "Privacy policy",
    updated: "Last updated: October 2026 (draft)",
  },
  terms: {
    meta: { title: "Terms of service", description: "MindTwin terms of service (draft)." },
    title: "Terms of service",
    updated: "Last updated: October 2026 (draft)",
  },
};
