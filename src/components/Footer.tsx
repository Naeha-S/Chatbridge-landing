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
  onOpenPaper,
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
    <footer className="bg-[#F5F5F7] border-t border-[#E5E5EA] text-[#6E6E73] text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-[#1D1D1F]">
                ChatBridge
              </span>
              <span className="text-[11px] font-mono text-[#6E6E73] bg-white px-1.5 py-0.5 rounded border border-[#E5E5EA]">
                Local-First
              </span>
            </div>
            <p className="text-[#515154] text-xs leading-relaxed max-w-sm">
              A browser extension for cross-assistant continuity. Carry useful discussion context between ChatGPT, Claude, and Gemini without repeatedly starting from zero.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <button
                id="footer-install-btn"
                onClick={onOpenInstall}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1D1D1F] hover:bg-[#333336] text-white text-xs font-medium transition-colors"
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
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-white hover:bg-[#E5E5EA] border border-[#D1D1D6] text-[#1D1D1F] text-xs font-medium transition-colors"
              >
                <span>Engineering Details</span>
              </button>
            </div>
          </div>

          {/* Architecture Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-[#1D1D1F]">
              Architecture
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('features');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  DOM Resilience
                </button>
              </li>
              {onOpenOnboarding && (
                <li>
                  <button
                    onClick={onOpenOnboarding}
                    className="text-[#0071E3] hover:underline transition-colors font-medium"
                  >
                    Setup Guide (Carousel)
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    setCurrentView('how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Pipeline Stages
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  AES-256-GCM Storage
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('features');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Retrieval Benchmarks
                </button>
              </li>
            </ul>
          </div>

          {/* Guides & Research */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-[#1D1D1F]">
              Guides
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  ChatGPT to Claude
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  ChatGPT to Gemini
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Local-First Memory
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('guides');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Rank Fusion (RRF)
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-[#1D1D1F]">
              Transparency
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Privacy Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Threat Model Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFeedback}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Feedback & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowSitemap(true)}
                  className="hover:text-[#1D1D1F] transition-colors"
                >
                  Sitemap Index
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="mt-12 pt-6 border-t border-[#E5E5EA] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868B]">
          <p>© {new Date().getFullYear()} ChatBridge. Stored conversation data remains exclusively on your device.</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1D1D1F]"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setCurrentView('features');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#1D1D1F]"
            >
              Engineering
            </button>
            <span>•</span>
            <button onClick={onOpenFeedback} className="hover:text-[#1D1D1F]">
              Support
            </button>
          </div>
        </div>
      </div>

      {/* Clean Sitemap Modal */}
      {showSitemap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-[#E5E5EA] max-w-lg w-full p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA]">
              <span className="text-xs font-mono font-medium text-[#1D1D1F]">
                Index of Available Pages
              </span>
              <button
                onClick={() => setShowSitemap(false)}
                className="text-[#6E6E73] hover:text-[#1D1D1F] p-1"
                aria-label="Close sitemap modal"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto text-xs font-mono">
              {sitemapUrls.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#F5F5F7] border border-[#E5E5EA]">
                  <span className="text-[#0071E3] block">{item.url}</span>
                  <span className="text-[11px] text-[#6E6E73]">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowSitemap(false)}
                className="px-3 py-1.5 rounded-md bg-[#F5F5F7] hover:bg-[#E5E5EA] text-xs font-medium text-[#1D1D1F] transition-colors"
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
