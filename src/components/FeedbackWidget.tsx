import React, { useState, useEffect, useRef } from 'react';
import { FeedbackSubmission } from '../types';
import { CloseIcon, CheckIcon } from './Icons';

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
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [category, setCategory] = useState<'bug' | 'feature' | 'platform' | 'general'>(presetCategory);
  const [platform, setPlatform] = useState(presetPlatform);
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'critical'>('minor');
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);
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
    if (presetCategory) {
      setCategory(presetCategory);
    }
    if (presetPlatform) {
      setPlatform(presetPlatform);
    }
  }, [presetCategory, presetPlatform]);

  // Listen to custom event for opening feedback from other components
  useEffect(() => {
    const handleOpenEvent = (e: CustomEvent) => {
      setIsOpen(true);
      setIsMinimized(false);
      if (e.detail?.category) setCategory(e.detail.category);
      if (e.detail?.platform) setPlatform(e.detail.platform);
    };

    window.addEventListener('chatbridge:open-feedback' as any, handleOpenEvent as any);
    return () => {
      window.removeEventListener('chatbridge:open-feedback' as any, handleOpenEvent as any);
    };
  }, []);

  // Notify parent of state changes
  useEffect(() => {
    onOpenStateChange?.(isOpen);
  }, [isOpen, onOpenStateChange]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    const newSubmission: FeedbackSubmission = {
      id: 'fb-' + Date.now(),
      category,
      platform: platform || undefined,
      message: message.trim(),
      email: email.trim() || undefined,
      rating: category === 'general' ? rating : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today'
    };

    setTimeout(() => {
      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      try {
        localStorage.setItem('chatbridge_feedback_list', JSON.stringify(updated.slice(0, 20)));
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setMessage('');
    }, 350);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  const categories = [
    {
      id: 'bug' as const,
      label: 'Bug Report',
      desc: 'Capture failure, DOM shift, UI glitch'
    },
    {
      id: 'feature' as const,
      label: 'Feature Request',
      desc: 'Retrieval tuning, hotkeys, export'
    },
    {
      id: 'platform' as const,
      label: 'Platform Support',
      desc: 'Request Perplexity, DeepSeek, Cursor'
    },
    {
      id: 'general' as const,
      label: 'General Feedback',
      desc: 'Thoughts, privacy feedback, questions'
    }
  ];

  const aiPlatforms = [
    'ChatGPT (chatgpt.com)',
    'Claude (claude.ai)',
    'Gemini (gemini.google.com)',
    'Perplexity AI',
    'DeepSeek Chat',
    'Microsoft Copilot',
    'Mistral Le Chat',
    'Cursor / Windsurf IDE',
    'Claude Desktop App',
    'Ollama / Local LLM',
    'Other Web Service'
  ];

  return (
    <aside
      aria-label="Feedback and Support Widget"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans"
    >
      {/* Unobtrusive Closed Trigger */}
      {!isOpen && (
        <button
          id="feedback-widget-trigger-btn"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] border border-[#D1D1D6] shadow-md transition-all active:scale-98"
          title="Give Feedback, Suggest a Feature, or Report a Bug"
        >
          <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
          <span className="text-xs font-medium">Feedback</span>
        </button>
      )}

      {/* Expanded Floating Widget */}
      {isOpen && (
        <div
          ref={widgetRef}
          className={`w-[calc(100vw-2rem)] sm:w-[400px] max-h-[85vh] bg-white border border-[#D1D1D6] rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-200 ${
            isMinimized ? 'h-auto' : ''
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#F5F5F7] border-b border-[#E5E5EA] flex items-center justify-between gap-2 shrink-0">
            <div>
              <h3 className="text-xs font-semibold text-[#1D1D1F]">ChatBridge Feedback</h3>
              <p className="text-[11px] text-[#6E6E73]">Direct Community & Bug Reports</p>
            </div>

            <div className="flex items-center gap-1">
              <button
                id="feedback-widget-minimize-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded text-[#6E6E73] hover:text-[#1D1D1F] transition-colors text-xs"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? 'Expand' : 'Minimize'}
              </button>
              <button
                id="feedback-widget-close-btn"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                title="Close Widget (Esc)"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Minimized View */}
          {isMinimized ? (
            <div className="p-3 bg-white flex items-center justify-between text-xs text-[#515154]">
              <span>Widget minimized</span>
              <button
                onClick={() => setIsMinimized(false)}
                className="text-xs text-[#0071E3] hover:underline"
              >
                Restore
              </button>
            </div>
          ) : (
            /* Widget Body */
            <div className="overflow-y-auto flex-1 p-4 space-y-4 max-h-[calc(85vh-52px)] text-xs">
              {/* Submission History Bar */}
              {submissions.length > 0 && !submitted && (
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] pb-1 border-b border-[#E5E5EA]">
                  <span>Local Submissions: {submissions.length}</span>
                  <button
                    type="button"
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-[#0071E3] hover:underline"
                  >
                    {showHistory ? 'Return to form' : 'View past feedback'}
                  </button>
                </div>
              )}

              {/* History View */}
              {showHistory && !submitted ? (
                <div className="space-y-3">
                  <h4 className="text-xs font-medium text-[#1D1D1F]">Local Feedback Log:</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="bg-[#F5F5F7] border border-[#E5E5EA] rounded-lg p-2.5 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#1D1D1F] uppercase font-semibold">{sub.category}</span>
                          <span className="text-[#86868B]">{sub.timestamp}</span>
                        </div>
                        {sub.platform && (
                          <span className="text-[10px] text-[#6E6E73] block">
                            Platform: {sub.platform}
                          </span>
                        )}
                        <p className="text-[#333336] line-clamp-2">{sub.message}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHistory(false)}
                    className="w-full py-1.5 text-xs text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] rounded border border-[#E5E5EA] transition-colors"
                  >
                    Back to Form
                  </button>
                </div>
              ) : submitted ? (
                /* Success View */
                <div className="py-6 text-center space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center text-[#0071E3] mx-auto">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#1D1D1F]">Feedback Logged</h4>
                  <p className="text-xs text-[#515154] max-w-xs mx-auto leading-relaxed">
                    Thank you. Your submission has been saved to your local browser storage archive.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <button
                      id="feedback-submit-another-btn"
                      onClick={handleReset}
                      className="px-3 py-1.5 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-xs text-[#1D1D1F] border border-[#E5E5EA] font-medium transition-colors"
                    >
                      Submit Another
                    </button>
                    <button
                      id="feedback-done-btn"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-1.5 rounded-full bg-[#1D1D1F] hover:bg-[#333336] text-white font-medium text-xs transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Feedback Form */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Category Selector */}
                  <div>
                    <label className="text-[11px] font-mono text-[#6E6E73] block mb-1">
                      Category
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {categories.map((cat) => {
                        const isSelected = category === cat.id;
                        return (
                          <button
                            type="button"
                            key={cat.id}
                            id={`feedback-category-${cat.id}`}
                            onClick={() => setCategory(cat.id)}
                            className={`p-2 rounded-lg border text-left transition-all ${
                              isSelected
                                ? 'bg-white border-[#1D1D1F] text-[#1D1D1F] shadow-2xs font-medium'
                                : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#6E6E73] hover:text-[#1D1D1F]'
                            }`}
                          >
                            <span className="text-xs block leading-tight truncate">
                              {cat.label}
                            </span>
                            <span className="text-[10px] text-[#86868B] block leading-snug truncate mt-0.5">
                              {cat.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Platform Selector */}
                  <div>
                    <label className="text-[11px] font-mono text-[#6E6E73] block mb-1">
                      {category === 'platform'
                        ? 'Requested AI Platform'
                        : 'Relevant AI Service (Optional)'}
                    </label>
                    <select
                      id="feedback-platform-select"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#D1D1D6] text-xs text-[#1D1D1F] focus:outline-none focus:border-[#0071E3]"
                    >
                      <option value="">Select AI Platform...</option>
                      {aiPlatforms.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bug Severity */}
                  {category === 'bug' && (
                    <div>
                      <label className="text-[11px] font-mono text-[#6E6E73] block mb-1">
                        Severity Level
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 text-center">
                        {(['minor', 'moderate', 'critical'] as const).map((lvl) => (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setSeverity(lvl)}
                            className={`py-1 px-2 rounded border text-[11px] font-mono capitalize transition-all ${
                              severity === lvl
                                ? 'bg-[#1D1D1F] border-[#1D1D1F] text-white font-medium'
                                : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#6E6E73]'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rating */}
                  {category === 'general' && (
                    <div>
                      <label className="text-[11px] font-mono text-[#6E6E73] block mb-1">
                        Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className={`w-7 h-7 rounded border text-xs font-mono transition-all ${
                              rating >= star
                                ? 'bg-[#1D1D1F] border-[#1D1D1F] text-white'
                                : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#86868B]'
                            }`}
                          >
                            {star}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-mono text-[#6E6E73]">
                        {category === 'bug'
                          ? 'Bug Details and Reproduction'
                          : category === 'platform'
                          ? 'Why is this platform needed?'
                          : category === 'feature'
                          ? 'Feature Description'
                          : 'Feedback'}
                      </label>
                      <span className="text-[10px] font-mono text-[#86868B]">
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
                          ? 'e.g. Turn 4 on ChatGPT was not extracted after an interface update...'
                          : category === 'platform'
                          ? 'e.g. I work primarily in Cursor and would benefit from local continuity with Claude...'
                          : category === 'feature'
                          ? 'e.g. It would be helpful to have a summary preview before inserting context...'
                          : 'Share your thoughts, suggestions, or critique...'
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D1D1D6] text-xs text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3] leading-relaxed"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[11px] font-mono text-[#6E6E73] block mb-1">
                      Email for Follow-up (Optional)
                    </label>
                    <input
                      id="feedback-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#D1D1D6] text-xs text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3]"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-1">
                    <button
                      id="feedback-submit-btn"
                      type="submit"
                      disabled={isSubmitting || !message.trim()}
                      className="w-full py-2.5 rounded-full bg-[#1D1D1F] hover:bg-[#333336] disabled:opacity-40 disabled:pointer-events-none text-white font-medium text-xs transition-colors"
                    >
                      {isSubmitting ? 'Logging...' : 'Submit Feedback'}
                    </button>
                    <p className="text-[10px] text-[#86868B] text-center mt-2">
                      Local-first: Feedback is archived in your local browser sandbox.
                    </p>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
