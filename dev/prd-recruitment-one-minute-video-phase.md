# Recruitment One-Minute Video Phase PRD

> Source-of-truth PRD for adding a browser-recorded one-minute applicant video phase to the C3 recruitment flow across the recruitment client and timesheet backend.

**Created:** 2026-06-18  
**Status:** Draft for implementation planning  
**Primary track in scope:** Consultant recruitment only  
**Source note:** `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\notes.md`

---

## 1. Executive summary

Add a new phase to the existing C3 recruitment application flow where consultant applicants record a short webcam video answering basic guided prompts such as:

- Who are you?
- Why C3?
- What makes you suited to consulting / client-facing work?

The MVP should use the browser webcam and microphone through native Web APIs, provide a lobby/test state before recording, show guiding questions beside the live/recorded video, enforce a one-minute recording limit, upload the resulting video to S3 through the existing backend, and persist video metadata/linkage on the existing `ConsultantRecruit` model. The video is optional, but the UI must position it clearly as advantageous: in high-demand periods it helps C3 review candidates faster and may count in favour of securing an interview.

The best-fit plan is not to add a third-party video service, presigned direct-to-S3 upload, or AWS-admin work for MVP. Use `navigator.mediaDevices.getUserMedia` + `MediaRecorder` in the React app, assuming Chrome/Edge first and Safari second, then upload a bounded one-minute `Blob`/`File` to a recruitment-specific backend route using `multipart/form-data`. Store the S3 object key and lightweight metadata on the consultant recruit record when the final form is submitted. Use the existing `c3-recruitment` bucket with a `video-introductions/` prefix.

---

## 2. Repositories and path map

### 2.1 Recruitment client repo

Windows:

```text
C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master
```

WSL:

```text
/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master
```

Key files read:

- `README.md` — stock Create React App README.
- `package.json` — CRA React 18 app with Redux Toolkit, MUI, Tailwind, Axios.
- `dev/notes.md` — raw feature request and backend references.
- `src/App.js` — routes: `/`, `/form`, `/submit/:id`, legal pages.
- `src/pages/HomePage.js` — only consultant track active; developer/data tracks are commented stubs.
- `src/pages/DevForm.js` — multi-step form shell and step label list.
- `src/components/FormStepper.js` — visual stepper.
- `src/components/FormUpload.js` — current final input phase, uploads PDF CV/transcript, dispatches final submit thunk.
- `src/components/FormReview.js` — success/failure state.
- `src/store/actions/recruitmentActions.js` — submit thunks and API base URL.
- `src/store/slices/recruitmentSlice.js` — form state, step navigation, submit status.

### 2.2 Backend repo

Windows:

```text
C:\Users\Louis\Documents\GitHub\timesheet-back-end
```

WSL:

```text
/mnt/c/Users/Louis/Documents/GitHub/timesheet-back-end
```

Key files read:

- `routes/index.js` — mounts `/v1/recruitment`, `/v1/upload`, `/v1/documentation`, etc.
- `routes/recruitment.js` — recruitment submit/detail/stage routes.
- `controllers/recruitment.js` — creates and reads recruit documents.
- `models/ConsultantRecruit.js` — current consultant recruit Mongoose schema; applies for this MVP.
- `routes/uploadCV.js` — current public PDF upload route at `/v1/upload`.
- `routes/documentation.js` — authenticated document upload/read stream pattern using multer memory storage and S3.
- `aws/s3.js` — current S3 helper for bucket `c3-recruitment`.
- `aws/s3Recruitment.js` — older recruitment S3 helper, not currently used by `/v1/upload`.
- `config.js` — S3 config uses `c3-recruitment` in `af-south-1` with `AWS_ACCESS_KEY` / `AWS_SECRET_KEY`.

---

## 3. Current-state observations

### 3.1 Product flow

Current active public applicant path:

1. Applicant lands on `/`.
2. Only Consultant card is active.
3. Applicant proceeds to `/form`.
4. `DevForm.js` renders step-driven application phases:
   - Personal Details
   - Position Details
   - Qualification
   - Administrative Questions
   - Background and Profile
   - Upload CV
   - Success
5. `FormUpload.js` uploads CV/transcript PDFs first, then dispatches `submitConsultantForm` with all accumulated Redux state.
6. `submitConsultantForm` posts JSON to `/v1/recruitment/submitConsultantForm`, then triggers `/v1/recruitment/sendConsultantEmail`.

### 3.2 Data model

`ConsultantRecruit` currently stores:

- applicant identity/contact fields
- recruitment answers
- CV/transcript S3 keys
- stage/outcome/newApplicant/relatedTo
- active flag
- applicationCategory default `Consultant`
- reasons/rating
- stageHistory
- criminalRecord

