/**
 * Tiny auto-escaping template tag. Interpolated values are HTML-escaped
 * unless they are themselves the result of `html` (or `raw`), so nested
 * templates compose safely and user data can never inject markup.
 */

const RAW = Symbol("raw-html");

export interface SafeHtml {
  readonly [RAW]: string;
  toString(): string;
}

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ESCAPES[c]!);
}

/** Marks a trusted string as HTML. Never pass user input. */
export function raw(value: string): SafeHtml {
  return { [RAW]: value, toString: () => value };
}

function serialize(value: unknown): string {
  if (value == null || value === false) return "";
  if (Array.isArray(value)) return value.map(serialize).join("");
  if (typeof value === "object" && RAW in value) return (value as SafeHtml)[RAW];
  return escapeHtml(String(value));
}

export function html(strings: TemplateStringsArray, ...values: unknown[]): SafeHtml {
  let out = strings[0] ?? "";
  values.forEach((v, i) => (out += serialize(v) + (strings[i + 1] ?? "")));
  return raw(out);
}

export function render(target: Element, content: SafeHtml): void {
  target.innerHTML = content.toString();
}

export function qs<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}
