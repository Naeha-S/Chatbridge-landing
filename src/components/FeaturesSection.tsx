import React, { useState } from 'react';
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

  const currentPersona = personaContexts[activePersonaTab];

  const handleCopyShortcut = () => {
    navigator.clipboard.writeText('⌘ + Shift + K');
    setCopiedShortcut(true);
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
      subtitle: 'Your conversations never leave your laptop',
      whatItDoes: 'Encrypts all memory locally with AES-256-GCM directly inside your browser storage. Zero third-party databases or cloud logs.',
      whyItMatters: 'Your confidential client drafts, proprietary code, business plans, and personal ideas stay strictly on your device.',
      statBadge: 'Zero cloud servers',
      icon: ShieldCheckIcon
    },
    {
      id: 'hotkey',
      category: ['writers', 'devs'],
      title: 'Universal ⌘+Shift+K Hotkey',
      subtitle: 'Keep your fingers on the keyboard',
      whatItDoes: 'Press one simple keyboard combination in any AI prompt box to summon your active project brief right where your cursor is.',
      whyItMatters: 'Zero menu searching or tab flipping. Works silently in the background until the exact moment you need it.',
      statBadge: 'Keyboard native',
      icon: TerminalIcon
    },
    {
      id: 'compatibility',
      category: ['writers', 'devs', 'researchers'],
      title: 'Works with Every Major AI',
      subtitle: 'Use the best model for every task',
      whatItDoes: 'Native support for ChatGPT, Claude, Google Gemini, DeepSeek, and Perplexity right out of the box with zero configuration.',
      whyItMatters: 'Brainstorm in Gemini, write in Claude, and code in ChatGPT. You get the freedom to use whichever model is best today.',
      statBadge: '5+ AI assistants supported',
      icon: CheckIcon
    },
    {
      id: 'conflict-resolution',
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
    <section id="features" className={`py-20 md:py-28 border-b transition-colors ${
      isDarkMode ? 'bg-[#060608] border-[#1F1F26] text-white' : 'bg-[#FBFBFA] border-[#E5E5EA] text-[#1D1D1F]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
            isDarkMode
              ? 'bg-[#0071E3]/15 border-[#0071E3]/30 text-[#2997FF]'
              : 'bg-[#0071E3]/10 border-[#0071E3]/20 text-[#0071E3]'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span>Why Creators, Writers & Builders Choose ChatBridge</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12] ${
            isDarkMode ? 'text-white' : 'text-[#1D1D1F]'
          }`}>
            Built for how you actually use AI today.
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            isDarkMode ? 'text-[#A1A1A6]' : 'text-[#515154]'
          }`}>
            You shouldn’t have to re-explain your background every time you open a new tab. ChatBridge creates an effortless, private memory layer between all your AI tools.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs font-medium mr-1 ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>
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
                  ? isDarkMode
                    ? 'bg-white text-[#0A0A0D] shadow-sm font-semibold'
                    : 'bg-[#1D1D1F] text-white shadow-sm font-semibold'
                  : isDarkMode
                    ? 'bg-[#121218] hover:bg-[#1A1A22] text-[#8E8E93] hover:text-white border border-[#22222C]'
                    : 'bg-[#F0F0F2] hover:bg-[#E5E5EA] text-[#515154] hover:text-[#1D1D1F] border border-[#E5E5EA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Benefit-Oriented Cards Grid (The "What" and "Why") */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:translate-y-[-2px] ${
                  isDarkMode
                    ? 'bg-[#0D0D12] hover:bg-[#111117] border-[#1F1F28] hover:border-[#2C2C38] shadow-lg shadow-black/20'
                    : 'bg-white hover:bg-[#FAFAFC] border-[#E5E5EA] hover:border-[#D1D1D6] shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDarkMode
                        ? 'bg-[#1A1A24] text-[#2997FF] border border-[#282836]'
                        : 'bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {card.statBadge && (
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                        isDarkMode
                          ? 'bg-[#14141C] border-[#22222E] text-[#34C759]'
                          : 'bg-[#34C759]/10 border-[#34C759]/20 text-[#248A3D]'
                      }`}>
                        {card.statBadge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className={`text-lg font-semibold tracking-tight ${
                      isDarkMode ? 'text-white' : 'text-[#1D1D1F]'
                    }`}>
                      {card.title}
                    </h3>
                    <p className={`text-xs mt-0.5 font-medium ${
                      isDarkMode ? 'text-[#2997FF]' : 'text-[#0071E3]'
                    }`}>
                      {card.subtitle}
                    </p>
                  </div>

                  {/* "What it does" block */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
                      <span>What it does</span>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDarkMode ? 'text-[#D1D1D6]' : 'text-[#424245]'
                    }`}>
                      {card.whatItDoes}
                    </p>
                  </div>

                  {/* "Why you need it" block */}
                  <div className={`p-3 rounded-xl border space-y-1 ${
                    isDarkMode
                      ? 'bg-[#121218] border-[#1D1D26]'
                      : 'bg-[#F5F5F7] border-[#E5E5EA]'
                  }`}>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#34C759]">
                      <CheckIcon className="w-3.5 h-3.5" />
                      <span>Why it matters</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${
                      isDarkMode ? 'text-[#A1A1A6]' : 'text-[#515154]'
                    }`}>
                      {card.whyItMatters}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Highlight: Live Cross-AI Scenario Preview with Prism Film */}
        <div className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 transition-colors ${
          isDarkMode
            ? 'bg-[#0E0E14]/90 border-[#22222C] shadow-2xl'
            : 'bg-white/90 border-[#E5E5EA] shadow-lg'
        }`}>
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
            <div className={`absolute inset-0 ${
              isDarkMode
                ? 'bg-radial-[circle_at_top_right,transparent_20%,rgba(14,14,20,0.85)_100%]'
                : 'bg-radial-[circle_at_top_right,transparent_20%,rgba(255,255,255,0.85)_100%]'
            }`} />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-inherit">
            <div className="space-y-1">
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-[#2997FF]' : 'text-[#0071E3]'
              }`}>
                Real-World Daily Scenarios
              </span>
              <h3 className={`text-xl sm:text-2xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-[#1D1D1F]'
              }`}>
                See how context flows seamlessly across your workflow.
              </h3>
            </div>

            {/* Persona Switcher Tabs */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border self-start lg:self-auto ${
              isDarkMode ? 'bg-[#15151E] border-[#252532]' : 'bg-[#EBEBED] border-[#D1D1D6]'
            }`}>
              {(['writing', 'coding', 'research'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePersonaTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activePersonaTab === tab
                      ? isDarkMode
                        ? 'bg-[#252533] text-white shadow-xs'
                        : 'bg-white text-[#1D1D1F] shadow-xs'
                      : isDarkMode
                        ? 'text-[#8E8E93] hover:text-white'
                        : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {tab === 'writing' ? 'Writing' : tab === 'coding' ? 'Coding' : 'Research'}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Details Box */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className={`px-2.5 py-1 rounded-md ${
                  isDarkMode ? 'bg-[#1B1B26] text-white' : 'bg-[#F0F0F2] text-[#1D1D1F]'
                }`}>
                  {currentPersona.from}
                </span>
                <ArrowRightIcon className="w-4 h-4 text-[#0071E3]" />
                <span className="px-2.5 py-1 rounded-md bg-[#0071E3] text-white">
                  {currentPersona.to}
                </span>
              </div>

              <h4 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-[#1D1D1F]'}`}>
                {currentPersona.label}
              </h4>

              <p className={`text-xs sm:text-sm leading-relaxed ${
                isDarkMode ? 'text-[#A1A1A6]' : 'text-[#515154]'
              }`}>
                {currentPersona.summary}
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#34C759]/10 text-[#34C759]">
                <CheckIcon className="w-3.5 h-3.5" />
                <span>{currentPersona.savedTime}</span>
              </div>
            </div>

            {/* Injected Context Box */}
            <div className={`md:col-span-7 rounded-xl border p-4 sm:p-5 space-y-3 font-mono text-xs ${
              isDarkMode ? 'bg-[#060609] border-[#1D1D28]' : 'bg-[#F5F5F7] border-[#E5E5EA]'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-inherit">
                <span className={`font-semibold ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>
                  Ready-to-Paste Brief for {currentPersona.to}:
                </span>
                <span className="text-[11px] text-[#0071E3] font-medium">
                  Auto-prepared by ChatBridge
                </span>
              </div>

              <div className={`p-3 rounded-lg leading-relaxed whitespace-pre-wrap ${
                isDarkMode ? 'bg-[#0D0D12] text-[#D1D1D6]' : 'bg-white text-[#333336] shadow-2xs'
              }`}>
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
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className={isDarkMode ? 'text-[#6E6E75]' : 'text-[#86868B]'}>
                  Press ⌘+Shift+K to paste in {currentPersona.to}
                </span>
                <button
                  onClick={handleCopyShortcut}
                  className="text-[#0071E3] hover:underline font-medium inline-flex items-center gap-1"
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
        </div>

        {/* Side-by-Side: The Old Frustrating Way vs The ChatBridge Way */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className={`text-2xl sm:text-3xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-[#1D1D1F]'
            }`}>
              The difference in your daily workflow.
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-[#A1A1A6]' : 'text-[#515154]'}`}>
              Here is what changes the moment you install ChatBridge in your browser:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className={`p-6 sm:p-8 rounded-2xl border space-y-4 ${
              isDarkMode ? 'bg-[#0E0E12] border-[#22222B]' : 'bg-[#F9F9FB] border-[#E5E5EA]'
            }`}>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5F56]">
                <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <span>Without ChatBridge (The Frustrating Way)</span>
              </div>
              <ul className={`space-y-3 text-xs sm:text-sm leading-relaxed ${
                isDarkMode ? 'text-[#A1A1A6]' : 'text-[#515154]'
              }`}>
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
            </div>

            {/* The ChatBridge Way */}
            <div className={`p-6 sm:p-8 rounded-2xl border space-y-4 ${
              isDarkMode ? 'bg-[#0071E3]/10 border-[#0071E3]/30' : 'bg-[#0071E3]/5 border-[#0071E3]/20'
            }`}>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#34C759]">
                <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                <span>With ChatBridge (Instant Flow)</span>
              </div>
              <ul className={`space-y-3 text-xs sm:text-sm leading-relaxed ${
                isDarkMode ? 'text-[#E5E5EA]' : 'text-[#1D1D1F]'
              }`}>
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
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
