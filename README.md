# INVINCIBLE PROS — Engineering the Future

A cinematic, interactive WebGL experience for **INVINCIBLE PROS**, a futuristic
digital engineering company. The site is designed to feel less like a set of
web pages and more like an interactive film — visitors travel through six
"domains" that contain all 38 of the company's capabilities, culminating in the
final message: **ENGINEERING THE FUTURE**.

## Experience highlights

- **Cinematic preloader** — animated boot counter (000 → 100) and a brand reveal.
- **Persistent WebGL world** — a fixed React Three Fiber scene sits behind all
  content: a morphing "digital core" (distorted icosahedron + counter-rotating
  wireframe shell), a 4,200-point shader particle field, an atmospheric gradient
  sphere and camera parallax that follows the pointer.
- **Living colour** — as you scroll into each domain, the entire 3D world (core,
  lights, particles, atmosphere) lerps to that domain's signature colour.
- **The six domains** — every service is presented as an interactive line in a
  cinematic chapter, never as a grid of icons:
  1. **BUILD** — Software & Product Engineering
  2. **INTELLIGENCE** — AI, Data & Automation
  3. **DESIGN** — Brand & Creative Direction
  4. **INFRASTRUCTURE** — Cloud, Security & DevOps
  5. **HARDWARE** — Physical Systems & Security
  6. **EXPERIENCE** — Events & Live Media
- **Custom cursor**, **smooth scrolling**, **film grain + vignette**, and
  scroll-driven type reveals throughout.

## Tech stack

| Layer            | Technology                                   |
| ---------------- | -------------------------------------------- |
| Framework        | Next.js (App Router) + React + TypeScript    |
| Styling          | Tailwind CSS v4                              |
| 3D / WebGL       | React Three Fiber, Three.js, Drei            |
| Animation        | GSAP (+ ScrollTrigger), Framer Motion        |
| Smooth scroll    | Lenis                                        |
| State            | Zustand                                      |
| Dev controls     | Leva (installed, future-ready)               |
| Hosting          | Vercel-ready                                 |

The service catalogue lives in [`src/lib/services.ts`](src/lib/services.ts) so
it can later be sourced from a headless CMS with no UI changes.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Project structure

```
src/
  app/                 # layout, page, global theme
  components/
    canvas/            # R3F scene: Core, ParticleField, BackgroundFX, SceneCanvas
    layout/            # SmoothScroll, CustomCursor, Navbar, DomainRail, Overlays
    preloader/         # cinematic Preloader
    sections/          # Hero, Manifesto, Domains, DomainChapter, ServiceRow, Stats, Finale
    Experience.tsx     # composes the whole experience
  hooks/               # useCursor
  lib/                 # services.ts (the 38 capabilities → 6 domains)
  store/               # Zustand store (theme colour, scroll, pointer, cursor)
```

## Deploying to Vercel

Push this repository to GitHub and import it into Vercel. No environment
variables are required. The build command is `next build` and the output is a
standard Next.js app.

---

© Invincible Pros — Engineering the future.
