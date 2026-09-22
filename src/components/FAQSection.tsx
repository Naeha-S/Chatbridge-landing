import React, { useState } from 'react';
import { FAQ_ITEMS, PLATFORM_SUPPORT_LIST } from '../data/mockData';
import { PlatformSupportStatus } from '../types';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon } from './Icons';

interface FAQSectionProps {
  onOpenFeedbackForPlatform?: (platformName: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenFeedbackForPlatform }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [platformFilter, setPlatformFilter] = useState<'all' | PlatformSupportStatus>('all');

  const categories = ['All', 'Compatibility', 'General', 'Privacy', 'Technical'];

  const filteredFaqs =
    activeCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((f) => f.category === activeCategory);

  const filteredPlatforms =
    platformFilter === 'all'
      ? PLATFORM_SUPPORT_LIST
      : PLATFORM_SUPPORT_LIST.filter((p) => p.status === platformFilter);

  const handleRequestPlatform = (name: string) => {
    if (onOpenFeedbackForPlatform) {
      onOpenFeedbackForPlatform(name);
    } else {
      window.dispatchEvent(
        new CustomEvent('chatbridge:open-feedback', {
          detail: { category: 'platform', platform: name }
        })
      );
    }
  };

  const getStatusBadge = (status: PlatformSupportStatus, label: string) => {
    switch (status) {
      case 'supported':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F5F5F7] dark:bg-emerald-950/60 text-[#1D1D1F] dark:text-[#30D158] border border-[#E5E5EA] dark:border-emerald-800/60">
            {label}
          </span>
        );
      case 'testing':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#FFF9E6] dark:bg-amber-950/50 text-[#8C6B00] dark:text-[#FFD166] border border-[#FFE8A3] dark:border-amber-800/50">
            {label}
          </span>
        );
      case 'unsupported':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F5F5F7] dark:bg-[#1C1C26] text-[#86868B] dark:text-[#787884] border border-[#E5E5EA] dark:border-[#262638]">
            {label}
          </span>
        );
    }
  };

  return (
    <section id="faq" className="py-20 md:py-28 border-b border-[#E5E5EA] dark:border-[#22222D] bg-[#FBFBFA] dark:bg-[#040405] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-mono font-medium tracking-wide uppercase text-[#6E6E73] dark:text-[#8E8E98]">
            Questions and Compatibility
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
            Platform support and FAQ.
          </h2>
          <p className="text-base text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
            Transparent expectations regarding which web assistants work smoothly, which are in active evaluation, and which remain unsupported.
          </p>
        </div>

        {/* 1. Platform Compatibility Matrix */}
        <div className="bg-white dark:bg-[#0E0E14] rounded-xl border border-[#E5E5EA] dark:border-[#262633] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5EA] dark:border-[#22222D]">
            <div>
              <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                AI Service Compatibility Matrix
              </h3>
              <p className="text-xs text-[#6E6E73] dark:text-[#8E8E98] mt-0.5">
                Evaluated against Chrome extension sandboxing and DOM structures.
              </p>
            </div>

            {/* Platform Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-[#F5F5F7] dark:bg-[#171722] p-1 rounded-lg border border-[#E5E5EA] dark:border-[#262636] text-xs font-mono" role="tablist">
              <button
                id="platform-filter-all"
                role="tab"
                aria-selected={platformFilter === 'all'}
                onClick={() => setPlatformFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors text-[11px] ${
                  platformFilter === 'all'
                    ? 'bg-white dark:bg-[#252535] text-[#1D1D1F] dark:text-white font-medium shadow-2xs'
                    : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                All ({PLATFORM_SUPPORT_LIST.length})
              </button>
              <button
                id="platform-filter-supported"
                role="tab"
                aria-selected={platformFilter === 'supported'}
                onClick={() => setPlatformFilter('supported')}
                className={`px-2.5 py-1 rounded-md transition-colors text-[11px] ${
                  platformFilter === 'supported'
                    ? 'bg-white dark:bg-[#252535] text-[#1D1D1F] dark:text-white font-medium shadow-2xs'
                    : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                Supported (3)
              </button>
              <button
                id="platform-filter-testing"
                role="tab"
                aria-selected={platformFilter === 'testing'}
                onClick={() => setPlatformFilter('testing')}
                className={`px-2.5 py-1 rounded-md transition-colors text-[11px] ${
                  platformFilter === 'testing'
                    ? 'bg-white dark:bg-[#252535] text-[#1D1D1F] dark:text-white font-medium shadow-2xs'
                    : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                Testing (4)
              </button>
              <button
                id="platform-filter-unsupported"
                role="tab"
                aria-selected={platformFilter === 'unsupported'}
                onClick={() => setPlatformFilter('unsupported')}
                className={`px-2.5 py-1 rounded-md transition-colors text-[11px] ${
                  platformFilter === 'unsupported'
                    ? 'bg-white dark:bg-[#252535] text-[#1D1D1F] dark:text-white font-medium shadow-2xs'
                    : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                Unsupported (4)
              </button>
            </div>
          </div>

          {/* Platform Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlatforms.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-[#E5E5EA] dark:border-[#262633] bg-[#FBFBFA] dark:bg-[#12121A] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {item.name}
                      </h4>
                      {item.domain && (
                        <span className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] block">
                          {item.domain} • {item.category}
                        </span>
                      )}
                    </div>
                    <div>{getStatusBadge(item.status, item.statusLabel)}</div>
                  </div>

                  <p className="text-xs text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
                    {item.details}
                  </p>

                  {item.mitigationOrAlternative && (
                    <div className="bg-white dark:bg-[#181822] rounded p-2.5 border border-[#E5E5EA] dark:border-[#282838] text-[11px] text-[#6E6E73] dark:text-[#9E9EA7] space-y-0.5">
                      <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] block font-medium">Workaround / Guidance:</strong>
                      <p>{item.mitigationOrAlternative}</p>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#E5E5EA] dark:border-[#22222D] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#86868B] dark:text-[#787884]">
                    {item.status === 'supported'
                      ? 'Stable'
                      : item.status === 'testing'
                      ? 'Testing'
                      : 'Out of scope'}
                  </span>
                  <button
                    onClick={() => handleRequestPlatform(item.name)}
                    className="text-[#0071E3] dark:text-[#2997FF] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{item.status === 'unsupported' ? 'Request Platform' : 'Report Issue'}</span>
                    <ArrowRightIcon className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Unlisted Platform Callout */}
          <div className="p-4 rounded-lg bg-[#F5F5F7] dark:bg-[#15151F] border border-[#E5E5EA] dark:border-[#242434] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <p className="text-[#515154] dark:text-[#A1A1A6]">
              Using an unlisted custom web interface or self-hosted model? You can submit platform details directly to our issue queue.
            </p>
            <button
              onClick={() => handleRequestPlatform('Custom Web Service')}
              className="px-3 py-1.5 rounded-md bg-white dark:bg-[#222230] border border-[#D1D1D6] dark:border-[#323246] hover:bg-[#E5E5EA] dark:hover:bg-[#2A2A3C] text-[#1D1D1F] dark:text-white font-medium shrink-0 transition-colors"
            >
              Suggest Platform
            </button>
          </div>
        </div>

        {/* 2. Detailed FAQ Accordions */}
        <div className="space-y-6">
          <div className="max-w-xl space-y-1">
            <h3 className="text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Frequently asked questions</h3>
            <p className="text-sm text-[#6E6E73] dark:text-[#8E8E98]">
              Technical explanations concerning benchmarks, storage boundaries, and architecture.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                id={`faq-category-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#1D1D1F] dark:bg-[#2997FF] text-white font-medium shadow-2xs'
                    : 'bg-[#F5F5F7] dark:bg-[#181824] text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white border border-transparent dark:border-[#242434]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-[#E5E5EA] dark:divide-[#22222D] border-y border-[#E5E5EA] dark:border-[#22222D]">
            {filteredFaqs.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    id={`faq-toggle-${idx}`}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-base font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {item.question}
                    </span>
                    <span className="text-[#6E6E73] dark:text-[#8E8E98] shrink-0">
                      {isOpen ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 pr-6 text-sm text-[#515154] dark:text-[#A1A1A6] leading-relaxed space-y-3">
                      <p>{item.answer}</p>
                      <div className="flex items-center justify-between text-xs font-mono text-[#86868B] dark:text-[#787884] pt-2 border-t border-[#F5F5F7] dark:border-[#1E1E2A]">
                        <span>Topic: {item.category}</span>
                        <button
                          onClick={() => handleRequestPlatform('General Query')}
                          className="text-[#0071E3] dark:text-[#2997FF] hover:underline"
                        >
                          Ask a different question
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
