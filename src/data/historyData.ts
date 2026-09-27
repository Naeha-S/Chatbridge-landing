import { SavedContextSegment } from '../types';

export const INITIAL_CONTEXT_SEGMENTS: SavedContextSegment[] = [
  {
    id: 'ctx-101',
    title: 'Redis Caching & Invalidation Architecture',
    originModel: 'ChatGPT',
    category: 'architecture',
    tags: ['Redis', 'Caching', 'Architecture', 'TypeScript'],
    rawTranscript: `User: How should we structure our caching layer for high-throughput API endpoints to prevent cache stampedes?
ChatGPT: I recommend a Redis cluster with probabilistic early expiration (XFetch algorithm). Store JSON payloads compressed with zstandard. Set TTL to 300s with ±30s jitter. For invalidation, maintain a tag-based secondary set so you can purge all user:* or org:* keys simultaneously.

User: Let's lock in this architecture. We will hand this over to Claude to write the TypeScript connection pool wrapper.`,
    summary: 'Distributed caching using Redis clusters, LRU eviction policies, and XFetch probabilistic early expiration to eliminate cache stampedes.',
    compressedContextPill: `[ChatBridge Context • Redis Caching]
Architecture: Redis 7.2 cluster with sentinel failover
Eviction: volatile-lru, TTL=300s with ±30s jitter
Stampede Guard: XFetch probabilistic early expiration (beta=1.0)
Tag Sets: tag:user:{id} & tag:org:{id} for bulk invalidation
Target Model Goal: Write TypeScript connection pool wrapper with auto-reconnect.`,
    originalTokens: 2420,
    compressedTokens: 118,
    timestamp: '12 mins ago',
    isPinned: true,
    rrfScore: 0.0384,
    extractedVariables: [
      { key: 'engine', value: 'Redis 7.2 Cluster' },
      { key: 'eviction', value: 'volatile-lru' },
      { key: 'ttl', value: '300s (with jitter)' },
      { key: 'stampede_guard', value: 'XFetch (beta=1.0)' }
    ],
    suggestedPrompt: 'Here is our Redis caching architecture from our earlier ChatGPT discussion. Write the production TypeScript RedisPool wrapper implementing the XFetch probabilistic early expiration algorithm:'
  },
  {
    id: 'ctx-102',
    title: 'Next.js 15 Edge Auth & Session Guard',
    originModel: 'Claude',
    category: 'coding',
    tags: ['Next.js', 'Auth', 'JWT', 'Security'],
    rawTranscript: `User: We need stateless edge authentication middleware for Next.js 15 App Router that validates JWTs without database roundtrips.
Claude: Use the JOSE library with HS256 or RS256 inside Next.js edge middleware. Store the signed token in an HttpOnly, Secure, SameSite=Lax cookie. Protect /dashboard and /admin routes. If valid, set x-user-id and x-user-role request headers so Server Components can read auth context with zero overhead.`,
    summary: 'Stateless edge authentication middleware using JOSE JWTs, HttpOnly session cookies, and route guards for /dashboard and /admin.',
    compressedContextPill: `[ChatBridge Context • Next.js Edge Auth]
Framework: Next.js 15 (Edge Middleware runtime)
Token Engine: JOSE HS256 stateless JWT in HttpOnly secure cookie
Protected Routes: /dashboard/* (authenticated), /admin/* (superadmin)
Upstream Headers: x-user-id, x-user-role forwarded to Server Components
Target Model Goal: Write integration tests for expired token redirect flow.`,
    originalTokens: 3180,
    compressedTokens: 142,
    timestamp: '45 mins ago',
    isPinned: true,
    rrfScore: 0.0412,
    extractedVariables: [
      { key: 'framework', value: 'Next.js 15 App Router' },
      { key: 'crypto_lib', value: 'JOSE (HS256)' },
      { key: 'session_storage', value: 'HttpOnly Secure Cookie' },
      { key: 'route_guards', value: '/dashboard, /admin' }
    ],
    suggestedPrompt: 'Building on the Next.js 15 edge auth middleware designed in Claude, generate comprehensive unit and integration tests using Vitest:'
  },
  {
    id: 'ctx-103',
    title: 'PostgreSQL pgvector & BM25 Hybrid RAG Schema',
    originModel: 'Gemini',
    category: 'database',
    tags: ['PostgreSQL', 'pgvector', 'RAG', 'Hybrid Search'],
    rawTranscript: `User: Compare PostgreSQL tsvector against pgvector for searching 500,000 developer documentation pages.
Gemini: Dense embeddings alone struggle with exact keyword matching (like UUIDs, git hashes, or function names like getSessionAsync). Sparse tsvector with GIN index handles exact keywords. Combining both using Reciprocal Rank Fusion (RRF with k=60) delivers a +3.9pp boost in Recall@5 over dense-only search.`,
    summary: 'Hybrid search architecture merging PostgreSQL tsvector lexical search with pgvector HNSW cosine distance using Reciprocal Rank Fusion.',
    compressedContextPill: `[ChatBridge Context • Hybrid RAG Schema]
Database: PostgreSQL 16 + pgvector extension
Sparse Index: tsvector with GIN index (english config)
Dense Index: vector(384) with HNSW (m=16, ef_construction=64)
Fusion Formula: RRF score = 1/(60 + rank_dense) + 1/(60 + rank_sparse)
Target Model Goal: Write Drizzle ORM schema and SQL migration.`,
    originalTokens: 2890,
    compressedTokens: 134,
    timestamp: '2 hours ago',
    isPinned: false,
    rrfScore: 0.0396,
    extractedVariables: [
      { key: 'database', value: 'PostgreSQL 16' },
      { key: 'vector_dim', value: '384d (all-MiniLM-L6-v2)' },
      { key: 'dense_index', value: 'HNSW (cosine metric)' },
      { key: 'fusion_param', value: 'k=60 RRF' }
    ],
    suggestedPrompt: 'Based on the PostgreSQL hybrid RAG architecture analyzed in Gemini, generate the complete Drizzle ORM table definitions and TypeScript search query function:'
  },
  {
    id: 'ctx-104',
    title: 'AST-Guided Token Compression Algorithm',
    originModel: 'DeepSeek',
    category: 'reasoning',
    tags: ['Algorithms', 'Tokenization', 'AST', 'Compression'],
    rawTranscript: `User: What is the formal mathematical proof for lossless conversational compression when pruning syntax trees?
DeepSeek: By treating code snippets as Abstract Syntax Trees and conversation prose as discourse dependency graphs, we can score subtrees by their structural informational entropy H(X). Subtrees with low contextual entropy (boilerplate imports, greetings) are pruned, preserving semantic dependency invariants.`,
    summary: 'Mathematical formulation of entropy-based conversational token compression preserving semantic dependencies while cutting 95% of tokens.',
    compressedContextPill: `[ChatBridge Context • Token Entropy Pruning]
Theory: Discourse Dependency Graph + AST subtree weighting
Metric: Shannon entropy H(X) > 3.8 cutoff threshold
Compression Ratio: 95.8% prompt reduction without semantic drift
Implementation: WebWorker non-blocking parser
Target Model Goal: Implement the AST pruning visitor pattern in TypeScript.`,
    originalTokens: 4120,
    compressedTokens: 160,
    timestamp: 'Yesterday',
    isPinned: false,
    rrfScore: 0.044,
    extractedVariables: [
      { key: 'algorithm', value: 'Entropy Subtree Pruning' },
      { key: 'compression_ratio', value: '95.8%' },
      { key: 'runtime', value: 'WebWorker (Client-Side)' }
    ],
    suggestedPrompt: 'Continuing our DeepSeek reasoning session on token compression, implement the visitor pattern in TypeScript that strips boilerplate while preserving syntax invariants:'
  },
  {
    id: 'ctx-105',
    title: 'WebCrypto Hardware AES-256-GCM Vault',
    originModel: 'ChatGPT',
    category: 'architecture',
    tags: ['WebCrypto', 'AES-256', 'Security', 'Privacy'],
    rawTranscript: `User: How do we ensure extension user transcripts are completely secure against local filesystem inspection and zero cloud leaks?
ChatGPT: Use window.crypto.subtle.generateKey with {name: "AES-GCM", length: 256, extractable: false}. Encrypt conversation blobs with a freshly generated 12-byte IV nonce for every turn. Store only the ciphertext and auth tag in chrome.storage.local. Since keys are non-extractable, malware cannot export the private key.`,
    summary: 'Hardware-backed on-device encryption using Chromium SubtleCrypto non-extractable keys, 96-bit initialization vectors, and zero cloud transmission.',
    compressedContextPill: `[ChatBridge Context • WebCrypto Vault]
Cipher: AES-256-GCM with 96-bit unique IV nonce
Key Properties: extractable=false, held in Chromium non-pageable memory
Storage Backend: chrome.storage.local (encrypted ciphertext only)
Telemetry: 0 KB remote outbound traffic
Target Model Goal: Create TypeScript unit test validating key non-extractability.`,
    originalTokens: 2750,
    compressedTokens: 125,
    timestamp: '2 days ago',
    isPinned: false,
    rrfScore: 0.0401,
    extractedVariables: [
      { key: 'cipher', value: 'AES-256-GCM' },
      { key: 'iv_length', value: '12 bytes (96-bit)' },
      { key: 'key_exportable', value: 'false' },
      { key: 'remote_traffic', value: '0 bytes' }
    ],
    suggestedPrompt: 'Referring to the WebCrypto security model from ChatGPT, write the cryptographic unit tests in Vitest ensuring extractable=false is enforced:'
  }
];

const STORAGE_KEY = 'chatbridge_saved_context_history';

export function getSavedContextSegments(): SavedContextSegment[] {
  if (typeof window === 'undefined') return INITIAL_CONTEXT_SEGMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONTEXT_SEGMENTS));
      return INITIAL_CONTEXT_SEGMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CONTEXT_SEGMENTS;
  } catch {
    return INITIAL_CONTEXT_SEGMENTS;
  }
}

export function saveContextSegments(segments: SavedContextSegment[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(segments));
  } catch (err) {
    console.error('Failed to save context segments to localStorage:', err);
  }
}
