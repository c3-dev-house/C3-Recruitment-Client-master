# C3 Recruitment Theme Upgrade PRD — Triangle Portal + Single-Canvas Mountain Journey

## 0. Document control

Output path:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\theme-upgrade-prd.md`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/theme-upgrade-prd.md`

Companion design reglement:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\theme-upgrade-design-reglement.md`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/theme-upgrade-design-reglement.md`

Transcript digest:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\theme-upgrade-transcript-summary.md`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/theme-upgrade-transcript-summary.md`

Prior notes:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\theme-upgrade-notes.md`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/theme-upgrade-notes.md`

Brand notes:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\context\design stack.pdf`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/context/design stack.pdf`

Existing design doc:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\DESIGN.md`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/DESIGN.md`

## 1. Goal

Upgrade the current C3 recruitment theme from a promising first-pass valley landing into a brand-aligned, low-overhead mountain journey system.

The next implementation must keep the existing working recruitment flow, but change the experience architecture:

```text
Landing scene
  central triangle/logo portal click
    -> mountain aperture transition / role-finding state
       -> role click sets 2D camera POV
          -> application begins
             -> each application tab progresses the background journey
```

The scene must remain performant: one visible canvas/background renderer, no heavy WebGL/Three.js, no excessive DOM/canvas layering, no React state updates every animation frame. The background plate must stay fixed/sticky behind scrolling content and preserve a 16:9 landscape composition so entering the journey does not feel like the background container resized or zoomed.

## 2. Product summary

Current app version already includes meaningful groundwork:
- `/` renders `LandingPage`.
- `/jobs` renders `ListingsPage`.
- `ValleyBackground` exists.
- `PoolRippleCanvas` uses existing `p5` dependency in instance mode.
- `jobs.js` has explicit `trackMode` metadata.
- Role modes exist: `landing-valley`, `forest-valley`, `high-ridge`, `cosmos-ridge`.

But the current version is not yet the target:
- landing is still hero-text-first
- central click target is current badge image, not the intended red triangle/logo portal
- mountain layers are CSS/DOM, not a unified scene renderer
- mountains do not yet use C3-inspired triangle tessellation/facet geometry
- p5 only handles pool ripples
- mountain reflection is not geometry-based
- logo click does not yet layer in/open mountains before role selection
- role selection does not yet define a clear 2D camera point of view
- application tabs do not yet control background progression

This PRD supersedes `dev/theme-update-prd.md` for the next theme stroke while preserving its useful routing and p5 guidance.

## 3. Required context for implementation agent

Read before proposing code:

1. `dev/theme-upgrade-prd.md`
   - This PRD.
2. `dev/theme-upgrade-design-reglement.md`
   - Active brand/design rules for this theme upgrade.
3. `dev/theme-upgrade-transcript-summary.md`
   - Meeting-derived critiques and direction.
4. `dev/theme-upgrade-notes.md`
   - GPT notes on React + p5 + CSS overlay architecture and single visible canvas logic.
5. `dev/context/design stack.pdf`
   - Brand palette, typography, logo-shape, imagery, and simplification notes.
6. `dev/DESIGN.md`
   - Existing design system; do not blindly overwrite. Promote stable reglement decisions later.
7. `package.json` and `package-lock.json`
   - Confirm existing `p5`. No new dependencies in this stroke.
8. `src/App.js`
   - Current route map.
9. `src/pages/recruitment/LandingPage.js`
   - Current landing; must remove hero-text-first behavior.
10. `src/components/recruitment/ValleyBackground.js`
    - Current background wrapper; likely evolves into single-scene state container.
11. `src/components/recruitment/PoolRippleCanvas.js`
    - Current p5 pool implementation; useful pattern but not enough for full scene.
12. `src/pages/recruitment/ListingsPage.js`
    - Current role/filter pipeline and background mode assignment.
13. `src/pages/recruitment/JobDetailPage.js`
    - Current selected-role mode and apply path.
14. `src/data/jobs.js`
    - Current `trackMode` metadata.
15. `src/App.css`
    - Current global theme and CSS mountain layers.
