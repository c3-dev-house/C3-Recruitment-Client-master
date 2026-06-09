# C3 Recruitment Theme Update PRD — Valley Landing + Track Pivot

## 0. Document Control

Output path:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\theme-update-prd.md`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/theme-update-prd.md`

Companion design spec:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\DESIGN.md`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/DESIGN.md`

Primary visual context:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\context\concept.jpeg`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/context/concept.jpeg`

Moodboard context:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\context\image (21).png` through `image (26).png`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/context/image (21).png` through `image (26).png`

Repo root:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master`

## 1. Goal

Add a first-load landing entrance to the C3 recruitment wrapper and retheme the recruitment shell around a valley/mountain/pool scene with a central C3 logo glow.

The first thing a user sees when navigating to the app must be the landing scene. Clicking the central logo proceeds the user into the recruitment pipeline. The rest of the app flow remains the same: browse active roles, inspect a role, create/sign in to candidate profile, apply through the existing application form bridge.

## 2. Product Summary

Final product decisions before implementation:

- Nav logo routes to `/jobs` inside the recruitment pipeline.
- Consulting/business/advisory roles use `high-ridge` mode.
- Do not add track filters yet; keep the existing stream filters.
- Landing uses central logo only; no track chips in this stroke.
- Add explicit `trackMode` metadata per job now.
- No new packages; use existing locked `p5`, with native canvas fallback only if p5 build/import blocks implementation.

Current app state: `/` renders the active listings page directly. The wrapper uses an orbital/cosmos command-interface style with `AetherCanvas` as a background particle layer.

Target state: `/` renders a full-screen valley landing page. The listings pipeline moves behind a route such as `/jobs`. The old orbital/cosmos language becomes a conditional background mode for more experienced/senior role contexts, not the default first impression.

High-level flow:

```text
/ landing entrance
  central C3 logo click
    -> /jobs recruitment pipeline
       -> /jobs/:jobId detail
          -> /signup?redirect=/apply/:jobId when profile missing
             -> /apply/:jobId existing form bridge