There is no video field yet.

### 3.3 Upload mechanics

Existing applicant file upload path:

- Frontend `FormUpload.js` posts `multipart/form-data` to `https://api.portal.c3-dev-house.com/v1/upload`.
- Backend `routes/uploadCV.js` accepts `upload.array("file")` through multer memory storage.
- File type is restricted to PDF.
- `aws/s3.js` uploads `file.buffer` into bucket `c3-recruitment` under a UUID-only key.
- Backend returns `{ status: "success", result }` where `result.key` is used by the frontend.

### 3.4 Important auth/context distinction

Applicants are not Portal users. The recruitment site is public-facing and uses a generated/stored token pattern only where existing backend routes require it. The video upload and applicant submission must not assume a logged-in Portal user identity.

---

## 4. Problem statement

Recruitment currently captures form answers and document uploads, but it does not capture how a candidate presents verbally. C3 needs a low-friction, optional one-minute video phase inside the public application flow so reviewers can assess presence, clarity, motivation, and fit before deeper screening. The candidate-facing position is: optional, but useful because it helps C3 review quicker and can count in the applicant's favour when interview capacity is tight.

This must be implemented without disrupting the existing consultant application flow, without forcing applicants into Portal login, and without inventing a new recruitment data model when `ConsultantRecruit` already owns the current consultant track.

---

## 5. Goals

### 5.1 Product goals

- Add a guided one-minute video recording phase to the consultant recruitment application.
- Let candidates test their camera/microphone before recording.
- Show prompts beside the video as talking points.
- Make recording simple: start, countdown/timer, stop, preview, re-record, accept.
- Upload the accepted video to backend-managed S3 storage.
- Link the uploaded video to the final `ConsultantRecruit` record.
- Keep the candidate experience understandable and low-friction.
- Preserve POPIA/data-processing consent surface and make video inclusion explicit.

### 5.2 Engineering goals

- Reuse existing CRA/Redux/MUI/Tailwind patterns.
- Avoid adding npm dependencies for MVP unless browser API support proves insufficient.
- Avoid running `npm install` from WSL; Louis owns install/build from Git Bash/Windows Node.
- Keep backend upload logic close to existing S3/multer patterns, but separate video validation from PDF upload validation.
- Add fields to `ConsultantRecruit` rather than creating a detached mapping layer.
- Use direct S3 object keys/metadata stored on the recruit record.

---

## 6. Non-goals

- No live streaming interview or real-time video call.
- No third-party video hosting service in MVP.
- No AI scoring, transcription, sentiment analysis, or automated rejection.
- No Portal-user login for applicants.
- No Portal frontend/recruitment dashboard implementation in this PRD; later Portal work may add a recruiter-admin video link/view once groundwork is laid.
- No immediate developer/data track implementation unless the track is re-enabled later.
- No broad redesign of the recruitment application.
- No migration from Mongo/Mongoose to another DB.
- No public unauthenticated video playback endpoint unless explicitly approved.

---

## 7. Proposed user experience

### 7.1 Placement in flow

Insert the video phase after `Background and Profile` and before `Upload CV`.

Proposed step list:

1. Personal Details
2. Position Details
3. Qualification
4. Administrative Questions
5. Background and Profile
6. One-Minute Video
7. Upload CV
8. Success

Rationale:

- By step 6, the applicant has already invested enough intent to answer properly.
- The video comes before CV upload so upload documents remain the final submission/consent gate.
- It keeps `FormUpload.js` as the final submit dispatcher but adds video metadata into the payload.

### 7.2 Screen states

The video phase should have four explicit states:

1. `permissionLobby`
   - Explain why C3 asks for a one-minute video.
   - Tell candidate they need camera/mic access.
   - Button: `Test camera and microphone`.
   - Fallback copy if browser/device unsupported.

2. `ready`
   - Show live camera preview.
   - Show mic/camera status.
   - Show guiding questions beside the preview.
   - Button: `Start 1-minute recording`.

3. `recording`
   - Show live recording view.
   - Show countdown from 60 seconds.
   - Show visible recording indicator.
   - Stop automatically at 60 seconds.
   - Button: `Stop recording`.

4. `review`
   - Show recorded video playback.
   - Show file size/duration if available.
   - Buttons: `Use this video`, `Record again`, and `Skip video`.
   - Allow next step when the candidate either successfully uploads a video or explicitly skips the optional video.

### 7.3 Guiding prompt copy

MVP prompt panel:

```text
Use the minute to cover:
1. Your name and current background.
2. Why you want to join C3.
3. A client or team situation where you communicated clearly.
4. What kind of work energises you.
5. Anything important your CV does not show.
```

