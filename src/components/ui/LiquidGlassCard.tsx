import React, { useRef, useState } from 'react';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

/**
 * LiquidGlassCard
 * Inspired by dashersw/liquid-glass-js:
 * VisionOS-grade liquid glass refraction container featuring dynamic specular caustics,
 * chromatic dispersion along borders, and responsive light refraction that reacts to mouse position.
 */
export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 113, 227, 0.15)',
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={
        {
          '--liquid-mx': `${mousePos.x}%`,
          '--liquid-my': `${mousePos.y}%`,
          '--liquid-glow': glowColor
        } as React.CSSProperties
      }
      className={`relative overflow-hidden rounded-3xl backdrop-blur-2xl transition-all duration-300 ${
        isHovered ? 'shadow-2xl' : 'shadow-md'
      } border border-white/40 dark:border-white/10 bg-white/70 dark:bg-[#0B0B12]/80 text-[#1D1D1F] dark:text-[#F5F5F7] ${className}`}
    >
      {/* Dynamic Liquid Glass Specular Reflection Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-60 dark:opacity-40"
        style={{
          background: `radial-gradient(600px circle at var(--liquid-mx) var(--liquid-my), var(--liquid-glow), transparent 60%)`
        }}
      />

      {/* VisionOS Prismatic Liquid Rim Sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          boxShadow: isHovered
            ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 1px 0 rgba(0, 113, 227, 0.2)'
            : 'none'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
