import React, { useState } from 'react';
import { TerminalIcon, ZapIcon, ShieldCheckIcon } from './Icons';

export const TargetUsersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'engineers' | 'researchers' | 'product'>('engineers');

  return (
    <section className="py-24 md:py-32 border-b border-[#E5E5EA] dark:border-[#22222D] bg-[#FBFBFA] dark:bg-[#040405] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono font-medium tracking-wide uppercase text-[#0071E3] dark:text-[#2997FF]">
            Specialized Workflows
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
            Engineered for high-context knowledge work.
          </h2>
          <p className="text-base text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
            Whether auditing concurrency in Go, validating statistical models, or aligning product roadmaps across models.
          </p>
        </div>

        {/* Asymmetric Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Showcase Panel (Left 7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0E0E14] rounded-3xl border border-[#E5E5EA] dark:border-[#262633] p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-[#22222D]">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-[#1D1D1F] dark:text-[#F5F5F7]" />
                  <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Software & Systems Engineering
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F5F5F7] dark:bg-[#181824] text-[#6E6E73] dark:text-[#8E8E98] border border-[#E5E5EA] dark:border-[#282838]">
                  Multi-Assistant Dev Loop
                </span>
              </div>

              <p className="text-sm text-[#515154] dark:text-[#C7C7CC] leading-relaxed">
                Design system architecture in ChatGPT, audit concurrency in Claude, and generate documentation in Gemini without re-pasting schemas or library versions.
              </p>

              {/* Realistic Code / Context Handoff Mock */}
              <div className="p-4 bg-[#F5F5F7] dark:bg-[#14141E] rounded-xl border border-[#E5E5EA] dark:border-[#262633] text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-[#86868B] dark:text-[#787884] text-[11px]">
                  <span>Source: ChatGPT-4o</span>
                  <span>Target: Claude 3.7 Sonnet</span>
                </div>
                <div className="text-[#1D1D1F] dark:text-[#E5E5EA]">
                  <code>
                    [ChatBridge Injection: sync.Map Refactor]<br />
                    • Go 1.23 • Striped RW locks (16 shards)<br />
                    • Memory footprint: 4.2 MB baseline<br />
                    • Goal: Write fuzz tests for concurrent cache evictions
                  </code>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E5EA] dark:border-[#22222D] flex items-center justify-between text-xs text-[#6E6E73] dark:text-[#8E8E98]">
              <span>Zero prompt bloat</span>
              <span className="font-mono text-[#0071E3] dark:text-[#2997FF]">⌘+Shift+K instant transfer</span>
            </div>
          </div>

          {/* Right Column (2 Compact Bento Panels) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Panel 2: Research */}
            <div className="bg-white dark:bg-[#0E0E14] rounded-3xl border border-[#E5E5EA] dark:border-[#262633] p-6 space-y-3 shadow-xs flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Technical Researchers
                  </h4>
                  <span className="text-[10px] font-mono text-[#6E6E73] dark:text-[#8E8E98] bg-[#F5F5F7] dark:bg-[#181824] px-1.5 py-0.5 rounded border border-[#E5E5EA] dark:border-[#282838]">
                    Math & Citations
                  </span>
                </div>
                <p className="text-xs text-[#515154] dark:text-[#C7C7CC] leading-relaxed">
                  Maintain exact theorem definitions, benchmark datasets (LongMemEval-S, N=5,000), and experimental conditions without notation drift.
                </p>
              </div>
              <div className="pt-3 border-t border-[#E5E5EA] dark:border-[#22222D] text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] flex items-center justify-between">
                <span>Recall Accuracy:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">76.8% RRF Recall@5</span>
              </div>
            </div>

            {/* Panel 3: Product Management */}
            <div className="bg-[#1D1D1F] dark:bg-[#151520] text-white rounded-3xl border border-transparent dark:border-[#2B2B3C] p-6 space-y-3 shadow-sm flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">
                    Product & Technical Specs
                  </h4>
                  <span className="text-[10px] font-mono text-[#D1D1D6] bg-white/10 dark:bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
                    PRDs & User Stories
                  </span>
                </div>
                <p className="text-xs text-[#A1A1A6] leading-relaxed">
                  Refine acceptance criteria and user journey maps across assistants while keeping core business logic synchronized.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#D1D1D6] flex items-center justify-between">
                <span>Security:</span>
                <span className="text-[#34C759] dark:text-[#30D158]">100% On-Device AES-256</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
