import { BenchmarkData, DemoScenario, GuideArticle, FAQItem, PlatformSupportItem } from '../types';

export const BENCHMARKS: BenchmarkData[] = [
  {
    dataset: 'LongMemEval-S',
    description: 'Long-horizon conversational retrieval across realistic synthetic multi-session developer and research dialogues.',
    denseOnly: 72.9,
    hybridRRF: 76.8,
    gain: 3.9,
    metric: 'Recall@5',
    qualification: 'Hybrid retrieval achieved 76.8% Recall@5 on LongMemEval-S in our reported evaluation (+3.9 percentage points over dense-only).'
  },
  {
    dataset: 'LoCoMo10',
    description: 'Challenging 10-turn multi-persona evaluation benchmark with high lexical overlap and distracting cross-topic tangents.',
    denseOnly: 25.9,
    hybridRRF: 29.7,
    gain: 3.8,
    metric: 'Recall@5',
    qualification: 'Hybrid retrieval achieved 29.7% Recall@5 on LoCoMo10 in our reported evaluation (+3.8 percentage points over dense-only).'
  }
];

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'code-refactor',
    name: 'Distributed Cache Architecture',
    description: 'Designing an in-memory cache in ChatGPT, then continuing the implementation & edge cases in Claude.',
    steps: [
      {
        stepNumber: 1,
        title: 'Initial Architectural Decisions in ChatGPT',
        subtitle: 'You design an LRU eviction strategy with multi-threaded sharding.',
        platform: 'chatgpt',
        userMessage: 'We need a Redis-compatible LRU cache in Go with 16 striped locks, 64-byte aligned bucket heads, and background tombstone cleaning.',
        aiMessage: 'Here is the high-level struct design: use `sync.RWMutex` array with FNV-1a hash distribution. We should reserve 4MB per shard and use atomic counters for fast hit-ratio metrics.'
      },
      {
        stepNumber: 2,
        title: 'ChatBridge Background Capture',
        subtitle: 'Zero-effort background capture with 3-Tier DOM Resilience & local AES-256-GCM encryption.',
        platform: 'chatbridge',
        bridgeAction: 'Normalized 2 turns into 1 memory chunk • Extracted keywords: [LRU, Go, 16 striped locks, FNV-1a, tombstone cleaning] • Encrypted locally in chrome.storage.local.'
      },
      {
        stepNumber: 3,
        title: 'Switching to Claude for Code Implementation',
        subtitle: 'Normally, Claude would ask you to re-paste or re-explain the architectural choices.',
        platform: 'claude',
        userMessage: 'Now write the concurrency-safe `GetOrSet` method handling stampede protection.',
        aiMessage: 'Could you share the shard hashing structure and lock granularity you planned to use?'
      },
      {
        stepNumber: 4,
        title: 'ChatBridge Hybrid Retrieval',
        subtitle: 'Combining dense embedding similarity + BM25 keyword matching via Reciprocal Rank Fusion.',
        platform: 'chatbridge',
        retrievedContext: [
          {
            source: 'ChatGPT (Turn 2, 8m ago)',
            topic: 'Go LRU Cache Sharding & Locking Spec',
            snippet: '16 striped locks with FNV-1a hash distribution, 64-byte bucket alignment, atomic hit-ratio metrics.',
            score: 'RRF Score: 0.0321 (Rank #1 Dense, Rank #1 Lexical)'
          },
          {
            source: 'ChatGPT (Turn 1, 12m ago)',
            topic: 'Tombstone cleaning & eviction constraints',
            snippet: 'Background goroutine for sweeping expired TTL slots without blocking reader locks.',
            score: 'RRF Score: 0.0284 (Rank #2 Dense, Rank #3 Lexical)'
          }
        ]
      },
      {
        stepNumber: 5,
        title: 'Seamless Continuity in Claude',
        subtitle: 'ChatBridge attaches minimal, high-density context into the prompt. Zero re-explaining.',
        platform: 'claude',
        userMessage: '⚡ Context injected via ChatBridge: [Sharding: 16 striped RWMutex, FNV-1a, 64B aligned] \nWrite the concurrency-safe `GetOrSet` method with singleflight stampede suppression.',
        aiMessage: 'Understood. Using your 16-shard FNV-1a scheme with the `sync.RWMutex` array, here is the complete `GetOrSet` method incorporating `golang.org/x/sync/singleflight` to prevent cache stampedes...'
      }
    ]
  },
  {
    id: 'research-synthesis',
    name: 'Literature Review to Gemini Multimodal',
    description: 'Formulating benchmark methodologies in ChatGPT, then porting context to Gemini for chart generation.',
    steps: [
      {
        stepNumber: 1,
        title: 'Methodology Discussion in ChatGPT',
        subtitle: 'Defining evaluation metrics for semantic retrieval.',
        platform: 'chatgpt',
        userMessage: 'For our conversational retrieval benchmark, we will use Recall@5 on LongMemEval-S and measure CPU latency per 5,000 turns.',
        aiMessage: 'Agreed. Recall@5 accurately measures whether the true conversational turn appears in the top five ranked candidate passages.'
      },
      {
        stepNumber: 2,
        title: 'ChatBridge Normalization Hook',
        subtitle: 'Content parsed from ChatGPT DOM and organized in local index.',
        platform: 'chatbridge',
        bridgeAction: 'Indexed 1 dialogue unit • Stored vector embedding in browser memory buffer • Zero telemetry sent.'
      },
      {
        stepNumber: 3,
        title: 'Navigating to Gemini',
        subtitle: 'Starting a new session to format scientific data tables and graphics.',
        platform: 'gemini',
        userMessage: 'Generate an SVG diagram showing our benchmark comparison.',
        aiMessage: 'Please provide the exact baseline numbers and dataset names you want depicted in the graph.'
      },
      {
        stepNumber: 4,
        title: 'ChatBridge Fast Context Injection',
        subtitle: '15ms vector scan finds the exact benchmark metrics.',
        platform: 'chatbridge',
        retrievedContext: [
          {
            source: 'ChatGPT (Turn 1, 4m ago)',
            topic: 'Benchmark metrics: LongMemEval-S & LoCoMo10',
            snippet: 'LongMemEval-S Recall@5 (72.9% vs 76.8%), LoCoMo10 (25.9% vs 29.7%), ~15-30ms vector scoring.',
            score: 'RRF Score: 0.0330 (Rank #1 Lexical, Rank #1 Dense)'
          }
        ]
      },
      {
        stepNumber: 5,
        title: 'Gemini Instant Execution',
        subtitle: 'Gemini receives the exact metrics and generates the publication-ready visualization.',
        platform: 'gemini',
        userMessage: '⚡ Attached prior context: [LongMemEval-S 72.9% -> 76.8%, LoCoMo10 25.9% -> 29.7%] \nGenerate the SVG comparison chart.',
        aiMessage: 'Here is the SVG code formatted with both datasets clearly contrasting Dense Only against Hybrid RRF with accurate percentage-point callouts.'
      }
    ]
  }
];

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: 'chatgpt-to-claude',
    title: 'ChatGPT to Claude: How to Carry Your Context Forward Without Re-explaining',
    subtitle: 'Why cross-platform workflows break down and how browser-native continuity bridges the gap.',
    readTime: '4 min read',
    category: 'Workflows',
    date: 'March 2025',
    summary: 'A step-by-step guide to moving complex technical reasoning, code architectures, and decisions from ChatGPT into Claude 3.7 without manually summarizing or copying endless chat transcripts.',
    content: [
      {
        heading: 'The Cross-Tool Workflow Dilemma',
        body: [
          'Modern software engineers and researchers rarely use just one AI assistant. ChatGPT is exceptional for initial brainstorming and rapid prototyping, while Claude excels at deep code refactoring, complex logic auditing, and nuanced architectural reviews.',
          'However, the moment you switch from chatgpt.com to claude.ai, you encounter a sudden context blackout. Claude has zero awareness of what you discussed five minutes ago in ChatGPT.'
        ]
      },
      {
        heading: 'The Cost of Manual Context Rebuilding',
        body: [
          'Until now, users had two unappealing options: either dump the entire raw chat history into Claude (wasting precious context window tokens and confusing the model with irrelevant intermediate thoughts), or spend 5 minutes drafting a manual summary.',
          'ChatBridge solves this by hooking into the browser environment. As you converse with ChatGPT, ChatBridge parses meaningful turns, indexes them with AES-256-GCM encrypted local storage, and lets you summon the exact context inside Claude with a single keystroke.'
        ],
        callout: 'Rule of thumb: Never paste raw HTML or full conversational logs into an LLM. Inject only the specific decisions and constraints identified via hybrid retrieval.'
      },
      {
        heading: 'How ChatBridge Transfers Context in 3 Seconds',
        body: [
          '1. In ChatGPT, conclude your discussion on your data structures or system constraints.',
          '2. Open Claude. Click the ChatBridge extension icon or use the keyboard shortcut (Cmd+Shift+K / Ctrl+Shift+K).',
          '3. ChatBridge runs a local Hybrid RRF retrieval over your recent turns and suggests relevant context cards.',
          '4. Click "Inject Context": ChatBridge inserts a clean, platform-neutral summary directly into Claude\'s input box.'
        ]
      }
    ]
  },
  {
    slug: 'chatgpt-to-gemini',
    title: 'ChatGPT to Gemini: Moving Ideas from Brainstorm to Multimodal Execution',
    subtitle: 'Preserving research decisions and notes when transitioning to Gemini 2.0 & Workspace.',
    readTime: '5 min read',
    category: 'Workflows',
    date: 'March 2025',
    summary: 'Discover how to migrate multi-turn ideation from ChatGPT directly into Gemini for multimodal analysis, doc generation, and high-speed execution.',
    content: [
      {
        heading: 'Leveraging Gemini Without Starting From Scratch',
        body: [
          'Google Gemini offers massive context windows, multimodal grounding, and tight integration with Google Docs and Drive. When transitioning an ongoing product spec from ChatGPT into Gemini, preserving key requirements is crucial.',
          'ChatBridge acts as a local bridge that preserves your prompt history in your browser storage, allowing Gemini to pick up right where ChatGPT left off.'
        ]
      },
      {
        heading: 'Overcoming Web Interface Selector Shifts',
        body: [
          'Both ChatGPT and Gemini frequently update their web frontend layouts, breaking standard web scrapers. ChatBridge uses a 3-Tier DOM Resilience system:',
          '1. Primary CSS selectors targeting standard conversation containers.',
          '2. Generic ARIA role and semantic heuristics (`role="presentation"`, `article`, `role="log"`).',
          '3. MutationObserver streaming fallbacks that track node insertions in real time.'
        ],
        callout: 'This resilience ensures context capture remains uninterrupted even during major frontend redesigns by AI providers.'
      }
    ]
  },
  {
    slug: 'ai-conversation-memory',
    title: 'What Is AI Conversation Memory? Beyond Cloud Lock-In',
    subtitle: 'Why user-controlled, cross-platform memory is the missing layer in conversational computing.',
    readTime: '6 min read',
    category: 'Concepts',
    date: 'February 2025',
    summary: 'An exploration of vendor-locked memory features versus decentralized, client-side conversational archives that you own and carry anywhere.',
    content: [
      {
        heading: 'The Walled Garden Problem in AI Memory',
        body: [
          'Major AI vendors have introduced "Memory" features. While helpful, these systems suffer from a fatal flaw: they only remember what you tell them within their proprietary walls.',
          'If you tell ChatGPT that you are building a Rust backend with Postgres, Claude will not know. If you inform Claude about your company\'s API deprecation timeline, Gemini will suggest using the deprecated endpoint.'
        ]
      },
      {
        heading: 'The Case for Browser-Native Memory',
        body: [
          'Your web browser is the universal common denominator. You run ChatGPT in one tab, Claude in another, and Gemini in a third. By placing the memory layer inside the browser itself, you achieve genuine cross-platform interoperability.',
          'Your memory travels with your browser, not with an AI vendor\'s marketing incentives.'
        ]
      }
    ]
  },
  {
    slug: 'local-ai-memory',
    title: 'What Does "Local-First AI" Actually Mean?',
    subtitle: 'Examining client-side encryption, local vectors, and honest threat modeling.',
    readTime: '5 min read',
    category: 'Privacy',
    date: 'February 2025',
    summary: 'A deep dive into ChatBridge\'s privacy architecture: why conversations never touch third-party servers, how AES-256-GCM is applied in chrome.storage.local, and what our threat model explicitly excludes.',
    content: [
      {
        heading: 'Defining Local-First for AI Context',
        body: [
          'A tool is "local-first" only if its core operations (capture, indexing, encryption, search, and storage) execute entirely on the user\'s hardware without relying on a remote API server.',
          'ChatBridge stores every conversation turn in `chrome.storage.local`. All search operations (both BM25 tokenization and linear vector scoring) run within the Chrome background service worker on your CPU.'
        ]
      },
      {
        heading: 'Our Transparent Threat Model',
        body: [
          'We believe in honest, jargon-free security disclosures. Our architecture specifically handles:',
          '• Remote prompt adversaries: Protected. Your chat archive is never transmitted to ChatBridge servers or analytics pipelines.',
          '• Local opportunistic snooping: Protected. Records stored in local disk cache are encrypted with AES-256-GCM.',
          '• Privileged Root / OS Malicious Actors: Explicitly out of scope. If malware has root access to your machine or browser memory space, no browser extension can guarantee isolation. We do not make false promises.'
        ]
      }
    ]
  },
  {
    slug: 'hybrid-retrieval-rrf',
    title: 'How ChatBridge Uses Reciprocal Rank Fusion (RRF)',
    subtitle: 'Why combining lexical search with dense embeddings delivers a +3.9pp boost in conversational recall.',
    readTime: '7 min read',
    category: 'Engineering',
    date: 'January 2025',
    summary: 'The mathematical rationale behind hybrid local conversational retrieval and our benchmark evaluation results on LongMemEval-S and LoCoMo10.',
    content: [
      {
        heading: 'Why Dense Vector Search Alone Is Not Enough',
        body: [
          'Dense semantic embeddings are great at finding general topical matches, but they frequently fail on precise conversational anchors—such as specific function names, ticket numbers, or uncommon error codes (`ERR_CONN_RESET_0x4F`).',
          'Conversely, pure lexical keyword matching (BM25) fails when the user paraphrases their prior thoughts or changes terminology.'
        ]
      },
      {
        heading: 'The Reciprocal Rank Fusion Formula',
        body: [
          'Reciprocal Rank Fusion (RRF) solves this by combining ordinal rankings rather than raw uncalibrated similarity scores. For any candidate turn d:',
          'RRF(d) = 1 / (60 + Rank_dense(d)) + 1 / (60 + Rank_lexical(d))',
          'In our empirical benchmarks, this achieved 76.8% Recall@5 on LongMemEval-S (vs 72.9% for dense alone) and 29.7% on LoCoMo10 (vs 25.9% for dense alone).'
        ],
        callout: 'Recall@5 measures the percentage of test queries where the ground-truth conversational turn appears within the top 5 retrieved candidates.'
      }
    ]
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'General',
    question: 'What is ChatBridge in simple terms?',
    answer: 'ChatBridge is a browser extension that acts as a shared memory layer between ChatGPT, Claude, and Gemini. When you switch tools, you can recall and inject relevant context from past chats with one click instead of re-explaining yourself.'
  },
  {
    category: 'Privacy',
    question: 'Do my conversations ever get sent to ChatBridge servers?',
    answer: 'No. ChatBridge does not operate a remote database or logging backend. All conversation turns and search indexes are stored locally in your browser’s encrypted `chrome.storage.local`. The only text sent to an AI is what you explicitly choose to inject into your prompt.'
  },
  {
    category: 'Technical',
    question: 'What does 76.8% Recall@5 actually mean?',
    answer: 'Recall@5 is a standard information retrieval metric. It means that across our reported benchmark evaluations on the LongMemEval-S dataset, the single correct past conversation turn appeared within the top 5 retrieved results in 76.8% of queries. It does not mean ChatBridge answers 76.8% of questions correctly.'
  },
  {
    category: 'Technical',
    question: 'How fast is local retrieval for a large chat history?',
    answer: 'Under reported test conditions on modern desktop CPUs, brute-force linear vector scoring across an archive of ~5,000 conversational turns takes approximately 15 to 30 ms in the background service worker.'
  },
  {
    category: 'Compatibility',
    question: 'Which AI platforms are officially supported vs unsupported?',
    answer: 'ChatGPT (chatgpt.com), Claude (claude.ai), and Google Gemini (gemini.google.com) are fully supported and verified on Chrome, Brave, and Edge. Microsoft Copilot, DeepSeek Chat, Perplexity AI, and Mistral Le Chat have limited beta support currently in testing. Standalone desktop apps (Cursor, Windsurf, Claude desktop), mobile apps, and CLI agents are currently unsupported.'
  },
  {
    category: 'Compatibility',
    question: 'Why are native desktop apps like Cursor and Claude Desktop unsupported?',
    answer: 'ChatBridge is a browser extension built on the Manifest V3 Web Extensions standard. Sandboxed browser extensions are barred by the operating system from reading or injecting memory into out-of-browser desktop executables without a separate native daemon. We are actively exploring an open-source local companion daemon for v0.6.'
  },
  {
    category: 'Compatibility',
    question: 'What happens when OpenAI or Anthropic updates their website layout?',
    answer: 'ChatBridge uses 3-Tier DOM Resilience: first trying primary CSS selectors, falling back to universal semantic ARIA roles (`article`, `role="log"`), and lastly using streaming MutationObservers to capture dynamic streaming responses.'
  },
  {
    category: 'Compatibility',
    question: 'Does ChatBridge work on mobile devices?',
    answer: 'No. Chrome for Android and Safari on iOS do not support desktop Chrome Web Store extensions. ChatBridge requires a desktop Chromium browser (Google Chrome, Brave, Microsoft Edge, or Arc on macOS, Windows, or Linux).'
  }
];

