# C3 Recruitment Orbital Design System

Source baseline: `Context/stitch_ouros_cosmic_presentation_deck/orbital/DESIGN.md`.
Target stack: Create React App, React Router v6, Redux Toolkit, MUI v5, Tailwind directives already present, plain CSS modules/global CSS. No new runtime dependency required for the first corrective stroke.

## Intent

The recruitment app must stop feeling like a track picker and start feeling like a role marketplace: scan open positions, inspect one role, sign up or authenticate, then apply to the selected role with redirect continuity preserved.

Design mood: digital-space / aether / orbital command interface. Premium, dark, precise, high-signal. C3 red is the conversion color, not decoration.

## Tokens

```css
--c3-bg: #080a10;
--c3-bg-2: #101319;
--c3-surface: rgba(16, 19, 25, 0.74);
--c3-surface-strong: rgba(29, 32, 38, 0.9);
--c3-line: rgba(255, 180, 168, 0.22);
--c3-line-strong: rgba(255, 85, 64, 0.55);
--c3-red: #d80c0d;
--c3-red-hot: #ff5540;
--c3-text: #f4f4f7;
--c3-muted: #bbc7dd;
--c3-violet: #8083ff;
--c3-cyan: #79d9ff;
--c3-radius: 14px;
--c3-radius-sm: 8px;
--c3-shadow-red: 0 0 36px rgba(216, 12, 13, 0.32);
```

## Typography

- Display / headings: Montserrat fallback stack, uppercase only for telemetry labels.
- Body: Inter fallback stack.
- Telemetry: JetBrains Mono fallback stack for labels, counts, route IDs, status.

No font package is introduced. Use CSS font-family stacks and browser fallbacks until brand font loading is formalized.

## Layout

- Desktop shell: 12-column feel through CSS grid, max-width 1180px, cockpit margin.
- Mobile: single-column stacked cards, fixed header becomes normal flow.
- Each major page uses the same `.orbital-shell`, `.orbital-nav`, `.orbital-panel`, `.orbital-card` primitives.

## Motion and glow

First corrective stroke uses a native canvas `AetherCanvas` instead of adding p5 as a dependency. It follows p5-style behavior: particle field, pointer attraction, red/violet/cyan glows, requestAnimationFrame loop, reduced-motion fallback. This preserves build stability in the existing CRA setup. A later stroke may promote to installed `p5` if approved and installed from Louis's Git Bash environment.

Hover rules:
- Job cards bloom red on primary hover.
- Filter chips glow by stream color.
- Background particles react to pointer coordinates.
- Buttons use red bloom only for action intent.

## Assets

Copied from context branding into app public assets:

- `/branding/logos/Full Lockup-White.png`
- `/branding/logos/Full Lockup-Black.png`
- `/branding/logos/Badge-White.png`
- `/branding/logos/Badge-Black.png`

Dark pages default to `Full Lockup-White.png`; compact marks use `Badge-White.png`.

## Components

### Orbital navigation

- Left: logo, app title.
- Right: Listings, Sign up, legal links as needed.
- Sticky within page top, glass surface.

### Listings page

- Hero explains recruitment as role marketplace.
- Filter tabs: All, Developer, Data, Business.
- Only `active: true` jobs render.
- Inactive jobs are omitted entirely, not disabled.
- Cards include title, stream, capacity, duration, experience, skill chips, status/applied telemetry.

### Job detail

- Back to listings.
- Role metadata rail.
- Job description section.
- Skills section.
- CTA persists redirect to selected role apply path.

### Signup

- Separate route reachable from listings.
- Query param `redirect` is persisted to `localStorage.c3RecruitmentRedirect`.
- Successful local sign-up stores lightweight candidate profile in `localStorage.c3RecruitmentCandidate`, then redirects to persisted target.
- This is frontend continuity scaffolding; API/auth binding remains future backend work.

### Apply

- If no signup profile exists, redirect to `/signup?redirect=/apply/:jobId`.
- If signup profile exists, set existing Redux `department` based on job stream and reuse the legacy multi-step form.
- This is the least-resistant bridge: new discovery UX, existing submission machinery.

## Accessibility

- Use semantic headings and buttons.
- Canvas is `aria-hidden`.
- All CTAs use real links/buttons.
- Reduced-motion users get static gradients.

## Non-goals in first corrective stroke

- No backend schema changes.
- No p5 package installation from WSL.
- No replacement of legacy submit thunks.
- No admin portal work.
