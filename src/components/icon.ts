import { html, type SafeHtml } from "../lib/html";
import type { IconName } from "../lib/types";

export const icon = (name: IconName, className = ""): SafeHtml =>
  html`<svg class="icon ${className}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
