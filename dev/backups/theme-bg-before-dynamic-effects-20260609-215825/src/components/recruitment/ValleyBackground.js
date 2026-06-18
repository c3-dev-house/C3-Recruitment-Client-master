import { useMemo } from "react";
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
  const className = useMemo(
    () => `valley-background ${modeClass[mode] || modeClass["landing-valley"]}`,
    [mode]
  );

  return (
    <div className={className} aria-hidden="true">
      <ValleySceneCanvas
        mode={mode}
        journeyStep={journeyStep}
        applicationProgress={applicationProgress}
        showBeacon={showBeacon}
        portalActive={portalActive}
      />
      <div className="valley-atmosphere-vignette" />
    </div>
  );
}

export default ValleyBackground;
