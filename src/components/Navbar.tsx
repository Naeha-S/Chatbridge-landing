import React, { useState } from 'react';
import { PageView } from '../types';
import { DownloadIcon, CloseIcon, SunIcon, MoonIcon } from './Icons';
import { CHROME_WEBSTORE_URL } from '../constants/links';
import { smoothScrollTo } from '../hooks/useGsapSmoothScroll';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  onOpenInstall: () => void;
  onOpenOnboarding?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems: { label: string; view: PageView }[] = [
    { label: 'Overview', view: 'home' },
    { label: 'History Vault', view: 'history' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'Compare', view: 'comparison' },
    { label: 'FAQ', view: 'faq' },
    { label: 'Privacy', view: 'local-privacy' },
    { label: 'Guides', view: 'guides' },
  ];

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    smoothScrollTo(document.body, { offset: 0, duration: 0.65 });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full liquid-glass-nav transition-colors duration-200 text-[#1D1D1F] dark:text-[#F5F5F7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              id="nav-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-lg p-0.5 cursor-pointer"
              aria-label="ChatBridge Homepage"
            >
              <img src="/logo.png" alt="ChatBridge" className="w-6.5 h-6.5 object-contain" width={26} height={26} />
              <span className="font-semibold text-sm tracking-tight text-[#1D1D1F] dark:text-white group-hover:opacity-85 transition-opacity">
                ChatBridge
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-link-${item.view}`}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#0071E3] dark:text-[#2997FF] bg-[#0071E3]/10 dark:bg-[#2997FF]/10 font-semibold shadow-2xs backdrop-blur-md scale-[1.02]'
                      : 'text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:scale-105 hover:backdrop-blur-md active:scale-95'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Theme Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Global Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="relative flex items-center p-0.5 rounded-full border transition-all duration-300 border-[#E5E5EA] dark:border-[#2A2A38] bg-[#F2F2F5]/80 dark:bg-[#12121A]/80 hover:border-[#D1D1D6] dark:hover:border-[#3A3A4C] shadow-2xs backdrop-blur-xs cursor-pointer"
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                  !isDark
                    ? 'bg-white text-[#1D1D1F] shadow-xs scale-100 font-semibold'
                    : 'text-[#8E8E98] hover:text-[#C7C7CC] scale-90 opacity-70'
                }`}
              >
                <SunIcon className="w-3.5 h-3.5 text-current" />
              </span>
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                  isDark
                    ? 'bg-[#262638] text-white shadow-xs scale-100 font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F] scale-90 opacity-70'
                }`}
              >
                <MoonIcon className="w-3.5 h-3.5 text-current" />
              </span>
            </button>

            {/* Install Primary Action - Working Chrome Web Store Link */}
            <a
              id="nav-install-btn"
              href={CHROME_WEBSTORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs bg-[#1D1D1F] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950"
            >
              <DownloadIcon className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#0071E3]" />
              <span className="text-white dark:text-neutral-950 font-semibold">Add to Chrome</span>
            </a>

            {/* Mobile Menu Hamburger Trigger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl border transition-all border-[#D1D1D6] dark:border-[#2E2E3E] bg-white/60 dark:bg-black/40 backdrop-blur-md text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <span className="w-4 h-4 flex flex-col justify-center gap-1">
                <span className="h-0.5 w-full bg-current rounded-full" />
                <span className="h-0.5 w-full bg-current rounded-full" />
                <span className="h-0.5 w-full bg-current rounded-full" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Out Liquid-Glass Mobile Hamburger Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Liquid-Glass Drawer */}
          <div className="relative z-10 w-80 max-w-[85vw] h-full liquid-glass-panel backdrop-blur-2xl bg-white/90 dark:bg-[#07070D]/95 border-l border-neutral-200/80 dark:border-white/15 p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 text-[#1D1D1F] dark:text-white">
            {/* Drawer Header */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="ChatBridge" className="w-6.5 h-6.5 object-contain" width={26} height={26} />
                  <span className="font-bold text-base tracking-tight text-[#1D1D1F] dark:text-white">
                    ChatBridge
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5" aria-label="Mobile Navigation">
                {navItems.map((item) => {
                  const isActive = currentView === item.view;
                  return (
                    <button
                      key={item.view}
                      onClick={() => handleNavClick(item.view)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'text-[#0071E3] dark:text-[#2997FF] bg-[#0071E3]/10 dark:bg-[#2997FF]/10 font-bold border border-[#0071E3]/20 dark:border-[#2997FF]/20'
                          : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="space-y-4 pt-6 border-t border-neutral-200/80 dark:border-white/10">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  {isDark ? (
                    <>
                      <MoonIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <SunIcon className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light Mode</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={CHROME_WEBSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md bg-[#1D1D1F] hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950"
              >
                <DownloadIcon className="w-4 h-4 text-[#0071E3] dark:text-[#0071E3]" />
                <span className="text-white dark:text-neutral-950 font-bold">Add to Chrome (Free)</span>
              </a>

              <p className="text-[10px] font-mono text-center text-neutral-400">
                100% Client-Side WebCrypto Encryption
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
