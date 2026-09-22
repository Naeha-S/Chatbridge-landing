import React, { useState } from 'react';
import { CloseIcon, CheckIcon } from './Icons';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedbackType, setFeedbackType] = useState<'issue' | 'feature' | 'question'>('feature');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#E5E5EA] max-w-lg w-full p-6 sm:p-7 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-md text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
          aria-label="Close feedback modal"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <div className="space-y-1 pb-4 border-b border-[#E5E5EA] pr-8">
          <span className="text-[11px] font-mono text-[#6E6E73] block">
            Community and Issue Reports
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
            Contact and Feedback
          </h3>
          <p className="text-xs text-[#515154]">
            Report an unsupported AI web interface, suggest a feature, or reach our team.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center text-[#0071E3] mx-auto">
              <CheckIcon className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-[#1D1D1F]">Feedback Logged</h4>
            <p className="text-xs text-[#515154] max-w-xs mx-auto">
              Thank you for helping us make cross-platform conversational memory more resilient.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
            <div>
              <label className="text-[11px] font-mono text-[#6E6E73] block mb-1.5">Category</label>
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
                        ? 'bg-[#1D1D1F] border-[#1D1D1F] text-white font-medium shadow-2xs'
                        : 'bg-[#F5F5F7] border-[#E5E5EA] text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#6E6E73] block mb-1">Email (Optional)</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-[#D1D1D6] rounded-lg text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#6E6E73] block mb-1">Feedback or Question</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your workflow or issue, e.g. 'I use Perplexity along with Claude and would benefit from native support'..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D1D1D6] rounded-lg text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3] leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#1D1D1F] hover:bg-[#333336] text-white font-medium text-xs transition-colors"
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
