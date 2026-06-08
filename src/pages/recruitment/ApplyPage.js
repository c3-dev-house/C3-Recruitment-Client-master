import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import DevForm from "../DevForm";
import { AetherCanvas } from "../../components/recruitment/AetherCanvas";
import { OrbitalNav } from "../../components/recruitment/OrbitalNav";
import { departmentForStream, findJobById } from "../../data/jobs";
import { setDepartement } from "../../store/slices/recruitmentSlice";

function hasCandidateProfile() {
  return Boolean(localStorage.getItem("c3RecruitmentCandidate"));
}

export function ApplyPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const job = findJobById(jobId);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    if (!job || !job.active) return;
    const applyPath = `/apply/${job._id}`;
    if (!hasCandidateProfile()) {
      localStorage.setItem("c3RecruitmentRedirect", applyPath);
      navigate(`/signup?redirect=${encodeURIComponent(applyPath)}`, { replace: true });
      return;
    }
    dispatch(setDepartement(departmentForStream(job.stream)));
    setReady(true);
  }, [dispatch, job, navigate]);

  if (!job || !job.active) {
    return (
      <main className="orbital-shell center-shell">
        <AetherCanvas />
        <OrbitalNav compact />
        <section className="orbital-panel not-found-panel">
          <p className="eyebrow">Apply route</p>
          <h1>Role unavailable</h1>
          <p>The selected role is inactive or does not exist.</p>
          <Link className="orbital-button primary" to="/">Back to active listings</Link>
        </section>
      </main>
    );
  }

  if (!hasCandidateProfile() || !ready) {
    return (
      <main className="orbital-shell center-shell">
        <AetherCanvas />
        <OrbitalNav compact />
        <section className="orbital-panel not-found-panel">
          <p className="eyebrow">Redirecting</p>
          <h1>Signup required</h1>
          <p>Persisting your targeted apply URL before signup.</p>
        </section>
      </main>
    );
  }

  return (
    <div className="legacy-apply-shell">
      <div className="apply-context-bar">
        <Link to={`/jobs/${job._id}`}>← Back to role</Link>
        <span>Applying for {job.title}</span>
      </div>
      <DevForm selectedJob={job} />
    </div>
  );
}

export default ApplyPage;
