# IntroTech Buildathon 2026

Marketing site and live voting app for the IntroTech Buildathon. Built as a
Vite multi-page app in TypeScript with no UI framework.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve dist/
```

## Structure

```
index.html  teams.html  team.html  leaderboard.html  register.html   ← one file per page
public/                     static assets (brand mark)
src/
  partials/                 shared markup inlined at build time (head, header, footer, icons)
  pages/                    one entry script per page
  components/               UI building blocks (globe, marks, vote button, toast, effects, layout)
  lib/                      api (data access), html (auto-escaping templates), types, format, routes
  data/                     prototype roles and teams
  styles/
    tokens.css              design tokens: colour, type, radius, elevation, motion
    base.css  layout.css  components.css  effects.css
    pages/                  page-specific styles
legacy/                     original single-file prototype, kept for reference
```

### Conventions

- **Partials**: `<!-- @include header -->` in any page HTML is replaced at build
  time by `src/partials/header.html` (see `vite.config.ts`). Every page ships complete HTML.
- **Stylesheets**: shared and page-specific styles are linked from each document's
  head, so foundational and layout styles load before deferred page scripts run.
- **Rendering**: dynamic regions use the `html` tagged template from `src/lib/html.ts`.
  Interpolations are HTML-escaped by default, so data can never inject markup.
- **Data**: all reads and writes go through `src/lib/api.ts`. Votes and registrations
  currently live in `localStorage`. To connect Supabase or Airtable, only that file changes.
- **Effects**: shimmer, glow, spotlight, beam borders and scroll reveals are decorative and
  progressive. All motion is disabled under `prefers-reduced-motion`.

### Globe

`src/components/globe.ts` uses [cobe](https://github.com/shuding/cobe), a 5 KB WebGL globe.
It is centred on Awka, with arcs from the cities builders travel from. It pauses when off-screen,
can be dragged, and falls back to a static CSS sphere without WebGL. City labels use CSS anchor
positioning and are hidden in browsers that don't support it.
