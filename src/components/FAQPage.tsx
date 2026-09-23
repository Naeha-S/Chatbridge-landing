import React, { useState } from 'react';
import {
  DownloadIcon,
  SearchIcon,
  SparklesIcon,
  LockIcon,
  TerminalIcon,
  CheckIcon
} from './Icons';
import { CHROME_WEBSTORE_URL } from '../constants/links';

interface FAQPageProps {
  onOpenInstall: () => void;
  onNavigateHome: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({
  onOpenInstall,
  onNavigateHome
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'privacy', label: 'Privacy & Security' },
    { id: 'technical', label: 'Technical & Architecture' },
    { id: 'compatibility', label: 'Models & Compatibility' },
    { id: 'usage', label: 'Usage & Shortcuts' }
  ];

  const faqs = [
    {
      category: 'privacy',
      q: 'Does ChatBridge transmit any of my conversation data to a remote server?',
      a: 'Absolutely not. ChatBridge operates with zero remote telemetry, zero cloud databases, and zero analytics trackers. All captured transcripts and metadata are stored exclusively inside your browser’s isolated chrome.storage.local partition, protected with hardware-accelerated AES-256-GCM encryption.'
    },
    {
      category: 'privacy',
      q: 'Where are my encryption keys stored, and who can access them?',
      a: 'The AES-256-GCM cryptographic key is generated inside your device’s Chromium sandbox using the standard WebCrypto SubtleCrypto API (`window.crypto.subtle`). It is stored securely with extractable set to false. No one—not even the ChatBridge developers—can view your key or decrypt your records.'
    },
    {
      category: 'privacy',
      q: 'Can I delete all my stored conversation records at any time?',
      a: 'Yes. You can wipe your local memory index with a single click from the ChatBridge HUD settings or from the chrome://extensions page. Deleting the extension automatically destroys all local storage partitions and encryption keys instantly.'
    },
    {
      category: 'technical',
      q: 'What is Reciprocal Rank Fusion (RRF) and why does ChatBridge use it?',
      a: 'Reciprocal Rank Fusion (RRF) is an advanced information retrieval algorithm that combines multiple search rankings into a single, high-accuracy result list. ChatBridge runs BM25 lexical keyword search alongside 384-dimensional dense semantic vector similarity, yielding +3.9 percentage points higher recall (76.8% Recall@5 on LongMemEval) compared to standard vector-only databases.'
    },
    {
      category: 'technical',
      q: 'How fast is local memory retrieval on average computers?',
      a: 'Retrieval runs between 15ms and 30ms on modern client CPUs. Because vector dot products and BM25 postings are scored in the Chromium background service worker without network hops, searches feel instant.'
    },
    {
      category: 'compatibility',
      q: 'Which web AI interfaces does ChatBridge currently support?',
      a: 'ChatBridge natively supports OpenAI ChatGPT (chatgpt.com), Anthropic Claude (claude.ai), Google Gemini (gemini.google.com), DeepSeek Chat (chat.deepseek.com), and Perplexity AI (perplexity.ai).'
    },
    {
      category: 'compatibility',
      q: 'Will using ChatBridge get my ChatGPT or Claude account banned?',
      a: 'No. ChatBridge does not reverse-engineer private API endpoints, automate message posting, or violate rate limits. It functions strictly as a local productivity tool reading finalized HTML elements in your active tab, equivalent to standard browser translation or assistive accessibility tools.'
    },
    {
      category: 'usage',
      q: 'What is the default shortcut to summon past context?',
      a: 'The default global keyboard shortcut is Cmd+Shift+K on macOS and Ctrl+Shift+K on Windows and Linux. You can customize this shortcut at any time by navigating to chrome://extensions/shortcuts in your browser.'
    },
    {
      category: 'usage',
      q: 'How does ChatBridge compress prompt tokens before pasting into another model?',
      a: 'ChatBridge identifies repetitive conversational filler ("Certainly! I can help with that...", repeated code scaffolding, standard greetings) and isolates core technical parameters, architecture constraints, and code diffs into a dense context pill. This typically saves 90% to 95% of input tokens.'
    },
    {
      category: 'usage',
      q: 'Is ChatBridge free or does it require an API subscription?',
      a: 'ChatBridge is 100% free and open-source under the Apache-2.0 license. There are no monthly fees, no credit tiers, and no requirement to purchase OpenAI or Anthropic API credits.'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#1D1D1F] dark:text-[#F5F5F7]">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono text-[#86868B] flex items-center space-x-2">
        <button onClick={onNavigateHome} className="hover:text-[#2997FF] transition-colors">
          ChatBridge
        </button>
        <span>/</span>
        <span className="text-[#1D1D1F] dark:text-[#E5E5EA]">Support</span>
        <span>/</span>
        <span className="text-[#2997FF] font-medium">Frequently Asked Questions</span>
      </nav>

      {/* Hero Header */}
      <header className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2997FF]/10 text-[#2997FF] border border-[#2997FF]/25 text-xs font-mono mb-6">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Knowledge Base & Answers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight mb-5">
          Frequently Asked{' '}
          <span className="bg-gradient-to-r from-[#2997FF] via-[#5AC8FA] to-[#AF52DE] bg-clip-text text-transparent">
            Questions
          </span>
        </h1>

        <p className="text-lg text-[#86868B] leading-relaxed mb-8">
          Clear, transparent answers regarding ChatBridge's privacy guarantees, AES-256-GCM encryption,
          cross-model compatibility, and local retrieval architecture.
        </p>

        {/* Live Search Input */}
        <div className="relative max-w-xl mx-auto">
          <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B]" />
          <input
            type="text"
            placeholder="Search questions on privacy, shortcuts, models, or encryption..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#14141E] border border-[#D1D1D6] dark:border-[#2C2C3E] text-sm text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] focus:outline-none focus:border-[#2997FF] transition-colors"
          />
        </div>
      </header>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
              selectedCategory === cat.id
                ? 'bg-[#2997FF] text-white font-medium shadow-md shadow-[#2997FF]/20'
                : 'bg-white dark:bg-[#14141C] text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] border border-[#E5E5EA] dark:border-[#222230]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion Questions List */}
      <section className="space-y-4 max-w-3xl mx-auto mb-20">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-[#86868B]">
            <p>No questions matched your search query "{searchTerm}".</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-[#2997FF] underline"
            >
              Reset search filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#12121A] border border-[#E5E5EA] dark:border-[#222230] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-semibold text-base text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#2997FF] dark:hover:text-[#2997FF] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg font-mono text-[#86868B] shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#86868B] leading-relaxed border-t border-[#F2F2F7] dark:border-[#1E1E28]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* Bottom CTA */}
      <footer className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#2997FF]/10 via-[#1C1C26] to-[#0A0A0F] border border-[#2997FF]/20">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          Have more questions or want to test it yourself?
        </h2>
        <p className="text-sm text-[#86868B] max-w-xl mx-auto mb-6">
          ChatBridge takes less than 30 seconds to install from the Chrome Web Store.
        </p>
        <a
          href={CHROME_WEBSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenInstall}
          className="inline-flex items-center px-6 py-3 rounded-xl bg-[#2997FF] hover:bg-[#1E76D2] text-white font-medium shadow-lg transition-transform hover:scale-105"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          <span>Add ChatBridge to Chrome Free</span>
        </a>
      </footer>
    </article>
  );
};
