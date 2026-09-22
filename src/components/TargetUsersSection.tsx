import React from 'react';

export const TargetUsersSection: React.FC = () => {
  const audiences = [
    {
      title: 'Software Engineers',
      context: 'Architecture and Implementation',
      detail:
        'Explore distributed system designs in ChatGPT, audit concurrency semantics in Claude, and generate documentation in Gemini without re-pasting schemas or library version constraints.'
    },
    {
      title: 'Technical Researchers',
      context: 'Empirical Investigations',
      detail:
        'Maintain consistent mathematical definitions, benchmark conditions, and thesis arguments when consulting multiple specialized assistants across weeks of investigation.'
    },
    {
      title: 'Product Managers',
      context: 'Requirements and User Stories',
      detail:
        'Draft user journeys, refine acceptance criteria, and translate customer interviews without losing the underlying business constraints between tools.'
    },
    {
      title: 'Students and Educators',
      context: 'Multi-perspective Study',
      detail:
        'Compare explanations from multiple models when tackling advanced proofs, algorithms, or essay drafts without re-entering the original assignment prompt.'
    }
  ];

  return (
    <section className="py-20 md:py-28 border-b border-[#E5E5EA] bg-[#FBFBFA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <p className="text-xs font-mono font-medium tracking-wide text-[#6E6E73] uppercase">
            Workflows
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
            Built for multi-assistant workflows.
          </h2>
          <p className="text-base text-[#515154] leading-relaxed">
            Engineered for anyone who routinely keeps ChatGPT, Claude, and Gemini open side by side to leverage the distinct strengths of each model.
          </p>
        </div>

        {/* 2x2 Clean Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((item, idx) => (
            <div
              key={idx}
              id={`target-user-${idx}`}
              className="bg-white rounded-xl border border-[#E5E5EA] p-6 sm:p-7 space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#1D1D1F]">
                  {item.title}
                </h3>
                <span className="text-[11px] font-mono text-[#6E6E73] bg-[#F5F5F7] px-2 py-0.5 rounded border border-[#E5E5EA]">
                  {item.context}
                </span>
              </div>
              <p className="text-sm text-[#515154] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
