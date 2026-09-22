import React, { useState } from 'react';
import { ArrowRightIcon } from './Icons';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

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
};`
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
}`
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
}`
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

Please proceed with implementing the GetOrSet method.`
    }
  ];

  const current = steps[activeStep - 1];

  return (
    <section id="how-it-works" className="py-20 md:py-28 border-b border-[#E5E5EA] bg-[#FBFBFA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <p className="text-xs font-mono font-medium tracking-wide text-[#6E6E73] uppercase">
            Technical Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
            How continuity works.
          </h2>
          <p className="text-base text-[#515154] leading-relaxed">
            Four client-side stages operate entirely inside your browser sandbox without remote API dependencies.
          </p>
        </div>

        {/* Step Selector Tab Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8" role="tablist">
          {steps.map((st) => {
            const isSelected = activeStep === st.index;
            return (
              <button
                key={st.index}
                role="tab"
                aria-selected={isSelected}
                id={`step-tab-${st.index}`}
                onClick={() => setActiveStep(st.index)}
                className={`text-left p-4 rounded-xl border transition-colors ${
                  isSelected
                    ? 'bg-white border-[#1D1D1F] shadow-2xs'
                    : 'bg-[#F5F5F7] border-[#E5E5EA] hover:bg-white hover:border-[#D1D1D6]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#86868B]">0{st.index}</span>
                  <span className="text-[11px] font-mono text-[#6E6E73]">{st.subtitle}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#1D1D1F]">{st.name}</h3>
                <p className="text-xs text-[#6E6E73] mt-1 leading-snug line-clamp-2">
                  {st.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail */}
        <div className="bg-white rounded-xl border border-[#E5E5EA] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA]">
                  Stage {current.index} of 4
                </span>
                <span className="text-xs font-mono text-[#6E6E73]">{current.subtitle}</span>
              </div>

              <h3 className="text-2xl font-semibold text-[#1D1D1F]">
                {current.name}: {current.summary}
              </h3>

              <p className="text-sm text-[#515154] leading-relaxed">
                {current.description}
              </p>

              <div className="p-3.5 rounded-lg bg-[#F5F5F7] border border-[#E5E5EA] text-xs text-[#515154]">
                <strong className="text-[#1D1D1F] font-medium block mb-0.5">Implementation boundary</strong>
                {current.implementationNote}
              </div>

              {/* Step Navigation Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={activeStep === 4}
                  onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-white bg-[#1D1D1F] hover:bg-[#333336] disabled:opacity-30 disabled:pointer-events-none inline-flex items-center gap-1 transition-colors"
                >
                  <span>Next Stage</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right Column: Code Sample */}
            <div className="lg:col-span-6">
              <div className="rounded-lg border border-[#E5E5EA] bg-[#F5F5F7] overflow-hidden">
                <div className="px-3.5 py-2 border-b border-[#E5E5EA] bg-[#EBEBED] flex items-center justify-between text-xs font-mono text-[#6E6E73]">
                  <span>{current.name.toLowerCase()}-pipeline.ts</span>
                  <span>TypeScript</span>
                </div>
                <pre className="p-4 text-xs font-mono text-[#1D1D1F] overflow-x-auto leading-relaxed max-h-72">
                  <code>{current.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
