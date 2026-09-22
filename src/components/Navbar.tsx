import React, { useState } from 'react';
import { PageView } from '../types';
import { DownloadIcon, CloseIcon, SunIcon, MoonIcon } from './Icons';

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
  onOpenInstall,
  onOpenOnboarding,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const navItems: { label: string; view: PageView }[] = [
    { label: 'Overview', view: 'home' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'Features & Architecture', view: 'features' },
    { label: 'Local Privacy', view: 'local-privacy' },
    { label: 'Guides', view: 'guides' },
  ];

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E5EA]/60 dark:border-[#22222E]/60 bg-[#FBFBFA]/85 dark:bg-[#07070B]/85 backdrop-blur-xl shadow-xs transition-all duration-300 text-[#1D1D1F] dark:text-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left focus:outline-none group"
          >
            <span className="font-semibold text-sm tracking-tight text-[#1D1D1F] dark:text-white group-hover:opacity-85 transition-opacity">
              ChatBridge
            </span>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                id={`nav-${item.view}-btn`}
                onClick={() => handleNavClick(item.view)}
                className={`text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-[#1D1D1F] dark:text-white font-semibold'
                    : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Light/Dark Mode Switcher */}
          {onToggleTheme && (
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="relative p-2 rounded-xl border transition-all duration-300 border-[#D1D1D6]/80 dark:border-[#2E2E3E]/80 text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-[#F0F0F2] dark:hover:bg-[#1C1C2A] shadow-2xs group"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <SunIcon className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <MoonIcon className="w-4 h-4 text-[#515154] group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
          )}

          {/* Quick Tour Launcher */}
          {onOpenOnboarding && (
            <button
              id="nav-tour-btn"
              onClick={onOpenOnboarding}
              className="hidden sm:inline-flex items-center text-xs font-medium px-2.5 py-1.5 rounded-md border transition-colors text-[#515154] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white border-[#D1D1D6] dark:border-[#2E2E3E] hover:bg-[#F5F5F7] dark:hover:bg-[#181824]"
            >
              Quick Tour
            </button>
          )}

          {/* Install Primary Action */}
          <button
            id="nav-install-btn"
            onClick={onOpenInstall}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs bg-[#1D1D1F] dark:bg-white text-white dark:text-[#0A0A0D] hover:bg-[#333336] dark:hover:bg-[#F2F2F7] dark:font-semibold"
          >
            <DownloadIcon className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Add to Chrome</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md border transition-colors border-[#D1D1D6] dark:border-[#2E2E3E] text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-4 h-4" />
            ) : (
              <span className="w-4 h-4 flex flex-col justify-center gap-1">
                <span className="h-0.5 w-full bg-current rounded-full" />
                <span className="h-0.5 w-full bg-current rounded-full" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b px-4 py-4 space-y-2 backdrop-blur-md bg-[#FBFBFA] dark:bg-[#0E0E16] border-[#E5E5EA] dark:border-[#22222E]">
          {navItems.map((item) => (
            <button
              key={item.view}
              id={`mobile-nav-${item.view}-btn`}
              onClick={() => handleNavClick(item.view)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentView === item.view
                  ? 'bg-[#F0F0F2] dark:bg-[#1E1E2C] text-[#1D1D1F] dark:text-white font-semibold'
                  : 'text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#181824]'
              }`}
            >
              {item.label}
            </button>
          ))}
          {onOpenOnboarding && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOnboarding();
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-[#6E6E73] dark:text-[#8E8E98] hover:text-[#1D1D1F] dark:hover:text-white"
            >
              Take 1-Minute Interactive Tour
            </button>
          )}
        </div>
      )}
    </header>
  );
};
