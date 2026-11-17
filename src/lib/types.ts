export type IconName =
  | "arrow-right"
  | "external"
  | "check"
  | "menu"
  | "close"
  | "calendar"
  | "pin"
  | "clock"
  | "trophy"
  | "medal"
  | "laptop"
  | "bolt"
  | "code"
  | "shield"
  | "video"
  | "megaphone"
  | "users"
  | "trend-up"
  | "trend-down"
  | "minus"
  | "spark"
  | "cursor";

export type RoleId = "builder" | "engineer" | "security" | "creator" | "marketing";

export interface Role {
  id: RoleId;
  name: string;
  short: string;
  /** Two-letter monogram shown on role tiles. */
  mono: string;
  color: string;
  /** Sprite symbol name, see src/partials/icons.html. */
  icon: IconName;
  blurb: string;
}

export interface Team {
  id: string;
  name: string;
  initials: string;
  color: string;
  product: string;
  tagline: string;
  description: string;
  problem: string;
  features: string[];
  difference: string;
  functional: string[];
  technologies: string[];
  lead: string;
  demo: string;
  repository: string;
}

/** A team enriched with votes stored in this visitor's browser. */
export interface VotableTeam extends Team {
  votes: number;
  voted: boolean;
}

export interface Registration {
  role: RoleId;
  name: string;
  email: string;
  whatsapp: string;
  portfolio: string;
  experience: string;
  contribution: string;
}
