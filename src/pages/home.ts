import { mountGlobe } from "../components/globe";
import { icon } from "../components/icon";
import { bootPage } from "../components/layout";
import { roleIcon, teamMark } from "../components/marks";
import { ROLES } from "../data/roles";
import { getTeams } from "../lib/api";
import { teamUrl } from "../lib/routes";
import { html, qs, render } from "../lib/html";

bootPage("home", () => {
  const teams = getTeams();

  render(
    qs("[data-roles]"),
    html`${ROLES.map(
      (role, i) => html`
        <article class="card role spotlight" style="--c:${role.color};--delay:${i * 70}ms" data-reveal>
          ${roleIcon(role, "lg")}
          <h3 class="h3">${role.name}</h3>
          <p>${role.blurb}</p>
          <span class="role__mono" aria-hidden="true">${role.mono}</span>
        </article>`,
    )}`,
  );

  render(
    qs("[data-top-teams]"),
    html`${teams.slice(0, 4).map(
      (t) => html`
        <li>
          <a class="live__row" href="${teamUrl(t.id)}">
            ${teamMark(t, "sm")}
            <span class="live__team"><b>${t.name}</b><span>${t.product}</span></span>
            ${icon("arrow-right", "live__chevron")}
          </a>
        </li>`,
    )}`,
  );

  const leader = teams[0];
  if (leader) {
    render(
      qs("[data-featured-team]"),
      html`${teamMark(leader, "md")}
        <div>
          <span class="float-card__kicker"><span class="live-dot"></span>Featured project</span>
          <b>${leader.name}</b>
          <span class="float-card__meta">${leader.product}</span>
        </div>`,
    );
  }

  const count = qs("[data-team-count]");
  count.dataset.countTo = String(teams.length);
  count.textContent = String(teams.length);

  mountGlobe(qs("[data-globe]"));
});
