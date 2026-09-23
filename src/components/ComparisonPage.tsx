import React, { useState } from 'react';
import {
  DownloadIcon,
  CheckIcon,
  CloseIcon,
  ArrowRightIcon,
  SparklesIcon,
  LockIcon,
  TerminalIcon
} from './Icons';
import { CHROME_WEBSTORE_URL } from '../constants/links';

interface ComparisonPageProps {
  onOpenInstall: () => void;
  onNavigateHome: () => void;
}

export const ComparisonPage: React.FC<ComparisonPageProps> = ({
  onOpenInstall,
  onNavigateHome
}) => {
  const [chatsPerDay, setChatsPerDay] = useState(15);
  const avgTokensPerChat = 2400;
  const tokenPricePerMillion = 3.0; // Claude 3.5 Sonnet / GPT-4o input rate
  const compressedTokens = 120; // 95% compression

  const monthlyTokensSaved = chatsPerDay * (avgTokensPerChat - compressedTokens) * 30;
  const monthlyDollarsSaved = ((monthlyTokensSaved / 1_000_000) * tokenPricePerMillion).toFixed(2);

  const comparisonRows = [
    {
      feature: 'Data Privacy & Location',
      chatbridge: '100% On-Device (chrome.storage.local)',
      cloudAggregators: 'Uploaded to 3rd-party Cloud Server',
      manualCopy: 'Local Clipboard (unencrypted)'
    },
    {
      feature: 'Cryptographic Protection',
      chatbridge: 'Hardware-backed AES-256-GCM',
      cloudAggregators: 'Server-side key / TLS only',
      manualCopy: 'None'
    },
    {
      feature: 'Remote Telemetry & Logs',
      chatbridge: 'Zero (No servers, no analytics)',
      cloudAggregators: 'High (User tracking, request logs)',
      manualCopy: 'None'
    },
    {
      feature: 'Search & Retrieval Algorithm',
      chatbridge: 'Hybrid RRF (BM25 + 384d Dense Vector)',
      cloudAggregators: 'Naive exact text match or none',
      manualCopy: 'Manual human scrolling'
    },
    {
      feature: 'Token Compression & Filtering',
      chatbridge: '95% reduction (Pill extraction)',
      cloudAggregators: 'Dumps entire raw transcript',
      manualCopy: 'Manual editing or raw paste'
    },
    {
      feature: 'Retrieval Latency',
      chatbridge: '15ms - 30ms (Local CPU)',
      cloudAggregators: '800ms - 2,500ms (Network API)',
      manualCopy: '30s - 2 minutes manual labor'
    },
    {
      feature: 'Supported AI Platforms',
      chatbridge: 'ChatGPT, Claude, Gemini, DeepSeek',
      cloudAggregators: 'Often limited to ChatGPT + Claude',
      manualCopy: 'Any (manual)'
    },
    {
      feature: 'Cost & Licensing',
      chatbridge: '100% Free & Open (Apache-2.0)',
      cloudAggregators: 'Monthly subscription or token fee',
      manualCopy: 'Free (wastes human time)'
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
        <span className="text-[#1D1D1F] dark:text-[#E5E5EA]">Comparisons</span>
        <span>/</span>
        <span className="text-[#AF52DE] font-medium">ChatBridge vs Alternatives</span>
      </nav>

      {/* Hero Header */}
      <header className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#AF52DE]/10 text-[#AF52DE] border border-[#AF52DE]/25 text-xs font-mono mb-6">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Independent Architectural Comparison</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-5">
          ChatBridge vs Other Context Tools:{' '}
          <span className="bg-gradient-to-r from-[#AF52DE] via-[#2997FF] to-[#30D158] bg-clip-text text-transparent">
            Why Local-First Wins
          </span>
        </h1>

        <p className="text-lg text-[#86868B] leading-relaxed mb-8">
          Comparing ChatBridge's zero-knowledge local encryption and hybrid RRF retrieval against centralized cloud
          proxies, browser scrapers, and manual copy-pasting.
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

      {/* Token Savings Interactive Calculator */}
      <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#2997FF]/10 via-[#14141E] to-[#0A0A0F] border border-[#2997FF]/25 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-md">
            <span className="text-xs font-mono uppercase tracking-wider text-[#2997FF]">
              Interactive Efficiency Calculator
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold">
              Calculate Your Token & Attention Savings
            </h2>
            <p className="text-sm text-[#86868B] leading-relaxed">
              When copying raw transcripts, you waste thousands of input tokens on repetitive filler. ChatBridge extracts
              dense context capsules.
            </p>
            <div className="pt-2">
              <label className="block text-xs font-mono text-[#86868B] mb-2">
                Daily Cross-Model AI Handoffs: <span className="text-[#2997FF] font-bold">{chatsPerDay}</span>
              </label>
              <input
                type="range"
                min="2"
                max="50"
                value={chatsPerDay}
                onChange={(e) => setChatsPerDay(Number(e.target.value))}
                className="w-full accent-[#2997FF] cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="p-4 rounded-xl bg-[#1C1C28] border border-[#2A2A3C] text-center">
              <span className="text-xs font-mono text-[#86868B] block mb-1">Monthly Tokens Saved</span>
              <span className="text-2xl font-bold font-mono text-[#30D158]">
                {(monthlyTokensSaved / 1_000).toLocaleString()}k
              </span>
              <span className="text-[10px] text-[#86868B] block mt-1">~95% token reduction</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1C1C28] border border-[#2A2A3C] text-center">
              <span className="text-xs font-mono text-[#86868B] block mb-1">Est. API Cost Saved</span>
              <span className="text-2xl font-bold font-mono text-[#2997FF]">
                ${monthlyDollarsSaved}
              </span>
              <span className="text-[10px] text-[#86868B] block mt-1">At standard $3/1M tokens</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix Table */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">Detailed Technical Breakdown</h2>
        <div className="overflow-x-auto rounded-2xl border border-[#E5E5EA] dark:border-[#262634] shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8F9FA] dark:bg-[#14141E] border-b border-[#E5E5EA] dark:border-[#262634] text-xs font-mono">
              <tr>
                <th className="py-4 px-5 text-[#86868B]">Feature / Metric</th>
                <th className="py-4 px-5 text-[#2997FF] font-bold">ChatBridge (Local)</th>
                <th className="py-4 px-5 text-[#86868B]">Cloud AI Memory Extensions</th>
                <th className="py-4 px-5 text-[#86868B]">Manual Copy & Paste</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5EA] dark:divide-[#1E1E2A] bg-white dark:bg-[#0D0D12]">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F2F2F7] dark:hover:bg-[#12121A] transition-colors">
                  <td className="py-4 px-5 font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {row.feature}
                  </td>
                  <td className="py-4 px-5 text-[#2997FF] font-medium flex items-center">
                    <CheckIcon className="w-4 h-4 mr-2 text-[#30D158] shrink-0" />
                    <span>{row.chatbridge}</span>
                  </td>
                  <td className="py-4 px-5 text-[#86868B]">
                    {row.cloudAggregators}
                  </td>
                  <td className="py-4 px-5 text-[#86868B]">
                    {row.manualCopy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Deep Dive on the 3 Approaches */}
      <section className="mb-20 space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Evaluating the Three Approaches</h2>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#12121A] border border-[#E5E5EA] dark:border-[#222230]">
          <h3 className="text-lg font-semibold mb-2 text-[#2997FF]">1. Local-First Architecture (ChatBridge)</h3>
          <p className="text-sm text-[#86868B] leading-relaxed">
            By executing hybrid vector scoring and keyword search entirely in the Chromium service worker, ChatBridge
            delivers single-digit millisecond latency while ensuring zero conversational data leaves your laptop. It
            removes the privacy, compliance, and corporate risk inherent to centralized prompt managers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#12121A] border border-[#E5E5EA] dark:border-[#222230]">
          <h3 className="text-lg font-semibold mb-2 text-[#FF9500]">2. Cloud Aggregators & Proxy Services</h3>
          <p className="text-sm text-[#86868B] leading-relaxed">
            Tools that sync chats to a central server introduce significant security vulnerabilities. If the company’s
            database is compromised or sub-processors are changed, your proprietary source code, internal financial
            forecasts, and customer data are exposed. Furthermore, network round-trips add 1-3 seconds of latency.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#12121A] border border-[#E5E5EA] dark:border-[#222230]">
          <h3 className="text-lg font-semibold mb-2 text-[#86868B]">3. Manual Copying & Pasting</h3>
          <p className="text-sm text-[#86868B] leading-relaxed">
            While completely private, copying walls of raw text causes extreme cognitive friction. Pasting thousands of
            filler tokens also balloons input costs and can degrade destination model attention (the "lost-in-the-middle"
            phenomenon).
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#AF52DE]/10 via-[#1C1C26] to-[#0A0A0F] border border-[#AF52DE]/20">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          Choose Private, Instant AI Continuity
        </h2>
        <p className="text-sm text-[#86868B] max-w-xl mx-auto mb-6">
          Experience the difference of local hardware-backed AES-256-GCM memory. Free forever.
        </p>
        <a
          href={CHROME_WEBSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenInstall}
          className="inline-flex items-center px-6 py-3 rounded-xl bg-[#2997FF] hover:bg-[#1E76D2] text-white font-medium shadow-lg transition-transform hover:scale-105"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          <span>Add ChatBridge to Chrome</span>
        </a>
      </footer>
    </article>
  );
};
