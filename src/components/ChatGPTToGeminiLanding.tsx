import React, { useState } from 'react';
import {
  DownloadIcon,
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  SparklesIcon,
  TerminalIcon,
  LockIcon
} from './Icons';
import { CHROME_WEBSTORE_URL } from '../constants/links';

interface ChatGPTToGeminiLandingProps {
  onOpenInstall: () => void;
  onNavigateHome: () => void;
}

export const ChatGPTToGeminiLanding: React.FC<ChatGPTToGeminiLandingProps> = ({
  onOpenInstall,
  onNavigateHome
}) => {
  const [copied, setCopied] = useState(false);

  const sampleTransfer = {
    source: `Synthesized analysis of 2025 market requirements: Focus on local-first compliance (GDPR/HIPAA), AES-256-GCM browser storage, and zero cloud lock-in for enterprise clients.`,
    prompt: `Analyze these strategic constraints against our 40-page technical RFP document (attached) and generate an enterprise compliance matrix.`,
    tokens: '42 tokens injected (from 710 raw tokens)'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleTransfer.source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <span className="text-[#5AC8FA] font-medium">ChatGPT to Gemini</span>
      </nav>

      {/* Hero Header */}
      <header className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#5AC8FA]/10 text-[#5AC8FA] border border-[#5AC8FA]/25 text-xs font-mono mb-6">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Million-Token Context Expansion</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-5">
          Move ChatGPT Conversations to{' '}
          <span className="bg-gradient-to-r from-[#5AC8FA] via-[#2997FF] to-[#30D158] bg-clip-text text-transparent">
            Google Gemini 2.0
          </span>
        </h1>

        <p className="text-lg text-[#86868B] leading-relaxed mb-8">
          Unlock Google Gemini's 1M+ token context window and multimodal research capabilities. Transfer your active
          ChatGPT thoughts, code setups, and guidelines in one keystroke without copying walls of text.
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
            <span>Install Extension — 100% Free</span>
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('gemini-how-to');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white dark:bg-[#1C1C24] hover:bg-[#F2F2F7] dark:hover:bg-[#252532] border border-[#D1D1D6] dark:border-[#2C2C3E] text-sm font-medium transition-colors"
          >
            <span>Learn How It Works</span>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
      </header>

      {/* Live Side-by-Side Visualizer */}
      <section className="mb-20 rounded-2xl bg-white dark:bg-[#0D0D12] border border-[#D1D1D6] dark:border-[#262634] p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl font-semibold mb-2">Instant Cross-Model Continuity</h2>
        <p className="text-sm text-[#86868B] mb-6">
          See how ChatBridge extracts key constraints from ChatGPT and feeds them directly into Gemini 2.0 Flash.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl bg-[#F8F9FA] dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#20202E] p-5 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#10A37F]/10 text-[#10A37F] border border-[#10A37F]/20 text-xs font-mono mb-3">
                ChatGPT Source (chatgpt.com)
              </span>
              <p className="text-xs sm:text-sm text-[#86868B] font-mono bg-white dark:bg-[#0A0A0F] p-3.5 rounded-lg border border-[#E5E5EA] dark:border-[#1E1E28]">
                "{sampleTransfer.source}"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E5EA] dark:border-[#1E1E28] flex items-center justify-between text-xs text-[#86868B]">
              <span>AES-256 Encrypted in Browser</span>
              <span className="text-[#30D158] flex items-center">
                <CheckIcon className="w-3.5 h-3.5 mr-1" /> Indexed in 15ms
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-[#F8F9FA] dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#20202E] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#5AC8FA]/10 text-[#5AC8FA] border border-[#5AC8FA]/20 text-xs font-mono">
                  Gemini Destination (gemini.google.com)
                </span>
                <span className="text-xs font-mono text-[#30D158]">94% Token Reduction</span>
              </div>
              <div className="space-y-2 bg-white dark:bg-[#0A0A0F] p-3.5 rounded-lg border border-[#E5E5EA] dark:border-[#1E1E28]">
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-[#2997FF]/15 text-[#2997FF] text-xs font-mono">
                  <TerminalIcon className="w-3 h-3" />
                  <span>[Context: Security Constraints]</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1D1D1F] dark:text-[#E5E5EA]">
                  {sampleTransfer.prompt}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E5EA] dark:border-[#1E1E28] flex items-center justify-between text-xs text-[#86868B]">
              <span>Payload: {sampleTransfer.tokens}</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center text-xs text-[#2997FF] hover:underline"
              >
                <CopyIcon className="w-3.5 h-3.5 mr-1" />
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section id="gemini-how-to" className="mb-20">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">
          How to Move Your Chat from ChatGPT to Gemini
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#12121A] border border-[#E5E5EA] dark:border-[#222230]">
            <span className="text-2xl font-mono font-bold text-[#5AC8FA] mb-2 block">Step 1</span>
            <h3 className="text-lg font-semibold mb-2">Converse in ChatGPT</h3>
            <p className="text-sm text-[#86868B] leading-relaxed">
              Formulate your plan, debate strategies, and generate initial mockups in ChatGPT. ChatBridge automatically
              encrypts and indexes key conversational turns.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#12121A] border border-[#E5E5EA] dark:border-[#222230]">
            <span className="text-2xl font-mono font-bold text-[#5AC8FA] mb-2 block">Step 2</span>
            <h3 className="text-lg font-semibold mb-2">Switch to Gemini</h3>
            <p className="text-sm text-[#86868B] leading-relaxed">
              Open gemini.google.com in a new tab. No account link or remote OAuth token is required.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#12121A] border border-[#E5E5EA] dark:border-[#222230]">
            <span className="text-2xl font-mono font-bold text-[#5AC8FA] mb-2 block">Step 3</span>
            <h3 className="text-lg font-semibold mb-2">Cmd+Shift+K & Inject</h3>
            <p className="text-sm text-[#86868B] leading-relaxed">
              Press Cmd+Shift+K to view top matches. Click to inject compressed context pills and run complex deep-dive
              prompts instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Why Combine ChatGPT and Gemini? */}
      <section className="mb-20 rounded-2xl bg-[#F8F9FA] dark:bg-[#0A0A0F] border border-[#E5E5EA] dark:border-[#1E1E28] p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Why Combine ChatGPT & Google Gemini?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <h3 className="font-semibold text-base mb-2 text-[#5AC8FA]">Massive Multi-Document Context</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              ChatGPT is great for rapid brainstorming, but Gemini handles 1M+ token uploads of PDFs, codebases, and video.
              ChatBridge connects the two smoothly.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <h3 className="font-semibold text-base mb-2 text-[#30D158]">Google Search Grounding</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Take hypotheses formed with ChatGPT and verify real-time citations and current market statistics using Gemini’s
              deep Google Search grounding.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#5AC8FA]/10 via-[#1C1C26] to-[#0A0A0F] border border-[#5AC8FA]/20">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          Get Started with ChatBridge for Free
        </h2>
        <p className="text-sm text-[#86868B] max-w-xl mx-auto mb-6">
          Bridge your conversations across ChatGPT, Claude, and Gemini with on-device hardware encryption.
        </p>
        <a
          href={CHROME_WEBSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenInstall}
          className="inline-flex items-center px-6 py-3 rounded-xl bg-[#2997FF] hover:bg-[#1E76D2] text-white font-medium shadow-lg transition-transform hover:scale-105"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          <span>Add to Chrome — It's Free</span>
        </a>
      </footer>
    </article>
  );
};
