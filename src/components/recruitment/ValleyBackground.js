import { useEffect, useMemo, useRef } from "react";
import { ValleySceneCanvas } from "./ValleySceneCanvas";

const modeClass = {
  "landing-valley": "mode-landing-valley",
  "role-finding": "mode-role-finding",
  "forest-valley": "mode-forest-valley",
  "high-ridge": "mode-high-ridge",
  "cosmos-ridge": "mode-cosmos-ridge",
};

export function ValleyBackground({
  mode = "landing-valley",
  journeyStep = 0,
  applicationProgress = 0,
  showBeacon = false,
  portalActive = false,
}) {
  const backgroundRef = useRef(null);
  const className = useMemo(
    () => `valley-background ${modeClass[mode] || modeClass["landing-valley"]}`,
    [mode]
  );

  useEffect(() => {
    const node = backgroundRef.current;
    if (!node) return undefined;

    let frame = 0;
    let lastEvent = null;

    const setGlow = (event) => {
      lastEvent = event;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (!lastEvent) return;
        node.style.setProperty("--hover-x", `${lastEvent.clientX}px`);
        node.style.setProperty("--hover-y", `${lastEvent.clientY}px`);
        node.style.setProperty("--hover-opacity", "1");
      });
    };

    const dimGlow = () => {
      node.style.setProperty("--hover-opacity", "0");
    };

    window.addEventListener("pointermove", setGlow, { passive: true });
    window.addEventListener("pointerleave", dimGlow, { passive: true });
    window.addEventListener("blur", dimGlow);

    return () => {
      window.removeEventListener("pointermove", setGlow);
      window.removeEventListener("pointerleave", dimGlow);
      window.removeEventListener("blur", dimGlow);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={backgroundRef} className={className} aria-hidden="true">
      <ValleySceneCanvas
        mode={mode}
        journeyStep={journeyStep}
        applicationProgress={applicationProgress}
        showBeacon={showBeacon}
        portalActive={portalActive}
      />
      <div className="valley-water-ripple-overlay" />
      <div className="valley-hover-glow" />
      <div className="valley-atmosphere-vignette" />
    </div>
  );
}

export default ValleyBackground;
