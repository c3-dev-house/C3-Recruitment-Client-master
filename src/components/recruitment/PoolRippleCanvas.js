import { useEffect, useRef } from "react";
import p5 from "p5";

if (typeof p5 !== "undefined") {
  p5.disableFriendlyErrors = true;
}

const paletteByMode = {
  "landing-valley": {
    base: [23, 43, 77],
    line: [122, 216, 255],
    warm: [255, 179, 107],
  },
  "forest-valley": {
    base: [20, 51, 39],
    line: [122, 216, 255],
    warm: [255, 179, 107],
  },
  "high-ridge": {
    base: [43, 33, 75],
    line: [255, 194, 151],
    warm: [255, 122, 61],
  },
  "cosmos-ridge": {
    base: [18, 27, 61],
    line: [121, 217, 255],
    warm: [139, 124, 255],
  },
};

function safePointer(pointer) {
  if (!pointer) return { x: 0.5, y: 0.55 };
  return {
    x: Number.isFinite(pointer.x) ? pointer.x : 0.5,
    y: Number.isFinite(pointer.y) ? pointer.y : 0.55,
  };
}

export function PoolRippleCanvas({ pointer, mode = "landing-valley", reducedMotion = false }) {
  const hostRef = useRef(null);
  const pointerRef = useRef(safePointer(pointer));
  const modeRef = useRef(mode);
  const reducedMotionRef = useRef(reducedMotion);

  useEffect(() => {
    pointerRef.current = safePointer(pointer);
  }, [pointer]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let sketch;

    const instance = (p) => {
      let width = 1;
      let height = 1;
      const smoothed = { x: 0.5, y: 0.55 };

      const resize = () => {
        width = Math.max(1, host.clientWidth || 1);
        height = Math.max(1, host.clientHeight || 1);
        p.resizeCanvas(width, height);
      };

      const rgba = (rgb, alpha) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;

      p.setup = () => {
        width = Math.max(1, host.clientWidth || 1);
        height = Math.max(1, host.clientHeight || 1);
        const canvas = p.createCanvas(width, height);
        canvas.elt.setAttribute("aria-hidden", "true");
        canvas.elt.style.display = "block";
        canvas.elt.style.width = "100%";
        canvas.elt.style.height = "100%";
        canvas.elt.style.pointerEvents = "none";
        p.pixelDensity(1);
        p.frameRate(30);
        p.noFill();
        if (reducedMotionRef.current) p.noLoop();
      };

      p.windowResized = resize;

      p.draw = () => {
        const palette = paletteByMode[modeRef.current] || paletteByMode["landing-valley"];
        p.clear();

        const target = safePointer(pointerRef.current);
        smoothed.x += (target.x - smoothed.x) * 0.045;
        smoothed.y += (target.y - smoothed.y) * 0.045;

        const poolCenterX = width * 0.5;
        const poolCenterY = height * 0.38;
        const pointerX = smoothed.x * width;
        const pointerY = Math.max(0, (smoothed.y - 0.8) / 0.2) * height;
        const dx = pointerX - poolCenterX;
        const dy = pointerY - poolCenterY;
        const mag = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        const nx = -dy / mag;
        const ny = dx / mag;
        const drift = p.millis() * 0.00008;
        const pointerBias = (smoothed.x - 0.5) * 32;
        const bandCount = width < 680 ? 14 : 20;
        const diagonalSpan = Math.sqrt(width * width + height * height) * 0.72;

        const baseGradientBands = 10;
        for (let i = 0; i < baseGradientBands; i += 1) {
          const y = (i / baseGradientBands) * height;
          p.stroke(rgba(palette.base, 0.05 - i * 0.002));
          p.strokeWeight(1.2);
          p.line(0, y, width, y + Math.sin(i + drift) * 4);
        }

        if (reducedMotionRef.current) {
          p.stroke(rgba(palette.line, 0.18));
          p.strokeWeight(1);
          for (let i = 0; i < 8; i += 1) {
            const y = height * (0.2 + i * 0.085);
            p.line(width * 0.12, y, width * 0.88, y);
          }
          return;
        }

        for (let i = 0; i < bandCount; i += 1) {
          const bandPhase = i / Math.max(1, bandCount - 1);
          const centerY = height * (0.16 + bandPhase * 0.78);
          const centerX = width * 0.5 + pointerBias * (0.2 + bandPhase);
          const offset = Math.sin(drift * Math.PI * 2 + i * 0.62) * 10;
          const alpha = 0.055 + (1 - bandPhase) * 0.06;
          const isWarm = i % 5 === 0;
          const color = isWarm ? palette.warm : palette.line;

          p.beginShape();
          p.stroke(rgba(color, alpha));
          p.strokeWeight(isWarm ? 1.15 : 0.85);
          for (let s = -18; s <= 18; s += 1) {
            const along = (s / 18) * diagonalSpan;
            const curve = Math.sin(s * 0.45 + i * 0.7 + drift * 18) * (2.6 + bandPhase * 2.2);
            const x = centerX + nx * along + (-ny) * curve;
            const y = centerY + ny * along + nx * curve + offset;
            p.curveVertex(x, y);
          }
          p.endShape();
        }

        const glowX = smoothed.x * width;
        const glowY = Math.max(height * 0.18, Math.min(height * 0.9, pointerY));
        for (let r = 0; r < 5; r += 1) {
          p.stroke(rgba(palette.warm, 0.05 - r * 0.007));
          p.strokeWeight(1);
          p.ellipse(glowX, glowY, 80 + r * 42, 14 + r * 8);
        }
      };
    };

    sketch = new p5(instance, host);

    return () => {
      if (sketch) sketch.remove();
    };
  }, []);

  return <div ref={hostRef} className="pool-ripple-canvas" aria-hidden="true" />;
}

export default PoolRippleCanvas;
