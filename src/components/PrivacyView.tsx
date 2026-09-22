import React from 'react';
import { ShieldCheckIcon, CheckIcon } from './Icons';
import { PrivacyDashboard } from './PrivacyDashboard';

export const PrivacyView: React.FC = () => {
  return (
    <div className="py-20 md:py-28 bg-[#FBFBFA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-mono font-medium tracking-wide text-[#6E6E73] uppercase">
            Privacy and Threat Model
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F]">
            Your conversations belong to you.
          </h1>
          <p className="text-base text-[#515154] leading-relaxed">
            ChatBridge is built on a local-first philosophy. Conversations are not transferred to our servers, and never will be. Below is an explicit breakdown of our data flow, active cryptographic parameters, and threat model.
          </p>
        </div>

        {/* Live Privacy & Storage Dashboard */}
        <PrivacyDashboard />

        {/* Visual Data Flow */}
        <div className="bg-white border border-[#E5E5EA] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#1D1D1F]">
              Local Architecture and Data Flow
            </h2>
            <p className="text-xs text-[#6E6E73]">
              How dialogue turns are captured, indexed, and retrieved strictly on your machine.
            </p>
          </div>

          <div className="bg-[#F5F5F7] p-6 rounded-lg border border-[#E5E5EA] max-w-xl mx-auto text-xs font-mono space-y-3">
            <div className="p-3 rounded bg-white border border-[#E5E5EA] text-[#1D1D1F] text-center">
              Web AI Conversation (ChatGPT, Claude, Gemini)
            </div>
            <div className="text-[#86868B] text-center font-bold">↓</div>
            <div className="p-3 rounded bg-white border border-[#D1D1D6] text-[#1D1D1F] text-center font-medium">
              ChatBridge Content Script Hook
            </div>
            <div className="text-[#86868B] text-center font-bold">↓</div>
            <div className="p-3.5 rounded bg-white border border-[#1D1D1F] text-[#1D1D1F] text-center font-medium shadow-2xs">
              Local Encrypted Storage (chrome.storage.local with AES-256-GCM)
            </div>
            <div className="text-[#86868B] text-center font-bold">
              ↓ [Hybrid PNCR Evaluation on Local CPU]
            </div>
            <div className="p-3 rounded bg-[#FFF9E6] border border-[#FFE8A3] text-[#8C6B00] text-center">
              Targeted Context Candidate (Selected 100 to 200 tokens)
            </div>
            <div className="text-[#86868B] text-center font-bold">↓</div>
            <div className="p-3 rounded bg-white border border-[#E5E5EA] text-[#1D1D1F] text-center">
              Target AI Prompt Box (Submitted directly by you to your AI provider)
            </div>
          </div>
        </div>

        {/* What Stays vs What Leaves */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E5E5EA] rounded-xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#1D1D1F]">
              <ShieldCheckIcon className="w-5 h-5 text-[#0071E3]" />
              <h3 className="text-base font-semibold">What never leaves your machine</h3>
            </div>
            <ul className="space-y-3 text-xs text-[#515154] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span><strong className="text-[#1D1D1F]">Full conversation transcripts:</strong> Saved strictly into browser-sandboxed local storage.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span><strong className="text-[#1D1D1F]">Vector embeddings and token indices:</strong> Calculated via local CPU and stored in local memory.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span><strong className="text-[#1D1D1F]">Encryption keys:</strong> Maintained in the browser extension sandbox.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span><strong className="text-[#1D1D1F]">Search queries:</strong> All BM25 and vector comparisons execute locally in the extension worker.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[#E5E5EA] rounded-xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#1D1D1F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8C6B00]" />
              <h3 className="text-base font-semibold">What is sent to services</h3>
            </div>
            <ul className="space-y-3 text-xs text-[#515154] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#86868B] font-mono mt-0.5">•</span>
                <span><strong className="text-[#1D1D1F]">Only the selected context snippet:</strong> When you confirm injection, the focused text enters your target prompt field (sent directly to Anthropic or OpenAI when you submit your prompt).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#86868B] font-mono mt-0.5">•</span>
                <span><strong className="text-[#1D1D1F]">Zero telemetry to ChatBridge:</strong> There are no backend ingestion servers, analytics beacons, or remote logging services.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Threat Model Section */}
        <div className="bg-white border border-[#E5E5EA] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-[#1D1D1F]">Threat Model and Attacker Profiles</h2>
            <p className="text-xs text-[#6E6E73]">
              Formal security boundary assumptions and defense mechanisms:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5E5EA] text-[#6E6E73]">
                  <th className="pb-3 pr-4 font-medium">Attacker Profile</th>
                  <th className="pb-3 pr-4 font-medium">Threat Vector</th>
                  <th className="pb-3 pr-4 font-medium">ChatBridge Defense</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5EA] text-[#515154]">
                <tr>
                  <td className="py-3.5 pr-4 font-medium text-[#1D1D1F]">Remote Prompt Adversary</td>
                  <td className="py-3.5 pr-4">Malicious prompt injection attempting to extract prior conversation turns.</td>
                  <td className="py-3.5 pr-4">Normalized prompt framing and strict token budgeting isolate context strings.</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA]">
                      Protected
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-medium text-[#1D1D1F]">Local Opportunistic Attacker</td>
                  <td className="py-3.5 pr-4">Inspection of local browser cache or unencrypted storage files.</td>
                  <td className="py-3.5 pr-4">All conversation records are encrypted via AES-256-GCM prior to disk writes.</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA]">
                      Protected
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-medium text-[#1D1D1F]">Privileged OS Attacker</td>
                  <td className="py-3.5 pr-4">Root malware with direct RAM access or browser process hooking.</td>
                  <td className="py-3.5 pr-4">No browser extension can defend against a compromised operating system kernel.</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F5F5F7] text-[#86868B] border border-[#E5E5EA]">
                      Out of scope
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Roadmap */}
        <div className="bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl p-6 space-y-2 text-xs">
          <h3 className="text-sm font-semibold text-[#1D1D1F]">Security Evolution Roadmap</h3>
          <p className="text-[#515154] leading-relaxed">
            In our current release, AES-256-GCM keys are managed within Chrome’s sandboxed extension storage. Our research roadmap outlines the transition toward deriving encryption keys strictly in volatile memory from a user master passphrase using PBKDF2 (600,000 iterations with salt), ensuring keys never persist unencrypted on disk even within browser profile sandboxes.
          </p>
        </div>
      </div>
    </div>
  );
};
