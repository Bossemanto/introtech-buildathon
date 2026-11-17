import { TEAMS } from "../data/teams";
import { storage } from "./storage";
import type { Registration, Team, VotableTeam } from "./types";

/**
 * Data access layer. Every consumer goes through these functions, so
 * replacing localStorage with fetch() calls is a change to this file only.
 */

const VOTES_KEY = "itb-votes";
const REGISTRATIONS_KEY = "itb-registrations";

function myVotes(): Set<string> {
  return new Set(storage.get<string[]>(VOTES_KEY, []));
}

function withState(team: Team, votes: Set<string>): VotableTeam {
  const voted = votes.has(team.id);
  return { ...team, votes: voted ? 1 : 0, voted };
}

/** Teams ordered alphabetically; votes are local to this browser. */
export function getTeams(): VotableTeam[] {
  const votes = myVotes();
  return TEAMS.map((t) => withState(t, votes)).sort((a, b) => a.name.localeCompare(b.name));
}

export function getTeam(id: string): VotableTeam | undefined {
  return getTeams().find((t) => t.id === id);
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
