import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AetherCanvas } from "../components/recruitment/AetherCanvas";
import { OrbitalNav } from "../components/recruitment/OrbitalNav";

function safeRedirect(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

const ProcessingAgreement = () => {
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
            <p className="eyebrow">Processing terms</p>
            <h1>Data Processing Agreement</h1>
          </div>
          <div className="legal-actions">
            <Link className="orbital-button secondary" to={redirect}>Return</Link>
            <Link className="orbital-button secondary" to={`/legal?redirect=${encodedRedirect}`}>
              POPIA Privacy Notice
            </Link>
          </div>
        </div>

        <section>
          <h2>1. Purpose of Agreement</h2>
          <p>
            This Data Processing Agreement governs the processing of applicant personal information by C3 Recruitment
            in compliance with POPIA. It defines how personal information is handled securely, transparently, and only
            for recruitment purposes.
          </p>
        </section>

        <section>
          <h2>2. Roles and Responsibilities</h2>
          <p>
            C3 Recruitment processes applicant personal information for recruitment administration, assessment,
            communication, and recordkeeping. Applicants remain the data subjects whose rights are protected under POPIA.
          </p>
        </section>

        <section>
          <h2>3. Obligations of C3 Recruitment</h2>
          <p>C3 Recruitment will:</p>
          <ul>
            <li>Process personal information only for documented recruitment purposes.</li>
            <li>Restrict access to authorized personnel and service providers.</li>
            <li>Maintain appropriate confidentiality and security controls.</li>
            <li>Notify affected applicants where a data incident materially affects their rights.</li>
            <li>Assist applicants with rights requests as required under POPIA.</li>
          </ul>
        </section>

        <section>
          <h2>4. Applicant Rights and Assistance</h2>
          <p>
            Applicants may request access, correction, deletion, or restriction of personal information, subject to
            legal and recruitment-record retention obligations. Requests may be sent to
            <a href="mailto:recruitment@convergenc3.com"> recruitment@convergenc3.com</a>.
          </p>
        </section>

        <section>
          <h2>5. Data Retention and Deletion</h2>
          <p>
            Personal information is retained only as long as necessary for recruitment, regulatory compliance, or a
            maximum of five years after deregistration or final recruitment activity. At the end of the retention period,
            data will be deleted or anonymized where legally permitted.
          </p>
        </section>

        <section>
          <h2>6. Security Measures</h2>
          <p>
            Security measures include access control, secure database management, confidentiality controls, and
            operational safeguards against unauthorized access, disclosure, alteration, or destruction.
          </p>
        </section>

        <section>
          <h2>7. Sub-Processors</h2>
          <p>
            C3 Recruitment may use third-party service providers to support recruitment processing. Providers must be
            restricted to necessary processing and required to apply appropriate data protection standards.
          </p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>This agreement is governed by the laws of South Africa, including POPIA.</p>
        </section>

        <footer className="legal-footer-nav">
          <Link className="orbital-button secondary" to={redirect}>Return to recruitment</Link>
          <Link className="orbital-button primary" to={`/legal?redirect=${encodedRedirect}`}>
            View POPIA Privacy Notice
          </Link>
        </footer>
      </article>
    </main>
  );
};

export default ProcessingAgreement;
