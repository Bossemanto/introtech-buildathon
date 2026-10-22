/**
 * Progressive visual effects. Everything here is decorative: the page is
 * complete without it, and all motion respects prefers-reduced-motion.
 */

export const prefersReducedMotion = (): boolean => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Cursor-following glow. Every `.spotlight` inside a `[data-spotlight-group]`
 * receives --mx/--my relative to itself, so neighbouring card borders light
 * up together as the pointer moves across the grid.
 */
function initSpotlight(): void {
  document.querySelectorAll<HTMLElement>("[data-spotlight-group]").forEach((group) => {
    let frame = 0;
    group.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        group.querySelectorAll<HTMLElement>(".spotlight").forEach((card) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
      });
    });
  });
}

function animateCount(el: HTMLElement): void {
  const target = Number(el.dataset.countTo);
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const format = (n: number) => prefix + Math.round(n).toLocaleString("en-NG") + suffix;
  if (prefersReducedMotion() || !Number.isFinite(target)) {
    el.textContent = format(target);
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    el.textContent = format(target * (1 - Math.pow(1 - t, 4)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Reveals `[data-reveal]` on scroll and starts `[data-count-to]` counters. */
export function observeReveals(root: ParentNode = document): void {
  const targets = root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed), [data-count-to]:not(.is-counted)");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add("is-revealed");
        if (el.dataset.countTo && !el.classList.contains("is-counted")) {
          el.classList.add("is-counted");
          animateCount(el);
        }
        io.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
  );
  targets.forEach((el) => io.observe(el));
}

export function initEffects(): void {
  initSpotlight();
  observeReveals();
}
