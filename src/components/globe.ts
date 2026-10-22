import createGlobe, { type Arc, type Globe, type Marker } from "cobe";
import { prefersReducedMotion } from "./effects";

type LatLng = [number, number];

interface City {
  id: string;
  location: LatLng;
  /** Cities with a label get a floating tag anchored to their marker. */
  label?: string;
}

const HQ: City = { id: "awka", location: [6.2105, 7.0741], label: "Awka · Buildathon HQ" };

const CITIES: City[] = [
  { id: "lagos", location: [6.5244, 3.3792] },
  { id: "abuja", location: [9.0765, 7.3986] },
  { id: "enugu", location: [6.4584, 7.5464] },
  { id: "port-harcourt", location: [4.8156, 7.0498] },
  { id: "kano", location: [12.0022, 8.592] },
  { id: "ibadan", location: [7.3775, 3.947] },
  { id: "accra", location: [5.6037, -0.187] },
  { id: "nairobi", location: [-1.2921, 36.8219], label: "Nairobi" },
  { id: "johannesburg", location: [-26.2041, 28.0473], label: "Johannesburg" },
  { id: "cairo", location: [30.0444, 31.2357] },
  { id: "london", location: [51.5072, -0.1276], label: "London" },
  { id: "dubai", location: [25.2048, 55.2708] },
  { id: "toronto", location: [43.6532, -79.3832] },
];

const rgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/** cobe angles that put `location` at the centre of the viewport. */
function anglesFor([lat, lng]: LatLng): { phi: number; theta: number } {
  return { phi: Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), theta: (lat * Math.PI) / 180 };
}

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Interactive dotted globe (Cloudflare-style) centred on the venue, with arcs
 * out to the cities builders travel from. Auto-rotates, can be dragged,
 * pauses off-screen, and degrades to a static CSS sphere without WebGL.
 */
export function mountGlobe(container: HTMLElement): void {
  const canvas = container.querySelector("canvas");
  if (!canvas) return;
  if (!supportsWebGL()) {
    container.classList.add("globe--fallback");
    return;
  }

  const all = [HQ, ...CITIES];
  const markers: Marker[] = all.map((c) => ({
    id: c.id,
    location: c.location,
    size: c === HQ ? 0.09 : 0.035,
    ...(c === HQ ? { color: rgb("#FF4D8F") } : {}),
  }));
  const arcs: Arc[] = CITIES.map((c) => ({ id: `hq-${c.id}`, from: c.location, to: HQ.location }));

  const start = anglesFor(HQ.location);
  const reduced = prefersReducedMotion();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let size = canvas.offsetWidth || 600;

  let phi = start.phi - 0.35;
  let theta = start.theta + 0.12;
  let velocity = 0;
  let drag: { x: number; y: number; phi: number; theta: number } | null = null;

  const globe: Globe = createGlobe(canvas, {
    devicePixelRatio: dpr,
    width: size,
    height: size,
    phi,
    theta,
    dark: 1,
    diffuse: 1.4,
    mapSamples: 20000,
    mapBrightness: 7,
    mapBaseBrightness: 0.04,
    baseColor: rgb("#3A2A55"),
    markerColor: rgb("#C49BFF"),
    glowColor: rgb("#6B3FB0"),
    arcColor: rgb("#C49BFF"),
    arcWidth: 0.6,
    arcHeight: 0.28,
    markerElevation: 0.01,
    markers,
    arcs,
  });

  for (const city of all) {
    if (!city.label) continue;
    const tag = document.createElement("span");
    tag.className = `globe__label${city === HQ ? " globe__label--hq" : ""}`;
    tag.style.setProperty("position-anchor", `--cobe-${city.id}`);
    tag.style.setProperty("opacity", `var(--cobe-visible-${city.id}, 0)`);
    tag.textContent = city.label;
    tag.setAttribute("aria-hidden", "true");
    container.append(tag);
  }

  // Render loop: only runs while the globe is on screen and the tab is visible.
  let running = false;
  let raf = 0;
  let last = performance.now();
  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!drag) {
      if (!reduced) phi += dt * 0.12;
      phi += velocity;
      velocity *= 0.94;
      theta += (start.theta + 0.12 - theta) * 0.04; // ease back to resting tilt
    }
    globe.update({ phi, theta });
    raf = requestAnimationFrame(tick);
  };
  const setRunning = (next: boolean) => {
    if (next === running) return;
    running = next;
    if (running) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    } else cancelAnimationFrame(raf);
  };

  let onScreen = true;
  new IntersectionObserver(([entry]) => {
    onScreen = !!entry?.isIntersecting;
    setRunning(onScreen && !document.hidden);
  }).observe(container);
  document.addEventListener("visibilitychange", () => setRunning(onScreen && !document.hidden));

  new ResizeObserver(() => {
    const next = canvas.offsetWidth;
    if (next && next !== size) {
      size = next;
      globe.update({ width: size, height: size });
    }
  }).observe(canvas);

  // Drag to spin, with momentum on release.
  canvas.addEventListener("pointerdown", (e) => {
    drag = { x: e.clientX, y: e.clientY, phi, theta };
    velocity = 0;
    canvas.setPointerCapture(e.pointerId);
    container.classList.add("is-dragging");
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const nextPhi = drag.phi + (e.clientX - drag.x) / 220;
    velocity = (nextPhi - phi) * 0.6;
    phi = nextPhi;
    theta = Math.max(-0.6, Math.min(0.8, drag.theta + (e.clientY - drag.y) / 400));
  });
  const release = () => {
    drag = null;
    container.classList.remove("is-dragging");
  };
  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);

  setRunning(true);
  requestAnimationFrame(() => container.classList.add("is-ready"));
}
