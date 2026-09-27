import React from 'react';
import PrismFilmDark from './originkit/ui/prism-film-custom-style1';
import PrismFilmLight from './originkit/ui/prism-film-custom-style2';
import { DownloadIcon, ArrowRightIcon, ShieldCheckIcon, ZapIcon, LockIcon } from './Icons';
import { CHROME_WEBSTORE_URL } from '../constants/links';

interface ConversionCTAProps {
  isDarkMode: boolean;
  onOpenInstall: () => void;
  onExploreFeatures: () => void;
}

export const ConversionCTA: React.FC<ConversionCTAProps> = ({
  isDarkMode,
  onOpenInstall: _onOpenInstall,
  onExploreFeatures,
}) => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 border-y border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl transition-colors">
      {/* Living WebGL Prism Film Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        <div className={`w-full h-full transition-opacity duration-700 ${
          isDarkMode ? 'opacity-40' : 'opacity-30'
        }`}>
          {isDarkMode ? (
            <PrismFilmDark
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            />
          ) : (
            <PrismFilmLight
              background="#FBFBFA"
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            />
          )}
        </div>

        {/* Ambient Vignette & Contrast Mask */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(244,244,248,0.7)_80%,#FBFBFA_100%] dark:bg-radial-[circle_at_center,transparent_0%,rgba(8,7,13,0.75)_80%,#040405_100%]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Spatial spacer preserving vertical hierarchy without chip pill */}
        <div aria-hidden="true" className="h-7 pointer-events-none select-none" />

        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
            Stop explaining yourself to AI.
          </h2>
          <p className="text-base sm:text-lg text-[#515154] dark:text-[#A1A1A6] max-w-2xl mx-auto leading-relaxed">
            Carry your goals, guidelines, and project state across ChatGPT, Claude, and Gemini with zero friction.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            id="cta-prism-install-btn"
            href={CHROME_WEBSTORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950"
          >
            <DownloadIcon className="w-4 h-4 text-[#0071E3] dark:text-[#0071E3]" />
            <span className="text-white dark:text-neutral-950 font-semibold">Add ChatBridge to Chrome</span>
          </a>

          <button
            onClick={onExploreFeatures}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#D1D1D6] dark:border-[#333346] text-sm font-medium backdrop-blur-md transition-all bg-white/80 dark:bg-[#151522]/80 hover:bg-white dark:hover:bg-[#1E1E2C] text-[#1D1D1F] dark:text-[#F5F5F7]"
          >
            <span>Explore Benefits</span>
            <ArrowRightIcon className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#8E8E98]" />
          </button>
        </div>

        {/* Trust & Spec Markers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-2xl mx-auto text-xs font-mono text-[#515154] dark:text-[#A1A1A6]">
          <div className="p-3 rounded-xl border border-[#E5E5EA] dark:border-[#22222E] backdrop-blur-xs flex items-center justify-center gap-2 bg-white/60 dark:bg-[#0D0D14]/60">
            <ShieldCheckIcon className="w-4 h-4 text-[#34C759]" />
            <span>Local AES-256-GCM</span>
          </div>

          <div className="p-3 rounded-xl border border-[#E5E5EA] dark:border-[#22222E] backdrop-blur-xs flex items-center justify-center gap-2 bg-white/60 dark:bg-[#0D0D14]/60">
            <ZapIcon className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
            <span>Sub-20ms Retrieval</span>
          </div>

          <div className="p-3 rounded-xl border border-[#E5E5EA] dark:border-[#22222E] backdrop-blur-xs flex items-center justify-center gap-2 bg-white/60 dark:bg-[#0D0D14]/60">
            <LockIcon className="w-4 h-4 text-[#FF9500]" />
            <span>Zero Telemetry</span>
          </div>
        </div>
      </div>
    </section>
  );
};
