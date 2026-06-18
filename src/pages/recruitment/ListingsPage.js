import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { activeJobs, backgroundModeForStream } from "../../data/jobs";
import { ValleyBackground } from "../../components/recruitment/ValleyBackground";
import { JobCard } from "../../components/recruitment/JobCard";
import { OrbitalNav } from "../../components/recruitment/OrbitalNav";

const filters = ["All", "Developer", "Data", "Business"];

function getAppliedJobIds() {
  try {
    return JSON.parse(localStorage.getItem("c3RecruitmentAppliedJobs") || "[]");
  } catch (_error) {
    return [];
  }
}

export function ListingsPage() {
  const [filter, setFilter] = useState("All");
  const location = useLocation();
  const enteredFromPortal = new URLSearchParams(location.search).get("entered") === "1";
  const appliedJobIds = getAppliedJobIds();
  const backgroundMode = filter === "All" ? "role-finding" : backgroundModeForStream(filter);
  const journeyStep = enteredFromPortal || filter === "All" ? 1 : 2;

  const visibleJobs = useMemo(() => {
    if (filter === "All") return activeJobs;
    return activeJobs.filter((job) => job.stream === filter);
  }, [filter]);

  const counts = useMemo(() => ({
    All: activeJobs.length,
    Developer: activeJobs.filter((job) => job.stream === "Developer").length,
    Data: activeJobs.filter((job) => job.stream === "Data").length,
    Business: activeJobs.filter((job) => job.stream === "Business").length,
  }), []);

  return (
    <main className="orbital-shell">
      <ValleyBackground mode={backgroundMode} journeyStep={journeyStep} />
      <OrbitalNav />

      <section className="orbital-hero">
        <div className="hero-copy">
          <p className="eyebrow">C3 Careers / Active Opportunities</p>
          <h1>Open Positions</h1>
          <p className="hero-lede">
            Find the role that fits your next move at Convergenc3. Review the requirements, create your profile,
            and submit one focused application for the position you choose.
          </p>
          <div className="hero-actions">
            <Link className="orbital-button primary" to="/signup">Create candidate profile</Link>
            <a className="orbital-button secondary" href="#roles">Browse active roles</a>
          </div>
        </div>
        <aside className="orbital-panel hero-panel" aria-label="Recruitment summary">
          <span className="panel-index">Recruitment</span>
          <h2>Choose a role. Complete your profile. Apply.</h2>
          <p>
            Your profile keeps the application attached to the position you selected.
          </p>
          <div className="telemetry-grid">
            <span>{activeJobs.length} active</span>
            <span>{counts.Developer} dev</span>
            <span>{counts.Data} data</span>
            <span>{counts.Business} business</span>
          </div>
        </aside>
      </section>

      <section id="roles" className="orbital-panel listings-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Opportunities</p>
            <h2>Active listings</h2>
          </div>
          <p>Only open roles are listed.</p>
        </div>

        <div className="filter-row" role="tablist" aria-label="Filter jobs by stream">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip ${filter === item ? "active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item} <span>{counts[item]}</span>
            </button>
          ))}
        </div>

        <div className="jobs-grid">
          {visibleJobs.map((job) => (
            <JobCard key={job._id} job={job} applied={appliedJobIds.includes(job._id)} />
          ))}
        </div>

        {visibleJobs.length === 0 && (
          <div className="empty-state">No active opportunities in this stream yet.</div>
        )}
      </section>
    </main>
  );
}

export default ListingsPage;
