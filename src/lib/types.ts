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

export type MilestoneStatus = "done" | "now" | "next";

export interface Member {
  name: string;
  role: RoleId;
}

export interface Milestone {
  title: string;
  when: string;
  status: MilestoneStatus;
}

export interface Update {
  date: string;
  title: string;
  body: string;
}

export interface Team {
  id: string;
  name: string;
  initials: string;
  color: string;
  product: string;
  tagline: string;
  description: string;
  /** Judges' score out of 100. Decides ranking. */
  score: number;
  /** Public votes before this visitor's own vote. */
  votes: number;
  prevRank: number;
  demo: string;
  progress: Record<RoleId, number>;
  members: Member[];
  milestones: Milestone[];
  updates: Update[];
}

/** A team enriched with derived, visitor-specific state. */
export interface RankedTeam extends Team {
  rank: number;
  voted: boolean;
  /** Mean progress across all departments, 0–100. */
  overall: number;
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
