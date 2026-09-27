"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@/components/ui/tabs";
import { IconX, IconMaximize, IconCheck, IconZoomIn } from "@tabler/icons-react";

export default function TabsDemo() {
  const [activeModalImage, setActiveModalImage] = useState<{
    src: string;
    title: string;
    stage: string;
    caption: string;
  } | null>(null);

  const tabs: Tab[] = [
    {
      title: "1. DOM Observation",
      shortTitle: "1. Observation",
      value: "observation",
      content: (
        <ArchitectureStageCard
          stageNumber="Stage 01"
          stageKicker="Zero-Injection Observer"
          stagePill="100% Local DOM"
          title="Universal DOM Observation"
          description="Sandboxed Chromium MutationObserver detects streaming conversational turns across ChatGPT, Claude, and Gemini, capturing message blocks locally without keystroke logging or remote server calls."
          metrics={[
            { label: "Capture Latency", value: "< 2ms" },
            { label: "Memory Isolation", value: "chrome.storage.local" },
            { label: "Telemetry Exfiltration", value: "0 bytes" }
          ]}
          imageSrc="/assets/images/dom_observer_diagram_1790143869458.jpg"
          imageAlt="DOM Observer Architecture & Mutation Stream Diagram"
          caption="Real-time DOM mutation listener capturing message-role tags into on-device sandbox"
          onZoom={() =>
            setActiveModalImage({
              src: "/assets/images/dom_observer_diagram_1790143869458.jpg",
              title: "Stage 01: Universal DOM Observation",
              stage: "Stage 01",
              caption: "Dual-tab observer capturing conversational streaming nodes and queuing local embeddings without external network requests."
            })
          }
        />
      ),
    },
    {
      title: "2. Vector & RRF Indexing",
      shortTitle: "2. Vector & RRF",
      value: "indexing",
      content: (
        <ArchitectureStageCard
          stageNumber="Stage 02"
          stageKicker="Hybrid Search Engine"
          stagePill="BM25 + 384d Vectors"
          title="Reciprocal Rank Fusion (RRF)"
          description="Fuses sparse lexical keywords (function names, git commit hashes, error codes) with high-dimensional dense embeddings to eliminate conversational memory drift."
          metrics={[
            { label: "Retrieval Recall@5", value: "76.8% (+3.9pp)" },
            { label: "Vector Dimension", value: "384d MiniLM" },
            { label: "Indexing Latency", value: "18ms" }
          ]}
          imageSrc="/assets/images/rrf_indexing_diagram_1790143908084.jpg"
          imageAlt="Reciprocal Rank Fusion (RRF) & Embeddings Cluster Diagram"
          caption="Sparse BM25 lexical matcher converging with dense embeddings into balanced fused rankings"
          onZoom={() =>
            setActiveModalImage({
              src: "/assets/images/rrf_indexing_diagram_1790143908084.jpg",
              title: "Stage 02: Reciprocal Rank Fusion (RRF)",
              stage: "Stage 02",
              caption: "Hybrid retrieval merging lexical and semantic scoring channels into a consolidated rank vector."
            })
          }
        />
      ),
    },
    {
      title: "3. AES-256-GCM Encryption",
      shortTitle: "3. AES-256",
      value: "encryption",
      content: (
        <ArchitectureStageCard
          stageNumber="Stage 03"
          stageKicker="Zero-Knowledge Airgap"
          stagePill="Hardware WebCrypto"
          title="Hardware AES-256-GCM Vault"
          description="Military-grade on-device cryptographic routines execute through Chromium SubtleCrypto. Encryption keys are non-extractable and dialogue stays encrypted at rest."
          metrics={[
            { label: "Cipher Algorithm", value: "AES-256-GCM" },
            { label: "Key Storage", value: "Non-extractable RAM" },
            { label: "Remote Databases", value: "None (Air-Gapped)" }
          ]}
          imageSrc="/assets/images/aes_vault_diagram_1790143920464.jpg"
          imageAlt="SubtleCrypto Hardware Acceleration Vault Diagram"
          caption="256-bit symmetric key generation, IV nonces, and 128-bit authentication tags encrypted at rest"
          onZoom={() =>
            setActiveModalImage({
              src: "/assets/images/aes_vault_diagram_1790143920464.jpg",
              title: "Stage 03: Hardware AES-256-GCM Vault",
              stage: "Stage 03",
              caption: "On-device hardware cryptographic pipeline ensuring raw dialogue transcripts never touch any external server."
            })
          }
        />
      ),
    },
    {
      title: "4. Token Compression",
      shortTitle: "4. Compression",
      value: "compression",
      content: (
        <ArchitectureStageCard
          stageNumber="Stage 04"
          stageKicker="Context Distillation"
          stagePill="95% Prompt Reduction"
          title="95% Token Capsule Synthesis"
          description="Strips conversational noise and courtesies while distilling structural variables, goals, and constraints into high-density context pills ready for model prompt handoff."
          metrics={[
            { label: "Prompt Reduction", value: "2,500 → 120 Tokens" },
            { label: "Context Density", value: "19.8x Increase" },
            { label: "Handoff Time", value: "< 0.1s" }
          ]}
          imageSrc="/assets/images/token_compression_diagram_1790143933506.jpg"
          imageAlt="Raw Conversation to Structured Context Pill Diagram"
          caption="Noise filtration pipeline reducing thousands of conversational tokens into structured yaml/json context"
          onZoom={() =>
            setActiveModalImage({
              src: "/assets/images/token_compression_diagram_1790143933506.jpg",
              title: "Stage 04: LLM Token Compression",
              stage: "Stage 04",
              caption: "Intelligent compression pipeline removing boilerplate and redundancies to maximize destination model prompt efficiency."
            })
          }
        />
      ),
    },
    {
      title: "5. Context Injection",
      shortTitle: "5. Injection (HUD)",
      value: "injection",
      content: (
        <ArchitectureStageCard
          stageNumber="Stage 05"
          stageKicker="Cross-Model HUD"
          stagePill="Cmd+Shift+K"
          title="Instant Cmd+Shift+K HUD"
          description="Universal floating HUD overlay injects compressed capsules across OpenAI ChatGPT, Anthropic Claude, Google Gemini, and DeepSeek tabs with 1 keypress."
          metrics={[
            { label: "HUD Hotkey", value: "⌘+Shift+K / Ctrl+Shift+K" },
            { label: "Injection Delay", value: "< 30ms" },
            { label: "Supported Tabs", value: "ChatGPT, Claude, Gemini" }
          ]}
          imageSrc="/assets/images/cmd_shift_k_hud_diagram_1790143946051.jpg"
          imageAlt="In-Browser HUD Cross-Model Injection Diagram"
          caption="Universal command palette overlay injecting compressed capsules across ChatGPT and Claude"
          onZoom={() =>
            setActiveModalImage({
              src: "/assets/images/cmd_shift_k_hud_diagram_1790143946051.jpg",
              title: "Stage 05: One Shortcut. Full Context. Cmd+Shift+K",
              stage: "Stage 05",
              caption: "Instantly bring your context across OpenAI ChatGPT, Anthropic Claude, Google Gemini, and DeepSeek tabs."
            })
          }
        />
      ),
    },
  ];

  return (
    <div className="w-full">
      <Tabs tabs={tabs} />

      {/* Lightbox Modal for Full-Resolution Architecture Diagrams */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 dark:bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalImage.title}
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
                loading="eager"
              />
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans shrink-0">
              {activeModalImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface ArchitectureStageCardProps {
  stageNumber: string;
  stageKicker: string;
  stagePill: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  imageSrc: string;
  imageAlt: string;
  caption: string;
  onZoom: () => void;
}

function ArchitectureStageCard({
  stageNumber,
  stageKicker,
  stagePill,
  title,
  description,
  metrics,
  imageSrc,
  imageAlt,
  caption,
  onZoom,
}: ArchitectureStageCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#0B0B12] border border-neutral-200/90 dark:border-white/10 shadow-lg dark:shadow-2xl overflow-hidden flex flex-col transition-colors">
      {/* Stage Header Info */}
      <div className="p-4 sm:p-6 border-b border-neutral-200/70 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#0071E3] dark:text-[#2997FF] font-semibold">
                {stageNumber}
              </span>
              <span className="text-neutral-400 dark:text-neutral-600">·</span>
              <span className="text-neutral-500 dark:text-neutral-400">
                {stageKicker}
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white mt-1">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[#0071E3]/10 dark:bg-[#2997FF]/10 text-[#0071E3] dark:text-[#2997FF] border border-[#0071E3]/20 dark:border-[#2997FF]/20">
              {stagePill}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#515154] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
          {description}
        </p>

        {/* Technical Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-neutral-200/60 dark:border-white/5 text-xs font-mono">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                {m.label}
              </span>
              <span className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Visual Area - Guaranteed Full Visibility & Mobile Responsive Aspect Ratio */}
      <div className="p-3 sm:p-5 bg-neutral-900/90 dark:bg-[#07070B] flex-1 flex flex-col justify-center">
        <div
          onClick={onZoom}
          className="relative w-full aspect-[16/10] min-h-[220px] sm:min-h-[320px] md:min-h-[400px] rounded-xl overflow-hidden border border-neutral-800 dark:border-white/10 bg-neutral-950 flex items-center justify-center group cursor-zoom-in transition-all duration-300 hover:border-[#0071E3]/50"
        >
          {/* Real Diagram Image */}
          {!imageError ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-contain p-2 sm:p-4 rounded-lg transition-all duration-300 ${
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-98"
              } group-hover:scale-[1.01]`}
              loading="eager"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center text-neutral-400">
              <span className="text-sm font-medium text-white mb-1">{title}</span>
              <span className="text-xs font-mono">{stageNumber} Architecture Pipeline</span>
            </div>
          )}

          {/* Loading Skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
              <div className="w-8 h-8 rounded-full border-2 border-[#0071E3]/20 border-t-[#0071E3] animate-spin" />
            </div>
          )}

          {/* Expand Badge */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono opacity-80 group-hover:opacity-100 group-hover:bg-[#0071E3] group-hover:border-[#0071E3] transition-all shadow-md">
            <IconMaximize className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Click to Expand</span>
          </div>

          {/* Bottom Caption Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 px-3 py-2 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex items-center justify-between text-xs text-neutral-200">
            <span className="truncate text-[11px] sm:text-xs font-mono text-neutral-300">
              {caption}
            </span>
            <span className="text-[10px] font-mono text-[#2997FF] shrink-0 ml-2 hidden sm:inline">
              {stageNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
