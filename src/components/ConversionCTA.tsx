import React from 'react';
import PrismFilmDark from './originkit/ui/prism-film-custom-style1';
import PrismFilmLight from './originkit/ui/prism-film-custom-style2';
import { DownloadIcon, ArrowRightIcon, ShieldCheckIcon, ZapIcon, LockIcon } from './Icons';

interface ConversionCTAProps {
  isDarkMode: boolean;
  onOpenInstall: () => void;
  onExploreFeatures: () => void;
}

export const ConversionCTA: React.FC<ConversionCTAProps> = ({
  isDarkMode,
  onOpenInstall,
  onExploreFeatures,
}) => {
  return (
    <section className={`relative overflow-hidden py-24 md:py-32 border-y transition-colors ${
      isDarkMode ? 'bg-[#08070D] border-[#1F1D2B]' : 'bg-[#F4F4F8] border-[#E2E2EA]'
    }`}>
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
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            />
          )}
        </div>

        {/* Ambient Vignette & Contrast Mask */}
        <div className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-radial-[circle_at_center,transparent_0%,rgba(8,7,13,0.75)_80%,rgba(8,7,13,0.95)_100%]'
            : 'bg-radial-[circle_at_center,transparent_0%,rgba(244,244,248,0.7)_80%,rgba(244,244,248,0.95)_100%]'
        }`} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all shadow-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${
            isDarkMode ? 'bg-[#34C759]' : 'bg-[#28A745]'
          } animate-pulse`} />
          <span className={isDarkMode ? 'text-[#D1D1D6]' : 'text-[#333336]'}>
            Instant Setup • Free Chrome Extension
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h2 className={`text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08] ${
            isDarkMode ? 'text-white' : 'text-[#1D1D1F]'
          }`}>
            Stop explaining yourself to AI.
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-[#A1A1B2]' : 'text-[#4A4A52]'
          }`}>
            Carry your goals, guidelines, and project state across ChatGPT, Claude, and Gemini with zero friction.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="cta-prism-install-btn"
            onClick={onOpenInstall}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-white hover:bg-[#F2F2F7] text-[#0A0A0D]'
                : 'bg-[#1D1D1F] hover:bg-[#333336] text-white'
            }`}
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Add ChatBridge to Chrome</span>
          </button>

          <button
            onClick={onExploreFeatures}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border text-sm font-medium backdrop-blur-md transition-all ${
              isDarkMode
                ? 'bg-[#14131D]/80 hover:bg-[#1E1C2B] border-[#2E2A42] text-white'
                : 'bg-white/80 hover:bg-white border-[#D6D6E0] text-[#1D1D1F]'
            }`}
          >
            <span>Explore Benefits</span>
            <ArrowRightIcon className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`} />
          </button>
        </div>

        {/* Trust & Spec Markers */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-2xl mx-auto text-xs font-mono ${
          isDarkMode ? 'text-[#8A8A9E]' : 'text-[#62626E]'
        }`}>
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheckIcon className="w-4 h-4 text-[#34C759]" />
            <span>100% On-Device Storage</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <LockIcon className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>AES-256-GCM Hardware Encrypted</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <ZapIcon className="w-3.5 h-3.5 text-[#FF9500]" />
            <span>0.1s Universal ⌘+Shift+K</span>
          </div>
        </div>
      </div>
    </section>
  );
};
