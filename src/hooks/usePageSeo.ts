import { useEffect } from 'react';
import { PageView, GuideSlug } from '../types';

interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  jsonLd: Record<string, any>;
}

const BASE_URL = 'https://chatbridge.app';

export function getSeoForView(view: PageView, guideSlug?: GuideSlug): SeoMetadata {
  switch (view) {
    case 'how-it-works':
      return {
        title: 'How It Works — Cross-Model Context Transfer & Architecture | ChatBridge',
        description:
          'Explore how ChatBridge captures, encrypts with AES-256-GCM, and fuses conversational memory across ChatGPT, Claude, and Gemini with 15ms hybrid RRF retrieval.',
        keywords:
          'how chatbridge works, cross model ai memory, ai context transfer pipeline, aes-256-gcm browser crypto, hybrid reciprocal rank fusion, local chrome extension llm',
        canonical: `${BASE_URL}/#how-it-works`,
        ogTitle: 'How ChatBridge Works: On-Device Hybrid Context Transfer',
        ogDescription:
          'Step-by-step visual pipeline of DOM extraction, on-device encryption, and zero-telemetry cross-AI context handoff.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'How ChatBridge Transfers AI Context Between Browser Tabs',
          description:
            'A technical breakdown of content-script extraction, WebCrypto AES-256-GCM local storage, and BM25 + Dense vector Reciprocal Rank Fusion.',
          url: `${BASE_URL}/#how-it-works`,
          author: {
            '@type': 'Organization',
            name: 'ChatBridge Project'
          }
        }
      };

    case 'chatgpt-to-claude':
      return {
        title: 'How to Transfer ChatGPT Conversations to Claude (Free Chrome Extension) | ChatBridge',
        description:
          'Seamlessly move active ChatGPT brainstorms, code schemas, and system reasoning directly into Anthropic Claude. Zero re-typing, zero cloud storage, free & open.',
        keywords:
          'transfer chatgpt to claude, export chatgpt to claude, chatgpt claude chrome extension, move chatgpt memory to claude, claude artifacts import chatgpt, ai context transfer',
        canonical: `${BASE_URL}/#chatgpt-to-claude`,
        ogTitle: 'Transfer ChatGPT to Claude Without Losing Context — ChatBridge',
        ogDescription:
          'Press Cmd+Shift+K to import relevant ChatGPT turns into Claude Sonnet. Preserve code, reasoning, and context pills instantly.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Transfer Conversation History from ChatGPT to Claude',
          description:
            'Move active project parameters and technical decisions from ChatGPT into Claude Sonnet without re-explaining background.',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Discuss in ChatGPT',
              text: 'Develop project architecture or brainstorm ideas in chatgpt.com. ChatBridge securely encrypts finished turns locally.'
            },
            {
              '@type': 'HowToStep',
              name: 'Open Claude',
              text: 'Navigate to claude.ai in another browser tab to write code or analyze documents.'
            },
            {
              '@type': 'HowToStep',
              name: 'Press Cmd+Shift+K (or Ctrl+Shift+K)',
              text: 'Open the ChatBridge HUD and search past ChatGPT dialogue turns using hybrid keyword + vector retrieval.'
            },
            {
              '@type': 'HowToStep',
              name: 'Inject Condensed Context',
              text: 'Insert a 95% compressed context capsule directly into Claude’s prompt input with one click.'
            }
          ]
        }
      };

    case 'chatgpt-to-gemini':
      return {
        title: 'How to Move ChatGPT Context to Google Gemini 2.0 | ChatBridge',
        description:
          'Bridge ChatGPT dialogue turns into Google Gemini 2.0 Flash & Advanced. Expand your context window to 1M+ tokens without losing project memory.',
        keywords:
          'transfer chatgpt to gemini, export chatgpt to google gemini, chatgpt to gemini extension, move ai context to gemini, gemini 2.0 prompt continuity',
        canonical: `${BASE_URL}/#chatgpt-to-gemini`,
        ogTitle: 'Move ChatGPT Context to Google Gemini 2.0 in One Click',
        ogDescription:
          'Handoff ChatGPT conversations directly into Gemini’s massive context window with encrypted local memory.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Transfer Context from ChatGPT to Google Gemini',
          description:
            'Export code, project specs, and discussion threads from ChatGPT into Google Gemini 2.0 without copying and pasting manually.',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Capture in ChatGPT',
              text: 'Have your conversation in ChatGPT as usual.'
            },
            {
              '@type': 'HowToStep',
              name: 'Switch to Gemini',
              text: 'Open gemini.google.com in a adjacent tab.'
            },
            {
              '@type': 'HowToStep',
              name: 'Summon Past Context',
              text: 'Press Cmd+Shift+K to recall your relevant ChatGPT decisions and prompt capsules.'
            },
            {
              '@type': 'HowToStep',
              name: 'Continue Conversation',
              text: 'Generate responses utilizing Gemini’s multimodal analysis and 1M+ context window.'
            }
          ]
        }
      };

    case 'comparison':
      return {
        title: 'ChatBridge vs Alternatives: Best ChatGPT to Claude Tools Compared (2025)',
        description:
          'In-depth comparison: ChatBridge vs. Cloud AI Memory vs. Manual Copy-Paste vs. Web Scrapers. Compare privacy, latency, token costs, and security.',
        keywords:
          'chatgpt to claude alternatives, context transfer comparison, best ai memory extension, local ai memory vs cloud memory, ai context tools compared',
        canonical: `${BASE_URL}/#comparison`,
        ogTitle: 'ChatBridge vs Alternatives: Context Portability Comparison',
        ogDescription:
          'See why local-first AES-256-GCM encryption and hybrid RRF beats manual copying and privacy-invasive cloud scrapers.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Comparison: Cross-Model AI Conversational Memory Tools',
          description:
            'A feature-by-feature breakdown comparing ChatBridge against centralized memory tools and manual prompt copying.',
          url: `${BASE_URL}/#comparison`
        }
      };

    case 'supported-platforms':
      return {
        title: 'Supported AI Platforms & Model Compatibility | ChatBridge',
        description:
          'Full compatibility guide for ChatGPT (GPT-4o, o1, o3-mini), Anthropic Claude (3.5 Sonnet, Opus), Google Gemini (2.0 Flash, Advanced), and DeepSeek.',
        keywords:
          'chatbridge supported platforms, chatgpt 4o claude 3.5 sonnet compatibility, gemini 2.0 flash extension, deepseek chat memory, perplexity ai context handoff',
        canonical: `${BASE_URL}/#supported-platforms`,
        ogTitle: 'Supported AI Platforms: ChatGPT, Claude, Gemini & DeepSeek',
        ogDescription:
          'Check version support, DOM observer resilience, and sandbox security across major web AI interfaces.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'ChatBridge Supported Platforms and Models',
          url: `${BASE_URL}/#supported-platforms`
        }
      };

    case 'faq':
      return {
        title: 'Frequently Asked Questions (FAQ) & Troubleshooting | ChatBridge',
        description:
          'Get answers on security, zero-telemetry architecture, AES-256-GCM encryption, supported browsers, enterprise policies, and troubleshooting.',
        keywords:
          'chatbridge faq, is chatbridge safe, does openai ban chatbridge, how to uninstall chatbridge, local ai memory questions, aes-256 encryption browser',
        canonical: `${BASE_URL}/#faq`,
        ogTitle: 'ChatBridge FAQ: Security, Architecture & Compatibility',
        ogDescription:
          'Everything you need to know about local-first privacy, hybrid search, and cross-model conversational continuity.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Does ChatBridge send my prompts or code to an external server?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Never. ChatBridge operates 100% locally inside your browser sandbox using chrome.storage.local and WebCrypto SubtleCrypto. No data, telemetry, or analytics ever leaves your computer.'
              }
            },
            {
              '@type': 'Question',
              name: 'How does ChatBridge transfer context from ChatGPT to Claude?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'ChatBridge captures finished assistant turns via lightweight DOM observers, encrypts them on-device with AES-256-GCM, and allows you to search and inject compressed context capsules into Claude via a Cmd+Shift+K overlay.'
              }
            },
            {
              '@type': 'Question',
              name: 'Will using ChatBridge violate OpenAI, Anthropic, or Google Terms of Service?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. ChatBridge does not scrape external APIs or bypass rate limits. It acts as an accessibility and clipboard productivity enhancement strictly within your own browser window.'
              }
            },
            {
              '@type': 'Question',
              name: 'Is ChatBridge free to use?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, ChatBridge is free and open-source under the Apache-2.0 license. There are no paid tiers, credits, or hidden subscriptions.'
              }
            }
          ]
        }
      };

    case 'features':
      return {
        title: 'Features & Architecture: Hybrid RRF Retrieval & Local Encryption | ChatBridge',
        description:
          'Explore ChatBridge technical capabilities: Sparse BM25 + Dense vector Reciprocal Rank Fusion, 15ms local ranking, AES-256-GCM crypto, and DOM resilience.',
        keywords:
          'reciprocal rank fusion chrome extension, hybrid search llm, bm25 vector fusion, local webcrypto storage, prompt compression ai memory',
        canonical: `${BASE_URL}/#features`,
        ogTitle: 'ChatBridge Technical Features: Hybrid RRF & Local Encryption',
        ogDescription:
          'High-performance client-side retrieval with hardware-backed encryption and zero remote telemetry.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'ChatBridge',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Google Chrome, Microsoft Edge, Brave, Chromium'
        }
      };

    case 'privacy':
    case 'local-privacy':
      return {
        title: 'Privacy Architecture & Security Guarantee | ChatBridge',
        description:
          'Read our zero-telemetry guarantee. AES-256-GCM encrypted local storage, zero remote network calls, no user accounts, and 100% client-side execution.',
        keywords:
          'chatbridge privacy policy, zero telemetry ai extension, local aes-256-gcm storage, client side ai memory, confidential prompt storage',
        canonical: `${BASE_URL}/#privacy`,
        ogTitle: 'Zero-Knowledge, Zero-Telemetry Privacy Policy — ChatBridge',
        ogDescription:
          'Your prompts never touch our servers because we operate zero servers. Full cryptographic audit and local storage verification.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'SecurityPolicy',
          name: 'ChatBridge Privacy & Security Architecture',
          url: `${BASE_URL}/#privacy`
        }
      };

    case 'guides':
      return {
        title: 'Guides & Technical Documentation | ChatBridge',
        description:
          'In-depth guides on cross-model prompt portability, moving context from ChatGPT to Claude and Gemini, and optimizing AI conversational memory.',
        keywords:
          'chatgpt guides, claude guides, gemini context migration, ai prompt engineering guides, local rrf retrieval tutorial',
        canonical: `${BASE_URL}/#guides`,
        ogTitle: 'ChatBridge Guides & Technical Tutorials',
        ogDescription:
          'Master cross-model workflows, prompt compression, and zero-telemetry AI context management.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'ChatBridge Technical Guides & Tutorials',
          url: `${BASE_URL}/#guides`
        }
      };

    case 'home':
    default:
      return {
        title: 'ChatBridge: Local AI Conversational Continuity & Context Portability',
        description:
          'Free Chrome extension that transfers active conversation context between ChatGPT, Claude, and Gemini with on-device AES-256-GCM encryption and hybrid RRF retrieval.',
        keywords:
          'AI conversational memory, cross-model context handoff, ChatGPT to Claude, ChatGPT to Gemini, local-first LLM memory, AES-256-GCM browser storage, Reciprocal Rank Fusion, prompt compression',
        canonical: `${BASE_URL}/`,
        ogTitle: 'ChatBridge: Local AI Conversational Continuity & Context Portability',
        ogDescription:
          'Carry conversational context across ChatGPT, Claude, and Gemini with encrypted on-device hybrid retrieval and zero telemetry.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              '@id': `${BASE_URL}/#software`,
              name: 'ChatBridge',
              operatingSystem: 'Chromium, Google Chrome, Brave, Microsoft Edge',
              applicationCategory: 'UtilitiesApplication',
              softwareVersion: '0.4.2',
              description:
                'Browser extension providing local-first conversational continuity between ChatGPT, Claude, and Google Gemini using Reciprocal Rank Fusion and AES-256-GCM encryption.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              }
            },
            {
              '@type': 'WebSite',
              name: 'ChatBridge',
              url: BASE_URL
            }
          ]
        }
      };
  }
}

