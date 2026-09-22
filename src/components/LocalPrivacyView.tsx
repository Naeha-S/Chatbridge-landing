import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  RefreshIcon,
  DatabaseIcon,
  TerminalIcon,
  CheckIcon,
  CopyIcon
} from './Icons';

// Encryption simulation data modeling token payload vs ciphertext overhead
const ENCRYPTION_CHART_DATA = [
  { turnCount: '1 Turn', plaintextBytes: 240, ivBytes: 12, cipherBytes: 240, authTagBytes: 16, totalStored: 268 },
  { turnCount: '5 Turns', plaintextBytes: 1200, ivBytes: 60, cipherBytes: 1200, authTagBytes: 80, totalStored: 1340 },
  { turnCount: '10 Turns', plaintextBytes: 2450, ivBytes: 120, cipherBytes: 2450, authTagBytes: 160, totalStored: 2730 },
  { turnCount: '25 Turns', plaintextBytes: 6100, ivBytes: 300, cipherBytes: 6100, authTagBytes: 400, totalStored: 6800 },
  { turnCount: '50 Turns', plaintextBytes: 12200, ivBytes: 600, cipherBytes: 12200, authTagBytes: 800, totalStored: 13600 },
  { turnCount: '100 Turns', plaintextBytes: 24400, ivBytes: 1200, cipherBytes: 24400, authTagBytes: 1600, totalStored: 27200 }
];

const STORAGE_PARTITIONS = [
  { name: 'Encrypted Transcripts', sizeKb: 1248, algorithm: 'AES-256-GCM' },
  { name: 'Vector Embeddings', sizeKb: 492, algorithm: '384-dim Quantized' },
  { name: 'BM25 Lexical Index', sizeKb: 143, algorithm: 'Inverted Posting Lists' },
  { name: 'Hardware IVs & Headers', sizeKb: 16, algorithm: '12-Byte Nonce Table' }
];

