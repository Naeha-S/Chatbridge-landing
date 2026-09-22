import React, { useState, useEffect } from 'react';
import { PageView, GuideSlug } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { InteractiveDemo } from './components/InteractiveDemo';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { PrivacyView } from './components/PrivacyView';
import { BlogGuidesView } from './components/BlogGuidesView';
import { TargetUsersSection } from './components/TargetUsersSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { InstallModal } from './components/InstallModal';
import { FeedbackModal } from './components/FeedbackModal';
import { FeedbackWidget } from './components/FeedbackWidget';
import { OnboardingCarousel } from './components/OnboardingCarousel';
import { DownloadIcon, ArrowRightIcon } from './components/Icons';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('chatbridge_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'dark'; // Base in dark mode
  });
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [activeGuideSlug, setActiveGuideSlug] = useState<GuideSlug>('chatgpt-to-claude');
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('chatbridge_theme', next);
      } catch {}
      return next;
    });
  };

  // Sync dark class on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // First-launch walkthrough check
  useEffect(() => {
    try {
      const hasCompleted = localStorage.getItem('chatbridge_onboarding_completed');
      if (!hasCompleted) {
        // Open onboarding guide for first launch
        const timer = setTimeout(() => {
          setIsOnboardingOpen(true);
        }, 750);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be restricted in sandboxes
    }
  }, []);

  // Hash-based navigation support for SEO landing pages
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['how-it-works', 'features', 'privacy', 'guides'].includes(hash)) {
        setCurrentView(hash as PageView);
      } else if (hash === 'research') {
        // Graceful redirect away from deprecated research hash to engineering details
        setCurrentView('features');
      } else if (
        ['chatgpt-to-claude', 'chatgpt-to-gemini', 'ai-conversation-memory', 'local-ai-memory', 'hybrid-retrieval-rrf'].includes(hash)
      ) {
        setCurrentView('guides');
        setActiveGuideSlug(hash as GuideSlug);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleScrollToDemo = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const demoEl = document.getElementById('demo');
        if (demoEl) {
          demoEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const demoEl = document.getElementById('demo');
      if (demoEl) {
        demoEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDarkMode ? 'bg-[#040405] text-[#F5F5F7] selection:bg-[#2997FF] selection:text-white' : 'bg-[#FBFBFA] text-[#1D1D1F] selection:bg-[#0071E3] selection:text-white'
    }`}>
      {/* Top Global Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenInstall={() => setIsInstallOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenInstall={() => setIsInstallOpen(true)}
              onScrollToDemo={handleScrollToDemo}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
              onExploreEngineering={() => setCurrentView('features')}
              isDarkMode={isDarkMode}
            />

            {/* 2. Problem Section */}
            <ProblemSection />

            {/* 3. Interactive Demo Simulator */}
            <InteractiveDemo onOpenInstall={() => setIsInstallOpen(true)} />

            {/* 4. How It Works Pipeline */}
            <HowItWorks />

            {/* 5. Deep Technical Features with Hybrid Retrieval Diagram */}
            <FeaturesSection isDarkMode={isDarkMode} />

            {/* 6. Target Users */}
            <TargetUsersSection />

            {/* 7. Clean Conversion CTA Banner */}
            <section className={`py-20 md:py-28 border-y transition-colors ${
              isDarkMode ? 'bg-[#0A0A0E] border-[#22222A]' : 'bg-[#F5F5F7] border-[#E5E5EA]'
            }`}>
              <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
                <span className={`text-xs font-mono font-medium tracking-wide uppercase ${
                  isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'
                }`}>
                  Cross-Assistant Continuity
                </span>
                <h2 className={`text-3xl sm:text-5xl font-semibold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-[#1D1D1F]'
                }`}>
                  Stop explaining yourself to AI.
                </h2>
                <p className={`text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${
                  isDarkMode ? 'text-[#A1A1A6]' : 'text-[#515154]'
                }`}>
                  Carry useful context across ChatGPT, Claude, and Gemini without repeatedly starting from zero.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    id="cta-bottom-install-btn"
                    onClick={() => setIsInstallOpen(true)}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                      isDarkMode
                        ? 'bg-white hover:bg-[#EBEBED] text-[#0A0A0D]'
                        : 'bg-[#1D1D1F] hover:bg-[#333336] text-white'
                    }`}
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Add ChatBridge to Chrome</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('features');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-colors ${
                      isDarkMode
                        ? 'bg-[#16161D] hover:bg-[#202028] border-[#2C2C38] text-white'
                        : 'bg-white hover:bg-[#E5E5EA] border-[#D1D1D6] text-[#1D1D1F]'
                    }`}
                  >
                    <span>Explore Engineering Details</span>
                    <ArrowRightIcon className={`w-3 h-3 ${isDarkMode ? 'text-[#8E8E93]' : 'text-[#6E6E73]'}`} />
                  </button>
                </div>
                <div className={`text-[11px] font-mono pt-2 ${
                  isDarkMode ? 'text-[#6E6E75]' : 'text-[#86868B]'
                }`}>
                  100% Local-First • Encrypted with AES-256-GCM • Zero Cloud Dependencies
                </div>
              </div>
            </section>

            {/* 8. Frequently Asked Questions */}
            <FAQSection />
          </>
        )}

        {currentView === 'how-it-works' && (
          <div className="space-y-4">
            <HowItWorks />
            <InteractiveDemo onOpenInstall={() => setIsInstallOpen(true)} />
          </div>
        )}

        {currentView === 'features' && (
          <div>
            <FeaturesSection isDarkMode={isDarkMode} />
          </div>
        )}

        {currentView === 'privacy' && <PrivacyView />}

        {currentView === 'guides' && (
          <BlogGuidesView
            initialSlug={activeGuideSlug}
            onOpenInstall={() => setIsInstallOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenInstall={() => setIsInstallOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Unobtrusive Floating Feedback Widget */}
      <FeedbackWidget />

      {/* Chrome Web Store Install Modal */}
      <InstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Contact & Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* First-Launch Extension Onboarding Carousel */}
      <OnboardingCarousel
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
}