16. `src/components/recruitment/OrbitalNav.js`
    - Logo/nav route behavior and legal links.
17. Application form/stepper files:
    - `src/components/FormStepper.js`
    - `src/components/FormStepperControl.js`
    - `src/pages/DevForm.js`
    - relevant `Form*` components
    - Goal: identify how application tab/step state can set background progress without rewriting the legacy form.

## 4. Operational boundaries

This repo is under `/mnt/c` and is Windows/Git Bash owned for Node runtime/install behavior.

Hard boundary:
- Do not run `npm install` from WSL.
- Do not mutate `node_modules` from WSL.
- Do not add dependencies unless Louis explicitly approves and runs install from Git Bash.

Allowed from WSL:
- Edit source/docs.
- Read files.
- Run git/status/static inspection.

Preferred build verification if needed:

```bash
cmd.exe /C "cd /D C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master && npm run build"
```

If Windows `node_modules` are stale or platform-poisoned, report directly and give Louis the Git Bash command:

```bash
cd /c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master
npm install
npm run build
```

## 5. Brand alignment requirements

The implementation must follow `dev/theme-upgrade-design-reglement.md`.

Key requirements pulled from brand stack and transcript:

- Mountain/night-sky is the core visual direction.
- Space/cosmos is constrained to Forge/senior technical contexts and must remain behind mountain identity.
- Primary brand colours:
  - Convergenc3 Blue Dark `#064199`
  - Convergenc3 Red Dark `#D80C0D`
  - Overlay Blue `#07192F`
  - Midnight Black `#1F2024`
  - Pebble White `#F1F1F1`
- Avoid true black/white if brand black/white works.
- Use 20% tint discipline where relevant.
- Typography baseline: Inter for body/UI; League Spartan may become heading direction but should not be dependency-added without approval.
- Use triangle/polygon geometry from logo shapes; prefer straight/angular forms.
- Use C3-inspired triangle tessellations/facets to construct mountain planes where feasible.
- Keep tessellated mountain hues restrained: Overlay Blue `#07192F`, Midnight Black `#1F2024`, Convergenc3 Blue Dark `#064199`, and low-opacity Convergenc3 Red Dark `#D80C0D` accents/glints.
- Do not make purple or water the dominant identity.
- External message alignment: Transform • Optimise • Grow.
- Unified C3 identity; recruitment must not feel like a separate brand.

## 6. UX requirements

### 6.1 Landing entrance

Current landing must be changed.

Required target:
- Full viewport visual scene.
- No large hero headline.
- No large paragraph-led hero block.
- Central red triangle/logo portal is the primary visual and interaction target.
- The central portal must read as red C3 triangle geometry, not as the current badge/lockup image.
- Only subtle helper copy appears below/near the portal.
- The helper copy must be small and non-dominant.
- Central portal must be a real `Link` or `button`.
- The official logo pulses with a restrained red C3 glow by default; hover/focus increases C3 red glow and turns the `Enter Convergenc3` text C3 red.
- Pointer hover over the scene should create a local sunrise/sunset glow at the pointer location.
- Accessible label: `Begin C3 recruitment journey` or equivalent.
- Visible keyboard focus state.

Suggested copy:
- `Enter Convergenc3`
- `Begin the C3 journey.`
- `Start your path.`

Avoid:
- `Enter the recruitment pipeline` as a large headline.
- Copy describing theme/canvas/background mechanics.

### 6.2 First journey step: logo click

The first journey step is not direct role browsing only. It is the portal action.

On central triangle/logo click:
- trigger a short aperture transition
- mountain layers open/drop/slide away
- deeper mountains layer in
- route or state advances into role-finding state

Implementation options:
1. Same-route state transition then navigate to `/jobs` after animation.
2. Navigate to `/jobs?entered=1` and play role-finding entrance there.

Recommended: option 1 if simple; option 2 if React Router/state makes it less fragile.

### 6.3 Mountain / aperture role-finding state

After the logo click, the background should make the role-finding space feel newly revealed:
- near mountain layer pulls away
- mid/far layers become more visible
- central aperture opens around the triangle geometry
- role cards/filters appear as foreground UI

