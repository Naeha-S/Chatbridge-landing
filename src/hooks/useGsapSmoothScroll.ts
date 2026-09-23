import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

/**
 * Programmatically smooth-scroll to a target selector or element with GSAP
 */
export function smoothScrollTo(
  target: string | HTMLElement,
  options: { offset?: number; duration?: number } = {}
) {
  if (typeof window === 'undefined') return;

  const { offset = 70, duration = 0.85 } = options;
  let targetEl: HTMLElement | null = null;

  if (typeof target === 'string') {
    targetEl = document.querySelector(target);
  } else {
    targetEl = target;
  }

  if (!targetEl) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    targetEl.scrollIntoView({ behavior: 'auto' });
    return;
  }

  gsap.to(window, {
    duration,
    scrollTo: {
      y: targetEl,
      offsetY: offset,
      autoKill: true,
    },
    ease: 'power3.out',
  });
}

/**
 * Hook to initialize buttery-smooth momentum scrolling powered by GSAP
 */
export function useGsapSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let currentScroll = window.scrollY;
    let targetScroll = currentScroll;
    let isWheeling = false;
    let wheelTimeout: NodeJS.Timeout | null = null;

    const onWheel = (e: WheelEvent) => {
      // Don't intercept if modifier keys are pressed (zoom, etc.) or if inside a scrollable modal/pre/textarea
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('[data-lenis-prevent]') ||
          target.closest('.overflow-y-auto') ||
          target.closest('textarea') ||
          target.closest('pre'))
      ) {
        return;
      }

      // Detect mouse wheel step vs trackpad inertia
      const isTrackpad = Math.abs(e.deltaY) < 40 && Math.abs(e.deltaX) === 0 && e.deltaMode === 0;

      // For standard mouse wheels with chunky steps (e.g. deltaMode 1 or large deltaY), smooth it out!
      if (!isTrackpad) {
        e.preventDefault();

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const delta = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
        
        targetScroll = Math.max(0, Math.min(docHeight, targetScroll + delta * 1.15));

        isWheeling = true;
        gsap.to(window, {
          scrollTo: { y: targetScroll, autoKill: true },
          duration: 0.65,
          ease: 'power2.out',
          overwrite: true,
          onComplete: () => {
            isWheeling = false;
          },
        });

        if (wheelTimeout) clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          isWheeling = false;
        }, 150);
      } else {
        // Trackpad momentum is already continuous; keep target in sync
        targetScroll = window.scrollY;
      }
    };

    const onScroll = () => {
      if (!isWheeling) {
        targetScroll = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, []);
}
