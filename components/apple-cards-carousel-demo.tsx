"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = specializedWorkflowsData.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <section className="w-full py-10 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2997FF]/10 text-[#2997FF] border border-[#2997FF]/25 text-xs font-mono mb-3">
          <span>Domain-Specific Acceleration</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-sans">
          Specialized Workflows
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Engineered for high-context knowledge work across engineering, research, and technical leadership.
        </p>
      </div>
      <Carousel items={cards} />
    </section>
  );
}

const WorkflowModalContent = ({
  heading,
  description,
  metrics,
  imageTitle,
  imagePrompt,
}: {
  heading: string;
  description: string;
  metrics: { label: string; value: string }[];
  imageTitle: string;
  imagePrompt: string;
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#F5F5F7] dark:bg-neutral-800/80 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700/60">
        <h4 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-2">
          {heading}
        </h4>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center">
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wider">
              {m.label}
            </span>
            <span className="text-xl md:text-2xl font-bold font-mono text-[#2997FF]">
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Visual Asset Generator Container */}
      <div className="relative rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-100/70 dark:bg-black/60 p-6 text-center overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-[#2997FF] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#2997FF] animate-pulse" />
            <span>Recommended Visual Asset</span>
          </div>
          <h5 className="font-semibold text-neutral-900 dark:text-white text-base">
            {imageTitle}
          </h5>
          <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              AI Generation Prompt
            </span>
            <p className="text-xs font-mono text-neutral-700 dark:text-neutral-300 leading-relaxed select-all">
              "{imagePrompt}"
            </p>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Aspect Ratio: 16:9 • High-resolution UI mockup with modern glassmorphic aesthetics
          </p>
        </div>
      </div>
    </div>
  );
};

const specializedWorkflowsData = [
  {
    category: "Full-Stack Engineering",
    title: "System Architecture Handoff",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    content: (
      <WorkflowModalContent
        heading="Seamless Spec & Diff Handoff (o1 → Claude 3.5 Sonnet)"
        description="Architect your database schemas and distributed system topology in OpenAI o1 or GPT-4o. When you're ready to write frontend components or iterate on UI in Claude Artifacts, ChatBridge injects the exact types, API contracts, and state interfaces with zero manual copy-paste."
        metrics={[
          { label: "Token Savings", value: "95%" },
          { label: "State Recall", value: "100%" },
          { label: "Retrieval", value: "18ms" },
        ]}
        imageTitle="Full-Stack Architecture Handoff Flow"
        imagePrompt="Sleek dual-screen developer workspace showing architectural schema on OpenAI o1 seamlessly bridging into Claude Artifacts with clean TypeScript interfaces, dark mode, high-tech neon blue accents, 16:9"
      />
    ),
  },
  {
    category: "Deep Debugging",
    title: "Multi-Turn Stacktrace Continuity",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    content: (
      <WorkflowModalContent
        heading="Preserving Exact Variable Names & Compiler Logs"
        description="Standard vector databases lose crucial identifiers like memory addresses and variable names. ChatBridge combines BM25 keyword matching with dense embeddings, ensuring exact compiler diagnostics and lockfile hashes survive the cross-model journey."
        metrics={[
          { label: "Lexical Accuracy", value: "99.4%" },
          { label: "LongMemEval", value: "76.8%" },
          { label: "Key Size", value: "256-bit" },
        ]}
        imageTitle="Lexical BM25 & Semantic Fusion Diagnostic"
        imagePrompt="Futuristic code debugger terminal showing complex multi-line Rust and TypeScript compiler errors being synthesized into a glowing cryptographic context capsule, dark mode, 16:9"
      />
    ),
  },
  {
    category: "Literature & Research",
    title: "1M+ Token Academic Synthesis",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    content: (
      <WorkflowModalContent
        heading="Google Gemini 2.0 Large-Window Grounding"
        description="Take sprawling brainstorms and literature citations from ChatGPT or Perplexity and expand them effortlessly into Gemini's massive 1M+ token window. Ground your arguments with live Google Search citations while preserving early conversational premises."
        metrics={[
          { label: "Context Window", value: "1M+ Tokens" },
          { label: "Search Grounding", value: "Live" },
          { label: "Export Speed", value: "< 25ms" },
        ]}
        imageTitle="Academic Research Knowledge Graph"
        imagePrompt="Abstract glowing 3D knowledge graph connecting academic PDF citations, mathematical formulas, and live search nodes into a central golden context capsule, modern minimalist, 16:9"
      />
    ),
  },
  {
    category: "Enterprise Security",
    title: "Zero-Telemetry Compliance",
    src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
    content: (
      <WorkflowModalContent
        heading="Local Hardware AES-256-GCM Airgap"
        description="For legal teams, financial analysts, and corporate engineers handling sensitive NDA-protected discussions. Transcripts are encrypted locally using the WebCrypto API with extractable=false. No cloud databases, no tracking analytics, no data leaks."
        metrics={[
          { label: "Cloud Uploads", value: "0 bytes" },
          { label: "Encryption", value: "AES-256" },
          { label: "Auditable", value: "Apache-2.0" },
        ]}
        imageTitle="Hardware Vault & Chromium Airgap Security"
        imagePrompt="Holographic cyber defense shield with glowing cryptographic lock nodes and local client-side memory blocks, clean dark aesthetic, emerald green and electric cyan highlights, 16:9"
      />
    ),
  },
  {
    category: "Mathematical & Algorithmic",
    title: "DeepSeek R1 Reasoning Chains",
    src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop",
    content: (
      <WorkflowModalContent
        heading="Extracting Thought Accordions & Mathematical Proofs"
        description="DeepSeek-R1 generates intricate internal thinking paths and LaTeX derivations. ChatBridge observes these internal reasoning chains and distills the breakthrough realizations into digestible prompts for presentation-layer models like Claude 3.5 Sonnet."
        metrics={[
          { label: "LaTeX Parsing", value: "Native" },
          { label: "CoT Preserved", value: "100%" },
          { label: "Transfer Time", value: "< 20ms" },
        ]}
        imageTitle="Algorithmic Chain-of-Thought Visualization"
        imagePrompt="Complex mathematical graph showing step-by-step chain-of-thought logic trees and LaTeX formulas resolving into an elegant glowing code block, deep purple and violet lighting, 16:9"
      />
    ),
  },
];
