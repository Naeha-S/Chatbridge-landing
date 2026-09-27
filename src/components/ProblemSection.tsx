import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconX,
  IconCheck,
  IconClock,
  IconCpu,
  IconArrowRight,
  IconAlertTriangle,
  IconSparkles,
  IconCode,
  IconFileText,
  IconDatabase
} from '@tabler/icons-react';

export const ProblemSection: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'coding' | 'research' | 'database'>('coding');

  const scenarios = {
    coding: {
      id: 'coding',
      label: 'Coding & Architecture',
      icon: IconCode,
      tagline: 'Preserve concurrency constants & function contracts',
      metrics: {
        timeLost: '4.5 mins lost',
        tokensWasted: '1,420 tokens',
        tokensBridge: '84 tokens',
        savings: '94% less tokens'
      },
      oldWay: {
        title: 'Without ChatBridge: Manual Re-explanation',
        description: 'You copy/paste messy conversation fragments or re-type architecture decisions from scratch.',
        snippet: `// What you manually re-type into Claude Sonnet:
"Earlier in ChatGPT we designed a 16-shard LRU cache in Go using sync.RWMutex and FNV-1a hashing with 64-byte bucket alignment. Can you now write the unit tests for cache eviction?"`,
        frictionLabel: 'Context Loss Outcome',
        friction: 'Subtle concurrency contracts and memory alignment constraints get forgotten or hallucinated.'
      },
      bridgeWay: {
        title: 'With ChatBridge: Structured Memory Capsule',
        description: 'Instant 1-click AST-compressed payload carrying exact decisions directly to Claude.',
        snippet: `[ChatBridge • Go LRU Cache Decision Record]
- Shards: 16 | Lock: sync.RWMutex | Hash: FNV-1a
- Memory layout: 64-byte bucket alignment
- State: Implementation complete; target = eviction test suite.`,
        benefitLabel: 'Continuity Result',
        benefit: 'Claude immediately begins test implementation with 100% architectural fidelity.'
      }
    },
    research: {
      id: 'research',
      label: 'Research & Synthesis',
      icon: IconFileText,
      tagline: 'Transfer complex statistical datasets without formatting degradation',
      metrics: {
        timeLost: '6.2 mins lost',
        tokensWasted: '2,890 tokens',
        tokensBridge: '112 tokens',
        savings: '96% less tokens'
      },
      oldWay: {
        title: 'Without ChatBridge: Lossy Copy-Paste',
        description: 'Copying raw paragraphs of web search data causes tables to lose markdown formatting.',
        snippet: `// What happens in a typical manual workflow:
1. Copy raw search findings from Gemini 2.0
2. Paste into ChatGPT; table columns merge and numbers misalign
3. Spend 4 prompt turns correcting parameter bounds`,
        frictionLabel: 'Context Loss Outcome',
        friction: 'Format fragmentation leads to hallucinated statistical numbers and duplicate queries.'
      },
      bridgeWay: {
        title: 'With ChatBridge: Verified Data Extract',
        description: 'Normalized context pack preserves key numerical columns and source anchors.',
        snippet: `[ChatBridge • Benchmark Matrix Verified Extract]
- Dataset: Llama-3-70B vs Claude-3.7-Sonnet on GSM8K
- Sonnet Pass@1: 92.4% | Llama-3 Pass@1: 89.1%
- Target Task: Produce executive markdown comparison chart.`,
        benefitLabel: 'Continuity Result',
        benefit: 'Direct transfer of structured verified findings with zero degradation.'
      }
    },
    database: {
      id: 'database',
      label: 'Database & Schemas',
      icon: IconDatabase,
      tagline: 'Maintain strict DDL schemas, foreign keys, and migration indexes',
      metrics: {
        timeLost: '5.0 mins lost',
        tokensWasted: '1,950 tokens',
        tokensBridge: '96 tokens',
        savings: '95% less tokens'
      },
      oldWay: {
        title: 'Without ChatBridge: Fragmented SQL Context',
        description: 'Forgetting foreign key constraints leads to incompatible schema modifications.',
        snippet: `// What you type when switching to Gemini:
"We had a PostgreSQL schema with users, orgs, and partitioned telemetry tables. What was the index strategy we picked for timestamp queries?"`,
        frictionLabel: 'Context Loss Outcome',
        friction: 'Gemini re-suggests a standard B-tree index instead of the BRIN index previously selected.'
      },
      bridgeWay: {
        title: 'With ChatBridge: Schema Contract Capsule',
        description: 'Carries table definitions, indexes, and partition parameters directly to the new session.',
        snippet: `[ChatBridge • Postgres Schema & Index State]
- Tables: users, orgs, telemetry_events (partitioned by month)
- Index Strategy: BRIN on created_at, Partial B-Tree on org_id
- Action: Generate Drizzle ORM migration file.`,
        benefitLabel: 'Continuity Result',
        benefit: 'Gemini instantly outputs correct BRIN migration syntax without guesswork.'
      }
    }
  };

  const current = scenarios[activeScenario];

  return (
    <section className="py-16 md:py-24 border-b border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#060609] transition-colors duration-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Subtle Typography */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0071E3] dark:text-[#2997FF] font-semibold">
              The Cost of Context Loss
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
              Every model switch costs minutes and wasted tokens.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
              Without client-side context continuity, your working memory resets to zero every time you open a new AI tab.
            </p>
          </div>

          {/* Minimalist Scenario Switcher */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-white/5 rounded-xl border border-neutral-200/80 dark:border-white/10 shadow-2xs self-start md:self-auto">
            {(['coding', 'research', 'database'] as const).map((key) => {
              const item = scenarios[key];
              const Icon = item.icon;
              const isActive = activeScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveScenario(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white dark:bg-[#1E1E2C] text-[#0071E3] dark:text-[#2997FF] shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{item.label.split(' ')[0]}</span>
                  <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Live Metrics Impact Strip */}
        <motion.div
          key={current.id + '-metrics'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-xs font-mono"
        >
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#0E0E14] border border-neutral-200/70 dark:border-white/5 space-y-0.5">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Time Waste</span>
            <span className="font-bold text-rose-600 dark:text-rose-400 text-sm block">
              {current.metrics.timeLost}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#0E0E14] border border-neutral-200/70 dark:border-white/5 space-y-0.5">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Uncompressed</span>
            <span className="font-bold text-neutral-700 dark:text-neutral-300 text-sm block">
              {current.metrics.tokensWasted}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#0E0E14] border border-neutral-200/70 dark:border-white/5 space-y-0.5">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">ChatBridge Capsule</span>
            <span className="font-bold text-[#0071E3] dark:text-[#2997FF] text-sm block">
              {current.metrics.tokensBridge}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-500/20 space-y-0.5">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Token Reduction</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm block">
              {current.metrics.savings}
            </span>
          </div>
        </motion.div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: The Friction (Without ChatBridge) */}
          <motion.div
            key={current.id + '-old'}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-2xl bg-white dark:bg-[#0E0E14] border border-neutral-200/90 dark:border-white/10 p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
                  <IconX className="w-4 h-4" />
                  <span>Manual Model Switching</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  {current.metrics.timeLost}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {current.oldWay.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  {current.oldWay.description}
                </p>
              </div>

              {/* Code / Snippet Box */}
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/5 text-xs font-mono text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {current.oldWay.snippet}
              </div>
            </div>

            {/* Friction Callout */}
            <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-500/20 text-xs text-rose-900 dark:text-rose-200 space-y-1">
              <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider text-rose-700 dark:text-rose-400">
                <IconAlertTriangle className="w-3.5 h-3.5" />
                <span>{current.oldWay.frictionLabel}</span>
              </span>
              <p className="text-[11px] leading-relaxed text-rose-800 dark:text-rose-300">
                {current.oldWay.friction}
              </p>
            </div>
          </motion.div>

          {/* Right: The Solution (With ChatBridge) */}
          <motion.div
            key={current.id + '-bridge'}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-2xl bg-white dark:bg-[#0E0E14] border border-[#0071E3]/30 dark:border-[#2997FF]/30 p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-sm ring-1 ring-[#0071E3]/15"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <IconCheck className="w-4 h-4" />
                  <span>ChatBridge Seamless Handoff</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  {current.metrics.savings}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {current.bridgeWay.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  {current.bridgeWay.description}
                </p>
              </div>

              {/* Injected Capsule Box */}
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/5 text-xs font-mono text-neutral-900 dark:text-neutral-100 leading-relaxed whitespace-pre-wrap">
                {current.bridgeWay.snippet}
              </div>
            </div>

            {/* Benefit Callout */}
            <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <IconCheck className="w-3.5 h-3.5" />
                <span>{current.bridgeWay.benefitLabel}</span>
              </span>
              <p className="text-[11px] leading-relaxed text-emerald-800 dark:text-emerald-300">
                {current.bridgeWay.benefit}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
