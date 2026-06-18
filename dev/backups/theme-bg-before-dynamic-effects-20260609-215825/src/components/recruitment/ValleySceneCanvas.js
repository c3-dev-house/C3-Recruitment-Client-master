import { useEffect, useRef } from "react";

const TARGETS = {
  "landing-valley": {
    zoom: 1,
    panY: 0,
    skyReveal: 0.42,
    starOpacity: 0.08,
    poolVisibility: 1,
    mistOpacity: 0.46,
    redSignal: 0.78,
  },
  "role-finding": {
    zoom: 1,
    panY: 0,
    skyReveal: 0.48,
    starOpacity: 0.14,
    poolVisibility: 0.94,
    mistOpacity: 0.54,
    redSignal: 0.78,
  },
  "forest-valley": {
    zoom: 1.08,
    panY: 0.03,
    skyReveal: 0.38,
    starOpacity: 0.06,
    poolVisibility: 0.72,
    mistOpacity: 0.62,
    redSignal: 0.5,
  },
  "high-ridge": {
    zoom: 0.96,
    panY: -0.08,
    skyReveal: 0.58,
    starOpacity: 0.2,
    poolVisibility: 0.56,
    mistOpacity: 0.5,
    redSignal: 0.9,
  },
  "cosmos-ridge": {
    zoom: 0.78,
    panY: -0.18,
    skyReveal: 0.76,
    starOpacity: 0.86,
    poolVisibility: 0.32,
    mistOpacity: 0.32,
    redSignal: 0.36,
  },
};

const BRAND = {
  overlayBlue: [7, 25, 47],
  blueDark: [6, 65, 153],
  redDark: [216, 12, 13],
  midnight: [31, 32, 36],
  pebble: [241, 241, 241],
  sunrise: [255, 179, 107],
};

function clamp01(value) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}