Keep public copy outcome-led. Do not expose implementation language such as “MediaRecorder”, “S3”, or “Blob”.

### 7.4 Optional video decision

Resolved MVP decision: the video is optional.

Candidate-facing positioning:

```text
Optional: Add a one-minute video introduction. In high-demand periods this helps us review your application faster and may count in your favour when we decide who to invite for interviews.
```

Best-fit rule:

- Candidate may skip the video and continue the application without fallback explanation.
- Candidate may attempt recording if the browser/device supports camera and microphone capture.
- If camera/microphone access fails or MediaRecorder is unsupported, show clear browser guidance and a simple `Continue without video` path.
- Persist video state as `uploaded`, `skipped`, or `failed` so recruiters can see whether a video exists without treating absence as a hard form error.
- Do not use punitive copy. This is an advantage signal, not a gate.

---

## 8. Functional requirements

### 8.1 Frontend requirements

FR-FE-001 — Add a new video step component.

- Create `src/components/FormVideoIntroduction.js` or similar.
- It must be rendered by `src/pages/DevForm.js` before `FormUpload`.
- It must work for the active consultant track.

FR-FE-002 — Use native browser capture APIs.

- Use `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`.
- Use `MediaRecorder` to record the stream.
- Prefer MIME type negotiation:
  - Try `video/webm;codecs=vp9,opus`.
  - Then `video/webm;codecs=vp8,opus`.
  - Then `video/webm`.
  - Fall back to browser default if none supported.

FR-FE-003 — Show a setup/lobby state.

- Candidate must see camera/mic requirements before permission prompt.
- Candidate must be able to test the preview before recording.

FR-FE-004 — Show prompts beside video.

- On desktop/laptop: prompt panel and video side by side. This is the primary supported experience.
- On mobile: use browser camera capture if available, ideally front camera through `facingMode: "user"`, but do not hinge MVP success on mobile. The layout should degrade without horizontal overflow.

FR-FE-005 — Enforce one-minute maximum and predictable capture settings.

- Timer starts when recording starts.
- Recording auto-stops at 60 seconds.
- Manual stop before 60 seconds is allowed.
- Recommended capture constraint for MVP: 1280x720 HD target, 30fps target where available, browser-controlled bitrate.
- Optional optimization: if feasible without dependency churn, request lower/medium bitrate through `MediaRecorder` options such as `videoBitsPerSecond: 2_000_000` and `audioBitsPerSecond: 128_000`; if unsupported, continue with browser default.
- Warn below 20 seconds as probably too short, but do not hard-block because the video is optional.

FR-FE-006 — Provide preview/re-record.

- Candidate can watch the captured video.
- Candidate can discard and re-record before upload/final submit.
- Cleanup object URLs and media tracks to prevent browser leaks.

FR-FE-007 — Upload accepted video before final form submission.

- Convert recorded chunks into a `Blob`.
- Wrap in a `File` with generated name such as `consultant-intro-${Date.now()}.webm`.
- POST to backend video upload endpoint with `multipart/form-data`.
- Store returned key/metadata in Redux.

FR-FE-008 — Extend Redux state.

- Add `videoIntroduction` or `video` field to `initialState` in `recruitmentSlice.js`.
- Add reducer `setVideoIntroduction`.
- Expected shape:

```js
{
  status: "uploaded" | "skipped" | "failed" | "not_attempted",
  key: "s3-object-key-or-null",
  bucket: "bucket-name-or-null",
  mimeType: "video/webm",
  durationSeconds: 48,
  sizeBytes: 1234567,
  fallbackReason: null,
  recordedAt: "2026-06-18T...Z"
}
```

FR-FE-009 — Include video metadata in final submit payload.

- `submitConsultantForm` must accept and post `videoIntroduction`.
- Developer/data submit thunks may preserve the field for later, but the consultant path is the MVP requirement.

FR-FE-010 — Preserve current upload/consent behavior.

- Existing CV/transcript upload behavior must continue to work.
- POPIA/Data Processing links must stay accessible.
- Consent copy should explicitly mention video recording in a small addition.

FR-FE-011 — Error handling.

- Permission denied: explain how to enable camera/mic and offer `Continue without video`.
- No camera/mic: show `Continue without video`.
- Upload failure: allow retry and offer `Continue without video`; do not silently advance as if upload succeeded.
- Oversized video: show retake instruction with lower capture constraints if implemented, or offer `Continue without video`.

FR-FE-012 — Accessibility.

- Buttons must be keyboard reachable.
- Recording indicator must not rely only on color.
- Timer must be readable text.
- Video element needs descriptive labels/captions around it.

