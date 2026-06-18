# C3 Recruitment Design Reglement — Mountain Journey Theme

Status: design-thinking funnel for the recruitment theme upgrade.

This file is the staging reglement for subsequent recruitment-flow design thinking. Future design work should append/refine here first, then promote stable decisions into `dev/DESIGN.md` once approved.

Sources:
- `dev/context/design stack.pdf`
- `dev/theme-upgrade-notes.md`
- `dev/theme-upgrade-transcript-summary.md`
- Current app review of `src/App.js`, `src/pages/recruitment/LandingPage.js`, `src/components/recruitment/ValleyBackground.js`, `src/components/recruitment/PoolRippleCanvas.js`, `src/data/jobs.js`, `src/App.css`

## 1. Brand thesis

The recruitment flow is a guided ascent into Convergenc3.

The visual world is not generic sci-fi. It is:
- mountain-first
- triangle/polygon structured
- mature night/dawn atmosphere
- premium, restrained motion
- unified under the parent C3 identity

The candidate journey should feel like entering a high-signal professional environment, not a game map or particle demo.

## 2. Non-negotiable brand anchors

### 2.1 Parent identity remains unified

Use the simplified C3 ecosystem logic:
- C3 Forge = startup/build stream = blue emphasis
- C3 Consult = consulting/outcomes stream = red emphasis
- C3 Sephton = academy stream = white/neutral emphasis

Do not make recruitment feel like a separate company or unrelated sub-brand.

### 2.2 External message

Primary external positioning:
- Transform • Optimise • Grow

Supporting internal/operational framework:
- Technology • Operations • Strategy

Recruitment copy should imply progression, capability, and outcomes. Avoid explaining the implementation/theme.

### 2.3 Mountain imagery is primary

The mountain/night-sky system is the approved visual anchor. Use:
- mountain silhouettes
- mist/cloud cuts
- layered ridges
- paths/ascent/summit cues
- dawn/sunset/night-sky lighting
- triangle/polygon geometry derived from the logo

Treat water as a supporting reflection/foreground device only.

### 2.4 Space/cosmos is constrained

Cosmos is not the default brand world.

Allowed only as a restrained mode for:
- Forge-type technical roles
- senior technical/data roles
- completion/night-sky states if approved

Even then, keep mountains visible. Stars sit behind the mountain identity; they do not replace it.

## 3. Colour reglement

### 3.1 Core brand colours from design stack

Use these as the canonical base:

| Token | RGB | HEX | Role |
|---|---:|---|---|
| Convergenc3 Blue Dark | 6, 65, 153 | `#064199` | Forge/technology emphasis, sky depth, active blue states |
| Convergenc3 Red Dark | 216, 12, 13 | `#D80C0D` | parent brand signal, portal/logo glow, primary CTA emphasis |
| Overlay Blue | 7, 25, 47 | `#07192F` | deep background overlay/night base |
| Midnight Black | 31, 32, 36 | `#1F2024` | near-black structural surfaces; avoid true black |
| Pebble White | 241, 241, 241 | `#F1F1F1` | text/light surfaces; avoid true white |

### 3.2 Permitted theme extensions

Theme extensions must derive from the core atmosphere:
- sunrise amber/coral for dawn glow and pointer light
- muted dusk violet only as transition/depth, never as dominant purple brand
- cyan/blue glints only for water reflection and Forge/cosmos accents
- forest green only as low-opacity slope/edge texture, not a new brand colour family

### 3.3 Tint discipline

If tints are needed, use a 20% step system. Any tint below 60% used as a background needs dark text. Prefer matte/subdued execution over saturated neon.

### 3.4 Colour prohibitions

- Do not introduce arbitrary palette colours.
- Do not use true black/white when brand black/white can work.
- Do not let purple become the primary visual identity.
- Do not use water/cyan so heavily that it competes with mountains/C3 red.

## 4. Typography reglement

Current official design-stack baseline:
- Body and most UI: Inter.
- Acceptable body alternatives: Helvetica, DM Sans, Open Sans, system sans.
- Recommended heading direction going forward: League Spartan.

