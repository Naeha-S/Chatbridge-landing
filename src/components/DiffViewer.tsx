import React, { useState, useMemo } from 'react';
import * as Diff from 'diff';
import {
  IconColumns,
  IconList,
  IconCheck,
  IconCopy,
  IconSparkles,
  IconPlus,
  IconMinus
} from '@tabler/icons-react';

interface DiffViewerProps {
  oldText: string;
  newText: string;
  oldLabel?: string;
  newLabel?: string;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  oldText,
  newText,
  oldLabel = 'Original Dialogue Context',
  newLabel = 'Injected Target Prompt'
}) => {
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');
  const [copied, setCopied] = useState(false);

  // Compute line-by-line diff using 'diff' library
  const lineDiff = useMemo(() => {
    return Diff.diffLines(oldText, newText);
  }, [oldText, newText]);

  // Statistics
  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    lineDiff.forEach((part) => {
      const count = part.count || part.value.split('\n').filter(Boolean).length;
      if (part.added) added += count;
      if (part.removed) removed += count;
    });
    return { added, removed };
  }, [lineDiff]);

  const handleCopyNew = () => {
    navigator.clipboard.writeText(newText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-[#0C0C12] text-neutral-200 overflow-hidden shadow-xl text-xs font-mono">
      {/* Top Diff Header Bar */}
      <div className="px-4 py-3 bg-[#14141E] border-b border-[#222230] flex flex-wrap items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
            <IconPlus className="w-3 h-3" />
            <span>+{stats.added} appended</span>
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-semibold">
            <IconMinus className="w-3 h-3" />
            <span>-{stats.removed} pruned</span>
          </span>
          <span className="text-[11px] text-neutral-400 hidden sm:inline">
            // Context Token Diff
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Split vs Unified Toggle */}
          <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 text-[11px]">
            <button
              type="button"
              onClick={() => setViewMode('unified')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'unified'
                  ? 'bg-[#0071E3] text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Unified vertical diff"
            >
              <IconList className="w-3.5 h-3.5" />
              <span>Unified</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'split'
                  ? 'bg-[#0071E3] text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Side-by-side split diff"
            >
              <IconColumns className="w-3.5 h-3.5" />
              <span>Split</span>
            </button>
          </div>

          {/* Copy Injected Text Button */}
          <button
            type="button"
            onClick={handleCopyNew}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/10 text-[11px] transition-colors"
          >
            {copied ? (
              <>
                <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <IconCopy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Diff Content View */}
      {viewMode === 'unified' ? (
        /* Unified View */
        <div className="overflow-x-auto max-h-[380px] custom-scrollbar p-3 space-y-0.5 leading-relaxed font-mono text-[11px]">
          {lineDiff.map((part, pIdx) => {
            const lines = part.value.split('\n');
            // Remove trailing empty line if it's the last element of split
            if (lines[lines.length - 1] === '') lines.pop();

            if (part.added) {
              return lines.map((line, lIdx) => (
                <div
                  key={`${pIdx}-${lIdx}`}
                  className="flex items-start gap-2 px-2 py-0.5 rounded bg-emerald-950/30 border-l-2 border-emerald-500 text-emerald-300"
                >
                  <span className="text-emerald-500 select-none font-bold w-4 shrink-0">+</span>
                  <span className="whitespace-pre-wrap break-all">{line}</span>
                </div>
              ));
            }

            if (part.removed) {
              return lines.map((line, lIdx) => (
                <div
                  key={`${pIdx}-${lIdx}`}
                  className="flex items-start gap-2 px-2 py-0.5 rounded bg-rose-950/25 border-l-2 border-rose-500 text-rose-300/80 line-through opacity-75"
                >
                  <span className="text-rose-500 select-none font-bold w-4 shrink-0">-</span>
                  <span className="whitespace-pre-wrap break-all">{line}</span>
                </div>
              ));
            }

            return lines.map((line, lIdx) => (
              <div
                key={`${pIdx}-${lIdx}`}
                className="flex items-start gap-2 px-2 py-0.5 text-neutral-400 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-neutral-600 select-none w-4 shrink-0">·</span>
                <span className="whitespace-pre-wrap break-all">{line}</span>
              </div>
            ));
          })}
        </div>
      ) : (
        /* Side-by-Side Split View */
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#222230] max-h-[380px] overflow-y-auto custom-scrollbar">
          {/* Left: Original Text */}
          <div className="p-3 bg-black/30">
            <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 mb-2 pb-1 border-b border-[#222230] flex items-center justify-between">
              <span>{oldLabel}</span>
              <span>Baseline</span>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-[11px] text-neutral-400 leading-relaxed break-all">
              {oldText}
            </pre>
          </div>

          {/* Right: Injected Result */}
          <div className="p-3 bg-emerald-950/10">
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-2 pb-1 border-b border-[#222230] flex items-center justify-between">
              <span>{newLabel}</span>
              <span className="flex items-center gap-1 text-[#2997FF]">
                <IconSparkles className="w-3 h-3" />
                <span>Active Capsule</span>
              </span>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-[11px] text-emerald-200 leading-relaxed break-all">
              {newText}
            </pre>
          </div>
        </div>
      )}

      {/* Footer Info Legend */}
      <div className="px-4 py-2 bg-[#101018] border-t border-[#222230] flex flex-wrap items-center justify-between gap-2 text-[10px] text-neutral-400 select-none font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Green: Newly Appended Context Capsule</span>
          </span>
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Red: Pruned Boilerplate / Uncompressed</span>
          </span>
        </div>
        <span>Powered by react-diff engine</span>
      </div>
    </div>
  );
};