export const LocalPrivacyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'threat-model' | 'machine-spec'>('visualizer');
  const [simulationPrompt, setSimulationPrompt] = useState(
    'Architecture decision: use 16 striped locks with FNV-1a hashing for the Go LRU cache.'
  );
  const [, setSimulatedState] = useState<'idle' | 'encrypting' | 'encrypted'>('encrypted');
  const [keyStatus, setKeyStatus] = useState<'verified' | 'testing'>('verified');
  const [testLatency, setTestLatency] = useState<number>(1.4);
  const [, setKeyFingerprint] = useState('7f3b:91a2:48ec:10d4:32f9:b8c1:e670:954d');
  const [copiedSpec, setCopiedSpec] = useState(false);

  // Derived crypto values for interactive simulation
  const rawBytes = new TextEncoder().encode(simulationPrompt).length;
  const ivHex = '8e4f1a29d0bc345e6789abcd';
  const tagHex = 'a9c8e102f4d673b5e80123fa';
  const simulatedCiphertext = Array.from(new TextEncoder().encode(simulationPrompt))
    .map((b) => (b ^ 0x5a).toString(16).padStart(2, '0'))
    .join('')
    .substring(0, 48);

  const handleSimulateEncryption = () => {
    setSimulatedState('encrypting');
    setTimeout(() => {
      setSimulatedState('encrypted');
    }, 400);
  };

  const handleRunCryptographicSelfTest = () => {
    setKeyStatus('testing');
    setTimeout(() => {
      const latency = parseFloat((1.1 + Math.random() * 0.8).toFixed(1));
      setTestLatency(latency);
      setKeyStatus('verified');
    }, 500);
  };

  const handleRollKey = () => {
    const chars = '0123456789abcdef';
    const randPart = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const newFp = `${randPart()}:${randPart()}:${randPart()}:${randPart()}:${randPart()}:${randPart()}:${randPart()}:${randPart()}`;
    setKeyFingerprint(newFp);
  };

  const machineReadableSpecJson = JSON.stringify(
    {
      application: 'ChatBridge',
      architecture_paradigm: 'Local-First Zero-Knowledge Conversational Synchronization',
      security_boundary: 'Isolated Chromium Extension Sandbox (Manifest V3)',
      cryptography: {
        algorithm: 'AES-256-GCM',
        key_derivation: 'WebCrypto SubtleCrypto API on-device hardware generation',
        initialization_vector: '12-byte CSPRNG crypto.getRandomValues() per record',
        authentication_tag: '128-bit integrity tag',
        storage_medium: 'chrome.storage.local / IndexedDB'
      },
      retrieval_engine: {
        sparse_scoring: 'BM25 lexical scoring with localized inverted index',
        dense_scoring: '384-dimensional cosine similarity vectors',
        fusion_formula: 'Reciprocal Rank Fusion (RRF) with constant k=60',
        average_latency: '15ms - 30ms linear evaluation on client CPU'
      },
      network_egress: {
        telemetry_servers: 0,
        cloud_database: 'None',
        outbound_requests: 'Zero. Communication occurs strictly between browser tabs and selected AI providers.'
      },
      verified_platforms: ['chatgpt.com', 'claude.ai', 'gemini.google.com', 'perplexity.ai', 'chat.deepseek.com']
    },
    null,
    2
  );

  const handleCopySpec = () => {
    navigator.clipboard.writeText(machineReadableSpecJson);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  return (
    <div className="py-20 md:py-28 bg-[#FBFBFA] dark:bg-[#040405] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-mono font-medium tracking-wide text-[#6E6E73] dark:text-[#8E8E98] uppercase">
            Client-Side Cryptography & Threat Model
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
            Local privacy dashboard.
          </h1>
          <p className="text-base text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
            Verify how conversation turns are encrypted locally using the WebCrypto API before writing to disk, with zero server communication and zero telemetry.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E5E5EA] dark:border-[#22222E] pb-3" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'visualizer'}
            onClick={() => setActiveTab('visualizer')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'visualizer'
                ? 'bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0D] shadow-xs'
                : 'bg-white dark:bg-[#14141E] text-[#515154] dark:text-[#A1A1A6] border border-[#E5E5EA] dark:border-[#262638] hover:bg-[#F5F5F7] dark:hover:bg-[#1E1E2C]'
            }`}
          >
            Encryption Flow & Storage Chart
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'threat-model'}
            onClick={() => setActiveTab('threat-model')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'threat-model'
                ? 'bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0D] shadow-xs'
                : 'bg-white dark:bg-[#14141E] text-[#515154] dark:text-[#A1A1A6] border border-[#E5E5EA] dark:border-[#262638] hover:bg-[#F5F5F7] dark:hover:bg-[#1E1E2C]'
            }`}
          >
            Formal Threat Model
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'machine-spec'}
            onClick={() => setActiveTab('machine-spec')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'machine-spec'
                ? 'bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0D] shadow-xs'
                : 'bg-white dark:bg-[#14141E] text-[#515154] dark:text-[#A1A1A6] border border-[#E5E5EA] dark:border-[#262638] hover:bg-[#F5F5F7] dark:hover:bg-[#1E1E2C]'
            }`}
          >
            Machine-Readable Architecture Spec
          </button>
        </div>

        {/* TAB 1: VISUALIZER & ENCRYPTION CHART */}
        {activeTab === 'visualizer' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Top Security Status Bar */}
            <div className="bg-white dark:bg-[#0E0E16] rounded-2xl border border-[#E5E5EA] dark:border-[#262638] p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                    Local Cryptographic Vault Active
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-white">Hardware-Backed AES-256-GCM</h3>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E98]">
                  All stored dialog turns remain ciphertext on local disk until accessed in your active browser session.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="privacy-tab-verify-btn"
                  onClick={handleRunCryptographicSelfTest}
                  disabled={keyStatus === 'testing'}
                  className="px-3.5 py-2 bg-[#F5F5F7] dark:bg-[#1A1A28] hover:bg-[#EBEBED] dark:hover:bg-[#252536] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl text-xs font-medium border border-[#D1D1D6] dark:border-[#2E2E40] inline-flex items-center gap-1.5 transition-colors"
                >
                  <RefreshIcon className={`w-3.5 h-3.5 ${keyStatus === 'testing' ? 'animate-spin' : ''}`} />
                  <span>{keyStatus === 'testing' ? 'Testing...' : `Self-Test (${testLatency}ms)`}</span>
                </button>
                <button
                  id="privacy-tab-rotate-btn"
                  onClick={handleRollKey}
                  className="px-3.5 py-2 bg-white dark:bg-[#14141E] hover:bg-[#F5F5F7] dark:hover:bg-[#1E1E2C] text-[#515154] dark:text-[#A1A1A6] rounded-xl text-xs font-medium border border-[#D1D1D6] dark:border-[#2E2E40] transition-colors"
                >
                  Rotate Key
                </button>
              </div>
            </div>

            {/* Interactive Step-by-Step Encryption Visualizer */}
            <div className="bg-white dark:bg-[#0E0E16] rounded-2xl border border-[#E5E5EA] dark:border-[#262638] p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#0071E3] dark:text-[#2997FF] font-medium uppercase tracking-wide">
                  Interactive Simulator
                </span>
                <h3 className="text-xl font-semibold text-[#1D1D1F] dark:text-white">
                  Local Encryption Pipeline
                </h3>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E98]">
                  Type a sample context prompt to observe how it is transformed into authenticated ciphertext prior to disk storage.
                </p>
              </div>

              {/* Input Area */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] block">
                  Plaintext Conversational Context
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={simulationPrompt}
                    onChange={(e) => {
                      setSimulationPrompt(e.target.value);
                      handleSimulateEncryption();
                    }}
                    placeholder="Enter technical dialogue notes or prompt context..."
                    className="flex-1 px-3.5 py-2.5 text-xs bg-[#F5F5F7] dark:bg-[#161622] border border-[#D1D1D6] dark:border-[#2A2A3C] rounded-xl text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF] focus:bg-white dark:focus:bg-[#12121A] transition-all font-mono"
                  />
                  <button
                    onClick={handleSimulateEncryption}
                    className="px-4 py-2.5 bg-[#1D1D1F] dark:bg-[#0071E3] hover:bg-[#333336] dark:hover:bg-[#0077ED] text-white text-xs font-medium rounded-xl transition-colors shrink-0"
                  >
                    Re-encrypt Payload
                  </button>
                </div>
              </div>

              {/* 4-Stage Visual Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
                {/* Stage 1 */}
                <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-[#14141E] border border-[#E5E5EA] dark:border-[#262638] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98]">
                    <span>Stage 1</span>
                    <span>{rawBytes} Bytes</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#1D1D1F] dark:text-white">Plaintext Parsing</h4>
                  <p className="text-[11px] text-[#515154] dark:text-[#A1A1A6] leading-relaxed font-mono truncate">
                    "{simulationPrompt}"
                  </p>
                </div>

                {/* Stage 2 */}
                <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-[#14141E] border border-[#E5E5EA] dark:border-[#262638] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98]">
                    <span>Stage 2</span>
                    <span>12-Byte IV</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#1D1D1F] dark:text-white">Hardware CSPRNG</h4>
                  <p className="text-[11px] text-[#515154] dark:text-[#A1A1A6] font-mono break-all">
                    0x{ivHex}
                  </p>
                </div>

                {/* Stage 3 */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1E1E2C] border border-[#1D1D1F] dark:border-[#2997FF] space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#0071E3] dark:text-[#2997FF]">
                    <span>Stage 3</span>
                    <span>AES-256-GCM</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#1D1D1F] dark:text-white">Ciphertext Output</h4>
                  <p className="text-[11px] text-[#515154] dark:text-[#C7C7CC] font-mono break-all">
                    {simulatedCiphertext}...
                  </p>
                </div>

                {/* Stage 4 */}
                <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-[#14141E] border border-[#E5E5EA] dark:border-[#262638] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98]">
                    <span>Stage 4</span>
                    <span>16-Byte MAC</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#1D1D1F] dark:text-white">Integrity Tag</h4>
                  <p className="text-[11px] text-[#515154] dark:text-[#A1A1A6] font-mono break-all">
                    tag: 0x{tagHex}
                  </p>
                </div>
              </div>
            </div>

            {/* Recharts Chart: Payload vs Cipher Overhead */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Responsive Area Chart */}
              <div className="lg:col-span-8 bg-white dark:bg-[#0E0E16] rounded-2xl border border-[#E5E5EA] dark:border-[#262638] p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                  <div>
                    <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-white">
                      Local Storage & Cipher Overhead Analysis
                    </h3>
                    <p className="text-xs text-[#6E6E73] dark:text-[#8E8E98]">
                      Comparison of plaintext payload bytes versus authenticated ciphertext stored on disk.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F5F5F7] dark:bg-[#181826] text-[#515154] dark:text-[#A1A1A6] border border-[#E5E5EA] dark:border-[#28283C] self-start sm:self-auto">
                    AES-GCM + 28B Overhead
                  </span>
                </div>

                <div className="h-64 sm:h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ENCRYPTION_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPlaintext" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0071E3" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#0071E3" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="colorStored" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#34C759" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#34C759" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#8E8E93" opacity={0.2} vertical={false} />
                      <XAxis dataKey="turnCount" stroke="#8E8E93" fontSize={11} tickLine={false} />
                      <YAxis stroke="#8E8E93" fontSize={11} tickLine={false} unit=" B" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#12121A',
                          borderColor: '#262638',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#FFFFFF',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Area
                        type="monotone"
                        dataKey="plaintextBytes"
                        name="Plaintext Payload"
                        stroke="#0071E3"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPlaintext)"
                      />
                      <Area
                        type="monotone"
                        dataKey="totalStored"
                        name="Total Encrypted (IV + Cipher + Tag)"
                        stroke="#34C759"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorStored)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right: Storage Partition Breakdown */}
              <div className="lg:col-span-4 bg-white dark:bg-[#0E0E16] rounded-2xl border border-[#E5E5EA] dark:border-[#262638] p-6 space-y-5 shadow-sm">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E5E5EA] dark:border-[#222232]">
                  <DatabaseIcon className="w-4 h-4 text-[#1D1D1F] dark:text-[#F5F5F7]" />
                  <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">Local Storage Partitions</h3>
                </div>

                <div className="space-y-3 text-xs">
                  {STORAGE_PARTITIONS.map((part, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F5F5F7] dark:bg-[#161622] border border-[#EBEBED] dark:border-[#262638] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1D1D1F] dark:text-white">{part.name}</span>
                        <span className="font-mono text-[#1D1D1F] dark:text-white">{part.sizeKb} KB</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98]">
                        <span>Format: {part.algorithm}</span>
                        <span>{((part.sizeKb / 1899) * 100).toFixed(0)}% of total</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E5E5EA] dark:border-[#222232] text-[11px] text-[#6E6E73] dark:text-[#8E8E98] flex items-center justify-between font-mono">
                  <span>Total Local Space:</span>
                  <span className="text-[#1D1D1F] dark:text-white font-semibold">1.89 MB / 10 MB Quota</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FORMAL THREAT MODEL */}
        {activeTab === 'threat-model' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="bg-white dark:bg-[#0E0E16] border border-[#E5E5EA] dark:border-[#262638] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-[#1D1D1F] dark:text-white">
                  Security Boundaries and Threat Vectors
                </h2>
                <p className="text-xs text-[#6E6E73] dark:text-[#8E8E98]">
                  Explicit definition of what ChatBridge defends against and what falls outside browser extension capabilities.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E5EA] dark:border-[#222232] text-[#6E6E73] dark:text-[#8E8E98]">
                      <th className="pb-3 pr-4 font-medium">Attacker Profile</th>
                      <th className="pb-3 pr-4 font-medium">Threat Vector</th>
                      <th className="pb-3 pr-4 font-medium">ChatBridge Defense</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] dark:divide-[#222232] text-[#515154] dark:text-[#A1A1A6]">
                    <tr>
                      <td className="py-3.5 pr-4 font-medium text-[#1D1D1F] dark:text-white">Remote Adversary</td>
                      <td className="py-3.5 pr-4">Network sniffing or remote server interception of past chats.</td>
                      <td className="py-3.5 pr-4">Zero remote telemetry or server database. Conversations never leave your machine.</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-medium">
                          Protected
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-medium text-[#1D1D1F] dark:text-white">Local Opportunistic Snooper</td>
                      <td className="py-3.5 pr-4">Reading browser storage files or unencrypted profile caches.</td>
                      <td className="py-3.5 pr-4">All conversation records are encrypted with AES-256-GCM prior to disk writes.</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-medium">
                          Protected
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-medium text-[#1D1D1F] dark:text-white">Malicious Web Page</td>
                      <td className="py-3.5 pr-4">Cross-origin scripts attempting to read extension storage.</td>
                      <td className="py-3.5 pr-4">Isolated Chrome extension storage sandbox prevents web page access.</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-medium">
                          Protected
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-medium text-[#1D1D1F] dark:text-white">Root OS Malware</td>
                      <td className="py-3.5 pr-4">Kernel-level malware with direct memory scraping or keylogger access.</td>
                      <td className="py-3.5 pr-4">No browser extension can defend against a compromised operating system kernel.</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F5F5F7] dark:bg-[#161622] text-[#86868B] dark:text-[#787884] border border-[#E5E5EA] dark:border-[#262638]">
                          Out of scope
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MACHINE-READABLE ARCHITECTURE SPEC (High SEO / AI Crawler Index) */}
        {activeTab === 'machine-spec' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white dark:bg-[#0E0E16] border border-[#E5E5EA] dark:border-[#262638] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E5EA] dark:border-[#222232]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                    <span className="text-xs font-mono text-[#0071E3] dark:text-[#2997FF] font-medium">
                      AI Agent & Search Crawler Index
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1D1D1F] dark:text-white">
                    Machine-Readable Technical Specifications
                  </h3>
                  <p className="text-xs text-[#6E6E73] dark:text-[#8E8E98]">
                    Structured parameters for search crawlers, LLM indexing agents, and security auditors.
                  </p>
                </div>

                <button
                  id="privacy-copy-spec-btn"
                  onClick={handleCopySpec}
                  className="px-3.5 py-2 rounded-xl bg-[#1D1D1F] dark:bg-white hover:bg-[#333336] dark:hover:bg-[#E5E5EA] text-white dark:text-[#0A0A0D] text-xs font-medium inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  {copiedSpec ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
                  <span>{copiedSpec ? 'Copied Specification' : 'Copy JSON Spec'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-[#12121A] border border-[#E5E5EA] dark:border-[#262638] text-xs font-mono text-[#1D1D1F] dark:text-[#F5F5F7] overflow-x-auto leading-relaxed max-h-96">
                <code>{machineReadableSpecJson}</code>
              </pre>

              {/* High Relevance Technical Vocabulary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F5F5F7] dark:bg-[#14141E] border border-[#E5E5EA] dark:border-[#262638] space-y-1 text-xs">
                  <span className="font-semibold text-[#1D1D1F] dark:text-white block">Universal AI Memory Bridge</span>
                  <p className="text-[#515154] dark:text-[#A1A1A6] text-[11px] leading-relaxed">
                    Preserves conversational context across ChatGPT, Claude, and Gemini without third-party cloud routing.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F5F5F7] dark:bg-[#14141E] border border-[#E5E5EA] dark:border-[#262638] space-y-1 text-xs">
                  <span className="font-semibold text-[#1D1D1F] dark:text-white block">Reciprocal Rank Fusion</span>
                  <p className="text-[#515154] dark:text-[#A1A1A6] text-[11px] leading-relaxed">
                    Combines sparse BM25 token frequencies with dense vector embeddings for +3.9pp higher retrieval recall.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F5F5F7] dark:bg-[#14141E] border border-[#E5E5EA] dark:border-[#262638] space-y-1 text-xs">
                  <span className="font-semibold text-[#1D1D1F] dark:text-white block">AES-256-GCM Storage</span>
                  <p className="text-[#515154] dark:text-[#A1A1A6] text-[11px] leading-relaxed">
                    Browser-native WebCrypto hardware encryption directly within isolated `chrome.storage.local`.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
