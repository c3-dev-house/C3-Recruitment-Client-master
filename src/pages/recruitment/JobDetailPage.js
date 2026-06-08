import { Link, useNavigate, useParams } from "react-router-dom";
import { AetherCanvas } from "../../components/recruitment/AetherCanvas";
import { OrbitalNav } from "../../components/recruitment/OrbitalNav";
import { findJobById } from "../../data/jobs";

export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = findJobById(jobId);

  if (!job || !job.active) {
    return (
      <main className="orbital-shell center-shell">
        <AetherCanvas />
        <OrbitalNav compact />
        <section className="orbital-panel not-found-panel">
          <p className="eyebrow">Role unavailable</p>
          <h1>Job not found</h1>
          <p>This listing is either inactive or no longer exists.</p>
          <Link className="orbital-button primary" to="/">Back to active listings</Link>
        </section>
      </main>
    );
  }

  const applyPath = `/apply/${job._id}`;
  const beginApply = () => {
    localStorage.setItem("c3RecruitmentRedirect", applyPath);
    navigate(applyPath);
  };

  return (
    <main className="orbital-shell">
      <AetherCanvas />
      <OrbitalNav />
      <section className="orbital-panel detail-panel">
        <Link className="back-link" to="/">← Back to listings</Link>
        <div className="detail-layout">
          <article className="detail-main">
            <p className="eyebrow">{job.stream} / {job.location}</p>
            <h1>{job.title}</h1>
            <div className="detail-actions mobile-actions">
              <button className="orbital-button primary" type="button" onClick={beginApply}>Apply now</button>
              <Link className="orbital-button secondary" to="/signup">Sign up first</Link>
            </div>
            <section>
              <h2>Mission brief</h2>
              {job.description.split("\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            <section>
              <h2>Skills signal</h2>
              <div className="skill-row large">
                {job.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
              </div>
            </section>
          </article>
          <aside className="detail-rail">
            <span className="panel-index">ROLE {job._id}</span>
            <dl className="rail-list">
              <div><dt>Stream</dt><dd>{job.stream}</dd></div>
              <div><dt>Experience</dt><dd>{job.experience}</dd></div>
              <div><dt>Duration</dt><dd>{job.duration}</dd></div>
              <div><dt>Capacity</dt><dd>{job.capacity} available</dd></div>
              <div><dt>Status</dt><dd>Active</dd></div>
            </dl>
            <button className="orbital-button primary wide" type="button" onClick={beginApply}>Apply for this role</button>
            <Link className="orbital-button secondary wide" to="/signup">Create profile</Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default JobDetailPage;
