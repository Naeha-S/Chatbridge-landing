"use client";

import React, { useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import {
  IconCode,
  IconBook,
  IconShield,
  IconPencil,
  IconDatabase,
  IconSparkles,
  IconCheck,
  IconArrowRight,
  IconTerminal,
  IconSearch,
  IconLock
} from "@tabler/icons-react";

export default function AppleCardsCarouselDemo() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Workflows", icon: IconSparkles },
    { id: "engineering", label: "Engineering", icon: IconCode },
    { id: "research", label: "Research", icon: IconBook },
    { id: "security", label: "Security", icon: IconShield },
    { id: "writing", label: "Writing", icon: IconPencil },
    { id: "productivity", label: "Productivity", icon: IconDatabase },
  ];

  const filteredData = specializedWorkflowsData.filter((card) => {
    if (activeCategory === "all") return true;
    return card.categorySlug === activeCategory;
  });

  const cards = filteredData.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors">
      {/* Header Container */}
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
        {/* Real-World Use Cases Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            REAL-WORLD USE CASES
          </span>
        </div>

        {/* Specialized Workflows Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-sans">
          Specialized{" "}
          <span className="font-serif italic bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
            Workflows
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Engineered for high-context knowledge work across engineering, research, and technical leadership.
        </p>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20 dark:bg-purple-500/20 dark:text-purple-200 dark:border dark:border-purple-400/50"
                  : "bg-white/80 dark:bg-black/40 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Carousel */}
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

      <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-neutral-200/80 dark:border-white/10 shadow-lg">
        <h4 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-2">
          {heading}
        </h4>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-md border border-neutral-200/70 dark:border-white/10 text-center shadow-xs">
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-1 uppercase tracking-wider">
              {m.label}
            </span>
            <span className="text-xl md:text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Visual Asset Prompt Container */}
      <div className="relative rounded-2xl border border-dashed border-neutral-300 dark:border-white/20 bg-white/60 dark:bg-black/50 backdrop-blur-xl p-6 text-center overflow-hidden shadow-sm">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
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

export const specializedWorkflowsData = [
  {
    category: "</> ENGINEERING",
    categorySlug: "engineering",
    title: "System Architecture Handoff",
    description: "Move between AI tools without losing context, code, or architectural decisions.",
    bullets: [
      "Preserve multi-turn technical context",
      "Maintain code, diagrams and decisions",
      "Seamless handoff across AI platforms"
    ],
    src: "/assets/images/architecture_handoff_ui_1790153923496.jpg",
    previewType: "code",
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
    category: "📖 RESEARCH",
    categorySlug: "research",
    title: "Literature & Research Synthesis",
    description: "Work with large document sets and extract insights across multiple sources.",
    bullets: [
      "Handle 1M+ token research contexts",
      "Cross-document reasoning",
      "Structured notes and citations"
    ],
    src: "/assets/images/research_synthesis_ui_1790153937913.jpg",
    previewType: "graph",
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
    category: "</> DEBUGGING",
    categorySlug: "engineering",
    title: "Multi-Turn Stacktrace Continuity",
    description: "Keep the full debugging context across multi-file, multi-turn troubleshooting.",
    bullets: [
      "Track errors, logs and stacktraces",
      "Maintain-context across iterations",
      "Faster, targeted solutions"
    ],
    src: "/assets/images/debugging_workflow_ui_1790153887982.jpg",
    previewType: "error",
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
    category: "🛡️ SECURITY",
    categorySlug: "security",
    title: "Enterprise-Ready Security",
    description: "Work with sensitive information with complete privacy and local encryption.",
    bullets: [
      "End-to-end local encryption",
      "Privacy-first architecture",
      "Non-extractable hardware keys"
    ],
    src: "/assets/images/privacy_workflow_ui_1790153898304.jpg",
    previewType: "security",
    content: (
      <WorkflowModalContent
        heading="Built for Your Privacy • Local Hardware Airgap"
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
    category: "✏️ WRITING",
    categorySlug: "writing",
    title: "Voice & Tone Handoff",
    description: "Carry active tone guidelines and target persona constraints across drafts.",
    bullets: [
      "Preserve target persona & voice",
      "Zero re-explaining background",
      "Consistent executive brand polish"
    ],
    src: "/assets/images/architecture_handoff_ui_1790153923496.jpg",
    previewType: "writing",
    content: (
      <WorkflowModalContent
        heading="Tone & Persona Consistency Across Models"
        description="Draft blog posts or product announcements in ChatGPT, then transition seamlessly to Claude 3.7 to polish the hook and voice without losing your brand style guide or target audience constraints."
        metrics={[
          { label: "Tone Accuracy", value: "100%" },
          { label: "Time Saved", value: "~8 mins" },
          { label: "Local Vault", value: "Encrypted" },
        ]}
        imageTitle="Voice & Tone Handoff Workflow"
        imagePrompt="Vertical 9:16 dark mode UI poster for ChatBridge showing editorial tone polish handoff between ChatGPT and Claude 3.7 with audience persona constraints preserved. Sleek glassmorphism UI, 9:16"
        imageSrc="/assets/images/architecture_handoff_ui_1790153923496.jpg"
      />
    ),
  },
  {
    category: "🛢️ PRODUCTIVITY",
    categorySlug: "productivity",
    title: "Cross-Model Multi-Tooling",
    description: "Harness the unique strengths of every LLM without losing overall project state.",
    bullets: [
      "Brainstorm in ChatGPT 4o",
      "Implement code in Claude 3.7",
      "Fact-check in Google Gemini 2.0"
    ],
    src: "/assets/images/research_synthesis_ui_1790153937913.jpg",
    previewType: "pipeline",
    content: (
      <WorkflowModalContent
        heading="Cross-Assistant Multi-Tooling Pipeline"
        description="Brainstorm architectures in ChatGPT, build complex TypeScript components in Claude 3.7, and ground facts in live Google Gemini search without ever losing the big picture."
        metrics={[
          { label: "Cross-Model", value: "6+ LLMs" },
          { label: "Handoff", value: "0.1s" },
          { label: "Token Drift", value: "0%" },
        ]}
        imageTitle="Cross-Model Multi-Tooling Pipeline"
        imagePrompt="Vertical 9:16 dark mode UI poster for ChatBridge showing multi-assistant pipeline bridging ChatGPT, Claude, and Gemini with zero token drift. Glassmorphism, 9:16"
        imageSrc="/assets/images/research_synthesis_ui_1790153937913.jpg"
      />
    ),
  },
];
