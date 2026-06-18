import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValleyBackground } from "../../components/recruitment/ValleyBackground";

export function LandingPage() {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(false);

  const beginJourney = (event) => {
    event.preventDefault();
    if (entering) return;
    setEntering(true);
    window.setTimeout(() => navigate("/jobs?entered=1"), 760);
  };

  return (
    <main className={`orbital-shell landing-shell ${entering ? "is-entering" : ""}`}>
      <ValleyBackground mode={entering ? "role-finding" : "landing-valley"} journeyStep={entering ? 1 : 0} portalActive={entering} />
      <section className="landing-entrance" aria-label="C3 recruitment entrance">
        <Link
          className="landing-logo-portal official-logo-portal"
          to="/jobs?entered=1"
          aria-label="Enter Convergenc3"
          onClick={beginJourney}
        >
          <span className="portal-glow" />
          <img
            className="portal-logo-image"
            src="/branding/logos/Triangle-Red.png"
            alt="Convergenc3 logo"
          />
        </Link>
        <p className="landing-nudge">Enter Convergenc3</p>
      </section>
    </main>
  );
}

export default LandingPage;