### 8.2 Backend requirements

FR-BE-001 — Add dedicated recruitment video upload route.

Recommended endpoint:

```text
POST /v1/recruitment/uploadVideoIntroduction
```

Alternative acceptable endpoint:

```text
POST /v1/upload/recruitment-video
```

Preferred: under `/recruitment` because it is domain-specific and should not widen the generic PDF upload route.

FR-BE-002 — Use multer memory storage for MVP.

- Follow the existing memory-storage S3 upload pattern.
- Accept one `file` field.
- Reject missing file.

FR-BE-003 — Validate video MIME/extension.

Allow for MVP:

- `video/webm`
- `video/mp4` if Safari/browser fallback produces it; Chrome/Edge WebM remains the primary target

Reject PDFs/images/executables.

FR-BE-004 — Enforce size limit.

Recommended MVP limit: 25 MB.

Rationale:

- With a fixed 60-second window, size is predictable from bitrate. At ~2 Mbps video + 128 kbps audio, a one-minute recording is roughly 16 MB before container overhead; at ~3 Mbps video + 128 kbps audio it is roughly 23.5 MB. Browser default HD WebM is commonly below 25 MB for a static talking-head recording, but this must be manually verified on Chrome.
- Keeps memory-storage risk tolerable enough for MVP.
- Avoids AWS-admin/CORS/presigned-upload work.
- The route must still hard-limit upload size because browser behavior is not contractual.

If real-world Chrome HD recordings exceed 25 MB, first lower frontend capture/recording constraints before moving to presigned direct upload. Presigned direct upload is Phase 2 only if API upload proves too heavy.

FR-BE-005 — Write to recruitment S3 namespace.

Use bucket strategy below. Key should not be UUID-only if avoidable; use namespaced keys:

```text
video-introductions/{yyyy}/{mm}/{uuid}.webm
```

Return:

```json
{
  "status": "success",
  "video": {
    "key": "video-introductions/2026/06/<uuid>.webm",
    "bucket": "c3-recruitment",
    "mimeType": "video/webm",
    "sizeBytes": 1234567,
    "originalName": "consultant-intro-...webm"
  }
}
```

FR-BE-006 — Extend `ConsultantRecruit` schema.

Add field:

```js
videoIntroduction: {
  key: { type: String, required: false },
  bucket: { type: String, required: false },
  mimeType: { type: String, required: false },
  sizeBytes: { type: Number, required: false },
  durationSeconds: { type: Number, required: false },
  recordedAt: { type: Date, required: false },
  uploadedAt: { type: Date, required: false },
  status: {
    type: String,
    enum: ["uploaded", "skipped", "failed", "not_provided"],
    default: "not_provided",
  },
  fallbackReason: { type: String, required: false },
}
```

FR-BE-007 — Persist video metadata on consultant submit.

- Destructure `videoIntroduction` in `controllers/recruitment.js::submitConsultantForm`.
- Save it into `ConsultantRecruit.create({ ... })`.
- Do not create a resolver/mapping layer.

FR-BE-008 — Protect retrieval.

MVP does not require public video streaming. For internal review, future Portal backend can expose an authenticated recruiter-only read or signed URL route.

If retrieval is added now:

```text
POST /v1/recruitment/getVideoIntroductionUrl
```

- Must require `verify`.
- Must only accept a recruit ID and return a short-lived signed URL after finding the key on the recruit record.
- Do not expose raw unauthenticated `/video/:key` for applicant videos.

FR-BE-009 — Environment/config.

Resolved MVP decision: use the existing configured recruitment S3 bucket.

Current config has:

```js
s3.bucketName = "c3-recruitment";
s3.region = "af-south-1";
```

Do not add a new bucket or AWS-admin dependency for MVP. Upload video objects into the same bucket using a dedicated prefix:

```text
video-introductions/{yyyy}/{mm}/{uuid}.webm
```

Keep helper code small and explicit. A future dedicated-bucket seam may be introduced later only if storage/access policy pressure justifies it.

### 8.3 Compliance/privacy requirements

FR-PRIV-001 — Consent copy must include video.

The final consent checkbox should make clear that the application includes submitted documents and any recorded video response.

FR-PRIV-002 — Purpose limitation.

Copy should state the video is used for recruitment screening/presentation assessment.

FR-PRIV-003 — Retention.

Resolved MVP retention requirement: keep applicant videos for at least one year. The implementation must store `recordedAt` and `uploadedAt` metadata so a later cleanup/lifecycle process can enforce policy without guessing.

FR-PRIV-004 — Internal access only.

Applicant videos are sensitive personal information. Do not make them public by direct S3 URL or unauthenticated API route.

