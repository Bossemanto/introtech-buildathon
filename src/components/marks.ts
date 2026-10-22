import { getRole } from "../data/roles";
import { initials } from "../lib/format";
import { html, type SafeHtml } from "../lib/html";
import type { Member, RankedTeam, Role } from "../lib/types";
import { icon } from "./icon";

type Size = "sm" | "md" | "lg" | "xl";

/** Monogram tile for a team. The leader gets the chrome treatment. */
export function teamMark(team: RankedTeam, size: Size = "md"): SafeHtml {
  const leader = team.rank === 1;
  return html`<span class="mark mark--${size} ${leader ? "mark--leader" : ""}" style="--c:${team.color}" aria-hidden="true"><span>${team.initials}</span></span>`;
}

export function roleIcon(role: Role, size: Size = "md"): SafeHtml {
  return html`<span class="mark mark--icon mark--${size}" style="--c:${role.color}" aria-hidden="true">${icon(role.icon)}</span>`;
}

export function avatar(member: Member, size: "sm" | "md" = "sm"): SafeHtml {
  const role = getRole(member.role);
  return html`<span class="avatar avatar--${size}" style="--c:${role.color}" title="${member.name}, ${role.short}">${initials(member.name)}</span>`;
}

export function rankBadge(rank: number): SafeHtml {
  return html`<span class="rank-badge ${rank <= 3 ? `rank-badge--${rank}` : ""}">#${rank}</span>`;
}

export function movement(team: RankedTeam): SafeHtml {
  const delta = team.prevRank - team.rank;
  if (delta > 0) return html`<span class="move move--up">${icon("trend-up")}Up ${delta}</span>`;
  if (delta < 0) return html`<span class="move move--down">${icon("trend-down")}Down ${-delta}</span>`;
  return html`<span class="move">${icon("minus")}No change</span>`;
}

export function progressBar(value: number, label: string, color?: string): SafeHtml {
  return html`<span class="progress" role="progressbar" aria-label="${label}" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" ${color ? html`style="--c:${color}"` : ""}><span class="progress__fill" style="--value:${value}%"></span></span>`;
}