This must be cheap: canvas interpolation and/or CSS transforms, not heavy physics.

### 6.4 Role click determines 2D camera POV

Role click/selection sets a scene camera target.

Required 2D camera model:

```js
{
  zoom: number,
  panX: number,
  panY: number,
  skyReveal: number,
  starOpacity: number,
  mountainDepthShift: number,
  poolVisibility: number,
  mistOpacity: number,
  paletteMode: "landing" | "forest" | "high-ridge" | "cosmos"
}
```

Mapping:

| Role family | Background/camera behavior |
|---|---|
| Forge / senior technical / senior data | Blue/cosmos, tilt up, more sky/stars, less water, mountains lower in frame, role details foreground |
| Consulting / business / advisory | High-ridge/summit, red/sunrise emphasis, mountains climbed, valley depth increases |
| Junior / starter / academy | Forest-valley/base path, warmer onboarding, closer slopes/trees, gentler motion |

### 6.5 Application progression

Once application begins, each tab/step must set a background progress state.

Consulting/high-ridge roles:
- mountains are climbed
- valley depth increases
- path/milestone cues can appear subtly
- summit metaphor is primary

Forge/senior technical roles:
- zoom moves upward/deeper into blue/cosmos
- stars/constellation accents increase subtly
- mountains remain visible as lower silhouette

For all roles:
- form legibility wins over background drama
- progression is subtle and slow
- no animation should block form interaction
- reduced motion uses static progress states

## 7. Technical requirements

### 7.1 Render architecture

Target stack:

```text
React
  owns route, selected role, journey step, application step

Single visible p5/canvas scene
  draws sky, stars, mountains, mist, triangle-glow/reflection, pool
  interpolates camera internally

CSS / DOM overlays
  nav, cards, forms, links, subtle helper copy, focus states
```

Requirement:
- Use one visible canvas for the background scene if feasible. The visible background must be fixed to the viewport and rendered as a 16:9 landscape plate using cover/crop behavior, not stretched to page height.
- Internal `p5.Graphics` buffers are allowed for reflection/water composition.
- Do not add multiple visible canvases unless a measured blocker proves it necessary.
- Keep DOM/UI outside the canvas.

### 7.2 No heavy renderer upgrade yet

Explicit non-goals for this stroke:
- no Three.js
- no React Three Fiber
- no WebGL shader water
- no fluid simulation
- no high-particle effect system
- no dependency additions

The desired effect is a 2D camera/stage-flat illusion, not real 3D.

### 7.3 Component direction

Expected create/modify targets:

- Modify: `src/pages/recruitment/LandingPage.js`
  - remove hero heading/lede dominance
  - use central triangle/logo portal
  - trigger aperture transition before role-finding

- Modify/create: `src/components/recruitment/ValleyBackground.js`
  - accept `mode`, `journeyStep`, `cameraTarget`, `applicationProgress`, `selectedRoleFamily`
  - stop using React state per animation frame
  - pass state into scene renderer

- Create or evolve: `src/components/recruitment/ValleySceneCanvas.js`
  - single visible p5/canvas scene target
  - draw mountains/sky/mist/pool/reflection in one renderer
  - mountains should use deterministic triangular tessellation/facet fills where feasible
  - may absorb `PoolRippleCanvas` behavior

- Modify or deprecate: `src/components/recruitment/PoolRippleCanvas.js`
  - keep as fallback/reference only if full scene extraction is too large for this stroke
  - if kept, document that it is transitional

- Modify: `src/pages/recruitment/ListingsPage.js`
  - consume role-finding/aperture state
  - role hover/click may set preview/background mode if cheap

- Modify: `src/pages/recruitment/JobDetailPage.js`
  - selected role sets camera POV through `backgroundModeForJob` plus richer camera target

- Modify: `src/data/jobs.js`
  - preserve explicit `trackMode`
  - add optional `roleFamily` or `cameraMode` if needed; avoid brittle keyword inference

