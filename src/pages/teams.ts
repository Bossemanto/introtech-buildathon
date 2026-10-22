import { observeReveals } from "../components/effects";
import { bootPage } from "../components/layout";
import { avatar, progressBar, rankBadge, teamMark } from "../components/marks";
import { bindVoting, voteButton } from "../components/vote";
import { getRankedTeams } from "../lib/api";
import { formatNumber } from "../lib/format";
import { html, qs, render } from "../lib/html";
import { teamUrl } from "../lib/routes";
import type { RankedTeam } from "../lib/types";

type SortKey = "rank" | "votes" | "progress";

const sorters: Record<SortKey, (a: RankedTeam, b: RankedTeam) => number> = {
  rank: (a, b) => a.rank - b.rank,
  votes: (a, b) => b.votes - a.votes,
  progress: (a, b) => b.overall - a.overall,
};

const teamCard = (t: RankedTeam, i: number) => html`
  <article class="card team-card spotlight" style="--c:${t.color};--delay:${i * 60}ms" data-reveal>
    <div class="team-card__head">
      ${teamMark(t, "lg")}
      ${rankBadge(t.rank)}
    </div>
    <h2 class="team-card__name"><a href="${teamUrl(t.id)}">${t.name}</a></h2>
    <p class="team-card__product">${t.product}</p>
    <p class="team-card__tagline">${t.tagline}</p>

    <dl class="team-card__stats">
      <div><dt>Score</dt><dd class="tabular">${t.score.toFixed(1)}</dd></div>
      <div><dt>Votes</dt><dd class="tabular" data-votes="${t.id}">${formatNumber(t.votes)}</dd></div>
      <div><dt>Progress</dt><dd class="tabular">${t.overall}%</dd></div>
    </dl>
    ${progressBar(t.overall, `${t.name} overall progress`, t.color)}

    <div class="team-card__foot">
      <div class="avatar-stack" aria-label="Team members">${t.members.map((m) => avatar(m))}</div>
      <div class="team-card__actions">
        <a class="btn btn--ghost btn--sm" href="${teamUrl(t.id)}">View team</a>
        ${voteButton(t, { size: "sm" })}
      </div>
    </div>
  </article>`;

bootPage("teams", () => {
  const grid = qs("[data-team-grid]");
  const control = qs("[data-sort-control]");
  let sort: SortKey = "rank";

  const draw = () => {
    const teams = getRankedTeams().sort(sorters[sort]);
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
