import type { Team } from "../lib/types";

export const TEAMS: readonly Team[] = [
  {
    id: "node-kraft",
    name: "NODE KRAFT",
    initials: "NK",
    color: "#A970FF",
    product: "SafeSign",
    tagline: "Verify crypto payments on-chain instead of trusting screenshots.",
    description:
      "SafeSign helps people verify crypto payments before trusting them. Paste a transaction hash to confirm on the blockchain whether it exists and succeeded, who sent and received it, and the amount. It can also compare a payment with what you expected in plain English or any of at least eight available languages.",
    problem:
      "Crypto payments can be difficult to verify, and scammers exploit that uncertainty. SafeSign lets anyone check whether a payment happened, succeeded, reached the right wallet, and used the right amount and token.",
    features: [
      "Transaction verification: check a transaction's real status, sender, recipient, amount, and confirmations directly on-chain.",
      "Payment matching: compare a transaction with the payment you expected to receive.",
      "Token authenticity: flag tokens that do not use a trusted contract.",
    ],
    difference:
      "Unlike block explorers that require users to interpret raw data or wallet tools that focus on the moment of signing, SafeSign checks a payment after it is sent and compares it with expectations in plain language—without connecting a wallet.",
    functional: ["Reporting & Analytics"],
    technologies: ["Lovable AI", "Claude", "ChatGPT", "Alchemy API", "GoPlus API", "Virus API"],
    lead: "Okonkwo Chisom Diamond",
    demo: "https://sign-before-you-shield.vercel.app/",
    repository: "https://github.com/chisomdoc157-wq/sign-before-you-shield",
  },
  {
    id: "el-nino",
    name: "El Nino",
    initials: "EN",
    color: "#4C9DFF",
    product: "El Nino",
    tagline: "Smart farming with live farm monitoring and AI-powered guidance.",
    description:
      "El Nino combines IoT sensors, hardware, and software to monitor farm conditions in real time, visualize crop environments through a digital twin, and provide AI-driven insights to help farmers make informed decisions.",
    problem:
      "Smallholder farmers face limited market information, late detection of crop disease, unpredictable weather and flooding, scarce agricultural extension services, and dry-season fires that can destroy crops and farmland.",
    features: [
      "Proactive disaster prevention: IoT sensors detect rain, flash flooding, and dry-season wildfires and provide mitigation steps.",
      "Crop disease diagnosis: analyze uploaded crop images and get potential diagnoses, treatments, and prevention guidance.",
      "AI agricultural assistant: get guidance on soil management, fertilizer, pest control, and crop care.",
    ],
    difference:
      "El Nino combines IoT-powered farm monitoring, an interactive digital twin, AI crop-disease diagnosis, and an agricultural assistant in one platform, connecting physical farm conditions with software guidance.",
    functional: ["Core Dashboard", "Database", "Reporting & Analytics"],
    technologies: ["Gemini 3.1 Flash Lite", "@google/genai SDK"],
    lead: "Prince Chidera",
    demo: "https://elnino-three.vercel.app",
    repository: "https://github.com/prince24-web/El-nino",
  },
  {
    id: "confam",
    name: "Confam",
    initials: "CF",
    color: "#2BD4B4",
    product: "Confam",
    tagline: "Social-commerce escrow and motor-park delivery tracking in one link.",
    description:
      "Confam combines payment escrow, video-based order verification, and inter-state delivery tracking in a shareable web link. Buyers can lock funds without creating an account; sellers provide packing proof and a waybill, and buyers release payment after inspecting the delivery.",
    problem:
      "Buyers and sellers on social platforms face payment and delivery fraud, while informal motor-park shipments often have no reliable way to track a package after dispatch.",
    features: [
      "Proof-of-pack video: record or upload packing evidence, with SHA-256 hashing and AI video checks.",
      "Waybill scanning and driver location sharing: extract delivery details from a waybill and let drivers share location through a browser link.",
      "Paystack escrow and release OTP: hold payment until the buyer inspects the delivery and enters a release code.",
    ],
    difference:
      "Confam is designed for informal motor-park deliveries rather than requiring expensive couriers. It combines pre-dispatch packing checks, waybill tracking, and escrow without requiring buyers or drivers to install an app or register.",
    functional: ["User authentication", "Database"],
    technologies: ["Google Gemini 3.8 Flash API", "Paystack API", "Browser Hardware APIs", "Web Crypto API"],
    lead: "Akinyemi Emmanuel Oluwadamilare",
    demo: "https://confamhq.vercel.app/",
    repository: "https://github.com/confam-hq/confam",
  },
  {
    id: "o-labs",
    name: "O_Labs",
    initials: "OL",
    color: "#8B5CF6",
    product: "KreatrDesk",
    tagline: "Decentralized UGC commerce engine with smart contract escrows and multimodal AI QA.",
    description:
      "KreatrDesk is a decentralized UGC commerce and escrow platform connecting African brands with content creators. It replaces vanity metrics with zero-trust smart contract escrows on Base, automated AI deliverable validation against campaign briefs, and direct WhatsApp attribution links.",
    problem:
      "In emerging African markets, brands face high deposit loss from creator ghosting, pay substantial fees for vanity engagement that fails to convert to sales, and lack attribution tools. Concurrently, skilled creators without large followings are excluded from brand deals.",
    features: [
      "Dual-Rail Escrow Vaults: Secure escrow funding in local fiat Naira or Base Sepolia USDC, auto-releasing only upon verified milestone completion.",
      "Multimodal Gemini AI Quality Assurance: Automated video evaluation verifying product visibility, audio clarity, and creative brief requirements prior to human payout approval.",
      "5-Pillar Credibility & WhatsApp Attribution: Evaluates creators based on delivery reliability and creative quality rather than follower count, tracking sales through unique referral links.",
    ],
    difference:
      "Bridges Web3 trustlessness and local African commerce by pairing Base L2 smart contract escrow vaults with dual-rail fiat Naira rails (via Roqqu), multimodal AI brief compliance checking, and conversion telemetry directly into WhatsApp.",
    functional: ["User Authentication", "Core Dashboard", "Database", "Reporting & Analytics"],
    technologies: [
      "Google Gemini Multimodal (via OpenRouter)",
      "Base Sepolia (Ethereum L2 Smart Contracts)",
      "Roqqu API Services (RAS)",
      "Cloudinary CDN",
      "MongoDB Atlas / Mongoose",
      "Viem / Wagmi & RainbowKit",
    ],
    lead: "Legend4tech",
    demo: "https://kreatr-desk.vercel.app/",
    repository: "https://github.com/legend4tech/KreatrDesk",
  },
  {
    id: "aboyun",
    name: "Aboyun",
    initials: "AB",
    color: "#EC4899",
    product: "Aboyun",
    tagline: "Offline-first multilingual maternal health platform reaching mothers via app, SMS, and USSD.",
    description:
      "Aboyun is an offline-first maternal health app designed for pregnant and nursing mothers in remote communities. It operates in indigenous languages (Pidgin, Hausa, Yoruba, Igbo, and English) across basic phones (SMS/USSD) and offline web apps, while equipping clinics with a triage dashboard to monitor high-risk patients.",
    problem:
      "Nigeria accounts for an estimated 28.5% of maternal deaths globally, primarily from preventable complications, missed clinic appointments, lack of local language guidance, and lack of internet access in rural communities.",
    features: [
      "Built for Every Phone & Language: Offline PWA capabilities plus SMS and USSD functionality supporting English, Pidgin, Hausa, Yoruba, and Igbo.",
      "One-Touch Emergency Alert: 1-tap app trigger or USSD dial to notify healthcare providers, family members, and transport contacts concurrently.",
      "Early Warning & Clinical Triage: Danger-sign assessments flag high-risk mothers dynamically on the clinic provider dashboard.",
    ],
    difference:
      "Does not require a smartphone, active internet connection, or English literacy. Works across USSD, SMS, and offline PWA service workers, linking mothers, families, and clinic staff into a single notification and triaging loop.",
    functional: ["User Authentication", "Core Dashboard", "Database", "Reporting & Analytics"],
    technologies: [
      "Africa's Talking API (USSD & SMS)",
      "Resend API",
      "Better Auth",
      "PostgreSQL with Prisma",
      "Next.js",
      "Serwist & Dexie (IndexedDB Service Workers)",
    ],
    lead: "Godwin Emeribe",
    demo: "https://aboyun.vercel.app/",
    repository: "https://github.com/Godwin57/aboyun",
  },
  {
    id: "kobog",
    name: "KOBOG",
    initials: "KB",
    color: "#F97316",
    product: "KOBOG",
    tagline: "AI-powered organizational operating system for governed multi-agent workflows.",
    description:
      "KOBOG is an AI organizational operating system that allows enterprises to create, manage, and deploy specialized AI agents within a governed workspace. It combines long-term organizational memory, workflow automation, and role-based agent management to preserve institutional knowledge and scale operations.",
    problem:
      "Enterprises experience fragmented operational knowledge, disjointed software workflows, and a lack of unified governance, security, and administrative oversight when deploying AI assistants.",
    features: [
      "Persistent Organizational Memory: Centralized knowledge base ensuring AI agents retain organizational context and documentation over time.",
      "Specialized AI Agent Management: Fine-grained creation and assignment of domain-specific agents with custom tool access and operational roles.",
      "Governed Workflow Automation: Multi-agent orchestration with auditability and compliance guardrails aligned with enterprise objectives.",
    ],
    difference:
      "Rather than functioning as an isolated point-solution chatbot or discrete automation pipeline, KOBOG serves as a unified multi-agent operating system incorporating persistent memory, role-based agent permissions, and organizational governance.",
    functional: ["Core Dashboard"],
    technologies: [
      "Python",
      "Supabase (PostgreSQL Auth & Database)",
      "Model Context Protocol (MCP)",
      "Obsidian Knowledge Management",
      "Hermes Agent Orchestration",
    ],
    lead: "Okakoso Jeff",
    demo: "https://kobogproject.lovable.app",
    repository: "https://github.com/aweleokwuosa-sudo/kobog-intelligence-hub",
  },
  {
    id: "skillbridge",
    name: "SkillBridge",
    initials: "SB",
    color: "#0EA5E9",
    product: "SkillBridge",
    tagline: "Skill-to-income enablement platform connecting personal talents to market opportunities.",
    description:
      "SkillBridge is a career and skill monetization platform that helps individuals audit their existing abilities, match with market-viable income opportunities, upskill through guided roadmaps, and generate professional portfolios to attract clients.",
    problem:
      "Many individuals possess marketable skills but lack guidance on how to monetize them, which client segments need them, where their capability gaps lie, and how to effectively showcase their portfolio.",
    features: [
      "Skill Assessment & Opportunity Matching: Audits current user capabilities and suggests tailored income channels and client niches.",
      "Personalized Learning Paths: Identifies specific skill deficits and prescribes structured micro-learning tracks.",
      "Portfolio Builder: Streamlines the creation of client-facing project portfolios showcasing verified abilities and case studies.",
    ],
    difference:
      "Unlike traditional ed-tech platforms that strictly focus on courses or job boards focused solely on openings, SkillBridge links the complete lifecycle from skill assessment and monetization matching to portfolio creation.",
    functional: ["User Authentication", "Core Dashboard", "Database", "Reporting & Analytics"],
    technologies: ["Python FastAPI (Backend API)", "Google Gemini API"],
    lead: "Amadi Ogochukwu",
    demo: "https://useskillbridge.vercel.app",
    repository: "https://github.com/useskillbridge/skillbridge",
  },
];
