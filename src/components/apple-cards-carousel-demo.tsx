"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  // Duplicate specialized workflows data to enable seamless continuous looping
  const duplicatedWorkflows = [...specializedWorkflowsData, ...specializedWorkflowsData];

  const cards = duplicatedWorkflows.map((card, index) => (
    <Card key={`${card.title}-${index}`} card={card} index={index} />
  ));

  return (
    <section className="w-full py-10 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-4">
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
  imageSrc,
}: {
  heading: string;
  description: string;
  metrics: { label: string; value: string }[];
  imageTitle: string;
  imagePrompt: string;
  imageSrc?: string;
}) => {
  return (
    <div className="space-y-6">
      {/* Full High-Resolution Visual Poster */}
      {imageSrc && (
        <div className="relative rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-white/10 shadow-xl max-h-[480px] bg-black/60 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={imageTitle}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[480px] object-contain mx-auto"
          />
        </div>
      )}

      <div className="bg-white/70 dark:bg-black/60 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-neutral-200/80 dark:border-white/10 shadow-lg">
        <h4 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-2">
          {heading}
        </h4>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white/70 dark:bg-black/40 backdrop-blur-md border border-neutral-200/70 dark:border-white/10 text-center shadow-xs">
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wider">
              {m.label}
            </span>
            <span className="text-xl md:text-2xl font-bold font-mono text-[#2997FF]">
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Visual Asset Prompt Container */}
      <div className="relative rounded-2xl border border-dashed border-neutral-300 dark:border-white/20 bg-white/60 dark:bg-black/50 backdrop-blur-xl p-6 text-center overflow-hidden shadow-sm">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-[#2997FF] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#2997FF] animate-pulse" />
            <span>Workflow Visual Asset</span>
          </div>
          <h5 className="font-semibold text-neutral-900 dark:text-white text-base">
            {imageTitle}
          </h5>
          <div className="p-4 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-neutral-200/80 dark:border-white/10 text-left shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Generation Prompt
            </span>
            <p className="text-xs font-mono text-neutral-700 dark:text-neutral-300 leading-relaxed select-all">
              "{imagePrompt}"
            </p>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Aspect Ratio: 9:16 • Native high-resolution glassmorphism UI poster
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
    src: "/assets/images/architecture_handoff_ui_1790153923496.jpg",
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
        imagePrompt="Vertical 9:16 dark mode UI poster for ChatBridge with headline 'System Architecture Handoff. Spec & Diff Continuity across Models.' Shows top window with OpenAI o1 distributed system database schema and SQL/TypeScript contract interfaces. Glowing neon connection line bridging downward labeled 'Instant Context Bridge 18ms'. Lower window shows Claude Artifacts tab with auto-generated responsive React Tailwind component code implementing the schema, with green status pill 'Zero Token Drift' and purple CTA button 'Handoff to Claude'. Dark glassmorphism, 9:16"
        imageSrc="/assets/images/architecture_handoff_ui_1790153923496.jpg"
      />
    ),
  },
  {
    category: "Deep Debugging",
    title: "Multi-Turn Stacktrace Continuity",
    src: "/assets/images/debugging_workflow_ui_1790153887982.jpg",
    content: (
      <WorkflowModalContent
        heading="Preserving Exact Variable Names & Compiler Logs"
        description="Standard vector databases lose crucial identifiers like memory addresses and variable names. ChatBridge combines BM25 keyword matching with dense embeddings, ensuring exact compiler diagnostics and lockfile hashes survive the cross-model journey."
        metrics={[
          { label: "Lexical Accuracy", value: "99.4%" },
          { label: "LongMemEval", value: "76.8%" },
          { label: "Key Size", value: "256-bit" },
        ]}
        imageTitle="Turn Errors Into Progress"
        imagePrompt="Vertical 9:16 high-end UI poster for ChatBridge with headline 'Turn Errors Into Progress'. Top has VS Code style dark IDE editor window with tabs 'main.rs' and 'api.ts'. Editor displays Rust function `fn binary_search(arr: &[i32], target: i32) -> usize` with red breakpoint on line 3 and bright red error callout box `error[E0308]: mismatched types expected usize found i32 --> src/main.rs:3:23`. Below editor is a purple glowing arrow pointing down labeled 'CAPTURE TO CHATBRIDGE'. Lower half displays dark glass ChatBridge card with green badge 'Context Saved' and headline 'Debugging Context Captured'. List of 4 items: 'Rust Compiler Error', 'Relevant Code main.rs', 'Your Previous Attempts 3 messages', and 'Suggested Next Steps'. Bottom has full-width gradient purple-blue button 'Continue in Any AI: Same context. Further progress.'. Sleek dark mode glassmorphism developer UI, 9:16"
        imageSrc="/assets/images/debugging_workflow_ui_1790153887982.jpg"
      />
    ),
  },
  {
    category: "Literature & Research",
    title: "1M+ Token Academic Synthesis",
    src: "/assets/images/research_synthesis_ui_1790153937913.jpg",
    content: (
      <WorkflowModalContent
        heading="Google Gemini 2.0 Large-Window Grounding"
        description="Take sprawling brainstorms and literature citations from ChatGPT or Perplexity and expand them effortlessly into Gemini's massive 1M+ token window. Ground your arguments with live Google Search citations while preserving early conversational premises."
        metrics={[
          { label: "Context Window", value: "1M+ Tokens" },
          { label: "Search Grounding", value: "Live" },
          { label: "Export Speed", value: "< 25ms" },
        ]}
        imageTitle="1M+ Academic Synthesis Knowledge Graph"
        imagePrompt="Vertical 9:16 dark mode UI poster for ChatBridge with headline '1M+ Academic Synthesis. Large-Window Grounding.' Center features a luminous 3D knowledge graph with nodes representing arXiv research papers, LaTeX equations, and live Google Search grounding citations. A floating dark glass card displays active research synthesis with Perplexity research notes expanding into Gemini 2.0 1M token context. Elegant gold and cyan neon accents, futuristic data visualization, 9:16"
        imageSrc="/assets/images/research_synthesis_ui_1790153937913.jpg"
      />
    ),
  },
  {
    category: "Enterprise Security",
    title: "Zero-Telemetry Compliance",
    src: "/assets/images/privacy_workflow_ui_1790153898304.jpg",
    content: (
      <WorkflowModalContent
        heading="Built for Your Privacy • Local Hardware AES-256 Airgap"
        description="For legal teams, financial analysts, and corporate engineers handling sensitive NDA-protected discussions. Transcripts are encrypted locally using the WebCrypto API with extractable=false. No cloud databases, no tracking analytics, no data leaks."
        metrics={[
          { label: "Cloud Uploads", value: "0 bytes" },
          { label: "Encryption", value: "AES-256" },
          { label: "Auditable", value: "Apache-2.0" },
        ]}
        imageTitle="Built for Your Privacy • Hardware Vault"
        imagePrompt="Vertical 9:16 dark mode UI poster for ChatBridge with headline 'Built for Your Privacy. Powerful AI workflows. Zero telemetry by default.' Right side features crossed-out cloud icon with text 'No Cloud. No Tracking. No Analytics. Ever.' Left side has vertical stack of 4 green icons and badges: 'End-to-end local encryption AES-256-GCM', 'Stays on your device Nothing leaves your PC', 'Non-extractable hardware key OS keystore', 'You're in control Capture. Store. Retrieve. Delete.' In center is an angled dark laptop displaying ChatBridge desktop UI with a glowing 3D holographic green glass shield padlock hovering above glowing tiered glass blocks labeled ENCRYPT, STORE, RETRIEVE. Premium dark studio lighting, matte black desk, sleek notebook, 9:16"
        imageSrc="/assets/images/privacy_workflow_ui_1790153898304.jpg"
      />
    ),
  },
  {
    category: "Mathematical & Algorithmic",
    title: "DeepSeek R1 Reasoning Chains",
    src: "/assets/images/deepseek_reasoning_ui_1790153911430.jpg",
    content: (
      <WorkflowModalContent
        heading="Deeper Reasoning, Clearer Answers"
        description="DeepSeek-R1 generates intricate internal thinking paths and LaTeX derivations. ChatBridge observes these internal reasoning chains and distills the breakthrough realizations into digestible prompts for presentation-layer models like Claude 3.5 Sonnet."
        metrics={[
          { label: "LaTeX Parsing", value: "Native" },
          { label: "CoT Preserved", value: "100%" },
          { label: "Transfer Time", value: "< 20ms" },
        ]}
        imageTitle="Deeper Reasoning, Clearer Answers"
        imagePrompt="Vertical 9:16 dark mode UI poster for ChatBridge with headline 'Deeper Reasoning, Clearer Answers. Capture and continue complex chains of thought across models.' Top right has sleek badge 'DeepSeek R1 Chain-of-Thought Reasoning' with Claude, GPT-4o, and Gemini tabs below. Left side displays structured reasoning cards connected by glowing blue-violet lines: 'Problem: Find shortest path in weighted graph using Dijkstra', '1. Understand', '2. Plan', '3. Reason Step-by-Step' with a glowing node graph (nodes A, B, C, D, E with weighted edges), mathematical formulas d[v]=min(d[v], d[u]+w(u,v)), '4. Verify', '5. Final Answer'. Right side has 'Reasoning Chain' step-by-step checklist (Steps 1 to 6) and glowing code block 'Shortest path: A -> B -> D -> E, Total cost: 7' with clean Python Dijkstra heapq implementation. High-fidelity glassmorphism, 9:16"
        imageSrc="/assets/images/deepseek_reasoning_ui_1790153911430.jpg"
      />
    ),
  },
];
