import { Link } from "react-router-dom";

const streamClass = {
  Developer: "stream-dev",
  Data: "stream-data",
  Business: "stream-business",
};

export function JobCard({ job, applied }) {
  return (
    <article className={`orbital-card ${streamClass[job.stream] || ""}`}>
      <div className="card-telemetry">
        <span>{job.stream}</span>
        <span>{applied ? "APPLIED" : "ACTIVE"}</span>
      </div>
      <h3>{job.title}</h3>
      <p className="job-summary">{job.description.split("\n")[0]}</p>
      <dl className="job-metadata">
        <div>
          <dt>Experience</dt>
          <dd>{job.experience}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{job.duration}</dd>
        </div>
        <div>
          <dt>Capacity</dt>
          <dd>{job.capacity}</dd>
        </div>
      </dl>
      <div className="skill-row">
        {job.skills.slice(0, 4).map((skill) => (
          <span className="skill-chip" key={skill}>{skill}</span>
        ))}
      </div>
      <div className="card-actions">
        <Link className="orbital-button secondary" to={`/jobs/${job._id}`}>View details</Link>
        <Link className="orbital-button primary" to={`/apply/${job._id}`}>Apply</Link>
      </div>
    </article>
  );
}
