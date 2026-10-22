import { castVote, getTeam } from "../lib/api";
import { html, type SafeHtml } from "../lib/html";
import type { RankedTeam } from "../lib/types";
import { icon } from "./icon";
import { toast } from "./toast";

export function voteButton(team: RankedTeam, opts: { size?: "sm" | "lg"; label?: string } = {}): SafeHtml {
  const size = opts.size ? `btn--${opts.size}` : "";
  return team.voted
    ? html`<button class="btn btn--voted ${size}" type="button" disabled>${icon("check")}Voted</button>`
    : html`<button class="btn btn--primary ${size}" type="button" data-vote="${team.id}">${opts.label ?? "Vote"}</button>`;
}

/**
 * Delegated vote handling. `onVoted` receives the refreshed team so each
 * page can update its own counters; the button itself is swapped here.
 */
export function bindVoting(
  root: ParentNode,
  onVoted: (team: RankedTeam, button: HTMLButtonElement) => void,
  opts: Parameters<typeof voteButton>[1] = {},
): void {
  root.addEventListener("click", async (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>("[data-vote]");
    if (!button) return;
    button.disabled = true;
    const id = button.dataset.vote!;
    try {
      const ok = await castVote(id);
      const team = getTeam(id);
      if (!team) throw new Error(`Cannot vote for unknown team "${id}".`);
      if (!ok) {
        button.outerHTML = voteButton(team, opts).toString();
        return;
      }
      button.outerHTML = voteButton(team, opts).toString();
      onVoted(team, button);
      toast(`Voted for ${team.name}`);
    } catch (error) {
      console.error("Unable to save vote.", error);
      button.disabled = false;
      toast("Your vote could not be saved. Please try again.");
    }
  });
}
