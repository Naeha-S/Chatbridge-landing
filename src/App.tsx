import React, { useState, useEffect } from 'react';
import { PageView, GuideSlug } from './types';
import { colors, spacing, typography } from './theme';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { InteractiveDemo } from './components/InteractiveDemo';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { PrivacyView } from './components/PrivacyView';
import { LocalPrivacyView } from './components/LocalPrivacyView';
import { BlogGuidesView } from './components/BlogGuidesView';
import { TargetUsersSection } from './components/TargetUsersSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { InstallModal } from './components/InstallModal';
import { FeedbackModal } from './components/FeedbackModal';
import { FeedbackWidget } from './components/FeedbackWidget';
import { ConversionCTA } from './components/ConversionCTA';
import { DownloadIcon, ArrowRightIcon } from './components/Icons';
import { useGsapSmoothScroll, smoothScrollTo } from './hooks/useGsapSmoothScroll';
import { usePageSeo } from './hooks/usePageSeo';
import { ChatGPTToGeminiLanding } from './components/ChatGPTToGeminiLanding';
import { ComparisonPage } from './components/ComparisonPage';
import { FAQPage } from './components/FAQPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { SearchableHistoryView } from './components/SearchableHistoryView';
import TabsDemo from './components/tabs-demo';
import { IconSearch } from '@tabler/icons-react';

export default function App() {
  useGsapSmoothScroll();

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

  // Dynamic SEO metadata, OpenGraph, Canonical, and Schema.org synchronization
  usePageSeo(currentView, activeGuideSlug);

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

  // Hash-based navigation support for SEO landing pages
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (
        [
          'how-it-works',
          'chatgpt-to-claude',
          'chatgpt-to-gemini',
          'comparison',
          'supported-platforms',
          'faq',
          'features',
          'privacy',
          'local-privacy',
          'guides',
        ].includes(hash)
      ) {
        setCurrentView(hash as PageView);
      } else if (hash === 'research') {
        // Graceful redirect away from deprecated research hash to engineering details
        setCurrentView('features');
      } else if (
        ['ai-conversation-memory', 'local-ai-memory', 'hybrid-retrieval-rrf'].includes(hash)
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
        smoothScrollTo('#demo', { offset: 70, duration: 0.9 });
      }, 100);
    } else {
      smoothScrollTo('#demo', { offset: 70, duration: 0.9 });
    }
  };

  const isDarkMode = theme === 'dark';

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 ease-in-out bg-[#FBFBFA] dark:bg-[#040405] text-[#1D1D1F] dark:text-[#F5F5F7] selection:bg-[#0071E3] selection:text-white">
        {/* Top Global Navigation */}
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          onOpenInstall={() => setIsInstallOpen(true)}
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
                onExploreEngineering={() => setCurrentView('features')}
                isDarkMode={isDarkMode}
              />

              {/* 2. Problem Section */}
              <ProblemSection />

              {/* 3. Interactive Demo Simulator */}
              <InteractiveDemo onOpenInstall={() => setIsInstallOpen(true)} />

              {/* Context History & Memory Vault Preview Bar */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 my-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-[#0071E3]/25 dark:border-[#2997FF]/25 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#0071E3] text-white flex items-center justify-center shrink-0 shadow-md">
                      <IconSearch className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1D1D1F] dark:text-white">
                        Searchable Context History & Injection Vault
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Find and preview encrypted past conversation segments before choosing which model to inject them into.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentView('history');
                      smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shrink-0 shadow-xs transition-colors"
                  >
                    <span>Open History Vault</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4. Technical Architecture: How Continuity Works */}
              <section id="architecture" className="py-16 md:py-24 border-b border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-3xl mx-auto mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#2997FF] font-semibold">
                      Technical Architecture
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] mt-2">
                      How Continuity Works
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-[#86868B] max-w-2xl mx-auto">
                      Explore the 5-stage client-side pipeline: observation, hybrid RRF vector indexing, hardware AES-256 encryption, token compression, and cross-model injection.
                    </p>
                  </div>
                  <TabsDemo />
                </div>
              </section>

              {/* 5. Deep Technical Features with Hybrid Retrieval Diagram */}
              <FeaturesSection isDarkMode={isDarkMode} />

              {/* 6. Target Users */}
              <TargetUsersSection />

              {/* 7. Conversion CTA Banner with Originkit Prism Film */}
              <ConversionCTA
                isDarkMode={isDarkMode}
                onOpenInstall={() => setIsInstallOpen(true)}
                onExploreFeatures={() => {
                  setCurrentView('features');
                  smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
                }}
              />

              {/* 8. Frequently Asked Questions */}
              <FAQSection />
            </>
          )}

          {currentView === 'history' && (
            <SearchableHistoryView
              onOpenInstall={() => setIsInstallOpen(true)}
              onNavigateHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'how-it-works' && (
            <HowItWorksPage
              onOpenInstall={() => setIsInstallOpen(true)}
              onNavigateHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'chatgpt-to-gemini' && (
            <ChatGPTToGeminiLanding
              onOpenInstall={() => setIsInstallOpen(true)}
              onNavigateHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'comparison' && (
            <ComparisonPage
              onOpenInstall={() => setIsInstallOpen(true)}
              onNavigateHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'faq' && (
            <FAQPage
              onOpenInstall={() => setIsInstallOpen(true)}
              onNavigateHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'features' && (
            <div>
              <FeaturesSection isDarkMode={isDarkMode} />
            </div>
          )}

          {(currentView === 'privacy' || currentView === 'local-privacy') && <LocalPrivacyView />}

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
        />

        {/* Unobtrusive Floating Feedback Widget */}
        <FeedbackWidget />

        {/* Chrome Web Store Install Modal */}
        <InstallModal
          isOpen={isInstallOpen}
          onClose={() => setIsInstallOpen(false)}
        />

        {/* Contact & Feedback Modal */}
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}
