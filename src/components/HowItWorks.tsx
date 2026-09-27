import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from './Icons';
import { MOTION_VARIANTS } from '../theme';
import { IconMaximize, IconX, IconCode, IconPhoto } from '@tabler/icons-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(4);
  const [viewMode, setViewMode] = useState<'diagram' | 'code'>('diagram');
  const [activeModalImage, setActiveModalImage] = useState<{
    src: string;
    title: string;
    stage: string;
    caption: string;
  } | null>(null);

  const steps = [
    {
      index: 1,
      name: 'Observe',
      subtitle: 'DOM content extraction',
      summary: 'Content scripts capture finished assistant responses as you converse.',
      description:
        'A sandboxed content script runs quietly in supported web tabs (chatgpt.com, claude.ai, gemini.google.com). It monitors conversational turns using universal semantic tags and mutation observers, reading finished answers without intercepting keystrokes.',
      implementationNote: 'Content script scope is strictly limited to authorized chat domains in the extension manifest.',
      code: `// Content turn observer
const extractFinishedTurn = (domNode: HTMLElement) => {
  const role = domNode.getAttribute('data-message-author-role') || 'assistant';
  const textContent = domNode.innerText.trim();
  return { role, textContent, timestamp: Date.now() };
};`,
      codeFilename: 'observer-pipeline.ts',
      image: '/assets/images/dom_observer_diagram_1790143869458.jpg',
      imageAlt: 'DOM Observer Architecture & Mutation Stream Diagram',
      imageCaption: 'Real-time DOM mutation listener capturing message-role tags into on-device sandbox'
    },
    {
      index: 2,
      name: 'Index',
      subtitle: 'Hybrid normalization',
      summary: 'Conversations are segmented and indexed in browser memory.',
      description:
        'Turns are divided into manageable chunks, stripped of repetitive boilerplate, and indexed locally. ChatBridge builds both a sparse keyword representation (BM25) and dense embeddings, enabling precise keyword lookups alongside conceptual search.',
      implementationNote: 'Indexing runs in the background service worker on your CPU. Vector scoring takes 15 to 30 milliseconds.',
      code: `// Local memory record
interface MemoryTurn {
  turnId: string;
  sourceModel: 'chatgpt' | 'claude' | 'gemini';
  keywords: string[];
  embeddingVector: Float32Array; // 384-dimensional representation
  createdAt: number;
}`,
      codeFilename: 'indexing-pipeline.ts',
      image: '/assets/images/rrf_indexing_diagram_1790143908084.jpg',
      imageAlt: 'Reciprocal Rank Fusion (RRF) & Embeddings Cluster Diagram',
      imageCaption: 'Sparse BM25 lexical matcher converging with dense embeddings into fused rankings'
    },
    {
      index: 3,
      name: 'Encrypt',
      subtitle: 'Local AES-256-GCM',
      summary: 'Transcripts are saved locally to chrome.storage.local.',
      description:
        'Indexed dialogue chunks are encrypted using AES-256-GCM before writing to the local browser database. Your encryption key is generated on your device and never transmitted over the network. Zero data touches any external server or telemetry collector.',
      implementationNote: 'Deleting your browser extension removes all local keys and stored records immediately.',
      code: `// Encrypted local write
async function persistLocally(record: MemoryTurn, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(JSON.stringify(record))
  );
  await chrome.storage.local.set({ [record.turnId]: { iv, ciphertext } });
}`,
      codeFilename: 'vault-pipeline.ts',
      image: '/assets/images/aes_vault_diagram_1790143920464.jpg',
      imageAlt: 'SubtleCrypto Hardware Acceleration Vault Diagram',
      imageCaption: '256-bit symmetric key generation, IV nonces, and 128-bit authentication tags encrypted at rest'
    },
    {
      index: 4,
      name: 'Inject',
      subtitle: 'Prompt context insertion',
      summary: 'Relevant context is placed into the destination chat input.',
      description:
        'When you switch to a different AI assistant and press Cmd+Shift+K, ChatBridge surfaces candidate context turns ranked by Reciprocal Rank Fusion. Pressing Enter injects a concise context pill directly above your new prompt.',
      implementationNote: 'Prompt formatting is kept neutral and compact to minimize token overhead.',
      code: `// Injected prompt template
[Prior Context via ChatBridge]
- Architecture: 16-shard LRU cache with sync.RWMutex
- Constraints: 64-byte bucket alignment for CPU cache lines
- Completed: FNV-1a hashing adopted for uniform distribution

Please proceed with implementing the GetOrSet method.`,
      codeFilename: 'inject-pipeline.ts',
      image: '/assets/images/cmd_shift_k_hud_diagram_1790143946051.jpg',
      imageAlt: 'In-Browser HUD Cross-Model Injection Diagram',
      imageCaption: 'Universal command palette overlay injecting compressed capsules across ChatGPT and Claude'
    }
  ];

  const current = steps[activeStep - 1] || steps[0];

  return (
    <section id="architecture" className="py-16 md:py-24 border-b border-[#E5E5EA] dark:border-[#22222D] bg-[#FBFBFA] dark:bg-[#040405] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          variants={MOTION_VARIANTS.containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-3xl mb-10 sm:mb-12 space-y-3"
        >
          <motion.div variants={MOTION_VARIANTS.itemFadeInUp}>
            <span className="text-xs font-mono font-medium tracking-wide uppercase text-[#0071E3] dark:text-[#2997FF]">
              Technical Architecture
            </span>
          </motion.div>
          <motion.h2
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]"
          >
            How continuity works.
          </motion.h2>
          <motion.p
            variants={MOTION_VARIANTS.itemFadeInUp}
            className="text-base sm:text-lg leading-relaxed text-[#515154] dark:text-[#A1A1A6]"
          >
            Four client-side stages operate entirely inside your browser sandbox without remote API dependencies.
          </motion.p>
        </motion.div>

        {/* Step Selector Horizontal Cards */}
        <motion.div
          variants={MOTION_VARIANTS.containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 sm:mb-8"
          role="tablist"
        >
          {steps.map((st) => {
            const isSelected = activeStep === st.index;
            return (
              <motion.button
                variants={MOTION_VARIANTS.itemFadeInUp}
                key={st.index}
                role="tab"
                aria-selected={isSelected}
                id={`step-tab-${st.index}`}
                onClick={() => setActiveStep(st.index)}
                className={`text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 relative select-none ${
                  isSelected
                    ? 'bg-white dark:bg-[#1A1A26] border-[#0071E3] dark:border-[#2997FF] shadow-md ring-1 ring-[#0071E3]/20 dark:ring-[#2997FF]/30'
                    : 'bg-[#F5F5F7]/80 dark:bg-[#0E0E14] border-[#E5E5EA] dark:border-[#22222E] hover:bg-white dark:hover:bg-[#141420] hover:border-[#D1D1D6] dark:hover:border-[#333344]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-semibold ${isSelected ? 'text-[#0071E3] dark:text-[#2997FF]' : 'text-[#86868B] dark:text-[#787884]'}`}>
                    0{st.index}
                  </span>
                  <span className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] truncate ml-2">
                    {st.subtitle}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                  {st.name}
                </h3>
                <p className="text-xs text-[#6E6E73] dark:text-[#9E9EA7] mt-1.5 leading-snug line-clamp-2">
                  {st.summary}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active Stage Detail Panel */}
        <motion.div
          variants={MOTION_VARIANTS.cardScaleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="bg-white dark:bg-[#0E0E14] rounded-2xl border border-[#E5E5EA] dark:border-[#262633] p-5 sm:p-7 md:p-8 shadow-sm overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.index}
              variants={MOTION_VARIANTS.tabContentFade}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
            >
              {/* Left Column: Description & Navigation */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F5F5F7] dark:bg-[#181824] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#E5E5EA] dark:border-[#262638]">
                    Stage {current.index} of 4
                  </span>
                  <span className="text-xs font-mono text-[#6E6E73] dark:text-[#8E8E98] truncate">
                    {current.subtitle}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {current.name}: {current.summary}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-[#515154] dark:text-[#C7C7CC]">
                  {current.description}
                </p>

                {/* Implementation Boundary Callout */}
                <div className="p-3.5 rounded-xl bg-[#F5F5F7] dark:bg-[#14141E] border border-[#E5E5EA] dark:border-[#22222E] text-xs text-[#515154] dark:text-[#A1A1A6]">
                  <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium block mb-0.5">
                    Implementation boundary
                  </strong>
                  {current.implementationNote}
                </div>

                {/* Step Navigation Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#1D1D1F] dark:text-[#E5E5EA] bg-[#F5F5F7] dark:bg-[#1A1A26] hover:bg-[#E5E5EA] dark:hover:bg-[#252536] disabled:opacity-30 disabled:pointer-events-none transition-colors border border-neutral-200 dark:border-[#2A2A3A]"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStep === 4}
                    onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
                    className="px-4 py-1.5 rounded-lg text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] disabled:opacity-30 disabled:pointer-events-none inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Next Stage</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Embedded Architecture Diagram & Code Toggle */}
              <div className="lg:col-span-6 w-full">
                <div className="rounded-xl border border-[#E5E5EA] dark:border-[#282838] bg-[#09090E] overflow-hidden shadow-xs">
                  {/* Window Bar with Diagram / Code Switcher */}
                  <div className="px-3.5 py-2 border-b border-[#222230] bg-[#14141E] flex items-center justify-between text-xs font-mono text-[#8E8E98]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-600/40" />
                      <span className="text-neutral-300">
                        {viewMode === 'diagram' ? `${current.name.toLowerCase()}-schematic.svg` : current.codeFilename}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5">
                      <button
                        type="button"
                        onClick={() => setViewMode('diagram')}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] transition-colors ${
                          viewMode === 'diagram'
                            ? 'bg-[#0071E3] text-white font-medium shadow-2xs'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <IconPhoto className="w-3 h-3" />
                        <span>Diagram</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('code')}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] transition-colors ${
                          viewMode === 'code'
                            ? 'bg-[#0071E3] text-white font-medium shadow-2xs'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <IconCode className="w-3 h-3" />
                        <span>TypeScript</span>
                      </button>
                    </div>
                  </div>

                  {/* Panel Content: Diagram Image or Code View */}
                  {viewMode === 'diagram' ? (
                    <div className="relative p-3 bg-neutral-950 flex flex-col items-center justify-center min-h-[240px] sm:min-h-[280px] max-h-[340px]">
                      {/* Contained, Perfectly Sized Diagram (NOT full-page) */}
                      <div
                        onClick={() =>
                          setActiveModalImage({
                            src: current.image,
                            title: `Stage 0${current.index}: ${current.name} Architecture`,
                            stage: `Stage 0${current.index}`,
                            caption: current.imageCaption
                          })
                        }
                        className="relative w-full h-full max-h-[290px] flex items-center justify-center group cursor-zoom-in overflow-hidden rounded-lg bg-black/60 p-2"
                      >
                        <img
                          src={current.image}
                          alt={current.imageAlt}
                          className="max-h-[270px] w-auto max-w-full object-contain rounded-md transition-transform duration-200 group-hover:scale-[1.01]"
                          loading="eager"
                        />

                        {/* Subtle Zoom Badge in Top Corner */}
                        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono opacity-80 group-hover:opacity-100 group-hover:bg-[#0071E3] transition-all">
                          <IconMaximize className="w-3 h-3" />
                          <span className="hidden sm:inline">Zoom</span>
                        </div>
                      </div>

                      {/* Quiet Caption Bar */}
                      <div className="w-full mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span className="truncate">{current.imageCaption}</span>
                        <span className="text-[#2997FF] shrink-0 ml-2">Stage 0{current.index}</span>
                      </div>
                    </div>
                  ) : (
                    /* Code Snippet View */
                    <pre className="p-4 text-xs font-mono text-[#E5E5EA] overflow-x-auto leading-relaxed max-h-[320px]">
                      <code>{current.code}</code>
                    </pre>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal for Detail Inspection */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-white/20 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10 shrink-0">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0071E3] dark:text-[#2997FF]">
                  {activeModalImage.stage} • Architectural View
                </span>
                <h4 className="text-base sm:text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                  {activeModalImage.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveModalImage(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 flex items-center justify-center text-neutral-700 dark:text-white transition-colors"
                aria-label="Close modal"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            <div className="relative my-3 flex-1 min-h-[260px] sm:min-h-[420px] flex items-center justify-center bg-neutral-950 rounded-xl border border-neutral-200 dark:border-white/10 p-2 sm:p-4 overflow-hidden">
              <img
                src={activeModalImage.src}
                alt={activeModalImage.title}
                className="w-full h-auto max-h-[68vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans shrink-0">
              {activeModalImage.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
