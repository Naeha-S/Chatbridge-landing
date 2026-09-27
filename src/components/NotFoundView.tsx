import React from 'react';
import { IconArrowLeft, IconSearch, IconBook, IconShieldCheck, IconCpu } from '@tabler/icons-react';
import { PageView } from '../types';

interface NotFoundViewProps {
  onNavigate: (view: PageView) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-200">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-6">
        <span className="w-2 h-2 rounded-full bg-amber-500" />
        <span>Error 404 • Page Not Found</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F] dark:text-white mb-4">
        Looking for a ChatBridge Page?
      </h1>

      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed">
        The route or context hash you requested does not exist. You can jump directly to any active section of ChatBridge below.
      </p>

      {/* Suggested Fast Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 text-left">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="p-4 rounded-2xl bg-white dark:bg-[#12121A] border border-neutral-200/90 dark:border-white/10 hover:border-[#0071E3] dark:hover:border-[#2997FF] shadow-xs hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-white/5 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] mb-2.5">
            <IconCpu className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
            Product Overview
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
            Explore features, live demo, and cross-AI continuity.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('history')}
          className="p-4 rounded-2xl bg-white dark:bg-[#12121A] border border-neutral-200/90 dark:border-white/10 hover:border-[#0071E3] dark:hover:border-[#2997FF] shadow-xs hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-white/5 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2.5">
            <IconBook className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            History Vault
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
            Search your local encrypted conversation notebook.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('local-privacy')}
          className="p-4 rounded-2xl bg-white dark:bg-[#12121A] border border-neutral-200/90 dark:border-white/10 hover:border-[#0071E3] dark:hover:border-[#2997FF] shadow-xs hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-white/5 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2.5">
            <IconShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            Privacy Model
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
            Zero telemetry, local AES-256-GCM verification.
          </p>
        </button>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <IconArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </button>
    </article>
  );
};
