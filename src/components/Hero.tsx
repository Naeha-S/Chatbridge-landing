import React, { useState } from 'react';
import { DownloadIcon, ArrowRightIcon, CopyIcon, CheckIcon } from './Icons';
import ChromeCellsDark from './originkit/ui/chrome-cells-custom-style';
import ChromeCellsLight from './originkit/ui/chrome-cells-custom-style-2';

interface HeroProps {
  onOpenInstall: () => void;
  onScrollToDemo: () => void;
  onOpenPaper?: () => void;
  onOpenOnboarding?: () => void;
  onExploreEngineering?: () => void;
  isDarkMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenInstall,
  onScrollToDemo,
  onOpenOnboarding,
  onExploreEngineering,
  isDarkMode = true
}) => {
  const [activeTab, setActiveTab] = useState<'writing' | 'coding' | 'research'>('writing');
  const [copied, setCopied] = useState(false);

  const contextPresets = {
    writing: {
      originModel: 'ChatGPT',
      targetModel: 'Claude',
      label: 'Email & Blog Tone Polish',
      scenario: 'You drafted an email announcement in ChatGPT and want Claude to polish the tone.',
      payload: `[ChatBridge Context]
Project: Q3 Product Launch Email & Social Copy
Audience: Existing newsletter subscribers (friendly & punchy tone)
Key Points: Free tier launch, zero-setup Chrome extension, 1-click continuity
Next Step: Polish the opening hook and generate 3 compelling email subject lines.`,
      handoffTime: 'Transferred in 0.1s'
    },
    coding: {
      originModel: 'Claude',
      targetModel: 'ChatGPT',
      label: 'React Component & Tests',
      scenario: 'Claude generated a React component; now you want ChatGPT to add unit tests.',
      payload: `[ChatBridge Context]
Component: Interactive pricing tier card with monthly/annual toggle
Stack: Next.js 14, React 18, Tailwind CSS
Requirements: Add Vitest tests for discount calculation and accessible ARIA attributes.`,
      handoffTime: 'Transferred in 0.1s'
    },
    research: {
      originModel: 'Gemini',
      targetModel: 'Claude',
      label: 'Executive Summary Brief',
      scenario: 'Gemini synthesized web research; now you want Claude to draft the executive summary.',
      payload: `[ChatBridge Context]
Research Topic: B2C SaaS browser extension retention benchmarks
Key Findings: 38% higher retention when onboarding takes <60s; privacy-first positioning drives organic word of mouth.
Next Step: Create a 3-bullet takeaway slide for tomorrow's team sync.`,
      handoffTime: 'Transferred in 0.1s'
    }
  };

  const currentPreset = contextPresets[activeTab];

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(currentPreset.payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={`relative pt-16 pb-20 md:pt-24 md:pb-28 border-b transition-colors overflow-hidden ${
      isDarkMode
        ? 'border-[#222228] bg-[#040405] text-white'
        : 'border-[#E5E5EA] bg-[#FBFBFA] text-[#1D1D1F]'
    }`}>
      {/* Originkit Chrome Cells Living WebGL Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        <div className={`w-full h-full transition-opacity duration-700 ${
          isDarkMode ? 'opacity-70' : 'opacity-40'
        }`}>
          {isDarkMode ? (
            <ChromeCellsDark
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                minWidth: 0,
                minHeight: 0,
                display: 'block'
              }}
            />
          ) : (
            <ChromeCellsLight
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                minWidth: 0,
                minHeight: 0,
                display: 'block'
              }}
            />
          )}
        </div>

        {/* Ambient Top & Bottom Vignette Mask */}
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
          isDarkMode
            ? 'bg-radial from-transparent via-[#040405]/30 to-[#040405]/95'
            : 'bg-radial from-transparent via-white/30 to-[#FBFBFA]/95'
        }`} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Consumer Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border shadow-2xs backdrop-blur-xs transition-colors bg-[#0071E3]/10 border-[#0071E3]/30 text-[#0071E3]">
            <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
            <span>Free Chrome Extension for ChatGPT, Claude & Gemini</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] ${
            isDarkMode ? 'text-white' : 'text-[#1D1D1F]'
          }`}>
            Never repeat yourself to AI again.
          </h1>

          <p className={`text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto pt-1 ${
            isDarkMode ? 'text-[#A1A1A6]' : 'text-[#515154]'
          }`}>
            Switch between ChatGPT, Claude, and Gemini without starting from scratch. ChatBridge carries your active project context between tabs with one click — 100% private on your device.
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="hero-add-to-chrome-btn"
              onClick={onOpenInstall}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                isDarkMode
                  ? 'bg-white hover:bg-[#F2F2F7] text-[#0A0A0D]'
                  : 'bg-[#1D1D1F] hover:bg-[#333336] text-white'
              }`}
            >
              <DownloadIcon className="w-4 h-4 text-[#0071E3]" />
              <span>Add to Chrome — It's Free</span>
            </button>

            <button
              id="hero-see-demo-btn"
              onClick={onScrollToDemo}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full text-sm font-medium border transition-colors ${
                isDarkMode
                  ? 'text-white hover:bg-[#16161D] border-[#2A2A33] bg-[#0E0E12]/80 backdrop-blur-xs'
                  : 'text-[#1D1D1F] hover:bg-[#F5F5F7] border-[#E5E5EA] bg-white/80 backdrop-blur-xs'
              }`}
            >
              <span>Try 10-Second Demo</span>
              <ArrowRightIcon className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`} />
            </button>
          </div>

          {/* Customer Trust Badges */}
          <div className={`pt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs ${
            isDarkMode ? 'text-[#8E8E93]' : 'text-[#86868B]'
          }`}>
            <span className="flex items-center gap-1 text-[#FFB800]">
              {'★'.repeat(5)} <span className={`font-medium ${isDarkMode ? 'text-[#D1D1D6]' : 'text-[#515154]'}`}>4.9/5</span>
            </span>
            <span>•</span>
            <span>Takes 30 seconds to install</span>
            <span>•</span>
            <span>No account or signup needed</span>
            <span>•</span>
            <span>100% on your device</span>
          </div>

          {/* Supported AI Tools Ribbon */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className={`text-[11px] font-medium mr-1 ${isDarkMode ? 'text-[#6E6E75]' : 'text-[#86868B]'}`}>
              Works seamlessly on:
            </span>
            {['ChatGPT', 'Claude', 'Google Gemini', 'DeepSeek', 'Perplexity'].map((tool) => (
              <span
                key={tool}
                className={`px-2.5 py-1 rounded-full font-medium border transition-colors ${
                  isDarkMode
                    ? 'bg-[#14141A] border-[#282833] text-[#D1D1D6]'
                    : 'bg-white border-[#E5E5EA] text-[#515154] shadow-2xs'
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Product Visual Container: Interactive Live Preview (Positioned comfortably below landing hero fold) */}
        <div className="mt-20 md:mt-28 max-w-4xl mx-auto">
          <div className={`rounded-2xl border shadow-xl overflow-hidden backdrop-blur-md transition-colors ${
            isDarkMode
              ? 'bg-[#0E0E12]/95 border-[#282833]'
              : 'bg-white/95 border-[#E5E5EA]'
          }`}>
            {/* Window Chrome Header */}
            <div className={`px-4 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              isDarkMode
                ? 'border-[#22222C] bg-[#141419]'
                : 'border-[#E5E5EA] bg-[#F5F5F7]'
            }`}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                </div>
                <span className={`text-xs font-mono ml-2 ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>
                  Instant Cross-Tab AI Handoff
                </span>
              </div>

              {/* Scenario Toggle Tabs */}
              <div className={`flex items-center gap-1 p-0.5 rounded-lg text-xs font-medium border self-start sm:self-auto ${
                isDarkMode ? 'bg-[#1C1C24] border-[#2A2A35]' : 'bg-[#E5E5EA] border-[#D1D1D6]'
              }`} role="tablist">
                {(['writing', 'coding', 'research'] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md transition-all text-xs ${
                      activeTab === tab
                        ? isDarkMode
                          ? 'bg-[#2A2A35] text-white font-medium shadow-xs'
                          : 'bg-white text-[#1D1D1F] font-medium shadow-xs'
                        : isDarkMode
                        ? 'text-[#8E8E93] hover:text-white'
                        : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {tab === 'writing' ? 'Writing Polish' : tab === 'coding' ? 'Web App Dev' : 'Research Brief'}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Body */}
            <div className="p-5 sm:p-7 space-y-5">
              {/* Transfer banner */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border ${
                isDarkMode ? 'bg-[#15151C] border-[#282835]' : 'bg-[#F5F5F7] border-[#E5E5EA]'
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                    isDarkMode ? 'bg-[#22222E] text-white' : 'bg-white text-[#1D1D1F] shadow-2xs'
                  }`}>
                    {currentPreset.originModel}
                  </span>
                  <div className="flex items-center gap-1 text-[#0071E3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] animate-ping" />
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0071E3] text-white">
                    {currentPreset.targetModel}
                  </span>
                  <span className={`text-xs ml-1 font-medium ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>
                    {currentPreset.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-[#34C759]">
                  <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                  <span>{currentPreset.handoffTime}</span>
                </div>
              </div>

              {/* Injected Context Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isDarkMode ? 'text-[#E5E5EA]' : 'text-[#1D1D1F]'}`}>
                    Auto-Prepared Context for {currentPreset.targetModel}:
                  </span>
                  <button
                    onClick={handleCopyPayload}
                    className="inline-flex items-center gap-1 text-[#0071E3] hover:underline font-medium"
                  >
                    {copied ? (
                      <>
                        <CheckIcon className="w-3.5 h-3.5 text-[#34C759]" />
                        <span className="text-[#34C759]">Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-3.5 h-3.5" />
                        <span>Copy sample context</span>
                      </>
                    )}
                  </button>
                </div>

                <div className={`border rounded-xl p-4 font-mono text-xs whitespace-pre-wrap leading-relaxed ${
                  isDarkMode
                    ? 'bg-[#0A0A0E] border-[#22222B] text-[#D1D1D6]'
                    : 'bg-[#FBFBFA] border-[#E5E5EA] text-[#333336]'
                }`}>
                  {currentPreset.payload}
                </div>
              </div>

              {/* Target Prompt Box Preview */}
              <div className={`border rounded-xl p-3.5 transition-colors ${
                isDarkMode
                  ? 'border-[#2D2D3A] bg-[#121217]'
                  : 'border-[#D1D1D6] bg-white'
              }`}>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-inherit">
                  <span className={`font-medium ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>
                    Continue chatting in {currentPreset.targetModel}:
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#0071E3]/15 text-[#0071E3] font-medium">
                    Shortcut: ⌘ + Shift + K
                  </span>
                </div>
                <p className={`text-xs mt-2 font-normal ${isDarkMode ? 'text-[#A1A1A6]' : 'text-[#515154]'}`}>
                  Ready! Simply press Enter or continue typing. {currentPreset.targetModel} already knows your project guidelines.
                </p>
              </div>

              {/* Footer row inside demo card */}
              <div className={`pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t ${
                isDarkMode ? 'border-[#22222C] text-[#8E8E93]' : 'border-[#E5E5EA] text-[#86868B]'
              }`}>
                <span>Zero cloud servers • Everything stored locally in your browser storage</span>
                {onExploreEngineering && (
                  <button
                    onClick={onExploreEngineering}
                    className="text-[#0071E3] hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>Curious how it works? See technical details</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
