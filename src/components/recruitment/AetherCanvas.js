import { useEffect, useRef } from "react";

export function AetherCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "test") return undefined;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let frameId;
    const pointer = { x: 0.72, y: 0.32 };
    const particles = Array.from({ length: prefersReducedMotion ? 42 : 96 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.7 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007,
      hue: index % 3,
    }));

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const grd = ctx.createRadialGradient(pointer.x * width, pointer.y * height, 30, pointer.x * width, pointer.y * height, Math.max(width, height) * 0.72);
      grd.addColorStop(0, "rgba(216, 12, 13, 0.18)");
      grd.addColorStop(0.42, "rgba(128, 131, 255, 0.08)");
      grd.addColorStop(1, "rgba(8, 10, 16, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, i) => {
        if (!prefersReducedMotion) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          p.x += p.vx + dx * 0.00008;
          p.y += p.vy + dy * 0.00008;
          if (p.x < -0.03) p.x = 1.03;
          if (p.x > 1.03) p.x = -0.03;
          if (p.y < -0.03) p.y = 1.03;
          if (p.y > 1.03) p.y = -0.03;
        }

        const x = p.x * width;
        const y = p.y * height;
        const color = p.hue === 0 ? "216, 12, 13" : p.hue === 1 ? "128, 131, 255" : "121, 217, 255";
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${p.hue === 0 ? 0.55 : 0.34})`;
        ctx.shadowColor = `rgba(${color}, 0.75)`;
        ctx.shadowBlur = 14;
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dist = Math.hypot((q.x - p.x) * width, (q.y - p.y) * height);
          if (dist < 118) {
            ctx.strokeStyle = `rgba(255, 180, 168, ${0.1 * (1 - dist / 118)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(q.x * width, q.y * height);
            ctx.stroke();
          }
        }
      });

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="aether-canvas" aria-hidden="true" />;
}