export const PLATFORM_SUPPORT_LIST: PlatformSupportItem[] = [
  {
    name: 'OpenAI ChatGPT',
    domain: 'chatgpt.com',
    category: 'Web LLM',
    status: 'supported',
    statusLabel: 'Fully Supported (Stable v0.4)',
    details: 'Full automated DOM observation, 3-tier selector tracking, streaming turn capture, and active keyboard prompt injection hook.',
    mitigationOrAlternative: 'Works on free and Plus accounts across Chrome, Brave, and Edge.'
  },
  {
    name: 'Anthropic Claude',
    domain: 'claude.ai',
    category: 'Web LLM',
    status: 'supported',
    statusLabel: 'Fully Supported (Stable v0.4)',
    details: 'Supports Claude 3.5 Sonnet, 3.7 Sonnet, and Opus web chats. Handles Artifact previews and multi-file code blocks seamlessly.',
    mitigationOrAlternative: 'Standard web interface with automated context injection pill.'
  },
  {
    name: 'Google Gemini',
    domain: 'gemini.google.com',
    category: 'Web LLM',
    status: 'supported',
    statusLabel: 'Fully Supported (Stable v0.4)',
    details: 'Captures Google DeepMind web interface turns, reasoning traces, and formatting. Injects continuity tokens directly into the rich text box.',
    mitigationOrAlternative: 'Supports standard Google account web interface.'
  },
  {
    name: 'Microsoft Copilot',
    domain: 'copilot.microsoft.com',
    category: 'Web LLM',
    status: 'testing',
    statusLabel: 'In Testing (Beta)',
    details: 'Turn capture is functional. Web-grounded citation bubbles occasionally inject extraneous footnotes into raw memory turns.',
    mitigationOrAlternative: 'Filter out footnote citations before injecting into Claude or ChatGPT.'
  },
  {
    name: 'DeepSeek Chat',
    domain: 'chat.deepseek.com',
    category: 'Web LLM',
    status: 'testing',
    statusLabel: 'In Testing (Beta)',
    details: 'Context extraction and deep-thought reasoning capture works. Automated prompt insertion occasionally requires manual focus click on high DPI screens.',
    mitigationOrAlternative: 'Extension popup "Copy to Clipboard" fallback works reliably if auto-injection fails.'
  },
  {
    name: 'Perplexity AI',
    domain: 'perplexity.ai',
    category: 'Search / Synthesis',
    status: 'testing',
    statusLabel: 'In Testing (Beta)',
    details: 'Captures synthesis answers; web reference numbers ([1], [2]) are normalized into plain text citations. Complex Pro Search threads under testing.',
    mitigationOrAlternative: 'Works in beta branch; full citation link mapping scheduled for v0.5 release.'
  },
  {
    name: 'Mistral Le Chat',
    domain: 'chat.mistral.ai',
    category: 'Web LLM',
    status: 'testing',
    statusLabel: 'In Testing (Beta)',
    details: 'DOM tracking operational in preview builds. Token budget estimation is currently being calibrated for large Mistral Large context dialogues.',
    mitigationOrAlternative: 'Available in developer preview via extension experimental flags.'
  },
  {
    name: 'Native Desktop Apps (Cursor, Windsurf, Claude Desktop, ChatGPT App)',
    domain: 'Desktop Executables',
    category: 'Desktop IDE & Apps',
    status: 'unsupported',
    statusLabel: 'Unsupported (Out of Scope)',
    details: 'Sandboxed browser extensions are barred by the operating system from inspecting or injecting into external native desktop processes.',
    mitigationOrAlternative: 'Planned v0.6 companion daemon / VS Code extension bridge. Currently use Web versions or clipboard export.'
  },
  {
    name: 'Mobile AI Apps (iOS / Android ChatGPT, Claude, Gemini)',
    domain: 'iOS & Android Apps',
    category: 'Mobile Applications',
    status: 'unsupported',
    statusLabel: 'Unsupported (Out of Scope)',
    details: 'Neither Google Chrome for Android nor Apple Mobile Safari support desktop Manifest V3 background extensions with content script injection.',
    mitigationOrAlternative: 'Use ChatBridge on Chromium desktop browsers (Chrome, Brave, Edge, Arc on macOS/Windows/Linux).'
  },
  {
    name: 'Terminal & CLI Agents (Aider, Claude Code, Ollama CLI)',
    domain: 'CLI / Terminal',
    category: 'Developer CLI',
    status: 'unsupported',
    statusLabel: 'Unsupported (Out of Scope)',
    details: 'Terminal commands do not emit HTML DOM nodes. ChatBridge does not inspect bash histories or standard input/output streams.',
    mitigationOrAlternative: 'Export memory JSON via ChatBridge settings to pipe directly into CLI tools.'
  },
  {
    name: 'Realtime Audio & Advanced Voice Mode',
    domain: 'WebRTC / Audio Streams',
    category: 'Voice Streams',
    status: 'unsupported',
    statusLabel: 'Unsupported (Out of Scope)',
    details: 'Transient voice packets streamed via WebRTC are not rendered into conversational text DOM turns, preventing lexical indexing.',
    mitigationOrAlternative: 'Supported once voice transcriptions are officially converted into standard web text turns by the platform.'
  }
];

