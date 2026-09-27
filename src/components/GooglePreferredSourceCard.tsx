import React, { useEffect, useRef } from 'react';
import { IconExternalLink, IconSparkles, IconSearch, IconCheck } from '@tabler/icons-react';

interface GooglePreferredSourceCardProps {
  className?: string;
  theme?: 'dark' | 'light';
  variant?: 'banner' | 'card' | 'compact';
}

/**
 * Google Preferred Sources Component
 * Enables readers to add ChatBridge (chatbridge.app) as a preferred source in Google Search,
 * highlighting technical updates in Google Top Stories, AI Mode, and AI Overviews.
 *
 * Implements:
 * 1. Standard JavaScript SDK (<div google-add-preferred-source-btn>)
 * 2. Advanced JavaScript programmatic callback flow
 * 3. Verified deeplink fallback (https://www.google.com/preferences/source?q=chatbridge.app)
 */
export const GooglePreferredSourceCard: React.FC<GooglePreferredSourceCardProps> = ({
  className = '',
  theme = 'dark',
  variant = 'banner'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const preferredUrl = 'https://www.google.com/preferences/source?q=chatbridge.app';

  // Trigger Google Publisher JS initialization if SDK is present on window
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).preferredSource) {
      try {
        (window as any).preferredSource.init({
          theme: theme === 'dark' ? 'dark' : 'light',
          lang: 'en'
        });
      } catch {
        // Safe fallback
      }
    }
  }, [theme]);

  const handleProgrammaticTrigger = () => {
    if (typeof window !== 'undefined' && (window as any).preferredSource?.addPreferredSource) {
      try {
        (window as any).preferredSource.addPreferredSource();
        return;
      } catch {
        // fallback to deeplink
      }
    }
    window.open(preferredUrl, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 p-1.5 rounded-xl border border-neutral-200/90 dark:border-white/10 bg-white/80 dark:bg-[#121218]/80 backdrop-blur-md text-xs ${className}`}>
        {/* Google Standard Container Hook */}
        <div {...{ 'google-add-preferred-source-btn': '' }} data-theme={theme} data-lang="en" className="shrink-0" />

        <a
          href={preferredUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium transition-colors"
        >
          <GoogleGLogo className="w-3.5 h-3.5" />
          <span>Set as Preferred Source in Google</span>
          <IconExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-gradient-to-r from-blue-50/80 via-white to-sky-50/80 dark:from-[#0E1524] dark:via-[#0B0C12] dark:to-[#101426] p-6 sm:p-7 shadow-lg backdrop-blur-xl relative overflow-hidden transition-all ${className}`}
    >
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0071E3]/10 dark:bg-[#2997FF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Info & Description */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#0071E3]/10 dark:bg-[#2997FF]/15 text-[#0071E3] dark:text-[#2997FF] border border-[#0071E3]/20 dark:border-[#2997FF]/25">
              <GoogleGLogo className="w-3.5 h-3.5" />
              <span>Google Search Integration</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <IconCheck className="w-3.5 h-3.5" />
              <span>Preferred Source Verified</span>
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
            Follow ChatBridge in Google Search
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Select ChatBridge as a preferred source to prioritize our architectural updates, cross-model continuity benchmarks, and technical releases in Google <strong className="text-neutral-900 dark:text-white font-semibold">Top Stories</strong>, <strong className="text-neutral-900 dark:text-white font-semibold">AI Mode</strong>, and <strong className="text-neutral-900 dark:text-white font-semibold">AI Overviews</strong>.
          </p>
        </div>

        {/* Right: Interactive Preferred Source Button & Action */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-3 shrink-0">
          {/* Official Google Button Render Hook */}
          <div {...{ 'google-add-preferred-source-btn': '' }} data-theme={theme} data-lang="en" />

          {/* Custom High-Fidelity Trigger Button with Deeplink */}
          <button
            type="button"
            onClick={handleProgrammaticTrigger}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Open Google Preferences Source selector"
          >
            <GoogleGLogo className="w-4 h-4 bg-white rounded-full p-0.5" />
            <span>Add as Preferred Source</span>
            <IconExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Clean SVG representation of Google G logo for crisp high-DPI rendering
 */
function GoogleGLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}
