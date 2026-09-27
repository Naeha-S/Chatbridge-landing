import React, { useRef, useState, useEffect } from 'react';
import {
  DownloadIcon,
  CheckIcon,
  SparklesIcon,
  TerminalIcon,
  LockIcon
} from './Icons';
import {
  IconChevronLeft,
  IconChevronRight,
  IconArrowRight,
  IconWorld
} from '@tabler/icons-react';
import { CHROME_WEBSTORE_URL } from '../constants/links';

interface SupportedPlatformsPageProps {
  onOpenInstall: () => void;
  onNavigateHome: () => void;
}

export const SupportedPlatformsPage: React.FC<SupportedPlatformsPageProps> = ({
  onOpenInstall,
  onNavigateHome
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const platforms = [
    {
      name: 'OpenAI ChatGPT',
      url: 'chatgpt.com',
      badge: 'Tier 1 Supported',
      color: '#10A37F',
      models: ['GPT-4o', 'GPT-4o-mini', 'o1', 'o3-mini', 'Custom GPTs'],
      capabilities: [
        'Real-time streaming observation',
        'Multi-turn code diff extraction',
        'Markdown and LaTeX table normalization',
        'Compatible with ChatGPT Plus & Free tiers'
      ],
      domResilience: 'Universal message-author-role tags and mutation listeners ensure continuity across UI redesigns.'
    },
    {
      name: 'Anthropic Claude',
      url: 'claude.ai',
      badge: 'Tier 1 Supported',
      color: '#D97706',
      models: ['Claude 3.5 Sonnet', 'Claude 3.5 Haiku', 'Claude 3 Opus'],
      capabilities: [
        'Artifacts code block preservation',
        'Claude Projects context injection',
        'Complex reasoning preservation',
        'Prompt pill integration in Claude input box'
      ],
      domResilience: 'Monitors prose containers and dynamic streaming tokens without interfering with React virtual DOM.'
    },
    {
      name: 'Google Gemini',
      url: 'gemini.google.com',
      badge: 'Tier 1 Supported',
      color: '#2997FF',
      models: ['Gemini 2.0 Flash', 'Gemini Advanced', 'Gemini 1.5 Pro'],
      capabilities: [
        '1M+ token context window expansion',
        'Google Workspace & Docs grounding handoff',
        'Multimodal diagram context bridging',
        'Zero Google Account credentials required'
      ],
      domResilience: 'Resilient web component parsing across Gemini Angular/Material DOM elements.'
    },
    {
      name: 'DeepSeek Chat',
      url: 'chat.deepseek.com',
      badge: 'New in v0.4',
      color: '#4E6BF2',
      models: ['DeepSeek-V3', 'DeepSeek-R1 (Reasoning)'],
      capabilities: [
        'Captures hidden reasoning chains & thought blocks',
        'Math & algorithmic proof normalization',
        'Ultra-fast context transfer to Western LLMs'
      ],
      domResilience: 'Custom observation handles DeepSeek’s markdown renderer and collapsible thought accordions.'
    },
    {
      name: 'Perplexity AI',
      url: 'perplexity.ai',
      badge: 'Verified',
      color: '#20B2AA',
      models: ['Sonar Small', 'Sonar Large', 'Pro Search'],
      capabilities: [
        'Extracts research summaries and citation anchors',
        'Bridges web findings into development models (Claude/GPT-4o)',
        'Synthesizes live search into concise project pills'
      ],
      domResilience: 'Standard web reader handles Perplexity source cards and answer text blocks.'
    }
  ];

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    const cardWidth = 360;
    const idx = Math.min(platforms.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
    setActiveIndex(idx);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const cardWidth = 380;
    carouselRef.current.scrollBy({
      left: dir === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  };

  const handleOpenPlatformFeedback = (platformName: string) => {
    window.dispatchEvent(
      new CustomEvent('chatbridge:open-feedback', {
        detail: { category: 'platform', platform: platformName }
      })
    );
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#1D1D1F] dark:text-[#F5F5F7]">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono text-[#86868B] flex items-center space-x-2">
        <button onClick={onNavigateHome} className="hover:text-[#2997FF] transition-colors">
          ChatBridge
        </button>
        <span>/</span>
        <span className="text-[#1D1D1F] dark:text-[#E5E5EA]">Ecosystem</span>
        <span>/</span>
        <span className="text-[#30D158] font-medium">Supported Platforms</span>
      </nav>

      {/* Hero Header */}
      <header className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/25 text-xs font-mono mb-6">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Universal Cross-Model Compatibility</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-5">
          Supported AI Platforms &{' '}
          <span className="bg-gradient-to-r from-[#30D158] via-[#2997FF] to-[#AF52DE] bg-clip-text text-transparent">
            Model Ecosystem
          </span>
        </h1>

        <p className="text-lg text-[#86868B] leading-relaxed mb-8">
          ChatBridge works natively in your existing browser tabs across ChatGPT, Claude, Gemini, DeepSeek, and Perplexity.
          No API keys, no monthly token subscriptions, and no vendor lock-in.
        </p>

        <a
          href={CHROME_WEBSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenInstall}
          className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <DownloadIcon className="w-4 h-4 mr-2 text-[#0071E3] dark:text-[#0071E3]" />
          <span>Add to Chrome (Free)</span>
        </a>
      </header>

      {/* Platform Horizontal Carousel Dock */}
      <section className="mb-20 space-y-4">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
              <IconWorld className="w-5 h-5 text-[#0071E3] dark:text-[#2997FF]" />
              <span>Verified Web Interface Carousel</span>
            </h2>
            <p className="text-xs text-neutral-500">
              Compact horizontal dock. Use arrows or swipe sideways to inspect model support.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400">
              {activeIndex + 1} / {platforms.length}
            </span>
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141420] text-neutral-700 dark:text-neutral-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <IconChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141420] text-neutral-700 dark:text-neutral-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <IconChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-2 px-1 scroll-smooth scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {platforms.map((platform, idx) => (
            <div
              key={idx}
              className="w-[340px] sm:w-[380px] shrink-0 snap-start flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#0D0D14] border border-[#E5E5EA] dark:border-[#222230] shadow-sm hover:border-[#2997FF]/50 transition-all duration-200 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: platform.color }}
              />

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 pt-1">
                  <div className="flex items-center space-x-2.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: platform.color }}
                    />
                    <div>
                      <h3 className="text-lg font-bold">{platform.name}</h3>
                      <span className="text-xs font-mono text-[#86868B] block">
                        {platform.url}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#2997FF]/10 text-[#2997FF] border border-[#2997FF]/20 shrink-0">
                    {platform.badge}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {platform.models.map((model, mIdx) => (
                    <span
                      key={mIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#F2F2F7] dark:bg-[#181824] text-[#1D1D1F] dark:text-[#E5E5EA] border border-[#E5E5EA] dark:border-[#2A2A3C]"
                    >
                      {model}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E5E5EA] dark:border-[#1E1E2A] text-xs">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#86868B] mb-1.5">
                      Specialized Capabilities
                    </h4>
                    <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
                      {platform.capabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-start">
                          <CheckIcon className="w-3.5 h-3.5 text-[#30D158] mr-1.5 shrink-0 mt-0.5" />
                          <span className="leading-snug">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#86868B] mb-1">
                      DOM Resilience Safeguard
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-[11px]">
                      {platform.domResilience}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Production Ready</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenPlatformFeedback(platform.name)}
                  className="text-[#0071E3] dark:text-[#2997FF] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Report Edge Case</span>
                  <IconArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Suggest More Platforms Card */}
          <div className="w-[320px] shrink-0 snap-start flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200/50 dark:from-[#131320] dark:to-[#0D0D18] border border-neutral-300 dark:border-neutral-800 text-xs">
            <div className="space-y-3">
              <span className="text-2xl">⚡</span>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Request an Unlisted Model
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Need support for Mistral, Qwen, Ollama web UI, or custom enterprise LLM portals? Submit a platform request to our roadmap.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenPlatformFeedback('Custom AI Platform')}
              className="mt-6 w-full py-2.5 rounded-full bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs text-center transition-colors shadow-2xs"
            >
              Submit Platform Request
            </button>
          </div>
        </div>
      </section>

      {/* Safety & Compliance Section */}
      <section className="mb-20 rounded-2xl bg-[#F8F9FA] dark:bg-[#0A0A0F] border border-[#E5E5EA] dark:border-[#1E1E28] p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Zero Risk of Account Bans or Restrictions
        </h2>
        <p className="text-sm text-[#86868B] text-center max-w-2xl mx-auto mb-8">
          Unlike automated bot scrapers that simulate automated queries or reverse-engineer private endpoints,
          ChatBridge operates strictly as a local passive observer within your authorized user session.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <LockIcon className="w-5 h-5 text-[#2997FF] mb-3" />
            <h3 className="font-semibold text-base mb-1">Standard DOM Reads</h3>
            <p className="text-xs sm:text-sm text-[#86868B]">
              Only reads completed conversational turns presented in your browser DOM, identically to how a screen reader operates.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <TerminalIcon className="w-5 h-5 text-[#30D158] mb-3" />
            <h3 className="font-semibold text-base mb-1">Zero Outbound Traffic</h3>
            <p className="text-xs sm:text-sm text-[#86868B]">
              No network requests are ever dispatched to external servers or third-party APIs.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <SparklesIcon className="w-5 h-5 text-[#AF52DE] mb-3" />
            <h3 className="font-semibold text-base mb-1">Manifest V3 Isolated</h3>
            <p className="text-xs sm:text-sm text-[#86868B]">
              Strictly sandboxed under Google Chrome's Manifest V3 security model with minimal host permissions.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#30D158]/10 via-[#1C1C26] to-[#0A0A0F] border border-[#30D158]/20">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          Unify Your AI Workflow Across Every Model
        </h2>
        <p className="text-sm text-[#86868B] max-w-xl mx-auto mb-6">
          Install ChatBridge and seamlessly switch between ChatGPT, Claude, and Gemini with full context portability.
        </p>
        <a
          href={CHROME_WEBSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenInstall}
          className="inline-flex items-center px-6 py-3 rounded-full bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold shadow-lg transition-transform hover:scale-105"
        >
          <DownloadIcon className="w-4 h-4 mr-2 text-[#0071E3] dark:text-[#0071E3]" />
          <span>Install ChatBridge for Chrome</span>
        </a>
      </footer>
    </article>
  );
};