Implementation rule for this CRA app:
- Do not add font packages without approval.
- If using web fonts, keep loading deliberate and minimal.
- Prefer Inter/system fallbacks for now unless the approved brand pack confirms League Spartan.

Typography constraints:
- Keep tracking, kerning, and leading legible.
- Do not stretch/squish type.
- Do not stroke/outline type.
- Avoid drop shadows on typography.
- Avoid centered multi-line text except tiny entrance/nudge copy.
- Type should read at 0°; only use 90° if intentionally vertical and reading upward.

## 5. Logo / triangle reglement

### 5.1 Central entrance element

The first journey step is a click on the central triangle/logo portal.

Requirement:
- The central entrance artifact must be a red triangle/logo portal, not the current large C3 badge/lockup image as hero.
- It must be visibly red/ember-led using Convergenc3 Red Dark `#D80C0D`, with dark/black internal shadowing where useful.
- It must be a real clickable `button` or `Link` with a visible focus state and accessible label.
- It should pulse/glow subtly in Convergenc3 red/sunrise light.
- It should sit at the aperture center of the mountain composition.

### 5.2 Logo usage

- Use full lockup only in navigation/header contexts where brand naming is needed.
- Use the extracted official Convergenc3 triangle logo asset for the central portal.
- Current approved asset path: `public/branding/logos/Triangle-Red.png`, derived from `public/branding/logos/Full Lockup-White.png`.
- Do not use a custom CSS/SVG approximation for the central logo.

## 6. Imagery and geometry reglement

### 6.1 Geometry language

Use straight lines, polygons, angular frames, and triangle-derived mountain facets. Avoid curved decorative shapes unless they belong to mist, cloud, or water reflection.

Triangle tessellation is now a preferred mountain-construction direction: mountains may be built from irregular triangular facets inspired by the C3 mark. The facets should stay subtle and matte, using brand red/dark-blue/black tints rather than rainbow low-poly styling.

### 6.2 Mountain construction

Mountains should read as staged layered planes:
- far ridges: low contrast, Overlay Blue / Blue Dark tints, slowest movement
- mid ridges: clearer tessellated triangle facets, aperture transition target
- near slopes: Midnight Black / Overlay Blue silhouettes with restrained Convergenc3 Red facet glints
- mist/cloud: soft masks that align with historical brand imagery

Tessellation rules:
- Use irregular triangle meshes/facets to compose mountain planes.
- Facet strokes/fills should use `#07192F`, `#1F2024`, `#064199`, and low-opacity `#D80C0D` accents.
- Red is an accent/glow/signal, not a full red mountain fill.
- Keep far facets larger and lower-contrast; near facets can be sharper/darker.
- Avoid bright low-poly rainbow aesthetics. This should feel like brand geometry, not a stock geometric wallpaper.
- If implemented in canvas, generate deterministic triangles from seeded ridge points so the mountain shape is stable across renders.

### 6.3 Water construction

Water is a bottom-fifth structural layer.

Allowed:
- reflected mountain symmetry
- reflected triangle/logo glow
- soft mist over the reflection line
- calm wave bands

Avoid:
- large water scenes
- crashing/splashy effects unless very subtle at mountain edges
- generic pond/wave animation that ignores mountain reflection
- high-particle fluid simulations

## 7. Journey model

### 7.1 Required first path

The entrance sequence must be:

```text
Landing scene
  subtle nudge copy only
  central triangle/logo click
    -> mountains layer in / aperture opens
       -> role-finding state
          -> role click determines 2D camera point of view
             -> application begins
                -> background progression follows tab/form progress
```

### 7.2 No hero-text-first entrance

The landing must not open with large hero text. Copy is only a small hint/nudge, e.g.:
- `Enter Convergenc3`
- `Begin the C3 journey.`
- `Start your path.`

Keep it secondary to the triangle/logo portal.

### 7.3 Mountain click / aperture step

After logo click, the mountains are not just decorative. They must participate:
- first mountain layer drops/slides away
- second/deeper layer appears
- scene zooms or eases into a role-finding aperture
- this should be cheap: transforms/state interpolation, not heavy physics

