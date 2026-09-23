import React, { useState } from 'react';
import {
  DownloadIcon,
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
  TerminalIcon,
  SparklesIcon,
  SearchIcon
} from './Icons';
import { HowItWorks } from './HowItWorks';
import { CHROME_WEBSTORE_URL } from '../constants/links';

interface HowItWorksPageProps {
  onOpenInstall: () => void;
  onNavigateHome: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onOpenInstall,
  onNavigateHome
}) => {
  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#1D1D1F] dark:text-[#F5F5F7]">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono text-[#86868B] flex items-center space-x-2">
        <button onClick={onNavigateHome} className="hover:text-[#2997FF] transition-colors">
          ChatBridge
        </button>
        <span>/</span>
        <span className="text-[#1D1D1F] dark:text-[#E5E5EA]">Architecture</span>
        <span>/</span>
        <span className="text-[#2997FF] font-medium">How It Works</span>
      </nav>

      {/* Hero Header */}
      <header className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2997FF]/10 text-[#2997FF] border border-[#2997FF]/25 text-xs font-mono mb-6">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Local-First End-to-End Pipeline</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-5">
          How ChatBridge Works:{' '}
          <span className="bg-gradient-to-r from-[#2997FF] via-[#5AC8FA] to-[#30D158] bg-clip-text text-transparent">
            Under the Hood
          </span>
        </h1>

        <p className="text-lg text-[#86868B] leading-relaxed mb-8">
          A zero-knowledge, client-side architecture that captures, encrypts with AES-256-GCM, and fuses
          conversational turns into high-relevance prompt context across your AI tabs in under 30 milliseconds.
        </p>

        <a
          href={CHROME_WEBSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenInstall}
          className="inline-flex items-center px-6 py-3.5 rounded-xl bg-[#2997FF] hover:bg-[#1E76D2] text-white font-medium shadow-lg shadow-[#2997FF]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          <span>Install ChatBridge Free</span>
        </a>
      </header>

      {/* 5-Stage Interactive Pipeline */}
      <div className="mb-20">
        <HowItWorks />
      </div>

      {/* Architecture Deep Dive */}
      <section className="mb-20 rounded-2xl bg-[#F8F9FA] dark:bg-[#0A0A0F] border border-[#E5E5EA] dark:border-[#1E1E28] p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          The 3 Pillars of ChatBridge Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <div className="w-10 h-10 rounded-lg bg-[#2997FF]/10 text-[#2997FF] flex items-center justify-center mb-4">
              <SearchIcon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2">Hybrid RRF Retrieval</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Standard vector databases struggle with exact identifiers (variable names, git hashes, package versions).
              ChatBridge pairs BM25 sparse lexical search with dense embeddings for 76.8% Recall@5.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <div className="w-10 h-10 rounded-lg bg-[#30D158]/10 text-[#30D158] flex items-center justify-center mb-4">
              <LockIcon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2">WebCrypto AES-256-GCM</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Conversations written to chrome.storage.local are encrypted with a 256-bit key generated directly in your
              Chromium sandbox. Data is unreadable to other extensions and third-party scripts.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#14141C] border border-[#E5E5EA] dark:border-[#222230]">
            <div className="w-10 h-10 rounded-lg bg-[#AF52DE]/10 text-[#AF52DE] flex items-center justify-center mb-4">
              <TerminalIcon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2">Prompt Token Compression</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Instead of dumping 8,000 raw transcript tokens, ChatBridge synthesizes technical parameters into compact
              pills, saving up to 95% of destination model prompt tokens.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#2997FF]/10 via-[#1C1C26] to-[#0A0A0F] border border-[#2997FF]/20">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          Experience local-first AI memory for yourself
        </h2>
        <p className="text-sm text-[#86868B] max-w-xl mx-auto mb-6">
          Install the free Chrome extension and bridge your conversational context seamlessly.
        </p>
        <a
          href={CHROME_WEBSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenInstall}
          className="inline-flex items-center px-6 py-3 rounded-xl bg-[#2997FF] hover:bg-[#1E76D2] text-white font-medium shadow-lg transition-transform hover:scale-105"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          <span>Add to Chrome — Free</span>
        </a>
      </footer>
    </article>
  );
};
