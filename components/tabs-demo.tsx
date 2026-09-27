"use client";

import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { IconX, IconMaximize } from "@tabler/icons-react";

export default function TabsDemo() {
  const [activeModalImage, setActiveModalImage] = useState<{
    src: string;
    title: string;
    stage: string;
    caption: string;
  } | null>(null);

  const tabs = [
    {
      title: "1. DOM Observation",
      value: "observation",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-4 sm:p-6 text-neutral-900 dark:text-white bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col justify-between transition-colors">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#2997FF] font-semibold">
                Stage 01 • Zero-Injection Observer
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight">
                Universal DOM Observation
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse mr-1.5" />
                Active Observer
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400">
                100% Local DOM
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-3xl mb-2 sm:mb-3 leading-relaxed hidden sm:block">
            Sandboxed MutationObserver detects streaming conversational turns in ChatGPT & Claude, capturing assistant blocks locally without keystroke logging or remote server calls.
          </p>

          {/* Full Uncropped Architecture Image */}
          <ArchitectureVisualCard
            src="/assets/images/dom_observer_diagram_1790143869458.jpg"
            title="DOM Observer Architecture & Mutation Stream"
            stage="Stage 01"
            caption="Real-time DOM mutation listener capturing message-role tags into on-device sandbox"
            onZoom={() =>
              setActiveModalImage({
                src: "/assets/images/dom_observer_diagram_1790143869458.jpg",
                title: "Stage 01: Universal DOM Observation",
                stage: "Stage 01",
                caption: "Dual-tab observer capturing conversational streaming nodes and queuing local embeddings without external network requests.",
              })
            }
          />
        </div>
      ),
    },
    {
      title: "2. Vector & RRF Indexing",
      value: "indexing",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-4 sm:p-6 text-neutral-900 dark:text-white bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col justify-between transition-colors">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#AF52DE] font-semibold">
                Stage 02 • Hybrid Search Engine
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight">
                Reciprocal Rank Fusion (RRF)
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300">
                BM25 + 384d Vectors
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-300">
                76.8% Recall@5
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-3xl mb-2 sm:mb-3 leading-relaxed hidden sm:block">
            Merges sparse lexical keyword indices (code tokens, git hashes) with high-dimensional semantic embeddings to eliminate LLM memory drift.
          </p>

          {/* Full Uncropped Architecture Image in macOS dev style */}
          <ArchitectureVisualCard
            src="/assets/images/rrf_search_ui_1790151778488.jpg"
            title="Reciprocal Rank Fusion (RRF) & Embeddings Cluster"
            stage="Stage 02"
            caption="Sparse BM25 lexical matcher converging with 384-dimensional dense vectors into fused rankings"
            onZoom={() =>
              setActiveModalImage({
                src: "/assets/images/rrf_search_ui_1790151778488.jpg",
                title: "Stage 02: Reciprocal Rank Fusion (RRF)",
                stage: "Stage 02",
                caption: "RRF combines rankings from multiple retrievers: RRF(d) = sum(1 / (k + rank_i(d))) with k=60 for balanced lexical and semantic recall.",
              })
            }
          />
        </div>
      ),
    },
    {
      title: "3. AES-256-GCM Encryption",
      value: "encryption",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-4 sm:p-6 text-neutral-900 dark:text-white bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col justify-between transition-colors">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#30D158] font-semibold">
                Stage 03 • Zero Knowledge Airgap
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight">
                Hardware AES-256-GCM Vault
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300">
                WebCrypto Non-Extractable
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-emerald-500/20 text-neutral-700 dark:text-neutral-300">
                0 Cloud Logs
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-3xl mb-2 sm:mb-3 leading-relaxed hidden sm:block">
            Military-grade encryption runs on-device using Chromium SubtleCrypto. Encryption keys never leave memory and records remain encrypted at rest.
          </p>

          {/* Full Uncropped Architecture Image in macOS dev style */}
          <ArchitectureVisualCard
            src="/assets/images/aes_vault_ui_1790151790360.jpg"
            title="SubtleCrypto Hardware Acceleration Vault"
            stage="Stage 03"
            caption="256-bit symmetric key generation, IV nonces, and 128-bit authentication tags encrypted at rest"
            onZoom={() =>
              setActiveModalImage({
                src: "/assets/images/aes_vault_ui_1790151790360.jpg",
                title: "Stage 03: Hardware AES-256-GCM Vault",
                stage: "Stage 03",
                caption: "On-device hardware cryptographic pipeline ensuring raw dialogue transcripts never touch any external server or telemetry channel.",
              })
            }
          />
        </div>
      ),
    },
    {
      title: "4. Token Compression",
      value: "compression",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-4 sm:p-6 text-neutral-900 dark:text-white bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col justify-between transition-colors">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF9F0A] font-semibold">
                Stage 04 • High Efficiency
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight">
                95% Token Capsule Synthesis
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300">
                2,500 &rarr; 120 Tokens
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-amber-500/20 text-neutral-700 dark:text-neutral-300">
                Zero Context Waste
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-3xl mb-2 sm:mb-3 leading-relaxed hidden sm:block">
            Strips conversational noise and courtesies while distilling structural variables, goals, and constraints into high-density context pills.
          </p>

          {/* Full Uncropped Architecture Image */}
          <ArchitectureVisualCard
            src="/assets/images/token_compression_diagram_1790143933506.jpg"
            title="Raw Conversation to Structured Context Pill"
            stage="Stage 04"
            caption="Noise filtration pipeline reducing thousands of conversational tokens into structured yaml/json context"
            onZoom={() =>
              setActiveModalImage({
                src: "/assets/images/token_compression_diagram_1790143933506.jpg",
                title: "Stage 04: LLM Token Compression",
                stage: "Stage 04",
                caption: "Intelligent compression pipeline removing boilerplate and redundancies to maximize destination model prompt efficiency.",
              })
            }
          />
        </div>
      ),
    },
    {
      title: "5. Context Injection",
      value: "injection",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-4 sm:p-6 text-neutral-900 dark:text-white bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col justify-between transition-colors">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF375F] font-semibold">
                Stage 05 • Cross-Model HUD
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight">
                Instant Cmd+Shift+K HUD
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-600 dark:text-pink-300">
                &lt; 30ms Retrieval
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-pink-500/20 text-neutral-700 dark:text-neutral-300">
                ⌘+⇧+K
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-3xl mb-2 sm:mb-3 leading-relaxed hidden sm:block">
            Trigger the HUD overlay inside any AI tab to query past sessions and inject context capsules directly into the prompt buffer.
          </p>

          {/* Full Uncropped Architecture Image */}
          <ArchitectureVisualCard
            src="/assets/images/cmd_shift_k_hud_diagram_1790143946051.jpg"
            title="In-Browser HUD Cross-Model Injection"
            stage="Stage 05"
            caption="Universal command palette overlay injecting compressed capsules across ChatGPT and Claude"
            onZoom={() =>
              setActiveModalImage({
                src: "/assets/images/cmd_shift_k_hud_diagram_1790143946051.jpg",
                title: "Stage 05: One Shortcut. Full Context. Cmd+Shift+K",
                stage: "Stage 05",
                caption: "Instantly bring your context across OpenAI ChatGPT, Anthropic Claude, Google Gemini, and DeepSeek tabs.",
              })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Container with ample height so 100% of the 16:9 diagram displays without cropping */}
      <div className="h-[28rem] sm:h-[34rem] md:h-[38rem] [perspective:1000px] relative flex flex-col max-w-6xl mx-auto w-full items-start justify-start my-4">
        <Tabs
          tabs={tabs}
          containerClassName="mb-3"
          activeTabClassName="bg-black/10 dark:bg-white/15 backdrop-blur-md border border-neutral-300/60 dark:border-white/20 shadow-sm"
          tabClassName="text-xs md:text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        />
      </div>

      {/* Lightbox Modal for Full-Resolution Architecture Diagrams */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 dark:bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] flex flex-col bg-white dark:bg-[#0E0E14] border border-neutral-200 dark:border-white/20 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10 shrink-0">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#2997FF]">
                  {activeModalImage.stage} Architectural View
                </span>
                <h4 className="text-base sm:text-xl font-bold text-neutral-900 dark:text-white">
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

            <div className="relative my-3 flex-1 flex items-center justify-center bg-neutral-100 dark:bg-black/80 rounded-xl border border-neutral-200 dark:border-white/10 p-2 overflow-hidden">
              <img
                src={activeModalImage.src}
                alt={activeModalImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans shrink-0">
              {activeModalImage.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

const ArchitectureVisualCard = ({
  src,
  title,
  stage,
  caption,
  onZoom,
}: {
  src: string;
  title: string;
  stage: string;
  caption: string;
  onZoom: () => void;
}) => {
  return (
    <div
      onClick={onZoom}
      className="relative w-full flex-1 rounded-xl border border-neutral-200/80 dark:border-white/15 bg-neutral-900 dark:bg-black/50 overflow-hidden cursor-zoom-in group transition-all duration-300 hover:border-[#2997FF]/50 hover:shadow-2xl flex items-center justify-center p-1.5 sm:p-2.5"
    >
      <img
        src={src}
        alt={title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
      />

      {/* Floating Hover Badge */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono opacity-85 group-hover:opacity-100 group-hover:bg-[#2997FF] group-hover:border-[#2997FF] transition-all shadow-md">
        <IconMaximize className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Click to Expand</span>
      </div>

      {/* Bottom Caption Pill */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-3 py-2 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex items-center justify-between text-xs text-neutral-200">
        <span className="truncate text-[11px] sm:text-xs font-mono text-neutral-300">
          {caption}
        </span>
        <span className="text-[10px] font-mono text-[#2997FF] shrink-0 ml-2 hidden sm:inline">
          {stage}
        </span>
      </div>
    </div>
  );
};
