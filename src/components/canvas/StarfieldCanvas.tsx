import React, { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  isWarping: boolean;
  onWarpComplete?: () => void;
  speedMultiplier?: number;
}

interface Star {
  x: number;
  y: number;
  z: number; // 3D depth
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number; // 1 (far), 2 (mid), 3 (near)
}

interface TrailParticle {
  x: number;
  y: number;
  alpha: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
}

interface CosmicRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  alpha: number;
}

export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({
  isWarping,
  onWarpComplete,
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse & Touch interaction state
    const mouse = {
      x: width / 2,
      y: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      speed: 0,
      isActive: false,
    };

    const trailParticles: TrailParticle[] = [];
    const ripples: CosmicRipple[] = [];

    // Calculate star count based on screen area
    const isMobile = width < 768;
    const starCount = prefersReducedMotion ? 80 : isMobile ? 160 : 380;

    // Color palette for cosmic universe
    const starColors = [
      '#FFFFFF',
      '#FFFFFF',
      '#E0E7FF', // Soft ice blue
      '#9B5CFF', // Electric violet accent
      '#42D9FF', // Cyan accent
      '#D8B4FE', // Lavender
    ];

    // Initialize stars with 3D depth
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const z = Math.random() * 1000 + 10;
      const x = (Math.random() - 0.5) * width * 1.5;
      const y = (Math.random() - 0.5) * height * 1.5;
      const layer = Math.random() > 0.8 ? 3 : Math.random() > 0.4 ? 2 : 1;
      const baseRadius = layer === 3 ? 1.8 + Math.random() * 0.8 : layer === 2 ? 1.2 + Math.random() * 0.5 : 0.6 + Math.random() * 0.5;

      stars.push({
        x,
        y,
        z,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.2 * layer,
        vy: (Math.random() - 0.5) * 0.2 * layer,
        radius: baseRadius,
        baseRadius,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: 0.3 + Math.random() * 0.7,
        alpha: 0.5,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        twinklePhase: Math.random() * Math.PI * 2,
        layer,
      });
    }

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.isActive = true;
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Add subtle particle trail on movement
      if (!prefersReducedMotion && trailParticles.length < 35 && Math.random() > 0.4) {
        trailParticles.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          alpha: 0.8,
          radius: 1 + Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          color: Math.random() > 0.5 ? '#9B5CFF' : '#42D9FF',
        });
      }
    };

    // Touch movement handler
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.isActive = true;
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    // Click handler for Cosmic Ripple
    const handleClick = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: Math.min(width, height) * 0.45,
        strength: 22,
        alpha: 0.9,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Warp-speed state variables
    let warpFactor = 1;
    let warpTime = 0;
    const warpDuration = 110; // frames (~1.8s)

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.016;

      // Clear with slight persistence for motion blur during warp
      if (isWarping) {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.25)';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      // Handle Warp Speed Acceleration
      if (isWarping) {
        warpTime++;
        // Ease-in exponential acceleration
        warpFactor = 1 + Math.pow(warpTime / 22, 2.5);

        if (warpTime >= warpDuration) {
          if (onWarpComplete) {
            onWarpComplete();
          }
        }
      } else {
        warpFactor = 1;
        warpTime = 0;
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Update and Draw Cosmic Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const ripple = ripples[r];
        ripple.radius += 7;
        ripple.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(155, 92, 255, ${ripple.alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, Math.max(0, ripple.radius - 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(66, 217, 255, ${ripple.alpha * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (ripple.radius >= ripple.maxRadius || ripple.alpha < 0.02) {
          ripples.splice(r, 1);
        }
      }

      // Update and Draw Cursor Particle Trail
      for (let p = trailParticles.length - 1; p >= 0; p--) {
        const pt = trailParticles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha *= 0.92;
        pt.radius *= 0.97;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (pt.alpha < 0.05 || pt.radius < 0.3) {
          trailParticles.splice(p, 1);
        }
      }

      // Constellation storage (for nearby visible stars)
      const nearbyVisibleStars: { screenX: number; screenY: number; distToMouse: number }[] = [];

      // Update and Draw Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // 3D Perspective math
        if (isWarping) {
          // Stars rush towards screen in warp tunnel
          star.z -= 18 * (warpFactor * 0.4);
          if (star.z <= 2) {
            star.z = 1000;
            star.x = (Math.random() - 0.5) * width * 1.5;
            star.y = (Math.random() - 0.5) * height * 1.5;
          }
        } else {
          // Natural drift
          star.x += star.vx * speedMultiplier;
          star.y += star.vy * speedMultiplier;

          // Boundary wrapping
          if (star.x < -width) star.x = width;
          if (star.x > width) star.x = -width;
          if (star.y < -height) star.y = height;
          if (star.y > height) star.y = -height;
        }

        // Screen projection
        const k = 400 / Math.max(1, star.z);
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        // Skip if outside viewport
        if (px < -50 || px > width + 50 || py < -50 || py > height + 50) {
          continue;
        }

        // Mouse Physics: Gravitational attraction, magnetic curve, and disturbance
        let renderX = px;
        let renderY = py;

        if (!isWarping && mouse.isActive && !prefersReducedMotion) {
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxInteractionDist = 180;

          if (dist < maxInteractionDist && dist > 1) {
            const factor = (1 - dist / maxInteractionDist);

            // 1. Gravitational pull towards cursor
            const pull = factor * 14;
            renderX += (dx / dist) * pull;
            renderY += (dy / dist) * pull;

            // 2. Magnetic orbit/curve
            const orbit = factor * 4;
            renderX += (-dy / dist) * orbit;
            renderY += (dx / dist) * orbit;

            // 3. Mouse flick disturbance
            if (mouse.speed > 12) {
              const disturbance = Math.min(mouse.speed * 0.4, 20) * factor;
              renderX += (Math.random() - 0.5) * disturbance;
              renderY += (Math.random() - 0.5) * disturbance;
            }

            // Save for constellation drawing
            if (dist < 140) {
              nearbyVisibleStars.push({ screenX: renderX, screenY: renderY, distToMouse: dist });
            }
          }
        }

        // Apply cosmic ripple displacement
        for (const ripple of ripples) {
          const rdx = renderX - ripple.x;
          const rdy = renderY - ripple.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const waveDist = Math.abs(rdist - ripple.radius);

          if (waveDist < 35 && rdist > 0) {
            const pushFactor = (1 - waveDist / 35) * (ripple.strength * (ripple.alpha / 1.0));
            renderX += (rdx / rdist) * pushFactor;
            renderY += (rdy / rdist) * pushFactor;
          }
        }

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5; // 0 to 1
        star.alpha = star.baseAlpha * (0.6 + twinkle * 0.4);

        // Rendering Star
        if (isWarping) {
          // Render Hyperspace Streak Lines
          const streakLength = Math.min(warpFactor * 3.5, 90) * (k * 0.8);
          const angle = Math.atan2(py - centerY, px - centerX);
          const tailX = px - Math.cos(angle) * streakLength;
          const tailY = py - Math.sin(angle) * streakLength;

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.max(1, star.radius * k * 0.4);
          ctx.globalAlpha = Math.min(1, 0.3 + (warpFactor / 20));
          ctx.stroke();
          ctx.globalAlpha = 1;
        } else {
          // Normal star render
          const renderRadius = Math.max(0.6, star.radius * (star.layer === 3 ? 1.2 : 0.9));

          ctx.beginPath();
          ctx.arc(renderX, renderY, renderRadius, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.alpha;
          ctx.fill();

          // Subtle glow for brightest near stars
          if (star.layer === 3 && star.alpha > 0.7) {
            ctx.beginPath();
            ctx.arc(renderX, renderY, renderRadius * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = star.color === '#FFFFFF' ? 'rgba(155, 92, 255, 0.2)' : 'rgba(66, 217, 255, 0.2)';
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      }

      // Constellation Effect: Connect stars close to each other and to the cursor
      if (!isWarping && !prefersReducedMotion && nearbyVisibleStars.length > 1) {
        const maxLinkDist = 90;
        ctx.lineWidth = 0.7;

        for (let a = 0; a < nearbyVisibleStars.length; a++) {
          const starA = nearbyVisibleStars[a];

          // Line from star to cursor
          if (starA.distToMouse < 90) {
            const cursorAlpha = (1 - starA.distToMouse / 90) * 0.35;
            ctx.beginPath();
            ctx.moveTo(starA.screenX, starA.screenY);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(155, 92, 255, ${cursorAlpha})`;
            ctx.stroke();
          }

          // Lines between neighboring stars
          for (let b = a + 1; b < nearbyVisibleStars.length; b++) {
            const starB = nearbyVisibleStars[b];
            const distAB = Math.hypot(starA.screenX - starB.screenX, starA.screenY - starB.screenY);

            if (distAB < maxLinkDist) {
              const linkAlpha = (1 - distAB / maxLinkDist) * 0.25;
              ctx.beginPath();
              ctx.moveTo(starA.screenX, starA.screenY);
              ctx.lineTo(starB.screenX, starB.screenY);
              ctx.strokeStyle = `rgba(66, 217, 255, ${linkAlpha})`;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [isWarping, onWarpComplete, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #0d0b18 0%, #050505 85%)',
      }}
      aria-hidden="true"
    />
  );
};
