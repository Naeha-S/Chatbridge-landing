import React from 'react';
import {
  DownloadIcon,
  CheckIcon,
  SparklesIcon,
  TerminalIcon,
  LockIcon
} from './Icons';
import { CHROME_WEBSTORE_URL } from '../constants/links';

interface SupportedPlatformsPageProps {
  onOpenInstall: () => void;
  onNavigateHome: () => void;
}

export const SupportedPlatformsPage: React.FC<SupportedPlatformsPageProps> = ({
  onOpenInstall,
  onNavigateHome
}) => {
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
          className="inline-flex items-center px-6 py-3.5 rounded-xl bg-[#2997FF] hover:bg-[#1E76D2] text-white font-medium shadow-lg shadow-[#2997FF]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          <span>Add to Chrome (Free)</span>
        </a>
      </header>

      {/* Platform Cards Grid */}
      <section className="mb-20 space-y-6">
        {platforms.map((platform, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D0D14] border border-[#E5E5EA] dark:border-[#222230] shadow-sm hover:border-[#2997FF]/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: platform.color }}
                />
                <h2 className="text-xl font-semibold">{platform.name}</h2>
                <span className="text-xs font-mono text-[#86868B] bg-[#F2F2F7] dark:bg-[#1C1C26] px-2.5 py-1 rounded-md">
                  {platform.url}
                </span>
              </div>
              <span className="self-start sm:self-auto text-xs font-mono px-3 py-1 rounded-full bg-[#2997FF]/10 text-[#2997FF] border border-[#2997FF]/20">
                {platform.badge}
              </span>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {platform.models.map((model, mIdx) => (
                <span
                  key={mIdx}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#F2F2F7] dark:bg-[#181824] text-[#1D1D1F] dark:text-[#E5E5EA] border border-[#E5E5EA] dark:border-[#2A2A3C]"
                >
                  {model}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#E5E5EA] dark:border-[#1E1E2A]">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#86868B] mb-2">
                  Specialized Capabilities
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#86868B]">
                  {platform.capabilities.map((cap, cIdx) => (
                    <li key={cIdx} className="flex items-center">
                      <CheckIcon className="w-3.5 h-3.5 text-[#30D158] mr-2 shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#86868B] mb-2">
                  DOM Resilience Safeguard
                </h3>
                <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                  {platform.domResilience}
                </p>
              </div>
            </div>
          </div>
        ))}
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
          className="inline-flex items-center px-6 py-3 rounded-xl bg-[#2997FF] hover:bg-[#1E76D2] text-white font-medium shadow-lg transition-transform hover:scale-105"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          <span>Install ChatBridge for Chrome</span>
        </a>
      </footer>
    </article>
  );
};
