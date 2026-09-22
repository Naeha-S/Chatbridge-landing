import React, { useState } from 'react';
import { RetrievalHeatmap } from './RetrievalHeatmap';
import { HybridRetrievalDiagram } from './HybridRetrievalDiagram';
import {
  CpuIcon,
  DatabaseIcon,
  ShieldCheckIcon,
  TerminalIcon,
  CopyIcon,
  CheckIcon,
  ZapIcon,
  SlidersIcon,
  ArrowRightIcon,
  RefreshIcon
} from './Icons';

type SubsystemId = 'dom' | 'retrieval' | 'storage' | 'prompt';

interface FeaturesSectionProps {
  isDarkMode?: boolean;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isDarkMode = true }) => {
  const [activeSubsystem, setActiveSubsystem] = useState<SubsystemId>('dom');
  const [activeCodeTab, setActiveCodeTab] = useState<'dom' | 'rrf' | 'crypto' | 'prompt'>('dom');
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive Simulator States
  // 1. DOM Simulator
  const [domScenario, setDomScenario] = useState<'standard' | 'obfuscated' | 'streaming'>('standard');

  // 2. RRF Interactive Calculator
  const [rrfK, setRrfK] = useState<number>(60);
  const [lexicalRank, setLexicalRank] = useState<number>(1);
  const [denseRank, setDenseRank] = useState<number>(2);

  // 3. Crypto Simulator
  const [rawSecretText, setRawSecretText] = useState('DATABASE_URL=postgres://prod_user:secret@10.0.4.12:5432/app');
  const [isEncrypted, setIsEncrypted] = useState(true);

  // 4. Token Optimizer
  const [tokenTopic, setTokenTopic] = useState<'concurrency' | 'postgres' | 'oauth'>('concurrency');

  const subsystems = [
    {
      id: 'dom' as SubsystemId,
      step: '01',
      title: 'DOM Mutation Cascade',
      tagline: '3-tier defensive extraction',
      budget: '< 1.8ms',
      icon: TerminalIcon,
    },
    {
      id: 'retrieval' as SubsystemId,
      step: '02',
      title: 'Hybrid RRF Engine',
      tagline: 'Dual-channel BM25 + Dense',
      budget: '~14.2ms',
      icon: CpuIcon,
    },
    {
      id: 'storage' as SubsystemId,
      step: '03',
      title: 'Hardware Crypto Vault',
      tagline: 'Local AES-256-GCM sandbox',
      budget: '< 0.9ms',
      icon: ShieldCheckIcon,
    },
    {
      id: 'prompt' as SubsystemId,
      step: '04',
      title: 'Density Synthesizer',
      tagline: '95% context compression',
      budget: '< 0.4ms',
      icon: ZapIcon,
    },
  ];

  // RRF Calculation
  const rrfScore = (1 / (rrfK + lexicalRank) + 1 / (rrfK + denseRank)).toFixed(5);
  const denseOnlyScore = (1 / (rrfK + denseRank)).toFixed(5);
  const relativeElevation = (((parseFloat(rrfScore) - parseFloat(denseOnlyScore)) / parseFloat(denseOnlyScore)) * 100).toFixed(1);

  // Code snippets for the engineering inspector
  const codeSnippets = {
    dom: `// domResiliencePipeline.ts
export async function captureTurnWithDefensiveFallback(
  root: HTMLElement
): Promise<NormalizedTurn> {
  // Tier 1: Explicit known platform selectors (Sub-millisecond)
  const tier1Nodes = root.querySelectorAll<HTMLElement>(
    '[data-message-author-role], [data-testid="conversation-turn"]'
  );
  if (tier1Nodes.length > 0) {
    return parseExplicitAttributes(Array.from(tier1Nodes));
  }

  // Tier 2: Semantic ARIA accessibility tree fallback
  const tier2Nodes = root.querySelectorAll<HTMLElement>(
    'article, [role="article"], [role="presentation"] [tabindex="0"]'
  );
  if (tier2Nodes.length > 0) {
    return parseSemanticAriaTree(Array.from(tier2Nodes));
  }

  // Tier 3: MutationObserver incremental text buffer
  const liveBuffer = window.__chatbridge_stream_observer.flush();
  if (liveBuffer.length > 0) {
    return parseDebouncedStreamBuffer(liveBuffer);
  }

  throw new ExtractionError('All 3 defensive DOM tiers exhausted');
}`,
    rrf: `// rrfRanker.ts
export interface CandidateTurn {
  id: string;
  lexicalRank: number; // BM25 rank in candidate set
  denseRank: number;   // Cosine similarity rank
}

export function computeReciprocalRankFusion(
  candidates: CandidateTurn[],
  k: number = 60
): { id: string; score: number }[] {
  return candidates
    .map(candidate => {
      // Harmonic sum prevents high-frequency keyword blindness
      // while retaining semantic vector association
      const lexicalComponent = 1 / (k + candidate.lexicalRank);
      const denseComponent = 1 / (k + candidate.denseRank);
      const score = lexicalComponent + denseComponent;
      return { id: candidate.id, score };
    })
    .sort((a, b) => b.score - a.score);
}`,
    crypto: `// cryptoStorage.ts
export class LocalCryptoVault {
  private keyPromise: Promise<CryptoKey>;

  constructor() {
    this.keyPromise = this.getOrDeriveLocalMasterKey();
  }

  async sealTurn(plaintext: string): Promise<EncryptedPayload> {
    const key = await this.keyPromise;
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit random IV
    const encoded = new TextEncoder().encode(plaintext);

    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-256-GCM', iv, tagLength: 128 },
      key,
      encoded
    );

    return {
      iv: Array.from(iv),
      envelope: Array.from(new Uint8Array(ciphertext)),
      created: Date.now()
    };
  }
}`,
    prompt: `// tokenOptimizer.ts
export function synthesizeContinuityPrompt(
  turns: ScoredTurn[],
  tokenBudget: number = 180
): string {
  const header = '[ChatBridge Continuity Context]\\n';
  const bullets = turns.map(t => {
    const coreDecision = extractActionableDecisions(t.content);
    return \`• \${t.platform} (\${t.timeDelta}): \${coreDecision}\`;
  });

  let prompt = header + bullets.join('\\n');
  if (estimateTokens(prompt) > tokenBudget) {
    prompt = aggressiveTokenPruning(prompt, tokenBudget);
  }
  return prompt;
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="features" className="py-20 md:py-28 border-b border-[#E5E5EA] bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F5F5F7] border border-[#E5E5EA] text-xs font-mono text-[#1D1D1F]">
            <CpuIcon className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Architecture & Internals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F]">
            Defensive, client-side continuity architecture.
          </h2>
          <p className="text-base sm:text-lg text-[#515154] leading-relaxed">
            AI chat interfaces deploy frontend updates frequently without notice. ChatBridge isolates execution entirely within your local browser sandbox, using resilient fallback cascades and rank-fusion algorithms with zero cloud dependencies.
          </p>
        </div>

        {/* 1. Architecture Flow Pipeline Ribbon */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-[#6E6E73] uppercase tracking-wider">
              System Pipeline Architecture
            </span>
            <span className="text-[11px] font-mono text-[#86868B]">
              Click any stage to inspect runtime behavior
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {subsystems.map((sub) => {
              const Icon = sub.icon;
              const isActive = activeSubsystem === sub.id;
              return (
                <button
                  key={sub.id}
                  id={`pipeline-stage-${sub.id}`}
                  onClick={() => {
                    setActiveSubsystem(sub.id);
                    const codeMap: Record<SubsystemId, 'dom' | 'rrf' | 'crypto' | 'prompt'> = {
                      dom: 'dom',
                      retrieval: 'rrf',
                      storage: 'crypto',
                      prompt: 'prompt'
                    };
                    setActiveCodeTab(codeMap[sub.id]);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                    isActive
                      ? 'bg-white border-[#1D1D1F] shadow-sm ring-1 ring-[#1D1D1F]'
                      : 'bg-[#F5F5F7] border-[#E5E5EA] hover:bg-white hover:border-[#D1D1D6]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#EBEBED] text-[#1D1D1F]">
                      Stage {sub.step}
                    </span>
                    <span className="text-[10px] font-mono text-[#0071E3] bg-[#EBF5FF] px-2 py-0.5 rounded-full">
                      {sub.budget}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0071E3]' : 'text-[#6E6E73]'}`} />
                    <h3 className="text-sm font-semibold text-[#1D1D1F]">{sub.title}</h3>
                  </div>

                  <p className="text-xs text-[#6E6E73] leading-snug">{sub.tagline}</p>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071E3]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Asymmetric Deep-Dive Subsystem Workstation */}
        <div className="bg-white rounded-2xl border border-[#E5E5EA] p-6 sm:p-8 shadow-sm">
          {/* Subsystem 1: DOM Mutation Cascade */}
          {activeSubsystem === 'dom' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#0071E3]">Stage 01 • Extraction Resilience</span>
                  <h3 className="text-2xl font-semibold text-[#1D1D1F]">Three-Tier Fallback Cascade</h3>
                  <p className="text-sm text-[#515154] leading-relaxed">
                    Frontend web AI interfaces frequently shuffle compiled CSS hashes (e.g. Tailwind prefixes or randomized emotion classes). ChatBridge prevents pipeline degradation via a three-tier selector cascade.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className={`p-3.5 rounded-xl border transition-all ${domScenario === 'standard' ? 'bg-[#F5F5F7] border-[#1D1D1F]' : 'bg-white border-[#E5E5EA]'}`}>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-semibold text-[#1D1D1F]">Tier 1: Explicit Attributes</span>
                      <span className="text-[#34C759]">Sub-0.5ms • 94% Hits</span>
                    </div>
                    <p className="text-xs text-[#6E6E73]">
                      Hooks into vendor-provided telemetry selectors like <code className="bg-[#EBEBED] px-1 py-0.5 rounded text-[#1D1D1F]">data-message-author-role</code>.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border transition-all ${domScenario === 'obfuscated' ? 'bg-[#F5F5F7] border-[#1D1D1F]' : 'bg-white border-[#E5E5EA]'}`}>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-semibold text-[#1D1D1F]">Tier 2: Semantic ARIA Tree</span>
                      <span className="text-[#0071E3]">~1.8ms • 5.5% Hits</span>
                    </div>
                    <p className="text-xs text-[#6E6E73]">
                      If class names are scrubbed, falls back to the accessibility tree (<code className="bg-[#EBEBED] px-1 py-0.5 rounded text-[#1D1D1F]">role=&quot;article&quot;</code>) to isolate turn boundaries.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border transition-all ${domScenario === 'streaming' ? 'bg-[#F5F5F7] border-[#1D1D1F]' : 'bg-white border-[#E5E5EA]'}`}>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-semibold text-[#1D1D1F]">Tier 3: Streaming Observer</span>
                      <span className="text-[#AF52DE]">~2.9ms • 0.5% Hits</span>
                    </div>
                    <p className="text-xs text-[#6E6E73]">
                      Listens to live MutationObserver chunk streams with 300ms debounced delta flush for partial renders.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Panel: Live Selector Simulator */}
              <div className="lg:col-span-6 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA] p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA]">
                  <span className="text-xs font-mono font-medium text-[#1D1D1F]">
                    Live DOM Cascade Simulator
                  </span>
                  <span className="text-[11px] font-mono text-[#86868B]">Interactive Test Bench</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#1D1D1F]">Simulate Browser DOM State:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setDomScenario('standard')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        domScenario === 'standard'
                          ? 'bg-[#1D1D1F] text-white'
                          : 'bg-white border border-[#E5E5EA] text-[#515154] hover:bg-[#EBEBED]'
                      }`}
                    >
                      Clean DOM
                    </button>
                    <button
                      onClick={() => setDomScenario('obfuscated')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        domScenario === 'obfuscated'
                          ? 'bg-[#1D1D1F] text-white'
                          : 'bg-white border border-[#E5E5EA] text-[#515154] hover:bg-[#EBEBED]'
                      }`}
                    >
                      Obfuscated
                    </button>
                    <button
                      onClick={() => setDomScenario('streaming')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        domScenario === 'streaming'
                          ? 'bg-[#1D1D1F] text-white'
                          : 'bg-white border border-[#E5E5EA] text-[#515154] hover:bg-[#EBEBED]'
                      }`}
                    >
                      Streaming
                    </button>
                  </div>
                </div>

                {/* Execution Telemetry Output */}
                <div className="bg-white rounded-lg border border-[#E5E5EA] p-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-[11px] text-[#6E6E73] border-b border-[#F5F5F7] pb-2">
                    <span>Active Resolution:</span>
                    <span className="text-[#0071E3] font-medium">
                      {domScenario === 'standard' ? 'Tier 1 [data-message-author-role]' : domScenario === 'obfuscated' ? 'Tier 2 [role="article"]' : 'Tier 3 [MutationObserver streamBuffer]'}
                    </span>
                  </div>

                  <div className="space-y-1 text-[#1D1D1F]">
                    <div className="flex justify-between">
                      <span className="text-[#6E6E73]">Parse Latency:</span>
                      <span className="font-semibold">{domScenario === 'standard' ? '0.38 ms' : domScenario === 'obfuscated' ? '1.82 ms' : '2.87 ms'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6E6E73]">Confidence Score:</span>
                      <span className="text-[#34C759] font-semibold">{domScenario === 'standard' ? '99.9%' : domScenario === 'obfuscated' ? '98.4%' : '96.2%'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6E6E73]">Captured Turns:</span>
                      <span>1 turn (User prompt + Assistant response)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F5F5F7] text-[11px] text-[#86868B]">
                    Normalized turn buffered into memory with SHA-256 deduplication hash.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subsystem 2: Hybrid RRF Engine */}
          {activeSubsystem === 'retrieval' && (
            <div className="space-y-6">
              {/* Clean, Animated SVG Diagram for Hybrid Retrieval Architecture */}
              <HybridRetrievalDiagram isDarkMode={isDarkMode} />

              {/* Complementary Interactive RRF Harmonic Rank Calculator */}
              <div className={`rounded-xl border p-5 sm:p-6 space-y-4 ${
                isDarkMode ? 'bg-[#141419] border-[#25252E]' : 'bg-[#F5F5F7] border-[#E5E5EA]'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-inherit">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-medium text-[#0071E3] uppercase">
                      Live Parameter Tuning Simulator
                    </span>
                    <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-[#1D1D1F]'}`}>
                      RRF Rank Harmonic Decay & Score Weighting
                    </h4>
                  </div>
                  <button
                    onClick={() => { setRrfK(60); setLexicalRank(1); setDenseRank(2); }}
                    className="text-[11px] font-mono text-[#0071E3] hover:underline inline-flex items-center gap-1"
                  >
                    <RefreshIcon className="w-3 h-3" />
                    <span>Reset Defaults</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#8E8E93]' : 'text-[#515154]'}>Smoothing (k):</span>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#1D1D1F]'}`}>{rrfK}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={rrfK}
                      onChange={(e) => setRrfK(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#E5E5EA] rounded-lg appearance-none cursor-pointer accent-[#0071E3]"
                    />
                    <p className={`text-[10px] ${isDarkMode ? 'text-[#6E6E75]' : 'text-[#86868B]'}`}>Harmonic stabilizer constant</p>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#8E8E93]' : 'text-[#515154]'}>BM25 Lexical (r_lex):</span>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#1D1D1F]'}`}>#{lexicalRank}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={lexicalRank}
                      onChange={(e) => setLexicalRank(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#E5E5EA] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                    />
                    <p className={`text-[10px] ${isDarkMode ? 'text-[#6E6E75]' : 'text-[#86868B]'}`}>Sparse token frequency rank</p>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-[#8E8E93]' : 'text-[#515154]'}>Dense Vector (r_dense):</span>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#1D1D1F]'}`}>#{denseRank}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={denseRank}
                      onChange={(e) => setDenseRank(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#E5E5EA] rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
                    />
                    <p className={`text-[10px] ${isDarkMode ? 'text-[#6E6E75]' : 'text-[#86868B]'}`}>MiniLM 384-d semantic rank</p>
                  </div>
                </div>

                {/* Score Comparison Output Row */}
                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg border font-mono text-xs ${
                  isDarkMode ? 'bg-[#0E0E12] border-[#22222B]' : 'bg-white border-[#E5E5EA]'
                }`}>
                  <div className="flex flex-col">
                    <span className={`text-[11px] ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>Fused RRF Score:</span>
                    <span className="text-sm font-bold text-[#0071E3]">{rrfScore}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[11px] ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>Dense-Only Baseline:</span>
                    <span className={`text-sm ${isDarkMode ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>{denseOnlyScore}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[11px] ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>Harmonic Elevation:</span>
                    <span className="text-sm font-semibold text-[#34C759]">+{relativeElevation}% gain</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subsystem 3: Hardware Crypto Vault */}
          {activeSubsystem === 'storage' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#0071E3]">Stage 03 • Zero-Trust Persistence</span>
                  <h3 className="text-2xl font-semibold text-[#1D1D1F]">WebCrypto AES-256-GCM Vault</h3>
                  <p className="text-sm text-[#515154] leading-relaxed">
                    Developer chats contain proprietary intellectual property, architecture sketches, and connection strings. ChatBridge writes zero unencrypted data to your hard drive, keeping everything sealed in <code className="bg-[#F5F5F7] px-1 py-0.5 rounded text-[#1D1D1F]">chrome.storage.local</code>.
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#F5F5F7] rounded-lg border border-[#E5E5EA]">
                    <span className="font-semibold text-[#1D1D1F] block mb-0.5">Non-Exportable Master Key</span>
                    <p className="text-[#515154]">Keys are generated with <code className="text-[#0071E3]">extractable: false</code> inside WebCrypto SubtleCrypto.</p>
                  </div>
                  <div className="p-3 bg-[#F5F5F7] rounded-lg border border-[#E5E5EA]">
                    <span className="font-semibold text-[#1D1D1F] block mb-0.5">96-Bit Random IV Per Chunk</span>
                    <p className="text-[#515154]">Fresh cryptographically secure pseudo-random vector on every single stored turn.</p>
                  </div>
                </div>
              </div>

              {/* Right Panel: Live Cryptographic Envelope Inspector */}
              <div className="lg:col-span-6 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA] p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA]">
                  <span className="text-xs font-mono font-medium text-[#1D1D1F]">
                    Cryptographic Envelope Inspector
                  </span>
                  <span className="text-[11px] font-mono text-[#34C759]">Hardware Sealed</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#1D1D1F]">Payload to Seal:</label>
                  <input
                    type="text"
                    value={rawSecretText}
                    onChange={(e) => setRawSecretText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E5EA] text-xs font-mono text-[#1D1D1F] focus:outline-none focus:border-[#1D1D1F]"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEncrypted(!isEncrypted)}
                    className="px-3 py-1.5 rounded-lg bg-[#1D1D1F] hover:bg-[#333336] text-white text-xs font-medium font-mono transition-colors"
                  >
                    {isEncrypted ? 'Show Decrypted Text' : 'Show Encrypted Envelope'}
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-[#E5E5EA] p-4 space-y-2 font-mono text-xs overflow-x-auto">
                  {isEncrypted ? (
                    <div className="space-y-1.5 text-[#515154]">
                      <div className="text-[11px] text-[#86868B]">// AES-256-GCM Ciphertext Envelope</div>
                      <div><span className="text-[#0071E3]">IV:</span> 0x8a92fbc1d34e8912e75f10ac</div>
                      <div><span className="text-[#0071E3]">TAG:</span> 0x4f128c77b91d23ea51f0</div>
                      <div className="break-all text-[#1D1D1F]">
                        <span className="text-[#0071E3]">CIPHERTEXT:</span> 8f9b2d6a7e1c4b5f0a2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-[#1D1D1F]">
                      <div className="text-[11px] text-[#86868B]">// Decrypted Local Payload</div>
                      <div className="p-2 bg-[#F5F5F7] rounded text-emerald-800 break-all">{rawSecretText}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Subsystem 4: Density Synthesizer */}
          {activeSubsystem === 'prompt' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#0071E3]">Stage 04 • Prompt Compression</span>
                  <h3 className="text-2xl font-semibold text-[#1D1D1F]">High-Density Token Synthesizer</h3>
                  <p className="text-sm text-[#515154] leading-relaxed">
                    Pasting thousands of raw dialogue tokens saturates the context window and causes target models to lose focus on the primary user objective. ChatBridge condenses multi-turn sessions into actionable 120-180 token payloads.
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#F5F5F7] rounded-lg border border-[#E5E5EA] flex justify-between items-center">
                    <span className="text-[#515154]">Raw Session Dialogue Tokens:</span>
                    <span className="font-mono text-[#86868B] line-through">~3,420 tokens</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#1D1D1F] flex justify-between items-center">
                    <span className="font-medium text-[#1D1D1F]">ChatBridge Synthesized Context:</span>
                    <span className="font-mono font-medium text-[#0071E3]">142 tokens (-95.8%)</span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Token Gauge & Output Preview */}
              <div className="lg:col-span-6 bg-[#F5F5F7] rounded-xl border border-[#E5E5EA] p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA]">
                  <span className="text-xs font-mono font-medium text-[#1D1D1F]">
                    Synthesized Injection Preview
                  </span>
                  <div className="flex gap-1">
                    {(['concurrency', 'postgres', 'oauth'] as const).map(topic => (
                      <button
                        key={topic}
                        onClick={() => setTokenTopic(topic)}
                        className={`px-2 py-0.5 text-[11px] font-mono rounded ${
                          tokenTopic === topic ? 'bg-[#1D1D1F] text-white' : 'bg-white border border-[#E5E5EA] text-[#6E6E73]'
                        }`}
                      >
                        {topic === 'concurrency' ? 'Cache' : topic === 'postgres' ? 'SQL' : 'Auth'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-[#E5E5EA] p-4 font-mono text-xs text-[#1D1D1F] space-y-2 leading-relaxed">
                  <div className="text-[11px] text-[#86868B]">// Auto-injected at turn inception (142 tokens)</div>
                  <div className="p-3 bg-[#FBFBFA] rounded border border-[#E5E5EA] space-y-1 text-xs">
                    <p className="font-semibold text-[#0071E3]">[ChatBridge Continuity Context]</p>
                    {tokenTopic === 'concurrency' && (
                      <>
                        <p>• Prior Model: ChatGPT (Turn 2, 8m ago)</p>
                        <p>• Architecture: 16 striped locks with FNV-1a hash distribution</p>
                        <p>• Invariant: 64-byte bucket alignment, atomic hit-ratio metrics</p>
                        <p>• Objective: Write GetOrSet with singleflight stampede suppression</p>
                      </>
                    )}
                    {tokenTopic === 'postgres' && (
                      <>
                        <p>• Prior Model: Claude 3.7 (Turn 5, 14m ago)</p>
                        <p>• Bug: MaxOpenConns exceeded during burst write spikes</p>
                        <p>• Tested Fix: Reduced idle connection lifetime to 300s</p>
                        <p>• Objective: Generate stress-testing query plan and pgbouncer setup</p>
                      </>
                    )}
                    {tokenTopic === 'oauth' && (
                      <>
                        <p>• Prior Model: Google Gemini (Turn 3, 2m ago)</p>
                        <p>• Auth: PKCE flow with SHA-256 code challenge</p>
                        <p>• State: Rotating refresh token in secure HTTP-only cookie</p>
                        <p>• Objective: Draft callback validation handler</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. D3-Powered Retrieval Frequency Heatmap */}
        <div className="space-y-4 pt-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-medium text-[#6E6E73] uppercase tracking-wider">
              Empirical Access Patterns
            </span>
            <h3 className="text-2xl font-semibold text-[#1D1D1F]">
              Cross-Platform Memory Retrieval Matrix
            </h3>
            <p className="text-sm text-[#515154] max-w-3xl">
              Visualize how developer conversation memories flow between AI assistants over weekly usage cycles. Inspect cell coordinates to view cross-assistant handoff frequencies and latency profiles.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5EA] p-5 sm:p-7 shadow-sm">
            <RetrievalHeatmap />
          </div>
        </div>

        {/* 4. Hardware Constraints & Telemetry Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-[#E5E5EA] space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#6E6E73]">
              <span>Retrieval Latency</span>
              <span className="text-[#34C759]">p50</span>
            </div>
            <div className="text-2xl font-semibold text-[#1D1D1F] font-mono">18.4 ms</div>
            <p className="text-[11px] text-[#86868B]">Indexed across 5,000 multi-turn memories</p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E5E5EA] space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#6E6E73]">
              <span>Memory Footprint</span>
              <span className="text-[#0071E3]">Heap</span>
            </div>
            <div className="text-2xl font-semibold text-[#1D1D1F] font-mono">&lt; 14 MB</div>
            <p className="text-[11px] text-[#86868B]">Sandboxed in background worker runtime</p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E5E5EA] space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#6E6E73]">
              <span>Hybrid Recall Gain</span>
              <span className="text-[#AF52DE]">RRF</span>
            </div>
            <div className="text-2xl font-semibold text-[#1D1D1F] font-mono">+3.9 pp</div>
            <p className="text-[11px] text-[#86868B]">Compared against dense-only baseline</p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E5E5EA] space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#6E6E73]">
              <span>Network Egress</span>
              <span className="text-[#34C759]">Isolated</span>
            </div>
            <div className="text-2xl font-semibold text-[#1D1D1F] font-mono">0.00 KB</div>
            <p className="text-[11px] text-[#86868B]">Zero telemetry pings or external API calls</p>
          </div>
        </div>

        {/* 5. Production Source Code Terminal */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <span className="text-xs font-mono font-medium text-[#6E6E73] uppercase tracking-wider">
                Source Code Implementation
              </span>
              <h3 className="text-lg font-semibold text-[#1D1D1F]">
                Inspect Core TypeScript Subsystems
              </h3>
            </div>

            {/* Code Tabs */}
            <div className="flex items-center gap-1 bg-[#EBEBED] p-1 rounded-xl text-xs font-mono">
              {(['dom', 'rrf', 'crypto', 'prompt'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeCodeTab === tab
                      ? 'bg-white text-[#1D1D1F] font-medium shadow-2xs'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {tab === 'dom'
                    ? 'domPipeline.ts'
                    : tab === 'rrf'
                    ? 'rrfRanker.ts'
                    : tab === 'crypto'
                    ? 'cryptoVault.ts'
                    : 'tokenOptimizer.ts'}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Window */}
          <div className="rounded-2xl border border-[#E5E5EA] bg-[#1E1E20] text-white overflow-hidden shadow-lg">
            <div className="px-4 py-3 bg-[#18181A] border-b border-[#2C2C2E] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                </div>
                <span className="text-[#8E8E93] ml-2">
                  src/engine/{activeCodeTab === 'dom' ? 'domResiliencePipeline.ts' : activeCodeTab === 'rrf' ? 'rrfRanker.ts' : activeCodeTab === 'crypto' ? 'cryptoStorage.ts' : 'tokenOptimizer.ts'}
                </span>
              </div>

              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white text-[11px] transition-colors"
              >
                {copiedCode ? (
                  <>
                    <CheckIcon className="w-3 h-3 text-[#34C759]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3 h-3" />
                    <span>Copy Source</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed text-[#E5E5EA]">
              <code>{codeSnippets[activeCodeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
