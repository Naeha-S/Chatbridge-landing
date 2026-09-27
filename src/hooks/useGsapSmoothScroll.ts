import { useEffect } from 'react';
import gsap from 'gsap';

// Reference to any active GSAP scroll tween so user interaction can cancel it immediately
let activeScrollTween: gsap.core.Tween | null = null;

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  container?: HTMLElement | Window;
}

/**
 * Optimizes scrolling containers with GPU composition hints:
 * - will-change: transform
 * - backface-visibility: hidden
 * Eliminates raster stuttering and prevents frame drops during scroll animations.
 */
function applyGpuAcceleration(element: HTMLElement) {
  element.style.willChange = 'transform';
  element.style.backfaceVisibility = 'hidden';
  (element.style as any).webkitBackfaceVisibility = 'hidden';
}

function removeGpuAcceleration(element: HTMLElement) {
  element.style.willChange = '';
  element.style.backfaceVisibility = '';
  (element.style as any).webkitBackfaceVisibility = '';
}

/**
 * Interrupt handler: If the user touches trackpad, mouse wheel, or keys,
 * cancel any running programmatic scroll tween immediately.
 * This guarantees the user NEVER gets stuck or locked during animations.
 */
function killActiveScrollTween() {
  if (activeScrollTween) {
    activeScrollTween.kill();
    activeScrollTween = null;
    if (typeof document !== 'undefined') {
      removeGpuAcceleration(document.documentElement);
      removeGpuAcceleration(document.body);
    }
  }
}

/**
 * Programmatic smooth scroll utility powered by GSAP with GPU hardware acceleration
 * and instant user interruption recovery.
 */
export function smoothScrollTo(
  target: string | HTMLElement,
  options: SmoothScrollOptions = {}
) {
  if (typeof window === 'undefined') return;

  const { offset = 60, duration = 0.55 } = options;
  let targetEl: HTMLElement | null = null;

  if (typeof target === 'string') {
    targetEl = document.querySelector(target);
  } else {
    targetEl = target;
  }

  // Kill previous tween to avoid competing tweens
  killActiveScrollTween();

  const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
  let targetY = 0;

  if (targetEl) {
    const rect = targetEl.getBoundingClientRect();
    targetY = Math.max(0, rect.top + startY - offset);
  }

  // If already at target position, return
  if (Math.abs(startY - targetY) < 2) return;

  // Reduced motion preference check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    window.scrollTo({ top: targetY, behavior: 'auto' });
    return;
  }

  // Prepare GPU layer acceleration on root scrolling containers
  const docEl = document.documentElement;
  const bodyEl = document.body;
  applyGpuAcceleration(docEl);
  applyGpuAcceleration(bodyEl);

  const scrollProxy = { y: startY };

  activeScrollTween = gsap.to(scrollProxy, {
    y: targetY,
    duration: Math.min(0.7, Math.max(0.35, duration)),
    ease: 'power2.out',
    onUpdate: () => {
      window.scrollTo(0, scrollProxy.y);
    },
    onComplete: () => {
      removeGpuAcceleration(docEl);
      removeGpuAcceleration(bodyEl);
      activeScrollTween = null;
    },
    onInterrupt: () => {
      removeGpuAcceleration(docEl);
      removeGpuAcceleration(bodyEl);
      activeScrollTween = null;
    }
  });
}

/**
 * Hook to initialize hardware-accelerated scrolling containers
 * and register passive user-interruption listeners to resolve 'stuck' scrolling behavior.
 */
export function useGsapSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Apply will-change: transform and backface-visibility: hidden to primary scrollable containers
    const scrollContainers = document.querySelectorAll<HTMLElement>(
      'main, section, [data-scroll-container], .custom-scrollbar'
    );

    scrollContainers.forEach((container) => {
      applyGpuAcceleration(container);
    });

    // Passive listeners: If user manually scrolls via wheel, touch or key, kill running tween immediately
    const handleUserInterrupt = () => {
      if (activeScrollTween) {
        killActiveScrollTween();
      }
    };

    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchstart', handleUserInterrupt, { passive: true });
    window.addEventListener('touchmove', handleUserInterrupt, { passive: true });
    window.addEventListener('keydown', handleUserInterrupt, { passive: true });

    return () => {
      killActiveScrollTween();
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
      window.removeEventListener('touchmove', handleUserInterrupt);
      window.removeEventListener('keydown', handleUserInterrupt);
    };
  }, []);
}
