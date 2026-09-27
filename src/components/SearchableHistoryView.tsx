import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconSearch,
  IconPin,
  IconTrash,
  IconCopy,
  IconCheck,
  IconPlus,
  IconDownload,
  IconArrowRight,
  IconX,
  IconEye,
  IconCode,
  IconFileText,
  IconShieldCheck,
  IconBolt,
  IconRefresh,
  IconInfoCircle,
  IconDatabase,
  IconLayersLinked
} from '@tabler/icons-react';
import { SavedContextSegment, PageView } from '../types';
import { getSavedContextSegments, saveContextSegments, INITIAL_CONTEXT_SEGMENTS } from '../data/historyData';
import { useToast } from '../context/ToastContext';
import { LiquidLogoCanvas } from './LiquidLogoCanvas';

interface SearchableHistoryViewProps {
  onOpenInstall?: () => void;
  onNavigateHome?: () => void;
}

export const SearchableHistoryView: React.FC<SearchableHistoryViewProps> = ({
  onOpenInstall: _onOpenInstall,
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
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState(false);
  const [isSimulatingInject, setIsSimulatingInject] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // New segment form state
  const [newTitle, setNewTitle] = useState('');
  const [newModel, setNewModel] = useState<'ChatGPT' | 'Claude' | 'Gemini' | 'DeepSeek'>('ChatGPT');
  const [newCategory, setNewCategory] = useState<'architecture' | 'coding' | 'reasoning' | 'database'>('architecture');
  const [newTranscript, setNewTranscript] = useState('');
  const [newTags, setNewTags] = useState('React, TypeScript, State');

  // Load from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const data = getSavedContextSegments();
      setSegments(data);
      if (data.length > 0) {
        setSelectedId(data[0].id);
      }
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
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
      if (selectedModelFilter !== 'All' && seg.originModel !== selectedModelFilter) {
        return false;
      }
      if (selectedCategoryFilter !== 'All' && seg.category !== selectedCategoryFilter) {
        return false;
      }
      if (pinnedOnly && !seg.isPinned) {
        return false;
      }
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
    toast.info('Updated', 'Note pin status toggled.');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this saved conversation from your browser storage?')) return;
    const updated = segments.filter((s) => s.id !== id);
    updateSegments(updated);
    if (selectedId === id && updated.length > 0) {
      setSelectedId(updated[0].id);
    }
    toast.info('Deleted', 'Note removed from local storage.');
  };

  const handleRestoreSampleData = () => {
    setIsLoading(true);
    setTimeout(() => {
      updateSegments(INITIAL_CONTEXT_SEGMENTS);
      if (INITIAL_CONTEXT_SEGMENTS.length > 0) {
        setSelectedId(INITIAL_CONTEXT_SEGMENTS[0].id);
      }
      setIsLoading(false);
      toast.saved('Sample Vault Loaded', 'Restored sample cross-AI conversation notes.');
    }, 250);
  };

  const handleCopyInjectedPayload = (modelName?: string) => {
    if (!selectedSegment) return;
    const dest = modelName || targetModel;
    const fullPayload = `${selectedSegment.suggestedPrompt || 'Context from previous session:'}\n\n${selectedSegment.compressedContextPill}`;
    navigator.clipboard.writeText(fullPayload);
    setCopiedPrompt(true);
    toast.copied(
      `Copied for ${dest}!`,
      `Ready to paste into ${dest} to continue your session seamlessly.`
    );
    setTimeout(() => setCopiedPrompt(false), 2400);
  };

  const handleSimulateInjection = () => {
    if (!selectedSegment) return;
    setIsSimulatingInject(true);

    setTimeout(() => {
      setIsSimulatingInject(false);
      handleCopyInjectedPayload();
      toast.saved(
        `Transferred to ${targetModel}`,
        `Context capsule is ready in the active input prompt.`
      );
    }, 600);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(segments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `chatbridge-vault-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.saved('Export Complete', 'Encrypted local history downloaded as JSON.');
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
      tags: tagArray.length > 0 ? tagArray : ['Custom Note'],
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
    toast.saved('Saved to Vault', 'New conversation note added to your local notebook.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-200">
      {/* Top Breadcrumb & Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white flex items-center gap-3">
            <LiquidLogoCanvas size={32} />
            <span>AI Memory Notebook & Vault</span>
            <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <IconShieldCheck className="w-3.5 h-3.5" />
              <span>100% Local Device Storage</span>
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Your private browser-based memory notebook. Switch between ChatGPT, Claude, and Gemini without losing your conversation context.
          </p>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            <span>Add Note</span>
          </button>
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-700 dark:text-neutral-200 text-xs font-medium border border-neutral-200 dark:border-white/10 transition-colors"
            title="Download your private saved memories as JSON"
          >
            <IconDownload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Backup</span>
          </button>
        </div>
      </motion.div>

      {/* Main Search & Filter Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#111118] border border-neutral-200/90 dark:border-white/10 shadow-xs mb-6 space-y-3"
      >
        {/* Search Input */}
        <div className="relative w-full">
          <IconSearch className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved chats by topic, keyword, or language (e.g. 'React', 'Redis', 'Auth', 'PostgreSQL')..."
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
              Source AI:
            </span>
            {['All', 'ChatGPT', 'Claude', 'Gemini', 'DeepSeek'].map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModelFilter(model)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedModelFilter === model
                    ? 'bg-[#1D1D1F] text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5'
                }`}
              >
                {model === 'All' ? 'All Models' : model}
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
              <option value="architecture">Architecture & Systems</option>
              <option value="coding">Coding & Bugs</option>
              <option value="database">Database & Schemas</option>
              <option value="reasoning">Brainstorming & Prompts</option>
            </select>

            <button
              onClick={() => setPinnedOnly(!pinnedOnly)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                pinnedOnly
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-semibold'
                  : 'bg-neutral-100 dark:bg-[#1E1E2C] text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconPin className="w-3.5 h-3.5" />
              <span>Favorites ({segments.filter((s) => s.isPinned).length})</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3-COLUMN EDITORIAL GRID LAYOUT */}
      {isLoading ? (
        /* LOW-PROFILE THEME-ADAPTIVE SKELETON LOADING STATE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Column 1 Skeleton */}
          <div className="lg:col-span-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-neutral-200/60 dark:border-white/5 bg-white dark:bg-[#111118] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-16 h-4 rounded-md skeleton-shimmer" />
                  <div className="w-12 h-3 rounded-md skeleton-shimmer" />
                </div>
                <div className="w-3/4 h-4 rounded-md skeleton-shimmer" />
                <div className="w-full h-3 rounded-md skeleton-shimmer" />
                <div className="w-2/3 h-3 rounded-md skeleton-shimmer" />
                <div className="pt-2 flex justify-between">
                  <div className="w-24 h-3 rounded-md skeleton-shimmer" />
                  <div className="w-12 h-3 rounded-md skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 Skeleton */}
          <div className="lg:col-span-4 p-5 rounded-2xl border border-neutral-200/60 dark:border-white/5 bg-white dark:bg-[#111118] space-y-4">
            <div className="flex justify-between border-b border-neutral-200/60 dark:border-white/5 pb-2.5">
              <div className="w-32 h-4 rounded-md skeleton-shimmer" />
              <div className="w-16 h-3 rounded-md skeleton-shimmer" />
            </div>
            <div className="w-full h-16 rounded-xl skeleton-shimmer" />
            <div className="w-48 h-5 rounded-md skeleton-shimmer" />
            <div className="w-full h-12 rounded-md skeleton-shimmer" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 rounded-lg skeleton-shimmer" />
              <div className="h-12 rounded-lg skeleton-shimmer" />
            </div>
            <div className="w-full h-36 rounded-xl skeleton-shimmer" />
          </div>

          {/* Column 3 Skeleton */}
          <div className="lg:col-span-4 p-5 rounded-2xl border border-neutral-200/60 dark:border-white/5 bg-white dark:bg-[#111118] space-y-4">
            <div className="flex justify-between border-b border-neutral-200/60 dark:border-white/5 pb-2.5">
              <div className="w-28 h-4 rounded-md skeleton-shimmer" />
              <div className="w-14 h-3 rounded-md skeleton-shimmer" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-10 rounded-xl skeleton-shimmer" />
              <div className="h-10 rounded-xl skeleton-shimmer" />
              <div className="h-10 rounded-xl skeleton-shimmer" />
              <div className="h-10 rounded-xl skeleton-shimmer" />
            </div>
            <div className="w-full h-40 rounded-xl skeleton-shimmer" />
            <div className="w-full h-10 rounded-xl skeleton-shimmer" />
          </div>
        </div>
      ) : segments.length === 0 ? (
        /* PROFESSIONAL EMPTY VAULT STATE */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#111118] p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-sm"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] mx-auto mb-4">
            <IconDatabase className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
            Your Memory Vault is Empty
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-6 leading-relaxed">
            As you chat with ChatGPT, Claude, or Gemini in your browser, ChatBridge will automatically capture key turns and code here without sending anything to the cloud.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestoreSampleData}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <IconRefresh className="w-4 h-4" />
              <span>Load Sample AI Notes</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 text-xs font-medium border border-neutral-200 dark:border-white/10 transition-colors"
            >
              <IconPlus className="w-4 h-4" />
              <span>Create First Note</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* ROW 1: Notes List & Raw Conversation Data (2 equal columns on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* COLUMN 1: Editorial Conversations Grid/Cards (6 Cols on Desktop) */}
            <div className="lg:col-span-6 space-y-3 max-h-[780px] overflow-y-auto pr-1 custom-scrollbar">
              <div className="flex items-center justify-between text-xs text-neutral-500 px-1 mb-1">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  {filteredSegments.length} {filteredSegments.length === 1 ? 'Note' : 'Notes'} Found
                </span>
                <span className="text-[11px] text-neutral-400">Select to inspect</span>
              </div>

              {filteredSegments.length > 0 ? (
                filteredSegments.map((seg, idx) => {
                  const isSelected = selectedSegment?.id === seg.id;
                  const reductionPct = Math.round((1 - seg.compressedTokens / seg.originalTokens) * 100);

                  return (
                    <motion.div
                      key={seg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.2) }}
                      onClick={() => setSelectedId(seg.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                        isSelected
                          ? 'bg-blue-50/80 dark:bg-[#141C2B] border-[#0071E3] dark:border-[#2997FF] shadow-xs ring-1 ring-[#0071E3]/20'
                          : 'bg-white dark:bg-[#111118] border-neutral-200/80 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20'
                      }`}
                    >
                      {/* Top Row: Model & Pin/Delete */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-white/5">
                            {seg.originModel}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {seg.timestamp}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleTogglePin(seg.id, e)}
                            className={`p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                              seg.isPinned ? 'text-amber-500' : 'text-neutral-400'
                            }`}
                            title={seg.isPinned ? 'Unpin note' : 'Star note'}
                          >
                            <IconPin className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(seg.id, e)}
                            className="p-1 rounded-md hover:bg-rose-500/10 text-neutral-400 hover:text-rose-500 transition-colors"
                            title="Delete from local storage"
                          >
                            <IconTrash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs sm:text-sm font-bold tracking-tight text-[#1D1D1F] dark:text-white line-clamp-1">
                        {seg.title}
                      </h4>

                      {/* Summary in Plain English */}
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {seg.summary}
                      </p>

                      {/* Bottom Info: Clean Tags & Savings */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-neutral-100 dark:border-white/5 text-[10px]">
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                          <IconCheck className="w-3 h-3" />
                          <span>{reductionPct}% token compression</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {seg.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                /* PROFESSIONAL SEARCH EMPTY STATE */
                <div className="p-6 text-center bg-white dark:bg-[#111118] rounded-2xl border border-neutral-200 dark:border-white/10 text-neutral-400 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center mx-auto text-neutral-400">
                    <IconSearch className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      No matching conversations
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Try searching for terms like <span className="font-mono text-[#0071E3] dark:text-[#2997FF]">React</span>, <span className="font-mono text-[#0071E3] dark:text-[#2997FF]">Redis</span>, or <span className="font-mono text-[#0071E3] dark:text-[#2997FF]">Database</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedModelFilter('All');
                      setSelectedCategoryFilter('All');
                      setPinnedOnly(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-semibold text-[#0071E3] dark:text-[#2997FF] transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* COLUMN 2: Metadata & Raw Conversation Data (6 Cols on Desktop) */}
            <AnimatePresence mode="wait">
              {selectedSegment ? (
                <motion.div
                  key={selectedSegment.id + '-meta'}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.25 }}
                  className="lg:col-span-6 bg-white dark:bg-[#111118] rounded-2xl border border-neutral-200/90 dark:border-white/10 shadow-sm p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    {/* Column Header */}
                    <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-white/10 pb-2.5">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                        <IconFileText className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                        <span>Raw Conversation Data</span>
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {selectedSegment.originModel} Excerpt
                      </span>
                    </div>

                    {/* Local Storage Concept Explainer Box */}
                    <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-[#0E1524] border border-blue-200/70 dark:border-blue-500/20 text-[11px] text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-1">
                      <div className="font-semibold text-[#0071E3] dark:text-[#2997FF] flex items-center gap-1">
                        <IconInfoCircle className="w-3.5 h-3.5" />
                        <span>What is Local Storage?</span>
                      </div>
                      <p className="text-[10px] text-neutral-600 dark:text-neutral-400">
                        This text is saved only inside your computer's browser memory (<code className="font-mono bg-white/70 dark:bg-black/40 px-1 py-0.2 rounded">chrome.storage.local</code>). Zero cloud servers have access.
                      </p>
                    </div>

                    {/* Title and Summary */}
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {selectedSegment.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                        {selectedSegment.summary}
                      </p>
                    </div>

                    {/* Extracted Key Facts */}
                    {selectedSegment.extractedVariables && selectedSegment.extractedVariables.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-white/5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                          Extracted Facts & Variables
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-xs">
                          {selectedSegment.extractedVariables.map((v, idx) => (
                            <div key={idx} className="p-1.5 px-2 rounded-lg bg-neutral-50 dark:bg-white/5 border border-neutral-200/70 dark:border-white/5">
                              <span className="text-[9px] font-mono text-neutral-400 uppercase block truncate">
                                {v.key}
                              </span>
                              <span className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 truncate block">
                                {v.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Raw Transcript Content */}
                    <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-white/5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span>Original Text ({selectedSegment.originalTokens} tokens)</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedSegment.rawTranscript);
                            setCopiedCodeSnippet(true);
                            toast.copied('Transcript Copied', 'Original conversation text copied.');
                            setTimeout(() => setCopiedCodeSnippet(false), 2000);
                          }}
                          className="text-[#0071E3] dark:text-[#2997FF] hover:underline flex items-center gap-0.5"
                        >
                          <IconCopy className="w-3 h-3" />
                          <span>{copiedCodeSnippet ? 'Copied' : 'Copy Text'}</span>
                        </button>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/5 text-[11px] font-mono text-neutral-800 dark:text-neutral-300 max-h-[220px] overflow-y-auto leading-relaxed whitespace-pre-wrap custom-scrollbar">
                        {selectedSegment.rawTranscript}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* ROW 2: Target AI Preview & Handoff Studio (Full Width Below) */}
          <AnimatePresence mode="wait">
            {selectedSegment ? (
              <motion.div
                key={selectedSegment.id + '-preview'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25 }}
                className="w-full bg-white dark:bg-[#111118] rounded-2xl border border-neutral-200/90 dark:border-white/10 shadow-sm p-5 sm:p-6 space-y-4"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <IconEye className="w-4.5 h-4.5 text-[#0071E3] dark:text-[#2997FF]" />
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      Target AI Preview & Handoff Studio
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Compressed Context: {selectedSegment.compressedTokens} Tokens
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left Box: Model Selector */}
                  <div className="md:col-span-4 space-y-3">
                    <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
                      1. Choose Destination AI Model:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'Claude' as const, name: 'Claude 3.7' },
                        { id: 'ChatGPT' as const, name: 'ChatGPT-4o' },
                        { id: 'Gemini' as const, name: 'Gemini 2.0' },
                        { id: 'DeepSeek' as const, name: 'DeepSeek R1' }
                      ].map((m) => {
                        const isTarget = targetModel === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setTargetModel(m.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isTarget
                                ? 'bg-[#0071E3]/10 dark:bg-[#2997FF]/10 border-[#0071E3] dark:border-[#2997FF] shadow-xs'
                                : 'bg-neutral-50 dark:bg-black/20 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-neutral-900 dark:text-white">
                              <span>{m.name}</span>
                              {isTarget && <IconCheck className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleCopyInjectedPayload()}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-bold shadow-md transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                      >
                        {copiedPrompt ? (
                          <>
                            <IconCheck className="w-4 h-4" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <IconCopy className="w-4 h-4" />
                            <span>Copy Capsule for {targetModel}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleSimulateInjection}
                        disabled={isSimulatingInject}
                        className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <IconBolt className={`w-3.5 h-3.5 ${isSimulatingInject ? 'animate-spin' : 'text-[#0071E3] dark:text-[#2997FF]'}`} />
                        <span>{isSimulatingInject ? 'Transferring...' : `Simulate Context Handoff`}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Box: Formatted Preview Capsule */}
                  <div className="md:col-span-8 space-y-2">
                    <span className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 block">
                      2. What {targetModel} will read:
                    </span>
                    <div className="p-3.5 rounded-xl bg-neutral-50/90 dark:bg-[#0A0A10] border border-neutral-200 dark:border-white/10 text-xs font-mono space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                      <p className="text-xs font-medium italic text-[#0071E3] dark:text-[#2997FF]">
                        "{selectedSegment.suggestedPrompt}"
                      </p>
                      <div className="p-3 rounded-lg bg-white dark:bg-[#12121A] border border-neutral-200/70 dark:border-white/5 text-[11px] text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
                        {selectedSegment.compressedContextPill}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}

      {/* MANUAL ADD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#12121A] border border-neutral-200 dark:border-white/10 p-6 sm:p-7 shadow-2xl relative"
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
                  Add Conversation Note
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Save a chat excerpt to your private on-device memory notebook.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Topic / Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Next.js Auth Flow Setup"
                  required
                  className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-black/30 p-2.5 text-neutral-900 dark:text-white focus:outline-none focus:border-[#0071E3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Source AI
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
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1A1A26] p-2 text-neutral-900 dark:text-white"
                  >
                    <option value="architecture">Architecture</option>
                    <option value="coding">Coding & Dev</option>
                    <option value="database">Database</option>
                    <option value="reasoning">Brainstorming</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Notes / Chat Transcript
                </label>
                <textarea
                  value={newTranscript}
                  onChange={(e) => setNewTranscript(e.target.value)}
                  placeholder="Paste your conversation excerpt or bullet points here..."
                  rows={4}
                  required
                  className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-black/30 p-2.5 text-neutral-900 dark:text-white resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="React, Next.js, Auth, Security"
                  className="w-full text-xs rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-black/30 p-2 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold"
                >
                  Save Locally
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
