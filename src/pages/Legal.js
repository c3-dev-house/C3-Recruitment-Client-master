import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AetherCanvas } from "../components/recruitment/AetherCanvas";
import { OrbitalNav } from "../components/recruitment/OrbitalNav";

function safeRedirect(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

const Legal = () => {
  const [searchParams] = useSearchParams();
  const redirect = safeRedirect(searchParams.get("redirect"));
  const encodedRedirect = encodeURIComponent(redirect);

  return (
    <main className="orbital-shell legal-shell">
      <AetherCanvas />
      <OrbitalNav compact />

      <article className="orbital-panel legal-document">
        <div className="legal-document-header">
          <div>
            <p className="eyebrow">Privacy notice</p>
            <h1>POPIA Privacy Notice</h1>
          </div>
          <div className="legal-actions">
            <Link className="orbital-button secondary" to={redirect}>Return</Link>
            <Link className="orbital-button secondary" to={`/dataProcessing?redirect=${encodedRedirect}`}>
              Data Processing Agreement
            </Link>
          </div>
        </div>

        <section>
          <p>
            C3 Recruitment is committed to protecting applicant personal information in accordance with the
            Protection of Personal Information Act (POPIA) of South Africa.
          </p>
        </section>

        <section>
          <h2>1. Collection of Personal Information</h2>
          <p>
            We collect and process personal information that applicants voluntarily provide when applying for job
            opportunities. This may include name, contact details, qualifications, work history, application responses,
            and supporting documents.
          </p>
        </section>

        <section>
          <h2>2. Purpose of Collection</h2>
          <p>Personal information is used to:</p>
          <ul>
            <li>Process job applications.</li>
            <li>Communicate about applications and related opportunities.</li>
            <li>Assess qualifications, suitability, and recruitment outcomes.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Storage and Security</h2>
          <p>
            Personal information is stored securely and protected through appropriate technical and organizational
            measures against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p>
            Personal information may be retained for up to five years after deregistration or final recruitment activity,
            unless a longer retention period is required by law.
          </p>
        </section>

        <section>
          <h2>4. Sharing of Personal Information</h2>
          <p>
            We do not share applicant personal information with third parties except where necessary to provide
            recruitment services, support application processing, or comply with legal requirements.
          </p>
        </section>

        <section>
          <h2>5. Applicant Rights</h2>
          <p>In accordance with POPIA, applicants may request to:</p>
          <ul>
            <li>Access their personal information.</li>
            <li>Correct or update inaccurate personal information.</li>
            <li>Object to processing where legally permitted.</li>
            <li>Request deletion of personal information, subject to retention obligations.</li>
          </ul>
        </section>

        <section>
          <h2>6. Contact</h2>
          <p>
            Questions or requests relating to personal information may be sent to
            <a href="mailto:recruitment@convergenc3.com"> recruitment@convergenc3.com</a>.
          </p>
        </section>

        <footer className="legal-footer-nav">
          <Link className="orbital-button secondary" to={redirect}>Return to recruitment</Link>
          <Link className="orbital-button primary" to={`/dataProcessing?redirect=${encodedRedirect}`}>
            View Data Processing Agreement
          </Link>
        </footer>
      </article>
    </main>
  );
};

export default Legal;
