import { Link, useLocation } from "react-router-dom";

function safeRedirect(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

function legalPath(path, redirect) {
  return `${path}?redirect=${encodeURIComponent(redirect)}`;
}

export function OrbitalNav({ compact = false }) {
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}${location.hash}`;
  const searchParams = new URLSearchParams(location.search);
  const existingRedirect = safeRedirect(searchParams.get("redirect"));
  const isLegalRoute = location.pathname === "/legal" || location.pathname === "/dataProcessing";
  const redirect = isLegalRoute ? existingRedirect : currentPath;

  return (
    <header className="orbital-nav">
      <Link className="orbital-brand" to="/" aria-label="C3 recruitment landing">
        <img
          src={compact ? "/branding/logos/Badge-White.png" : "/branding/logos/Full Lockup-White.png"}
          alt="Convergenc3"
        />
        <span>Recruitment</span>
      </Link>
      <nav className="orbital-nav-links" aria-label="Recruitment navigation">
        <Link to="/jobs">Listings</Link>
        <Link to="/signup">Sign up</Link>
        <Link to={legalPath("/legal", redirect)}>Privacy</Link>
        <Link to={legalPath("/dataProcessing", redirect)}>Data Processing</Link>
      </nav>
    </header>
  );
}