- Modify: form/stepper components only enough to emit step/progress metadata
  - avoid rewriting legacy form/submission flow

- Modify: `src/App.css`
  - remove/retire hero-text-first landing styles
  - align tokens to reglement
  - preserve readability and legal-page usability

### 7.4 Scene renderer behavior

The scene renderer must support:

- `landing-valley`
  - still valley, central triangle portal, low pool, mist, mountain frame

- `role-finding`
  - aperture opened, deeper mountains visible, role UI foreground

- `forest-valley`
  - closer slopes/forest hints, warm onboarding, lower camera

- `high-ridge`
  - mountain climb/summit, red/sunrise emphasis, sharper ridgelines

- `cosmos-ridge`
  - blue/cosmos tilt up, stars behind mountains, mountain silhouettes retained

Suggested target values:

```js
const sceneTargets = {
  landing: { zoom: 1.0, panY: 0, skyReveal: 0.42, starOpacity: 0.08, poolVisibility: 1.0, mistOpacity: 0.45 },
  roleFinding: { zoom: 0.92, panY: -0.04, skyReveal: 0.50, starOpacity: 0.14, poolVisibility: 0.88, mistOpacity: 0.55 },
  forest: { zoom: 1.08, panY: 0.03, skyReveal: 0.38, starOpacity: 0.06, poolVisibility: 0.72, mistOpacity: 0.62 },
  highRidge: { zoom: 0.96, panY: -0.08, skyReveal: 0.58, starOpacity: 0.18, poolVisibility: 0.55, mistOpacity: 0.50 },
  cosmos: { zoom: 0.78, panY: -0.18, skyReveal: 0.76, starOpacity: 0.86, poolVisibility: 0.32, mistOpacity: 0.32 }
};
```

These are implementation starting points, not visual law.

### 7.5 Reflection/mist requirements

Reflection must become more brand-aligned:
- reflect mountain silhouettes and central triangle glow, not just a generic radial pool glow
- keep pool in bottom fifth or smaller on dense pages
- add low mist/cloud at mountain-water horizon if cheap
- water bands remain calm and low alpha

### 7.6 Performance budget

Targets:
- one visible canvas
- `pixelDensity(1)`
- cap around 30fps
- no React state updates from `requestAnimationFrame`
- animation pauses/reduces on hidden tab
- low object allocation in draw loop
- canvas resizes only on real resize
- reduced motion disables continuous animation

Implementation should include a short note in comments or docs on how frame/render overhead is controlled.

## 8. Phased implementation plan

### Phase 1 — Acclimate and report

Objective: verify current code state and report exact implementation plan before editing.

Steps:
1. Read required context in Section 3.
2. Confirm current route/component state.
3. Confirm `p5` is locked and imported successfully in existing source.
4. Identify form stepper state source.
5. Report:
   - whether full scene canvas can absorb current CSS/pool layers in this stroke
   - exact files to modify/create
   - fallback if full scene canvas is too large
   - build/test verification plan

Pause gate: if p5 import/build is broken, do not install. Report and use native canvas fallback only if needed.

### Phase 2 — Landing correction

Objective: make the entrance triangle/logo-first.

Tasks:
1. Remove hero `h1`/large lede dominance from `LandingPage`.
- Replace current central badge hero with the extracted official Convergenc3 triangle logo asset from `public/branding/logos/Full Lockup-White.png`; do not use a custom CSS/SVG approximation.
3. Use small nudge copy only.
4. Add focus/hover states that do not rely on motion.
5. Add state for portal click transition.
6. Ensure keyboard activation works.

Acceptance:
- landing is no longer hero-text-first
- central triangle/logo is the first visual element
- click/keyboard activation starts journey

### Phase 3 — Aperture / role-finding transition

Objective: logo click layers in/open mountains before role selection.

Tasks:
1. Add `journeyStep` or route/query state for `landing -> roleFinding`.
2. Animate mountain aperture open/drop/slide.
3. Delay or coordinate navigation to `/jobs` if needed.
4. Ensure `/jobs` can render role-finding state when entered from landing.
5. Preserve direct `/jobs` load with a sane default role-finding state.