---

## 9. Storage and upload strategy

### 9.1 Options considered

| Option                                           | Description                                                 | Pros                                                        | Cons                                                                 | Recommendation                                 |
| ------------------------------------------------ | ----------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------- |
| A. Same `c3-recruitment` bucket, namespaced keys | Store videos under `video-introductions/` in current bucket | Least backend/AWS friction; current credentials likely work; no AWS-admin dependency | Documents and videos share lifecycle/policy; bucket may grow | Chosen MVP |
| B. Dedicated S3 bucket                           | Create `c3-recruitment-video` in `af-south-1`               | Cleaner lifecycle, permissions, cost tracking, retention    | Needs bucket/IAM/env setup; more deployment config | Not now |
| C. Direct presigned browser upload               | Backend signs upload, browser uploads directly to S3        | Avoids API memory load; better for large files              | More moving parts, CORS, signed-url lifecycle, more AWS config | Phase 2 only if API upload is proven too heavy |
| D. Third-party video service                     | Use hosted candidate-video provider                         | Encoding/playback features                                  | Cost, vendor risk, privacy/compliance review | Not MVP |

### 9.2 Resolved MVP storage decision

Use the existing `c3-recruitment` bucket with a video-specific prefix:

```text
video-introductions/{yyyy}/{mm}/{uuid}.webm
```

Do not create a dedicated bucket for MVP. Do not introduce presigned direct-to-S3 upload for MVP. The one-minute recording cap plus 25 MB backend limit makes API-server upload manageable enough to validate first.

### 9.3 Retention

Resolved MVP retention decision: keep applicant videos for at least one year.

Implementation implications:

- Do not add automatic deletion before one year.
- If lifecycle rules are introduced later, they must preserve a minimum one-year retention window.
- Store `uploadedAt` and `recordedAt` metadata so future cleanup can be policy-driven.

### 9.4 Future bucket/direct-upload seam

Future hardening may add:

- Dedicated bucket for separate lifecycle/cost/access policy.
- Presigned direct browser upload if API upload proves heavy.
- Recruiter-admin signed playback link in the Portal recruitment dashboard.

These are explicitly out of current MVP scope.

---

## 10. Feasibility assessment

### 10.1 Overall feasibility

Feasible with current stack.

The recruitment client already runs React 18 in CRA, and modern browsers support `getUserMedia` and `MediaRecorder` for WebM recording. The backend already accepts multipart uploads through multer and streams buffers to S3. The current consultant model can be extended additively without a migration-heavy rewrite.

### 10.2 Main technical risks

1. Browser compatibility
   - Chrome/Edge: strong WebM support.
   - Safari/iOS: historically weaker `MediaRecorder`/WebM support; newer Safari has MediaRecorder but MIME support varies.
   - Mitigation: feature detection + fallback reason; optional later MP4/transcoding/presigned upload.

2. Upload size and backend memory
   - Current pattern uses multer memory storage, meaning the full video sits in API memory before S3 upload.
   - One-minute webcam videos are usually tolerable, but unbounded uploads are risky.
   - Mitigation: strict `limits.fileSize`, capture constraints, and 25 MB max.

3. Privacy/security
   - Video is sensitive. Public unauthenticated streaming is not acceptable.
   - Mitigation: upload endpoint may be public-ish like current applicant flow, but retrieval must be authenticated and signed.

4. Data linkage race
   - Video uploads before final submit can create orphan S3 objects if applicant abandons form.
   - Mitigation: accept orphan risk for MVP, namespace uploads, later add cleanup/lifecycle rule or two-phase pending/finalized metadata.

5. Existing architecture debt
   - API URLs are hardcoded in frontend files.
   - Public token pattern exists on homepage.
   - Applicant ID duplicate state uses module-level `applicantIds` in backend controller.
   - Mitigation: do not widen scope; implement video additively and document future cleanup separately.

### 10.3 Feasibility verdict

MVP is practical in 1-2 focused implementation passes. The least-friction route is native browser capture + backend multer/S3 upload into the existing `c3-recruitment` bucket prefix + additive schema metadata. No AWS-admin task is required for the MVP path.

---

## 11. Design tradeoffs

### 11.1 Native MediaRecorder vs third-party component

Recommendation: Native MediaRecorder.

Why:

- No new dependencies.
- Enough for one-minute MVP.
- Keeps privacy/control internal.

Tradeoff:

- Browser support and MIME differences require careful feature detection.

### 11.2 API-server upload vs presigned direct upload

Recommendation: API-server upload for MVP.

Why:

