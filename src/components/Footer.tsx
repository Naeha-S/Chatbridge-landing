import React, { useState } from 'react';
import { PageView } from '../types';
import { DownloadIcon, CloseIcon } from './Icons';

interface FooterProps {
  setCurrentView: (view: PageView) => void;
  onOpenInstall: () => void;
  onOpenPaper?: () => void;
  onOpenFeedback: () => void;
  onOpenOnboarding?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentView,
  onOpenInstall,
  onOpenFeedback,
  onOpenOnboarding,
}) => {
  const [showSitemap, setShowSitemap] = useState(false);

  const sitemapUrls = [
    { url: 'https://chatbridge.app/', title: 'Overview: Architecture and Product' },
    { url: 'https://chatbridge.app/features', title: 'Technical Architecture and DOM Resilience' },
    { url: 'https://chatbridge.app/how-it-works', title: 'Four-Stage Continuity Pipeline' },
    { url: 'https://chatbridge.app/privacy', title: 'Privacy Architecture and Threat Model' },
    { url: 'https://chatbridge.app/guides', title: 'Implementation and Migration Guides' },
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
              <button
                id="footer-install-btn"
                onClick={onOpenInstall}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1D1D1F] dark:bg-white hover:bg-[#333336] dark:hover:bg-[#E5E5EA] text-white dark:text-[#0A0A0D] text-xs font-medium transition-colors"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Add to Chrome</span>
              </button>
              <button
                id="footer-engineering-btn"
                onClick={() => {
                  setCurrentView('features');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  Hybrid RRF Retrieval
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('features');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  Dynamic Prompt Compression
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('features');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  DOM Observation & Fallbacks
                </button>
              </li>
            </ul>
          </div>

          {/* Guides Links */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7]">
              Guides & Use Cases
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.location.hash = '#chatgpt-to-claude';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  ChatGPT to Claude Continuity
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.location.hash = '#chatgpt-to-gemini';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  ChatGPT to Gemini Research
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.location.hash = '#ai-conversation-memory';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                >
                  Cross-Assistant AI Memory
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.location.hash = '#local-ai-memory';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
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
                    setCurrentView('local-privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              {onOpenOnboarding && (
                <li>
                  <button
                    onClick={onOpenOnboarding}
                    className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
                  >
                    Quick Tour
                  </button>
                </li>
              )}
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
