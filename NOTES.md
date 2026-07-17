# INVINCIBLE PROS. — Project Notes

Cinematic, interactive marketing site for **INVINCIBLE PROS.** — a digital
engineering studio. Goal: feel like an interactive film, not a set of pages.
Culminates in the message **ENGINEERING THE FUTURE**.

Repo: https://github.com/Navneetk334/invincible-pros-v4 (work on `main`)

## Brand
- Company name is **"INVINCIBLE PROS."** — the trailing dot is intentional
  (PROS. = Professionals). The dot is rendered in the cyan accent.
- Appears in: nav logo, preloader, finale footer, page metadata.

## Tech stack
- Next.js 16 (App Router, `src/`, alias `@/*`) · React 19 · TypeScript
- Tailwind CSS v4 (CSS-based `@theme` in `globals.css`)
- WebGL: three, @react-three/fiber v9, @react-three/drei v10,
  @react-three/postprocessing + postprocessing
- Animation: GSAP (+ ScrollTrigger), Framer Motion
- Smooth scroll: Lenis · State: Zustand · (Leva installed, unused)
- Vercel-ready. No env vars required.

## Run locally
    npm install
    npm run dev      # http://localhost:3000
    npm run build    # production build check
    npm run start    # serve production build
    npx eslint .     # lint (React 19 rules are strict — see gotchas)

Node 18+ (20/22 recommended).

## Structure
    src/app/            layout.tsx (fonts: Space Grotesk / Inter / JetBrains Mono, metadata)
                        page.tsx, globals.css (@theme tokens, marquee keyframes, grain/vignette)
    src/components/
      Experience.tsx    composes everything; dynamically imports SceneCanvas (ssr:false)
      canvas/
        SceneCanvas.tsx    <Canvas> wrapper, dpr capped [1, 1.5]
        FluidBackground.tsx full-screen plasma shader (drei ScreenQuad); colour = active domain
        Effects.tsx        post-processing: ChromaticAberration only (scroll-velocity reactive)
      layout/
        SmoothScroll.tsx   Lenis + GSAP ticker sync
        CustomCursor.tsx   dot + trailing ring
        Navbar.tsx         logo (AnimatedLogo) · links · Start a project (Magnetic)
        AnimatedLogo.tsx   NEON power-on wordmark logo (flicker on load + hover, steady glow)
        Magnetic.tsx       magnetic hover wrapper
        ChapterFlash.tsx   quick chapter-cut marker on domain change
        Overlays.tsx       film grain + vignette
      preloader/Preloader.tsx   boot counter 000→100 + brand reveal
      sections/
        Hero.tsx           "WE ENGINEER / THE FUTURE" + animated scroll cue + domain marquee
        Manifesto.tsx      GSAP ScrollTrigger word-by-word reveal
        KineticMarquee.tsx infinite marquee of all services
        HorizontalDomains.tsx  SIGNATURE: pinned horizontal journey through 6 domains;
                               plasma lerps to each domain colour as you scroll sideways
        Stats.tsx          animated count-ups
        Finale.tsx         "ENGINEERING THE FUTURE" reveal + contact CTA + footer
    src/hooks/useCursor.ts     cursor hover variants
    src/lib/services.ts        6 domains → all 38 services (+ colours) — CMS-ready
    src/lib/glsl.ts            simplex noise GLSL snippet
    src/store/useStore.ts      zustand: progress, entered, scroll, activeDomain,
                               journeyActive, pointer, cursor, themeColor/themeColor2

## Design tokens (globals.css @theme)
- ink #050609 · paper #eef1fb · fog #9aa3b8
- accent #4d6bff · accent-2 #7c5cff · cyan #38e1ff
- fonts: display=Space Grotesk, sans=Inter, mono=JetBrains Mono

## Six domains (src/lib/services.ts)
01 BUILD · 02 INTELLIGENCE · 03 DESIGN · 04 INFRASTRUCTURE · 05 HARDWARE · 06 EXPERIENCE
(38 services total, each domain has a signature colour that drives the WebGL.)

## Decisions / conventions
- WebGL is a fixed full-screen background (z-0); HTML content scrolls over it (z-10).
- Active domain drives `themeColor`/`themeColor2` → FluidBackground lerps to it.
- HUD, side rail, and sound toggle were intentionally REMOVED (kept the UI clean).
- Hero shows the tagline "WE ENGINEER THE FUTURE" (brand name lives in nav/preloader).

## Performance (already applied — keep in mind)
- Canvas dpr capped at 1.5.
- Fluid shader: 3-octave fbm, 2 passes (~6 noise evals/pixel).
- Post-processing trimmed to a single chromatic-aberration pass.

## React 19 / ESLint gotchas (bit me before)
- No `Math.random()` or mutable closures during render → use a pure hash or seeded value.
- Don't mutate `useMemo` objects in useFrame → hold Three.js scratch objects in `useRef`.
- No `setState` synchronously inside an effect → prefer keyed remounts / derived render.
- Don't read `ref.current` during render (e.g. pass a `useMemo` Vector2 as a prop).

## Backlog / ideas for next steps
- [ ] Mobile performance tier: dpr → 1, simpler shader, pause canvas when off-screen,
      reduce/disable custom cursor + magnetic on touch.
- [ ] `prefers-reduced-motion`: fuller pass (calm the plasma, skip flicker/marquee).
- [ ] Real contact form (or wire "Start a project" to email/Calendly).
- [ ] Work / case-studies section.
- [ ] Wire `services.ts` to a headless CMS (structure is already CMS-shaped).
- [ ] OG/social share image + favicon set.
- [ ] Accessibility pass (focus states, aria labels, keyboard nav for the horizontal section).

## Status
Builds clean, ESLint clean, deploys on Vercel. Latest visual state:
neon logo · "We Engineer The Future" hero · fluid plasma bg · horizontal domains journey.
