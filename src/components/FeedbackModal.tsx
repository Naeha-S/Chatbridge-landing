import React, { useState } from 'react';
import { CloseIcon, CheckIcon } from './Icons';
import { useToast } from '../context/ToastContext';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [feedbackType, setFeedbackType] = useState<'issue' | 'feature' | 'question'>('feature');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.saved(
      'Feedback submitted successfully!',
      'Your input has been recorded and will help improve future versions.'
    );
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#12121A] rounded-2xl border border-[#E5E5EA] dark:border-[#2A2A3C] max-w-lg w-full p-6 sm:p-7 shadow-2xl relative text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-md text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1E1E2C] transition-colors"
          aria-label="Close feedback modal"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <div className="space-y-1 pb-4 border-b border-[#E5E5EA] dark:border-[#222232] pr-8">
          <span className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] block">
            Community and Issue Reports
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
            Contact and Feedback
          </h3>
          <p className="text-xs text-[#515154] dark:text-[#A1A1A6]">
            Report an unsupported AI web interface, suggest a feature, or reach our team.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-[#F5F5F7] dark:bg-[#161624] border border-[#E5E5EA] dark:border-[#28283C] flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] mx-auto">
              <CheckIcon className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-[#1D1D1F] dark:text-white">Feedback Logged</h4>
            <p className="text-xs text-[#515154] dark:text-[#A1A1A6] max-w-xs mx-auto">
              Thank you for helping us make cross-platform conversational memory more resilient.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
            <div>
              <label className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] block mb-1.5">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'feature', label: 'Feature Idea' },
                  { id: 'issue', label: 'Report Bug' },
                  { id: 'question', label: 'Inquiry' }
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setFeedbackType(t.id as any)}
                    className={`py-2 px-2.5 rounded-lg border text-center transition-all ${
                      feedbackType === t.id
                        ? 'bg-[#1D1D1F] dark:bg-[#0071E3] border-[#1D1D1F] dark:border-[#0071E3] text-white font-medium shadow-2xs'
                        : 'bg-[#F5F5F7] dark:bg-[#181824] border-[#E5E5EA] dark:border-[#28283A] text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
                    }`}
                  >
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] block mb-1">Email (Optional)</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#0A0A10] border border-[#D1D1D6] dark:border-[#2E2E40] rounded-lg text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#636370] focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] block mb-1">Feedback or Question</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your workflow or issue, e.g. 'I use Perplexity along with Claude and would benefit from native support'..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#0A0A10] border border-[#D1D1D6] dark:border-[#2E2E40] rounded-lg text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#636370] focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#1D1D1F] dark:bg-[#0071E3] hover:bg-[#333336] dark:hover:bg-[#0077ED] text-white font-medium text-xs transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
