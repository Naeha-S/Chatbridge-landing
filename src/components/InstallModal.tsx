import React, { useState } from 'react';
import { DownloadIcon, CloseIcon, CheckIcon } from './Icons';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOnboarding?: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  onOpenOnboarding
}) => {
  const [installedState, setInstalledState] = useState<'idle' | 'installing' | 'installed'>('idle');
  const [testQuery, setTestQuery] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateInstall = () => {
    setInstalledState('installing');
    setTimeout(() => {
      setInstalledState('installed');
    }, 1000);
  };

  const handleTestSearch = () => {
    if (!testQuery) return;
    setTestResult(
      `Found in local encrypted index (18ms):\n• Origin: ChatGPT [Turn 2] – Redis LRU Cache Architecture\n• Matches: "${testQuery}" (RRF Score: 0.0319)`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#12121A] rounded-2xl border border-[#E5E5EA] dark:border-[#2A2A3C] max-w-lg w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6 text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-md text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1E1E2C] transition-colors"
          aria-label="Close modal"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        {/* Extension Info Header */}
        <div className="space-y-1.5 pb-4 border-b border-[#E5E5EA] dark:border-[#222232] pr-8">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
              ChatBridge Extension
            </h3>
            <span className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] bg-[#F5F5F7] dark:bg-[#1A1A28] px-2 py-0.5 rounded border border-[#E5E5EA] dark:border-[#28283C]">
              v0.4.2
            </span>
          </div>
          <p className="text-xs text-[#515154] dark:text-[#A1A1A6]">
            Local-first browser extension for ChatGPT, Claude, and Gemini continuity.
          </p>
        </div>

        {/* Plain-English Permissions */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-medium text-[#6E6E73] dark:text-[#8E8E98] uppercase tracking-wide">
            Permissions Transparency
          </h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-[#F5F5F7] dark:bg-[#161622] border border-[#E5E5EA] dark:border-[#262638] space-y-1">
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] block">Host access: chatgpt.com, claude.ai, gemini.google.com</strong>
              <p className="text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
                The content script executes only on approved AI web domains to record conversational turns. It cannot read web pages on banking, email, or unapproved domains.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#F5F5F7] dark:bg-[#161622] border border-[#E5E5EA] dark:border-[#262638] space-y-1">
              <strong className="text-[#1D1D1F] dark:text-[#F5F5F7] block">chrome.storage.local</strong>
              <p className="text-[#515154] dark:text-[#A1A1A6] leading-relaxed">
                Stores your AES-256-GCM encrypted database exclusively in your local browser profile. No cloud sync or remote telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {installedState === 'idle' && (
          <button
            id="chrome-install-action-btn"
            onClick={handleSimulateInstall}
            className="w-full py-3 rounded-full bg-[#1D1D1F] dark:bg-white hover:bg-[#333336] dark:hover:bg-[#E5E5EA] text-white dark:text-[#0A0A0D] font-medium text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <DownloadIcon className="w-4 h-4 text-[#0071E3]" />
            <span>Add ChatBridge to Chrome</span>
          </button>
        )}

        {installedState === 'installing' && (
          <div className="w-full py-3 rounded-full bg-[#F5F5F7] dark:bg-[#1A1A28] border border-[#E5E5EA] dark:border-[#28283C] text-[#1D1D1F] dark:text-[#F5F5F7] font-mono text-xs text-center">
            Initializing local encryption keys...
          </div>
        )}

        {installedState === 'installed' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-lg bg-[#F5F5F7] dark:bg-[#161622] border border-[#D1D1D6] dark:border-[#2C2C3E] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#1D1D1F] dark:text-white font-medium">
                  <CheckIcon className="w-4 h-4 text-[#34C759]" />
                  <span>ChatBridge ready</span>
                </div>
                {onOpenOnboarding && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOnboarding();
                    }}
                    className="text-xs text-[#0071E3] dark:text-[#2997FF] font-medium hover:underline"
                  >
                    Open Setup Guide →
                  </button>
                )}
              </div>
              <p className="text-[#515154] dark:text-[#A1A1A6]">
                The extension is active in your browser. Press <strong>Cmd+Shift+K</strong> on any supported AI chat interface to invoke context retrieval.
              </p>
            </div>

            {/* In-Modal Extension Sandbox Test */}
            <div className="p-3.5 bg-[#FAFAFA] dark:bg-[#0D0D14] rounded-lg border border-[#E5E5EA] dark:border-[#222232] space-y-2.5">
              <span className="text-xs font-mono text-[#6E6E73] dark:text-[#8E8E98] block">
                Local Sandbox Query Test:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 'LRU cache' or 'Redis'..."
                  value={testQuery}
                  onChange={(e) => setTestQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTestSearch()}
                  className="flex-1 px-3 py-1.5 bg-white dark:bg-[#161622] border border-[#D1D1D6] dark:border-[#2A2A3C] rounded text-xs text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#636370] focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF]"
                />
                <button
                  onClick={handleTestSearch}
                  className="px-3 py-1.5 rounded bg-[#1D1D1F] dark:bg-[#0071E3] text-white hover:bg-[#333336] dark:hover:bg-[#0077ED] text-xs font-medium transition-colors"
                >
                  Search
                </button>
              </div>
              {testResult && (
                <pre className="p-3 bg-white dark:bg-[#12121A] rounded border border-[#E5E5EA] dark:border-[#262638] text-[11px] font-mono text-[#1D1D1F] dark:text-[#E5E5EA] whitespace-pre-wrap leading-relaxed">
                  {testResult}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-2 border-t border-[#E5E5EA] dark:border-[#222232] flex items-center justify-between text-[11px] font-mono text-[#86868B] dark:text-[#787884]">
          <span>Manifest V3 Sandboxed</span>
          <span>Chrome, Edge, Brave, Arc</span>
        </div>
      </div>
    </div>
  );
};
