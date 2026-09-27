import React, { useState } from 'react';
import {
  IconX,
  IconCheck,
  IconBulb,
  IconBug,
  IconSparkles,
  IconMessageCircle,
  IconMoodSmile,
  IconMoodNeutral,
  IconMoodSad
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
  const [category, setCategory] = useState<'bug' | 'feature' | 'platform' | 'general'>(initialCategory);
  const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'negative'>('positive');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'feature' as const, label: 'Idea / Feature', icon: IconBulb },
    { id: 'bug' as const, label: 'Issue / Bug', icon: IconBug },
    { id: 'platform' as const, label: 'Model Request', icon: IconSparkles },
    { id: 'general' as const, label: 'General Note', icon: IconMessageCircle }
  ];

  const getPlaceholder = () => {
    switch (category) {
      case 'feature':
        return 'What workflow, shortcut, or feature would make ChatBridge better for you?';
      case 'bug':
        return 'What happened? Describe the unexpected behavior or platform where it occurred...';
      case 'platform':
        return 'Which AI platform or model would you like to see supported next? (e.g. Gemini 2.0, DeepSeek, Cursor)';
      case 'general':
      default:
        return 'Share your thoughts, critique, or questions with the developer...';
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

    // Save locally
    try {
      const saved = localStorage.getItem('chatbridge_feedback_list');
      const list = saved ? JSON.parse(saved) : [];
      localStorage.setItem('chatbridge_feedback_list', JSON.stringify([newSubmission, ...list].slice(0, 30)));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.saved('Feedback recorded', 'Thank you for helping improve ChatBridge.');
    }, 350);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setMessage('');
    setEmail('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-dialog-title"
    >
      <div
        className="bg-white dark:bg-[#111118] rounded-2xl border border-neutral-200/90 dark:border-white/10 max-w-lg w-full p-6 sm:p-7 shadow-2xl relative text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <IconX className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div>
              <h3 id="feedback-dialog-title" className="text-xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
                Share Feedback
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Your thoughts directly shape future updates. Submissions are stored locally on your device.
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Feedback Type
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
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-white dark:bg-[#1E1E2C] text-[#0071E3] dark:text-[#2997FF] shadow-xs font-semibold'
                          : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="feedback-message" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Message
                </label>
                <span className="text-[11px] text-neutral-400">
                  {message.length} chars
                </span>
              </div>
              <textarea
                id="feedback-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={getPlaceholder()}
                rows={4}
                required
                className="w-full text-xs sm:text-sm rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50/50 dark:bg-black/30 p-3 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] dark:focus:border-[#2997FF] transition-all resize-none"
              />
            </div>

            {/* Optional Sentiment & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Sentiment */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Overall Sentiment
                </label>
                <div className="flex items-center gap-1">
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
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg border text-xs transition-colors ${
                          isSelected
                            ? 'bg-neutral-100 dark:bg-white/10 border-neutral-300 dark:border-white/20 font-medium'
                            : 'border-neutral-200 dark:border-white/5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
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
              <div className="space-y-1">
                <label htmlFor="feedback-email" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Email <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50/50 dark:bg-black/30 px-3 py-1.5 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-200/80 dark:border-white/10">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!message.trim() || isSubmitting}
                className="px-4 py-2 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Send Feedback</span>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Clean Confirmation State */
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
              <IconCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#1D1D1F] dark:text-white">
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto mt-1 leading-relaxed">
                Your report has been logged to your local sandbox. It will be referenced in upcoming continuity engine builds.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="px-3.5 py-1.5 text-xs text-neutral-600 dark:text-neutral-300 hover:underline"
              >
                Submit another note
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black text-xs font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
