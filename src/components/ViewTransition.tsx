import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ViewTransitionProps {
  viewKey: string;
  children: React.ReactNode;
}

export const ViewTransition: React.FC<ViewTransitionProps> = ({ viewKey, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'transform' }
      );
    }
  }, [viewKey]);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
};