- Mirrors current CV/transcript path.
- Faster to implement.
- Avoids AWS-admin work, bucket CORS, and presigned URL lifecycle.
- The recording window is fixed at 60 seconds, making size bounded and testable.

Tradeoff:

- API memory pressure; must enforce file size.
- Less scalable than direct upload.

Best-fit mitigation:

- Use 25 MB hard limit.
- Target HD 720p at moderate bitrate where browser supports `MediaRecorder` bitrate options.
- Validate real Chrome output before rollout.

Phase 2 migration path only if needed:

- Backend creates presigned PUT URL.
- Browser uploads directly to S3.
- Backend persists metadata after successful upload.

### 11.3 Optional video vs required video

Resolved recommendation: optional but encouraged.

Why:

- Avoids blocking applicants for camera/device/browser issues.
- Keeps friction low in the public application flow.
- Still gives C3 a useful prioritisation signal: candidates who submit a video are faster to review and may stand out when interview slots are constrained.

Tradeoff:

- Recruiters must treat absence as neutral, not failure.
- UI copy must make the upside clear without making the feature feel mandatory.

### 11.4 Dedicated bucket vs shared bucket

Resolved recommendation: shared `c3-recruitment` bucket with `video-introductions/` prefix for MVP.

Why:

- Louis does not want AWS-admin work for this feature pass.
- Current backend already has working S3 credentials/config for the recruitment bucket.
- Prefix separation is enough for MVP retrieval, cleanup, and later migration.

Tradeoff:

- Bucket-level lifecycle/cost/access policy cannot distinguish videos from other recruitment files unless prefix-scoped lifecycle rules are added later.

### 11.5 Store video on `ConsultantRecruit` vs separate `RecruitmentVideo` model

Recommendation: embed metadata on `ConsultantRecruit` for MVP.

Why:

- One current consultant application has one intro video.
- Avoids mapping/indirection anti-pattern.
- Recruit detail reads get video metadata directly.

Tradeoff:

- If future requires multiple attempts, audit, review notes, or videos across tracks, a separate collection may become justified.

---

## 12. Least-friction implementation path

### Phase 0 — Resolved implementation decisions

Owner: Louis / product lead.

Resolved decisions:

1. Use existing `c3-recruitment` bucket with `video-introductions/` prefix.
2. Video is optional but encouraged; absence must not block submission.
3. Keep videos for at least one year.
4. Use native MediaRecorder, assuming Chrome/Edge laptop browser first and Safari second.
5. Portal recruitment dashboard link/playback is later work, not current MVP scope.
6. Mobile is best-effort browser behavior; do not hinge the plan on mobile support.

### Phase 1 — Backend upload and schema seam

Backend files likely touched:

- `config.js`
- `aws/s3.js` or new `aws/s3RecruitmentVideo.js`
- `routes/recruitment.js`
- `controllers/recruitment.js`
- `models/ConsultantRecruit.js`

Work:

1. Add minimal video upload helper using existing `c3-recruitment` S3 config.
2. Add route `POST /v1/recruitment/uploadVideoIntroduction`.
3. Add multer memory upload with 25 MB `fileSize` limit.
4. Validate video MIME (`video/webm` primary, `video/mp4` Safari fallback if produced).
5. Upload under `video-introductions/{yyyy}/{mm}/` namespaced key.
6. Return key/metadata.
7. Add `videoIntroduction` schema field.
8. Persist `videoIntroduction` in `submitConsultantForm`.

Pause/report gate:

- Report exact endpoint contract and example response before frontend integration.

### Phase 2 — Frontend recording component

Frontend files likely touched:

- `src/pages/DevForm.js`
- `src/components/FormVideoIntroduction.js` (new)
- `src/store/slices/recruitmentSlice.js`
- `src/store/actions/recruitmentActions.js`
- `src/components/FormUpload.js`

Work:

1. Create `FormVideoIntroduction` component with lobby/ready/recording/review states.
2. Add Redux state/reducer for uploaded/skipped/not-attempted video metadata.
3. Insert optional step into `DevForm.js`.
4. Update step numbers so `FormUpload` and `FormReview` still line up.
5. Add video metadata or skipped state to `submitConsultantForm` payload.
6. Add consent copy mention in `FormUpload.js`.

Pause/report gate:

- Manual browser proof: camera permission, 5-10 second test recording, preview, upload response, Redux state populated.

### Phase 3 — Recruiter retrieval/display planning

This is likely a second PRD or Portal-side PRD unless existing internal recruitment UI file paths are supplied.

Minimum backend preparation:

- Ensure `getConsultantDetails` returns `videoIntroduction` by default through Mongoose document serialization.

If internal Portal needs video playback now:

