import type { Role, RoleId } from "../lib/types";

export const ROLES: readonly Role[] = [
  {
    id: "builder",
    name: "AI Builder",
    short: "AI Builder",
    mono: "Ab",
    color: "#A970FF",
    icon: "bolt",
    blurb: "Turns an idea into a working product fast, with no-code and AI tools.",
  },
  {
    id: "engineer",
    name: "AI Engineer",
    short: "AI Engineer",
    mono: "Ae",
    color: "#4C9DFF",
    icon: "code",
    blurb: "Owns the models, data and code that make the product actually work.",
  },
  {
    id: "security",
    name: "Cybersecurity Engineer",
    short: "Cybersecurity",
    mono: "Cy",
    color: "#F6C452",
    icon: "shield",
    blurb: "Tries to break it before anyone else does, then helps fix it.",
  },
  {
    id: "creator",
    name: "Creator & Content Creator",
    short: "Creator / Content",
    mono: "Cr",
    color: "#FF4D8F",
    icon: "video",
    blurb: "Tells the story: demos, videos, posts and the pitch people remember.",
  },
  {
    id: "marketing",
    name: "Digital Marketer",
    short: "Digital Marketing",
    mono: "Dm",
    color: "#2BD4B4",
    icon: "megaphone",
    blurb: "Finds the first users and gets the public to vote.",
  },
];

export function getRole(id: RoleId): Role {
  const role = ROLES.find((r) => r.id === id);
  if (!role) throw new Error(`Unknown role: ${id}`);
  return role;
}
