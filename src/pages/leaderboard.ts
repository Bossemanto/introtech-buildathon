import { icon } from "../components/icon";
import { bootPage } from "../components/layout";
import { teamMark } from "../components/marks";
import { getTeams } from "../lib/api";
import { html, qs, render } from "../lib/html";
import { teamUrl } from "../lib/routes";
import type { VotableTeam } from "../lib/types";

const projectCard = (team: VotableTeam, index: number) => html`
  <article class="card podium__card spotlight" style="--c:${team.color};--delay:${index * 80}ms" data-reveal>
    <div class="podium__top">${teamMark(team, "lg")}</div>
    <div>
      <h2 class="podium__name">${team.name}</h2>
      <p class="podium__product">${team.product}</p>
    </div>
    <p class="podium__description">${team.tagline}</p>
    <p class="podium__lead"><span class="muted">Team lead</span><b>${team.lead}</b></p>
    <a class="btn btn--ghost btn--sm podium__view" href="${teamUrl(team.id)}">View project${icon("arrow-right")}</a>
  </article>`;

bootPage("leaderboard", () => {
  const teams = getTeams();
  render(qs("[data-podium]"), html`${teams.map(projectCard)}`);
});
