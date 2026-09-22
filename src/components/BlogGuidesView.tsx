import React, { useState } from 'react';
import { GUIDE_ARTICLES } from '../data/mockData';
import { GuideSlug } from '../types';
import { DownloadIcon, CheckIcon, CopyIcon, SearchIcon } from './Icons';

interface BlogGuidesViewProps {
  initialSlug?: GuideSlug;
  onOpenInstall: () => void;
}

export const BlogGuidesView: React.FC<BlogGuidesViewProps> = ({ initialSlug, onOpenInstall }) => {
  const [selectedSlug, setSelectedSlug] = useState<GuideSlug>(initialSlug || 'chatgpt-to-claude');
  const [copiedLink, setCopiedLink] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const currentArticle = GUIDE_ARTICLES.find((a) => a.slug === selectedSlug) || GUIDE_ARTICLES[0];

  const filteredArticles = GUIDE_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(filterQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '#' + currentArticle.slug);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="py-20 md:py-28 bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-mono font-medium tracking-wide text-[#6E6E73] uppercase">
            Documentation and Guides
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F]">
            Conversational memory workflows.
          </h1>
          <p className="text-base text-[#515154] leading-relaxed">
            Practical workflows and engineering essays on cross-platform AI continuity, local-first retrieval, and multi-model knowledge work.
          </p>
        </div>

        {/* Layout: Sidebar + Active Article */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Article List Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <SearchIcon className="w-4 h-4 text-[#86868B] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search guides..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#D1D1D6] rounded-lg text-xs text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3]"
              />
            </div>

            <div className="space-y-2">
              {filteredArticles.map((article) => {
                const isSelected = selectedSlug === article.slug;
                return (
                  <button
                    key={article.slug}
                    id={`guide-sidebar-${article.slug}`}
                    onClick={() => {
                      setSelectedSlug(article.slug);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-white border-[#1D1D1F] shadow-2xs'
                        : 'bg-white border-[#E5E5EA] hover:border-[#D1D1D6]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] mb-1">
                      <span className="uppercase">{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className={`text-xs font-semibold leading-snug line-clamp-2 ${isSelected ? 'text-[#1D1D1F]' : 'text-[#515154]'}`}>
                      {article.title}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Quick Extension CTA Card */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E5EA] text-center space-y-2.5 shadow-xs">
              <span className="text-xs font-semibold text-[#1D1D1F] block">
                Ready to try it in your browser?
              </span>
              <p className="text-[11px] text-[#515154] leading-relaxed">
                Add ChatBridge to Chrome to carry context across ChatGPT, Claude, and Gemini in seconds.
              </p>
              <button
                id="sidebar-install-cta-btn"
                onClick={onOpenInstall}
                className="w-full py-2 rounded-full bg-[#1D1D1F] hover:bg-[#333336] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Add to Chrome</span>
              </button>
            </div>
          </div>

          {/* Right: Full Readable Article */}
          <div className="lg:col-span-8 bg-white border border-[#E5E5EA] rounded-xl p-6 sm:p-10 space-y-8 shadow-sm">
            {/* Article Meta */}
            <div className="space-y-3 pb-6 border-b border-[#E5E5EA]">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6E6E73]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA] font-mono text-[11px]">
                    {currentArticle.category}
                  </span>
                  <span>{currentArticle.readTime}</span>
                  <span>•</span>
                  <span>{currentArticle.date}</span>
                </div>

                <button
                  onClick={handleShare}
                  className="text-[#0071E3] hover:underline flex items-center gap-1 text-xs"
                  title="Copy permanent link"
                >
                  {copiedLink ? <CheckIcon className="w-3.5 h-3.5 text-[#0071E3]" /> : <CopyIcon className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share Article'}</span>
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
                {currentArticle.title}
              </h2>
              <p className="text-sm text-[#6E6E73]">
                {currentArticle.subtitle}
              </p>
            </div>

            {/* TL;DR Box */}
            <div className="p-4 rounded-lg bg-[#F5F5F7] border border-[#E5E5EA] text-xs text-[#515154] leading-relaxed">
              <strong className="text-[#1D1D1F] block mb-0.5">Summary:</strong>
              {currentArticle.summary}
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-[#515154] text-sm leading-relaxed">
              {currentArticle.content.map((sec, idx) => (
                <div key={idx} className="space-y-2.5">
                  <h3 className="text-base font-semibold text-[#1D1D1F]">{sec.heading}</h3>
                  {sec.body.map((para, pIdx) => (
                    <p key={pIdx}>
                      {para}
                    </p>
                  ))}

                  {sec.callout && (
                    <div className="p-3.5 rounded-lg bg-[#F5F5F7] border-l-2 border-[#1D1D1F] text-xs font-mono text-[#1D1D1F]">
                      {sec.callout}
                    </div>
                  )}

                  {sec.codeSnippet && (
                    <pre className="p-3.5 bg-[#F5F5F7] rounded-lg border border-[#E5E5EA] text-xs font-mono text-[#1D1D1F] overflow-x-auto">
                      <code>{sec.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Article Conversion Banner */}
            <div className="pt-6 border-t border-[#E5E5EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#6E6E73] block">Experience Cross-Platform Continuity</span>
                <span className="text-sm font-semibold text-[#1D1D1F]">Never re-explain your code or constraints again.</span>
              </div>
              <button
                onClick={onOpenInstall}
                className="px-4 py-2 rounded-full bg-[#1D1D1F] hover:bg-[#333336] text-white font-medium text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Add to Chrome</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
