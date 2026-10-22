import { qs } from "../lib/html";
import { initEffects } from "./effects";

export type PageId = "home" | "teams" | "leaderboard" | "register";

function markCurrentNav(page: PageId): void {
  document.querySelectorAll<HTMLAnchorElement>("[data-nav]").forEach((a) => {
    if (a.dataset.nav === page) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

function initHeader(): void {
  const header = qs("[data-header]");
  const sync = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  sync();
  window.addEventListener("scroll", sync, { passive: true });

  const toggle = qs<HTMLButtonElement>("[data-menu-toggle]", header);
  const menu = qs("#mobile-nav", header);
  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    document.body.classList.toggle("has-menu-open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  matchMedia("(min-width: 960px)").addEventListener("change", (e) => e.matches && setOpen(false));
}

/**
 * Shared bootstrap for every page. Page scripts render their dynamic
 * content inside `setup`, then effects attach to the final DOM.
 */
export function bootPage(page: PageId, setup?: () => void): void {
  markCurrentNav(page);
  initHeader();
  setup?.();
  initEffects();
}
