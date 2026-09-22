import React, { useState, useEffect } from 'react';
import { DEMO_SCENARIOS } from '../data/mockData';
import { CheckIcon, CopyIcon, ArrowRightIcon, CloseIcon } from './Icons';

interface InteractiveDemoProps {
  onOpenInstall: () => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ onOpenInstall }) => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'prompt' | 'json'>('prompt');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scenario = DEMO_SCENARIOS[activeScenarioIndex];
  const step = scenario.steps[currentStepIndex];
  const totalSteps = scenario.steps.length;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < totalSteps - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

  const getPlatformLabel = () => {
    switch (step.platform) {
      case 'chatgpt':
        return {
          title: 'ChatGPT',
          host: 'chatgpt.com',
          badge: 'bg-[#F5F5F7] text-[#1D1D1F] border-[#E5E5EA]'
        };
      case 'chatbridge':
        return {
          title: 'ChatBridge Engine',
          host: 'Local Memory Service',
          badge: 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
        };
      case 'claude':
        return {
          title: 'Claude 3.7',
          host: 'claude.ai',
          badge: 'bg-[#F5F5F7] text-[#1D1D1F] border-[#E5E5EA]'
        };
      case 'gemini':
        return {
          title: 'Google Gemini',
          host: 'gemini.google.com',
          badge: 'bg-[#F5F5F7] text-[#1D1D1F] border-[#E5E5EA]'
        };
    }
  };

  const platformInfo = getPlatformLabel();

  // Generate formatted export payloads
  const getPromptContextString = () => {
    const header = `[ChatBridge Context Injection • State Snapshot]`;
    const meta = `• Scenario: ${scenario.name}\n• Current Turn: Step ${step.stepNumber} of ${totalSteps} (${platformInfo.title})\n• Timestamp: ${new Date().toLocaleTimeString()} (Sandboxed Local Memory)`;

    const contextEntries = step.retrievedContext && step.retrievedContext.length > 0
      ? step.retrievedContext.map((c) => `• [${c.source}] ${c.topic}: ${c.snippet} (${c.score})`).join('\n')
      : (step.bridgeAction
          ? `• Captured Action: ${step.bridgeAction}`
          : (step.userMessage ? `• User Prompt: ${step.userMessage.substring(0, 140)}...` : `• Focus: ${step.title}`));

    return `${header}\n${meta}\n\nPreserved Architectural Constraints & Decisions:\n${contextEntries}\n\n[Instruction: Carry this state forward into the next assistant turn without re-asking architectural questions.]`;
  };

  const getJsonContextString = () => {
    const exportPayload = {
      chatbridge_schema: 'urn:chatbridge:state:v0.4',
      export_timestamp: new Date().toISOString(),
      scenario: {
        id: scenario.id,
        name: scenario.name,
        description: scenario.description,
      },
      current_step: {
        step_number: step.stepNumber,
        total_steps: totalSteps,
        title: step.title,
        subtitle: step.subtitle,
        active_platform: step.platform,
        host_domain: platformInfo.host,
      },
      retrieved_context: step.retrievedContext || [],
      captured_action: step.bridgeAction || null,
      dialogue_turn: {
        user_message: step.userMessage || null,
        ai_message: step.aiMessage || null,
      },
      encryption_metadata: {
        algorithm: 'AES-256-GCM',
        key_derivation: 'PBKDF2-WebCrypto',
        storage_engine: 'chrome.storage.local',
        network_egress: '0 bytes (sandboxed)',
      },
      estimated_token_weight: step.retrievedContext ? 138 : 92,
    };
    return JSON.stringify(exportPayload, null, 2);
  };

  const handleCopyContextToClipboard = (format: 'prompt' | 'json' = 'prompt') => {
    const textToCopy = format === 'json' ? getJsonContextString() : getPromptContextString();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    const label = format === 'json' ? 'JSON state' : 'prompt context';
    setToastMessage(`Conversational ${label} copied to clipboard!`);
    setTimeout(() => {
      setCopied(false);
      setToastMessage(null);
    }, 2800);
  };

  const handleCopyPayload = () => {
    handleCopyContextToClipboard('prompt');
  };

  return (
    <section id="demo" className="py-20 md:py-28 border-b border-[#E5E5EA] bg-[#FBFBFA] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D1D1F] text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-mono flex items-center gap-2 border border-[#333336] animate-in fade-in slide-in-from-bottom-2">
          <CheckIcon className="w-4 h-4 text-[#0071E3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-mono font-medium tracking-wide text-[#6E6E73] uppercase">
              Interactive Demonstration
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
              Experience context continuity.
            </h2>
            <p className="text-base text-[#515154] leading-relaxed">
              Step through a simulated technical task moving between ChatGPT and Claude without re-explaining architectural choices.
            </p>
          </div>

          {/* Scenario Selector & Export State Actions */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1 bg-[#F5F5F7] p-1 rounded-lg border border-[#E5E5EA]" role="tablist">
              {DEMO_SCENARIOS.map((sc, idx) => (
                <button
                  key={sc.id}
                  role="tab"
                  aria-selected={activeScenarioIndex === idx}
                  id={`demo-scenario-${sc.id}`}
                  onClick={() => {
                    setActiveScenarioIndex(idx);
                    setCurrentStepIndex(0);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeScenarioIndex === idx
                      ? 'bg-white text-[#1D1D1F] shadow-2xs'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {sc.name}
                </button>
              ))}
            </div>

            <button
              id="demo-export-state-btn"
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-[#F5F5F7] border border-[#D1D1D6] text-xs font-medium text-[#1D1D1F] shadow-2xs transition-colors"
              title="Simulate exporting conversational state"
            >
              <CopyIcon className="w-3.5 h-3.5 text-[#6E6E73]" />
              <span>Export State...</span>
            </button>
          </div>
        </div>

        {/* Browser Demo Frame */}
        <div className="bg-white rounded-xl border border-[#E5E5EA] shadow-sm overflow-hidden">
          {/* Window Chrome Header */}
          <div className="px-4 py-3 bg-[#F5F5F7] border-b border-[#E5E5EA] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D1D1D6]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D1D1D6]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D1D1D6]"></span>
              </div>
              <div className="bg-white px-3 py-1 rounded border border-[#E5E5EA] text-xs font-mono text-[#515154] truncate max-w-xs sm:max-w-md">
                https://{platformInfo.host}
              </div>
            </div>

            {/* Step Controls & Quick Copy */}
            <div className="flex items-center gap-3">
              <button
                id="demo-quick-copy-context-btn"
                onClick={() => handleCopyContextToClipboard('prompt')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-[#FBFBFA] border border-[#D1D1D6] text-[11px] font-mono text-[#1D1D1F] transition-colors"
                title="Copy current continuity payload directly to clipboard"
              >
                {copied ? <CheckIcon className="w-3 h-3 text-[#0071E3]" /> : <CopyIcon className="w-3 h-3 text-[#6E6E73]" />}
                <span>{copied ? 'Copied' : 'Copy Context'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                {scenario.steps.map((_, idx) => (
                  <button
                    key={idx}
                    id={`demo-step-dot-${idx}`}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      currentStepIndex === idx
                        ? 'w-5 bg-[#1D1D1F]'
                        : idx < currentStepIndex
                        ? 'w-2 bg-[#86868B]'
                        : 'w-2 bg-[#D1D1D6]'
                    }`}
                    title={`Step ${idx + 1}`}
                    aria-label={`Jump to step ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 pl-3 border-l border-[#E5E5EA]">
                <button
                  id="demo-play-toggle-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-2.5 py-1 rounded text-xs font-mono text-[#1D1D1F] hover:bg-white border border-transparent hover:border-[#E5E5EA] transition-colors"
                >
                  {isPlaying ? 'Pause' : 'Autoplay'}
                </button>
                <button
                  id="demo-reset-btn"
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setIsPlaying(false);
                  }}
                  className="px-2 py-1 rounded text-xs font-mono text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                  title="Reset Demo"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Current Step Descriptor */}
          <div className="px-5 sm:px-7 py-3.5 bg-[#FAFAFA] border-b border-[#E5E5EA] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-[#6E6E73]">
                  Step {step.stepNumber} of {totalSteps}:
                </span>
                <span className="text-sm font-semibold text-[#1D1D1F]">{step.title}</span>
              </div>
              <p className="text-xs text-[#6E6E73] mt-0.5">{step.subtitle}</p>
            </div>

            <div className="self-start sm:self-auto">
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${platformInfo.badge}`}>
                {platformInfo.title}
              </span>
            </div>
          </div>

          {/* Step Main Stage */}
          <div className="p-6 sm:p-8 min-h-[320px] flex flex-col justify-between space-y-6">
            {step.platform === 'chatbridge' ? (
              /* ChatBridge Local Overlay Card */
              <div className="bg-[#F5F5F7] border border-[#E5E5EA] rounded-xl p-5 max-w-2xl mx-auto w-full space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA]">
                  <div>
                    <span className="text-xs font-semibold text-[#1D1D1F] block">ChatBridge Local Continuity</span>
                    <span className="text-[11px] font-mono text-[#6E6E73]">Hybrid Lexical and Semantic Retrieval</span>
                  </div>
                  <span className="text-[11px] font-mono bg-white text-[#6E6E73] px-2 py-0.5 rounded border border-[#E5E5EA]">
                    Shortcut: Cmd+Shift+K
                  </span>
                </div>

                {step.bridgeAction ? (
                  <div className="py-4 space-y-2 text-center">
                    <p className="text-xs font-medium text-[#1D1D1F]">Local Memory Captured</p>
                    <p className="text-xs text-[#515154] font-mono bg-white p-3 rounded-lg border border-[#E5E5EA] max-w-lg mx-auto leading-relaxed">
                      {step.bridgeAction}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#6E6E73]">
                      <span>Candidate Context Turns:</span>
                      <span>Latency: ~18ms</span>
                    </div>

                    {step.retrievedContext?.map((ctx, cIdx) => (
                      <div key={cIdx} className="bg-white p-3.5 rounded-lg border border-[#E5E5EA] space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#1D1D1F]">{ctx.source}</span>
                          <span className="font-mono text-[10px] text-[#6E6E73]">{ctx.score}</span>
                        </div>
                        <p className="text-xs text-[#515154]">{ctx.topic}</p>
                        <p className="text-xs font-mono text-[#1D1D1F] bg-[#F5F5F7] p-2 rounded border border-[#E5E5EA]">
                          {ctx.snippet}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Dialogue View (User and Assistant) */
              <div className="space-y-4 max-w-2xl mx-auto w-full">
                {step.userMessage && (
                  <div className="flex justify-end">
                    <div className="bg-[#1D1D1F] text-white p-4 rounded-xl text-xs sm:text-sm max-w-lg shadow-2xs">
                      <div className="text-[10px] font-mono text-[#86868B] mb-1.5 flex items-center justify-between">
                        <span>USER PROMPT</span>
                        <button
                          onClick={handleCopyPayload}
                          className="hover:text-white inline-flex items-center gap-1 text-[10px]"
                        >
                          {copied ? <CheckIcon className="w-3 h-3 text-[#0071E3]" /> : <CopyIcon className="w-3 h-3" />}
                          <span>{copied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="whitespace-pre-wrap leading-relaxed font-sans">{step.userMessage}</p>
                    </div>
                  </div>
                )}

                {step.aiMessage && (
                  <div className="flex justify-start">
                    <div className="bg-[#F5F5F7] border border-[#E5E5EA] text-[#1D1D1F] p-4 rounded-xl text-xs sm:text-sm max-w-lg">
                      <div className="text-[10px] font-mono text-[#6E6E73] mb-1.5 flex items-center justify-between">
                        <span>{platformInfo.title.toUpperCase()} RESPONSE</span>
                        <span className="font-mono text-[#86868B]">Turn Complete</span>
                      </div>
                      <p className="whitespace-pre-wrap leading-relaxed font-sans text-[#333336]">
                        {step.aiMessage}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stepper Footer Controls */}
            <div className="pt-4 border-t border-[#E5E5EA] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  id="demo-prev-btn"
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-md bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5EA] disabled:opacity-30 disabled:pointer-events-none text-xs font-medium transition-colors"
                >
                  Previous
                </button>
                <button
                  id="demo-next-btn"
                  disabled={currentStepIndex === totalSteps - 1}
                  onClick={() => setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))}
                  className="px-4 py-1.5 rounded-md bg-[#1D1D1F] hover:bg-[#333336] text-white font-medium disabled:opacity-30 disabled:pointer-events-none text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Next Step</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>

                <button
                  id="demo-footer-copy-context-btn"
                  onClick={() => handleCopyContextToClipboard('prompt')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] text-xs font-medium transition-colors"
                  title="Copy current continuity prompt context to clipboard"
                >
                  <CopyIcon className="w-3 h-3 text-[#6E6E73]" />
                  <span>Copy Context to Clipboard</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#6E6E73]">
                  Step {currentStepIndex + 1} of {totalSteps}
                </span>
                <button
                  id="demo-install-cta-btn"
                  onClick={onOpenInstall}
                  className="text-xs font-medium text-[#0071E3] hover:underline"
                >
                  Install extension to use with your accounts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Context Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E5E5EA] max-w-2xl w-full p-6 sm:p-7 shadow-xl relative max-h-[90vh] overflow-y-auto space-y-5 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA]">
              <div>
                <h3 className="text-base font-semibold text-[#1D1D1F]">
                  Simulate Exporting Conversational State
                </h3>
                <p className="text-xs text-[#6E6E73]">
                  Inspect or copy the current conversational memory payload formatted for LLM prompt injection or local state migration.
                </p>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded-md text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                aria-label="Close export dialog"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Format Selector Tabs */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 bg-[#F5F5F7] p-1 rounded-lg border border-[#E5E5EA]">
                <button
                  onClick={() => setExportFormat('prompt')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    exportFormat === 'prompt'
                      ? 'bg-white text-[#1D1D1F] shadow-2xs'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  Prompt Context (LLM-Ready)
                </button>
                <button
                  onClick={() => setExportFormat('json')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    exportFormat === 'json'
                      ? 'bg-white text-[#1D1D1F] shadow-2xs'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  Raw State (JSON Schema)
                </button>
              </div>

              <div className="text-[11px] font-mono text-[#86868B]">
                {exportFormat === 'prompt' ? '~138 tokens • Formatted AST' : 'AES-256-GCM metadata ready'}
              </div>
            </div>

            {/* Code / Content Viewer */}
            <div className="rounded-xl border border-[#E5E5EA] bg-[#F5F5F7] overflow-hidden">
              <div className="px-4 py-2 bg-[#EBEBED] border-b border-[#E5E5EA] flex items-center justify-between text-xs font-mono text-[#6E6E73]">
                <span>{exportFormat === 'prompt' ? 'prompt_injection_prefix.txt' : 'chatbridge_memory_state.json'}</span>
                <span className="text-[10px] text-[#0071E3] font-sans font-medium">Local-Only • Zero Network Egress</span>
              </div>
              <pre className="p-4 text-xs font-mono text-[#1D1D1F] whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed selection:bg-[#0071E3] selection:text-white">
                {exportFormat === 'prompt' ? getPromptContextString() : getJsonContextString()}
              </pre>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E5EA]">
              <div className="text-xs text-[#6E6E73]">
                {copied ? (
                  <span className="text-[#0071E3] font-medium inline-flex items-center gap-1">
                    <CheckIcon className="w-3.5 h-3.5" /> Payload copied to clipboard!
                  </span>
                ) : (
                  <span>Ready to paste directly into ChatGPT, Claude, or Gemini prompt bar.</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#D1D1D6] hover:bg-[#F5F5F7] text-xs font-medium text-[#515154] transition-colors"
                >
                  Dismiss
                </button>
                <button
                  id="modal-copy-to-clipboard-btn"
                  onClick={() => handleCopyContextToClipboard(exportFormat)}
                  className="px-4 py-1.5 rounded-lg bg-[#1D1D1F] hover:bg-[#333336] text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span>Copy to Clipboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
