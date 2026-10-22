import { icon } from "../components/icon";
import { bootPage } from "../components/layout";
import { avatar, progressBar, teamMark } from "../components/marks";
import { bindVoting, voteButton } from "../components/vote";
import { getRole, ROLES } from "../data/roles";
import { getTeam } from "../lib/api";
import { formatNumber, ordinal } from "../lib/format";
import { html, qs, render } from "../lib/html";
import type { MilestoneStatus, RankedTeam } from "../lib/types";

const STATUS_LABEL: Record<MilestoneStatus, string> = { done: "Done", now: "In progress", next: "Up next" };

const notFound = () => html`
  <div class="team-empty">
    <h1 class="h2">Team not found</h1>
    <p class="lede">This team may have been renamed.</p>
    <a class="btn btn--primary" href="teams.html">Browse all teams${icon("arrow-right")}</a>
  </div>`;

const teamView = (t: RankedTeam) => html`
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="teams.html">Teams</a><span aria-hidden="true">/</span><span aria-current="page">${t.name}</span>
  </nav>

  <div class="team-hero">
    <div class="team-hero__copy" data-reveal>
      ${teamMark(t, "xl")}
      <h1 class="h1">${t.name}</h1>
      <p class="team-hero__product">${t.product}</p>
      <p class="lede">${t.description}</p>
      <a class="link-arrow" href="${t.demo}" target="_blank" rel="noopener">Open product demo${icon("external")}</a>
    </div>

    <aside class="card vote-card beam" aria-label="Vote" data-reveal style="--delay:100ms">
      <div class="vote-card__count tabular" data-vote-count>${formatNumber(t.votes)}</div>
      <div class="vote-card__label">public votes</div>
      <div data-vote-slot>${voteButton(t, { size: "lg", label: "Vote for this team" })}</div>
      <p class="vote-card__note" data-vote-note>${t.voted ? "Your vote is counted. Thank you." : "One tap. No sign-up needed."}</p>
      <dl class="vote-card__stats">
        <div><dt>Leaderboard position</dt><dd>${ordinal(t.rank)}</dd></div>
        <div><dt>Overall score</dt><dd class="tabular">${t.score.toFixed(1)}</dd></div>
      </dl>
    </aside>
  </div>

  <section class="card card--pad dept" aria-labelledby="dept-title" data-reveal>
    <h2 class="card__title" id="dept-title">Progress by department</h2>
    <div class="dept__rows">
      ${ROLES.map((r) => {
        const v = t.progress[r.id];
        return html`
          <div class="dept__row" style="--c:${r.color}">
            <span class="dept__name"><span class="dept__dot"></span>${r.short}</span>
            ${progressBar(v, r.short, r.color)}
            <span class="dept__value tabular">${v}%</span>
          </div>`;
      })}
    </div>
  </section>

  <div class="team-grid-2">
    <section class="card card--pad" aria-labelledby="members-title" data-reveal>
      <h2 class="card__title" id="members-title">Team</h2>
      <ul class="members" role="list">
        ${t.members.map(
          (m) => html`<li class="member">${avatar(m, "md")}<div><b>${m.name}</b><span>${getRole(m.role).name}</span></div></li>`,
        )}
      </ul>
    </section>

    <section class="card card--pad" aria-labelledby="miles-title" data-reveal style="--delay:80ms">
      <h2 class="card__title" id="miles-title">Milestones</h2>
      <ol class="miles" role="list">
        ${t.milestones.map(
          (m) => html`
            <li class="miles__item miles__item--${m.status}">
              <span class="miles__node">${m.status === "done" ? icon("check") : ""}</span>
              <div><b>${m.title}</b><span>${m.when} · ${STATUS_LABEL[m.status]}</span></div>
            </li>`,
        )}
      </ol>
    </section>
  </div>

  <section class="card card--pad log" aria-labelledby="log-title" data-reveal>
    <h2 class="card__title" id="log-title">Progress log</h2>
    <ol class="log__list" role="list">
      ${t.updates.map(
        (u) => html`<li class="log__item"><time>${u.date}</time><div><b>${u.title}</b><p>${u.body}</p></div></li>`,
      )}
    </ol>
  </section>`;

bootPage("teams", () => {
  const root = qs("[data-team]");
  const id = new URLSearchParams(location.search).get("id") ?? "";
  const team = getTeam(id);

  if (!team) {
    document.title = "Team not found · IntroTech Buildathon 2026";
    render(root, notFound());
    return;
  }

  document.title = `${team.name} · IntroTech Buildathon 2026`;
  qs("[data-team-root]").style.setProperty("--c", team.color);
  render(root, teamView(team));

  bindVoting(
    root,
    (updated) => {
      const count = qs("[data-vote-count]", root);
      count.textContent = formatNumber(updated.votes);
      count.classList.remove("is-bumped");
      void count.offsetWidth; // restart animation
      count.classList.add("is-bumped");
      qs("[data-vote-note]", root).textContent = "Your vote is counted. Thank you.";
    },
    { size: "lg", label: "Vote for this team" },
  );
});
