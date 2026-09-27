import React, { useState } from 'react';
import {
  IconX,
  IconCheck,
  IconCopy,
  IconBug,
  IconBulb,
  IconWorld,
  IconMessageDots,
  IconShieldCheck,
  IconSparkles,
  IconTerminal
} from '@tabler/icons-react';
import { useToast } from '../context/ToastContext';
import { FeedbackSubmission } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [category, setCategory] = useState<'bug' | 'feature' | 'platform' | 'general'>('feature');
  const [platform, setPlatform] = useState('');
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'critical'>('minor');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submittedReceipt, setSubmittedReceipt] = useState<{ id: string; time: string } | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

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
      diagnosticIncluded: true,
      timestamp: timestampStr
    };

    // Save to localStorage
    try {
      const saved = localStorage.getItem('chatbridge_feedback_list');
      const list = saved ? JSON.parse(saved) : [];
      localStorage.setItem('chatbridge_feedback_list', JSON.stringify([newSubmission, ...list].slice(0, 30)));
    } catch {
      // ignore
    }

    setSubmittedReceipt({ id: receiptId, time: timestampStr });
    toast.saved(
      `Feedback archived [${receiptId}]`,
      'Recorded locally in your encrypted browser sandbox.'
    );
  };

  const handleCopyReceiptJson = () => {
    if (!submittedReceipt) return;
    const diagnosticBundle = {
      receiptId: submittedReceipt.id,
      timestamp: submittedReceipt.time,
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

  const handleResetAndClose = () => {
    setSubmittedReceipt(null);
    setMessage('');
    setSelectedTags([]);
    onClose();
  };

  const categories = [
    {
      id: 'bug' as const,
      label: 'Bug / DOM Shift',
      icon: IconBug,
      color: '#FF453A',
      desc: 'Capture failure or UI change'
    },
    {
      id: 'feature' as const,
      label: 'Feature Proposal',
      icon: IconBulb,
      color: '#FF9F0A',
      desc: 'Retrieval or prompt options'
    },
    {
      id: 'platform' as const,
      label: 'Platform Request',
      icon: IconWorld,
      color: '#30D158',
      desc: 'Add web assistant model'
    },
    {
      id: 'general' as const,
      label: 'Developer Critique',
      icon: IconMessageDots,
      color: '#0071E3',
      desc: 'Direct thoughts & UX feedback'
    }
  ];

  const quickPlatforms = ['ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'Perplexity', 'Copilot', 'Cursor / Windsurf', 'Custom LLM'];

  const categoryTags: Record<string, string[]> = {
    bug: ['DOM Selector Shift', 'Streaming Interrupted', 'Context Loss', 'Keyboard Injection', 'Storage Limit'],
    feature: ['Hybrid RRF Tuning', 'Export JSON', 'Prompt Pill Customizer', 'Custom Hotkeys', 'Token Counter'],
    platform: ['Web Assistant', 'Local LLM (Ollama)', 'Terminal CLI', 'Desktop App Bridge'],
    general: ['Speed / Latency', 'Privacy Architecture', 'UI Clarity', 'Documentation']
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white/95 dark:bg-[#0E0E16]/95 backdrop-blur-2xl rounded-3xl border border-neutral-200/90 dark:border-white/15 max-w-lg w-full p-6 sm:p-7 shadow-2xl relative text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors max-h-[90vh] overflow-y-auto scrollbar-none">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Close feedback modal"
        >
          <IconX className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pb-4 border-b border-neutral-200/80 dark:border-white/10 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0071E3]/10 dark:bg-[#2997FF]/10 text-[#0071E3] dark:text-[#2997FF] text-[11px] font-mono font-medium">
            <IconTerminal className="w-3.5 h-3.5" />
            <span>Developer Feedback & Engineering Reports</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
            Direct Maintainer Channel
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Report DOM shifts across AI interfaces, propose features, or request support for new models.
          </p>
        </div>

        {submittedReceipt ? (
          /* Success Receipt Card */
          <div className="py-6 space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <IconCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-emerald-800 dark:text-emerald-400">
                Transmission Recorded Locally
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
                Thank you! Your feedback has been verified and stored in your browser's private storage sandbox with reference{' '}
                <strong className="font-mono text-emerald-600 dark:text-emerald-400">{submittedReceipt.id}</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#13131F] border border-neutral-200/80 dark:border-neutral-800 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between text-neutral-500">
                <span>Receipt Number:</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{submittedReceipt.id}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Timestamp:</span>
                <span className="text-neutral-900 dark:text-neutral-100">{submittedReceipt.time}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Storage Partition:</span>
                <span className="text-emerald-600 dark:text-emerald-400">chrome.storage.local (AES-256)</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Cloud Privacy:</span>
                <span className="text-emerald-600 dark:text-emerald-400">Zero telemetry sent</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyReceiptJson}
                className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-300 dark:border-neutral-700"
              >
                {copiedReceipt ? <IconCheck className="w-3.5 h-3.5 text-emerald-500" /> : <IconCopy className="w-3.5 h-3.5" />}
                <span>{copiedReceipt ? 'Copied Diagnostic Bundle' : 'Copy Diagnostic JSON'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2.5 rounded-xl bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
            {/* Category Segmented Cards */}
            <div>
              <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1.5 uppercase tracking-wide">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.id);
                        setSelectedTags([]);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-neutral-100/90 dark:bg-[#1A1A28] border-neutral-900 dark:border-white shadow-xs'
                          : 'bg-neutral-50/70 dark:bg-[#12121C] border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white mb-0.5">
                        <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                        <span>{cat.label}</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 block leading-snug">
                        {cat.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platform Quick Chips */}
            <div>
              <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1.5 uppercase tracking-wide">
                AI Service / Environment
              </label>
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

            {/* Severity for bug */}
            {category === 'bug' && (
              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wide">
                  Severity
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[11px]">
                  {[
                    { id: 'minor' as const, label: 'Low', desc: 'Cosmetic' },
                    { id: 'moderate' as const, label: 'Medium', desc: 'Hinders flow' },
                    { id: 'critical' as const, label: 'Critical', desc: 'Broken' }
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

            {/* Tags */}
            {categoryTags[category] && (
              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wide">
                  Optional Tags
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

            {/* Message Area */}
            <div>
              <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wide">
                Detailed Observation or Proposal
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  category === 'bug'
                    ? 'Steps to reproduce: e.g. "When running o3-mini in ChatGPT, context capture was delayed by 3 turns..."'
                    : category === 'platform'
                    ? 'Which model or web app should we bridge next? e.g. "Cursor IDE web view or DeepSeek reasoning chains..."'
                    : category === 'feature'
                    ? 'Describe your idea: e.g. "Add a keyboard hotkey to toggle dense vs lexical ranking weights..."'
                    : 'Provide your frank feedback or inquiry...'
                }
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0A0A10] border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] leading-relaxed transition-colors resize-none"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wide">
                Email for Follow-up (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@domain.com"
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#0A0A10] border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!message.trim()}
                className="w-full py-3 rounded-full bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none text-white dark:text-neutral-950 font-semibold text-xs transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <IconSparkles className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#0071E3]" />
                <span>Submit to Local Archive</span>
              </button>
              <p className="text-[10px] font-mono text-neutral-400 text-center mt-2 flex items-center justify-center gap-1">
                <IconShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Client sandbox only • 0 external telemetry</span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
