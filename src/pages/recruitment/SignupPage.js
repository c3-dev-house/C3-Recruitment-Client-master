import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ValleyBackground } from "../../components/recruitment/ValleyBackground";
import { OrbitalNav } from "../../components/recruitment/OrbitalNav";

function getRedirect(search) {
  const params = new URLSearchParams(search);
  return params.get("redirect") || localStorage.getItem("c3RecruitmentRedirect") || "/jobs";
}

export function SignupPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", cell: "" });
  const redirect = getRedirect(location.search);

  useEffect(() => {
    localStorage.setItem("c3RecruitmentRedirect", redirect);
  }, [redirect]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const profile = { ...form, createdAt: new Date().toISOString() };
    localStorage.setItem("c3RecruitmentCandidate", JSON.stringify(profile));
    localStorage.removeItem("c3RecruitmentRedirect");
    navigate(redirect);
  };

  return (
    <main className="orbital-shell center-shell">
      <ValleyBackground mode="forest-valley" />
      <OrbitalNav compact />
      <section className="orbital-panel signup-panel">
        <div>
          <p className="eyebrow">Candidate profile</p>
          <h1>Sign up once. Apply with continuity.</h1>
          <p>
            This first stroke captures the basic details needed to preserve the role-specific apply flow.
            Backend auth can later bind into this same route contract.
          </p>
          <div className="redirect-chip">Redirect target: {redirect}</div>
        </div>
        <form className="orbital-form" onSubmit={submit}>
          <label>
            Full name
            <input value={form.name} onChange={update("name")} required />
          </label>
          <label>
            Email address
            <input type="email" value={form.email} onChange={update("email")} required />
          </label>
          <label>
            Cell number
            <input value={form.cell} onChange={update("cell")} required />
          </label>
          <button className="orbital-button primary wide" type="submit">Continue</button>
          <Link className="orbital-button secondary wide" to="/jobs">Back to listings</Link>
        </form>
      </section>
    </main>
  );
}

export default SignupPage;