```

Keep redirect continuity and legacy application submission behavior intact.

## 3. Required Context for Implementation Agent

Read these before proposing code:

1. `dev/DESIGN.md`
   - Updated valley design system and acceptance bar.
2. `dev/context/concept.jpeg`
   - Sketch showing landing composition: C3 logo top-left/header, search/nav line, valley/mountains, central triangle/logo, reflective pool, mouse sunrise/sunset glow, logo click into next state, mountain layer shift/zoom.
3. `dev/context/image (21).png` through `image (26).png`
   - Moodboard: mountain valleys, red translucent triangular C3 mark, forest edges, starfield/cosmos, sunset/sunrise orange-violet skies, water reflections, stage-like triangular framing.
4. `package.json`
   - Confirms CRA stack and existing `p5` dependency. Do not add dependencies unless explicitly approved.
5. `src/App.js`
   - Current route map. `/` currently points to `ListingsPage`.
6. `src/pages/recruitment/ListingsPage.js`
   - Current listings behavior, filters, active jobs rendering, current `AetherCanvas` usage.
7. `src/components/recruitment/AetherCanvas.js`
   - Existing native canvas background behavior; may be replaced or evolved into the valley background.
8. `src/data/jobs.js`
   - Current role data and stream/experience fields; likely place to add explicit track/background mode metadata.
9. `src/App.css`
   - Current orbital tokens, shell, nav, cards, buttons, responsive rules, reduced-motion handling.
10. `src/pages/recruitment/JobDetailPage.js`, `SignupPage.js`, `ApplyPage.js`
    - Preserve redirect and apply bridge behavior.
11. `src/components/recruitment/OrbitalNav.js`, `JobCard.js`
    - Retheme or minimally adapt navigation/cards.

## 4. Operational Boundaries

This repo is under `/mnt/c` and is Windows/Git Bash owned for Node runtime/install behavior.

Hard boundary:
- Do not run `npm install` from WSL.
- Do not mutate `node_modules` from WSL.
- Do not add a dependency unless Louis approves and runs install from Git Bash.

Allowed from WSL:
- Edit source/docs.
- Read files.
- Run lightweight non-install checks.

Preferred verification if a build/test is needed:

```bash
cmd.exe /C "cd /D C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master && npm run build"
```

If Windows node_modules are absent or stale, report that directly and ask Louis to run from Git Bash:

```bash
cd /c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master
npm install
npm run build
```

## 5. Visual Requirements

### 5.1 Landing Scene

The landing page must be a full-viewport scene:

- Valley/mountain composition fills the background.
- Reflective pool occupies the lower portion of the viewport.
- Central C3 logo/mark sits near visual center, slightly above the pool horizon.
- Central logo has a radial red/ember/sunrise glow.
- Pointer hover creates sunrise/sunset glow at the pointer location.
- Clicking the central logo enters the recruitment pipeline.
- The first navigation to `/` must show this landing, not listings.

### 5.2 Moodboard Translation

Use context images as design input, not literal image assets.

Observed cues to implement:

- Deep night/dusk blue base.
- Orange/coral sunrise and sunset blooms.
- Purple-blue mountain layers for distance.
- Dark foreground silhouettes and forest hints.
- Water reflections and subtle, calm ripples in the bottom fifth of the scene.
- Ripples should read as soothing wave bands, not particles/splashes; the wave fronts respond perpendicular to pointer position.
- Translucent red C3 triangular/logo mark as the beacon.
- Starfield/cosmos available for more experienced roles.
- Stage-prop feeling: mountain panels shift/scale in layers rather than photoreal 3D.

### 5.3 Track Pivot Mechanic

Selecting a track/role should change the background state in the background layer.

Required background states:

```js
const backgroundModes = {
  entrance: "landing-valley",
  starter: "forest-valley",
  consulting: "high-ridge",
  senior: "cosmos-ridge",
};
```

Suggested mapping:

| Mode | Trigger | Visual state |
|---|---|---|
| `landing-valley` | `/` before entry | still valley, central logo beacon, pool reflection |
| `forest-valley` | starter, junior, agentic/AI engineering starter roles | valley continues; mountains/forest move upward; warmer low ridge |
| `high-ridge` | high-value consulting/business/advisory track | ridgeline ascent, warmer dusk, sharper mountain silhouettes |
| `cosmos-ridge` | senior/more-experience technical/data roles | stars/milky-way fade in behind mountains; cooler blue/purple depth |

Do not hard-code these purely in CSS class names spread across unrelated components. Create a small mapping/helper so future role data can control it explicitly.

### 5.4 Existing App Preservation

Do not rewrite the core application machinery.

Must preserve:

- Active jobs only render in listings.
- Role detail page works.
- Signup redirect continuity works.
- Apply page redirects unauthenticated users to signup with redirect param.
- Existing Redux department bridge remains intact.
- Legal/Data Processing routes remain reachable.
- Legacy form submission path remains intact.

## 6. UX Requirements

### 6.1 Landing Entry

Route behavior:

- `/` -> new `LandingPage`.
- Central logo click -> `/jobs` preferred.
- `/jobs` -> current listings experience, rethemed.
- Existing `/jobs/:jobId`, `/signup`, `/apply/:jobId`, `/legal`, `/dataProcessing` remain stable.

Central logo requirements:

- Must be a real `Link` or `button`.
- Accessible label: `Enter C3 recruitment pipeline` or similar.
- Visible focus state.
- Hover/pointer glow may intensify but must not be required for use.

### 6.2 Pipeline/Listings

- Listings should continue to show open roles as cards.
- Existing filters can remain by stream for this stroke unless data is expanded.
- If adding track filters, do not remove stream filtering without explicit product decision.
- Track selection should update the background mode.
- Role card hover can trigger preview background mode if cheap and not distracting.

### 6.3 Copy

Public UI copy must sell outcomes, not the visual treatment.

Allowed copy direction:

- “Enter the C3 recruitment pipeline.”
- “Choose the role path that fits your next move.”
- “Build with senior teams, AI systems, and applied delivery streams.”

Avoid:

- “Valley theme”
- “Pivot mechanic”
- “Background layer”
- “Stage props”
- “p5 ripple”
- “Cosmos mode”

Those are implementation/design terms for docs, not user-facing copy.

## 7. Technical Requirements

### 7.1 Components

Create or modify:

- Create: `src/pages/recruitment/LandingPage.js`
- Create or replace: `src/components/recruitment/ValleyBackground.js`
- Optional create: `src/components/recruitment/TrackPivotLayer.js`
- Create: `src/components/recruitment/PoolRippleCanvas.js` using p5 instance mode.
- Modify: `src/App.js`
- Modify: `src/pages/recruitment/ListingsPage.js`
- Modify: `src/pages/recruitment/JobDetailPage.js` if selected job should control background mode.
- Modify: `src/data/jobs.js` if explicit `trackMode` metadata is added.
- Modify: `src/App.css`
- Modify: `src/components/recruitment/OrbitalNav.js` if nav logo behavior/visuals need adjustment.

Naming note: existing `.orbital-*` class names may remain to reduce churn, but the visual result must match the valley design. If renaming to `.valley-*`, do it systematically and do not break unrelated routes.

### 7.2 Background Implementation

Minimum acceptable implementation:

- CSS layered gradients for sky and mountain silhouettes.
- p5 instance-mode layer for the reflective pool, calm ripples, and optional atmospheric pointer glow.
- Reflective pool must occupy the bottom fifth of the viewport/app scene by default (`20vh` / `20%` of scene height); do not let it dominate the page.
- Ripple motion must be calm/soothing: low amplitude, slow drift, low alpha, 14-24 wave bands.
- Ripple orientation must be perpendicular to mouse/pointer position: compute a smoothed vector from the pool center or pool horizon toward the pointer, derive the normal, and draw the wave-front bands along that perpendicular axis. Pointer movement should rotate/offset the bands gently, not spawn frantic rings.
- CSS transforms for parallax/pivot mountain layers.
- Class or prop-driven mode changes: `landing-valley`, `forest-valley`, `high-ridge`, `cosmos-ridge`.
- Reduced-motion fallback.

No heavy WebGL. No three.js. No fluid simulation. No high-count particles for water.

### 7.3 P5 Guidance

`p5` already appears in `package.json` and `package-lock.json`, so no new dependency is required. Use p5 as the preferred path for the water/ripple layer.

Required p5 approach:

- Implement p5 in React instance mode inside `PoolRippleCanvas.js` or inside `ValleyBackground.js` with a dedicated container ref.
- Use `useEffect` to instantiate the sketch after mount and call `sketch.remove()` on cleanup.
- Set `p.pixelDensity(1)` to avoid retina overdraw.
- Keep p5 canvas `aria-hidden` and `pointer-events: none`; capture pointer data at the background/container level and pass smoothed coordinates into the sketch.
- Keep DOM content, logo, links, cards, and accessible controls outside p5.
- If p5 import/build fails, fall back to native canvas and report that p5 was blocked by build/runtime verification. Do not install from WSL.

Pool/ripple algorithm target:

```js
// conceptual only
const poolHeight = height * 0.20;
const poolTop = height - poolHeight;
const poolCenter = { x: width / 2, y: poolTop + poolHeight * 0.38 };
const pointerVector = normalize(smoothedPointer - poolCenter);
const waveTangent = perpendicular(pointerVector);