function safeTarget(mode) {
  return TARGETS[mode] || TARGETS["landing-valley"];
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

function mixRgb(a, b, t) {
  return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
}

function rgba(rgb, alpha) {
  return `rgba(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}, ${alpha})`;
}

function seededNoise(seed) {
  const x = Math.sin(seed * 999.17) * 43758.5453;
  return x - Math.floor(x);
}

const MOUNTAIN_LAYERS = [
  {
    id: "far",
    depth: 0.82,
    y: 0.64,
    height: 0.2,
    alpha: 0.54,
    ridge: [0, 0.12, 0.26, 0.42, 0.58, 0.76, 1],
    peaks: [0.9, 0.42, 0.68, 0.25, 0.58, 0.34, 0.86],
    paletteA: BRAND.overlayBlue,
    paletteB: BRAND.blueDark,
  },
  {
    id: "mid",
    depth: 0.52,
    y: 0.7,
    height: 0.32,
    alpha: 0.72,
    ridge: [0, 0.1, 0.22, 0.36, 0.5, 0.64, 0.8, 1],
    peaks: [0.96, 0.58, 0.2, 0.5, 0.27, 0.62, 0.26, 0.95],
    paletteA: BRAND.overlayBlue,
    paletteB: BRAND.midnight,
  },
  {
    id: "near",
    depth: 0.22,
    y: 0.77,
    height: 0.38,
    alpha: 0.9,
    ridge: [0, 0.08, 0.2, 0.34, 0.48, 0.62, 0.78, 0.92, 1],
    peaks: [1, 0.7, 0.38, 0.62, 0.31, 0.7, 0.42, 0.64, 1],
    paletteA: BRAND.midnight,
    paletteB: BRAND.overlayBlue,
  },
];

function drawLinearGradient(p, x, y, w, h, top, bottom) {
  for (let i = 0; i < h; i += 2) {
    const t = i / Math.max(1, h);
    const c = mixRgb(top, bottom, t);
    p.stroke(c[0], c[1], c[2]);
    p.line(x, y + i, x + w, y + i);
  }
}

export function ValleySceneCanvas({
  mode = "landing-valley",
  journeyStep = 0,
  applicationProgress = 0,
  showBeacon = false,
  portalActive = false,
}) {
  const hostRef = useRef(null);
  const propsRef = useRef({ mode, journeyStep, applicationProgress, showBeacon, portalActive });

  useEffect(() => {
    propsRef.current = { mode, journeyStep, applicationProgress, showBeacon, portalActive };
  }, [mode, journeyStep, applicationProgress, showBeacon, portalActive]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || process.env.NODE_ENV === "test") return undefined;

    let sketch;
    let cancelled = false;

    import("p5").then((module) => {
      if (cancelled || !host.isConnected) return;
      const P5 = module.default || module;
      if (P5?.disableFriendlyErrors !== undefined) P5.disableFriendlyErrors = true;

      const instance = (p) => {
        let width = 1;
        let height = 1;
        let sceneBuffer;
        const pointer = { x: 0.5, y: 0.4 };
        const smoothPointer = { x: 0.5, y: 0.4 };
        const camera = { ...TARGETS["landing-valley"] };
        let reducedMotion = false;

        const resize = () => {
          width = Math.max(1, host.clientWidth || 1);
          height = Math.max(1, host.clientHeight || 1);
          p.resizeCanvas(width, height);
          sceneBuffer = p.createGraphics(width, height);
          sceneBuffer.pixelDensity(1);
        };

        const onPointerMove = (event) => {
          const rect = host.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          pointer.x = clamp01((event.clientX - rect.left) / rect.width);
          pointer.y = clamp01((event.clientY - rect.top) / rect.height);
        };

        const onVisibilityChange = () => {
          if (document.hidden || reducedMotion) p.noLoop();
          else p.loop();
        };

        function drawSky(g, target) {
          drawLinearGradient(g, 0, 0, width, height, BRAND.overlayBlue, mixRgb(BRAND.overlayBlue, BRAND.blueDark, 0.32 + target.skyReveal * 0.35));
          g.noStroke();
          const glowY = height * (0.34 - target.panY * 0.45 + applicationProgressSafe() * 0.04);
          for (let r = 7; r >= 1; r -= 1) {
            g.fill(rgba(BRAND.blueDark, 0.01 * r));
            g.ellipse(width * 0.5, glowY, width * (0.1 * r), height * (0.04 * r));
          }
          for (let r = 4; r >= 1; r -= 1) {
            g.fill(rgba(BRAND.pebble, 0.006 * r));
            g.ellipse(width * 0.5, glowY + height * 0.02, width * (0.07 * r), height * (0.025 * r));
          }
        }

        function drawStars(g, target) {
          if (target.starOpacity <= 0.02) return;
          g.noStroke();
          for (let i = 0; i < 95; i += 1) {
            const sx = seededNoise(i + 11) * width;
            const sy = seededNoise(i + 97) * height * Math.max(0.36, target.skyReveal);
            const size = 0.7 + seededNoise(i + 44) * 1.4;
            const blueBias = seededNoise(i + 201) > 0.74;
            g.fill(rgba(blueBias ? BRAND.pebble : mixRgb(BRAND.pebble, BRAND.blueDark, 0.24), target.starOpacity * (0.22 + seededNoise(i + 22) * 0.46)));
            g.circle(sx, sy, size);
          }
        }

        function ridgePoints(layer, target, progress) {
          const depthPull = (1 - layer.depth) * 70;
          const aperture = propsRef.current.portalActive ? 1 : clamp01(propsRef.current.journeyStep || 0);
          const cameraScale = target.zoom + progress * 0.04;
          const xShift = (smoothPointer.x - 0.5) * depthPull + (aperture * (1 - layer.depth) * 22 * (layer.id === "near" ? 1 : -0.35));
          const yBase = height * (layer.y + target.panY + progress * (layer.id === "near" ? -0.035 : -0.018));
          const h = height * layer.height * cameraScale;
          return layer.ridge.map((x, index) => ({
            x: x * width + xShift,
            y: yBase - h * layer.peaks[index],
          }));
        }

        function drawMountainLayer(g, layer, target) {
          const progress = applicationProgressSafe();
          const points = ridgePoints(layer, target, progress);
          const baseY = height * (0.9 + target.panY * 0.4);
          const aperture = propsRef.current.portalActive ? 1 : clamp01(propsRef.current.journeyStep || 0);
          const openOffset = aperture * (layer.id === "near" ? 52 : layer.id === "mid" ? 20 : 0);
          const alpha = layer.alpha * (layer.id === "near" ? 1 - aperture * 0.18 : 1);

          g.noStroke();
          g.fill(rgba(mixRgb(layer.paletteA, layer.paletteB, 0.42), alpha));
          g.beginShape();
          g.vertex(-80 - openOffset, baseY + 80);
          points.forEach((pt, index) => {
            const side = pt.x < width * 0.5 ? -1 : 1;
            g.vertex(pt.x + side * openOffset * (1 - layer.depth), pt.y);
            if (index > 0 && index < points.length - 1) {
              const redGlint = target.redSignal * (layer.id === "mid" || layer.id === "near" ? 0.12 : 0.04);
              g.stroke(rgba(BRAND.redDark, redGlint * seededNoise(index + layer.depth)));
              g.strokeWeight(0.8);
              g.line(pt.x, pt.y, width * 0.5, baseY + 25);
              g.noStroke();
            }
          });
          g.vertex(width + 80 + openOffset, baseY + 80);
          g.endShape(g.CLOSE);

          for (let i = 0; i < points.length - 1; i += 1) {
            const a = points[i];
            const b = points[i + 1];
            const midX = (a.x + b.x) / 2;
            const shadeT = seededNoise(i + layer.depth * 31);
            const redChance = layer.id !== "far" && seededNoise(i + 77) > 0.72;
            const color = redChance
              ? mixRgb(layer.paletteA, BRAND.redDark, 0.22)
              : mixRgb(layer.paletteA, layer.paletteB, 0.22 + shadeT * 0.58);
            const facetAlpha = alpha * (0.2 + shadeT * 0.18);
            const lowerY = baseY - height * (0.02 + seededNoise(i + 5) * 0.1);
            g.fill(rgba(color, facetAlpha));
            g.stroke(rgba(BRAND.pebble, layer.id === "near" ? 0.018 : 0.012));
            g.strokeWeight(0.55);
            g.triangle(a.x, a.y, b.x, b.y, midX, lowerY);
          }
        }

        function drawMist(g, target) {
          const horizon = height * (0.77 + target.panY * 0.35);
          g.noStroke();
          for (let i = 0; i < 7; i += 1) {
            const alpha = target.mistOpacity * (0.022 + i * 0.004);
            g.fill(rgba(BRAND.pebble, alpha));
            const x = width * (-0.08 + i * 0.19) + Math.sin(p.millis() * 0.00012 + i) * 8;
            g.ellipse(x, horizon + Math.sin(i) * 12, width * 0.32, height * 0.05);
          }
        }

        function drawPortalGlow() {
          // The official Convergenc3 logo is a DOM image above the canvas.
          // Keep logo glow in CSS so the canvas does not paint a gaudy red halo behind it.
        }

        function applicationProgressSafe() {
          return clamp01(propsRef.current.applicationProgress || 0);
        }

        function drawWater(target) {
          const waterHeight = Math.max(112, height * (0.18 + target.poolVisibility * 0.04));
          const waterY = height - waterHeight;

          p.drawingContext.save();
          p.drawingContext.beginPath();
          p.drawingContext.rect(0, waterY, width, waterHeight);
          p.drawingContext.clip();
          p.push();
          p.translate(0, waterY * 2);
          p.scale(1, -1);
          p.tint(255, 58 * target.poolVisibility);
          p.image(sceneBuffer, 0, 0);
          p.noTint();
          p.pop();
          p.drawingContext.restore();

          p.noStroke();
          for (let i = 0; i < waterHeight; i += 2) {
            const t = i / waterHeight;
            const c = mixRgb(BRAND.overlayBlue, BRAND.blueDark, t * 0.5);
            p.fill(rgba(c, 0.08 + t * 0.22));
            p.rect(0, waterY + i, width, 2);
          }

          const drift = reducedMotion ? 0 : p.millis() * 0.00009;
          const bandCount = width < 680 ? 14 : 20;
          p.noFill();
          for (let i = 0; i < bandCount; i += 1) {
            const t = i / Math.max(1, bandCount - 1);
            const y = waterY + waterHeight * (0.12 + t * 0.78);
            const amp = reducedMotion ? 0 : 3 + t * 4;
            const warm = i % 5 === 0;
            p.stroke(rgba(warm ? BRAND.redDark : BRAND.pebble, (warm ? 0.05 : 0.035) * target.poolVisibility));
            p.strokeWeight(warm ? 1.1 : 0.8);
            p.beginShape();
            for (let x = -20; x <= width + 20; x += 28) {
              const wave = Math.sin(x * 0.012 + i * 0.65 + drift * 24 + smoothPointer.x) * amp;
              p.curveVertex(x, y + wave);
            }
            p.endShape();
          }
        }

        p.setup = () => {
          const canvas = p.createCanvas(Math.max(1, host.clientWidth || 1), Math.max(1, host.clientHeight || 1));
          canvas.elt.setAttribute("aria-hidden", "true");
          canvas.elt.style.display = "block";
          canvas.elt.style.width = "100%";
          canvas.elt.style.height = "100%";
          canvas.elt.style.pointerEvents = "none";
          p.pixelDensity(1);
          p.frameRate(30);
          resize();
          reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;
          window.addEventListener("pointermove", onPointerMove, { passive: true });
          document.addEventListener("visibilitychange", onVisibilityChange);
          if (reducedMotion) p.noLoop();
        };

        p.windowResized = resize;

        p.draw = () => {
          const target = safeTarget(propsRef.current.mode);
          const progress = applicationProgressSafe();
          const easing = reducedMotion ? 1 : 0.045;
          Object.keys(camera).forEach((key) => {
            camera[key] += ((target[key] ?? camera[key]) - camera[key]) * easing;
          });
          smoothPointer.x += (pointer.x - smoothPointer.x) * (reducedMotion ? 1 : 0.04);
          smoothPointer.y += (pointer.y - smoothPointer.y) * (reducedMotion ? 1 : 0.04);

          sceneBuffer.clear();
          drawSky(sceneBuffer, camera);
          drawStars(sceneBuffer, camera);
          sceneBuffer.push();
          sceneBuffer.translate(width * 0.5, height * 0.5);
          sceneBuffer.scale(camera.zoom + progress * 0.03);
          sceneBuffer.translate(-width * 0.5, -height * 0.5);
          MOUNTAIN_LAYERS.forEach((layer) => drawMountainLayer(sceneBuffer, layer, camera));
          sceneBuffer.pop();
          drawMist(sceneBuffer, camera);
          drawPortalGlow(sceneBuffer, camera);

          p.clear();
          p.image(sceneBuffer, 0, 0);
          drawWater(camera);

          const px = smoothPointer.x * width;
          const py = smoothPointer.y * height;
          p.noStroke();
          for (let r = 5; r >= 1; r -= 1) {
            p.fill(rgba(BRAND.sunrise, 0.016 * r));
            p.ellipse(px, py, width * 0.05 * r, width * 0.05 * r);
          }
        };

        p.remove = ((originalRemove) => () => {
          window.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("visibilitychange", onVisibilityChange);
          originalRemove.call(p);
        })(p.remove);
      };

      sketch = new P5(instance, host);
    });

    return () => {
      cancelled = true;
      if (sketch) sketch.remove();
    };
  }, []);

  return <div ref={hostRef} className="valley-scene-canvas" aria-hidden="true" data-mode={mode} />;
}

export default ValleySceneCanvas;
