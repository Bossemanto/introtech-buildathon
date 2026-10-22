import { icon } from "../components/icon";
import { bootPage } from "../components/layout";
import { movement, progressBar, rankBadge, teamMark } from "../components/marks";
import { getRankedTeams } from "../lib/api";
import { formatNumber, ordinal } from "../lib/format";
import { html, qs, render } from "../lib/html";
import { teamUrl } from "../lib/routes";
import type { RankedTeam } from "../lib/types";

const podiumCard = (t: RankedTeam, i: number) => html`
  <a class="card podium__card podium__card--${t.rank} spotlight" href="${teamUrl(t.id)}" style="--c:${t.color};--delay:${i * 80}ms" data-reveal>
    <div class="podium__top">
      ${teamMark(t, "lg")}
      <span class="podium__place">${ordinal(t.rank)}</span>
    </div>
    <div>
      <h2 class="podium__name">${t.name}</h2>
      <p class="podium__product">${t.product}</p>
    </div>
    <div class="podium__stats">
      <span><b class="tabular">${t.score.toFixed(1)}</b> score</span>
      <span><b class="tabular">${formatNumber(t.votes)}</b> votes</span>
    </div>
    ${movement(t)}
  </a>`;

const boardRow = (t: RankedTeam) => html`
  <tr class="board__row ${t.rank === 1 ? "board__row--first" : ""}">
    <td class="board__col-rank">${rankBadge(t.rank)}</td>
    <td>
      <div class="board__team">
        ${teamMark(t, "sm")}
        <div>
          <a class="board__name" href="${teamUrl(t.id)}">${t.name}</a>
          <span class="board__product">${t.product}: ${t.tagline}</span>
          ${movement(t)}
        </div>
      </div>
    </td>
    <td class="board__col-num board__score tabular">${t.score.toFixed(1)}</td>
    <td class="board__col-num board__col-votes tabular">${formatNumber(t.votes)}</td>
    <td class="board__col-progress">
      <span class="meter-label"><span>Progress</span><b>${t.overall}%</b></span>
      ${progressBar(t.overall, `${t.name} progress`, t.color)}
    </td>
    <td class="board__col-go" aria-hidden="true">${icon("arrow-right")}</td>
  </tr>`;

bootPage("leaderboard", () => {
  const teams = getRankedTeams();
  render(qs("[data-podium]"), html`${teams.slice(0, 3).map(podiumCard)}`);
  render(qs("[data-board]"), html`${teams.map(boardRow)}`);
});