Acceptance:
- central portal click visibly opens/layers mountains
- role-finding state appears after transition
- direct `/jobs` remains usable

### Phase 4 — Single visible scene canvas

Objective: consolidate background drawing into one visible scene renderer.

Tasks:
1. Create/evolve `ValleySceneCanvas`.
2. Move sky/stars/mountains/mist/pool/reflection into the scene canvas if feasible.
3. Use internal buffers for reflection if useful.
4. Keep cards/forms/nav outside canvas.
5. Preserve current p5 pool ripple behavior as part of renderer.
6. Add reduced-motion static rendering.
7. Retire duplicated DOM/CSS mountain layers only after scene parity exists.

Acceptance:
- one visible background canvas renders main scene
- no excessive DOM mountain layer stack remains unless transitional and documented
- mountain reflection is geometry-informed
- scene responds to mode/camera target

### Phase 5 — Role camera POV

Objective: role click/selection sets 2D camera target.

Tasks:
1. Add `roleFamily`/`cameraMode` metadata if current `trackMode` is not expressive enough.
2. Map role families to camera targets.
3. Listings hover/selection may preview mode if cheap.
4. Detail page sets camera mode from selected role.
5. Ensure foreground UI remains readable in every mode.

Acceptance:
- Forge/senior roles tilt into blue/cosmos
- consulting/business roles climb high-ridge/summit
- junior/starter roles stay closer in forest valley
- cards/detail UI readable in all states

### Phase 6 — Application background progression

Objective: form tabs drive background progression.

Tasks:
1. Inspect `FormStepper` and form state ownership.
2. Add a lightweight progress signal from current step to background wrapper.
3. Map step index to background progression.
4. Consulting roles deepen/climb valley.
5. Forge roles zoom into cosmos.
6. Preserve legacy form submission path.
7. Do not retheme white form internals unless safe; wrapper/context progression is first priority.

Acceptance:
- each application tab changes background state subtly
- no form logic regression
- no submission-path rewrite

### Phase 7 — Brand/token cleanup

Objective: align CSS tokens/copy with reglement.

Tasks:
1. Align token names/values to brand stack and permitted extensions.
2. Reduce purple dominance.
3. Use Overlay Blue/Midnight Black/Pebble White discipline.
4. Ensure C3 red is portal/CTA signal.
5. Replace public implementation-meta copy.
6. Keep legal pages readable.

Acceptance:
- visual language matches mountain/night-sky brand
- no arbitrary palette drift
- no implementation/theme copy in public UI

### Phase 8 — Verification

Required manual/static checks:
- `/` shows triangle/logo-first landing, no large hero text.
- keyboard focus reaches portal.
- portal click opens/layers mountains.
- role-finding state appears.
- `/jobs` direct load works.
- role click opens detail and sets camera POV.
- `/jobs/:jobId` works for all active roles.
- apply unauthenticated redirects to signup with redirect param.
- application stepper changes background progression without breaking forms.
- legal/data processing routes remain readable.
- reduced motion produces stable non-animated scene.

Preferred build:

```bash
cmd.exe /C "cd /D C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master && npm run build"
```

## 9. Acceptance criteria

The upgrade is complete when:

- Landing has no large hero text.
- Central triangle/logo portal is the primary and first interaction.
- Current C3 badge image is not used as the central hero artifact.
- Central landing portal uses the extracted official Convergenc3 triangle logo asset.
- Small nudge copy is present and secondary.
- Logo click triggers a visible mountain aperture/layer-in transition while the fixed 16:9 background plate keeps the same size/composition.
- Role-finding state appears after the portal transition.
- Background is one visible canvas renderer or a documented transitional renderer with no massive overhead.
- Scene uses 2D camera model, not WebGL/Three.js.
- Role click determines POV:
  - Forge/senior technical -> blue/cosmos tilt-up
  - consulting/business -> mountain climb/high-ridge
  - junior/starter -> forest valley/base path