### 7.4 Role click as camera decision

Role click/selection sets the 2D camera mode:
- Forge / senior technical: blue/cosmos tilt-up, more sky/stars, lower mountains/water, foreground UI panels carry role details.
- Consulting / business / advisory: high-ridge or summit ascent, stronger red/sunrise emphasis, mountain climb progression.
- Junior/starter/academy: forest valley/base path, warmer onboarding tone, closer mountain/trees.

## 8. Canvas/rendering reglement

### 8.1 Single visible canvas target

Target architecture:
- one visible canvas renderer for the background scene
- internal buffers allowed for scene/reflection/water if needed
- React controls route/state/mode/progress only
- CSS/HTML overlays remain for UI, links, forms, cards, nav

Do not add multiple visible canvases by default. Multiple canvases make mountain/reflection coordination harder and add unnecessary render overhead.

### 8.2 2D camera, not 3D/WebGL

Use a 2D camera model:
- `zoom`
- `panX`
- `panY`
- `skyReveal`
- `starOpacity`
- `mountainDepthShift`
- `poolVisibility`
- `mistOpacity`

No Three.js/WebGL in this stroke.

### 8.3 React/p5 discipline

- Do not update React state every animation frame.
- React sends discrete scene state: route, selected role, journey step, application step.
- The canvas interpolates internally.
- Use `pixelDensity(1)`.
- Cap frame rate around 30fps unless profiling proves otherwise.
- Pause or reduce animation when tab is hidden.
- Respect `prefers-reduced-motion`.
- Canvas is decorative and `aria-hidden`; controls remain DOM.

## 9. Interaction reglement

### 9.1 Motion character

Motion should be premium and slow:
- breathing official-logo pulse: 4–6 seconds, restrained red by default, pronounced C3 red on hover/focus
- pointer glow: eased sunrise/sunset light at the actual hover position, warm and not frantic
- aperture transition: 700–1200ms
- application step progression: subtle layer/depth change per tab
- water: low-alpha bands, 14–24 bands, slow drift

### 9.2 Application progression

For application form tabs, each tab should set a background progression step.

Consulting/high-ridge roles:
- progression climbs upward/deeper into valley/summit
- milestones/path/ridge layers become subtly visible

Forge/senior technical roles:
- progression zooms into blue/cosmos field
- stars/constellation-like foreground accents increase

This must never obscure form legibility.

## 10. Current app review constraints

Current implementation already has:
- `/` landing route
- `/jobs` listings route
- `ValleyBackground`
- `PoolRippleCanvas` with p5
- role `trackMode` metadata
- basic modes: `landing-valley`, `forest-valley`, `high-ridge`, `cosmos-ridge`

Current gaps to correct:
- landing still uses hero text (`Enter the recruitment pipeline`)
- central portal uses current C3 badge image, not the intended red triangle/logo portal
- mountains are still DOM/CSS layers, not a single integrated scene canvas
- p5 only owns pool ripples, not mountain/reflection geometry
- mountain reflection is a generic glow, not actual reflected mountain shape
- logo click goes straight to `/jobs`; it does not yet trigger mountain aperture/role-finding step
- role click changes page/mode but does not yet define a clear 2D camera POV
- application tabs do not yet drive background progression
- nav logo currently routes to `/`; decide whether pipeline nav should return to `/jobs` after entry

## 11. Public-copy rules

Allowed copy direction:
- candidate outcome
- journey/progression
- role path
- capability growth

Avoid public UI language like:
- theme upgrade
- canvas
- p5
- aperture mechanic
- background mode
- cosmos mode
- LinkedIn-style/feed scaffold
- hidden by design

## 12. Promotion rule into DESIGN.md

Only promote from this reglement into `dev/DESIGN.md` when one of these is true:
- brand pack confirms it
- management approves it
- implementation proves the mechanic is cheap, stable, and accessible
- Louis explicitly locks the direction

Until then, this file remains the active staging point for design thinking.
