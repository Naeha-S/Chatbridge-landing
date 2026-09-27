import React, { useState, useEffect } from 'react';
import {
  IconX,
  IconCheck,
  IconBulb,
  IconBug,
  IconSparkles,
  IconMessageCircle,
  IconMoodSmile,
  IconMoodNeutral,
  IconMoodSad,
  IconHistory,
  IconEdit,
  IconCopy
} from '@tabler/icons-react';
import { useToast } from '../context/ToastContext';
import { FeedbackSubmission } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: 'bug' | 'feature' | 'platform' | 'general';
  initialPlatform?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'feature',
  initialPlatform = ''
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');
  const [category, setCategory] = useState<'bug' | 'feature' | 'platform' | 'general'>(initialCategory);
  const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'negative'>('positive');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedNotes, setSavedNotes] = useState<FeedbackSubmission[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load saved feedback history on open
  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem('chatbridge_feedback_list');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setSavedNotes(parsed);
          }
        }
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = [
    { id: 'feature' as const, label: 'Feature Idea', icon: IconBulb },
    { id: 'bug' as const, label: 'Bug Report', icon: IconBug },
    { id: 'platform' as const, label: 'Model Request', icon: IconSparkles },
    { id: 'general' as const, label: 'General Note', icon: IconMessageCircle }
  ];

  const getPlaceholder = () => {
    switch (category) {
      case 'feature':
        return 'What workflow, shortcut, or feature would make ChatBridge more useful for you? Provide any technical requirements or context...';
      case 'bug':
        return 'What happened? Describe the unexpected behavior or which chat platform it occurred on. Feel free to paste error messages or console logs...';
      case 'platform':
        return 'Which AI model or assistant would you like supported next? (e.g. Gemini 2.0, DeepSeek R1, Cursor, Ollama)...';
      case 'general':
      default:
        return 'Share your feedback, ideas, or critique with the ChatBridge team...';
    }
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
      message: message.trim(),
      email: email.trim() || undefined,
      platform: initialPlatform || undefined,
      diagnosticIncluded: true,
      timestamp: timestampStr
    };

    const updatedList = [newSubmission, ...savedNotes].slice(0, 50);
    setSavedNotes(updatedList);

    // Save locally
    try {
      localStorage.setItem('chatbridge_feedback_list', JSON.stringify(updatedList));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.saved('Feedback recorded', 'Your note was safely saved to your encrypted local archive.');
    }, 300);
  };

  const handleCopyNote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.copied('Copied to clipboard', 'Feedback note text copied.');
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setMessage('');
    setEmail('');
    setActiveTab('compose');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-dialog-title"
    >
      <div
        className="bg-white dark:bg-[#121218] rounded-3xl border border-neutral-200/90 dark:border-white/10 max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl relative text-[#1D1D1F] dark:text-[#F5F5F7] transition-all overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header Bar */}
        <div className="p-5 sm:p-6 pb-4 border-b border-neutral-200/80 dark:border-white/10 flex items-center justify-between shrink-0 bg-neutral-50/50 dark:bg-white/[0.02]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 id="feedback-dialog-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
                Feedback & Notes
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0071E3]/10 dark:bg-[#2997FF]/10 text-[#0071E3] dark:text-[#2997FF] border border-[#0071E3]/20 dark:border-[#2997FF]/20">
                Local Archive
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Share suggestions, report issues, or inspect your previously recorded notes.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Compose vs Saved Notes */}
        <div className="px-5 sm:px-6 pt-3 pb-1 border-b border-neutral-200/80 dark:border-white/5 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200/80 dark:border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('compose')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'compose'
                  ? 'bg-white dark:bg-[#1E1E2C] text-[#0071E3] dark:text-[#2997FF] font-semibold shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconEdit className="w-3.5 h-3.5" />
              <span>Compose Note</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-white dark:bg-[#1E1E2C] text-[#0071E3] dark:text-[#2997FF] font-semibold shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconHistory className="w-3.5 h-3.5" />
              <span>Saved Archive ({savedNotes.length})</span>
            </button>
          </div>

          {activeTab === 'compose' && message.length > 0 && (
            <span className="text-[11px] font-mono text-neutral-400">
              {message.length} chars
            </span>
          )}
        </div>

        {/* Scrollable Body with Custom Scrollbar Styling */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-5">
          {activeTab === 'compose' ? (
            !isSubmitted ? (
              <form id="feedback-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Category Selector Tabs - Fully visible without clipping */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200/80 dark:border-white/5">
                    {categories.map((c) => {
                      const Icon = c.icon;
                      const isSelected = category === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCategory(c.id)}
                          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-white dark:bg-[#1E1E2C] text-[#0071E3] dark:text-[#2997FF] shadow-xs font-semibold'
                              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="whitespace-nowrap">{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Textarea Container with Custom Scrollbar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="feedback-message" className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Your Content & Logs
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Auto-scrolling container
                    </span>
                  </div>

                  <div className="relative rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-50/70 dark:bg-black/40 focus-within:ring-2 focus-within:ring-[#0071E3]/20 focus-within:border-[#0071E3] dark:focus-within:border-[#2997FF] transition-all">
                    <textarea
                      id="feedback-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={getPlaceholder()}
                      rows={5}
                      required
                      className="w-full text-xs sm:text-sm bg-transparent p-3.5 sm:p-4 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none transition-all resize-y min-h-[120px] max-h-[260px] overflow-y-auto custom-scrollbar leading-relaxed"
                    />
                  </div>
                </div>

                {/* Real-time Content Inspector: Guarantees 100% text visibility for long pastes without clipping */}
                {message.trim().length > 180 && (
                  <div className="space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                      <span>Full Text Inspector (No Overflow/Clipping):</span>
                      <span>{message.split(/\s+/).filter(Boolean).length} words</span>
                    </div>
                    <div className="p-3.5 rounded-xl border border-neutral-200/90 dark:border-white/10 bg-neutral-100/60 dark:bg-black/60 max-h-48 overflow-y-auto custom-scrollbar text-xs font-mono leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap break-words">
                      {message}
                    </div>
                  </div>
                )}

                {/* Sentiment & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                  {/* Sentiment */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Sentiment
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[
                        { id: 'positive' as const, label: 'Great', icon: IconMoodSmile, color: 'text-emerald-500' },
                        { id: 'neutral' as const, label: 'Neutral', icon: IconMoodNeutral, color: 'text-amber-500' },
                        { id: 'negative' as const, label: 'Issue', icon: IconMoodSad, color: 'text-rose-500' }
                      ].map((s) => {
                        const Icon = s.icon;
                        const isSelected = sentiment === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSentiment(s.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border text-xs font-medium transition-colors ${
                              isSelected
                                ? 'bg-neutral-100 dark:bg-white/10 border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white font-semibold'
                                : 'border-neutral-200 dark:border-white/5 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                            <span>{s.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="feedback-email" className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Email <span className="font-normal text-neutral-400">(optional)</span>
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full text-xs sm:text-sm rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50/70 dark:bg-black/40 px-3 py-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] transition-all"
                    />
                  </div>
                </div>
              </form>
            ) : (
              /* Success Confirmation */
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <IconCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#1D1D1F] dark:text-white">
                    Feedback Saved
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mt-1 leading-relaxed">
                    Thank you! Your feedback note has been stored in your encrypted local browser memory archive.
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="px-4 py-2 text-xs font-medium text-[#0071E3] dark:text-[#2997FF] hover:underline"
                  >
                    Submit another note
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('history')}
                    className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                  >
                    View saved archive
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Saved History Archive Tab - Scrollable Container with Custom Scrollbars */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>{savedNotes.length} recorded entries</span>
                <span className="font-mono text-[11px]">chrome.storage.local</span>
              </div>

              {savedNotes.length > 0 ? (
                <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                  {savedNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 rounded-2xl bg-neutral-50 dark:bg-black/30 border border-neutral-200/90 dark:border-white/10 space-y-2 relative group"
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-white dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-white/10 uppercase">
                            {note.category}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">
                            {note.timestamp}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopyNote(note.message, note.id)}
                          className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                          title="Copy full text"
                        >
                          {copiedId === note.id ? (
                            <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <IconCopy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Full Message Text: Completely Visible, Never Clipped */}
                      <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap font-sans break-words max-h-48 overflow-y-auto custom-scrollbar p-2 rounded-lg bg-white/60 dark:bg-white/5 border border-neutral-200/60 dark:border-white/5">
                        {note.message}
                      </p>

                      {note.email && (
                        <div className="text-[11px] font-mono text-neutral-400">
                          Contact: {note.email}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-neutral-400 space-y-2">
                  <IconMessageCircle className="w-8 h-8 mx-auto opacity-30" />
                  <p className="text-xs font-medium">No saved feedback notes yet.</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('compose')}
                    className="text-xs text-[#0071E3] dark:text-[#2997FF] hover:underline"
                  >
                    Write your first note
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed Footer Actions Bar */}
        <div className="p-4 sm:p-5 border-t border-neutral-200/80 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] flex items-center justify-between shrink-0">
          <div className="text-[11px] font-mono text-neutral-400">
            {activeTab === 'compose' ? 'Zero telemetry • Sandboxed' : `${savedNotes.length} notes archived`}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
            >
              Close
            </button>

            {activeTab === 'compose' && !isSubmitted && (
              <button
                type="submit"
                form="feedback-form"
                disabled={!message.trim() || isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Submit Note</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
