import React, { useState } from 'react';
import {
  IconFolder,
  IconFileText,
  IconWallet,
  IconLayersLinked,
  IconDownload,
  IconArrowRight,
} from '@tabler/icons-react';
import { PageView } from '../types';
import { smoothScrollTo } from '../hooks/useGsapSmoothScroll';

interface SubpageConnectorsProps {
  onNavigate: (view: PageView) => void;
}

/**
 * SubpageConnectors ("The Layers of ChatBridge")
 * Uses consistent system sans-serif typography and compact viewport-fitted proportions.
 */
export const SubpageConnectors: React.FC<SubpageConnectorsProps> = ({ onNavigate }) => {
  const [selectedTag, setSelectedTag] = useState<string>('AI Summarize');

  const handleNavigate = (view: PageView) => {
    onNavigate(view);
    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
  };

  return (
    <section
      id="layers-of-chatbridge"
      className="py-10 md:py-14 border-b border-[#E2DFD7] dark:border-white/10 bg-[#EFECE6] dark:bg-[#07070A] text-[#1E1C1A] dark:text-[#F2EFE9] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C776D] dark:text-[#A6A195]">
            Layered System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1C1A] dark:text-white">
            The Layers of ChatBridge
          </h2>
          <p className="text-xs sm:text-sm text-[#6B665C] dark:text-[#9E988D] leading-relaxed max-w-xl mx-auto">
            Five coordinated on-device layers that capture, encrypt, rank, distill, and inject cross-model conversational context without cloud dependencies.
          </p>
        </div>

        {/* Top Grid: 3 Distinct Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          {/* Card 1: Top Left 2-Tier Stack (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#181816] dark:bg-[#111116] text-white overflow-hidden shadow-sm flex flex-col border border-black/10 dark:border-white/10">
            {/* Top Compartment: Warm Bone Inset with Stacked Pill Chips */}
            <div className="p-4 bg-[#ECEAE4] dark:bg-[#1A1A22] text-[#1E1C1A] dark:text-[#F2EFE9] flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedTag('Legal Law Benefits')}
                className={`w-full max-w-[210px] py-1.5 px-3 rounded-lg text-center text-xs font-medium transition-all shadow-xs ${
                  selectedTag === 'Legal Law Benefits'
                    ? 'bg-[#181816] dark:bg-white text-white dark:text-[#181816]'
                    : 'bg-white/80 dark:bg-white/5 text-[#5A554C] dark:text-[#CCC7BC] hover:bg-white dark:hover:bg-white/10'
                }`}
              >
                ChatGPT Dialogue Turn
              </button>

              <button
                type="button"
                onClick={() => setSelectedTag('Sales Management.pdf')}
                className={`w-full max-w-[210px] py-1.5 px-3 rounded-lg text-center text-xs font-medium transition-all shadow-xs ${
                  selectedTag === 'Sales Management.pdf'
                    ? 'bg-[#181816] dark:bg-white text-white dark:text-[#181816]'
                    : 'bg-white/80 dark:bg-white/5 text-[#5A554C] dark:text-[#CCC7BC] hover:bg-white dark:hover:bg-white/10'
                }`}
              >
                FastAPI Backend Schema.py
              </button>

              <button
                type="button"
                onClick={() => setSelectedTag('AI Summarize')}
                className={`w-full max-w-[210px] py-1.5 px-3 rounded-lg text-center text-xs font-semibold transition-all shadow-xs ${
                  selectedTag === 'AI Summarize'
                    ? 'bg-[#181816] dark:bg-white text-white dark:text-[#181816]'
                    : 'bg-white/80 dark:bg-white/5 text-[#5A554C] dark:text-[#CCC7BC] hover:bg-white'
                }`}
              >
                Context Capsule (Active)
              </button>

              <button
                type="button"
                onClick={() => setSelectedTag('Transcript.docx')}
                className={`w-full max-w-[210px] py-1.5 px-3 rounded-lg text-center text-xs font-medium transition-all shadow-xs ${
                  selectedTag === 'Transcript.docx'
                    ? 'bg-[#181816] dark:bg-white text-white dark:text-[#181816]'
                    : 'bg-white/80 dark:bg-white/5 text-[#5A554C] dark:text-[#CCC7BC] hover:bg-white dark:hover:bg-white/10'
                }`}
              >
                Claude Artifacts Prompt.tsx
              </button>

              <button
                type="button"
                onClick={() => setSelectedTag('Memos.pdf')}
                className={`w-full max-w-[210px] py-1.5 px-3 rounded-lg text-center text-xs font-medium transition-all shadow-xs ${
                  selectedTag === 'Memos.pdf'
                    ? 'bg-[#181816] dark:bg-white text-white dark:text-[#181816]'
                    : 'bg-white/80 dark:bg-white/5 text-[#5A554C] dark:text-[#CCC7BC] hover:bg-white dark:hover:bg-white/10'
                }`}
              >
                Gemini Reasoning Chain
              </button>
            </div>

            {/* Bottom Compartment: Deep Charcoal */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Proven Context, Rapid Results
                </h3>
                <p className="text-xs text-[#A6A195] leading-relaxed">
                  Get structured context across law, code, and project specs with verifiable local integrity.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleNavigate('how-it-works')}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white hover:bg-[#ECEAE4] text-[#181816] text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>Learn more</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Top Middle Floating Feature Tiles (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#ECEAE4] dark:bg-[#15151B] p-4 sm:p-5 border border-[#DBD7CE] dark:border-white/10 shadow-sm flex flex-col justify-between">
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C776D] dark:text-[#9E988D]">
                Layer 02 • On-Device Storage
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-3 rounded-xl bg-white/90 dark:bg-[#1D1D26] border border-white/60 dark:border-white/5 shadow-2xs flex flex-col items-start gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EFECE6] dark:bg-white/5 flex items-center justify-center text-[#1E1C1A] dark:text-white">
                    <IconFolder className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1E1C1A] dark:text-white leading-tight">
                    On-Device Capture
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/90 dark:bg-[#1D1D26] border border-white/60 dark:border-white/5 shadow-2xs flex flex-col items-start gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EFECE6] dark:bg-white/5 flex items-center justify-center text-[#1E1C1A] dark:text-white">
                    <IconFileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1E1C1A] dark:text-white leading-tight">
                    Zero Egress
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/90 dark:bg-[#1D1D26] border border-white/60 dark:border-white/5 shadow-2xs flex flex-col items-start gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EFECE6] dark:bg-white/5 flex items-center justify-center text-[#1E1C1A] dark:text-white">
                    <IconWallet className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1E1C1A] dark:text-white leading-tight">
                    AES-256 GCM
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/90 dark:bg-[#1D1D26] border border-white/60 dark:border-white/5 shadow-2xs flex flex-col items-start gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EFECE6] dark:bg-white/5 flex items-center justify-center text-[#1E1C1A] dark:text-white">
                    <IconLayersLinked className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1E1C1A] dark:text-white leading-tight">
                    Local Storage
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DBD7CE] dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#6B665C] dark:text-[#9E988D]">12-Byte Nonce Table</span>
              <button
                type="button"
                onClick={() => handleNavigate('local-privacy')}
                className="font-semibold text-[#181816] dark:text-white hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Threat Model</span>
                <IconArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: Top Right Split Card (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#181816] dark:bg-[#111116] text-white p-4 sm:p-5 border border-black/10 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  Privatised & Project-Ready
                </h3>
                <p className="text-xs text-[#A6A195] leading-relaxed">
                  Turn multi-turn prompt chaos into structured context clarity.
                </p>
              </div>

              {/* Inset Light Panel */}
              <div className="p-3 rounded-xl bg-[#ECEAE4] dark:bg-[#1D1D26] text-[#1E1C1A] dark:text-[#F2EFE9] space-y-2 shadow-inner">
                <p className="text-[11px] text-[#5A554C] dark:text-[#CCC7BC] leading-relaxed">
                  Zero deviation from local security standards before context handoff.
                </p>

                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white dark:bg-[#13131A] border border-[#DBD7CE] dark:border-white/5 text-xs font-mono">
                  <span>Capsule (55 Tokens)</span>
                  <IconDownload className="w-3.5 h-3.5 text-[#7C776D]" />
                </div>

                <button
                  type="button"
                  onClick={() => handleNavigate('history')}
                  className="w-full py-1.5 px-3 rounded-lg bg-[#181816] dark:bg-white text-white dark:text-[#181816] text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity text-center block"
                >
                  Inspect In Vault
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid: 2 Distinct Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Card 4: Bottom Left / Center Wide Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#ECEAE4] dark:bg-[#15151B] p-4 sm:p-5 border border-[#DBD7CE] dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
              <div className="space-y-2 max-w-sm relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C776D] dark:text-[#9E988D]">
                  Layer 04 • AST Token Distillation
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#1E1C1A] dark:text-white">
                  Aligned With Your Workflow
                </h3>
                <p className="text-xs text-[#6B665C] dark:text-[#A6A195] leading-relaxed">
                  Effortlessly hand off complex tasks with simple natural language commands and keyboard shortcuts.
                </p>
              </div>

              {/* Simulated Tooltip & Dialogue Layer */}
              <div className="relative w-full sm:w-[220px] p-3 rounded-xl bg-white/70 dark:bg-[#1D1D26]/70 border border-white/80 dark:border-white/5 text-[11px] text-[#868177] dark:text-[#7A756D] select-none leading-relaxed">
                <p className="line-clamp-3">
                  The covenants that govern context transfer ensure complete operational integrity throughout the interim handoff.
                </p>

                {/* Floating Dark Tooltip Badge */}
                <button
                  type="button"
                  onClick={() => handleNavigate('how-it-works')}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#181816] text-white text-[10px] font-semibold shadow-lg border border-white/20 flex items-center gap-1 whitespace-nowrap hover:scale-105 transition-transform cursor-pointer"
                >
                  <span>Inject Context Capsule</span>
                  <IconArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#DBD7CE] dark:border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-[#7C776D] dark:text-[#9E988D]">AST Pruning Pipeline</span>
              <button
                type="button"
                onClick={() => handleNavigate('how-it-works')}
                className="font-semibold text-[#181816] dark:text-white hover:underline flex items-center gap-1"
              >
                <span>Explore Token Distillation</span>
                <IconArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 5: Bottom Right Project Tree Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#ECEAE4] dark:bg-[#15151B] p-4 sm:p-5 border border-[#DBD7CE] dark:border-white/10 shadow-sm flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <p className="text-[11px] text-[#5A554C] dark:text-[#CCC7BC] leading-relaxed">
                The target assistant maintains normal operations and avoids redundant explanations.
              </p>

              <button
                type="button"
                onClick={() => handleNavigate('comparison')}
                className="w-full py-2 px-3 rounded-lg bg-[#181816] dark:bg-white text-white dark:text-[#181816] text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity text-center block"
              >
                Inject into Claude / Gemini
              </button>

              <div className="space-y-1 text-xs font-mono">
                <div className="p-1.5 px-2 rounded-md bg-white/80 dark:bg-[#1D1D26] border border-[#DBD7CE] dark:border-white/5 flex items-center justify-between text-[#1E1C1A] dark:text-[#E2DFD7]">
                  <div className="flex items-center gap-1.5 truncate">
                    <IconFileText className="w-3.5 h-3.5 text-[#7C776D] shrink-0" />
                    <span className="truncate text-[11px]">Legal agreement.doc</span>
                  </div>
                  <IconDownload className="w-3 h-3 text-[#7C776D] shrink-0" />
                </div>

                <div className="p-1.5 px-2 rounded-md bg-white/80 dark:bg-[#1D1D26] border border-[#DBD7CE] dark:border-white/5 flex items-center justify-between text-[#1E1C1A] dark:text-[#E2DFD7]">
                  <div className="flex items-center gap-1.5 truncate">
                    <IconFileText className="w-3.5 h-3.5 text-[#7C776D] shrink-0" />
                    <span className="truncate text-[11px]">Research & Solutions.pdf</span>
                  </div>
                  <IconDownload className="w-3 h-3 text-[#7C776D] shrink-0" />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DBD7CE] dark:border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-[#7C776D] dark:text-[#9E988D]">Keybind: ⌘+Shift+K</span>
              <button
                type="button"
                onClick={() => handleNavigate('faq')}
                className="font-semibold text-[#181816] dark:text-white hover:underline flex items-center gap-1"
              >
                <span>Keybinds</span>
                <IconArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
