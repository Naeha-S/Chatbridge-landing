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
import { OnboardingCarousel } from './components/OnboardingCarousel';
import { ConversionCTA } from './components/ConversionCTA';
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

  // Hash-based navigation support for SEO landing pages
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['how-it-works', 'features', 'privacy', 'local-privacy', 'guides'].includes(hash)) {
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
    <ToastProvider>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 ease-in-out bg-[#FBFBFA] dark:bg-[#040405] text-[#1D1D1F] dark:text-[#F5F5F7] selection:bg-[#0071E3] selection:text-white">
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

              {/* 7. Conversion CTA Banner with Originkit Prism Film */}
              <ConversionCTA
                isDarkMode={isDarkMode}
                onOpenInstall={() => setIsInstallOpen(true)}
                onExploreFeatures={() => {
                  setCurrentView('features');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

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
    </ToastProvider>
  );
}