// draw 14-24 long low-alpha bands along waveTangent,
// offset slowly by time and pointer distance, with tiny sine curvature.
```

Native canvas is fallback, not the desired first attempt.

### 7.4 State Model

Add helper logic near jobs/background layer:

```js
export function backgroundModeForJob(job) {
  if (!job) return "landing-valley";
  if (job.trackMode) return job.trackMode;

  const text = `${job.title} ${job.stream} ${job.experience}`.toLowerCase();
  if (text.includes("senior") || text.includes("4-7")) return "cosmos-ridge";
  if (text.includes("business") || text.includes("consult")) return "high-ridge";
  return "forest-valley";
}
```

This is acceptable only as a temporary derivation. Better: add explicit `trackMode` to every active role in `src/data/jobs.js`.

### 7.5 Routing

Modify `src/App.js`:

- Import `LandingPage`.
- Change `/` from `ListingsPage` to `LandingPage`.
- Add `/jobs` route for `ListingsPage`.
- Keep `/jobs/:jobId` detail route.

Avoid breaking existing links:

- Any “back to listings” link should point to `/jobs`.
- Landing logo click should point to `/jobs`.
- Nav logo behavior should be deliberate: either `/` for entrance or `/jobs` for pipeline home. Choose one and keep consistent.

## 8. Implementation Plan

### Phase 1 — Acclimate and Report

Objective: confirm current app routes and component structure before editing.

Steps:

1. Read required context files listed in Section 3.
2. Confirm whether `package-lock.json` contains `p5` and whether current source already imports it.
3. Report intended implementation path before changing code:
   - p5 instance-mode import path and cleanup plan
   - native canvas fallback only if p5 build/import verification fails
   - route changes
   - files to create/modify
   - any expected risk to existing flow

Pause/report gate: if p5 is not locked or p5 import/build is blocked, use native canvas fallback for water and report the blocker. Do not install from WSL.

### Phase 2 — Add Landing Route

Objective: make landing first thing the user sees.

Tasks:

1. Create `src/pages/recruitment/LandingPage.js`.
2. Render full-screen scene wrapper and central C3 logo `Link` to `/jobs`.
3. Add accessible label and focus state.
4. Modify `src/App.js` so `/` renders `LandingPage` and `/jobs` renders `ListingsPage`.
5. Update any listings/back links that assumed `/` is listings.

Acceptance:

- `/` no longer renders listings directly.
- Logo click enters `/jobs`.
- Existing `/jobs/:jobId` route still works.

### Phase 3 — Build Valley Background + p5 Pool

Objective: replace/augment orbital background with valley/pool/mountain layer, using p5 for the water where build verification permits.

Tasks:

1. Create `src/components/recruitment/ValleyBackground.js`.
2. Create `src/components/recruitment/PoolRippleCanvas.js` using p5 instance mode.
3. Implement layered markup/CSS for:
   - sky
   - far/mid/near mountains
   - bottom-fifth pool/reflection
   - central glow anchor
   - optional cosmos overlay
4. Implement pointer coordinate tracking for sunrise/sunset radial glow.
5. Implement p5 pool ripples:
   - pool bounds: bottom 20% of scene/viewport
   - wave bands: 14-24
   - motion: calm, low amplitude, slow drift
   - orientation: wave fronts perpendicular to smoothed mouse/pointer vector from pool center/horizon
   - pointer response: eased 600-1000ms, no frantic ring spawning
6. Respect reduced motion by rendering a static pool highlight and skipping p5 animation.
7. Use `aria-hidden` and `pointer-events: none` on decorative layers/canvas.

Acceptance:

- Background reads as valley/mountains/pool without requiring external image files.
- Pointer glow follows mouse.
- Pool is the bottom fifth of the app scene.
- Pool ripple is calm and soothing.
- Ripple bands visibly respond perpendicular to pointer/mouse position.
- Reduced-motion mode is static/readable.

### Phase 4 — Track Pivot State

Objective: make selected role/track affect background mode.

Tasks:

1. Add explicit `trackMode` values to `src/data/jobs.js`, or add `backgroundModeForJob(job)` helper with temporary derivation.
2. Add background mode prop/state to listings and detail pages.
3. On filter/track selection, update mode:
   - starter/junior/agentic/AI engineering -> `forest-valley`
   - consulting/business/advisory -> `high-ridge`
   - senior/more-experience -> `cosmos-ridge`
4. Apply mode class/data attribute to `ValleyBackground`.
5. Animate mountain transforms and cosmos overlay opacity based on mode.

Acceptance:

- Track/role selection visibly changes mountain/cosmos state.
- Background change is smooth but not expensive.
- Cards remain readable in every mode.

### Phase 5 — Retheme Existing Shell

Objective: align existing app shell with the valley design while preserving flow.

Tasks:

1. Update tokens in `src/App.css` to match `dev/DESIGN.md`.
2. Retheme `.orbital-shell`, panels, nav, cards, chips, and buttons using warmer dusk glass/pool/coral-violet values.
3. Keep existing layout widths and responsive behavior.
4. Ensure legal pages still render readably.
5. Avoid public copy that describes the theme mechanics.

Acceptance:

- Listings/detail/signup visually belong to the new valley system.
- Legal/data pages remain usable.
- Existing app behavior is unchanged.

### Phase 6 — Verification

Objective: prove the feature works and flow did not regress.

Required checks:

1. Static/manual route check:
   - `/` shows landing.
   - central logo navigates to `/jobs`.
   - `/jobs` shows active listings.
   - clicking role navigates to detail.
   - apply without profile redirects to signup with redirect param.
   - signup preserves redirect.
2. Accessibility check:
   - keyboard focus reaches central logo.
   - logo has usable accessible name.
   - decorative canvas/layers are aria-hidden.
   - reduced-motion CSS exists.
3. Build check preferred via Windows Node:

```bash
cmd.exe /C "cd /D C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master && npm run build"
```

If build cannot be run because dependencies are absent/stale, report blocker and exact Git Bash command for Louis.

## 9. Acceptance Criteria

The implementation is complete when all of these are true:

- Navigating to `/` shows the new landing entrance, not the listings page.
- Central logo click enters the recruitment pipeline.
- `/jobs` shows existing active role listings.
- Existing detail/signup/apply redirect flow still works.
- Background defaults to valley/mountains/pool with central logo glow.
- Reflective pool occupies the bottom fifth of the viewport/app scene.
- Pointer hover creates warm sunrise/sunset glow.
- p5 pool ripple layer renders calm, low-alpha, slow wave bands.
- Ripple wave fronts respond perpendicular to smoothed mouse/pointer position.
- Track/role selection changes background mode via mountain pivot/zoom/shift.
- Senior/experienced role context can shift toward cosmos behind the mountains.
- Starter/agentic/AI engineering context remains in valley/forest ascent mode.
- Reduced-motion users get a stable static scene.
- No dependency install is performed from WSL.
- No backend or legacy submission machinery is changed.

## 10. Non-goals

- Backend schema changes.
- Authentication backend work.
- Admin portal work.
- Rewriting the application form.
- New package installation from WSL.
- Heavy WebGL/three.js scene.
- Literal map/game UI.
- Public UI copy describing the design mechanics.

## 11. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Background competes with role cards | Increase panel opacity; dim background behind content; keep scene strongest on landing only |
| p5 import/build friction | Try p5 first because it is already locked; implement in instance mode with clean unmount; if import/build fails, fall back to native canvas and report blocker; never install from WSL |
| Route change breaks old `/` links | Add clear `/jobs` listings route; consider redirect compatibility only if needed |
| Track taxonomy is unclear | Add explicit `trackMode` metadata in `jobs.js`; preserve current stream filters until product taxonomy is formalized |
| Motion feels gimmicky | Slow pulse, low ripple count, reduced-motion fallback, no layout reflow |
| Legal pages become hard to read | Keep strong glass surfaces and test legal routes after token update |

## 12. Open Questions

These should not block the first scaffold, but implementation should preserve room for them:

1. Should nav logo return users to `/` landing or `/jobs` pipeline home after entry?
   - Recommended: nav logo -> `/jobs` inside pipeline; separate “Entrance” link only if needed.
2. Should high-value consulting be classified as `high-ridge` or `cosmos-ridge`?
   - Recommended: `high-ridge` unless role seniority/experience clearly warrants cosmos.
3. Should track filters replace stream filters or sit above them?
   - Recommended: keep current stream filters for first stroke; add background mode derived from role/filter until taxonomy is explicit.
4. Should the landing include track chips or only the central logo entry?
   - Recommended: central logo first; optional small track chips only if they do not weaken the entrance.

## 13. Suggested Starter Prompt for Implementation Agent

Use this if launching a fresh implementation session:

```text
You are implementing the C3 Recruitment Theme Update in C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master.

