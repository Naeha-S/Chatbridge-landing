import React, { useState, useEffect, useRef } from 'react';
import { GUIDE_ARTICLES } from '../data/mockData';
import { GuideSlug } from '../types';
import { DownloadIcon, CheckIcon, CopyIcon, SearchIcon, CloseIcon } from './Icons';
import { useToast } from '../context/ToastContext';

interface BlogGuidesViewProps {
  initialSlug?: GuideSlug;
  onOpenInstall: () => void;
}

export const BlogGuidesView: React.FC<BlogGuidesViewProps> = ({ initialSlug, onOpenInstall }) => {
  const { toast } = useToast();
  const [selectedSlug, setSelectedSlug] = useState<GuideSlug>(initialSlug || 'chatgpt-to-claude');
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync initial slug changes
  useEffect(() => {
    if (initialSlug) {
      setSelectedSlug(initialSlug);
    }
  }, [initialSlug]);

  // Keyboard shortcut: Pressing "/" or "Ctrl+K / Cmd+K" focuses global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = ['All', 'Workflows', 'Engineering', 'Privacy', 'Concepts'];

  // Deep search matching across title, subtitle, summary, category, and inner paragraph text
  const filteredArticles = GUIDE_ARTICLES.filter((article) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesCategory =
      selectedCategory === 'All' || article.category.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) return false;
    if (!query) return true;

    // Search fields
    const inTitle = article.title.toLowerCase().includes(query);
    const inSubtitle = article.subtitle.toLowerCase().includes(query);
    const inSummary = article.summary.toLowerCase().includes(query);
    const inCategory = article.category.toLowerCase().includes(query);

    // Deep search inside headings, body text, callouts, and code snippets
    const inContent = article.content.some((section) => {
      const inHeading = section.heading.toLowerCase().includes(query);
      const inBody = section.body.some((p) => p.toLowerCase().includes(query));
      const inCallout = section.callout ? section.callout.toLowerCase().includes(query) : false;
      const inCode = section.codeSnippet ? section.codeSnippet.toLowerCase().includes(query) : false;
      return inHeading || inBody || inCallout || inCode;
    });

    return inTitle || inSubtitle || inSummary || inCategory || inContent;
  });

  const currentArticle =
    GUIDE_ARTICLES.find((a) => a.slug === selectedSlug) ||
    filteredArticles[0] ||
    GUIDE_ARTICLES[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '#' + currentArticle.slug);
    setCopiedLink(true);
    toast.copied(
      'Article link copied to clipboard!',
      `Direct link to "${currentArticle.title}"`
    );
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const popularKeywords = [
    'ChatGPT to Claude',
    'AES-256-GCM',
    'Hybrid RRF',
    'Gemini',
    'DOM Resilience',
    'Recall@5',
    'Token Budget'
  ];

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-amber-100 dark:bg-amber-900/60 text-[#1D1D1F] dark:text-white px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="py-20 md:py-28 bg-[#FBFBFA] dark:bg-[#040405] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header & Global Search Bar */}
        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-mono font-medium tracking-wide text-[#6E6E73] dark:text-[#8E8E98] uppercase">
              Documentation and Knowledge Base
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
              Conversational continuity guides.
            </h1>
            <p className="text-base text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
              Step-by-step workflows, retrieval mathematics, and local encryption specifications for multi-model AI users.
            </p>
          </div>

          {/* Global Search Interface */}
          <div className="bg-white dark:bg-[#0E0E16] rounded-2xl border border-[#E5E5EA] dark:border-[#262638] p-4 sm:p-5 shadow-xs space-y-4">
            <div className="relative">
              <SearchIcon className="w-4 h-4 text-[#86868B] dark:text-[#787884] absolute left-3.5 top-3" />
              <input
                ref={searchInputRef}
                id="global-guide-search-input"
                type="text"
                placeholder="Search across articles, technical specs, algorithms, and workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-2.5 bg-[#F5F5F7] dark:bg-[#161622] border border-[#D1D1D6] dark:border-[#2A2A3C] rounded-xl text-sm text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#666675] focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] focus:bg-white dark:focus:bg-[#12121A] transition-all"
              />
              <div className="absolute right-3 top-2.5 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-md text-[#86868B] dark:text-[#787884] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-[#E5E5EA] dark:hover:bg-[#252536] transition-colors"
                    title="Clear search"
                  >
                    <CloseIcon className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#86868B] dark:text-[#787884] bg-white dark:bg-[#1A1A28] border border-[#D1D1D6] dark:border-[#2E2E40] rounded shadow-2xs">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Category & Popular Tags Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#F5F5F7] dark:border-[#20202E]">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5" role="tablist">
                <span className="text-[11px] font-mono text-[#86868B] dark:text-[#787884] mr-1">Category:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0D]'
                        : 'bg-[#F5F5F7] dark:bg-[#161622] text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-[#E5E5EA] dark:hover:bg-[#202030]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Keyword Suggestion Chips */}
              <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#6E6E73] dark:text-[#8E8E98]">
                <span className="text-[11px] font-mono text-[#86868B] dark:text-[#787884]">Popular:</span>
                {popularKeywords.slice(0, 4).map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setSearchQuery(kw)}
                    className="px-2 py-0.5 rounded bg-[#F5F5F7] dark:bg-[#161622] hover:bg-[#EBEBED] dark:hover:bg-[#222232] text-[#515154] dark:text-[#A1A1A6] text-[11px] border border-[#E5E5EA] dark:border-[#262638] transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Match Counter */}
            {searchQuery && (
              <div className="text-xs font-mono text-[#6E6E73] dark:text-[#8E8E98] flex items-center justify-between pt-1">
                <span>
                  Found {filteredArticles.length} matching {filteredArticles.length === 1 ? 'guide' : 'guides'} for "{searchQuery}"
                </span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-[#0071E3] dark:text-[#2997FF] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Layout: Sidebar + Active Article */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Article List Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {filteredArticles.length === 0 ? (
              <div className="p-6 rounded-xl bg-white dark:bg-[#0E0E16] border border-[#E5E5EA] dark:border-[#262638] text-center space-y-3 shadow-xs">
                <p className="text-sm font-semibold text-[#1D1D1F] dark:text-white">No matching guides found</p>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E98] leading-relaxed">
                  Try searching for keywords like "ChatGPT", "Claude", "AES-256", or "Recall".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-3 py-1.5 bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0D] rounded-lg text-xs font-medium"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredArticles.map((article) => {
                  const isSelected = currentArticle.slug === article.slug;
                  return (
                    <button
                      key={article.slug}
                      id={`guide-sidebar-${article.slug}`}
                      onClick={() => {
                        setSelectedSlug(article.slug);
                        window.scrollTo({ top: 220, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-white dark:bg-[#141420] border-[#1D1D1F] dark:border-[#2997FF] shadow-2xs ring-1 ring-[#1D1D1F]/10 dark:ring-[#2997FF]/20'
                          : 'bg-white dark:bg-[#0E0E16] border-[#E5E5EA] dark:border-[#262638] hover:border-[#D1D1D6] dark:hover:border-[#38384E]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] mb-1">
                        <span className="uppercase">{article.category}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3
                        className={`text-xs font-semibold leading-snug line-clamp-2 ${
                          isSelected ? 'text-[#1D1D1F] dark:text-white' : 'text-[#515154] dark:text-[#A1A1A6]'
                        }`}
                      >
                        {highlightMatch(article.title, searchQuery)}
                      </h3>
                      {searchQuery && (
                        <p className="text-[11px] text-[#86868B] dark:text-[#787884] line-clamp-1 mt-1 font-normal">
                          {highlightMatch(article.summary, searchQuery)}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Quick Extension CTA Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#0E0E16] border border-[#E5E5EA] dark:border-[#262638] text-center space-y-2.5 shadow-xs">
              <span className="text-xs font-semibold text-[#1D1D1F] dark:text-white block">
                Ready to try it in your browser?
              </span>
              <p className="text-[11px] text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
                Add ChatBridge to Chrome to carry context across ChatGPT, Claude, and Gemini in seconds.
              </p>
              <button
                id="sidebar-install-cta-btn"
                onClick={onOpenInstall}
                className="w-full py-2 rounded-full bg-[#1D1D1F] dark:bg-white hover:bg-[#333336] dark:hover:bg-[#E5E5EA] text-white dark:text-[#0A0A0D] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <DownloadIcon className="w-3.5 h-3.5 text-[#0071E3]" />
                <span>Add to Chrome</span>
              </button>
            </div>
          </div>

          {/* Right: Full Readable Article */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0E0E16] border border-[#E5E5EA] dark:border-[#262638] rounded-2xl p-6 sm:p-10 space-y-8 shadow-sm">
            {/* Article Meta */}
            <div className="space-y-3 pb-6 border-b border-[#E5E5EA] dark:border-[#222232]">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6E6E73] dark:text-[#8E8E98]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#F5F5F7] dark:bg-[#181826] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-[#28283C] font-mono text-[11px]">
                    {currentArticle.category}
                  </span>
                  <span>{currentArticle.readTime}</span>
                  <span>•</span>
                  <span>{currentArticle.date}</span>
                </div>

                <button
                  onClick={handleShare}
                  className="text-[#0071E3] dark:text-[#2997FF] hover:underline flex items-center gap-1 text-xs"
                  title="Copy permanent link"
                >
                  {copiedLink ? <CheckIcon className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" /> : <CopyIcon className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share Article'}</span>
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white leading-tight">
                {currentArticle.title}
              </h2>
              <p className="text-sm text-[#6E6E73] dark:text-[#8E8E98]">
                {currentArticle.subtitle}
              </p>
            </div>

            {/* TL;DR Summary Box */}
            <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-[#14141E] border border-[#E5E5EA] dark:border-[#262638] text-xs text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
              <strong className="text-[#1D1D1F] dark:text-white block mb-0.5 font-medium">Summary Overview</strong>
              {currentArticle.summary}
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-[#515154] dark:text-[#C7C7CC] text-sm leading-relaxed">
              {currentArticle.content.map((sec, idx) => (
                <div key={idx} className="space-y-2.5">
                  <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-white">{sec.heading}</h3>
                  {sec.body.map((para, pIdx) => (
                    <p key={pIdx}>
                      {para}
                    </p>
                  ))}

                  {sec.callout && (
                    <div className="p-3.5 rounded-lg bg-[#F5F5F7] dark:bg-[#141420] border-l-2 border-[#1D1D1F] dark:border-[#2997FF] text-xs font-mono text-[#1D1D1F] dark:text-[#E5E5EA]">
                      {sec.callout}
                    </div>
                  )}

                  {sec.codeSnippet && (
                    <div className="relative group/snippet rounded-lg overflow-hidden border border-[#E5E5EA] dark:border-[#262638]">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-[#EBEBED] dark:bg-[#161624] text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] border-b border-[#E5E5EA] dark:border-[#262638]">
                        <span>Code Reference</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(sec.codeSnippet || '');
                            toast.copied('Code snippet copied to clipboard!', 'Ready to use in your terminal or prompt.');
                          }}
                          className="hover:text-[#1D1D1F] dark:hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                        >
                          <CopyIcon className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre className="p-3.5 bg-[#F5F5F7] dark:bg-[#101018] text-xs font-mono text-[#1D1D1F] dark:text-[#E5E5EA] overflow-x-auto">
                        <code>{sec.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Article Navigation / Conversion */}
            <div className="pt-6 border-t border-[#E5E5EA] dark:border-[#222232] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#6E6E73] dark:text-[#8E8E98] block">Experience Cross-Platform Continuity</span>
                <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white">Never re-explain your code or constraints again.</span>
              </div>
              <button
                onClick={onOpenInstall}
                className="px-4 py-2 rounded-full bg-[#1D1D1F] dark:bg-white hover:bg-[#333336] dark:hover:bg-[#E5E5EA] text-white dark:text-[#0A0A0D] font-medium text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs"
              >
                <DownloadIcon className="w-3.5 h-3.5 text-[#0071E3]" />
                <span>Add to Chrome</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
