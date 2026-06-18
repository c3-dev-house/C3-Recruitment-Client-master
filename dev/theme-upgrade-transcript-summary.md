# C3 Recruitment Look and Feel Revamp — Transcript Digest

Source:
- Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\transcripts\C3 Recruitment Look and Feel Revamp.docx`
- WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/transcripts/C3 Recruitment Look and Feel Revamp.docx`

Meeting:
- Date: 2026-06-08
- Length: 29m 03s
- Participants: Louis de Villiers, Jason Scheepers, Caitlin van der Velden

## Executive summary

The recruitment app revamp direction is approved in principle, but it needs tighter brand discipline before the visual system is expanded. The team aligned around an iterative upgrade rather than a big-bang rebuild: keep the working recruitment flow, improve the entrance/theme layer, and define reusable brand rules so the site, portal, recruitment flow, and future public surfaces do not drift into separate identities.

The strongest design direction is a Convergenc3 mountain/night-sky world with sunset/sunrise light, triangle/polygon geometry from the logo, and a central triangle/logo portal. The current “big hero text into the recruitment pipeline” reads too loud/gaudy. The next stroke should remove the hero-text-first entrance and make the triangle logo the primary click target, with only a very subtle nudge copy below it.

## Agreed direction

1. Work incrementally.
   - Avoid waiting six months for a full redesign.
   - Fix visible pieces now, but do it according to a brand rule-set so the work is not thrown away later.

2. Establish a brand/style guide.
   - A single brand file should govern website, portal, recruitment, internal, external, and future stacks.
   - AI can move fast, but the team needs core brand rules to stop visual drift.

3. Mountains stay central.
   - Caitlin confirmed mountain imagery is the stable brand anchor.
   - Space/cosmos imagery is not generally approved as a primary brand direction; it may remain as a constrained Forge/senior-technical mode if management approves.
   - Past Convergenc3 imagery uses mountains partly cut by cloud/mist; this creates mystery and aligns with the brand.

4. Use sunset/sunrise/night-sky atmosphere.
   - Warm dawn/sunset light is preferred over raw purple/cosmic styling.
   - Night sky can be used, especially in Forge/senior contexts, but it must sit behind the mountain identity rather than replace it.

5. The triangle/logo should drive the entrance.
   - Current entrance text is too dominant.
   - Desired center: Convergenc3 triangle/logo element as the portal.
   - Small helper copy is acceptable, but not hero copy.

6. Mountain layers should behave like aperture/stage flats.
   - On entrance click, the first mountain layer should drop/slide away and reveal deeper mountains.
   - Progression through the journey should feel like advancing into a valley or toward a summit.
   - Jason suggested time-lapse/cloud-speed changes on click; Louis mapped that to the aperture mountain transition.

7. Role context should change the background state.
   - Forge/senior technical role: camera tilts upward, more sky/stars, less mountain/water, longer/cooler ripple shadows, optional constellation/project cues later.
   - Junior/consulting/mountain role: camera stays in/into the mountains, with forest/tree/valley emphasis.
   - Jason suggested future admin-selectable default views rather than bespoke per-role art.

8. Application progression should be visible in the background.
   - The current application tabs/form are still too white/flat/legacy.
   - As users progress through application tabs, the background should progress: sunrise-to-midnight, summit journey, or aperture-deeper-into-valley.
   - This should be subtle enough not to distract from forms.

## Key critiques of current app version

- The landing page exists, but the large text makes the entrance feel gaudy.
- The C3 badge/lockup should not be the central hero artifact; the central artifact should be the triangle/logo mark as portal.
- The background reads promising but is still too static/single-layer.
- Purple/cosmos tone needs brand restraint; mountain/night-sky/sunrise is safer.
- The white application flow breaks immersion and feels dated.
- Water/ripples are promising but must not pull the system away from the mountain brand.
- Visual ideas are acceptable only if they do not break a small set of core brand rules.

## Water / mist / reflection direction

The water layer is allowed as a structural footer/foreground element, not as a new brand motif.

Rules from discussion:
- Keep water low; do not make the scene mostly water.
- Prefer mountain reflection in water over generic wave/water effects.
- Add mist/cloud over mountains if feasible; this aligns with historical Convergenc3 mountain imagery.
- Motion should be soothing and premium, not splashy or gimmicky.
- Avoid over-engineering water in the first upgrade; the mountain identity comes first.

## Journey metaphors under consideration

Two compatible metaphors emerged:

1. Day-cycle progression
   - Start: dawn/sunrise.
   - Progress: sunset/twilight.
   - Completion: midnight/night sky/success state.

2. Summit progression
   - Start at the base/path.
   - Progress by collecting gear / reaching milestones / moving up the mountain.
   - Completion links to goals, aspirations, and the external brand message: Transform • Optimise • Grow.

Recommendation: use summit progression as the primary metaphor, with day-cycle lighting as the visual timing layer.

## Brand dependencies / open inputs

- Caitlin is preparing/confirming the broader brand pack and management approval.
- Font decisions are not final. Current brand font is operationally awkward because it is not readily available in Microsoft environments.
- Caitlin recommends a heading font plus body font structure; the design stack PDF mentions Inter for body and recommends League Spartan for headings going forward.
- Space imagery requires management alignment; do not overuse it before approval.
- Caitlin/Jason should share brand imagery/assets and hex values for future implementation.

## Implementation implications

- Keep the working recruitment routes/forms.
- Upgrade the visual system in layers.
- Create three to four selectable background modes now rather than unlimited bespoke art:
  - landing / mountain dawn
  - mountain / forest valley
  - high ridge / consulting summit
  - night sky / Forge or senior technical
- These modes should be metadata-controlled per role now and admin-selectable later.
- Use a single visible canvas/background renderer where possible; do not multiply render layers unless the effect demands it.
- Keep UI controls, links, cards, forms, and text outside the canvas for accessibility.
- Use mountain reflection/mist before adding more generic water effects.