First read:
- dev/theme-update-prd.md
- dev/DESIGN.md
- dev/context/concept.jpeg
- dev/context/image (21).png through image (26).png
- package.json
- src/App.js
- src/pages/recruitment/ListingsPage.js
- src/components/recruitment/AetherCanvas.js
- src/data/jobs.js
- src/App.css

Operational boundary: this is a Windows/Git Bash Node repo under /mnt/c. Do not run npm install from WSL. No new dependencies are needed.

Report first before editing: p5 instance-mode path and cleanup plan, native canvas fallback only if p5 import/build fails, files to create/modify, route changes, risks.

Then implement:
1. LandingPage at / with central C3 logo link to /jobs.
2. /jobs route for existing listings.
3. ValleyBackground with valley/mountains/pool, pointer sunrise/sunset glow, central logo glow, reduced-motion fallback.
4. PoolRippleCanvas using p5 instance mode: bottom-fifth reflective pool, calm low-alpha wave bands, ripple fronts perpendicular to smoothed mouse/pointer vector, no splash/particle turbulence.
5. Track/background modes for forest-valley, high-ridge, cosmos-ridge.
6. Retheme shell tokens/panels without changing existing application flow.
7. Verify /, /jobs, /jobs/:jobId, signup redirect, apply redirect, legal/data pages, and build if possible via Windows Node.
```
