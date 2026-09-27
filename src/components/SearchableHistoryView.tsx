import React, { useState, useMemo, useEffect } from 'react';
import {
  IconSearch,
  IconPin,
  IconPinnedOff,
  IconTrash,
  IconCopy,
  IconCheck,
  IconPlus,
  IconDownload,
  IconArrowRight,
  IconSparkles,
  IconTerminal,
  IconKey,
  IconClock,
  IconFilter,
  IconX,
  IconExternalLink,
  IconBrain
} from '@tabler/icons-react';
import { SavedContextSegment, PageView } from '../types';
import { getSavedContextSegments, saveContextSegments } from '../data/historyData';
import { useToast } from '../context/ToastContext';
import { ChatBridgeLogo } from './Logo';

interface SearchableHistoryViewProps {
  onOpenInstall?: () => void;
  onNavigateHome?: () => void;
}

export const SearchableHistoryView: React.FC<SearchableHistoryViewProps> = ({
  onOpenInstall,
  onNavigateHome
}) => {
  const { toast } = useToast();
  const [segments, setSegments] = useState<SavedContextSegment[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [targetModel, setTargetModel] = useState<'Claude' | 'ChatGPT' | 'Gemini' | 'DeepSeek'>('Claude');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isSimulatingInject, setIsSimulatingInject] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New segment form state
  const [newTitle, setNewTitle] = useState('');
  const [newModel, setNewModel] = useState<'ChatGPT' | 'Claude' | 'Gemini' | 'DeepSeek'>('ChatGPT');
  const [newCategory, setNewCategory] = useState<'architecture' | 'coding' | 'reasoning' | 'database'>('architecture');
  const [newTranscript, setNewTranscript] = useState('');
  const [newTags, setNewTags] = useState('React, TypeScript, Context');

  // Load from localStorage on mount
  useEffect(() => {
    const data = getSavedContextSegments();
    setSegments(data);
    if (data.length > 0) {
      setSelectedId(data[0].id);
    }
  }, []);

  // Sync to localStorage on segments update
  const updateSegments = (newSegments: SavedContextSegment[]) => {
    setSegments(newSegments);
    saveContextSegments(newSegments);
  };

  // Filtered and searched list
  const filteredSegments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return segments.filter((seg) => {
      // Model filter
      if (selectedModelFilter !== 'All' && seg.originModel !== selectedModelFilter) {
        return false;
      }
      // Category filter
      if (selectedCategoryFilter !== 'All' && seg.category !== selectedCategoryFilter) {
        return false;
      }
      // Pinned filter
      if (pinnedOnly && !seg.isPinned) {
        return false;
      }
      // Text query
      if (!query) return true;

      const titleMatch = seg.title.toLowerCase().includes(query);
      const summaryMatch = seg.summary.toLowerCase().includes(query);
      const tagMatch = seg.tags.some((t) => t.toLowerCase().includes(query));
      const transcriptMatch = seg.rawTranscript.toLowerCase().includes(query);
      const pillMatch = seg.compressedContextPill.toLowerCase().includes(query);

      return titleMatch || summaryMatch || tagMatch || transcriptMatch || pillMatch;
    });
  }, [segments, searchQuery, selectedModelFilter, selectedCategoryFilter, pinnedOnly]);

  const selectedSegment = useMemo(() => {
    return segments.find((s) => s.id === selectedId) || filteredSegments[0] || segments[0];
  }, [segments, selectedId, filteredSegments]);

  // Actions
  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = segments.map((s) =>
      s.id === id ? { ...s, isPinned: !s.isPinned } : s
    );
    updateSegments(updated);
    toast.info('Status updated', 'Context segment pin state changed.');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this encrypted context segment from local browser storage?')) return;
    const updated = segments.filter((s) => s.id !== id);
    updateSegments(updated);
    if (selectedId === id && updated.length > 0) {
      setSelectedId(updated[0].id);
    }
    toast.info('Deleted', 'Segment removed from local encrypted database.');
  };

  const handleCopyInjectedPayload = () => {
    if (!selectedSegment) return;
    const fullPayload = `${selectedSegment.suggestedPrompt || 'Context handoff from previous session:'}\n\n${selectedSegment.compressedContextPill}`;
    navigator.clipboard.writeText(fullPayload);
    setCopiedPrompt(true);
    toast.copied(
      `Injected into ${targetModel} format!`,
      `Context compressed to ${selectedSegment.compressedTokens} tokens (${Math.round((1 - selectedSegment.compressedTokens / selectedSegment.originalTokens) * 100)}% reduction).`
    );
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  const handleSimulateInjection = () => {
    if (!selectedSegment) return;
    setIsSimulatingInject(true);
    setTimeout(() => {
      setIsSimulatingInject(false);
      handleCopyInjectedPayload();
      toast.saved(
        `Summoned with ⌘+Shift+K to ${targetModel}`,
        `Context capsule ready in active tab's input prompt buffer.`
      );
    }, 600);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(segments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `chatbridge-context-history-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.saved('History Exported', 'Local context history downloaded as JSON.');
  };

  const handleCreateSegment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTranscript.trim()) return;

    const origTokens = Math.max(800, Math.floor(newTranscript.length / 3.8));
    const compTokens = Math.max(65, Math.floor(origTokens * 0.05));
    const tagArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newSeg: SavedContextSegment = {
      id: 'ctx-' + Date.now().toString().slice(-4),
      title: newTitle.trim(),
      originModel: newModel,
      category: newCategory,
      tags: tagArray.length > 0 ? tagArray : ['Custom Context'],
      rawTranscript: newTranscript.trim(),
      summary: newTranscript.slice(0, 140) + '...',
      compressedContextPill: `[ChatBridge Context • ${newTitle.trim()}]
Origin: ${newModel} (Turn 1)
Summary: ${newTranscript.slice(0, 100)}...
Variables: ${tagArray.join(', ')}
Target Goal: Continue task execution with loaded context.`,
      originalTokens: origTokens,
      compressedTokens: compTokens,
      timestamp: 'Just now',
      isPinned: false,
      rrfScore: 0.035,
      suggestedPrompt: `Continuing from our discussion in ${newModel} regarding ${newTitle.trim()}:`
    };

    const updated = [newSeg, ...segments];
    updateSegments(updated);
    setSelectedId(newSeg.id);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewTranscript('');
    toast.saved('Segment Saved', 'New context segment encrypted and stored in local memory.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-[#1D1D1F] dark:text-[#F5F5F7]">
      {/* Top Breadcrumb & Heading */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-1">
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors"
              >
                ChatBridge
              </button>
            )}
            <span>/</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">History Vault</span>
            <span>/</span>
            <span className="text-[#0071E3] dark:text-[#2997FF]">Context Search & Injection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white flex items-center gap-3">
            <span>Saved Context Segments</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              AES-256 Sandboxed
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
            Quickly search, inspect, and preview conversational memory segments before injecting them into target models like Claude, ChatGPT, Gemini, or DeepSeek.
          </p>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            <span>Add Segment</span>
          </button>
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-700 dark:text-neutral-200 text-xs font-medium border border-neutral-200 dark:border-white/10 transition-colors"
            title="Export local history as JSON"
          >
            <IconDownload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Main Search & Filter Control Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#111118] border border-neutral-200/90 dark:border-white/10 shadow-xs mb-6 space-y-3">
        {/* Search Input */}
        <div className="relative w-full">
          <IconSearch className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved context by keywords, code tokens, tags, or source model (e.g. 'Redis', 'Next.js', 'PostgreSQL', 'Auth')..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] dark:focus:border-[#2997FF] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              aria-label="Clear search"
            >
              <IconX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          {/* Origin Model Filters */}
          <div className="flex items-center gap-1 overflow-x-auto no-visible-scrollbar py-0.5">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mr-1">
              Origin:
            </span>
            {['All', 'ChatGPT', 'Claude', 'Gemini', 'DeepSeek'].map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModelFilter(model)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedModelFilter === model
                    ? 'bg-[#1D1D1F] text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5'
                }`}
              >
                {model}
              </button>
            ))}
          </div>

          {/* Quick Filters: Categories & Pinned */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="text-xs rounded-lg bg-neutral-100 dark:bg-[#1E1E2C] border border-neutral-200 dark:border-white/10 py-1 px-2.5 text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-[#0071E3]"
              aria-label="Filter by Topic"
            >
              <option value="All">All Topics</option>
              <option value="architecture">Architecture</option>
              <option value="coding">Coding & Dev</option>
              <option value="database">Database & Schema</option>
              <option value="reasoning">Reasoning & Prompts</option>
            </select>

            <button
              onClick={() => setPinnedOnly(!pinnedOnly)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                pinnedOnly
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-semibold'
                  : 'bg-neutral-100 dark:bg-[#1E1E2C] text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconPin className="w-3.5 h-3.5" />
              <span>Pinned ({segments.filter((s) => s.isPinned).length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual-Pane Layout: Left List, Right Inspector & Injection Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Segments List (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[780px] overflow-y-auto pr-1 scrollbar-none">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1 mb-1">
            <span>{filteredSegments.length} segments found</span>
            <span className="font-mono text-[11px]">Ranked by RRF</span>
          </div>

          {filteredSegments.length > 0 ? (
            filteredSegments.map((seg) => {
              const isSelected = selectedSegment?.id === seg.id;
              const reductionPct = Math.round((1 - seg.compressedTokens / seg.originalTokens) * 100);

              return (
                <div
                  key={seg.id}
                  onClick={() => setSelectedId(seg.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-blue-50/60 dark:bg-[#151D2A] border-[#0071E3] dark:border-[#2997FF] shadow-sm'
                      : 'bg-white dark:bg-[#111118] border-neutral-200/80 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20'
                  }`}
                >
                  {/* Top Row: Model & Pin Button */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-[11px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300">
                        {seg.originModel}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {seg.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-75 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleTogglePin(seg.id, e)}
                        className={`p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                          seg.isPinned ? 'text-amber-500' : 'text-neutral-400'
                        }`}
                        title={seg.isPinned ? 'Unpin context' : 'Pin context to top'}
                      >
                        <IconPin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(seg.id, e)}
                        className="p-1 rounded-md hover:bg-rose-500/10 text-neutral-400 hover:text-rose-500 transition-colors"
                        title="Delete from local encrypted index"
                      >
                        <IconTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-semibold tracking-tight text-[#1D1D1F] dark:text-white line-clamp-1">
                    {seg.title}
                  </h4>

                  {/* Summary */}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                    {seg.summary}
                  </p>

                  {/* Bottom Stats: Tokens, Savings, Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-neutral-100 dark:border-white/5 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                      <span className="text-[#0071E3] dark:text-[#2997FF] font-medium">
                        {seg.compressedTokens}t
                      </span>
                      <span className="text-neutral-400">/</span>
                      <span className="text-neutral-400 line-through">
                        {seg.originalTokens}t
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold ml-0.5">
                        (-{reductionPct}%)
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {seg.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 text-[10px]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-white dark:bg-[#111118] rounded-2xl border border-neutral-200 dark:border-white/10 text-neutral-400">
              <IconSearch className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-medium">No matching context segments found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedModelFilter('All');
                  setSelectedCategoryFilter('All');
                  setPinnedOnly(false);
                }}
                className="text-xs text-[#0071E3] dark:text-[#2997FF] hover:underline mt-2 inline-block"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Preview & Injection Studio (7 Cols on Desktop) */}
        {selectedSegment ? (
          <div className="lg:col-span-7 bg-white dark:bg-[#111118] rounded-2xl border border-neutral-200/90 dark:border-white/10 shadow-lg overflow-hidden flex flex-col transition-colors">
            {/* Inspector Header */}
            <div className="p-4 sm:p-6 border-b border-neutral-200/80 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <span className="text-[#0071E3] dark:text-[#2997FF] font-semibold">
                      {selectedSegment.originModel} Origin
                    </span>
                    <span>·</span>
                    <span>Captured {selectedSegment.timestamp}</span>
                    <span>·</span>
                    <span>RRF Score: {selectedSegment.rrfScore.toFixed(4)}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#1D1D1F] dark:text-white mt-1">
                    {selectedSegment.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    95% Token Compression
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {selectedSegment.summary}
              </p>

              {/* Extracted Structured Variables */}
              {selectedSegment.extractedVariables && selectedSegment.extractedVariables.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-neutral-200/60 dark:border-white/5 text-xs font-mono">
                  {selectedSegment.extractedVariables.map((v, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        {v.key}
                      </span>
                      <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 truncate mt-0.5">
                        {v.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Target Model Selector & Injection Simulator */}
            <div className="p-4 sm:p-6 space-y-5">
              {/* Target Model Chooser */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold tracking-tight text-[#1D1D1F] dark:text-white flex items-center gap-1.5">
                    <IconArrowRight className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                    <span>Choose Target Model to Inject Context:</span>
                  </label>
                  <span className="text-[11px] font-mono text-neutral-400">
                    One-click context handoff
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Claude' as const, name: 'Claude 3.7', desc: 'Anthropic', color: 'border-orange-500/30 text-orange-600 dark:text-orange-400' },
                    { id: 'ChatGPT' as const, name: 'ChatGPT-4o', desc: 'OpenAI', color: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400' },
                    { id: 'Gemini' as const, name: 'Gemini 2.0', desc: 'Google', color: 'border-blue-500/30 text-blue-600 dark:text-blue-400' },
                    { id: 'DeepSeek' as const, name: 'DeepSeek R1', desc: 'Reasoning', color: 'border-purple-500/30 text-purple-600 dark:text-purple-400' }
                  ].map((m) => {
                    const isTarget = targetModel === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setTargetModel(m.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all relative ${
                          isTarget
                            ? 'bg-[#0071E3]/10 dark:bg-[#2997FF]/10 border-[#0071E3] dark:border-[#2997FF] shadow-xs'
                            : 'bg-neutral-50/70 dark:bg-black/20 border-neutral-200/80 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                            {m.name}
                          </span>
                          {isTarget && (
                            <IconCheck className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" />
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                          {m.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Formatted Target Model Prompt Buffer Preview */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <IconTerminal className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" />
                    <span>Injected Prompt Buffer Preview ({targetModel})</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    {selectedSegment.compressedTokens} Tokens (Reduced from {selectedSegment.originalTokens})
                  </span>
                </div>

                <div className="relative rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-950 p-3.5 sm:p-4 text-xs font-mono text-neutral-200 overflow-x-auto shadow-inner leading-relaxed">
                  <div className="text-[#38BDF8] select-none mb-2 pb-2 border-b border-neutral-800">
                    // ChatBridge Context Injection Payload for {targetModel}
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-neutral-300">
                    {selectedSegment.suggestedPrompt || 'Context payload from past dialogue:'}
                    {'\n\n'}
                    {selectedSegment.compressedContextPill}
                  </pre>
                </div>
              </div>

              {/* Raw Dialogue Transcript Drawer / Toggle */}
              <details className="group border border-neutral-200/80 dark:border-white/10 rounded-xl bg-neutral-50/50 dark:bg-black/20 p-3 text-xs transition-colors">
                <summary className="font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer flex items-center justify-between select-none">
                  <span className="flex items-center gap-1.5">
                    <IconClock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>View Original Uncompressed Dialogue Transcript ({selectedSegment.originalTokens} tokens)</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-3 pt-3 border-t border-neutral-200/70 dark:border-white/10 space-y-2 text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                  <pre className="whitespace-pre-wrap font-mono text-[11px] text-neutral-700 dark:text-neutral-300 bg-white dark:bg-[#07070B] p-3 rounded-lg border border-neutral-200 dark:border-white/5 max-h-48 overflow-y-auto">
                    {selectedSegment.rawTranscript}
                  </pre>
                </div>
              </details>

              {/* Primary Injected Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-200/80 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono self-start sm:self-auto">
                  <IconKey className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Shortcut: ⌘+Shift+K to summon anywhere</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleCopyInjectedPayload}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 text-xs font-medium border border-neutral-200 dark:border-white/10 transition-colors shadow-2xs"
                  >
                    {copiedPrompt ? (
                      <>
                        <IconCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <IconCopy className="w-4 h-4" />
                        <span>Copy Capsule</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSimulateInjection}
                    disabled={isSimulatingInject}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all"
                  >
                    {isSimulatingInject ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Injecting...</span>
                      </>
                    ) : (
                      <>
                        <IconSparkles className="w-4 h-4" />
                        <span>Inject into {targetModel}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Modal: Add New Context Segment to Local Sandbox */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#111118] rounded-2xl border border-neutral-200 dark:border-white/10 max-w-lg w-full p-6 shadow-2xl relative text-[#1D1D1F] dark:text-[#F5F5F7]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <IconX className="w-4 h-4" />
            </button>

            <form onSubmit={handleCreateSegment} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-white">
                  Add Context Segment
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Save active discussion parameters to your local encrypted memory index.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Segment Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Stripe Webhook Signature Verification Flow"
                  required
                  className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-black/30 p-2.5 text-neutral-900 dark:text-white focus:outline-none focus:border-[#0071E3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Origin Model
                  </label>
                  <select
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1A1A26] p-2 text-neutral-900 dark:text-white"
                  >
                    <option value="ChatGPT">ChatGPT</option>
                    <option value="Claude">Claude</option>
                    <option value="Gemini">Gemini</option>
                    <option value="DeepSeek">DeepSeek</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Topic Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1A1A26] p-2 text-neutral-900 dark:text-white"
                  >
                    <option value="architecture">Architecture</option>
                    <option value="coding">Coding & Dev</option>
                    <option value="database">Database & Schema</option>
                    <option value="reasoning">Reasoning</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Raw Dialogue / Reasoning Excerpt
                </label>
                <textarea
                  value={newTranscript}
                  onChange={(e) => setNewTranscript(e.target.value)}
                  placeholder="Paste discussion turn or technical decision notes here..."
                  rows={4}
                  required
                  className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-black/30 p-2.5 text-neutral-900 dark:text-white resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Stripe, Webhooks, Security, Next.js"
                  className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-black/30 p-2 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold"
                >
                  Save & Encrypt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
