export type PageView = 'home' | 'features' | 'how-it-works' | 'privacy' | 'local-privacy' | 'guides' | 'install';

export type GuideSlug =
  | 'chatgpt-to-claude'
  | 'chatgpt-to-gemini'
  | 'ai-conversation-memory'
  | 'local-ai-memory'
  | 'hybrid-retrieval-rrf';

export interface GuideArticle {
  slug: GuideSlug;
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  date: string;
  summary: string;
  content: {
    heading: string;
    body: string[];
    callout?: string;
    codeSnippet?: string;
  }[];
}

export interface BenchmarkData {
  dataset: string;
  description: string;
  denseOnly: number;
  hybridRRF: number;
  gain: number;
  metric: string;
  qualification: string;
}

export interface DemoStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  platform: 'chatgpt' | 'chatbridge' | 'claude' | 'gemini';
  userMessage?: string;
  aiMessage?: string;
  bridgeAction?: string;
  retrievedContext?: {
    source: string;
    topic: string;
    snippet: string;
    score: string;
  }[];
}

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  steps: DemoStep[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Privacy' | 'Technical' | 'Compatibility' | 'Platforms';
}

export type PlatformSupportStatus = 'supported' | 'testing' | 'unsupported';

export interface PlatformSupportItem {
  name: string;
  domain?: string;
  category: string;
  status: PlatformSupportStatus;
  statusLabel: string;
  details: string;
  mitigationOrAlternative?: string;
}

export interface FeedbackSubmission {
  id: string;
  category: 'bug' | 'feature' | 'platform' | 'general';
  platform?: string;
  message: string;
  email?: string;
  rating?: number;
  timestamp: string;
}
