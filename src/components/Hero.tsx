import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadIcon, ArrowRightIcon, CheckIcon } from './Icons';
import { ChatBridgeLogo } from './Logo';
import ChromeCellsDark from './originkit/ui/chrome-cells-custom-style';
import ChromeCellsLight from './originkit/ui/chrome-cells-custom-style-2';
import { MOTION_VARIANTS } from '../theme';
import { CHROME_WEBSTORE_URL } from '../constants/links';
import {
  IconSparkles,
  IconShieldCheck,
  IconFileCode,
  IconSettings,
  IconCheck,
  IconBrandChrome
} from '@tabler/icons-react';

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
  isDarkMode = true
}) => {
  const [activeAgentTab, setActiveAgentTab] = useState<'all' | 'agent1' | 'agent2' | 'agent3'>('all');

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors overflow-hidden">
      {/* Originkit Chrome Cells Living WebGL Background (Preserved as requested) */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Hero Layout matching the redesigned mock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Typography & CTAs & Trust Metrics */}
          <motion.div
            variants={MOTION_VARIANTS.containerStagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Top Spacing Container - Preserved spacing for headline alignment */}
            <div className="h-6 flex items-center gap-2" aria-hidden="true" />

            {/* Main Headline */}
            <motion.h1
              variants={MOTION_VARIANTS.itemFadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white leading-[1.08] font-sans"
            >
              Bridge AI conversations.{' '}
              <span className="block bg-gradient-to-r from-[#0071E3] via-[#00A3FF] to-[#00F2FE] bg-clip-text text-transparent">
                Zero re-typing.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={MOTION_VARIANTS.itemFadeInUp}
              className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xl font-sans"
            >
              Carry active research context, code specs, files, and instructions between different AI chatbots — without copying walls of text.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={MOTION_VARIANTS.itemFadeInUp}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA: Glowing Pill */}
              <a
                id="hero-install-chrome-btn"
                href={CHROME_WEBSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onOpenInstall}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1D1D1F] hover:bg-black dark:bg-[#121824] dark:hover:bg-[#1A2234] border border-neutral-800 dark:border-[#00F2FE]/50 text-white font-semibold text-sm shadow-lg shadow-black/10 dark:shadow-[#00F2FE]/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-md group"
              >
                <div className="w-5 h-5 rounded-full bg-white dark:bg-black/60 flex items-center justify-center p-0.5">
                  <IconBrandChrome className="w-4 h-4 text-[#0071E3] dark:text-[#00F2FE]" />
                </div>
                <span>Add to Chrome (Free)</span>
                <ArrowRightIcon className="w-4 h-4 text-[#00A3FF] dark:text-[#00F2FE] group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Secondary CTA: Text link */}
              <button
                id="hero-try-demo-btn"
                onClick={onScrollToDemo}
                className="inline-flex items-center gap-2 px-4 py-3 text-neutral-800 dark:text-neutral-200 hover:text-[#0071E3] dark:hover:text-[#00F2FE] font-medium text-sm transition-colors cursor-pointer group"
              >
                <span>See it in action</span>
                <ArrowRightIcon className="w-4 h-4 text-neutral-500 group-hover:text-[#0071E3] dark:group-hover:text-[#00F2FE] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Trusted Early Adopters Micro Ribbon */}
            <motion.div
              variants={MOTION_VARIANTS.itemFadeInUp}
              className="pt-6 border-t border-neutral-200/80 dark:border-white/10 space-y-3"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 block font-semibold">
                TRUSTED BY EARLY ADOPTERS
              </span>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-[#1D1D1F] dark:text-white font-mono">3</span>
                  <span className="text-neutral-600 dark:text-neutral-400">AI models</span>
                </div>
                <div className="h-4 w-px bg-neutral-200 dark:bg-white/15" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-[#1D1D1F] dark:text-white font-mono">1</span>
                  <span className="text-neutral-600 dark:text-neutral-400">seamless flow</span>
                </div>
                <div className="h-4 w-px bg-neutral-200 dark:bg-white/15" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-[#0071E3] dark:text-[#00F2FE] font-mono">100%</span>
                  <span className="text-neutral-600 dark:text-neutral-400">on your device</span>
                </div>
                <div className="h-4 w-px bg-neutral-200 dark:bg-white/15 hidden sm:block" />
                <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 font-medium">
                  <IconShieldCheck className="w-4 h-4 text-[#0071E3] dark:text-[#00F2FE]" />
                  <span>No data leaves your device</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Agent Handoff Window Mockup */}
          <motion.div
            variants={MOTION_VARIANTS.cardScaleReveal}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 relative"
          >
            {/* Ambient Radial Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0071E3]/20 via-[#00F2FE]/20 to-[#7C3AED]/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

            {/* Window Container */}
            <div className="relative rounded-2xl border border-neutral-200/80 dark:border-white/15 shadow-2xl overflow-hidden bg-white/90 dark:bg-[#090D16]/90 backdrop-blur-2xl transition-colors text-neutral-900 dark:text-white">
              
              {/* Window Header */}
              <div className="px-4 py-3 border-b border-neutral-200/80 dark:border-white/10 bg-neutral-100/90 dark:bg-[#080B12]/90 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex items-center gap-2 ml-1">
                    <ChatBridgeLogo size={18} className="w-4.5 h-4.5" />
                    <span className="text-xs font-mono font-bold text-neutral-800 dark:text-white">
                      ChatBridge
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/25 text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
                    <span>Handoff Active</span>
                  </div>
                  <IconSettings className="w-3.5 h-3.5 text-neutral-400 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Window Body: Connected Agent Workflow Stream */}
              <div className="p-4 sm:p-6 space-y-4 relative">
                
                {/* Agent 1 Card */}
                <div className="relative z-10 flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-[#0F1420]/80 border border-neutral-200/80 dark:border-white/10 transition-all hover:border-[#00F2FE]/40">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center shrink-0 border border-blue-500/30">
                    <IconSparkles className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">Agent 1</span>
                      <span className="text-[10px] font-mono text-neutral-400">2:14 PM</span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                      Here's the project context and key requirements for the research analysis...
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#151C2C] border border-neutral-200/80 dark:border-white/10 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
                      <IconFileCode className="w-3.5 h-3.5 text-neutral-400" />
                      <span>research-context.md</span>
                      <span className="text-[9px] text-neutral-400">2.4 KB</span>
                    </div>
                  </div>

                  {/* Connected Handoff Complete Badge */}
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-[#00F2FE] border border-[#00F2FE]/30 text-[10px] font-mono shrink-0 self-center">
                    <IconCheck className="w-3 h-3 text-[#00F2FE]" />
                    <span>Handoff complete</span>
                  </div>
                </div>

                {/* Connecting Node Graphic */}
                <div className="flex justify-center -my-2 relative z-0">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-[#3B82F6] to-[#00F2FE] relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00F2FE] shadow-sm shadow-[#00F2FE]" />
                  </div>
                </div>

                {/* Agent 2 Card */}
                <div className="relative z-10 flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-[#0F1420]/80 border border-neutral-200/80 dark:border-white/10 transition-all hover:border-[#00F2FE]/40 ml-2 sm:ml-6">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-[#00F2FE] flex items-center justify-center shrink-0 border border-teal-500/30">
                    <div className="w-4 h-4 rounded-md border-2 border-current" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">Agent 2</span>
                      <span className="text-[10px] font-mono text-neutral-400">2:17 PM</span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                      Got it. I've analyzed the context and prepared the reasoning chain. Here are the key insights...
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#151C2C] border border-neutral-200/80 dark:border-white/10 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
                      <IconFileCode className="w-3.5 h-3.5 text-neutral-400" />
                      <span>analysis.md</span>
                      <span className="text-[9px] text-neutral-400">4.8 KB</span>
                    </div>
                  </div>
                </div>

                {/* Connecting Node Graphic 2 */}
                <div className="flex justify-center -my-2 relative z-0">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-[#00F2FE] to-[#7C3AED] relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#7C3AED] shadow-sm shadow-[#7C3AED]" />
                  </div>
                </div>

                {/* Agent 3 Card */}
                <div className="relative z-10 flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-[#0F1420]/80 border border-neutral-200/80 dark:border-white/10 transition-all hover:border-[#00F2FE]/40 ml-4 sm:ml-12">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-[#A855F7] flex items-center justify-center shrink-0 border border-purple-500/30">
                    <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">Agent 3</span>
                      <span className="text-[10px] font-mono text-neutral-400">2:20 PM</span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                      Based on Agent 2's analysis, here's the final summary with recommendations...
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#151C2C] border border-neutral-200/80 dark:border-white/10 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
                      <IconFileCode className="w-3.5 h-3.5 text-neutral-400" />
                      <span>final-summary.md</span>
                      <span className="text-[9px] text-neutral-400">3.1 KB</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
