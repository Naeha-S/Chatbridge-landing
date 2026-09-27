import React from 'react';
import { IconFileText, IconShieldCheck, IconLock, IconScale, IconCheck, IconArrowLeft } from '@tabler/icons-react';
import { PageView } from '../types';
import { LiquidGlassCard } from './ui/LiquidGlassCard';

interface TermsOfServiceViewProps {
  onNavigateHome: () => void;
  onNavigatePrivacy: () => void;
}

export const TermsOfServiceView: React.FC<TermsOfServiceViewProps> = ({
  onNavigateHome,
  onNavigatePrivacy
}) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-[#1D1D1F] dark:text-[#F5F5F7]">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono text-neutral-500 flex items-center space-x-2">
        <button onClick={onNavigateHome} className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition-colors">
          ChatBridge
        </button>
        <span>/</span>
        <span className="text-neutral-700 dark:text-neutral-300 font-medium">Legal</span>
        <span>/</span>
        <span className="text-[#0071E3] dark:text-[#2997FF]">Terms of Service</span>
      </nav>

      {/* Header */}
      <header className="mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <IconScale className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" />
          <span>Legal Agreement • Effective Date: January 2025</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white">
          Terms of Service
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
          Please read these terms carefully before installing or using the ChatBridge browser extension. ChatBridge operates as a client-side utility running entirely on your local machine.
        </p>
      </header>

      {/* Summary Highlights in Liquid Glass Card */}
      <LiquidGlassCard className="p-6 sm:p-8 mb-12" glowColor="rgba(0, 113, 227, 0.12)">
        <h2 className="text-base font-semibold text-[#1D1D1F] dark:text-white mb-4 flex items-center gap-2">
          <IconShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>Core Principles and Data Ownership</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600 dark:text-neutral-300">
          <div className="flex items-start gap-2.5">
            <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>You own 100% of your conversation transcripts, code snippets, and synthesized context capsules.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>ChatBridge runs zero remote servers for transcript storage, telemetry, or analytics tracking.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Encryption keys are generated locally in your browser sandbox with non-extractable flags.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>You can export or purge your local database at any time with one click.</span>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Structured Legal Sections */}
      <div className="space-y-10 text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1D1D1F] dark:text-white border-b border-neutral-200 dark:border-white/10 pb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By downloading, installing, or interacting with the ChatBridge browser extension or website, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not install or use the extension.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1D1D1F] dark:text-white border-b border-neutral-200 dark:border-white/10 pb-2">
            2. License and Scope of Use
          </h2>
          <p>
            ChatBridge grants you a personal, non-exclusive, non-transferable, revocable license to use the extension in accordance with applicable Chromium web store guidelines. You may install the extension across multiple personal or enterprise browsers.
          </p>
          <p>
            You agree not to modify, reverse engineer, or distribute malicious forks that compromise the local encryption boundary or attempt to extract user tokens without authorization.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1D1D1F] dark:text-white border-b border-neutral-200 dark:border-white/10 pb-2">
            3. Local-First Processing and Third-Party AI Services
          </h2>
          <p>
            ChatBridge facilitates context portability between independent third-party AI interfaces, including OpenAI (ChatGPT), Anthropic (Claude), and Google (Gemini). ChatBridge is an independent software tool and is not affiliated with, endorsed by, or sponsored by OpenAI, Anthropic, or Google.
          </p>
          <p>
            Your usage of third-party AI web applications remains subject to their respective terms of service and privacy policies. ChatBridge only injects text into prompt input fields upon your explicit user action (such as pressing the keyboard shortcut or clicking the injection button).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1D1D1F] dark:text-white border-b border-neutral-200 dark:border-white/10 pb-2">
            4. Disclaimer of Warranties
          </h2>
          <p>
            ChatBridge is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. While the extension uses military-grade AES-256-GCM encryption through the browser's native WebCrypto APIs, we do not guarantee uninterrupted availability or that third-party AI interface DOM updates will not temporarily affect context parsing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1D1D1F] dark:text-white border-b border-neutral-200 dark:border-white/10 pb-2">
            5. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, ChatBridge and its developers shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the extension, including data loss or target prompt processing discrepancies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1D1D1F] dark:text-white border-b border-neutral-200 dark:border-white/10 pb-2">
            6. Contact and Inquiries
          </h2>
          <p>
            For technical questions regarding these terms or our open architecture, review our{' '}
            <button onClick={onNavigatePrivacy} className="text-[#0071E3] dark:text-[#2997FF] hover:underline font-medium">
              Privacy Architecture Documentation
            </button>{' '}
            or submit feedback directly through the in-app feedback dialog.
          </p>
        </section>
      </div>

      {/* Back to Home Action */}
      <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors"
        >
          <IconArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <button
          type="button"
          onClick={onNavigatePrivacy}
          className="text-xs font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline"
        >
          View Privacy Policy & Threat Model →
        </button>
      </div>
    </article>
  );
};
