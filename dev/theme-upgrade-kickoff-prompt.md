# C3 Recruitment Theme Upgrade — Kickoff Prompt

Use this prompt to start the implementation session for the recruitment theme upgrade.

```text
You are implementing the C3 Recruitment Theme Upgrade in C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master.

Identity/working boundary:
- This repo is Windows/Git Bash Node-owned under /mnt/c.
- Do not run npm install from WSL.
- Do not add dependencies unless Louis explicitly approves and runs install from Git Bash.
- Use existing React/CRA/p5 stack only.
- Preserve existing recruitment flow and legacy form submission. No backend rewrite.

First read, in order:
1. dev/theme-upgrade-prd.md
2. dev/theme-upgrade-design-reglement.md
3. dev/theme-upgrade-transcript-summary.md
4. dev/theme-upgrade-notes.md
5. dev/context/design stack.pdf
6. dev/DESIGN.md
7. package.json and package-lock.json
8. src/App.js
9. src/pages/recruitment/LandingPage.js
10. src/components/recruitment/ValleyBackground.js
11. src/components/recruitment/PoolRippleCanvas.js
12. src/pages/recruitment/ListingsPage.js
13. src/pages/recruitment/JobDetailPage.js
14. src/data/jobs.js
15. src/App.css
16. src/components/recruitment/OrbitalNav.js
17. src/components/FormStepper.js, src/components/FormStepperControl.js, src/pages/DevForm.js, and relevant Form* components

Report first before editing:
- Confirm current app state and exact files you will touch.
- Confirm whether p5 is already available from package/lock/source imports.
- Confirm how you will replace the landing hero with a red triangle/logo portal.
- Use `public/branding/logos/Triangle-Red.png`, extracted from the official full lockup, for the central logo. Do not use a CSS/SVG approximation.
- Confirm how the logo click will trigger the mountain aperture transition into role-finding.
- Confirm how you will implement triangle-tessellated mountains using brand colours: Overlay Blue #07192F, Midnight Black #1F2024, Convergenc3 Blue Dark #064199, and low-opacity Convergenc3 Red Dark #D80C0D accents.
- Confirm whether you can consolidate the background into one visible p5/canvas scene this stroke; if not, state the staged fallback and what remains transitional.
- Confirm how role click maps to 2D camera POV.
- Confirm how application form tab/step progress will feed background progression without rewriting form submission.
- Confirm verification plan.

Implementation priorities:
1. Landing correction
   - Remove the large hero headline/lede dominance.
   - Make the first visual/interactive element a central red triangle/logo portal.
   - Use only subtle nudge copy: “Enter Convergenc3”.
   - Portal must be a real Link/button with accessible label and visible focus state.
   - Official logo pulses with restrained red glow by default; hover/focus increases C3 red glow and turns `Enter Convergenc3` text red.
   - Pointer hover over the background creates local sunrise/sunset glow.

2. Mountain aperture entrance
   - On portal click, trigger a short aperture/layer transition before or during navigation to /jobs, but do not resize/zoom the whole background plate; preserve the same 16:9 landscape composition and change only scene details/layers.
   - Near mountains drop/slide/open away.
   - Deeper mountains layer in.
   - Role-finding state appears.
   - Direct /jobs load remains usable.

3. Tessellated mountain scene
   - Use C3-inspired triangle tessellation/facets to compose the mountains.
   - Keep the look mature: red/black/dark-blue brand hues, not bright low-poly wallpaper.
   - Red is accent/glow/facet signal only, not full mountain fill.
   - Add mist/cloud cuts if cheap.
   - Add mountain reflection into the bottom-fifth water layer.

4. Single visible canvas / low overhead
   - Prefer one visible p5/canvas renderer for sky, stars, mountains, mist, pool, reflection, and water bands.
   - Internal buffers are allowed for reflection.
   - Keep UI/cards/forms/nav outside canvas.
   - Do not update React state every animation frame.
   - Use pixelDensity(1), cap near 30fps, reduce/pause when hidden, respect prefers-reduced-motion.

5. Role-driven 2D camera
   - Forge/senior technical/data roles: blue/cosmos tilt-up, more sky/stars, mountains lower, less water.
   - Consulting/business/advisory roles: high-ridge/summit climb, red/sunrise emphasis, valley depth increases.
   - Junior/starter/academy roles: forest/base valley, gentler onboarding, closer slopes.

6. Application progression
   - Each form step/tab subtly advances the background journey.
   - Consulting roles climb/deepen through mountain valley.
   - Forge roles zoom upward/deeper into blue/cosmos.
   - Do not compromise form readability or legacy submission.

7. Brand/token cleanup
   - Align with dev/theme-upgrade-design-reglement.md.
   - Use C3 palette discipline from design stack PDF.
   - Avoid public copy that mentions canvas/theme/p5/aperture mechanics.
   - Keep legal/data-processing routes readable.

Verification requirements:
- / shows no large hero text.
- / central portal is visibly red triangle/logo, not current badge hero.
- Keyboard focus reaches portal and activation works.
- Portal click triggers mountain aperture/layer transition.
- /jobs direct load works.
- Role click/detail route sets the correct background camera POV.
- Apply/signup redirect behavior still works.
- Application form step progression changes background subtly.
- Reduced-motion produces stable static visuals.
- Legal and data processing pages remain readable.
- Preferred build command, if dependencies are healthy:
  cmd.exe /C "cd /D C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master && npm run build"

Final report must include:
- Files changed.
- What was implemented vs left transitional.
- Verification output or exact blocker.
- Any follow-up design questions for dev/theme-upgrade-design-reglement.md.
```
