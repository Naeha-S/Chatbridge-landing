import React, { useState } from 'react';
import { PageView } from '../types';
import { DownloadIcon, CloseIcon } from './Icons';
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
    <footer className="bg-[#F5F5F7] dark:bg-[#07070B] border-t border-[#E5E5EA] dark:border-[#22222E] text-[#6E6E73] dark:text-[#8E8E98] text-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                ChatBridge
              </span>
              <span className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] bg-white dark:bg-[#14141E] px-1.5 py-0.5 rounded border border-[#E5E5EA] dark:border-[#262638]">
                Local-First
              </span>
            </div>
            <p className="text-[#515154] dark:text-[#A1A1A6] text-xs leading-relaxed max-w-sm">
              A browser extension for cross-assistant continuity. Carry useful discussion context between ChatGPT, Claude, and Gemini without repeatedly starting from zero.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                id="footer-install-btn"
                href={CHROME_WEBSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1D1D1F] dark:bg-white hover:bg-[#333336] dark:hover:bg-[#E5E5EA] text-white dark:text-[#0A0A0D] text-xs font-medium transition-colors"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Add to Chrome</span>
              </a>
              <button
                id="footer-engineering-btn"
                onClick={() => {
                  setCurrentView('features');
                  smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                }}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-white dark:bg-[#14141E] hover:bg-[#E5E5EA] dark:hover:bg-[#20202E] border border-[#D1D1D6] dark:border-[#2C2C3E] text-[#1D1D1F] dark:text-[#E5E5EA] text-xs font-medium transition-colors"
              >
                <span>Engineering Details</span>
              </button>
            </div>
          </div>

          {/* Architecture Links */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7]">
              Architecture
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('how-it-works');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  Continuity Pipeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('features');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  Hybrid RRF Retrieval
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('supported-platforms');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  Supported Platforms
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('comparison');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  ChatBridge vs Alternatives
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Migration */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7]">
              Solutions & Migration
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('chatgpt-to-claude');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors text-left"
                >
                  ChatGPT to Claude Transfer
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('chatgpt-to-gemini');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors text-left"
                >
                  ChatGPT to Gemini Context
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.location.hash = '#ai-conversation-memory';
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors text-left"
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
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors text-left"
                >
                  Local Encrypted Storage Model
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Support */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7]">
              Privacy & Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('faq');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('local-privacy');
                    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  Local Privacy Model
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFeedback}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  Report Issue / Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowSitemap(true)}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  HTML Sitemap
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E5E5EA] dark:border-[#22222E] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868B] dark:text-[#787884]">
          <div>
            © {new Date().getFullYear()} ChatBridge. Open client-side browser extension for AI continuity.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setCurrentView('local-privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1D1D1F] dark:hover:text-white"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setCurrentView('features');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1D1D1F] dark:hover:text-white"
            >
              Engineering
            </button>
            <span>•</span>
            <button onClick={onOpenFeedback} className="hover:text-[#1D1D1F] dark:hover:text-white">
              Support
            </button>
          </div>
        </div>
      </div>

      {/* Clean Sitemap Modal */}
      {showSitemap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#12121A] rounded-2xl border border-[#E5E5EA] dark:border-[#2A2A3C] max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-[#22222E]">
              <span className="text-xs font-mono font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                Index of Available Pages
              </span>
              <button
                onClick={() => setShowSitemap(false)}
                className="text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white p-1"
                aria-label="Close sitemap modal"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto text-xs font-mono">
              {sitemapUrls.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#F5F5F7] dark:bg-[#181824] border border-[#E5E5EA] dark:border-[#262638]">
                  <span className="text-[#0071E3] dark:text-[#2997FF] block">{item.url}</span>
                  <span className="text-[11px] text-[#6E6E73] dark:text-[#8E8E98]">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowSitemap(false)}
                className="px-3.5 py-1.5 rounded-lg bg-[#F5F5F7] dark:bg-[#1A1A28] hover:bg-[#E5E5EA] dark:hover:bg-[#252536] text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors"
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
