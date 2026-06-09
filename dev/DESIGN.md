# C3 Recruitment Valley Design System

Source context:
- Primary concept sketch: `dev/context/concept.jpeg`
- Moodboard references: `dev/context/image (21).png` through `dev/context/image (26).png`
- Prior baseline: `Context/stitch_ouros_cosmic_presentation_deck/orbital/DESIGN.md`

Target stack: Create React App, React Router v6, Redux Toolkit, MUI v5, Tailwind directives already present, plain CSS/global CSS, existing `p5` dependency already listed in `package.json`.

Operational boundary: this repo lives under `/mnt/c` and is Windows/Git Bash owned for Node installs. Do not run `npm install` from WSL. If dependency changes are ever required, edit package files only and let Louis run install from Git Bash. For this theme stroke, no new dependency is required because `p5` is already present.

## Intent

The recruitment wrapper must open as an entrance, not a list. The first screen is a full-background valley landing scene with a central C3 logo mark acting as the portal into the recruitment pipeline. A logo click proceeds the user from the landing entrance into the valley/listings pipeline. The existing application flow after entry remains intact: browse/select role, create profile or authenticate, apply through the existing form bridge.

The design direction shifts from pure orbital cockpit to staged valley journey:

- Landing: theatrical mountain valley, reflective pool, central logo glow, sunrise/sunset pointer light.
- Pipeline/listings: same valley world continues, with track selection causing mountain-layer shifts/zoom/pivot mechanics.
- Starter / agentic / AI engineering track: stays in the valley, moves upward through forested mountain layers.
- High-value consulting / senior track: can keep the valley structure but moves toward higher ridgelines and deeper twilight.
- More experienced / senior-technical roles: background pivots toward cosmos over the mountains, preserving the mountain silhouettes while reintroducing orbital/aether depth.

The wrapper should feel premium, high-signal, and cinematic without becoming heavy. The background is implicit storytelling; UI copy still sells roles and outcomes, not the theme.

## Visual Thesis

The app is a guided ascent through a valley into a role pipeline:

1. The user arrives at a still valley stage.
2. The central C3 logo pulses like a sunrise/sunset beacon over water.
3. Mouse hover paints local warm light at the pointer location.
4. Clicking the logo enters the pipeline.
5. Choosing a role track pivots the scene: mountain props slide/scale like stage flats, the reflective pool ripples, and the sky shifts from warm valley to forest twilight or cosmos depending on track/experience.

This is not a literal game map. It is a recruitment shell with a cinematic background layer.

## Tokens

```css
--c3-bg: #070812;
--c3-bg-2: #101426;
--c3-surface: rgba(10, 13, 24, 0.68);
--c3-surface-strong: rgba(19, 23, 38, 0.88);
--c3-line: rgba(255, 194, 151, 0.24);
--c3-line-strong: rgba(255, 111, 72, 0.62);
--c3-red: #d80c0d;
--c3-red-hot: #ff5540;
--c3-sunrise: #ffb36b;
--c3-sunset: #f06a58;
--c3-ember: #ff7a3d;
--c3-dusk: #2b214b;
--c3-violet: #8b7cff;
--c3-cosmos: #121b3d;
--c3-cyan: #79d9ff;
--c3-forest: #143327;
--c3-forest-glow: #59d88f;
--c3-pool: #172b4d;
--c3-pool-light: #7ad8ff;
--c3-mountain-near: #171a2f;
--c3-mountain-mid: #25204a;
--c3-mountain-far: #39437a;
--c3-text: #f7f3f0;
--c3-muted: #c9d0df;
--c3-radius: 14px;
--c3-radius-sm: 8px;
--c3-shadow-red: 0 0 36px rgba(216, 12, 13, 0.32);
--c3-shadow-sunrise: 0 0 46px rgba(255, 143, 82, 0.34);
--c3-shadow-pool: 0 0 42px rgba(122, 216, 255, 0.18);
```

## Palette

- **Base night**: near-black blue (`#070812`, `#101426`) remains the structural app background.
- **Mountain depth**: near mountains use blue-black/purple; mid mountains use muted violet; far mountains use desaturated blue-violet. The layers must read like flat stage props moving at different parallax rates.
- **Sunrise/sunset light**: warm coral, amber, and ember colors are interaction glows, logo bloom, and pointer highlights.
- **Pool/reflection**: dark blue reflective surface with cyan/sunrise glints and low-opacity ripple rings.
- **Forest implicit layer**: deep green appears in the valley/early track state, mostly as shadowed slopes/edges rather than literal illustrated trees unless the implementation can keep it subtle.
- **Cosmos state**: restores starfield/milky-way cues for more experienced roles, but it should sit behind the mountain silhouettes rather than replacing the valley scene entirely.
- **C3 red**: remains the conversion and brand signal. Use it for logo mark, primary CTAs, active track/role state, and high-emphasis hover only.

