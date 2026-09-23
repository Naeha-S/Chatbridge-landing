import React, { useState } from 'react';
import { DownloadIcon, CloseIcon, CheckIcon, ExternalLinkIcon, CopyIcon } from './Icons';
import { CHROME_WEBSTORE_URL } from '../constants/links';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOnboarding?: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showDevMode, setShowDevMode] = useState(false);
  const [testQuery, setTestQuery] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(CHROME_WEBSTORE_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
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
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1E1E2C] transition-colors"
          aria-label="Close modal"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        {/* Extension Info Header */}
        <div className="space-y-1.5 pb-4 border-b border-[#E5E5EA] dark:border-[#222232] pr-8">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white">
              Install ChatBridge Extension
            </h3>
            <span className="text-[11px] font-mono text-[#6E6E73] dark:text-[#8E8E98] bg-[#F5F5F7] dark:bg-[#1A1A28] px-2 py-0.5 rounded border border-[#E5E5EA] dark:border-[#28283C]">
              v0.4.2
            </span>
          </div>
          <p className="text-xs text-[#515154] dark:text-[#A1A1A6]">
            Official Chrome Web Store package for ChatGPT, Claude, and Gemini continuity.
          </p>
        </div>

        {/* Primary Action Button - Working Chrome Web Store Link */}
        <div className="space-y-2.5">
          <a
            id="chrome-install-action-btn"
            href={CHROME_WEBSTORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-xl bg-[#1D1D1F] dark:bg-white hover:bg-[#333336] dark:hover:bg-[#E5E5EA] text-white dark:text-[#0A0A0D] font-medium text-sm inline-flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg group"
          >
            <DownloadIcon className="w-4 h-4 text-[#0071E3]" />
            <span>Open in Chrome Web Store</span>
            <ExternalLinkIcon className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <div className="flex items-center justify-between px-1 text-xs">
            <button
              onClick={handleCopyStoreLink}
              className="inline-flex items-center gap-1.5 text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
            >
              {copiedLink ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Link Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span>Copy Web Store Direct URL</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowDevMode(!showDevMode)}
              className="text-[#0071E3] dark:text-[#2997FF] hover:underline text-xs"
            >
              {showDevMode ? 'Hide Developer Instructions' : 'Developer Unpacked Mode'}
            </button>
          </div>
        </div>

        {/* Developer Unpacked Guide (If testing extension before store listing goes live) */}
        {showDevMode && (
          <div className="p-3.5 rounded-xl bg-[#F5F5F7] dark:bg-[#161622] border border-[#D1D1D6] dark:border-[#2A2A3C] text-xs space-y-2 animate-in fade-in duration-200">
            <span className="font-semibold text-[#1D1D1F] dark:text-white block">
              Load Unpacked (Local Development):
            </span>
            <ol className="list-decimal list-inside space-y-1 text-[#515154] dark:text-[#A1A1A6] text-[11px] font-mono leading-relaxed">
              <li>Open <span className="text-[#0071E3] dark:text-[#2997FF]">chrome://extensions</span> in your browser.</li>
              <li>Toggle <strong className="text-[#1D1D1F] dark:text-white">Developer mode</strong> in the top right.</li>
              <li>Click <strong className="text-[#1D1D1F] dark:text-white">Load unpacked</strong> and select the extension directory.</li>
              <li>Press <strong className="text-[#1D1D1F] dark:text-white">Cmd+Shift+K</strong> on ChatGPT, Claude, or Gemini.</li>
            </ol>
          </div>
        )}

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

        {/* Interactive Query Sandbox Test */}
        <div className="p-3.5 bg-[#FAFAFA] dark:bg-[#0D0D14] rounded-lg border border-[#E5E5EA] dark:border-[#222232] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#6E6E73] dark:text-[#8E8E98]">
              Simulate In-Browser Search:
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              Offline Ready
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 'LRU cache' or 'Redis'..."
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTestSearch()}
              className="flex-1 px-3 py-1.5 bg-white dark:bg-[#161622] border border-[#D1D1D6] dark:border-[#2A2A3C] rounded-lg text-xs text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] dark:placeholder-[#636370] focus:outline-none focus:border-[#0071E3] dark:focus:border-[#2997FF]"
            />
            <button
              onClick={handleTestSearch}
              className="px-3.5 py-1.5 rounded-lg bg-[#1D1D1F] dark:bg-[#0071E3] text-white hover:bg-[#333336] dark:hover:bg-[#0077ED] text-xs font-medium transition-colors"
            >
              Search
            </button>
          </div>
          {testResult && (
            <pre className="p-3 bg-white dark:bg-[#12121A] rounded-lg border border-[#E5E5EA] dark:border-[#262638] text-[11px] font-mono text-[#1D1D1F] dark:text-[#E5E5EA] whitespace-pre-wrap leading-relaxed">
              {testResult}
            </pre>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-[#E5E5EA] dark:border-[#222232] flex items-center justify-between text-[11px] font-mono text-[#86868B] dark:text-[#787884]">
          <span>Manifest V3 Verified</span>
          <span>Chrome, Edge, Brave, Arc</span>
        </div>
      </div>
    </div>
  );
};

