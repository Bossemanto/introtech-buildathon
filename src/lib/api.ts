import { TEAMS } from "../data/teams";
import { storage } from "./storage";
import type { RankedTeam, Registration, Team } from "./types";

/**
 * Data access layer. Every consumer goes through these functions, so
 * replacing localStorage with fetch() calls is a change to this file only.
 */

const VOTES_KEY = "itb-votes";
const REGISTRATIONS_KEY = "itb-registrations";

function myVotes(): Set<string> {
  return new Set(storage.get<string[]>(VOTES_KEY, []));
}

function withState(team: Team, votes: Set<string>): Omit<RankedTeam, "rank"> {
  const voted = votes.has(team.id);
  const values = Object.values(team.progress);
  const overall = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  return { ...team, votes: team.votes + (voted ? 1 : 0), voted, overall };
}

/** Teams ordered by judges' score; public votes break ties. */
export function getRankedTeams(): RankedTeam[] {
  const votes = myVotes();
  return TEAMS.map((t) => withState(t, votes))
    .sort((a, b) => b.score - a.score || b.votes - a.votes)
    .map((t, i) => ({ ...t, rank: i + 1 }));
}

export function getTeam(id: string): RankedTeam | undefined {
  return getRankedTeams().find((t) => t.id === id);
}

/** Resolves to false if this visitor has already voted for the team. */
export async function castVote(id: string): Promise<boolean> {
  const votes = myVotes();
  if (votes.has(id)) return false;
  votes.add(id);
  if (!storage.set(VOTES_KEY, [...votes])) {
    throw new Error("Your vote could not be saved in this browser.");
  }
  return true;
}

export async function submitRegistration(entry: Registration): Promise<void> {
  const all = storage.get<(Registration & { createdAt: string })[]>(REGISTRATIONS_KEY, []);
  all.push({ ...entry, createdAt: new Date().toISOString() });
  if (!storage.set(REGISTRATIONS_KEY, all)) {
    throw new Error("Your registration could not be saved in this browser.");
  }
}
