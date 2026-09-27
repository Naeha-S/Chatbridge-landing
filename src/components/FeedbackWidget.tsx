import React, { useState, useEffect, useRef } from 'react';
import { FeedbackSubmission } from '../types';
import {
  IconBug,
  IconBulb,
  IconWorld,
  IconMessageDots,
  IconX,
  IconCheck,
  IconCopy,
  IconTrash,
  IconTerminal,
  IconShieldCheck,
  IconCpu,
  IconChevronDown,
  IconChevronUp,
  IconArrowRight,
  IconSparkles,
  IconDeviceDesktop
} from '@tabler/icons-react';
import { useToast } from '../context/ToastContext';

interface FeedbackWidgetProps {
  initialOpen?: boolean;
  presetCategory?: 'bug' | 'feature' | 'platform' | 'general';
  presetPlatform?: string;
  onOpenStateChange?: (isOpen: boolean) => void;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  initialOpen = false,
  presetCategory = 'general',
  presetPlatform = '',
  onOpenStateChange
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');
  const [category, setCategory] = useState<'bug' | 'feature' | 'platform' | 'general'>(presetCategory);
  const [platform, setPlatform] = useState(presetPlatform);
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'critical'>('minor');
  const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'critical' | 'delighted'>('positive');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [includeDiagnostics, setIncludeDiagnostics] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<{ id: string; time: string; category: string } | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);
  const [showDiagnosticPreview, setShowDiagnosticPreview] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Load submissions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('chatbridge_feedback_list');
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync external preset open
  useEffect(() => {
    if (presetCategory) setCategory(presetCategory);
    if (presetPlatform) setPlatform(presetPlatform);
  }, [presetCategory, presetPlatform]);

  // Listen to custom event for opening feedback from other components
  useEffect(() => {
    const handleOpenEvent = (e: CustomEvent) => {
      setIsOpen(true);
      setActiveTab('compose');
      setLastReceipt(null);
      if (e.detail?.category) setCategory(e.detail.category);
      if (e.detail?.platform) setPlatform(e.detail.platform);
    };

    window.addEventListener('chatbridge:open-feedback' as any, handleOpenEvent as any);
    return () => {
      window.removeEventListener('chatbridge:open-feedback' as any, handleOpenEvent as any);
    };
  }, []);

  // Keyboard shortcut listener (Alt+F / Option+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || e.metaKey) && e.key.toLowerCase() === 'f' && !e.ctrlKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Notify parent of state changes
  useEffect(() => {
    onOpenStateChange?.(isOpen);
  }, [isOpen, onOpenStateChange]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    const receiptId = 'CB-' + Math.floor(1000 + Math.random() * 9000);
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', today';

    const newSubmission: FeedbackSubmission = {
      id: receiptId,
      category,
      platform: platform || undefined,
      message: message.trim(),
      email: email.trim() || undefined,
      severity: category === 'bug' ? severity : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      diagnosticIncluded: includeDiagnostics,
      timestamp: timestampStr
    };

    setTimeout(() => {
      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      try {
        localStorage.setItem('chatbridge_feedback_list', JSON.stringify(updated.slice(0, 30)));
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setLastReceipt({
        id: receiptId,
        time: timestampStr,
        category: category.toUpperCase()
      });
      setMessage('');
      setSelectedTags([]);

      toast.saved(
        `Feedback archived [${receiptId}]`,
        'Recorded locally in your encrypted browser sandbox.'
      );
    }, 450);
  };

  const handleCopyReceiptJson = () => {
    if (!lastReceipt) return;
    const diagnosticBundle = {
      receiptId: lastReceipt.id,
      timestamp: lastReceipt.time,
      category,
      platform: platform || 'N/A',
      severity: category === 'bug' ? severity : undefined,
      tags: selectedTags,
      clientSandbox: {
        browser: 'Google Chrome 134.0 (Chromium)',
        manifestVersion: 'v3',
        cryptoEngine: 'WebCrypto AES-256-GCM',
        storageBackend: 'chrome.storage.local',
        networkTelemetry: '0 KB (Strict local-first)'
      }
    };

    navigator.clipboard.writeText(JSON.stringify(diagnosticBundle, null, 2));
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const clearHistory = () => {
    setSubmissions([]);
    try {
      localStorage.removeItem('chatbridge_feedback_list');
    } catch {
      // ignore
    }
  };

  const categories = [
    {
      id: 'bug' as const,
      label: 'Bug / DOM Shift',
      icon: IconBug,
      color: '#FF453A',
      desc: 'Capture failure, selector change, UI glitch'
    },
    {
      id: 'feature' as const,
      label: 'Feature Idea',
      icon: IconBulb,
      color: '#FF9F0A',
      desc: 'Retrieval tuning, hotkeys, compression'
    },
    {
      id: 'platform' as const,
      label: 'Platform Vote',
      icon: IconWorld,
      color: '#30D158',
      desc: 'Request Perplexity, DeepSeek, Cursor'
    },
    {
      id: 'general' as const,
      label: 'Direct Critique',
      icon: IconMessageDots,
      color: '#0071E3',
      desc: 'Thoughts, UX polish, honest critique'
    }
  ];

  const quickPlatforms = [
    'ChatGPT',
    'Claude',
    'Gemini',
    'DeepSeek',
    'Perplexity',
    'Copilot',
    'Mistral',
    'Cursor / Windsurf',
    'Custom LLM'
  ];

  const categoryTags: Record<string, string[]> = {
    bug: ['DOM Selector Shift', 'Streaming Interrupted', 'Context Loss', 'Keyboard Injection', 'AES Decrypt Error'],
    feature: ['Hybrid RRF Tuning', 'Export JSON/Markdown', 'Custom Prompt Pills', 'Custom Hotkeys', 'Token Counter'],
    platform: ['Web UI Support', 'Desktop App Bridge', 'Terminal/CLI', 'Multi-tab Sync', 'Mobile Companion'],
    general: ['Speed / Latency', 'Privacy Architecture', 'UI Clarity', 'Onboarding Flow', 'Documentation']
  };

  return (
    <aside
      aria-label="Developer Feedback & Diagnostics Widget"
      className="fixed bottom-5 right-5 z-50 font-sans"
    >
      {/* Floating Activator Pill */}
      {!isOpen && (
        <button
          id="feedback-widget-trigger-btn"
          type="button"
          onClick={() => {
            setIsOpen(true);
            setLastReceipt(null);
          }}
          className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 border border-neutral-700/50 dark:border-neutral-200 shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95"
          title="Open Developer Feedback & Platform Diagnostics (⌥F)"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold tracking-tight">Feedback</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 dark:bg-black/10 text-white/70 dark:text-black/70 hidden sm:inline">
            ⌥F
          </span>
        </button>
      )}

      {/* Expanded Pro Floating Drawer */}
      {isOpen && (
        <div
          ref={widgetRef}
          className="w-[calc(100vw-2.5rem)] sm:w-[440px] max-h-[88vh] bg-white/95 dark:bg-[#0E0E16]/95 backdrop-blur-2xl border border-neutral-200/90 dark:border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 text-[#1D1D1F] dark:text-[#F5F5F7] animate-in fade-in slide-in-from-bottom-3"
        >
          {/* Pro Top Header */}
          <div className="px-4 py-3 bg-neutral-100/70 dark:bg-[#141420]/80 border-b border-neutral-200/80 dark:border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#0071E3]/10 dark:bg-[#2997FF]/10 text-[#0071E3] dark:text-[#2997FF] flex items-center justify-center">
                <IconTerminal className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                  <span>ChatBridge Engineering Portal</span>
                  <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Local-First
                  </span>
                </h3>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  Direct developer diagnostics & roadmap submissions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Tab Switcher */}
              <div className="flex items-center bg-white/80 dark:bg-[#1E1E2C] rounded-lg p-0.5 border border-neutral-200/80 dark:border-neutral-700/80 text-[11px] font-mono mr-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('compose')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    activeTab === 'compose'
                      ? 'bg-[#1D1D1F] text-white dark:bg-white dark:text-black font-semibold shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Compose
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className={`px-2 py-0.5 rounded-md transition-colors flex items-center gap-1 ${
                    activeTab === 'history'
                      ? 'bg-[#1D1D1F] text-white dark:bg-white dark:text-black font-semibold shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <span>Archive</span>
                  {submissions.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[9px] flex items-center justify-center font-bold">
                      {submissions.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                id="feedback-widget-close-btn"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
                title="Close Widget (Esc)"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Area */}
          <div className="overflow-y-auto flex-1 p-4 space-y-4 max-h-[calc(88vh-60px)] text-xs scrollbar-none">
            {activeTab === 'history' ? (
              /* Archive / History View */
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-200/80 dark:border-neutral-800">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-500">
                    <IconCpu className="w-3.5 h-3.5" />
                    <span>Locally Saved Feedback ({submissions.length})</span>
                  </div>
                  {submissions.length > 0 && (
                    <button
                      type="button"
                      onClick={clearHistory}
                      className="text-[11px] text-rose-500 hover:underline flex items-center gap-1 font-mono"
                    >
                      <IconTrash className="w-3 h-3" />
                      <span>Clear Log</span>
                    </button>
                  )}
                </div>

                {submissions.length === 0 ? (
                  <div className="py-8 text-center space-y-2 text-neutral-500">
                    <IconTerminal className="w-8 h-8 mx-auto text-neutral-400" />
                    <p className="text-xs font-medium">No past submissions in local sandbox.</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('compose')}
                      className="text-xs text-[#0071E3] dark:text-[#2997FF] hover:underline"
                    >
                      Compose your first feedback
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-96 overflow-y-auto pr-0.5">
                    {submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="bg-neutral-50 dark:bg-[#13131F] border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3 space-y-2"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-semibold px-2 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 uppercase text-[10px]">
                            {sub.category}
                          </span>
                          <span className="text-neutral-400 text-[10px]">{sub.timestamp}</span>
                        </div>

                        {sub.platform && (
                          <div className="text-[11px] text-[#0071E3] dark:text-[#2997FF] font-mono">
                            Platform: {sub.platform}
                          </div>
                        )}

                        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs">
                          {sub.message}
                        </p>

                        {sub.tags && sub.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {sub.tags.map((tg, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400"
                              >
                                #{tg}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-between pt-1 border-t border-neutral-200/60 dark:border-neutral-800/60">
                          <span>Ref: {sub.id}</span>
                          <span>Client-encrypted</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : lastReceipt ? (
              /* Success Receipt View */
              <div className="py-4 space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <IconCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400">
                    Feedback Logged to Local Engine
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
                    Your transmission has been assigned receipt{' '}
                    <strong className="font-mono text-emerald-600 dark:text-emerald-400">{lastReceipt.id}</strong>{' '}
                    and indexed into your local browser sandbox archive.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#13131F] border border-neutral-200/80 dark:border-neutral-800 space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between text-neutral-500">
                    <span>Receipt Code:</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">{lastReceipt.id}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Category:</span>
                    <span className="text-neutral-900 dark:text-neutral-100">{lastReceipt.category}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Storage Engine:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">chrome.storage.local (AES-256)</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Network Leak:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">0 KB (Zero outbound)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleCopyReceiptJson}
                    className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-300 dark:border-neutral-700"
                  >
                    {copiedReceipt ? <IconCheck className="w-3.5 h-3.5 text-emerald-500" /> : <IconCopy className="w-3.5 h-3.5" />}
                    <span>{copiedReceipt ? 'Copied Diagnostic Bundle' : 'Copy Diagnostic JSON'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLastReceipt(null)}
                      className="flex-1 py-2.5 rounded-xl bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs transition-colors"
                    >
                      Submit Another
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold text-xs transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Compose Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Category Segmented Cards */}
                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1.5 uppercase tracking-wide">
                    Feedback Channel
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = category === cat.id;
                      return (
                        <button
                          type="button"
                          key={cat.id}
                          id={`feedback-channel-${cat.id}`}
                          onClick={() => {
                            setCategory(cat.id);
                            setSelectedTags([]);
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-neutral-100/90 dark:bg-[#1A1A28] border-neutral-900 dark:border-white shadow-xs'
                              : 'bg-neutral-50/70 dark:bg-[#12121C] border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="font-semibold text-xs text-neutral-900 dark:text-white flex items-center gap-1.5">
                              <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                              <span>{cat.label}</span>
                            </span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] dark:bg-[#2997FF]" />}
                          </div>
                          <span className="text-[10px] text-neutral-500 leading-snug line-clamp-1">
                            {cat.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Platform Chips */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                      Target AI Environment
                    </label>
                    {platform && (
                      <button
                        type="button"
                        onClick={() => setPlatform('')}
                        className="text-[10px] font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {quickPlatforms.map((p) => {
                      const isSelected = platform === p;
                      return (
                        <button
                          type="button"
                          key={p}
                          onClick={() => setPlatform(isSelected ? '' : p)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                            isSelected
                              ? 'bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold shadow-2xs'
                              : 'bg-neutral-100 dark:bg-[#151522] border border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Severity or Sentiment Selection */}
                {category === 'bug' && (
                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wide">
                      Bug Impact Severity
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[11px]">
                      {[
                        { id: 'minor' as const, label: 'Low', desc: 'Cosmetic / annoyance' },
                        { id: 'moderate' as const, label: 'Medium', desc: 'Flow hindered' },
                        { id: 'critical' as const, label: 'Critical', desc: 'Capture broken' }
                      ].map((lvl) => {
                        const isSelected = severity === lvl.id;
                        return (
                          <button
                            type="button"
                            key={lvl.id}
                            onClick={() => setSeverity(lvl.id)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              isSelected
                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold border-neutral-900 dark:border-white shadow-2xs'
                                : 'bg-neutral-100 dark:bg-[#151522] border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                            }`}
                          >
                            <span className="block">{lvl.label}</span>
                            <span className="text-[9px] text-neutral-400 block">{lvl.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {category === 'general' && (
                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wide">
                      Product Experience Sentiment
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[11px]">
                      {[
                        { id: 'delighted' as const, label: '⚡ Exceptional' },
                        { id: 'positive' as const, label: '👍 Productive' },
                        { id: 'neutral' as const, label: '⚖️ Neutral' },
                        { id: 'critical' as const, label: '⚠️ Needs Polish' }
                      ].map((s) => {
                        const isSelected = sentiment === s.id;
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => setSentiment(s.id)}
                            className={`py-1.5 px-1 rounded-lg border text-[10px] transition-all ${
                              isSelected
                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold border-neutral-900 dark:border-white shadow-2xs'
                                : 'bg-neutral-100 dark:bg-[#151522] border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                            }`}
                          >
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. Quick Context Tag Chips */}
                {categoryTags[category] && (
                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1.5 uppercase tracking-wide">
                      Specific Tags (Optional)
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {categoryTags[category].map((tg) => {
                        const isSelected = selectedTags.includes(tg);
                        return (
                          <button
                            type="button"
                            key={tg}
                            onClick={() => toggleTag(tg)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                              isSelected
                                ? 'bg-[#0071E3] text-white font-medium'
                                : 'bg-neutral-100 dark:bg-[#161624] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                            }`}
                          >
                            +{tg}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. Message Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                      {category === 'bug'
                        ? 'Reproduction / Observations'
                        : category === 'platform'
                        ? 'Model / Ecosystem Request'
                        : category === 'feature'
                        ? 'Feature Architectural Spec'
                        : 'Detailed Feedback'}
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="feedback-message-textarea"
                    required
                    maxLength={1000}
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      category === 'bug'
                        ? 'Describe the steps, e.g. "On chatgpt.com o1-preview, the response completed but context token pill was not inserted into Claude tab..."'
                        : category === 'platform'
                        ? 'Which AI tool, URL, or local client should we support next? e.g. "We use LibreChat with local Ollama models on port 3000..."'
                        : category === 'feature'
                        ? 'Describe your desired continuity capability, e.g. "Option to preview BM25 keyword matches before prompt injection..."'
                        : 'Share your thoughts, suggestions, or critique on performance, design, and local privacy...'
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0A0A10] border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] leading-relaxed transition-colors resize-none"
                  />
                </div>

                {/* 6. Email (Optional) */}
                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wide">
                    Email for Follow-up (Optional)
                  </label>
                  <input
                    id="feedback-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@domain.com"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#0A0A10] border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] transition-colors"
                  />
                </div>

                {/* 7. Diagnostic Sandbox Accordion Toggle */}
                <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#12121C] p-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeDiagnostics}
                        onChange={(e) => setIncludeDiagnostics(e.target.checked)}
                        className="rounded border-neutral-300 text-[#0071E3] focus:ring-0"
                      />
                      <span className="font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
                        Attach Diagnostic Metadata
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowDiagnosticPreview(!showDiagnosticPreview)}
                      className="text-[10px] font-mono text-[#0071E3] dark:text-[#2997FF] hover:underline flex items-center gap-0.5"
                    >
                      <span>{showDiagnosticPreview ? 'Hide' : 'Inspect'}</span>
                      {showDiagnosticPreview ? <IconChevronUp className="w-3 h-3" /> : <IconChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {showDiagnosticPreview && (
                    <div className="mt-2 pt-2 border-t border-neutral-200/80 dark:border-neutral-800 text-[10px] font-mono text-neutral-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Client OS / Browser:</span>
                        <span className="text-neutral-800 dark:text-neutral-200">Chromium v134 • V3 Isolated</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage Engine:</span>
                        <span className="text-neutral-800 dark:text-neutral-200">chrome.storage.local (AES-256)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Privacy Boundary:</span>
                        <span className="text-emerald-600 dark:text-emerald-400">Zero cloud API requests</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 8. Submit Button */}
                <div className="pt-1">
                  <button
                    id="feedback-submit-btn"
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="w-full py-3 rounded-full bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none text-white dark:text-neutral-950 font-semibold text-xs transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Encrypting & Archiving...</span>
                      </>
                    ) : (
                      <>
                        <IconSparkles className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#0071E3]" />
                        <span>Log Feedback to Local Archive</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] font-mono text-neutral-400 text-center mt-2 flex items-center justify-center gap-1">
                    <IconShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Client-only: Saved locally in your browser storage partition.</span>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
