import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export const AtomPortrait: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = "/images/profile.jpg";

    let particles: Particle[] = [];
    let animationId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const createParticles = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      if (!width || !height) return;

      dpr = Math.min(window.devicePixelRatio || 1, 1);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");

      if (!offCtx) return;

      offscreen.width = 240;
      offscreen.height = 300;

      // Preserve the original photograph proportions.
      const scale = Math.min(240 / image.width, 300 / image.height);

      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;

      const offsetX = (240 - drawWidth) / 2;
      const offsetY = (300 - drawHeight) / 2;

      offCtx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

      const imageData = offCtx.getImageData(0, 0, 240, 300).data;

      particles = [];

      const scaleX = width / 240;
      const scaleY = height / 300;

      // Sample the photograph and convert foreground pixels into particles.
      for (let y = 0; y < 300; y += 4) {
        for (let x = 0; x < 240; x += 4) {
          const index = (y * 240 + x) * 4;

          const r = imageData[index];
          const g = imageData[index + 1];
          const b = imageData[index + 2];
          const a = imageData[index + 3];

          if (a < 100) continue;

          // Remove the bright blue studio background.
          const isBlueBackground =
            b > 100 && b > r * 1.3 && b > g * 1.05 && g > r * 1.15;

          if (isBlueBackground) continue;

          const screenX = x * (width / 240);
          const screenY = y * (height / 300);

          // Create a futuristic cyan-to-violet particle palette.
          const mix = x / 240;

          const color = mix > 0.5 ? `rgba(155,92,255,` : `rgba(66,217,255,`;

          particles.push({
            x: screenX + (Math.random() - 0.5) * 35,
            y: screenY + (Math.random() - 0.5) * 35,

            originX: screenX,
            originY: screenY,

            vx: 0,
            vy: 0,

            size: Math.random() * 1.3 + 0.5,
            color,
            alpha: 0.55 + Math.random() * 0.45,
          });
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction: nearby particles repel the cursor.
        if (mouse.active && distance < 75 && distance > 0) {
          const force = (75 - distance) / 75;

          p.vx -= (dx / distance) * force * 1.8;
          p.vy -= (dy / distance) * force * 1.8;
        }

        // Return particles to their original facial positions.
        p.vx += (p.originX - p.x) * 0.035;
        p.vy += (p.originY - p.y) * 0.035;

        // Smooth particle movement.
        p.vx *= 0.91;
        p.vy *= 0.91;

        p.x += p.vx;
        p.y += p.vy;

        // Draw glowing particle.
        ctx.beginPath();

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `${p.color}${p.alpha})`;

        ctx.fill();
      });

      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (image.complete && image.naturalWidth > 0) {
        createParticles();
      }
    };

    image.onload = () => {
      createParticles();
      animate();
    };

    image.onerror = () => {
      console.error("Could not load /images/profile.jpg");
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);

      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);

      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[220px] aspect-[4/5] mx-auto"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[#9B5CFF]/10 blur-[70px] rounded-full" />

      {/* Particle portrait */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full" />

      {/* Decorative orbital glow */}
      <div className="absolute inset-4 rounded-full border border-[#42D9FF]/10 pointer-events-none" />
    </div>
  );
};
