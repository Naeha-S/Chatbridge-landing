import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-b border-[#E5E5EA] bg-[#FBFBFA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <p className="text-xs font-mono font-medium tracking-wide text-[#6E6E73] uppercase">
            Context Fragmentation
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
            The friction of separate AI accounts.
          </h2>
          <p className="text-base text-[#515154] leading-relaxed">
            When you switch between ChatGPT, Claude, and Gemini, each assistant begins without awareness of your earlier work. You spend minutes copying code snippets, restating technical constraints, and summarizing prior decisions.
          </p>
        </div>

        {/* Side-by-side Editorial Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Without ChatBridge */}
          <div className="bg-white rounded-xl border border-[#E5E5EA] p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-[#E5E5EA]">
              <span className="text-xs font-mono font-medium text-[#86868B] uppercase">
                Traditional Workflow
              </span>
              <h3 className="text-lg font-semibold text-[#1D1D1F] mt-1">
                Manual reconstruction
              </h3>
            </div>

            <div className="space-y-4 text-sm text-[#515154] leading-relaxed">
              <p>
                <strong className="text-[#1D1D1F] font-medium block mb-1">Repetitive re-explanation</strong>
                Opening a new tab requires you to explain your data structures, library versions, and architectural decisions again from the beginning.
              </p>
              <p>
                <strong className="text-[#1D1D1F] font-medium block mb-1">Fragmented knowledge</strong>
                Your reasoning stays trapped in individual vendor accounts, making it difficult to reference what you decided in a previous session.
              </p>
              <p>
                <strong className="text-[#1D1D1F] font-medium block mb-1">Token waste</strong>
                Pasting full chat logs consumes significant context window tokens with irrelevant greetings and intermediate corrections.
              </p>
            </div>
          </div>

          {/* With ChatBridge */}
          <div className="bg-[#F5F5F7] rounded-xl border border-[#D1D1D6] p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-[#E5E5EA]">
              <span className="text-xs font-mono font-medium text-[#1D1D1F] uppercase">
                With ChatBridge
              </span>
              <h3 className="text-lg font-semibold text-[#1D1D1F] mt-1">
                Continuous local memory
              </h3>
            </div>

            <div className="space-y-4 text-sm text-[#333336] leading-relaxed">
              <p>
                <strong className="text-[#1D1D1F] font-medium block mb-1">One-keystroke injection</strong>
                Press Cmd+Shift+K in any supported chat box. ChatBridge scores your recent discussions and pastes a concise technical summary.
              </p>
              <p>
                <strong className="text-[#1D1D1F] font-medium block mb-1">High-density summaries</strong>
                Hybrid retrieval extracts only the key parameters and code constraints, keeping prompt token overhead minimal.
              </p>
              <p>
                <strong className="text-[#1D1D1F] font-medium block mb-1">Local private storage</strong>
                Your conversation index resides on your machine in encrypted storage, independent of any cloud vendor account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