## Typography

- Display / headings: Montserrat fallback stack, strong negative tracking for hero-level text.
- Body: Inter fallback stack.
- Telemetry / small labels: JetBrains Mono fallback stack for route IDs, track labels, status, and counts.

No new font package is introduced. Use current imports/fallbacks unless brand font loading is formalized.

## Layout

### Landing entrance

- Route `/` must render the landing entrance first.
- The landing is full viewport, background-first, with minimal UI chrome.
- Central click target is the C3 logo/mark, vertically centered slightly above the reflective pool horizon.
- Primary action: click/pulse logo to enter the pipeline.
- Secondary actions may appear as small track chips or text below the logo, but must not crowd the scene.
- The reflective pool occupies the bottom fifth of the viewport/app scene (`20vh` / `20%`) so it reads as a calm foreground water body without swallowing the landing.
- Mountain layers frame the left/right sides and converge toward the central mark.

### Pipeline/listings shell

- Move the existing listings route to `/jobs` or equivalent while keeping its component behavior.
- After landing entry, render the existing nav/listings/cards/form flow with the new valley background layer behind it.
- Keep `max-width: 1180px` content containment.
- Existing `.orbital-shell`, `.orbital-nav`, `.orbital-panel`, `.orbital-card` primitives can be retained but visually re-themed as `valley-shell`/background state if implementation wants cleaner naming.
- Avoid rewriting the legacy application form. Only theme the wrapper/context if safe.

## Background System

The new background is a first-class component, not a decorative CSS gradient.

Recommended component names:

- `ValleyBackground`
- `LandingPage`
- optional `TrackPivotLayer`
- `PoolRippleCanvas`

### Layers, back to front

1. **Sky gradient**: dusk blue/purple base with warm sunrise/sunset radial glow.
2. **Cosmos overlay**: low-opacity stars/milky-way only when state is `cosmos` or route/role indicates senior/experienced track.
3. **Far mountains**: blue/purple silhouettes, slowest parallax, lowest contrast.
4. **Mid mountains**: stronger purple/blue silhouettes, track-dependent horizontal/scale shift.
5. **Near slopes / forest edges**: dark foreground framing, subtle green hints for valley/forest state.
6. **Central C3 logo glow**: red/ember triangular/logo bloom at scene focus.
7. **Reflective pool**: bottom layer reflecting logo/sky colors with ripple distortion.
8. **Pointer glow**: warm radial sunrise/sunset light follows mouse hover and blends into sky/pool.
9. **UI glass panels**: route/listing cards above background.

### P5 / canvas behavior

Use p5 as the preferred implementation path for the water and atmospheric layer. `p5` already exists in `package.json` and `package-lock.json`, so no new dependency should be added. Implement p5 in React instance mode, mounted inside `ValleyBackground` or a dedicated `PoolRippleCanvas`, and remove the sketch cleanly on unmount.

Native canvas is fallback only if p5 import/build verification fails. Do not run `npm install` from WSL to force p5 availability.

Required behavior:

- Pointer coordinates drive a warm radial glow at the pointer location.
- Central logo pulses subtly with red/ember/sunrise bloom.
- Reflective pool occupies the bottom fifth of the viewport/app scene (`20vh`, clamped only for very small screens if needed).
- Pool ripples are calm, soothing, and slow: low-amplitude wave bands, no splashy particles, no turbulent fluid simulation.
- Ripples should be perpendicular to the mouse/pointer position: treat the pointer as a soft force line/normal and draw wave fronts across the pool at roughly 90° to the vector from the pool center/horizon to the pointer. As the pointer moves left/right, ripple bands gently rotate/offset rather than chasing like particles.
- Ripple density target: 14-24 horizontal/curved wave bands, very low alpha, 20-40s ambient drift; pointer influence eases over ~600-1000ms.
- Pool reflection should catch the central logo glow and sunrise/sunset pointer glow using low-opacity amber/cyan strokes.
- Mountain layers shift/scale on track selection to create a stage-prop pivot/zoom effect.
- Reduced-motion users get static gradient, static mountains, no animated ripples/parallax.
- Canvas is `aria-hidden` and never blocks pointer events.

p5 implementation constraints:

- Use instance mode only; no global p5 sketch pollution.
- Set `p.pixelDensity(1)` and disable friendly errors before production sketch work when possible.
- Use one p5 canvas for the pool/atmospheric layer, not one canvas per card/panel.
- Keep DOM text, links, cards, and logo controls outside the p5 canvas for accessibility.
- Canvas dimensions must follow the component bounds; derive pointer coordinates from `getBoundingClientRect()`, not raw global coordinates.

