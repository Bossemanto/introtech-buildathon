import type { Milestone, MilestoneStatus, Team } from "../lib/types";

/** Shorthand for the standard four-week milestone track. */
function track(...statuses: [MilestoneStatus, MilestoneStatus, MilestoneStatus, MilestoneStatus]): Milestone[] {
  const steps = ["Team formed", "Working prototype", "Security review", "Public demo day"];
  return steps.map((title, i) => ({ title, when: `Week ${i + 1}`, status: statuses[i]! }));
}

/**
 * Prototype data, shaped like rows from Airtable / Supabase.
 * Swap `src/lib/api.ts` to fetch from a backend instead.
 */
export const TEAMS: readonly Team[] = [
  {
    id: "kora-labs",
    name: "Kora Labs",
    initials: "KL",
    color: "#A970FF",
    product: "Ledgerline",
    tagline: "Bookkeeping for market traders, kept through WhatsApp voice notes.",
    description:
      "Traders send a voice note after each sale. Ledgerline transcribes it in English, Pidgin or Yoruba, keeps the books, and sends a simple daily summary.",
    score: 91.4,
    votes: 2148,
    prevRank: 2,
    demo: "https://ledgerline.demo.introtech.ng",
    progress: { builder: 82, engineer: 76, security: 68, creator: 91, marketing: 73 },
    members: [
      { name: "Tolu Adebayo", role: "builder" },
      { name: "Chidi Okafor", role: "engineer" },
      { name: "Ifeoma Nwosu", role: "security" },
      { name: "Bisola Ade", role: "creator" },
      { name: "Musa Danjuma", role: "marketing" },
    ],
    milestones: track("done", "done", "now", "next"),
    updates: [
      {
        date: "Oct 4",
        title: "Voice notes in Yoruba now transcribe correctly",
        body: "Accuracy went from 71% to 88% after retraining on 400 market recordings.",
      },
      {
        date: "Oct 2",
        title: "First 40 traders onboarded at Balogun market",
        body: "Musa ran a stand at the market entrance for two mornings.",
      },
      { date: "Sep 29", title: "Prototype live", body: "Daily summaries now arrive at 8pm on WhatsApp." },
    ],
  },
  {
    id: "third-mainland",
    name: "Third Mainland",
    initials: "TM",
    color: "#4C9DFF",
    product: "Tutor Thirteen",
    tagline: "WAEC revision tutor that explains in Pidgin or English.",
    description:
      "Students photograph a past question. Tutor Thirteen walks through the answer step by step and sets a short follow-up quiz.",
    score: 89.7,
    votes: 2610,
    prevRank: 1,
    demo: "https://tutor13.demo.introtech.ng",
    progress: { builder: 88, engineer: 81, security: 62, creator: 84, marketing: 90 },
    members: [
      { name: "Amaka Eze", role: "builder" },
      { name: "Kunle Bello", role: "engineer" },
      { name: "Zainab Yusuf", role: "security" },
      { name: "Efe Omoregie", role: "creator" },
      { name: "Seun Akin", role: "marketing" },
    ],
    milestones: track("done", "done", "now", "next"),
    updates: [
      {
        date: "Oct 3",
        title: "1,200 students tried it this week",
        body: "Mostly through three school WhatsApp groups in Surulere.",
      },
      { date: "Sep 30", title: "Maths and physics supported", body: "Chemistry diagrams are next." },
    ],
  },
  {
    id: "blackbox",
    name: "Blackbox",
    initials: "Bx",
    color: "#F6C452",
    product: "Shieldwall",
    tagline: "Catches phishing and fake transfer alerts in small business inboxes.",
    description:
      "Shieldwall checks emails and SMS alerts against known scam patterns and flags fake bank credit alerts before staff release goods.",
    score: 87.2,
    votes: 1534,
    prevRank: 3,
    demo: "https://shieldwall.demo.introtech.ng",
    progress: { builder: 70, engineer: 85, security: 96, creator: 66, marketing: 61 },
    members: [
      { name: "Daniel Etim", role: "security" },
      { name: "Halima Sani", role: "engineer" },
      { name: "Obi Uche", role: "builder" },
      { name: "Rita Okon", role: "creator" },
      { name: "Femi Ola", role: "marketing" },
    ],
    milestones: track("done", "done", "done", "now"),
    updates: [
      {
        date: "Oct 4",
        title: "Flagged 37 fake credit alerts in pilot shops",
        body: "Zero false positives on real alerts so far.",
      },
      { date: "Oct 1", title: "Red-team week complete", body: "Every other team's product was tested by Daniel." },
    ],
  },
  {
    id: "harmattan",
    name: "Harmattan",
    initials: "Hm",
    color: "#FF4D8F",
    product: "Farmgate",
    tagline: "Daily crop prices for smallholder farmers, by SMS.",
    description:
      "Farmgate collects prices from buyers in nearby markets and sends farmers the best place to sell each morning, no smartphone needed.",
    score: 84.9,
    votes: 1902,
    prevRank: 5,
    demo: "https://farmgate.demo.introtech.ng",
    progress: { builder: 79, engineer: 72, security: 58, creator: 88, marketing: 80 },
    members: [
      { name: "Ngozi Ibe", role: "builder" },
      { name: "Yakubu Garba", role: "engineer" },
      { name: "Lanre Shittu", role: "security" },
      { name: "Joy Udo", role: "creator" },
      { name: "Kemi Fash", role: "marketing" },
    ],
    milestones: track("done", "done", "now", "next"),
    updates: [
      {
        date: "Oct 3",
        title: "Price feed covers 6 markets in Kaduna",
        body: "Buyers update prices by replying to an SMS.",
      },
    ],
  },
  {
    id: "okada",
    name: "Okada Collective",
    initials: "OC",
    color: "#2BD4B4",
    product: "RouteSense",
    tagline: "Smarter dispatch for delivery riders in Lagos traffic.",
    description:
      "RouteSense groups deliveries and suggests rider routes using live traffic reports from the riders themselves.",
    score: 81.3,
    votes: 1287,
    prevRank: 4,
    demo: "https://routesense.demo.introtech.ng",
    progress: { builder: 74, engineer: 69, security: 64, creator: 72, marketing: 77 },
    members: [
      { name: "Emeka Obi", role: "engineer" },
      { name: "Sade Bankole", role: "builder" },
      { name: "Ahmed Bala", role: "security" },
      { name: "Tife Ojo", role: "creator" },
      { name: "Uche Nnaji", role: "marketing" },
    ],
    milestones: track("done", "now", "next", "next"),
    updates: [{ date: "Oct 2", title: "Pilot with 12 riders in Yaba", body: "Average delivery time down 14 minutes." }],
  },
  {
    id: "signal-noise",
    name: "Signal & Noise",
    initials: "SN",
    color: "#C49BFF",
    product: "Clinic Queue",
    tagline: "SMS queueing and triage for primary health centres.",
    description:
      "Patients join the queue by SMS and get called back when it's their turn, so nobody waits outside all morning.",
    score: 78.6,
    votes: 964,
    prevRank: 6,
    demo: "https://clinicqueue.demo.introtech.ng",
    progress: { builder: 68, engineer: 63, security: 71, creator: 60, marketing: 55 },
    members: [
      { name: "Funmi Alabi", role: "builder" },
      { name: "Ikenna Eze", role: "engineer" },
      { name: "Grace Akpan", role: "security" },
      { name: "Bayo Lawal", role: "creator" },
      { name: "Nkechi Obi", role: "marketing" },
    ],
    milestones: track("done", "now", "next", "next"),
    updates: [{ date: "Oct 1", title: "Talking to two PHCs in Ibadan", body: "Testing starts next week." }],
  },
];
