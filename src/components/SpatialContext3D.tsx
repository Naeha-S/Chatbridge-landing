import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface NodePoint {
  position: [number, number, number];
  label: string;
  color: string;
}

function FloatingNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  // Nodes representing cross-AI model context points
  const nodes: NodePoint[] = useMemo(
    () => [
      { position: [-1.4, 0.8, 0.4], label: 'ChatGPT', color: '#10A37F' },
      { position: [1.5, 0.9, -0.3], label: 'Claude 3.7', color: '#D97706' },
      { position: [1.2, -1.1, 0.5], label: 'Gemini 2.0', color: '#2563EB' },
      { position: [-1.3, -1.0, -0.4], label: 'DeepSeek R1', color: '#7C3AED' },
      { position: [0, 0, 0], label: 'Context Capsule', color: '#0071E3' }
    ],
    []
  );

  // Build connecting lines geometry
  const linePositions = useMemo(() => {
    const coords: number[] = [];
    const center = [0, 0, 0];
    nodes.slice(0, 4).forEach((node) => {
      coords.push(...node.position);
      coords.push(...center);
    });
    // Cross connections
    coords.push(...nodes[0].position, ...nodes[1].position);
    coords.push(...nodes[1].position, ...nodes[2].position);
    coords.push(...nodes[2].position, ...nodes[3].position);
    coords.push(...nodes[3].position, ...nodes[0].position);
    return new Float32Array(coords);
  }, [nodes]);

  // Subtle, highly controlled mouse tracking physics
  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.22, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.18, 0.04);
  });

  return (
    <group ref={groupRef}>
      {/* Central Distorted Crystal Core (Context Capsule) */}
      <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.65, 2]} />
          <MeshDistortMaterial
            color="#0071E3"
            envMapIntensity={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.3}
            roughness={0.2}
            distort={0.2}
            speed={1.8}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      {/* Perimeter AI Model Nodes */}
      {nodes.map((node, i) => (
        <group key={i} position={node.position}>
          <mesh>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.45}
              roughness={0.2}
            />
          </mesh>
          <mesh scale={1.25}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.18} />
          </mesh>
        </group>
      ))}

      {/* Connecting Luminous Beam Lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#2997FF" transparent opacity={0.3} linewidth={1} />
      </lineSegments>
    </group>
  );
}

// Crisp, high-fidelity static SVG vector fallback when reduced motion or performance mode is active
const StaticVectorIllustration = () => (
  <div className="w-full h-full flex items-center justify-center p-6 relative">
    <svg viewBox="0 0 400 240" className="w-full h-full max-w-[540px] drop-shadow-md select-none" fill="none">
      {/* Ambient Gradient Defs */}
      <defs>
        <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0071E3" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#2997FF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#30D158" stopOpacity="0.6" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Connecting Beam Lines */}
      <path d="M 90,60 L 200,120 M 310,50 L 200,120 M 300,190 L 200,120 M 100,180 L 200,120" stroke="#2997FF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
      <path d="M 90,60 L 310,50 L 300,190 L 100,180 Z" stroke="#2997FF" strokeWidth="1" opacity="0.25" />

      {/* Central Crystal Context Capsule */}
      <g transform="translate(200,120)" filter="url(#glow)">
        <polygon points="0,-32 28,0 0,32 -28,0" fill="url(#crystalGrad)" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
        <polygon points="0,-32 14,0 0,32 -14,0" fill="#FFFFFF" opacity="0.2" />
        <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
      </g>

      {/* Model Nodes */}
      {/* ChatGPT */}
      <g transform="translate(90,60)">
        <circle cx="0" cy="0" r="14" fill="#10A37F" fillOpacity="0.2" stroke="#10A37F" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="6" fill="#10A37F" />
        <text x="0" y="24" textAnchor="middle" fill="currentColor" className="text-[10px] font-mono fill-neutral-700 dark:fill-neutral-300 font-semibold">ChatGPT</text>
      </g>

      {/* Claude */}
      <g transform="translate(310,50)">
        <circle cx="0" cy="0" r="14" fill="#D97706" fillOpacity="0.2" stroke="#D97706" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="6" fill="#D97706" />
        <text x="0" y="24" textAnchor="middle" fill="currentColor" className="text-[10px] font-mono fill-neutral-700 dark:fill-neutral-300 font-semibold">Claude 3.7</text>
      </g>

      {/* Gemini */}
      <g transform="translate(300,190)">
        <circle cx="0" cy="0" r="14" fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="6" fill="#2563EB" />
        <text x="0" y="24" textAnchor="middle" fill="currentColor" className="text-[10px] font-mono fill-neutral-700 dark:fill-neutral-300 font-semibold">Gemini 2.0</text>
      </g>

      {/* DeepSeek */}
      <g transform="translate(100,180)">
        <circle cx="0" cy="0" r="14" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="6" fill="#7C3AED" />
        <text x="0" y="24" textAnchor="middle" fill="currentColor" className="text-[10px] font-mono fill-neutral-700 dark:fill-neutral-300 font-semibold">DeepSeek R1</text>
      </g>
    </svg>
  </div>
);

export const SpatialContext3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);

  // Check system prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPerformanceMode(true);
    }
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setPerformanceMode(true);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`relative w-full max-w-4xl mx-auto h-[300px] sm:h-[360px] rounded-3xl overflow-hidden liquid-glass-panel backdrop-blur-xl bg-white/60 dark:bg-[#07070B]/60 border border-neutral-200/80 dark:border-white/10 shadow-xl transition-all ${className}`}>
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-radial from-[#0071E3]/10 dark:from-[#2997FF]/15 via-transparent to-transparent pointer-events-none" />

      {/* Top Left Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-neutral-200/80 dark:border-white/10 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
        <span className={`w-2 h-2 rounded-full ${performanceMode ? 'bg-emerald-500' : 'bg-[#0071E3] dark:bg-[#2997FF] animate-pulse'}`} />
        <span>{performanceMode ? 'Static Vector Topology (60FPS)' : 'Interactive 3D Context Topology'}</span>
      </div>

      {/* Top Right Performance-Mode Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          type="button"
          onClick={() => setPerformanceMode(!performanceMode)}
          className="px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-neutral-200/80 dark:border-white/10 text-[10px] font-mono text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-xs cursor-pointer"
          title="Toggle between real-time 3D motion and static vector mode"
        >
          {performanceMode ? '⚡ 3D Motion On' : '🌱 Performance Mode'}
        </button>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 pointer-events-none hidden sm:block">
        {performanceMode ? 'System optimized for reduced motion' : 'Move mouse to orient 3D mesh'}
      </div>

      {performanceMode || hasError ? (
        <StaticVectorIllustration />
      ) : (
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 50 }}
          onError={() => setHasError(true)}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.85} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0071E3" />
          <FloatingNodes />
        </Canvas>
      )}
    </div>
  );
};
