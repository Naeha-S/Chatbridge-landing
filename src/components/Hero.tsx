import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadIcon, ArrowRightIcon, CopyIcon, CheckIcon } from './Icons';
import ChromeCellsDark from './originkit/ui/chrome-cells-custom-style';
import ChromeCellsLight from './originkit/ui/chrome-cells-custom-style-2';
import { MOTION_VARIANTS } from '../theme';
import { useToast } from '../context/ToastContext';

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

  const { toast } = useToast();
  const currentPreset = contextPresets[activeTab];

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(currentPreset.payload);
    setCopied(true);
    toast.copied(
      `Context for ${currentPreset.targetModel} copied!`,
      `Ready to paste directly into ${currentPreset.targetModel} with ⌘+Shift+K.`
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#E5E5EA] dark:border-[#22222E] bg-[#FBFBFA] dark:bg-[#040405] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors overflow-hidden">
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
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Consumer Header with Staggered Framer Motion Entrance */}
        <motion.div
          variants={MOTION_VARIANTS.containerStagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <motion.h1
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-tight"
          >
            Never repeat yourself to AI again.
          </motion.h1>

          <motion.p
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="text-base sm:text-lg md:text-xl text-[#515154] dark:text-[#A1A1A6] max-w-2xl mx-auto pt-1 leading-relaxed"
          >
            Switch between ChatGPT, Claude, and Gemini without starting from scratch. ChatBridge carries your active project context between tabs with one click — 100% private on your device.
          </motion.p>

          {/* Action Row */}
          <motion.div
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              id="hero-add-to-chrome-btn"
              onClick={onOpenInstall}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0D] hover:bg-[#333336] dark:hover:bg-[#F2F2F7]"
            >
              <DownloadIcon className="w-4 h-4 text-[#0071E3] dark:text-[#0071E3]" />
              <span>Add to Chrome — It's Free</span>
            </button>

            <button
              id="hero-see-demo-btn"
              onClick={onScrollToDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full text-sm font-medium border transition-colors text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1E1E2C] border-[#D1D1D6] dark:border-[#333346] bg-white/80 dark:bg-[#14141E]/80 backdrop-blur-xs"
            >
              <span>Try 10-Second Demo</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#8E8E98]" />
            </button>
          </motion.div>

          {/* Customer Trust Badges */}
          <motion.div
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="pt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#6E6E73] dark:text-[#8E8E98]"
          >
            <span className="flex items-center gap-1 text-[#FFB800]">
              {'★'.repeat(5)} <span className="font-medium text-[#333336] dark:text-[#D1D1D6]">4.9/5</span>
            </span>
            <span>•</span>
            <span>Takes 30 seconds to install</span>
            <span>•</span>
            <span>No account or signup needed</span>
            <span>•</span>
            <span>100% on your device</span>
          </motion.div>

          {/* Supported AI Tools Ribbon */}
          <motion.div
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs"
          >
            <span className="text-[11px] font-medium mr-1 text-[#6E6E73] dark:text-[#8E8E98]">
              Works seamlessly on:
            </span>
            {['ChatGPT', 'Claude', 'Google Gemini', 'DeepSeek', 'Perplexity'].map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-full font-medium border transition-colors bg-white dark:bg-[#14141E] border-[#E5E5EA] dark:border-[#262638] text-[#515154] dark:text-[#D1D1D6] shadow-2xs"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Product Visual Container: Scroll-Triggered Entrance with Scale Reveal */}
        <motion.div
          variants={MOTION_VARIANTS.cardScaleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-20 md:mt-28 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border shadow-xl overflow-hidden backdrop-blur-md transition-colors bg-white/95 dark:bg-[#0D0D14]/95 border-[#E5E5EA] dark:border-[#28283A]">
            {/* Window Chrome Header */}
            <div className="px-4 py-3 border-b border-[#E5E5EA] dark:border-[#22222E] bg-[#F5F5F7] dark:bg-[#14141E] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                </div>
                <span className="text-xs font-mono ml-2 text-[#6E6E73] dark:text-[#8E8E98]">
                  Instant Cross-Tab AI Handoff
                </span>
              </div>

              {/* Scenario Toggle Tabs */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg text-xs font-medium border border-[#E5E5EA] dark:border-[#2A2A3C] bg-[#EBEBED] dark:bg-[#1C1C28] self-start sm:self-auto" role="tablist">
                {(['writing', 'coding', 'research'] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md transition-all text-xs ${
                      activeTab === tab
                        ? 'bg-white dark:bg-[#2A2A3E] text-[#1D1D1F] dark:text-white font-medium shadow-xs'
                        : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
                    }`}
                  >
                    {tab === 'writing' ? 'Writing Polish' : tab === 'coding' ? 'Web App Dev' : 'Research Brief'}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Body with AnimatePresence */}
            <div className="p-5 sm:p-7 space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={MOTION_VARIANTS.tabContentFade}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  {/* Transfer banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border bg-[#F5F5F7] dark:bg-[#14141E] border-[#E5E5EA] dark:border-[#262638]">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white dark:bg-[#222232] text-[#1D1D1F] dark:text-white shadow-2xs border border-[#E5E5EA] dark:border-[#2C2C3E]">
                        {currentPreset.originModel}
                      </span>
                      <div className="flex items-center gap-1 text-[#0071E3] dark:text-[#2997FF]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] dark:bg-[#2997FF] animate-ping" />
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0071E3] text-white">
                        {currentPreset.targetModel}
                      </span>
                      <span className="text-xs ml-1 font-medium text-[#515154] dark:text-[#A1A1A6]">
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
                      <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                        Auto-Prepared Context for {currentPreset.targetModel}:
                      </span>
                      <button
                        onClick={handleCopyPayload}
                        className="inline-flex items-center gap-1 text-[#0071E3] dark:text-[#2997FF] hover:underline font-medium"
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

                    <div className="border border-[#E5E5EA] dark:border-[#242434] rounded-xl p-4 font-mono text-xs whitespace-pre-wrap leading-relaxed bg-[#FBFBFA] dark:bg-[#060609] text-[#1D1D1F] dark:text-[#E5E5EA]">
                      {currentPreset.payload}
                    </div>
                  </div>

                  {/* Target Prompt Box Preview */}
                  <div className="border border-[#D1D1D6] dark:border-[#2A2A3C] rounded-xl p-3.5 transition-colors bg-white dark:bg-[#12121A]">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E5E5EA] dark:border-[#22222E]">
                      <span className="font-medium text-[#515154] dark:text-[#A1A1A6]">
                        Continue chatting in {currentPreset.targetModel}:
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#0071E3]/15 text-[#0071E3] dark:text-[#2997FF] font-medium">
                        Shortcut: ⌘ + Shift + K
                      </span>
                    </div>
                    <p className="text-xs mt-2 font-normal text-[#6E6E73] dark:text-[#C7C7CC]">
                      Ready! Simply press Enter or continue typing. {currentPreset.targetModel} already knows your project guidelines.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Footer row inside demo card */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-[#E5E5EA] dark:border-[#22222E] text-[#6E6E73] dark:text-[#8E8E98]">
                <span>Zero cloud servers • Everything stored locally in your browser storage</span>
                {onExploreEngineering && (
                  <button
                    onClick={onExploreEngineering}
                    className="text-[#0071E3] dark:text-[#2997FF] hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>Curious how it works? See technical details</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
