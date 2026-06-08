# PRD: C3 Recruitment Client Overhaul

Design reference: `dev/DESIGN.md`.
Context sources:
- `C:\Users\Louis\Desktop\Convergenc3\2026\Recruitment redesign\Context\notes.md`
- `Context/recruitment-flow-design` v0 export for role/application schema baseline
- `Context/stitch_ouros_cosmic_presentation_deck/orbital/DESIGN.md` for orbital visual baseline
- `Context/Branding/Logos` for logo assets

## 1. Product thesis

Move the app from a track-first recruitment form into a role-first opportunity marketplace.

Candidates should be able to:
1. See active role listings.
2. Inspect a role like a LinkedIn job post.
3. Sign up separately from the listings page.
4. Click Apply on a role and, if not signed up, enter signup first.
5. Return automatically to the intended apply flow after signup.
6. Complete the existing stable application form machinery with minimal backend disruption.

## 2. Least-resistant strategy

Do not rewrite the whole submission pipeline in stroke one. Keep the legacy multi-step form and Redux submit thunks intact. Replace the entry experience and route topology around it:

- `/` becomes active role listings.
- `/jobs/:jobId` becomes role detail.
- `/signup` becomes separate signup/profile capture.
- `/apply/:jobId` checks signup continuity, maps job stream to legacy `department`, then renders `DevForm`.
- `/form` remains available as legacy fallback.

This gives the full flow shape immediately while limiting backend risk.

## 3. Data model baseline

From v0 export:

```ts
Job {
  _id: string;
  title: string;
  stream: "Developer" | "Data" | "Business";
  experience: string;
  duration: string;
  capacity: number;
  active: boolean;
  description: string;
  skills: string[];
}
```

Application and applicant schemas remain compatible with existing form fields. First stroke uses static `src/data/jobs.js` as an adapter until an API endpoint is agreed.

## 4. Active/inactive behavior

- `active: true`: show in listings and allow detail/apply.
- `active: false`: do not show in listings.
- Direct route to inactive/missing job should show not found or unavailable, not a disabled listing card.

## 5. Signup and redirect persistence

Required behavior:

- Listings page exposes Sign up CTA.
- Job detail Apply CTA computes `/apply/:jobId`.
- If candidate profile is missing, Apply redirects to `/signup?redirect=/apply/:jobId`.
- Signup page writes redirect to `localStorage.c3RecruitmentRedirect`.
- On submit, page stores `localStorage.c3RecruitmentCandidate` and navigates to redirect.
- Redirect is cleared after use.

Future backend auth can replace localStorage without changing route semantics.

## 6. Visual requirements

Use `dev/DESIGN.md` tokens:

- Dark orbital shell.
- C3 red primary CTAs.
- Glass cards.
- Telemetry labels and route/status metadata.
- Aether/cosmic background motion.
- Hover glows on cards and buttons.
- Logo assets copied into `/public/branding/logos`.

## 7. First corrective stroke acceptance criteria

- `dev/DESIGN.md` exists and is stack-aware.
- `dev/PRD.md` exists and points to design/source context.
- Brand logos copied to app public assets.
- Home page shows active open positions rather than track cards.
- Inactive jobs are omitted.
- Job detail route works.
- Signup route works independently.
- Apply route forces signup first if profile is missing.
- Signup preserves redirect to targeted apply route.
- Existing `DevForm` can still be reached and is reused after apply-route department mapping.
- Build and focused test run complete without installing packages from WSL.

## 8. Deferred strokes

1. API integration for real jobs/applications.
2. Backend signup/auth persistence.
3. Candidate dashboard showing active applications/stages.
4. True p5 dependency if approved and installed from the correct Windows/Git Bash environment.
5. Full visual screenshot QA pass across desktop/mobile.
