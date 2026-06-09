import { useEffect, useMemo, useRef, useState } from "react";
import { PoolRippleCanvas } from "./PoolRippleCanvas";

const modeClass = {
  "landing-valley": "mode-landing-valley",
  "forest-valley": "mode-forest-valley",
  "high-ridge": "mode-high-ridge",
  "cosmos-ridge": "mode-cosmos-ridge",
};

function getReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pointerFromEvent(event, rect) {
  return {
    x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
    y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
  };
}

export function ValleyBackground({ mode = "landing-valley", showBeacon = false }) {
  const backgroundRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.42 });
  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const onWindowPointerMove = (event) => {
      const node = backgroundRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      setPointer(pointerFromEvent(event, rect));
    };
    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onWindowPointerMove);
  }, []);

  const className = useMemo(
    () => `valley-background ${modeClass[mode] || modeClass["landing-valley"]}`,
    [mode]
  );

  return (
    <div ref={backgroundRef} className={className} aria-hidden="true">
      <div
        className="valley-pointer-glow"
        style={{ "--pointer-x": `${pointer.x * 100}%`, "--pointer-y": `${pointer.y * 100}%` }}
      />
      <div className="valley-sky" />
      <div className="valley-stars" />
      <div className="mountain-layer mountain-far" />
      <div className="mountain-layer mountain-mid" />
      <div className="mountain-layer mountain-near" />
      <div className="valley-forest-edge" />
      <div className="valley-beacon-glow" />
      {showBeacon && <div className="valley-beacon-ring" />}
      <div className="valley-pool">
        <div className="pool-reflection" />
        <PoolRippleCanvas pointer={pointer} mode={mode} reducedMotion={reducedMotion} />
      </div>
    </div>
  );
}

export default ValleyBackground;
