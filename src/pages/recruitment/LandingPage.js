import { Link } from "react-router-dom";
import { ValleyBackground } from "../../components/recruitment/ValleyBackground";

export function LandingPage() {
  return (
    <main className="orbital-shell landing-shell">
      <ValleyBackground mode="landing-valley" showBeacon />
      <section className="landing-entrance" aria-labelledby="landing-title">
        <p className="eyebrow">C3 Careers</p>
        <h1 id="landing-title">Enter the recruitment pipeline</h1>
        <p className="landing-lede">
          Choose the role path that fits your next move with Convergenc3.
        </p>
        <Link className="landing-logo-portal" to="/jobs" aria-label="Enter C3 recruitment pipeline">
          <span className="portal-glow" />
          <img src="/branding/logos/Badge-White.png" alt="" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}

export default LandingPage;
