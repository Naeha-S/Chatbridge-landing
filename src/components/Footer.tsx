import React, { useState } from 'react';
import { PageView } from '../types';
import { DownloadIcon, CloseIcon } from './Icons';
import { ChatBridgeLogo } from './Logo';
import { GooglePreferredSourceCard } from './GooglePreferredSourceCard';
import { CHROME_WEBSTORE_URL } from '../constants/links';
import { smoothScrollTo } from '../hooks/useGsapSmoothScroll';

interface FooterProps {
  setCurrentView: (view: PageView) => void;
  onOpenInstall: () => void;
  onOpenPaper?: () => void;
  onOpenFeedback: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentView,
  onOpenInstall,
  onOpenFeedback,
}) => {
  const [showSitemap, setShowSitemap] = useState(false);

  const sitemapUrls = [
    { url: 'https://chatbridge.app/', title: 'Overview: Architecture and Product' },
    { url: 'https://chatbridge.app/#how-it-works', title: 'How It Works: Five-Stage Continuity Pipeline' },
    { url: 'https://chatbridge.app/#chatgpt-to-claude', title: 'ChatGPT to Claude: Code & Reasoning Continuity' },
    { url: 'https://chatbridge.app/#chatgpt-to-gemini', title: 'ChatGPT to Google Gemini 2.0: 1M+ Context Window Handoff' },
    { url: 'https://chatbridge.app/#comparison', title: 'Comparison: ChatBridge vs Cloud Memory vs Manual Copy' },
    { url: 'https://chatbridge.app/#supported-platforms', title: 'Supported Platforms: ChatGPT, Claude, Gemini, DeepSeek' },
    { url: 'https://chatbridge.app/#faq', title: 'Frequently Asked Questions & Security Audits' },
    { url: 'https://chatbridge.app/#features', title: 'Technical Architecture & Hybrid RRF Retrieval' },
    { url: 'https://chatbridge.app/#privacy', title: 'Privacy Architecture & Zero-Knowledge Threat Model' },
    { url: 'https://chatbridge.app/#guides', title: 'Implementation and Migration Technical Guides' },
  ];

  return (
    <footer className="liquid-glass-panel relative z-10 border-t border-neutral-200/80 dark:border-white/10 text-neutral-600 dark:text-neutral-400 text-xs transition-colors backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <ChatBridgeLogo size={26} className="w-6.5 h-6.5" />
              <span className="font-bold text-base tracking-tight text-[#1D1D1F] dark:text-white">
                ChatBridge
              </span>
              <span className="text-[10px] font-mono font-medium text-[#0071E3] dark:text-[#2997FF] bg-[#0071E3]/10 dark:bg-[#2997FF]/10 px-2 py-0.5 rounded-full border border-[#0071E3]/20 dark:border-[#2997FF]/20">
                Local-First
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed max-w-sm">
              Cross-model conversational continuity engine. Securely bridge your research context between ChatGPT, Claude 3.7, and Gemini 2.0 without re-explaining project specifications.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                id="footer-install-btn"
                href={CHROME_WEBSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1D1D1F] hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold shadow-sm transition-all hover:scale-105"
              >
                <DownloadIcon className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#0071E3]" />
                <span className="text-white dark:text-neutral-950 font-semibold">Add to Chrome</span>
              </a>
              <button
                id="footer-engineering-btn"
                onClick={() => {
                  setCurrentView('features');
                  smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                }}
                className="inline-flex items-center px-3.5 py-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-300 dark:border-white/15 text-[#1D1D1F] dark:text-neutral-200 text-xs font-medium transition-all backdrop-blur-md cursor-pointer"
              >
                <span>Engineering Details</span>
              </button>
            </div>
          </div>

          {/* Cluster 1: Architecture & Core Systems */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F] dark:text-white">
              Architecture & Core
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('history');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Memory Vault & Notebook
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('how-it-works');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  5-Stage Continuity Pipeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('features');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Hybrid RRF Retrieval Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('comparison');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Architecture vs Vector DBs
                </button>
              </li>
            </ul>
          </div>

          {/* Cluster 2: Workflow Solutions */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F] dark:text-white">
              Workflows & Handoffs
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('chatgpt-to-gemini');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  ChatGPT to Gemini Handoff
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.location.hash = '#ai-conversation-memory';
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Cross-Assistant AI Memory
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.location.hash = '#local-ai-memory';
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  WebCrypto Encryption Model
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.location.hash = '#hybrid-retrieval-rrf';
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Dense Vector + BM25 Fusion
                </button>
              </li>
            </ul>
          </div>

          {/* Cluster 3: Security & Legal */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F] dark:text-white">
              Security & Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('local-privacy');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Zero-Knowledge Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('terms');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('faq');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Security Audits & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Cluster 4: Developer Resources */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F] dark:text-white">
              Resources & Docs
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Technical Guides
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFeedback}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  Report Issue / Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowSitemap(true)}
                  className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer text-left"
                >
                  HTML Sitemap
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Preferred Sources Integration Ribbon */}
        <GooglePreferredSourceCard className="mt-12" />

        {/* Bottom Editorial Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          <div>
            © {new Date().getFullYear()} ChatBridge Project. Local-first WebCrypto client-side extension.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('local-privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <button
              onClick={() => {
                setCurrentView('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <button
              onClick={() => {
                setCurrentView('features');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer"
            >
              Engineering
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <button onClick={onOpenFeedback} className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors cursor-pointer">
              Support
            </button>
          </div>
        </div>
      </div>

      {/* Clean Sitemap Modal */}
      {showSitemap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="liquid-glass-panel rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-[#1D1D1F] dark:text-white">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/10">
              <span className="text-xs font-mono font-semibold text-[#1D1D1F] dark:text-white">
                Index of Available Pages
              </span>
              <button
                onClick={() => setShowSitemap(false)}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Close sitemap modal"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto text-xs font-mono custom-scrollbar">
              {sitemapUrls.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-neutral-200/60 dark:border-white/10 space-y-0.5">
                  <span className="text-[#0071E3] dark:text-[#2997FF] font-semibold block">{item.url}</span>
                  <span className="text-[11px] text-neutral-600 dark:text-neutral-400">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowSitemap(false)}
                className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-xs font-semibold text-white transition-all shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
