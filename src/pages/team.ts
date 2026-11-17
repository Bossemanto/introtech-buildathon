import { icon } from "../components/icon";
import { bootPage } from "../components/layout";
import { teamMark } from "../components/marks";
import { bindVoting, voteButton } from "../components/vote";
import { getTeam } from "../lib/api";
import { formatNumber } from "../lib/format";
import { html, qs, render } from "../lib/html";
import type { VotableTeam } from "../lib/types";

const notFound = () => html`
  <div class="team-empty">
    <h1 class="h2">Team not found</h1>
    <p class="lede">This team may have been renamed.</p>
    <a class="btn btn--primary" href="teams.html">Browse all teams${icon("arrow-right")}</a>
  </div>`;

const teamView = (t: VotableTeam) => html`
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="teams.html">Teams</a><span aria-hidden="true">/</span><span aria-current="page">${t.name}</span>
  </nav>

  <div class="team-hero">
    <div class="team-hero__copy" data-reveal>
      ${teamMark(t, "xl")}
      <p class="eyebrow-text">${t.name}</p>
      <h1 class="h1">${t.product}</h1>
      <p class="lede">${t.description}</p>
      <div class="team-links">
        <a class="link-arrow" href="${t.demo}" target="_blank" rel="noopener">Open product demo${icon("external")}</a>
        <a class="link-arrow" href="${t.repository}" target="_blank" rel="noopener">View GitHub repository${icon("external")}</a>
      </div>
    </div>

    <aside class="card vote-card beam" aria-label="Vote for ${t.name}" data-reveal style="--delay:100ms">
      <div class="vote-card__count tabular" data-vote-count>${formatNumber(t.votes)}</div>
      <div class="vote-card__label">votes in this browser</div>
      <div data-vote-slot>${voteButton(t, { size: "lg", label: "Vote for this team" })}</div>
      <p class="vote-card__note" data-vote-note>${t.voted ? "Your vote is saved in this browser." : "One vote per team on this browser."}</p>
      <div class="vote-card__lead">
        <span class="muted">Team lead</span>
        <b>${t.lead}</b>
      </div>
    </aside>
  </div>

  <div class="team-facts">
    <section class="card card--pad" aria-labelledby="problem-title" data-reveal>
      <h2 class="card__title" id="problem-title">The problem</h2>
      <p class="team-facts__copy">${t.problem}</p>
    </section>

    <section class="card card--pad" aria-labelledby="features-title" data-reveal style="--delay:60ms">
      <h2 class="card__title" id="features-title">Key features</h2>
      <ul class="team-facts__list">
        ${t.features.map((feature) => html`<li>${feature}</li>`)}
      </ul>
    </section>

    <section class="card card--pad" aria-labelledby="difference-title" data-reveal>
      <h2 class="card__title" id="difference-title">What makes it different</h2>
      <p class="team-facts__copy">${t.difference}</p>
    </section>

    <section class="card card--pad" aria-labelledby="build-title" data-reveal style="--delay:60ms">
      <h2 class="card__title" id="build-title">Current build</h2>
      <h3 class="team-facts__label">Functional parts</h3>
      <ul class="team-facts__tags">${t.functional.map((item) => html`<li>${item}</li>`)}</ul>
      <h3 class="team-facts__label">Tools and APIs</h3>
      <ul class="team-facts__tags">${t.technologies.map((item) => html`<li>${item}</li>`)}</ul>
    </section>
  </div>`;

bootPage("teams", () => {
  const root = qs("[data-team]");
  const id = new URLSearchParams(location.search).get("id") ?? "";
  const team = getTeam(id);

  if (!team) {
    document.title = "Team not found · IntroTech Buildathon 2026";
    render(root, notFound());
    return;
  }

  document.title = `${team.product} · IntroTech Buildathon 2026`;
  qs("[data-team-root]").style.setProperty("--c", team.color);
  render(root, teamView(team));

  bindVoting(
    root,
    (updated) => {
      const count = qs("[data-vote-count]", root);
      count.textContent = formatNumber(updated.votes);
      count.classList.remove("is-bumped");
      void count.offsetWidth;
      count.classList.add("is-bumped");
      qs("[data-vote-note]", root).textContent = "Your vote is saved in this browser.";
    },
    { size: "lg", label: "Vote for this team" },
  );
});
