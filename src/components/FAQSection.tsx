import React, { useState, useRef, useEffect } from 'react';
import { FAQ_ITEMS, PLATFORM_SUPPORT_LIST } from '../data/mockData';
import { PlatformSupportStatus, PlatformSupportItem } from '../types';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
  IconCheck,
  IconArrowRight,
  IconSparkles,
  IconShieldCheck,
  IconThumbUp,
  IconThumbDown,
  IconX,
  IconMessageQuestion,
  IconRefresh
} from '@tabler/icons-react';

interface FAQSectionProps {
  onOpenFeedbackForPlatform?: (platformName: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenFeedbackForPlatform }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [platformFilter, setPlatformFilter] = useState<'all' | PlatformSupportStatus>('all');
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<number, boolean>>({});

  // Carousel refs & state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const categories = ['All', 'Compatibility', 'General', 'Privacy', 'Technical'];

  const filteredPlatforms: PlatformSupportItem[] =
    platformFilter === 'all'
      ? PLATFORM_SUPPORT_LIST
      : PLATFORM_SUPPORT_LIST.filter((p) => p.status === platformFilter);

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const checkScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Approximate active card index
    const cardWidth = 340;
    const index = Math.min(
      filteredPlatforms.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setCurrentSlideIndex(index);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollState, { passive: true });
    checkScrollState();
    return () => el.removeEventListener('scroll', checkScrollState);
  }, [filteredPlatforms]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const cardWidth = 350;
    const scrollAmount = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleRequestPlatform = (name: string, isIssue: boolean = false) => {
    if (onOpenFeedbackForPlatform) {
      onOpenFeedbackForPlatform(name);
    } else {
      window.dispatchEvent(
        new CustomEvent('chatbridge:open-feedback', {
          detail: {
            category: isIssue ? 'bug' : 'platform',
            platform: name
          }
        })
      );
    }
  };

  const handleGeneralQuestion = () => {
    window.dispatchEvent(
      new CustomEvent('chatbridge:open-feedback', {
        detail: { category: 'general' }
      })
    );
  };

  const getPlatformBrandColor = (name: string) => {
    if (name.includes('ChatGPT')) return '#10A37F';
    if (name.includes('Claude')) return '#D97706';
    if (name.includes('Gemini')) return '#2997FF';
    if (name.includes('DeepSeek')) return '#4E6BF2';
    if (name.includes('Perplexity')) return '#20B2AA';
    if (name.includes('Copilot')) return '#0078D4';
    if (name.includes('Mistral')) return '#FF7000';
    return '#8E8E93';
  };

  const getStatusBadge = (status: PlatformSupportStatus, label: string) => {
    switch (status) {
      case 'supported':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{label}</span>
          </span>
        );
      case 'testing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>{label}</span>
          </span>
        );
      case 'unsupported':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <section
      id="faq"
      className="py-20 md:py-28 border-b border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl transition-colors relative overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/10 dark:bg-[#2997FF]/10 border border-[#0071E3]/20 dark:border-[#2997FF]/20 text-[#0071E3] dark:text-[#2997FF] text-xs font-mono font-medium">
              <IconSparkles className="w-3.5 h-3.5" />
              <span>Questions & Compatibility Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
              Platform support and FAQ.
            </h2>
            <p className="text-sm sm:text-base text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
              Transparent specifications on which web assistants operate natively, which interfaces are under active beta testing, and technical architectural truths.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <a
              href="#platform-carousel"
              className="text-xs font-medium text-[#515154] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white px-3 py-1.5 rounded-lg border border-[#E5E5EA] dark:border-[#262638] bg-white/70 dark:bg-[#151520] transition-colors"
            >
              Browse Platforms ({PLATFORM_SUPPORT_LIST.length})
            </a>
            <a
              href="#faq-accordions"
              className="text-xs font-medium text-[#515154] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white px-3 py-1.5 rounded-lg border border-[#E5E5EA] dark:border-[#262638] bg-white/70 dark:bg-[#151520] transition-colors"
            >
              Technical FAQs ({FAQ_ITEMS.length})
            </a>
          </div>
        </div>

        {/* 1. Horizontal Carousel Platform Support */}
        <div id="platform-carousel" className="space-y-4">
          {/* Carousel Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 dark:bg-[#0D0D14]/90 p-4 rounded-2xl border border-neutral-200/80 dark:border-white/10 backdrop-blur-md shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  AI Service Compatibility Dock
                </h3>
                <span className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800">
                  v0.4 Verified
                </span>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#8E8E98] mt-0.5">
                Horizontal carousel view: scroll or use arrows to view all verified models.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
              {/* Filter Tabs */}
              <div
                className="flex items-center gap-1 bg-[#F5F5F7] dark:bg-[#171722] p-1 rounded-xl border border-[#E5E5EA] dark:border-[#262636] text-xs font-mono"
                role="tablist"
              >
                {(['all', 'supported', 'testing', 'unsupported'] as const).map((filter) => {
                  const counts = {
                    all: PLATFORM_SUPPORT_LIST.length,
                    supported: PLATFORM_SUPPORT_LIST.filter((p) => p.status === 'supported').length,
                    testing: PLATFORM_SUPPORT_LIST.filter((p) => p.status === 'testing').length,
                    unsupported: PLATFORM_SUPPORT_LIST.filter((p) => p.status === 'unsupported').length
                  };
                  const labels = {
                    all: 'All',
                    supported: 'Supported',
                    testing: 'Testing',
                    unsupported: 'Unsupported'
                  };
                  const isSelected = platformFilter === filter;
                  return (
                    <button
                      key={filter}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setPlatformFilter(filter)}
                      className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                        isSelected
                          ? 'bg-white dark:bg-[#252535] text-[#1D1D1F] dark:text-white font-semibold shadow-2xs'
                          : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
                      }`}
                    >
                      {labels[filter]} ({counts[filter]})
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-[#86868B] dark:text-[#787884] mr-1 hidden sm:inline">
                  {currentSlideIndex + 1} / {filteredPlatforms.length}
                </span>
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  disabled={!canScrollLeft}
                  aria-label="Scroll left"
                  className="p-1.5 rounded-lg border border-[#E5E5EA] dark:border-[#282838] bg-white dark:bg-[#1A1A26] text-[#1D1D1F] dark:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <IconChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  disabled={!canScrollRight}
                  aria-label="Scroll right"
                  className="p-1.5 rounded-lg border border-[#E5E5EA] dark:border-[#282838] bg-white dark:bg-[#1A1A26] text-[#1D1D1F] dark:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <IconChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Carousel Track */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 px-0.5 scroll-smooth scrollbar-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {filteredPlatforms.map((item, idx) => {
              const brandColor = getPlatformBrandColor(item.name);
              const isSupported = item.status === 'supported';
              const isTesting = item.status === 'testing';

              return (
                <div
                  key={idx}
                  className="w-[310px] sm:w-[350px] shrink-0 snap-start flex flex-col justify-between rounded-2xl bg-white/90 dark:bg-[#111119] border border-neutral-200/90 dark:border-white/10 p-5 shadow-xs hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 group relative overflow-hidden"
                >
                  {/* Top subtle colored hairline */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: brandColor }}
                  />

                  <div className="space-y-3.5">
                    {/* Header: Name + Badge */}
                    <div className="flex items-start justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-white dark:ring-[#111119]"
                          style={{ backgroundColor: brandColor }}
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] leading-snug group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
                            {item.name}
                          </h4>
                          {item.domain && (
                            <span className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] block">
                              {item.domain}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0">{getStatusBadge(item.status, item.statusLabel.split(' ')[0])}</div>
                    </div>

                    {/* Category pill */}
                    <div className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {item.category}
                    </div>

                    {/* Details */}
                    <p className="text-xs text-[#515154] dark:text-[#A1A1A6] leading-relaxed line-clamp-3">
                      {item.details}
                    </p>

                    {/* Workaround / Guidance box */}
                    {item.mitigationOrAlternative && (
                      <div className="bg-neutral-50 dark:bg-[#161622] rounded-xl p-2.5 border border-neutral-200/70 dark:border-[#222232] text-[11px] text-[#6E6E73] dark:text-[#9E9EA7] space-y-1">
                        <span className="text-[10px] uppercase font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] block">
                          Integration Strategy:
                        </span>
                        <p className="line-clamp-2">{item.mitigationOrAlternative}</p>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 mt-3 border-t border-neutral-200/80 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#86868B] dark:text-[#787884] flex items-center gap-1">
                      {isSupported ? (
                        <>
                          <IconCheck className="w-3 h-3 text-emerald-500" />
                          <span>Active DOM Hook</span>
                        </>
                      ) : isTesting ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Beta Stream</span>
                        </>
                      ) : (
                        <span>Out of Scope</span>
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRequestPlatform(item.name, isSupported || isTesting)}
                      className="text-[#0071E3] dark:text-[#2997FF] hover:underline inline-flex items-center gap-1 font-semibold group/btn"
                    >
                      <span>
                        {item.status === 'unsupported' ? 'Vote / Request' : 'Report Issue'}
                      </span>
                      <IconArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Custom Request End-Card */}
            <div className="w-[300px] shrink-0 snap-start flex flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-[#111122] dark:to-[#0E0E18] border border-blue-200/60 dark:border-blue-500/20 p-5 text-xs">
              <div className="space-y-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0071E3]/10 dark:bg-[#2997FF]/10 text-[#0071E3] dark:text-[#2997FF] flex items-center justify-center font-bold">
                  +
                </div>
                <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                  Using an Unlisted Interface?
                </h4>
                <p className="text-xs text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
                  Building with Ollama, Open WebUI, LibreChat, or internal corporate LLM portals? Submit platform details to our roadmap queue.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleRequestPlatform('Custom Web Service', false)}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs text-center transition-colors shadow-2xs"
              >
                Request Custom Platform
              </button>
            </div>
          </div>

          {/* Carousel Footer reassurance */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-1 text-[11px] font-mono text-[#86868B] dark:text-[#787884]">
            <div className="flex items-center gap-2">
              <IconShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero-risk passive reads • Identical to screen reader DOM parsing • No account bans</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Swipe horizontally on mobile & trackpads</span>
            </div>
          </div>
        </div>

        {/* 2. Questions (FAQ) Section */}
        <div id="faq-accordions" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF] font-semibold">
                Technical Knowledge Base
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E98]">
                Precise explanations of client-side encryption, hybrid RRF retrieval math, token efficiency, and Chrome storage limits.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B] pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g. AES, recall)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/80 dark:bg-[#12121A] border border-neutral-200/90 dark:border-white/10 text-xs text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
                >
                  <IconX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? FAQ_ITEMS.length
                  : FAQ_ITEMS.filter((f) => f.category === cat).length;
              const isSelected = activeCategory === cat;

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  id={`faq-category-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold shadow-2xs'
                      : 'bg-[#F5F5F7] dark:bg-[#161622] text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white border border-neutral-200/60 dark:border-[#242434]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-neutral-50 dark:bg-[#111119] border border-neutral-200/80 dark:border-white/10 space-y-3">
              <IconSearch className="w-8 h-8 text-neutral-400 mx-auto" />
              <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                No questions found matching "{searchQuery}"
              </h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try searching for a different keyword like "encryption", "benchmarks", or "ChatGPT".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline"
              >
                <IconRefresh className="w-3.5 h-3.5" />
                <span>Reset search filters</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((item, idx) => {
                const isOpen = openIdx === idx;
                const isHelpful = helpfulFeedback[idx];

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white dark:bg-[#12121C] border-[#0071E3]/50 dark:border-[#2997FF]/50 shadow-sm border-l-4 border-l-[#0071E3] dark:border-l-[#2997FF]'
                        : 'bg-white/80 dark:bg-[#0E0E16]/80 border-neutral-200/80 dark:border-white/10 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <button
                      id={`faq-toggle-${idx}`}
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 shrink-0">
                          {item.category}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] leading-snug">
                          {item.question}
                        </span>
                      </div>
                      <span
                        className={`text-[#6E6E73] dark:text-[#8E8E98] shrink-0 p-1 rounded-full transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#0071E3] dark:text-[#2997FF]' : ''
                        }`}
                      >
                        <IconChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#515154] dark:text-[#A1A1A6] leading-relaxed space-y-4 border-t border-neutral-100 dark:border-neutral-800/60">
                        <p className="pt-2">{item.answer}</p>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                          {/* Helpful Micro-Interaction */}
                          <div className="flex items-center gap-2 text-neutral-500 font-mono text-[11px]">
                            <span>Was this answer helpful?</span>
                            {isHelpful === undefined ? (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setHelpfulFeedback((prev) => ({ ...prev, [idx]: true }))
                                  }
                                  className="px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 inline-flex items-center gap-1 transition-colors"
                                >
                                  <IconThumbUp className="w-3 h-3 text-emerald-500" />
                                  <span>Yes</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setHelpfulFeedback((prev) => ({ ...prev, [idx]: false }))
                                  }
                                  className="px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 inline-flex items-center gap-1 transition-colors"
                                >
                                  <IconThumbDown className="w-3 h-3 text-rose-500" />
                                  <span>No</span>
                                </button>
                              </div>
                            ) : isHelpful ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                                <IconCheck className="w-3.5 h-3.5" />
                                Thank you for the feedback!
                              </span>
                            ) : (
                              <span className="text-amber-600 dark:text-amber-400 font-medium">
                                Thanks. We'll refine this documentation.
                              </span>
                            )}
                          </div>

                          {/* Ask different question */}
                          <button
                            type="button"
                            onClick={handleGeneralQuestion}
                            className="text-[#0071E3] dark:text-[#2997FF] hover:underline inline-flex items-center gap-1 text-[11px] font-mono self-start sm:self-auto"
                          >
                            <IconMessageQuestion className="w-3.5 h-3.5" />
                            <span>Ask an unlisted question</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Help banner */}
          <div className="p-5 rounded-2xl bg-neutral-100/80 dark:bg-[#12121A] border border-neutral-200/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-0.5">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
                Have a technical question not answered here?
              </span>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                Our maintainers monitor developer feedback and document new questions weekly.
              </p>
            </div>
            <button
              type="button"
              onClick={handleGeneralQuestion}
              className="px-4 py-2 rounded-xl bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs shrink-0 transition-colors shadow-2xs"
            >
              Ask Maintainers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
