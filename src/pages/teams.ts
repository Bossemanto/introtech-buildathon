import { observeReveals } from "../components/effects";
import { bootPage } from "../components/layout";
import { teamMark } from "../components/marks";
import { bindVoting, voteButton } from "../components/vote";
import { getTeams } from "../lib/api";
import { formatNumber } from "../lib/format";
import { html, qs, render } from "../lib/html";
import { teamUrl } from "../lib/routes";
import type { VotableTeam } from "../lib/types";

type SortKey = "name" | "product" | "votes";

const sorters: Record<SortKey, (a: VotableTeam, b: VotableTeam) => number> = {
  name: (a, b) => a.name.localeCompare(b.name),
  product: (a, b) => a.product.localeCompare(b.product),
  votes: (a, b) => b.votes - a.votes || a.name.localeCompare(b.name),
};

const teamCard = (t: VotableTeam, i: number) => html`
  <article class="card team-card spotlight" style="--c:${t.color};--delay:${i * 60}ms" data-reveal>
    <div class="team-card__head">${teamMark(t, "lg")}</div>
    <h2 class="team-card__name"><a href="${teamUrl(t.id)}">${t.name}</a></h2>
    <p class="team-card__product">${t.product}</p>
    <p class="team-card__tagline">${t.tagline}</p>

    <div class="team-card__foot">
      <div class="team-card__lead"><span class="muted">Team lead</span><b>${t.lead}</b></div>
      <div class="team-card__actions">
        <a class="btn btn--ghost btn--sm" href="${teamUrl(t.id)}">View project</a>
        ${voteButton(t, { size: "sm" })}
      </div>
    </div>
    <p class="team-card__votes tabular"><span data-votes="${t.id}">${formatNumber(t.votes)}</span> votes in this browser</p>
  </article>`;

bootPage("teams", () => {
  const grid = qs("[data-team-grid]");
  const control = qs("[data-sort-control]");
  let sort: SortKey = "name";

  const draw = () => {
    const teams = getTeams().sort(sorters[sort]);
    qs("[data-team-count]").textContent = `${teams.length} teams`;
    render(grid, html`${teams.map(teamCard)}`);
    observeReveals(grid);
  };

  control.addEventListener("click", (e) => {
    const button = (e.target as Element).closest<HTMLButtonElement>("[data-sort]");
    if (!button) return;
    sort = button.dataset.sort as SortKey;
    control.querySelectorAll("[data-sort]").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    draw();
  });

  bindVoting(grid, (team) => {
    const counter = grid.querySelector(`[data-votes="${team.id}"]`);
    if (counter) counter.textContent = formatNumber(team.votes);
  }, { size: "sm" });

  draw();
});
