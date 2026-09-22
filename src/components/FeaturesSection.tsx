import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrismFilmDark from './originkit/ui/prism-film-custom-style1';
import PrismFilmLight from './originkit/ui/prism-film-custom-style2';
import {
  ZapIcon,
  ShieldCheckIcon,
  CheckIcon,
  ArrowRightIcon,
  CpuIcon,
  CopyIcon,
  TerminalIcon
} from './Icons';
import { spacing, typography, MOTION_VARIANTS } from '../theme';
import { useToast } from '../context/ToastContext';

interface FeaturesSectionProps {
  isDarkMode?: boolean;
}

type BenefitCategory = 'all' | 'writers' | 'devs' | 'researchers';

interface BenefitCard {
  id: string;
  category: ('writers' | 'devs' | 'researchers')[];
  title: string;
  subtitle: string;
  whatItDoes: string;
  whyItMatters: string;
  statBadge?: string;
  icon: React.FC<{ className?: string }>;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isDarkMode = true }) => {
  const [activeCategory, setActiveCategory] = useState<BenefitCategory>('all');
  const [activePersonaTab, setActivePersonaTab] = useState<'writing' | 'coding' | 'research'>('writing');
  const [copiedShortcut, setCopiedShortcut] = useState(false);

  const personaContexts = {
    writing: {
      from: 'ChatGPT',
      to: 'Claude 3.7',
      label: 'Blog Post & Tone Polish',
      summary: 'Carried product value propositions, target audience (B2B SaaS founders), and preferred concise voice.',
      savedTime: 'Saved ~4 mins of re-prompting'
    },
    coding: {
      from: 'Claude 3.7',
      to: 'ChatGPT 4o',
      label: 'React Component to Unit Tests',
      summary: 'Carried TypeScript interfaces, component props, Tailwind classes, and Vitest test suite requirements.',
      savedTime: 'Saved ~6 mins of copy-pasting'
    },
    research: {
      from: 'Google Gemini',
      to: 'Claude 3.7',
      label: 'Web Findings to Executive Brief',
      summary: 'Carried market statistics, 5 key competitor takeaways, and executive 3-bullet summary format.',
      savedTime: 'Saved ~5 mins of manual synthesis'
    }
  };

  const { toast } = useToast();
  const currentPersona = personaContexts[activePersonaTab];

  const handleCopyShortcut = () => {
    navigator.clipboard.writeText('⌘ + Shift + K');
    setCopiedShortcut(true);
    toast.copied(
      'Shortcut "⌘ + Shift + K" copied!',
      'Press this in any AI assistant prompt box to summon your active context.'
    );
    setTimeout(() => setCopiedShortcut(false), 2000);
  };

  const benefitCards: BenefitCard[] = [
    {
      id: 'continuity',
      category: ['writers', 'devs', 'researchers'],
      title: 'One-Click Context Carry',
      subtitle: 'Never repeat your project background',
      whatItDoes: 'Instantly transfers your goals, tone guidelines, and active task constraints when you switch tabs between ChatGPT, Claude, and Gemini.',
      whyItMatters: 'Saves 5 to 10 minutes of manual copy-pasting every single time you switch tools. You pick up immediately mid-thought.',
      statBadge: 'Instant 0.1s handoff',
      icon: ZapIcon
    },
    {
      id: 'token-compression',
      category: ['writers', 'devs', 'researchers'],
      title: '95% Token & Cost Saver',
      subtitle: 'Distills only what your next AI needs',
      whatItDoes: 'Automatically strips out conversational noise, pleasantries, and old mistakes, condensing multi-turn chats into a high-density brief.',
      whyItMatters: 'Prevents the next AI model from hallucinating or hitting strict token limits. Keeps your chats fast, accurate, and cheap.',
      statBadge: '3,400 → 140 tokens (-95%)',
      icon: CpuIcon
    },
    {
      id: 'privacy',
      category: ['writers', 'devs', 'researchers'],
      title: '100% On-Device Privacy',
      subtitle: 'Your prompts never touch a central server',
      whatItDoes: 'Stores all captured context in your local browser SQLite/IndexedDB encrypted with AES-256-GCM. Zero cloud telemetry.',
      whyItMatters: 'Safe for proprietary codebases, confidential business emails, financial figures, and unreleased client research.',
      statBadge: 'Zero server storage',
      icon: ShieldCheckIcon
    },
    {
      id: 'smart-switching',
      category: ['devs', 'researchers'],
      title: 'Cross-Model Multi-Tooling',
      subtitle: 'Use the best AI for each specific subtask',
      whatItDoes: 'Brainstorm architectures in ChatGPT, implement complex algorithms in Claude 3.7 Sonnet, and verify live facts in Google Gemini.',
      whyItMatters: 'Lets you harness the unique strengths of every LLM without ever losing the big picture of what you are creating.',
      statBadge: 'Works on 6+ AI platforms',
      icon: TerminalIcon
    },
    {
      id: 'zero-copy-paste',
      category: ['writers', 'devs'],
      title: 'Universal Floating Hotkey',
      subtitle: 'Summon your project brief in 1 keystroke',
      whatItDoes: 'Press ⌘+Shift+K (or Ctrl+Shift+K) in any web prompt bar to paste your clean, formatted project brief automatically.',
      whyItMatters: 'Eliminates friction. No need to look through old browser tabs to remember what you wrote 20 minutes ago.',
      statBadge: '⌘+Shift+K instant shortcut',
      icon: CopyIcon
    },
    {
      id: 'latest-decisions',
      category: ['writers', 'devs', 'researchers'],
      title: 'Smart Revision Memory',
      subtitle: 'Always honors your latest decisions',
      whatItDoes: 'When you change your mind or refine a requirement, ChatBridge automatically updates the active brief so the target AI stays aligned.',
      whyItMatters: 'No more confusing the AI with outdated draft instructions from three turns ago. Only your freshest guidelines are passed along.',
      statBadge: 'Dynamic priority updates',
      icon: ZapIcon
    }
  ];

  const filteredCards = benefitCards.filter((card) => {
    if (activeCategory === 'all') return true;
    return card.category.includes(activeCategory);
  });

  return (
    <section id="features" className="py-20 md:py-28 border-b border-[#E5E5EA] dark:border-[#22222E] bg-[#FBFBFA] dark:bg-[#040405] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Section Header with Staggered Scroll Trigger */}
        <motion.div
          variants={MOTION_VARIANTS.containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-3xl space-y-4"
        >
          <motion.div variants={MOTION_VARIANTS.itemFadeInUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border bg-[#0071E3]/10 dark:bg-[#0071E3]/20 border-[#0071E3]/20 dark:border-[#0071E3]/40 text-[#0071E3] dark:text-[#2997FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span>Why Creators, Writers & Builders Choose ChatBridge</span>
            </div>
          </motion.div>

          <motion.h2
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]"
          >
            Built for how you actually use AI today.
          </motion.h2>

          <motion.p
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="text-base sm:text-lg text-[#515154] dark:text-[#A1A1A6] leading-relaxed"
          >
            You shouldn’t have to re-explain your background every time you open a new tab. ChatBridge creates an effortless, private memory layer between all your AI tools.
          </motion.p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium mr-1 text-[#6E6E73] dark:text-[#8E8E98]">
            Filter benefits for:
          </span>
          {[
            { id: 'all' as BenefitCategory, label: 'All Benefits' },
            { id: 'writers' as BenefitCategory, label: 'Writers & Creators' },
            { id: 'devs' as BenefitCategory, label: 'Developers & Engineers' },
            { id: 'researchers' as BenefitCategory, label: 'Researchers & Analysts' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#1D1D1F] dark:bg-[#0071E3] text-white shadow-sm font-semibold'
                  : 'bg-[#F0F0F2] dark:bg-[#14141E] hover:bg-[#E5E5EA] dark:hover:bg-[#1E1E2C] text-[#515154] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white border border-[#E5E5EA] dark:border-[#262638]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Benefit-Oriented Cards Grid with Variants & Scroll Trigger */}
        <motion.div
          variants={MOTION_VARIANTS.containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                variants={MOTION_VARIANTS.itemFadeInUp}
                key={card.id}
                className="rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:translate-y-[-2px] bg-white dark:bg-[#0D0D14] hover:bg-[#FAFAFC] dark:hover:bg-[#111119] border-[#E5E5EA] dark:border-[#22222E] hover:border-[#D1D1D6] dark:hover:border-[#333346] shadow-xs dark:shadow-lg dark:shadow-black/20"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0071E3]/10 dark:bg-[#0071E3]/20 text-[#0071E3] dark:text-[#2997FF] border border-[#0071E3]/20 dark:border-[#0071E3]/30">
                      <Icon className="w-5 h-5" />
                    </div>

                    {card.statBadge && (
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full border bg-[#34C759]/10 dark:bg-[#34C759]/20 border-[#34C759]/20 dark:border-[#34C759]/40 text-[#248A3D] dark:text-[#34C759]">
                        {card.statBadge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {card.title}
                    </h3>
                    <p className="text-xs mt-0.5 font-medium text-[#0071E3] dark:text-[#2997FF]">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* "What it does" block */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8E8E93] dark:text-[#787884]">
                      <span>What it does</span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#515154] dark:text-[#D1D1D6]">
                      {card.whatItDoes}
                    </p>
                  </div>

                  {/* "Why you need it" block */}
                  <div className="p-3 rounded-xl border space-y-1 bg-[#F5F5F7] dark:bg-[#14141E] border-[#E5E5EA] dark:border-[#242434]">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#34C759]">
                      <CheckIcon className="w-3.5 h-3.5" />
                      <span>Why it matters</span>
                    </div>
                    <p className="text-xs leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
                      {card.whyItMatters}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive Highlight: Live Cross-AI Scenario Preview with Prism Film */}
        <motion.div
          variants={MOTION_VARIANTS.cardScaleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative overflow-hidden rounded-3xl border p-6 sm:p-8 transition-colors bg-white/95 dark:bg-[#0D0D14]/95 border-[#E5E5EA] dark:border-[#242434] shadow-md dark:shadow-2xl"
        >
          {/* Subtle Ambient Prism Film WebGL Canvas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
            <div className={`w-full h-full transition-opacity duration-700 ${
              isDarkMode ? 'opacity-25' : 'opacity-20'
            }`}>
              {isDarkMode ? (
                <PrismFilmDark style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
              ) : (
                <PrismFilmLight style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
              )}
            </div>
            <div className="absolute inset-0 bg-radial-[circle_at_top_right,transparent_20%,rgba(255,255,255,0.85)_100%] dark:bg-radial-[circle_at_top_right,transparent_20%,rgba(13,13,20,0.85)_100%]" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5E5EA] dark:border-[#22222E]">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF]">
                  Real-World Daily Scenarios
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  See how context flows seamlessly across your workflow.
                </h3>
              </div>

              {/* Persona Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl border border-[#E5E5EA] dark:border-[#28283A] bg-[#F5F5F7] dark:bg-[#161622] self-start lg:self-auto">
                {(['writing', 'coding', 'research'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePersonaTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activePersonaTab === tab
                        ? 'bg-white dark:bg-[#252536] text-[#1D1D1F] dark:text-white shadow-xs'
                        : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
                    }`}
                  >
                    {tab === 'writing' ? 'Writing' : tab === 'coding' ? 'Coding' : 'Research'}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Details Box with Framer Motion AnimatePresence */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-[#F0F0F2] dark:bg-[#1A1A26] text-[#1D1D1F] dark:text-[#F5F5F7] border border-transparent dark:border-[#2C2C3E]">
                    {currentPersona.from}
                  </span>
                  <ArrowRightIcon className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                  <span className="px-2.5 py-1 rounded-md bg-[#0071E3] text-white">
                    {currentPersona.to}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {currentPersona.label}
                </h4>

                <p className="text-xs sm:text-sm leading-relaxed text-[#515154] dark:text-[#A1A1A6]">
                  {currentPersona.summary}
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#34C759]/10 dark:bg-[#34C759]/20 text-[#248A3D] dark:text-[#34C759] border border-[#34C759]/20 dark:border-[#34C759]/30">
                  <CheckIcon className="w-3.5 h-3.5" />
                  <span>{currentPersona.savedTime}</span>
                </div>
              </div>

              {/* Injected Context Box */}
              <div className="md:col-span-7 rounded-2xl border border-[#E5E5EA] dark:border-[#262638] bg-[#F5F5F7] dark:bg-[#060609] p-4 sm:p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E5EA] dark:border-[#22222E]">
                  <span className="font-semibold text-[#6E6E73] dark:text-[#8E8E98]">
                    Ready-to-Paste Brief for {currentPersona.to}:
                  </span>
                  <span className="text-[11px] text-[#0071E3] dark:text-[#2997FF] font-medium font-sans">
                    Auto-prepared by ChatBridge
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePersonaTab}
                    variants={MOTION_VARIANTS.tabContentFade}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-3 rounded-lg leading-relaxed whitespace-pre-wrap bg-white dark:bg-[#12121A] text-[#1D1D1F] dark:text-[#E5E5EA] border border-[#E5E5EA] dark:border-[#242434] shadow-2xs"
                  >
                    {activePersonaTab === 'writing' && (
                      `[Project Context: Product Launch Announcement]\n` +
                      `• Audience: Existing newsletter subscribers\n` +
                      `• Tone: Warm, direct, zero buzzwords\n` +
                      `• Core Value: Save 10+ mins switching between ChatGPT and Claude\n` +
                      `• Next Task: Polish draft hook and create 3 catchy subject lines`
                    )}
                    {activePersonaTab === 'coding' && (
                      `[Project Context: Pricing Cards Component]\n` +
                      `• Tech Stack: Next.js 14, Tailwind CSS, Lucide icons\n` +
                      `• Completed: Responsive card layout with annual discount badge\n` +
                      `• Next Task: Add Vitest test cases for discount calculation`
                    )}
                    {activePersonaTab === 'research' && (
                      `[Project Context: Market Retention Analysis]\n` +
                      `• Source Findings: 38% higher retention when setup takes <30s\n` +
                      `• Core Metric: 4.9/5 user satisfaction with on-device privacy\n` +
                      `• Next Task: Synthesize into 3 executive takeaways for board deck`
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[#86868B] dark:text-[#787884]">
                    Press ⌘+Shift+K to paste in {currentPersona.to}
                  </span>
                  <button
                    onClick={handleCopyShortcut}
                    className="text-[#0071E3] dark:text-[#2997FF] hover:underline font-medium inline-flex items-center gap-1 font-sans"
                  >
                    {copiedShortcut ? (
                      <>
                        <CheckIcon className="w-3 h-3 text-[#34C759]" />
                        <span className="text-[#34C759]">Copied shortcut</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-3 h-3" />
                        <span>Copy shortcut</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side-by-Side: The Old Frustrating Way vs The ChatBridge Way with Scroll Trigger */}
        <motion.div
          variants={MOTION_VARIANTS.containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-6 pt-4"
        >
          <motion.div variants={MOTION_VARIANTS.itemFadeInUp} className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              The difference in your daily workflow.
            </h3>
            <p className="text-sm text-[#515154] dark:text-[#A1A1A6]">
              Here is what changes the moment you install ChatBridge in your browser:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <motion.div
              variants={MOTION_VARIANTS.itemFadeInUp}
              className="p-6 sm:p-8 rounded-2xl border space-y-4 bg-[#F9F9FB] dark:bg-[#0D0D14] border-[#E5E5EA] dark:border-[#242434]"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5F56]">
                <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <span>Without ChatBridge (The Frustrating Way)</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#515154] dark:text-[#C7C7CC]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF5F56] font-bold">✕</span>
                  <span>Constantly re-typing your project goals and tone preferences every time you open a new AI tab.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF5F56] font-bold">✕</span>
                  <span>Pasting huge, messy chat logs that blow through token limits and confuse the AI.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF5F56] font-bold">✕</span>
                  <span>Losing your train of thought while manually copying and editing intermediate responses.</span>
                </li>
              </ul>
            </motion.div>

            {/* The ChatBridge Way */}
            <motion.div
              variants={MOTION_VARIANTS.itemFadeInUp}
              className="p-6 sm:p-8 rounded-2xl border space-y-4 bg-[#0071E3]/5 dark:bg-[#0071E3]/10 border-[#0071E3]/20 dark:border-[#0071E3]/30"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#34C759]">
                <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                <span>With ChatBridge (Instant Flow)</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#1D1D1F] dark:text-[#E5E5EA]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#34C759] font-bold">✓</span>
                  <span>One-click hotkey (⌘+Shift+K) automatically passes your latest decisions and requirements.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#34C759] font-bold">✓</span>
                  <span>95% condensed context saves tokens, avoids hallucinations, and speeds up replies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#34C759] font-bold">✓</span>
                  <span>100% on-device AES-256 encryption protects your private ideas and work.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
