import React, { useState } from 'react';
import {
  IconEye,
  IconCpu,
  IconShieldLock,
  IconBrain,
  IconTerminal,
  IconArrowRight,
  IconCheck,
  IconCode,
  IconLayersLinked
} from '@tabler/icons-react';
import { PageView } from '../types';
import { smoothScrollTo } from '../hooks/useGsapSmoothScroll';
import { LiquidGlassCard } from './ui/LiquidGlassCard';

interface SubpageConnectorsProps {
  onNavigate: (view: PageView) => void;
}

interface LayerItem {
  id: string;
  layerNumber: string;
  name: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  view: PageView;
  ctaText: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  gradient: string;
  pipelineSpec: {
    input: string;
    processing: string;
    output: string;
  };
}

export const SubpageConnectors: React.FC<SubpageConnectorsProps> = ({ onNavigate }) => {
  const [activeLayerIndex, setActiveLayerIndex] = useState(3); // Default to Memory & History Vault

  const layers: LayerItem[] = [
    {
      id: 'layer-observe',
      layerNumber: 'Layer 01',
      name: 'DOM Observation & Turn Interception',
      subtitle: 'Universal Zero-Injection Sensor',
      description:
        'A sandboxed Chromium MutationObserver monitors assistant streaming turns inside ChatGPT, Claude, and Gemini tabs, extracting completed message blocks into isolated memory without keystroke capture.',
      metricLabel: 'Observation Latency',
      metricValue: '< 2ms on CPU',
      view: 'how-it-works',
      ctaText: 'Explore 4-Stage Architecture',
      icon: IconEye,
      accentColor: 'text-[#0071E3] dark:text-[#2997FF]',
      gradient: 'from-[#0071E3]/20 via-[#2997FF]/10 to-transparent',
      pipelineSpec: {
        input: 'Streaming DOM Mutation Nodes',
        processing: 'Semantic Role Filtering',
        output: 'Raw Markdown Turns'
      }
    },
    {
      id: 'layer-index',
      layerNumber: 'Layer 02',
      name: 'Hybrid Normalization & Vector Fusion',
      subtitle: 'Reciprocal Rank Fusion (RRF)',
      description:
        'Merges BM25 sparse lexical tokens (function identifiers, UUIDs, stack traces) with 384-dimensional dense semantic vectors using RRF (k=60) for balanced precision and high recall.',
      metricLabel: 'Retrieval Recall@5',
      metricValue: '76.8% (+3.9pp gain)',
      view: 'comparison',
      ctaText: 'View RRF Comparison Matrix',
      icon: IconCpu,
      accentColor: 'text-purple-600 dark:text-purple-400',
      gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      pipelineSpec: {
        input: 'Lexical + Dense Embeddings',
        processing: 'RRF Rank Fusion (k=60)',
        output: 'Unified Candidate Ranked Vector'
      }
    },
    {
      id: 'layer-encrypt',
      layerNumber: 'Layer 03',
      name: 'WebCrypto Hardware Airgap Vault',
      subtitle: 'Local AES-256-GCM Non-Extractable',
      description:
        'Military-grade symmetric encryption runs on-device via Chromium window.crypto.subtle. Symmetric keys remain non-extractable in memory, while 12-byte IV nonces prevent replay or storage inspection.',
      metricLabel: 'Remote Exfiltration',
      metricValue: '0 Bytes (Strict Local)',
      view: 'local-privacy',
      ctaText: 'Inspect Formal Threat Model',
      icon: IconShieldLock,
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      pipelineSpec: {
        input: 'Plaintext Conversation Chunks',
        processing: 'SubtleCrypto Hardware AES-256-GCM',
        output: 'Encrypted chrome.storage.local'
      }
    },
    {
      id: 'layer-memory',
      layerNumber: 'Layer 04',
      name: 'Searchable Context History & Markdown Beautifier',
      subtitle: 'Token Capsule Synthesis Engine',
      description:
        'Distills lengthy conversational transcripts into concise ~120-token context capsules. Search by keyword, inspect formatted markdown previews, and curate project context before model handoff.',
      metricLabel: 'Token Compression',
      metricValue: '-95.1% Token Overhead',
      view: 'history',
      ctaText: 'Open Searchable History Vault',
      icon: IconBrain,
      accentColor: 'text-[#0071E3] dark:text-[#38BDF8]',
      gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
      pipelineSpec: {
        input: '2,500+ Dialogue Tokens',
        processing: 'Discourse AST Distillation',
        output: '118-Token Context Capsule'
      }
    },
    {
      id: 'layer-inject',
      layerNumber: 'Layer 05',
      name: 'Cross-Model Injection & ⌘+Shift+K HUD',
      subtitle: 'Universal Prompt Synthesis Buffer',
      description:
        'Press ⌘+Shift+K in any browser tab to summon the floating command HUD. Select candidate context capsules and inject them into Claude, ChatGPT, Gemini, or DeepSeek prompt buffers with one keystroke.',
      metricLabel: 'Injection Delay',
      metricValue: '< 30ms Across Tabs',
      view: 'faq',
      ctaText: 'View Keybinds & Platform FAQ',
      icon: IconTerminal,
      accentColor: 'text-amber-600 dark:text-amber-400',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      pipelineSpec: {
        input: 'Compressed Context Capsule',
        processing: 'Target Model Prompt Preamble',
        output: 'Input Chat Field Injected'
      }
    }
  ];

  const activeLayer = layers[activeLayerIndex];
  const ActiveIcon = activeLayer.icon;

  const handleNavigate = (view: PageView) => {
    onNavigate(view);
    smoothScrollTo(document.body, { offset: 0 });
  };

  return (
    <section id="layers-of-chatbridge" className="py-20 md:py-28 border-b border-neutral-200/80 dark:border-white/10 bg-neutral-50/60 dark:bg-[#07070B] transition-colors relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/10 dark:bg-[#2997FF]/10 text-[#0071E3] dark:text-[#2997FF] border border-[#0071E3]/20 dark:border-[#2997FF]/20 text-xs font-mono font-medium">
            <IconLayersLinked className="w-3.5 h-3.5" />
            <span>Interactive Architectural Stack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
            The 5 Layers of ChatBridge
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            From sandboxed DOM observers to hybrid RRF vector ranking and WebCrypto AES-256 vaults, explore how context moves safely between your AI models.
          </p>
        </div>

        {/* Bespoke Interactive Layer Stack Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Layer Stratum (5 Cols on Desktop) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 px-1 mb-2">
              <span>SYSTEM STRATA (CLIENT-SIDE)</span>
              <span>TAP TO INSPECT</span>
            </div>

            {layers.map((layer, idx) => {
              const isSelected = activeLayerIndex === idx;
              const Icon = layer.icon;

              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative group flex items-center justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-[#14141E] border-[#0071E3] dark:border-[#2997FF] shadow-md ring-1 ring-[#0071E3]/20 dark:ring-[#2997FF]/30 scale-[1.01]'
                      : 'bg-white/70 dark:bg-[#0E0E14]/80 border-neutral-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-[#12121A] hover:border-neutral-300 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Layer Number & Icon Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? 'bg-[#0071E3] text-white border-[#0071E3]'
                          : 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono font-semibold ${isSelected ? 'text-[#0071E3] dark:text-[#2997FF]' : 'text-neutral-400'}`}>
                          {layer.layerNumber}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 truncate">
                          {layer.subtitle}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-white tracking-tight truncate mt-0.5">
                        {layer.name}
                      </h4>
                    </div>
                  </div>

                  {/* Active Indicator Chevron */}
                  <div className={`p-1.5 rounded-lg shrink-0 transition-transform ${isSelected ? 'text-[#0071E3] dark:text-[#2997FF] translate-x-0.5' : 'text-neutral-400 opacity-40 group-hover:opacity-100'}`}>
                    <IconArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Layer Architectural Blueprint & Subpage Gateway (7 Cols on Desktop) */}
          <LiquidGlassCard className="lg:col-span-7 overflow-hidden flex flex-col p-0 shadow-xl border-neutral-200/90 dark:border-white/10" glowColor="rgba(0, 113, 227, 0.15)">
            {/* Header Banner */}
            <div className={`p-6 sm:p-7 border-b border-neutral-200/80 dark:border-white/10 bg-gradient-to-r ${activeLayer.gradient}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl bg-white dark:bg-black/40 border border-neutral-200/80 dark:border-white/10 flex items-center justify-center ${activeLayer.accentColor} shadow-2xs`}>
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      {activeLayer.layerNumber} • {activeLayer.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white mt-0.5">
                      {activeLayer.name}
                    </h3>
                  </div>
                </div>

                <div className="self-start sm:self-auto shrink-0 px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 border border-neutral-200 dark:border-white/10 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 shadow-2xs">
                  {activeLayer.metricValue}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mt-3">
                {activeLayer.description}
              </p>
            </div>

            {/* Data Flow Conduit Schematic */}
            <div className="p-6 sm:p-7 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                  Architectural Data Pipeline
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#14141E] border border-neutral-200/80 dark:border-white/10 space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Input</span>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200 break-words">
                      {activeLayer.pipelineSpec.input}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#14141E] border border-neutral-200/80 dark:border-white/10 space-y-1 relative">
                    <span className="text-[10px] text-[#0071E3] dark:text-[#2997FF] uppercase tracking-wider">Processing</span>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200 break-words">
                      {activeLayer.pipelineSpec.processing}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#14141E] border border-neutral-200/80 dark:border-white/10 space-y-1">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Output</span>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200 break-words">
                      {activeLayer.pipelineSpec.output}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subpage Deep Dive Action Bar */}
              <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-500 font-mono self-start sm:self-auto flex items-center gap-1.5">
                  <IconLayersLinked className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                  <span>Dedicated interactive subpage available</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleNavigate(activeLayer.view)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-xs transition-colors group"
                >
                  <span>{activeLayer.ctaText}</span>
                  <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  );
};
