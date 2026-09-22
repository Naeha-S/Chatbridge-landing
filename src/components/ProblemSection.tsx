import React, { useState } from 'react';
import { colors, spacing, typography } from '../theme';

export const ProblemSection: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'coding' | 'research'>('coding');

  const scenarios = {
    coding: {
      name: 'Distributed Systems Refactor',
      oldWay: {
        title: 'Manual Re-explanation in Claude',
        tokensWasted: '1,420 tokens',
        timeLost: '4.5 minutes',
        snippet: `// What you end up typing manually:
"Hey, earlier in ChatGPT we designed a 16-shard LRU cache in Go using sync.RWMutex and FNV-1a hashing. We decided on 64-byte bucket alignment. Can you now write the unit tests for cache eviction?"`,
        friction: 'Schema versions and subtle concurrency decisions get forgotten or altered.'
      },
      bridgeWay: {
        title: 'ChatBridge Injected Context (⌘+Shift+K)',
        tokensUsed: '84 tokens (94% savings)',
        latency: '18ms',
        snippet: `[ChatBridge • Go LRU Cache Decision Record]
- Shards: 16 | Lock: sync.RWMutex | Hash: FNV-1a
- Memory layout: 64-byte bucket alignment
- State: Implementation complete; ready for eviction tests.`,
        benefit: 'Zero re-typing. Claude immediately receives exact technical constants.'
      }
    },
    research: {
      name: 'Empirical Benchmark Synthesis',
      oldWay: {
        title: 'Lossy Copy-Paste from Gemini',
        tokensWasted: '2,890 tokens',
        timeLost: '6.2 minutes',
        snippet: `// What happens in typical workflow:
1. Copy 4 paragraphs of raw statistical output from Gemini web search
2. Paste into ChatGPT; ChatGPT loses formatting and misinterprets data column headers
3. Spend 5 turns correcting hallucinated parameter bounds`,
        friction: 'Context fragmentation leads to hallucinated numbers and duplicate analysis.'
      },
      bridgeWay: {
        title: 'ChatBridge Normalized Context Pack',
        tokensUsed: '112 tokens (96% savings)',
        latency: '22ms',
        snippet: `[ChatBridge • Benchmark Matrix Verified Extract]
- Dataset: Llama-3-70B vs Claude-3.5-Sonnet on GSM8K
- Sonnet Pass@1: 92.4% | Llama-3 Pass@1: 89.1%
- Target Task: Produce executive chart markdown table`,
        benefit: 'Direct transfer of structured verified findings with zero degradation.'
      }
    }
  };

  const current = scenarios[activeScenario];

  return (
    <section className="py-20 md:py-28 border-b border-[#E5E5EA] dark:border-[#22222D] bg-[#FBFBFA] dark:bg-[#040405] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-medium tracking-wide uppercase text-[#0071E3] dark:text-[#2997FF]">
              The Cost of Context Loss
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
              Every model switch costs minutes and tokens.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#515154] dark:text-[#A1A1A6]">
              Without continuity, your working memory resets to zero every time you open a new AI tab.
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EBEBED] dark:bg-[#1D1D28] rounded-xl self-start md:self-auto border border-[#E5E5EA] dark:border-[#2A2A38]">
            <button
              onClick={() => setActiveScenario('coding')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScenario === 'coding'
                  ? 'bg-white dark:bg-[#2A2A3C] text-[#1D1D1F] dark:text-white shadow-2xs'
                  : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              Coding Workflow
            </button>
            <button
              onClick={() => setActiveScenario('research')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScenario === 'research'
                  ? 'bg-white dark:bg-[#2A2A3C] text-[#1D1D1F] dark:text-white shadow-2xs'
                  : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              Research Workflow
            </button>
          </div>
        </div>

        {/* High-Craft Asymmetric Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Friction / Manual Side */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0E0E14] rounded-2xl border border-[#E5E5EA] dark:border-[#262633] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-[#22222D]">
                <span className="text-xs font-mono text-[#E03E3E] dark:text-[#FF6B6B] font-medium uppercase tracking-wide">
                  Standard Multi-Tab Reset
                </span>
                <span className="text-[11px] font-mono text-[#E03E3E] dark:text-[#FF6B6B] bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-900/50">
                  {current.oldWay.tokensWasted} wasted
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                {current.oldWay.title}
              </h3>
              <pre className="p-4 bg-[#F5F5F7] dark:bg-[#15151F] rounded-xl text-xs font-mono text-[#515154] dark:text-[#C7C7CC] border border-[#E5E5EA] dark:border-[#262633] whitespace-pre-wrap leading-relaxed">
                <code>{current.oldWay.snippet}</code>
              </pre>
            </div>

            <div className="p-3.5 bg-rose-50/80 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/40 text-xs text-[#9E2A2B] dark:text-[#FFA8A8] space-y-1">
              <span className="font-semibold block text-[#7D1D1E] dark:text-[#FFBDBD]">Downstream Impact</span>
              <p>{current.oldWay.friction}</p>
            </div>
          </div>

          {/* Right: ChatBridge Side */}
          <div className="lg:col-span-6 bg-[#16161E] dark:bg-[#12121A] text-white rounded-2xl border border-[#2D2D3E] dark:border-[#2D2D3E] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/15 dark:border-white/10">
                <span className="text-xs font-mono text-[#34C759] dark:text-[#30D158] font-medium uppercase tracking-wide">
                  ChatBridge Local Injection
                </span>
                <span className="text-[11px] font-mono text-[#34C759] dark:text-[#30D158] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 dark:border-emerald-700/60">
                  {current.bridgeWay.tokensUsed}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">
                {current.bridgeWay.title}
              </h3>
              <pre className="p-4 bg-white/5 dark:bg-[#08080C] rounded-xl text-xs font-mono text-[#E5E5EA] border border-white/10 dark:border-white/10 whitespace-pre-wrap leading-relaxed">
                <code>{current.bridgeWay.snippet}</code>
              </pre>
            </div>

            <div className="p-3.5 bg-emerald-950/50 dark:bg-emerald-950/40 rounded-xl border border-emerald-800/60 dark:border-emerald-700/50 text-xs text-[#7EE787] space-y-1">
              <span className="font-semibold block text-emerald-300">Continuous Reasoning</span>
              <p className="text-emerald-100/90">{current.bridgeWay.benefit}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
