import React, { useRef, useEffect } from 'react';

interface LiquidLogoProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

/**
 * LiquidLogoCanvas
 * Inspired by collidingScopes/liquid-logo:
 * Procedural fluid dynamic metaballs rendering real-time surface tension,
 * liquid viscosity, specular light reflections, and cursor ripple.
 * Embodies the fluid continuity of conversational context moving between AI assistants.
 */
export const LiquidLogoCanvas: React.FC<LiquidLogoProps> = ({
  size = 36,
  className = '',
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let t = 0;

    // Metaballs configuration
    const balls = [
      { baseRadius: size * 0.28, phase: 0, speed: 0.045, color: '#0071E3' },
      { baseRadius: size * 0.24, phase: Math.PI * 0.65, speed: 0.038, color: '#2997FF' },
      { baseRadius: size * 0.22, phase: Math.PI * 1.35, speed: 0.052, color: '#38BDF8' }
    ];

    const render = () => {
      t += 0.025;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const maxOrbit = size * 0.2;

      // Mouse influence
      let targetOffsetX = 0;
      let targetOffsetY = 0;
      if (interactive && mouseRef.current.active) {
        targetOffsetX = (mouseRef.current.x - cx) * 0.25;
        targetOffsetY = (mouseRef.current.y - cy) * 0.25;
      }

      // Draw subtle fluid caustic background glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, size * 0.48);
      glowGrad.addColorStop(0, 'rgba(41, 151, 255, 0.28)');
      glowGrad.addColorStop(0.7, 'rgba(0, 113, 227, 0.12)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
      ctx.fill();

      // Draw fluid bridge connecting drops
      const p1x = cx - maxOrbit * 0.8 + Math.sin(t * 1.2) * (size * 0.06) + targetOffsetX;
      const p1y = cy + Math.cos(t * 1.1) * (size * 0.06) + targetOffsetY;

      const p2x = cx + maxOrbit * 0.8 + Math.cos(t * 1.3) * (size * 0.06) + targetOffsetX;
      const p2y = cy - Math.sin(t * 1.0) * (size * 0.06) + targetOffsetY;

      // Viscous neck bridge
      const dist = Math.hypot(p2x - p1x, p2y - p1y);
      const neckWidth = Math.max(3, (size * 0.22) * (1 - dist / (size * 1.2)));

      ctx.beginPath();
      ctx.strokeStyle = '#0071E3';
      ctx.lineWidth = neckWidth;
      ctx.lineCap = 'round';
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.stroke();

      // Fluid Metaball 1 (Source node)
      const grad1 = ctx.createRadialGradient(
        p1x - size * 0.06,
        p1y - size * 0.06,
        1,
        p1x,
        p1y,
        balls[0].baseRadius
      );
      grad1.addColorStop(0, '#60A5FA');
      grad1.addColorStop(0.4, '#0071E3');
      grad1.addColorStop(1, '#004FB8');

      ctx.beginPath();
      ctx.arc(p1x, p1y, balls[0].baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad1;
      ctx.fill();

      // Fluid Metaball 2 (Destination node)
      const grad2 = ctx.createRadialGradient(
        p2x - size * 0.06,
        p2y - size * 0.06,
        1,
        p2x,
        p2y,
        balls[1].baseRadius
      );
      grad2.addColorStop(0, '#93C5FD');
      grad2.addColorStop(0.5, '#2997FF');
      grad2.addColorStop(1, '#0062CC');

      ctx.beginPath();
      ctx.arc(p2x, p2y, balls[1].baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad2;
      ctx.fill();

      // Central orbiting quantum token (illustrating fluid packet handoff)
      const orbitAngle = t * 1.8;
      const tokenX = cx + Math.cos(orbitAngle) * (dist * 0.38) + targetOffsetX;
      const tokenY = cy + Math.sin(orbitAngle) * (size * 0.08) + targetOffsetY;

      ctx.beginPath();
      ctx.arc(tokenX, tokenY, size * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Liquid Specular Highlight (VisionOS Glass Shine)
      ctx.beginPath();
      ctx.arc(p1x - balls[0].baseRadius * 0.35, p1y - balls[0].baseRadius * 0.35, balls[0].baseRadius * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p2x - balls[1].baseRadius * 0.35, p2y - balls[1].baseRadius * 0.35, balls[1].baseRadius * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse listeners for interactive fluid ripple
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [size, interactive]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className={`inline-block shrink-0 select-none ${className}`}
      aria-label="ChatBridge Fluid Continuity Emblem"
    />
  );
};
