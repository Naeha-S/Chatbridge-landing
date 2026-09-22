import React, { useState } from 'react';
import { CpuIcon, ZapIcon, RefreshIcon, CheckIcon } from './Icons';

interface HybridRetrievalDiagramProps {
  isDarkMode?: boolean;
}

type DiagramNodeId = 'query' | 'sparse' | 'dense' | 'rrf' | 'output';

export const HybridRetrievalDiagram: React.FC<HybridRetrievalDiagramProps> = ({ isDarkMode = true }) => {
  const [activeNode, setActiveNode] = useState<DiagramNodeId>('rrf');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeQuery, setActiveQuery] = useState<'go-cache' | 'postgres-pool' | 'oauth-pkce'>('go-cache');

  const queryExamples = {
    'go-cache': {
      text: 'sync.RWMutex lock contention in Go LRU cache',
      lexicalMatches: ['sync.RWMutex', 'LRU', 'Go', 'lock contention'],
      denseConcept: 'Concurrency synchronization & cache sharding',
      lexRank: 1,
      denseRank: 2,
      rrfScore: 0.0325,
      gain: '+48.2%'
    },
    'postgres-pool': {
      text: 'PostgreSQL max_connections burst spike saturation',
      lexicalMatches: ['PostgreSQL', 'max_connections', 'burst spike'],
      denseConcept: 'Database connection exhaustion & pooling',
      lexRank: 2,
      denseRank: 1,
      rrfScore: 0.0321,
      gain: '+46.8%'
    },
    'oauth-pkce': {
      text: 'OAuth2 authorization code with PKCE code_verifier SHA-256',
      lexicalMatches: ['OAuth2', 'PKCE', 'code_verifier', 'SHA-256'],
      denseConcept: 'Cryptographic authentication protocol',
      lexRank: 1,
      denseRank: 1,
      rrfScore: 0.0328,
      gain: '+51.4%'
    }
  };

  const selectedQuery = queryExamples[activeQuery];

  const handleTriggerSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 2400);
  };

  const nodeDetails: Record<DiagramNodeId, { title: string; subtitle: string; latency: string; spec: string; details: string }> = {
    query: {
      title: 'Query Ingestion & Dispatcher',
      subtitle: 'Raw User Turn Input',
      latency: '< 0.2ms',
      spec: 'Client Content Script',
      details: 'Ingests active chat prompt, isolates technical terms via regex token extraction, and routes asynchronously to both local pipelines.'
    },
    sparse: {
      title: 'Sparse Lexical Engine (BM25)',
      subtitle: 'Inverted Index & Exact Stems',
      latency: '0.4ms',
      spec: 'WebAssembly IndexedDB',
      details: 'Performs token frequency and inverse document frequency scoring. Prevents semantic hallucinations for exact function names and error codes.'
    },
    dense: {
      title: 'Dense Semantic Vector Engine',
      subtitle: 'MiniLM-L6-v2 ONNX Runtime',
      latency: '13.8ms',
      spec: '384-d Cosine Similarity',
      details: 'Evaluates conceptual meaning across sessions even when developers rephrase their inquiry or switch terminology.'
    },
    rrf: {
      title: 'Reciprocal Rank Fusion Core',
      subtitle: 'Harmonic Score Integration',
      latency: '0.1ms',
      spec: 'Formula: 1/(60+r_lex) + 1/(60+r_dense)',
      details: 'Unifies uncalibrated sparse scores and dense distances by ranking position, elevating candidates with strong dual-channel consensus.'
    },
    output: {
      title: 'Context Packager & Injector',
      subtitle: 'Top-k High-Density Memory',
      latency: '< 0.3ms',
      spec: '140 Token Budget Ceiling',
      details: 'Formats verified conversational anchor points into a compact markdown envelope for seamless prompt synthesis.'
    }
  };

  const activeInfo = nodeDetails[activeNode];

  return (
    <div className={`w-full rounded-2xl border transition-all ${
      isDarkMode
        ? 'bg-[#0E0E11] border-[#222228] text-white'
        : 'bg-white border-[#E5E5EA] text-[#1D1D1F]'
    } p-5 sm:p-7 shadow-sm space-y-6`}>
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-inherit">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
            <h4 className="text-sm font-semibold tracking-tight uppercase font-mono text-[#0071E3]">
              Animated Architecture Topology
            </h4>
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`}>
            Interactive dual-channel pipeline showing data flow from prompt ingestion to RRF harmonic ranking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Query Selector */}
          <div className={`flex items-center p-0.5 rounded-lg border text-xs font-mono ${
            isDarkMode ? 'bg-[#18181D] border-[#2C2C35]' : 'bg-[#F5F5F7] border-[#E5E5EA]'
          }`}>
            {(['go-cache', 'postgres-pool', 'oauth-pkce'] as const).map(q => (
              <button
                key={q}
                onClick={() => setActiveQuery(q)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  activeQuery === q
                    ? isDarkMode ? 'bg-[#2A2A35] text-white font-medium' : 'bg-white text-[#1D1D1F] font-medium shadow-xs'
                    : isDarkMode ? 'text-[#8E8E93] hover:text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                {q === 'go-cache' ? 'Go Cache' : q === 'postgres-pool' ? 'Postgres' : 'OAuth PKCE'}
              </button>
            ))}
          </div>

          {/* Trigger Animation Button */}
          <button
            onClick={handleTriggerSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              isSimulating
                ? 'bg-[#0071E3] text-white opacity-80 cursor-wait'
                : 'bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-xs'
            }`}
          >
            <RefreshIcon className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Streaming...' : 'Simulate Pulse'}</span>
          </button>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full overflow-hidden rounded-xl border border-inherit">
        <svg
          viewBox="0 0 940 380"
          className="w-full h-auto select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="queryGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            <linearGradient id="sparseGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="denseGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            <linearGradient id="rrfGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="outputGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Filter Glow */}
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Grid Pattern */}
            <pattern id="svgGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={isDarkMode ? '#23232C' : '#EAEAEF'} />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="940" height="380" fill={isDarkMode ? '#0A0A0D' : '#FAFAFC'} />
          <rect width="940" height="380" fill="url(#svgGrid)" opacity={isDarkMode ? '0.75' : '0.9'} />

          {/* Connection Lines (Flow Paths) */}
          {/* Path 1: Query -> Sparse (Top Branch) */}
          <path
            d="M 180 190 C 230 190, 240 95, 310 95"
            fill="none"
            stroke={isDarkMode ? '#34D399' : '#059669'}
            strokeWidth="2.5"
            strokeDasharray={isSimulating ? '6 4' : 'none'}
            className={isSimulating ? 'animate-[dash_1s_linear_infinite]' : ''}
            opacity="0.85"
          />

          {/* Path 2: Query -> Dense (Bottom Branch) */}
          <path
            d="M 180 190 C 230 190, 240 285, 310 285"
            fill="none"
            stroke={isDarkMode ? '#A78BFA' : '#7C3AED'}
            strokeWidth="2.5"
            strokeDasharray={isSimulating ? '6 4' : 'none'}
            className={isSimulating ? 'animate-[dash_1s_linear_infinite]' : ''}
            opacity="0.85"
          />

          {/* Path 3: Sparse -> RRF Core */}
          <path
            d="M 520 95 C 570 95, 580 190, 630 190"
            fill="none"
            stroke={isDarkMode ? '#34D399' : '#059669'}
            strokeWidth="2.5"
            strokeDasharray={isSimulating ? '6 4' : 'none'}
            className={isSimulating ? 'animate-[dash_1s_linear_infinite]' : ''}
            opacity="0.85"
          />

          {/* Path 4: Dense -> RRF Core */}
          <path
            d="M 520 285 C 570 285, 580 190, 630 190"
            fill="none"
            stroke={isDarkMode ? '#A78BFA' : '#7C3AED'}
            strokeWidth="2.5"
            strokeDasharray={isSimulating ? '6 4' : 'none'}
            className={isSimulating ? 'animate-[dash_1s_linear_infinite]' : ''}
            opacity="0.85"
          />

          {/* Path 5: RRF -> Output */}
          <path
            d="M 770 190 L 815 190"
            fill="none"
            stroke={isDarkMode ? '#38BDF8' : '#0284C7'}
            strokeWidth="3"
            strokeDasharray={isSimulating ? '5 3' : 'none'}
            opacity="0.9"
          />

          {/* Animated Flow Particles */}
          {isSimulating && (
            <>
              <circle r="4" fill="#34D399" filter="url(#glowEffect)">
                <animateMotion
                  path="M 180 190 C 230 190, 240 95, 310 95"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4" fill="#A78BFA" filter="url(#glowEffect)">
                <animateMotion
                  path="M 180 190 C 230 190, 240 285, 310 285"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4" fill="#34D399" filter="url(#glowEffect)">
                <animateMotion
                  path="M 520 95 C 570 95, 580 190, 630 190"
                  dur="1.2s"
                  begin="0.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4" fill="#A78BFA" filter="url(#glowEffect)">
                <animateMotion
                  path="M 520 285 C 570 285, 580 190, 630 190"
                  dur="1.2s"
                  begin="0.4s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* NODE 1: Incoming Query Node */}
          <g
            id="diagram-node-query"
            onClick={() => setActiveNode('query')}
            className="cursor-pointer"
          >
            <rect
              x="25"
              y="135"
              width="155"
              height="110"
              rx="12"
              fill={isDarkMode ? '#131318' : '#FFFFFF'}
              stroke={activeNode === 'query' ? '#3B82F6' : isDarkMode ? '#272730' : '#E5E5EA'}
              strokeWidth={activeNode === 'query' ? '2' : '1.5'}
              filter={activeNode === 'query' ? 'url(#glowEffect)' : undefined}
            />
            <rect x="25" y="135" width="155" height="6" rx="3" fill="url(#queryGrad)" />

            <text x="37" y="162" fill={isDarkMode ? '#93C5FD' : '#1D4ED8'} fontSize="10" fontFamily="monospace" fontWeight="600">
              STAGE 01 • INPUT
            </text>
            <text x="37" y="182" fill={isDarkMode ? '#F3F4F6' : '#111827'} fontSize="12" fontWeight="700">
              Query Dispatcher
            </text>
            <text x="37" y="200" fill={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize="9.5" fontFamily="monospace">
              Latency: &lt; 0.2ms
            </text>
            <rect x="37" y="214" width="130" height="20" rx="4" fill={isDarkMode ? '#1F2937' : '#F3F4F6'} />
            <text x="43" y="228" fill={isDarkMode ? '#E5E7EB' : '#374151'} fontSize="8.5" fontFamily="monospace">
              q: {selectedQuery.text.slice(0, 18)}...
            </text>
          </g>

          {/* NODE 2: Sparse Lexical BM25 (Top Node) */}
          <g
            id="diagram-node-sparse"
            onClick={() => setActiveNode('sparse')}
            className="cursor-pointer"
          >
            <rect
              x="310"
              y="40"
              width="210"
              height="110"
              rx="12"
              fill={isDarkMode ? '#131318' : '#FFFFFF'}
              stroke={activeNode === 'sparse' ? '#10B981' : isDarkMode ? '#272730' : '#E5E5EA'}
              strokeWidth={activeNode === 'sparse' ? '2' : '1.5'}
              filter={activeNode === 'sparse' ? 'url(#glowEffect)' : undefined}
            />
            <rect x="310" y="40" width="210" height="6" rx="3" fill="url(#sparseGrad)" />

            <text x="325" y="66" fill={isDarkMode ? '#6EE7B7' : '#047857'} fontSize="10" fontFamily="monospace" fontWeight="600">
              CHANNEL A • SPARSE (WASM)
            </text>
            <text x="325" y="86" fill={isDarkMode ? '#F3F4F6' : '#111827'} fontSize="13" fontWeight="700">
              Lexical BM25 Index
            </text>
            <text x="325" y="104" fill={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize="10" fontFamily="monospace">
              Exact Token Hits: {selectedQuery.lexicalMatches.length} keywords
            </text>

            <rect x="325" y="115" width="80" height="22" rx="4" fill={isDarkMode ? '#064E3B' : '#ECFDF5'} />
            <text x="333" y="130" fill={isDarkMode ? '#6EE7B7' : '#065F46'} fontSize="9.5" fontFamily="monospace" fontWeight="600">
              Rank: #{selectedQuery.lexRank}
            </text>

            <rect x="415" y="115" width="90" height="22" rx="4" fill={isDarkMode ? '#1F2937' : '#F3F4F6'} />
            <text x="423" y="130" fill={isDarkMode ? '#9CA3AF' : '#4B5563'} fontSize="9.5" fontFamily="monospace">
              0.4ms Latency
            </text>
          </g>

          {/* NODE 3: Dense Semantic ONNX (Bottom Node) */}
          <g
            id="diagram-node-dense"
            onClick={() => setActiveNode('dense')}
            className="cursor-pointer"
          >
            <rect
              x="310"
              y="230"
              width="210"
              height="110"
              rx="12"
              fill={isDarkMode ? '#131318' : '#FFFFFF'}
              stroke={activeNode === 'dense' ? '#8B5CF6' : isDarkMode ? '#272730' : '#E5E5EA'}
              strokeWidth={activeNode === 'dense' ? '2' : '1.5'}
              filter={activeNode === 'dense' ? 'url(#glowEffect)' : undefined}
            />
            <rect x="310" y="230" width="210" height="6" rx="3" fill="url(#denseGrad)" />

            <text x="325" y="256" fill={isDarkMode ? '#C4B5FD' : '#6D28D9'} fontSize="10" fontFamily="monospace" fontWeight="600">
              CHANNEL B • DENSE (ONNX)
            </text>
            <text x="325" y="276" fill={isDarkMode ? '#F3F4F6' : '#111827'} fontSize="13" fontWeight="700">
              Semantic Embeddings
            </text>
            <text x="325" y="294" fill={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize="10" fontFamily="monospace">
              Vector Space: 384 dimensions
            </text>

            <rect x="325" y="305" width="80" height="22" rx="4" fill={isDarkMode ? '#4C1D95' : '#F5F3FF'} />
            <text x="333" y="320" fill={isDarkMode ? '#DDD6FE' : '#5B21B6'} fontSize="9.5" fontFamily="monospace" fontWeight="600">
              Rank: #{selectedQuery.denseRank}
            </text>

            <rect x="415" y="305" width="90" height="22" rx="4" fill={isDarkMode ? '#1F2937' : '#F3F4F6'} />
            <text x="423" y="320" fill={isDarkMode ? '#9CA3AF' : '#4B5563'} fontSize="9.5" fontFamily="monospace">
              13.8ms Latency
            </text>
          </g>

          {/* NODE 4: Reciprocal Rank Fusion Core (Convergence Node) */}
          <g
            id="diagram-node-rrf"
            onClick={() => setActiveNode('rrf')}
            className="cursor-pointer"
          >
            <rect
              x="630"
              y="125"
              width="140"
              height="130"
              rx="14"
              fill={isDarkMode ? '#171720' : '#FFFFFF'}
              stroke={activeNode === 'rrf' ? '#F59E0B' : isDarkMode ? '#333342' : '#E5E5EA'}
              strokeWidth={activeNode === 'rrf' ? '2.5' : '1.5'}
              filter={activeNode === 'rrf' ? 'url(#glowEffect)' : undefined}
            />
            <rect x="630" y="125" width="140" height="6" rx="3" fill="url(#rrfGrad)" />

            <text x="643" y="152" fill={isDarkMode ? '#FCD34D' : '#B45309'} fontSize="9.5" fontFamily="monospace" fontWeight="600">
              HARMONIC ENGINE
            </text>
            <text x="643" y="172" fill={isDarkMode ? '#F3F4F6' : '#111827'} fontSize="13" fontWeight="700">
              RRF Core
            </text>

            {/* Math Formula Box */}
            <rect x="640" y="185" width="120" height="38" rx="6" fill={isDarkMode ? '#261F13' : '#FFFBEB'} stroke={isDarkMode ? '#78350F' : '#FDE68A'} strokeWidth="1" />
            <text x="648" y="200" fill={isDarkMode ? '#FDE68A' : '#92400E'} fontSize="8" fontFamily="monospace" fontWeight="600">
              1/(k+r_lex) + 1/(k+r_dense)
            </text>
            <text x="648" y="214" fill={isDarkMode ? '#F59E0B' : '#D97706'} fontSize="9.5" fontFamily="monospace" fontWeight="700">
              Score: {selectedQuery.rrfScore}
            </text>

            <text x="643" y="242" fill={isDarkMode ? '#34D399' : '#059669'} fontSize="9.5" fontFamily="monospace" fontWeight="600">
              Gain: {selectedQuery.gain}
            </text>
          </g>

          {/* NODE 5: Output Context Packager */}
          <g
            id="diagram-node-output"
            onClick={() => setActiveNode('output')}
            className="cursor-pointer"
          >
            <rect
              x="815"
              y="135"
              width="100"
              height="110"
              rx="12"
              fill={isDarkMode ? '#131318' : '#FFFFFF'}
              stroke={activeNode === 'output' ? '#0071E3' : isDarkMode ? '#272730' : '#E5E5EA'}
              strokeWidth={activeNode === 'output' ? '2' : '1.5'}
              filter={activeNode === 'output' ? 'url(#glowEffect)' : undefined}
            />
            <rect x="815" y="135" width="100" height="6" rx="3" fill="url(#outputGrad)" />

            <text x="825" y="162" fill={isDarkMode ? '#6EE7B7' : '#047857'} fontSize="8.5" fontFamily="monospace" fontWeight="600">
              STAGE 05
            </text>
            <text x="825" y="182" fill={isDarkMode ? '#F3F4F6' : '#111827'} fontSize="11" fontWeight="700">
              Injected
            </text>
            <text x="825" y="196" fill={isDarkMode ? '#F3F4F6' : '#111827'} fontSize="11" fontWeight="700">
              Context
            </text>

            <rect x="825" y="210" width="80" height="22" rx="4" fill={isDarkMode ? '#064E3B' : '#ECFDF5'} />
            <text x="833" y="225" fill={isDarkMode ? '#6EE7B7' : '#065F46'} fontSize="9" fontFamily="monospace" fontWeight="600">
              142 tokens
            </text>
          </g>
        </svg>
      </div>

      {/* Synchronized Node Inspector Pane */}
      <div className={`p-4 rounded-xl border transition-all ${
        isDarkMode ? 'bg-[#141419] border-[#25252E]' : 'bg-[#F9F9FB] border-[#E5E5EA]'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#0071E3] uppercase">
              Selected Subsystem:
            </span>
            <span className="text-sm font-semibold text-inherit">{activeInfo.title}</span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
              isDarkMode ? 'bg-[#22222D] text-[#8E8E93]' : 'bg-[#EBEBED] text-[#515154]'
            }`}>
              {activeInfo.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#34C759]">Execution: {activeInfo.latency}</span>
            <span className={isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}>| {activeInfo.spec}</span>
          </div>
        </div>

        <p className={`text-xs leading-relaxed pt-2.5 ${isDarkMode ? 'text-[#A1A1A6]' : 'text-[#515154]'}`}>
          {activeInfo.details}
        </p>
      </div>
    </div>
  );
};