/**
 * Hook to dynamically sync document metadata, OpenGraph tags, canonical URLs,
 * and JSON-LD structured data graphs when users navigate between subpages.
 */
export function usePageSeo(currentView: PageView, guideSlug?: GuideSlug) {
  useEffect(() => {
    const seo = getSeoForView(currentView, guideSlug);

    // 1. Update Title
    document.title = seo.title;

    // 2. Helper to set/create meta tags
    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(isProperty ? 'property' : 'name', nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', seo.description);
    setMeta('keywords', seo.keywords);
    setMeta('og:title', seo.ogTitle, true);
    setMeta('og:description', seo.ogDescription, true);
    setMeta('og:url', seo.canonical, true);
    setMeta('twitter:title', seo.ogTitle);
    setMeta('twitter:description', seo.ogDescription);

    // 3. Update Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seo.canonical);

    // 4. Update or Inject Page-Specific JSON-LD
    const jsonLdId = 'chatbridge-page-jsonld';
    let scriptTag = document.getElementById(jsonLdId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(seo.jsonLd);

    // 5. Update browser hash if not already matching and not home
    const targetHash = currentView === 'home' ? '' : `#${currentView}`;
    if (window.location.hash !== targetHash) {
      if (currentView === 'home') {
        if (window.location.hash && !window.location.hash.startsWith('#demo')) {
          history.pushState(null, '', window.location.pathname);
        }
      } else {
        history.pushState(null, '', targetHash);
      }
    }
  }, [currentView, guideSlug]);
}
