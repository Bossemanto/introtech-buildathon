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
    name: "El Nino Team 8 (Buildathon Group 8)",
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
];
