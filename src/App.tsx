import React, { useState, useEffect } from 'react';
import { PageView, GuideSlug } from './types';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { InteractiveDemo } from './components/InteractiveDemo';
import { FeaturesSection } from './components/FeaturesSection';
import { LocalPrivacyView } from './components/LocalPrivacyView';
import { BlogGuidesView } from './components/BlogGuidesView';
import { TargetUsersSection } from './components/TargetUsersSection';
import { Footer } from './components/Footer';
import { InstallModal } from './components/InstallModal';
import { FeedbackModal } from './components/FeedbackModal';
import { FeedbackWidget } from './components/FeedbackWidget';
import { ConversionCTA } from './components/ConversionCTA';
import { useGsapSmoothScroll, smoothScrollTo } from './hooks/useGsapSmoothScroll';
import { usePageSeo } from './hooks/usePageSeo';
import { ChatGPTToGeminiLanding } from './components/ChatGPTToGeminiLanding';
import { ComparisonPage } from './components/ComparisonPage';
import { FAQPage } from './components/FAQPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { SearchableHistoryView } from './components/SearchableHistoryView';
import { SubpageConnectors } from './components/SubpageConnectors';
import { TermsOfServiceView } from './components/TermsOfServiceView';
import { NotFoundView } from './components/NotFoundView';
import { ViewTransition } from './components/ViewTransition';
import { BreadcrumbBar } from './components/BreadcrumbBar';
import { SEOManager } from './components/SEOManager';

function AppContent() {
  useGsapSmoothScroll();
  const { isDark } = useTheme();

  const [currentView, setCurrentView] = useState<PageView>('home');
  const [activeGuideSlug, setActiveGuideSlug] = useState<GuideSlug>('chatgpt-to-claude');
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Dynamic SEO metadata, OpenGraph, Canonical, and Schema.org synchronization
  usePageSeo(currentView, activeGuideSlug);

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
          'terms',
          'guides',
        ].includes(hash)
      ) {
        setCurrentView(hash as PageView);
      } else if (hash === 'research') {
        setCurrentView('features');
      } else if (
        ['ai-conversation-memory', 'local-ai-memory', 'hybrid-retrieval-rrf'].includes(hash)
      ) {
        setCurrentView('guides');
        setActiveGuideSlug(hash as GuideSlug);
      } else if (hash && !['demo', 'pricing', 'features-list', 'layers-of-chatbridge'].includes(hash)) {
        setCurrentView('404');
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

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 bg-[#FBFBFA] dark:bg-[#040405] text-[#1D1D1F] dark:text-[#F5F5F7] selection:bg-[#0071E3] selection:text-white">
      {/* Headless Dynamic SEO Manager */}
      <SEOManager currentView={currentView} activeGuideSlug={activeGuideSlug} />

      {/* Top Global Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenInstall={() => setIsInstallOpen(true)}
      />

      {/* Breadcrumb Trail for Subpages */}
      <BreadcrumbBar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeGuideSlug={activeGuideSlug}
      />

      {/* Main Views */}
      <main className="flex-1">
        <ViewTransition viewKey={currentView}>
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenInstall={() => setIsInstallOpen(true)}
              onScrollToDemo={handleScrollToDemo}
              onExploreEngineering={() => {
                setCurrentView('how-it-works');
                smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
              }}
              isDarkMode={isDark}
            />

            {/* 2. Problem Section */}
            <ProblemSection />

            {/* 3. Interactive Demo Simulator */}
            <InteractiveDemo onOpenInstall={() => setIsInstallOpen(true)} />

            {/* 4. The 5 Layers of ChatBridge (System Strata & Subpage Connectors) */}
            <SubpageConnectors onNavigate={(view) => setCurrentView(view)} />

            {/* 5. Specialized Workflows */}
            <TargetUsersSection />

            {/* 6. Conversion CTA Banner with Originkit Prism Film */}
            <ConversionCTA
              isDarkMode={isDark}
              onOpenInstall={() => setIsInstallOpen(true)}
              onExploreFeatures={() => {
                setCurrentView('how-it-works');
                smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
              }}
            />
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
            <FeaturesSection isDarkMode={isDark} />
          </div>
        )}

        {(currentView === 'privacy' || currentView === 'local-privacy') && <LocalPrivacyView />}

        {currentView === 'terms' && (
          <TermsOfServiceView
            onNavigateHome={() => setCurrentView('home')}
            onNavigatePrivacy={() => setCurrentView('local-privacy')}
          />
        )}

        {currentView === 'guides' && (
          <BlogGuidesView
            initialSlug={activeGuideSlug}
            onOpenInstall={() => setIsInstallOpen(true)}
          />
        )}

        {currentView === '404' && (
          <NotFoundView onNavigate={(view) => setCurrentView(view)} />
        )}
        </ViewTransition>
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
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
