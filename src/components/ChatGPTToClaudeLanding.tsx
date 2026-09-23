import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DownloadIcon,
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  SparklesIcon,
  SearchIcon,
  LockIcon,
  TerminalIcon
} from './Icons';
import { CHROME_WEBSTORE_URL } from '../constants/links';

interface ChatGPTToClaudeLandingProps {
  onOpenInstall: () => void;
  onNavigateHome: () => void;
}

export const ChatGPTToClaudeLanding: React.FC<ChatGPTToClaudeLandingProps> = ({
  onOpenInstall,
  onNavigateHome
}) => {
  const [selectedExample, setSelectedExample] = useState<'architecture' | 'debugging' | 'writing'>('architecture');
  const [copiedPill, setCopiedPill] = useState(false);

  const examples = {
    architecture: {
      title: 'Full-Stack Auth & DB Architecture',
      chatgptSource: `We decided on PostgreSQL with Drizzle ORM, multi-tenant schemas with tenant_id, and JWT session rotation stored in HttpOnly cookies with 15-minute expiration.`,
      claudePrompt: `Build the Next.js API route middleware enforcing this tenant separation and session refresh flow.`,
      compressedTokens: '48 tokens (was 820 tokens in raw chat)',
      savings: '94% token reduction'
    },
    debugging: {
      title: 'Distributed Race Condition & Deadlock',
      chatgptSource: `Root cause identified in redis distributed lock TTL expiring before batch transaction commits in worker #4. Fix plan: extend lease renewal with Redlock algorithm.`,
      claudePrompt: `Refactor our Node.js worker lock acquisition loop with automatic heartbeat renewal.`,
      compressedTokens: '36 tokens (was 640 tokens in raw chat)',
      savings: '95% token reduction'
    },
    writing: {
      title: 'Technical Whitepaper Spec & Tone',
      chatgptSource: `Target audience: Enterprise CISOs. Core thesis: zero-trust perimeter without latency degradation. Tone: authoritative, empirical, avoiding market hype.`,
      claudePrompt: `Draft the executive summary section adhering to these parameters.`,
      compressedTokens: '28 tokens (was 490 tokens in raw chat)',
      savings: '94% token reduction'
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(examples[selectedExample].chatgptSource);
    setCopiedPill(true);
    setTimeout(() => setCopiedPill(false), 2000);
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#1D1D1F] dark:text-[#F5F5F7]">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono text-[#86868B] flex items-center space-x-2">
        <button onClick={onNavigateHome} className="hover:text-[#2997FF] transition-colors">
          ChatBridge
        </button>
        <span>/</span>
        <span className="text-[#1D1D1F] dark:text-[#E5E5EA]">Solutions</span>
        <span>/</span>
        <span className="text-[#2997FF] font-medium">ChatGPT to Claude</span>
      </nav>

      {/* Hero Header */}
      <header className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2997FF]/10 text-[#2997FF] border border-[#2997FF]/25 text-xs font-mono mb-6">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Cross-Model Continuity for Developers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-5">
          Transfer ChatGPT Conversations to Claude{' '}
          <span className="bg-gradient-to-r from-[#2997FF] via-[#5AC8FA] to-[#AF52DE] bg-clip-text text-transparent">
            Without Losing Context
          </span>
        </h1>

        <p className="text-lg text-[#86868B] leading-relaxed mb-8">
          Stop manually re-typing background decisions, architecture diagrams, and constraints. ChatBridge
          seamlessly bridges your active ChatGPT brainstorms directly into Anthropic Claude with zero cloud storage
          and 95% token savings.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={CHROME_WEBSTORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onOpenInstall}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#2997FF] hover:bg-[#1E76D2] text-white font-medium shadow-lg shadow-[#2997FF]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            <span>Add to Chrome — Free Extension</span>
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('step-by-step');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white dark:bg-[#1C1C24] hover:bg-[#F2F2F7] dark:hover:bg-[#252532] border border-[#D1D1D6] dark:border-[#2C2C3E] text-sm font-medium transition-colors"
          >
            <span>View Step-by-Step Guide</span>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
      </header>

      {/* Interactive Simulation: ChatGPT to Claude Handover */}
      <section className="mb-20 rounded-2xl bg-white dark:bg-[#0D0D12] border border-[#D1D1D6] dark:border-[#262634] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E5E5EA] dark:border-[#1E1E2A]">
          <div>
            <h2 className="text-xl font-semibold mb-1">Interactive Handover Simulator</h2>
            <p className="text-sm text-[#86868B]">
              Experience how past ChatGPT turns are converted into clean, contextual pills inside Claude.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(['architecture', 'debugging', 'writing'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedExample(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors capitalize ${
                  selectedExample === key
                    ? 'bg-[#2997FF] text-white font-medium'
                    : 'bg-[#F2F2F7] dark:bg-[#1C1C24] text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* ChatGPT Source Side */}
          <div className="rounded-xl bg-[#F8F9FA] dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#20202E] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#10A37F]/10 text-[#10A37F] border border-[#10A37F]/20 text-xs font-mono">
                  Origin: ChatGPT (chatgpt.com)
                </span>
                <span className="text-xs text-[#86868B]">Source Conversation</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">{examples[selectedExample].title}</h3>
              <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed font-mono bg-white dark:bg-[#0A0A0F] p-3.5 rounded-lg border border-[#E5E5EA] dark:border-[#1E1E28]">
                "{examples[selectedExample].chatgptSource}"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E5EA] dark:border-[#1E1E28] flex items-center justify-between text-xs text-[#86868B]">
              <span>Captured by DOM Observer</span>
              <span className="text-[#30D158] flex items-center">
                <CheckIcon className="w-3.5 h-3.5 mr-1" /> Encrypted locally
              </span>
            </div>
          </div>

          {/* Claude Destination Side */}
          <div className="rounded-xl bg-[#F8F9FA] dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#20202E] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 text-xs font-mono">
                  Destination: Claude (claude.ai)
                </span>
                <span className="text-xs font-mono text-[#30D158]">
                  {examples[selectedExample].savings}
                </span>
              </div>
              <h3 className="font-semibold text-sm mb-2">Claude Prompt Input (with ChatBridge context)</h3>
              <div className="space-y-2 bg-white dark:bg-[#0A0A0F] p-3.5 rounded-lg border border-[#E5E5EA] dark:border-[#1E1E28]">
                {/* Context Pill */}
                <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-[#2997FF]/15 text-[#2997FF] border border-[#2997FF]/30 text-xs font-mono">
                  <TerminalIcon className="w-3 h-3" />
                  <span>[Context: {examples[selectedExample].title}]</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1D1D1F] dark:text-[#E5E5EA]">
                  {examples[selectedExample].claudePrompt}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E5EA] dark:border-[#1E1E28] flex items-center justify-between text-xs text-[#86868B]">
              <span className="text-xs font-mono text-[#86868B]">
                Payload: {examples[selectedExample].compressedTokens}
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center text-xs text-[#2997FF] hover:underline"
              >
                <CopyIcon className="w-3.5 h-3.5 mr-1" />
                {copiedPill ? 'Copied' : 'Copy Sample'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide Section */}
      <section id="step-by-step" className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            How to Transfer Context from ChatGPT to Claude in 4 Steps
          </h2>
          <p className="text-sm text-[#86868B]">
            Follow this simple, repeatable workflow to transfer any chat session without copying huge blocks of text.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              step: '01',
              title: 'Brainstorm or Architect in ChatGPT',
              desc: 'Use ChatGPT (chatgpt.com) to flesh out system designs, draft prompts, or explore algorithms. ChatBridge listens in the background and encrypts finished turns with AES-256-GCM.'
            },
            {
              step: '02',
              title: 'Switch Over to Claude',
              desc: 'Open claude.ai in an adjacent tab. There is no need to switch browser profiles, copy JSON exports, or log into a secondary cloud service.'
            },
            {
              step: '03',
              title: 'Hit Cmd+Shift+K to Summon Context',
              desc: 'Press the keyboard shortcut (Cmd+Shift+K on Mac, Ctrl+Shift+K on Windows). The ChatBridge overlay performs an instant 15ms hybrid RRF search across your recent turns.'
            },
            {
              step: '04',
              title: 'Inject Context Pill & Execute',
              desc: 'Click on the relevant turns to inject a compressed context summary directly into Claude’s prompt area. Ask Claude to generate code, write tests, or expand schemas immediately.'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-white dark:bg-[#12121A] border border-[#E5E5EA] dark:border-[#222230] relative group hover:border-[#2997FF]/50 transition-colors"
            >
              <span className="text-3xl font-mono font-bold text-[#2997FF]/30 group-hover:text-[#2997FF] transition-colors mb-2 block">
                {item.step}
              </span>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[#86868B] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Transfer to Claude? Comparison Points */}
      <section className="mb-20 rounded-2xl bg-[#F8F9FA] dark:bg-[#0A0A0F] border border-[#E5E5EA] dark:border-[#1E1E28] p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Why Engineers Move Active Conversations to Claude
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <div className="w-10 h-10 rounded-lg bg-[#2997FF]/10 text-[#2997FF] flex items-center justify-center mb-4">
              <TerminalIcon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2">Claude Artifacts Rendering</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Design a component or diagram in ChatGPT, then immediately hand off the requirements to Claude 3.5
              Sonnet to render interactive React and SVG Artifacts side-by-side.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <div className="w-10 h-10 rounded-lg bg-[#30D158]/10 text-[#30D158] flex items-center justify-center mb-4">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2">Superior Long-Form Code</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Claude 3.5 Sonnet excels at multi-file refactoring and nuanced edge-case handling without the "lazy code"
              omissions often experienced in long ChatGPT sessions.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <div className="w-10 h-10 rounded-lg bg-[#AF52DE]/10 text-[#AF52DE] flex items-center justify-center mb-4">
              <LockIcon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2">100% Privacy Preserved</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Unlike cloud-based "prompt aggregators", ChatBridge never uploads your proprietary API keys, internal
              schemas, or proprietary source code to a remote database.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              q: 'Does transferring from ChatGPT to Claude require API keys?',
              a: 'No. ChatBridge operates completely in the browser via content scripts on chatgpt.com and claude.ai. You do not need to generate or pay for OpenAI or Anthropic API tokens.'
            },
            {
              q: 'Can I transfer code snippets and markdown tables?',
              a: 'Yes. ChatBridge normalizes code blocks, syntax tags, and markdown tables so that Claude interprets the code and formatting with 100% structural fidelity.'
            },
            {
              q: 'How does ChatBridge compress tokens before sending to Claude?',
              a: 'ChatBridge identifies boilerplate conversational filler ("Sure! I would be happy to help...") and extracts only core technical assertions, parameters, and code diffs, achieving up to 95% token savings.'
            },
            {
              q: 'Will my chat data be used to train AI models?',
              a: 'ChatBridge does not collect, store, or train on any data. All transcripts are stored locally in your browser’s chrome.storage.local encrypted with AES-256-GCM.'
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]"
            >
              <h3 className="font-semibold text-base mb-2 text-[#1D1D1F] dark:text-[#F5F5F7]">{faq.q}</h3>
              <p className="text-sm text-[#86868B] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#2997FF]/10 via-[#1C1C26] to-[#0A0A0F] border border-[#2997FF]/20">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          Ready to bridge your ChatGPT conversations to Claude?
        </h2>
        <p className="text-sm text-[#86868B] max-w-xl mx-auto mb-6">
          Install the free Chrome extension today. No sign-up, no credit card, and zero tracking.
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
