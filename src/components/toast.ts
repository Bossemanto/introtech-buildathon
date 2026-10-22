let el: HTMLElement | null = null;
let timer: number | undefined;

export function toast(message: string): void {
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(timer);
  timer = window.setTimeout(() => el?.classList.remove("is-visible"), 2400);
}
