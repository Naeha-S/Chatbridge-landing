import React, { useState, useEffect } from 'react';
import { IconMessagePlus } from '@tabler/icons-react';
import { FeedbackModal } from './FeedbackModal';

export const FeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut listener: Option+F (Alt+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && (e.key === 'f' || e.key === 'F')) || (e.altKey && e.code === 'KeyF')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Sleek Floating Feedback Trigger Button */}
      <aside
        aria-label="Feedback Trigger"
        className="fixed bottom-5 right-5 z-40 font-sans"
      >
        <button
          id="feedback-widget-trigger-btn"
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 dark:bg-[#151520]/90 backdrop-blur-md text-[#1D1D1F] dark:text-[#F5F5F7] border border-neutral-200/90 dark:border-white/15 shadow-lg hover:shadow-xl hover:border-[#0071E3]/50 dark:hover:border-[#2997FF]/50 transition-all duration-200 active:scale-95"
          title="Share Feedback or Request Models (⌥F)"
          aria-label="Open Feedback Dialog"
        >
          <IconMessagePlus className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF] group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium tracking-tight">Feedback</span>
          <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-neutral-100 dark:bg-white/10 text-neutral-500 dark:text-neutral-400 hidden sm:inline">
            ⌥F
          </span>
        </button>
      </aside>

      {/* Render Clean Feedback Dialog */}
      <FeedbackModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