- Application tabs/progress update background journey state.
- Mountain reflection and mist are more brand-aligned than generic water glow.
- Existing browse/detail/signup/apply flow still works.
- Legal/privacy/data-processing pages remain reachable and readable.
- Reduced-motion users get static, accessible visuals.
- No WSL `npm install` occurred.
- No backend/admin/submission rewrite occurred.

## 10. Non-goals

- Backend/admin job listing system.
- WordPress/feed/social carousel integration.
- Full public website migration into this app.
- New package installation.
- Three.js/WebGL scene.
- Photorealistic terrain.
- Literal game mechanics.
- Rewriting legacy application submission.
- Updating `dev/DESIGN.md` before reglement decisions are approved/promoted.

## 11. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Full canvas migration becomes too large | Stage it: preserve current CSS layers temporarily, create `ValleySceneCanvas`, move one layer at a time, document transitional state |
| Background distracts from forms | Increase foreground surface opacity, lower scene contrast on application routes, reduce motion per step |
| Cosmos conflicts with brand | Keep cosmos behind mountains and only for Forge/senior contexts |
| Water drifts from brand | Use mountain reflection/mist; keep water bottom fifth and low intensity |
| p5 build/import friction | Use existing dependency only; no WSL install; fallback to native canvas only if verified blocker exists |
| Route transition complicates browser history | Prefer simple `/ -> animation -> /jobs?entered=1`; direct `/jobs` remains usable |
| Font decisions not final | Use Inter/system now; leave League Spartan behind approval flag/comment, no dependency change |

## 12. Open questions

Not blocking for first implementation, but preserve extension points:

1. The approved standalone entrance asset is `public/branding/logos/Triangle-Red.png`, extracted from the official full lockup. Do not substitute a custom approximation.
2. Should nav logo route to `/jobs` after entry rather than `/`?
   - Recommendation: pipeline nav logo -> `/jobs`; separate entrance link only if needed.
3. Is cosmos approved for Forge/senior recruitment contexts?
   - Recommendation: constrained yes, but keep mountains visible.
4. Should application progression use day-cycle or summit metaphor as primary?
   - Recommendation: summit progression primary, day-cycle lighting secondary.
5. How many default view presets should be admin-selectable later?
   - Recommendation: start with 4; design for future preset registry.

## 13. Starter prompt for implementation agent

```text
You are implementing the C3 Recruitment Theme Upgrade in C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master.

First read:
- dev/theme-upgrade-prd.md
- dev/theme-upgrade-design-reglement.md
- dev/theme-upgrade-transcript-summary.md
- dev/theme-upgrade-notes.md
- dev/context/design stack.pdf
- dev/DESIGN.md
- package.json
- src/App.js
- src/pages/recruitment/LandingPage.js
- src/components/recruitment/ValleyBackground.js
- src/components/recruitment/PoolRippleCanvas.js
- src/pages/recruitment/ListingsPage.js
- src/pages/recruitment/JobDetailPage.js
- src/data/jobs.js
- src/App.css
- src/components/recruitment/OrbitalNav.js
- src/components/FormStepper.js and related form step files

Operational boundary: this is a Windows/Git Bash Node repo under /mnt/c. Do not run npm install from WSL. No new dependencies are approved.

Report first before editing:
- exact code path for triangle-logo-first landing
- how portal click will trigger mountain aperture/role-finding
- whether you can consolidate into one visible p5/canvas scene this stroke
- how role click maps to 2D camera POV
- how form step progress will feed background progression
- verification plan

Then implement in phases:
1. Remove landing hero text; make central triangle/logo portal the first interaction with subtle nudge copy only.
2. Add logo-click mountain aperture transition into role-finding state.
3. Build/evolve single visible ValleySceneCanvas for sky, mountains, mist, reflection, and water; keep UI outside canvas.
4. Map role click to 2D camera POV: Forge/senior technical = blue/cosmos tilt-up; consulting/business = mountain climb/high-ridge; junior/starter = forest valley.
5. Feed application tab progress into background progression without rewriting legacy form submission.
6. Align tokens/copy to brand reglement.
7. Verify routes, accessibility, reduced motion, form redirect, and Windows build if possible.
```
