import React, { useState, useEffect } from 'react';
import {
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  SettingsIcon,
  SlidersIcon,
  LockIcon,
  ShieldCheckIcon
} from './Icons';

interface OnboardingCarouselProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

interface StepConfig {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
}

export const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Simulated extension configuration state for interactive demo
  const [enabledPlatforms, setEnabledPlatforms] = useState<Record<string, boolean>>({
    chatgpt: true,
    claude: true,
    gemini: true,
    perplexity: true,
    cursor: false
  });

  const [tokenBudget, setTokenBudget] = useState<number>(250);
  const [rrfKParam, setRrfKParam] = useState<number>(60);
  const [shortcutKey, setShortcutKey] = useState<string>('⌘ ⇧ K');
  const [inlineTrigger, setInlineTrigger] = useState<boolean>(true);
  const [retentionDays, setRetentionDays] = useState<string>('30');
  const [autoLockMinutes, setAutoLockMinutes] = useState<string>('15');

  const steps: StepConfig[] = [
    {
      id: 'welcome',
      tag: 'First Launch',
      title: 'Welcome to ChatBridge',
      subtitle: 'Carry useful context between ChatGPT, Claude, and Gemini with zero cloud storage.'
    },
    {
      id: 'platforms',
      tag: 'Step 1 of 4',
      title: 'Configure AI Platform Permissions',
      subtitle: 'Select which web AI interfaces ChatBridge is allowed to observe and assist.'
    },
    {
      id: 'retrieval',
      tag: 'Step 2 of 4',
      title: 'Set Retrieval Thresholds & Token Budget',
      subtitle: 'Control how many tokens are attached to prevent inflating your AI prompt limits.'
    },
    {
      id: 'triggers',
      tag: 'Step 3 of 4',
      title: 'Keyboard Shortcuts & Prompt Triggers',
      subtitle: 'Instantly summon previous dialogue turns directly from any AI input box.'
    },
    {
      id: 'privacy',
      tag: 'Step 4 of 4',
      title: 'Local Encryption & Sandbox Storage',
      subtitle: 'Verify your on-device encryption keys and local memory retention duration.'
    },
    {
      id: 'ready',
      tag: 'Setup Complete',
      title: 'Your Continuity Engine is Ready',
      subtitle: 'Your settings are saved locally in your browser sandbox.'
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      } else if (e.key === 'ArrowRight' && currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, steps.length]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    try {
      localStorage.setItem('chatbridge_onboarding_completed', 'true');
    } catch {
      // ignore
    }
    onComplete?.();
    onClose();
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem('chatbridge_onboarding_completed', 'true');
    } catch {
      // ignore
    }
    onClose();
  };

  const togglePlatform = (key: string) => {
    setEnabledPlatforms((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs font-sans animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="ChatBridge Extension Onboarding"
    >
      <div className="bg-white rounded-2xl border border-[#E5E5EA] max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#E5E5EA] flex items-center justify-between bg-[#FBFBFA]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3]" />
            <span className="text-xs font-semibold text-[#1D1D1F]">
              ChatBridge Configuration Guide
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDismiss}
              className="text-xs text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-md text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
              aria-label="Close"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Progress Bar */}
        <div className="px-6 pt-4 bg-white flex items-center gap-1.5">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              className="flex-1 py-1 group focus:outline-none"
              title={s.title}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'bg-[#0071E3]'
                    : idx < currentStep
                    ? 'bg-[#1D1D1F]'
                    : 'bg-[#E5E5EA]'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Carousel Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Step Header */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-medium tracking-wide uppercase text-[#0071E3] block">
              {steps[currentStep].tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
              {steps[currentStep].title}
            </h2>
            <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {/* Interactive Step Previews */}
          <div className="p-5 rounded-xl bg-[#FBFBFA] border border-[#E5E5EA] space-y-4">
            {/* Step 0: Welcome Overview */}
            {currentStep === 0 && (
              <div className="space-y-4 text-xs text-[#515154]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] space-y-1">
                    <span className="text-[10px] font-mono text-[#6E6E73] block uppercase">
                      1. Observe
                    </span>
                    <strong className="text-[#1D1D1F] block">Local Capture</strong>
                    <p className="text-[11px] text-[#6E6E73]">
                      Hooks into active DOM to index questions and responses directly in memory.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] space-y-1">
                    <span className="text-[10px] font-mono text-[#6E6E73] block uppercase">
                      2. Index
                    </span>
                    <strong className="text-[#1D1D1F] block">Hybrid Retrieval</strong>
                    <p className="text-[11px] text-[#6E6E73]">
                      Combines BM25 lexical search with vector embeddings on your CPU.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] space-y-1">
                    <span className="text-[10px] font-mono text-[#6E6E73] block uppercase">
                      3. Inject
                    </span>
                    <strong className="text-[#1D1D1F] block">Instant Continuity</strong>
                    <p className="text-[11px] text-[#6E6E73]">
                      Attaches concise prior turns into target prompt boxes without copy-pasting.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#F5F5F7] border border-[#E5E5EA] flex items-center gap-2.5">
                  <ShieldCheckIcon className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span className="text-[11px] text-[#1D1D1F]">
                    No account required. Conversations never touch ChatBridge servers or telemetry APIs.
                  </span>
                </div>
              </div>
            )}

            {/* Step 1: Platforms Configuration */}
            {currentStep === 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6E73] pb-1 border-b border-[#E5E5EA]">
                  <span>AI WEB APPLICATION</span>
                  <span>CAPTURE STATUS</span>
                </div>

                {[
                  { id: 'chatgpt', name: 'ChatGPT', domain: 'chatgpt.com', desc: 'OpenAI conversational interface' },
                  { id: 'claude', name: 'Claude', domain: 'claude.ai', desc: 'Anthropic Artifacts and chat interface' },
                  { id: 'gemini', name: 'Gemini', domain: 'gemini.google.com', desc: 'Google Gemini 2.5 and Workspace' },
                  { id: 'perplexity', name: 'Perplexity', domain: 'perplexity.ai', desc: 'Search and research citations' },
                  { id: 'cursor', name: 'Cursor / Web IDE', domain: 'localhost / web ide', desc: 'Code editor web terminals' }
                ].map((item) => {
                  const isChecked = enabledPlatforms[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => togglePlatform(item.id)}
                      className="p-3 rounded-lg bg-white border border-[#E5E5EA] flex items-center justify-between gap-3 cursor-pointer hover:border-[#D1D1D6] transition-all"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <strong className="text-xs text-[#1D1D1F]">{item.name}</strong>
                          <span className="text-[10px] font-mono text-[#86868B] bg-[#F5F5F7] px-1.5 py-0.2 rounded">
                            {item.domain}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6E6E73]">{item.desc}</p>
                      </div>

                      {/* Custom Toggle Switch */}
                      <div
                        className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 ${
                          isChecked ? 'bg-[#0071E3]' : 'bg-[#D1D1D6]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                            isChecked ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 2: Retrieval & Token Budget */}
            {currentStep === 2 && (
              <div className="space-y-4">
                {/* Max Context Tokens */}
                <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1D1D1F]">
                      Maximum Context Budget (Tokens)
                    </span>
                    <span className="font-mono font-bold text-[#0071E3]">{tokenBudget} tokens</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    step="25"
                    value={tokenBudget}
                    onChange={(e) => setTokenBudget(Number(e.target.value))}
                    className="w-full accent-[#0071E3] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#86868B]">
                    <span>100 tokens (Minimal snippet)</span>
                    <span>250 tokens (Recommended)</span>
                    <span>500 tokens (Detailed AST/Code)</span>
                  </div>
                </div>

                {/* Fusion k Parameter */}
                <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-[#1D1D1F] block">
                        RRF Fusion Sensitivity (k parameter)
                      </span>
                      <span className="text-[11px] text-[#6E6E73]">
                        Controls balance between dense semantic similarity and exact keywords.
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#1D1D1F]">k = {rrfKParam}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={rrfKParam}
                    onChange={(e) => setRrfKParam(Number(e.target.value))}
                    className="w-full accent-[#1D1D1F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#86868B]">
                    <span>k=20 (Favors exact matches)</span>
                    <span>k=60 (Paper standard)</span>
                    <span>k=100 (Smoother ranking)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Shortcuts & Inline Triggers */}
            {currentStep === 3 && (
              <div className="space-y-4">
                {/* Global Shortcut */}
                <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] flex items-center justify-between gap-3">
                  <div>
                    <strong className="text-xs text-[#1D1D1F] block">Continuity Command Palette</strong>
                    <p className="text-[11px] text-[#6E6E73]">
                      Global hotkey to search memory and inspect candidate context turns.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#F5F5F7] px-2.5 py-1.5 rounded-md border border-[#E5E5EA] font-mono text-xs font-semibold text-[#1D1D1F]">
                    {shortcutKey}
                  </div>
                </div>

                {/* Inline @past trigger */}
                <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] flex items-center justify-between gap-3">
                  <div>
                    <strong className="text-xs text-[#1D1D1F] block">In-Prompt `@past` Trigger</strong>
                    <p className="text-[11px] text-[#6E6E73]">
                      Type `@past` in any chat box to immediately attach recent turns.
                    </p>
                  </div>
                  <button
                    onClick={() => setInlineTrigger(!inlineTrigger)}
                    className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 ${
                      inlineTrigger ? 'bg-[#0071E3]' : 'bg-[#D1D1D6]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                        inlineTrigger ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Preview demonstration */}
                <div className="p-3 rounded-lg bg-[#F5F5F7] border border-[#E5E5EA] font-mono text-xs text-[#515154] space-y-1">
                  <span className="text-[10px] text-[#86868B] uppercase block">Interactive Example:</span>
                  <div className="bg-white p-2.5 rounded border border-[#E5E5EA] text-[#1D1D1F]">
                    Prompt: "Write a unit test for the authentication hook{' '}
                    <span className="text-[#0071E3] font-bold">@past</span>"
                  </div>
                  <span className="text-[10px] text-[#0071E3]">
                    ↳ ChatBridge attaches previous Claude Auth session (185 tokens)
                  </span>
                </div>
              </div>
            )}

            {/* Step 4: Privacy & Retention */}
            {currentStep === 4 && (
              <div className="space-y-4">
                {/* Retention Period */}
                <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-[#1D1D1F]">Local History Retention</strong>
                    <span className="font-mono text-xs text-[#0071E3]">
                      {retentionDays === 'forever' ? 'Never expire' : `${retentionDays} days`}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['7', '14', '30', 'forever'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setRetentionDays(opt)}
                        className={`py-1.5 text-xs font-mono rounded border transition-all ${
                          retentionDays === opt
                            ? 'bg-[#1D1D1F] border-[#1D1D1F] text-white font-medium'
                            : 'bg-white border-[#E5E5EA] text-[#6E6E73] hover:text-[#1D1D1F]'
                        }`}
                      >
                        {opt === 'forever' ? 'Forever' : `${opt}d`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-lock & Encryption */}
                <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] flex items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-[#1D1D1F] block">AES-256-GCM Encryption</strong>
                    <p className="text-[11px] text-[#6E6E73]">
                      Keys generated locally on your device in hardware-backed storage.
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#F5F5F7] border border-[#E5E5EA] text-[11px] font-mono text-[#1D1D1F] font-medium">
                    Enabled
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#E5E5EA] flex items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-[#1D1D1F] block">Idle Auto-Lock Timeout</strong>
                    <p className="text-[11px] text-[#6E6E73]">
                      Clears unencrypted search vectors from volatile memory after inactivity.
                    </p>
                  </div>
                  <select
                    value={autoLockMinutes}
                    onChange={(e) => setAutoLockMinutes(e.target.value)}
                    className="px-2 py-1 rounded border border-[#D1D1D6] bg-white text-xs font-mono text-[#1D1D1F]"
                  >
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 5: Ready / Finish */}
            {currentStep === 5 && (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F7] border border-[#E5E5EA] flex items-center justify-center text-[#0071E3] mx-auto">
                  <CheckIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[#1D1D1F]">Configuration Summary</h3>
                  <p className="text-xs text-[#515154] max-w-sm mx-auto">
                    You can modify any of these parameters at any time by clicking the extension icon in your Chrome toolbar.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left max-w-sm mx-auto pt-2">
                  <div className="p-2.5 rounded bg-white border border-[#E5E5EA] text-xs">
                    <span className="text-[10px] font-mono text-[#86868B] block">Active Platforms</span>
                    <strong className="text-[#1D1D1F]">
                      {Object.values(enabledPlatforms).filter(Boolean).length} enabled
                    </strong>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#E5E5EA] text-xs">
                    <span className="text-[10px] font-mono text-[#86868B] block">Token Budget</span>
                    <strong className="text-[#1D1D1F]">{tokenBudget} tokens max</strong>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#E5E5EA] text-xs">
                    <span className="text-[10px] font-mono text-[#86868B] block">Command Palette</span>
                    <strong className="text-[#1D1D1F]">{shortcutKey}</strong>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#E5E5EA] text-xs">
                    <span className="text-[10px] font-mono text-[#86868B] block">Storage Security</span>
                    <strong className="text-[#1D1D1F]">AES-256 Encrypted</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Controls */}
        <div className="px-6 py-4 border-t border-[#E5E5EA] bg-[#FBFBFA] flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-3.5 py-2 rounded-full border border-[#D1D1D6] bg-white hover:bg-[#F5F5F7] disabled:opacity-40 disabled:pointer-events-none text-xs text-[#1D1D1F] font-medium flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeftIcon className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="text-[11px] font-mono text-[#86868B]">
            {currentStep + 1} / {steps.length}
          </div>

          <button
            id="onboarding-next-btn"
            onClick={handleNext}
            className="px-5 py-2 rounded-full bg-[#1D1D1F] hover:bg-[#333336] text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>{currentStep === steps.length - 1 ? 'Finish & Explore' : 'Continue'}</span>
            {currentStep < steps.length - 1 && <ChevronRightIcon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