### Track states

Use a small explicit state model rather than ad-hoc route checks:

```js
const backgroundModes = {
  entrance: "landing-valley",
  starter: "forest-valley",
  consulting: "high-ridge",
  senior: "cosmos-ridge",
};
```

Suggested mapping:

- Landing/no selection: `landing-valley`
- Starter engineering / junior / agentic AI introduction roles: `forest-valley`
- Consulting / business / high-value advisory roles: `high-ridge`
- Senior technical / senior data / high-experience roles: `cosmos-ridge`

If job data does not yet contain explicit track metadata, derive a temporary mode from `stream`, `experience`, and title keywords, then add a PRD task to make the mapping explicit in `src/data/jobs.js`.

## Components

### Landing page

- Full-screen scene.
- Central C3 logo/mark as the primary button/link.
- Logo click navigates into the pipeline (`/jobs` preferred).
- Optional helper copy: short, outcome-led, no design/meta language.
- Optional track preview chips below logo: Starter Engineering, Consulting, Senior Technical.
- Keyboard accessible: central logo must be a real `Link` or `button` with visible focus state.

### Valley navigation

- Reuse `OrbitalNav` structure, but retheme glass to warmer low-opacity dusk surface.
- Logo in nav should return to landing or listings consistently; avoid dead logo behavior.
- Keep legal links and signup access.

### Listings page

- Keep active-role filtering behavior.
- Add/rename track filters if needed, but do not break current streams unless data supports the new taxonomy.
- Track selection should update background mode and optionally scroll/pivot the mountain layers.
- Cards remain readable over the background; increase surface opacity if the scene competes with content.

### Job detail

- Inherit selected job background mode.
- Preserve back-to-listings behavior.
- Preserve profile/apply redirect continuity.

### Signup / Apply

- Signup can inherit warm valley/cosmos wrapper.
- Apply page may retain the legacy white form shell if retheming risks breaking the existing submission path.
- The current form flow is not part of this theme update except for wrapper/context continuity.

## Motion and Glow

- Landing logo pulse: 4-6s slow breathing cycle. Avoid rapid beacon blinking.
- Pointer glow: radial gradient in sunrise/sunset hues at pointer location; stronger near logo/pool, weaker over panels.
- Pool ripple: the pool is the bottom fifth of the app/viewport. Use calm, slow p5 wave bands rather than splash particles. Draw ripple fronts perpendicular to mouse/pointer position: compute a smoothed pointer vector from pool center/horizon, derive its normal, and render low-alpha wave bands along that normal so the water quietly responds to where the mouse is without looking agitated.
- Mountain pivot: `transform: translate3d(...) scale(...)` per layer; no layout reflow animation.
- Cosmos transition: fade starfield in while keeping mountains visible.
- Respect `prefers-reduced-motion` completely.

## Assets

Existing app assets:

- `/branding/logos/Full Lockup-White.png`
- `/branding/logos/Full Lockup-Black.png`
- `/branding/logos/Badge-White.png`
- `/branding/logos/Badge-Black.png`

Landing recommendation:

- Use the badge/triangular mark for the central portal if it reads cleanly at large size.
- Use full lockup in nav only.
- Do not rasterize the concept sketch into the app. Implement it as procedural/CSS/canvas layers informed by the sketch and moodboard.

## Accessibility

- Landing logo is a real focusable control with text alternative such as `Enter C3 recruitment pipeline`.
- Canvas and decorative mountain layers are `aria-hidden`.
- All interaction remains possible without pointer movement.
- Reduced-motion disables pulse/ripples/parallax and uses static backgrounds.
- Preserve semantic headings and links.
- Ensure panel text contrast remains readable over warm/cosmos backgrounds; raise panel opacity before lowering text contrast.

## Implementation Non-goals

- No backend schema changes.
- No replacement of legacy submit thunks.
- No admin portal work.
- No WSL `npm install`.
- No heavy WebGL/three.js scene.
- No literal game/path UI unless separately requested.
- No public copy that talks about “theme”, “pivot mechanic”, “background layer”, or other implementation concepts.

## Acceptance Bar

The update is successful when:

- Navigating to `/` shows the landing entrance first.
- Clicking the central C3 logo enters the recruitment pipeline.
- Existing browse/detail/signup/apply flow still works.
- Background defaults to valley with central logo glow and reflective pool.
- Pointer hover creates sunrise/sunset glow at pointer location.
- Track/role selection changes background state through mountain layer shift/zoom/pivot.
- Experienced/senior role context can transition toward cosmos while keeping mountain depth.
- Reduced-motion fallback is stable and readable.
- No new install is required from WSL.
