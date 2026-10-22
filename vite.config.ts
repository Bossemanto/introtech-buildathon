import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));
const pages = ["index", "teams", "team", "leaderboard", "register"] as const;
const partialsDir = resolve(root, "src/partials");

/**
 * Inlines shared markup (head, header, footer) at build time so every page
 * ships complete HTML without a client-side layout flash.
 * Usage inside any page: <!-- @include header -->
 */
function htmlPartials(): Plugin {
  const include = (html: string, depth = 0): string => {
    if (depth > 5) throw new Error("html-partials: include depth exceeded (circular include?)");
    return html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, name: string) =>
      include(readFileSync(resolve(partialsDir, `${name}.html`), "utf8"), depth + 1),
    );
  };
  return {
    name: "html-partials",
    transformIndexHtml: { order: "pre", handler: (html) => include(html) },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(partialsDir)) server.ws.send({ type: "full-reload" });
    },
  };
}

export default defineConfig({
  plugins: [htmlPartials()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(root, `${p}.html`)])),
    },
  },
});