- Add authenticated signed URL endpoint.
- Patch Portal recruitment detail UI to show `View candidate video`.

Pause/report gate:

- Do not expose unauthenticated video playback.

### Phase 4 — Hardening

- Add upload cleanup/lifecycle plan for orphaned videos.
- Confirm POPIA retention.
- Add analytics/logging for video step failures/fallbacks.
- Consider direct presigned upload only if measured Chrome recordings or upload latency prove API upload is too heavy.
- Consider Safari/iOS behavior after field testing.

---

## 13. Acceptance criteria

### 13.1 PRD/schema readiness acceptance

- This PRD exists at:
  - Windows: `C:\Users\Louis\Documents\GitHub\C3-Recruitment-Client-master\dev\prd-recruitment-one-minute-video-phase.md`
  - WSL: `/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master/dev/prd-recruitment-one-minute-video-phase.md`
- Requirements include both frontend and backend repos.
- Required source context is listed with exact paths.
- Consultant-only MVP boundary is explicit.
- Design tradeoffs and least-friction path are documented.
- Open questions are separated from blocking requirements.

### 13.2 MVP functional acceptance

- Applicant can complete consultant application with the new video step.
- Applicant can test camera/mic before recording.
- Applicant can record up to 60 seconds.
- Recording auto-stops at 60 seconds.
- Applicant can preview and re-record.
- Accepted video uploads to backend and receives S3 key/metadata.
- Final `submitConsultantForm` stores `videoIntroduction` on the `ConsultantRecruit` document.
- Existing CV/transcript upload still works.
- Existing final email send still works.
- Legal/POPIA links remain accessible.

### 13.3 Backend acceptance

- Video upload route rejects missing files.
- Video upload route rejects non-video MIME types.
- Video upload route rejects files above configured size limit.
- S3 key uses `video-introductions/` namespace in the existing `c3-recruitment` bucket.
- `ConsultantRecruit` documents can store `videoIntroduction` metadata.
- Recruit detail endpoint returns metadata with the recruit document.
- No public unauthenticated video playback endpoint is introduced.

### 13.4 Verification commands

Do not run `npm install` from WSL in this repo. Louis runs dependency installs/builds from Git Bash/Windows Node.

Frontend Git Bash verification:

```bash
cd /c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master
npm run build
```

Backend Git Bash verification:

```bash
cd /c/Users/Louis/Documents/GitHub/timesheet-back-end
npm test -- --runInBand
```

If backend has no reliable full test suite, use focused manual/API verification against local server:

```bash
curl -X POST http://localhost:3001/v1/recruitment/uploadVideoIntroduction \
  -F "file=@/c/path/to/sample.webm"
```

Expected response shape:

```json
{
  "status": "success",
  "video": {
    "key": "video-introductions/...webm",
    "bucket": "...",
    "mimeType": "video/webm",
    "sizeBytes": 123456
  }
}
```

Manual browser verification:

1. Open recruitment app in Chrome or Edge.
2. Select Consultant.
3. Complete required fields until video step.
4. Grant camera/mic permission.
5. Record 5-10 seconds.
6. Preview video.
7. Re-record once.
8. Accept/upload video.
9. Upload CV and submit application.
10. Confirm backend `ConsultantRecruit` document has `videoIntroduction.key` and `status: uploaded`.

---

## 14. Implementation notes and file-level guidance

### 14.1 `src/pages/DevForm.js`

Current `steps` array has 7 labels. Add `One-Minute Video` before `Upload CV`. Update `displayStep` switch accordingly:

- Existing step 6 `FormUpload` becomes step 7.
- Existing step 7 `FormReview` becomes step 8.
- Be careful: current code hides `FormStepper` when `step !== 6`; this looks suspicious because step 6 is currently Upload CV. After inserting the video step, revisit this condition. Likely desired behavior is to hide stepper only on final success, or keep it visible consistently.

### 14.2 `src/components/FormUpload.js`

Current `handleNext` dispatches final submit. Add selected video metadata from Redux:

```js
const videoIntroduction = useSelector(
  (state) => state.formDetails.videoIntroduction,
);
```

Include it in `submitConsultantForm({ ... })`.

Also add copy to checkbox label:

```text
I consent to C3 processing my application information, uploaded documents, and recorded video response for recruitment screening according to the POPIA Policy and Data Processing Agreement.
```

### 14.3 `src/store/slices/recruitmentSlice.js`

Add to `initialState`:

```js
videoIntroduction: null,
```

Add reducer:

```js
setVideoIntroduction: (state, action) => {
  state.videoIntroduction = action.payload;
},
```

Export it.

### 14.4 `src/store/actions/recruitmentActions.js`

Add upload thunk or helper:

