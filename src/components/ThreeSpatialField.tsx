import React, { useRef, useEffect } from 'react';

interface ThreeSpatialFieldProps {
  className?: string;
  sourceModel?: string;
  targetModel?: string;
  height?: number;
}

/**
 * ThreeSpatialField
 * Inspired by pmndrs/react-three-fiber:
 * Lightweight, 60fps 3D spatial WebGL particle field rendering conversational tokens
 * flowing through an encrypted quantum conduit from source model to target model.
 * Adds tactile depth, perspective tilt, and spatial continuity to subpages.
 */
export const ThreeSpatialField: React.FC<ThreeSpatialFieldProps> = ({
  className = '',
  sourceModel = 'ChatGPT',
  targetModel = 'Claude 3.7',
  height = 200
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let h = (canvas.height = height);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // 3D Particles streaming in perspective
    const PARTICLE_COUNT = 65;
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 120,
      z: Math.random() * 800,
      speed: 2.2 + Math.random() * 2.5,
      size: 1.5 + Math.random() * 2.5,
      color: i % 2 === 0 ? '#2997FF' : '#38BDF8'
    }));

    let time = 0;
    const fov = 300;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, h);

      const cx = width / 2;
      const cy = h / 2;

      // Draw glowing conduit beam
      const beamGrad = ctx.createLinearGradient(cx - 220, cy, cx + 220, cy);
      beamGrad.addColorStop(0, 'rgba(0, 113, 227, 0.4)');
      beamGrad.addColorStop(0.5, 'rgba(41, 151, 255, 0.15)');
      beamGrad.addColorStop(1, 'rgba(56, 189, 248, 0.4)');

      ctx.beginPath();
      ctx.ellipse(cx, cy, 220, 28, 0, 0, Math.PI * 2);
      ctx.fillStyle = beamGrad;
      ctx.fill();

      // Render 3D Perspective Particles moving along conduit
      particles.forEach((p) => {
        p.z -= p.speed;
        if (p.z <= 10) {
          p.z = 800;
          p.x = (Math.random() - 0.5) * 400;
          p.y = (Math.random() - 0.5) * 120;
        }

        // Perspective projection
        const scale = fov / (fov + p.z);
        const projX = cx + (p.x + Math.sin(time + p.z * 0.01) * 35) * scale;
        const projY = cy + (p.y + Math.cos(time + p.z * 0.01) * 15) * scale;
        const radius = Math.max(0.8, p.size * scale * 1.8);
        const alpha = Math.min(1, Math.max(0.1, (1 - p.z / 800) * 1.2));

        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Left Node: Source Model Orb
      const leftX = cx - 180;
      ctx.beginPath();
      ctx.arc(leftX, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981';
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Right Node: Target Model Orb
      const rightX = cx + 180;
      ctx.beginPath();
      ctx.arc(rightX, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#F97316';
      ctx.shadowColor = '#F97316';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Text labels below orbs
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#86868B';
      ctx.fillText(sourceModel, leftX, cy + 28);
      ctx.fillText(targetModel, rightX, cy + 28);

      ctx.fillStyle = '#2997FF';
      ctx.fillText('AES-256 Memory Stream', cx, cy - 35);

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      h = height;
      canvas.width = width * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [sourceModel, targetModel, height]);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-neutral-950/70 border border-white/5 backdrop-blur-md ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height }}
        className="block select-none"
      />
    </div>
  );
};
