import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadIcon, ArrowRightIcon, CopyIcon, CheckIcon } from './Icons';
import { ChatBridgeLogo } from './Logo';
import ChromeCellsDark from './originkit/ui/chrome-cells-custom-style';
import ChromeCellsLight from './originkit/ui/chrome-cells-custom-style-2';
import { MOTION_VARIANTS } from '../theme';
import { useToast } from '../context/ToastContext';
import { CHROME_WEBSTORE_URL } from '../constants/links';

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
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors overflow-hidden">
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Hero Staggered Typography Group */}
        <motion.div
          variants={MOTION_VARIANTS.containerStagger}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          {/* Subtle Privacy Badge */}
          <motion.div variants={MOTION_VARIANTS.itemFadeInUp}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md border border-neutral-200/80 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] dark:bg-[#2997FF] animate-pulse" />
              <span>Client-Side Extension • Zero Cloud Telemetry</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1D1D1F] dark:text-white leading-[1.08]"
          >
            Bridge AI conversations.{' '}
            <span className="bg-gradient-to-r from-[#0071E3] via-[#2997FF] to-[#30D158] bg-clip-text text-transparent">
              Zero re-typing.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto font-sans"
          >
            Carry active research context, code specs, and reasoning chains between ChatGPT, Claude 3.7, and Google Gemini in one keystroke without copying walls of text.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              id="hero-install-chrome-btn"
              href={CHROME_WEBSTORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onOpenInstall}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1D1D1F] hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <DownloadIcon className="w-4 h-4 text-[#0071E3] dark:text-[#0071E3]" />
              <span>Add to Chrome (Free)</span>
            </a>

            <button
              id="hero-try-demo-btn"
              onClick={onScrollToDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/80 dark:bg-black/50 hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-300 dark:border-white/15 text-[#1D1D1F] dark:text-neutral-200 font-medium text-sm transition-all backdrop-blur-md cursor-pointer"
            >
              <span>See Interactive Demo</span>
              <ArrowRightIcon className="w-4 h-4 text-neutral-500" />
            </button>
          </motion.div>

          {/* Value Props Micro-Ribbon */}
          <motion.div
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="pt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono"
          >
            <span>Free & Open Source</span>
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
            <span className="text-[11px] font-medium mr-1 text-neutral-500 dark:text-neutral-400">
              Works seamlessly on:
            </span>
            {['ChatGPT', 'Claude', 'Google Gemini', 'DeepSeek', 'Perplexity'].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-full font-medium border transition-colors bg-white/80 dark:bg-[#14141E] border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-neutral-300 shadow-2xs"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Product Visual Container: Instant Cross-Tab AI Handoff Liquid Glass Card */}
        <motion.div
          variants={MOTION_VARIANTS.cardScaleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-16 md:mt-24 max-w-4xl mx-auto relative group"
        >
          {/* Ambient Radial Background Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#0071E3]/20 via-[#2997FF]/20 to-[#30D158]/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />

          <div className="relative rounded-3xl border border-neutral-200/80 dark:border-white/15 shadow-2xl overflow-hidden backdrop-blur-2xl transition-colors bg-white/80 dark:bg-black/70">
            {/* Window Chrome Header */}
            <div className="px-5 py-3.5 border-b border-neutral-200/80 dark:border-white/10 bg-white/90 dark:bg-black/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-2 ml-1">
                  <ChatBridgeLogo size={18} className="w-4.5 h-4.5" />
                  <span className="text-xs font-mono font-semibold text-[#1D1D1F] dark:text-white">
                    Instant Cross-Tab AI Handoff
                  </span>
                </div>
              </div>

              {/* Scenario Toggle Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl text-xs font-medium border border-neutral-200/80 dark:border-white/10 bg-neutral-100/80 dark:bg-[#1A1A24] self-start sm:self-auto" role="tablist">
                {(['writing', 'coding', 'research'] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg transition-all text-xs cursor-pointer ${
                      activeTab === tab
                        ? 'bg-white dark:bg-[#2A2A3E] text-[#0071E3] dark:text-[#2997FF] font-bold shadow-xs border border-neutral-200/60 dark:border-white/10'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {tab === 'writing' ? 'Writing Polish' : tab === 'coding' ? 'Web App Dev' : 'Research Brief'}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Body with AnimatePresence */}
            <div className="p-6 sm:p-8 space-y-5">
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border bg-neutral-50 dark:bg-[#12121C] border-neutral-200/80 dark:border-white/10">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white dark:bg-[#222232] text-neutral-900 dark:text-white shadow-2xs border border-neutral-200/80 dark:border-white/10">
                        {currentPreset.originModel}
                      </span>
                      <div className="flex items-center gap-1 text-[#0071E3] dark:text-[#2997FF]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] dark:bg-[#2997FF] animate-ping" />
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#0071E3] text-white shadow-2xs">
                        {currentPreset.targetModel}
                      </span>
                      <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 ml-1">
                        {currentPreset.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{currentPreset.handoffTime}</span>
                    </div>
                  </div>

                  {/* Injected Context Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1D1D1F] dark:text-white">
                        Auto-Prepared Context for {currentPreset.targetModel}:
                      </span>
                      <button
                        onClick={handleCopyPayload}
                        className="inline-flex items-center gap-1.5 text-[#0071E3] dark:text-[#2997FF] hover:underline font-semibold cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500">Copied to clipboard</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="w-3.5 h-3.5" />
                            <span>Copy sample context</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="border border-neutral-200/80 dark:border-white/10 rounded-2xl p-4 font-mono text-xs whitespace-pre-wrap leading-relaxed bg-neutral-50/90 dark:bg-[#06060A] text-neutral-800 dark:text-neutral-200 shadow-inner">
                      {currentPreset.payload}
                    </div>
                  </div>

                  {/* Target Prompt Box Preview */}
                  <div className="border border-neutral-200/80 dark:border-white/10 rounded-2xl p-4 transition-colors bg-white dark:bg-[#12121A]">
                    <div className="flex items-center justify-between text-xs pb-2.5 border-b border-neutral-200/80 dark:border-white/10">
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                        Continue chatting in {currentPreset.targetModel}:
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#0071E3]/10 text-[#0071E3] dark:text-[#2997FF] border border-[#0071E3]/20 font-semibold">
                        Shortcut: ⌘ + Shift + K
                      </span>
                    </div>
                    <p className="text-xs mt-2.5 font-normal text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Ready! Simply press Enter or continue typing. {currentPreset.targetModel} already knows your project guidelines.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Footer row inside demo card */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-neutral-200/80 dark:border-white/10 text-neutral-500 dark:text-neutral-400 font-mono">
                <span>Zero cloud servers • Everything stored locally in your browser storage</span>
                {onExploreEngineering && (
                  <button
                    onClick={onExploreEngineering}
                    className="text-[#0071E3] dark:text-[#2997FF] hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
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
