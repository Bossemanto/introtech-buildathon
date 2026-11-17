import { html, type SafeHtml } from "../lib/html";
import type { Team, Role } from "../lib/types";
import { icon } from "./icon";

type Size = "sm" | "md" | "lg" | "xl";

/** Monogram tile for a team. */
export function teamMark(team: Team, size: Size = "md"): SafeHtml {
  return html`<span class="mark mark--${size}" style="--c:${team.color}" aria-hidden="true"><span>${team.initials}</span></span>`;
}

export function roleIcon(role: Role, size: Size = "md"): SafeHtml {
  return html`<span class="mark mark--icon mark--${size}" style="--c:${role.color}" aria-hidden="true">${icon(role.icon)}</span>`;
}
