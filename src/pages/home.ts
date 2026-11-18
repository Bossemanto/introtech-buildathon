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

  const STORAGE_KEY = "introtech_featured_index";
  const getInitialFeaturedIndex = (length: number): number => {
    if (length <= 1) return 0;
    try {
      const storage = window.localStorage ?? window.sessionStorage;
      const stored = storage.getItem(STORAGE_KEY);
      const lastIndex = stored !== null ? parseInt(stored, 10) : -1;
      const nextIndex = isNaN(lastIndex) || lastIndex < 0
        ? Math.floor(Math.random() * length)
        : (lastIndex + 1) % length;
      storage.setItem(STORAGE_KEY, String(nextIndex));
      return nextIndex;
    } catch {
      return Math.floor(Math.random() * length);
    }
  };

  let featuredIndex = getInitialFeaturedIndex(teams.length);

  const renderFeatured = (idx: number) => {
    const featured = teams[idx % teams.length];
    if (!featured) return;
    render(
      qs("[data-featured-team]"),
      html`${teamMark(featured, "md")}
        <div>
          <span class="float-card__kicker"><span class="live-dot"></span>Featured project</span>
          <b>${featured.name}</b>
          <span class="float-card__meta">${featured.product}</span>
        </div>`,
    );
  };

  if (teams.length > 0) {
    renderFeatured(featuredIndex);

    // Rotate every 30 minutes while the page remains open
    const THIRTY_MINUTES_MS = 30 * 60 * 1000;
    setInterval(() => {
      featuredIndex = (featuredIndex + 1) % teams.length;
      try {
        (window.localStorage ?? window.sessionStorage).setItem(STORAGE_KEY, String(featuredIndex));
      } catch {}
      renderFeatured(featuredIndex);
    }, THIRTY_MINUTES_MS);
  }

  const count = qs("[data-team-count]");
  count.dataset.countTo = String(teams.length);
  count.textContent = String(teams.length);

  mountGlobe(qs("[data-globe]"));
});
