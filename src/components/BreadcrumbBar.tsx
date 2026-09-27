import React from 'react';
import { PageView, GuideSlug } from '../types';

interface BreadcrumbBarProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  activeGuideSlug?: GuideSlug;
}

const VIEW_BREADCRUMBS: Record<string, { category: string; label: string }> = {
  history: { category: 'Memory Vault', label: 'Cross-AI Memory Studio' },
  'how-it-works': { category: 'Architecture', label: 'AST Token Distillation' },
  'chatgpt-to-gemini': { category: 'Workflows', label: 'ChatGPT to Gemini Handoff' },
  comparison: { category: 'Benchmarks', label: 'Local Memory vs Cloud Vector DBs' },
  faq: { category: 'Documentation', label: 'Frequently Asked Questions' },
  features: { category: 'Capabilities', label: 'System Strata & Feature Matrix' },
  privacy: { category: 'Security', label: 'On-Device Privacy Model' },
  'local-privacy': { category: 'Security', label: 'On-Device Privacy Model' },
  terms: { category: 'Legal', label: 'Terms of Service' },
  guides: { category: 'Technical Guides', label: 'Deep Dives & Whitepapers' },
  '404': { category: 'Navigation', label: '404 Page Not Found' }
};

const GUIDE_TITLES: Record<string, string> = {
  'ai-conversation-memory': 'Cross-AI Memory Management',
  'local-ai-memory': 'On-Device WebCrypto Security',
  'hybrid-retrieval-rrf': 'Reciprocal Rank Fusion Search'
};

export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({
  currentView,
  setCurrentView,
  activeGuideSlug
}) => {
  if (currentView === 'home') return null;

  const info = VIEW_BREADCRUMBS[currentView] || {
    category: 'System',
    label: currentView
  };

  const currentLabel =
    currentView === 'guides' && activeGuideSlug && GUIDE_TITLES[activeGuideSlug]
      ? GUIDE_TITLES[activeGuideSlug]
      : info.label;

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className="w-full border-b border-neutral-200/60 dark:border-white/5 bg-white/50 dark:bg-black/30 backdrop-blur-md transition-colors text-[11px] font-mono py-2 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-visible-scrollbar text-neutral-500 dark:text-neutral-400">
        <button
          onClick={() => setCurrentView('home')}
          className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors font-medium cursor-pointer shrink-0"
        >
          ChatBridge
        </button>

        <span className="text-neutral-300 dark:text-neutral-600 select-none">/</span>

        <span className="text-neutral-600 dark:text-neutral-300 shrink-0 font-medium">
          {info.category}
        </span>

        <span className="text-neutral-300 dark:text-neutral-600 select-none">/</span>

        <span className="text-[#0071E3] dark:text-[#2997FF] font-semibold truncate">
          {currentLabel}
        </span>
      </div>
    </nav>
  );
};