```js
export const uploadVideoIntroduction = createAsyncThunk(
  "recruitment/uploadVideoIntroduction",
  async ({ file, durationSeconds }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("durationSeconds", String(durationSeconds || ""));
      const res = await axios.post(
        `${url}/recruitment/uploadVideoIntroduction`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return res.data.video;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(
        error.response.data.message || error.response.data.error,
      );
    }
  },
);
```

Alternatively keep upload local to the component for MVP, mirroring `FormUpload.js`, but a thunk is cleaner for loading/error state.

### 14.5 `models/ConsultantRecruit.js`

Add the `videoIntroduction` embedded object near `transcript` or near application metadata.

### 14.6 `controllers/recruitment.js`

In `submitConsultantForm`:

- Destructure `videoIntroduction` from `req.body`.
- Include `videoIntroduction` in `ConsultantRecruit.create`.

Add `uploadVideoIntroduction` controller function or route-local async handler. Prefer controller for maintainability.

### 14.7 `routes/recruitment.js`

Add:

```js
router.post("/uploadVideoIntroduction", recruits.uploadVideoIntroduction);
```

Do not require Portal `verify` for applicant upload unless the existing public token pattern is explicitly formalized for this route. If unauthenticated upload remains uncomfortable, require the same public token that homepage currently obtains, but ensure this does not force applicant Portal login.

---

## 15. Operational boundaries

- Do not run `npm install` from WSL inside `C3-Recruitment-Client-master` or `timesheet-back-end` if Louis runs these repos from Git Bash/Windows Node.
- If dependencies are needed, edit `package.json` only and tell Louis the exact Git Bash command. MVP should not need frontend dependencies.
- Prefer Windows/Git Bash verification for CRA build:

```bash
cd /c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master && npm run build
```

- Backend changes affect live recruitment data paths; use local/uat first.
- Do not expose applicant videos through public S3 URLs or open GET routes.
- Do not add model indirection if `ConsultantRecruit` can directly store the metadata.

---

## 16. Open questions

Blocking before production rollout:

1. Confirm the candidate-facing optional-video copy with C3 stakeholders.
2. Confirm exact Portal/recruiter-admin access policy before adding video links later.
3. Confirm whether one-year retention means “minimum one year then manual review” or “delete after X months”; MVP only guarantees at least one year.
4. Validate actual Chrome HD one-minute file sizes against the 25 MB API limit.
5. Confirm whether Safari fallback must be tested before production launch or can remain best-effort second-browser support.

Resolved by Louis in this pass:

1. Use existing `c3-recruitment` bucket with `video-introductions/` prefix.
2. Video is optional but counts in favour of interview selection during high-demand periods because it speeds review.
3. Native MediaRecorder approach is preferred.
4. Chrome/browser-laptop path is first priority; Safari is second option; mobile is best-effort only.
5. Portal frontend/recruitment dashboard video link is later work, not current PRD scope.
6. Videos should be kept for at least one year.

Non-blocking / can preserve unknowns:

1. Future developer/data track reuse.
2. Video transcription or scoring.
3. Direct-to-S3 presigned upload.
4. Orphan upload cleanup automation.
5. Recruiter audit trail for video views.
6. Later Portal recruitment dashboard signed playback link.

---

## 17. Recommended next PRDs split from this source

This source PRD can be split into:

1. Backend PRD: recruitment video upload + schema metadata.
2. Frontend PRD: video capture UX + Redux + submit integration.
3. Portal/internal review PRD: authenticated video retrieval/playback in recruiter UI.
4. Compliance/storage PRD: retention, lifecycle, access audit, deletion tooling.

Do not split until the bucket/fallback decisions are resolved or explicitly defaulted.

---

## 18. Best-fit plan to date

If executing now with least friction:

1. Use existing `c3-recruitment` bucket with `video-introductions/` prefix.
2. Add backend route `/v1/recruitment/uploadVideoIntroduction` with multer memory storage, 25 MB limit, and `video/webm` primary validation plus Safari-compatible `video/mp4` allowance if produced by browser.
3. Add `videoIntroduction` embedded metadata to `ConsultantRecruit`.
4. Add `FormVideoIntroduction` before upload step using native browser APIs.
5. Store uploaded video metadata or skipped/not-attempted state in Redux.
6. Include metadata in `submitConsultantForm`.
7. Do not implement public playback or Portal frontend video links in MVP.
8. Confirm via one Chrome browser-recorded sample, one skipped-video submission, and one resulting Mongo document.

This path avoids dependency churn, avoids new infrastructure as a blocker, preserves existing flow, and creates a clean seam for dedicated bucket/presigned upload later.
