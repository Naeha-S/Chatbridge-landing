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
    { label: 'Engineering Details', view: 'features' },
    { label: 'Privacy', view: 'privacy' },
    { label: 'Guides', view: 'guides' },
  ];

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
      isDark
        ? 'border-[#222228] bg-[#0A0A0D]/90 text-white'
        : 'border-[#E5E5EA] bg-[#FBFBFA]/90 text-[#1D1D1F]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left focus:outline-none"
          >
            <span className={`font-semibold text-sm tracking-tight ${isDark ? 'text-white' : 'text-[#1D1D1F]'}`}>
              ChatBridge
            </span>
            <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded border ${
              isDark ? 'text-[#8E8E93] bg-[#16161B] border-[#2C2C35]' : 'text-[#6E6E73] bg-[#F5F5F7] border-[#E5E5EA]'
            }`}>
              v0.4.2
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
                id={`nav-link-${item.view}`}
                onClick={() => handleNavClick(item.view)}
                className={`text-xs font-normal transition-colors py-1 ${
                  isActive
                    ? isDark ? 'text-white font-medium' : 'text-[#1D1D1F] font-medium'
                    : isDark ? 'text-[#8E8E93] hover:text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              id="nav-theme-toggle-btn"
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-colors ${
                isDark
                  ? 'border-[#2C2C35] bg-[#16161B] text-[#F3F4F6] hover:bg-[#22222B]'
                  : 'border-[#E5E5EA] bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#EBEBED]'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle visual theme"
            >
              {isDark ? (
                <SunIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
              ) : (
                <MoonIcon className="w-3.5 h-3.5 text-[#6366F1]" />
              )}
            </button>
          )}

          {onOpenOnboarding && (
            <button
              id="nav-setup-guide-btn"
              onClick={onOpenOnboarding}
              className={`hidden sm:inline-flex items-center text-xs font-normal px-2.5 py-1 transition-colors ${
                isDark ? 'text-[#8E8E93] hover:text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              Setup Guide
            </button>
          )}

          <button
            id="nav-add-to-chrome-btn"
            onClick={onOpenInstall}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              isDark
                ? 'bg-white hover:bg-[#EBEBED] text-[#0A0A0D]'
                : 'bg-[#1D1D1F] hover:bg-[#333336] text-white'
            }`}
          >
            <DownloadIcon className="w-3.5 h-3.5" />
            <span>Add to Chrome</span>
          </button>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 rounded focus:outline-none ${
              isDark ? 'text-white hover:bg-[#1C1C22]' : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
            }`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-4 h-4" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5H15M3 9H15M3 13H15" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-3 space-y-1 ${
          isDark ? 'border-[#222228] bg-[#0E0E12]' : 'border-[#E5E5EA] bg-[#FBFBFA]'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`block w-full text-left px-3 py-2 text-sm rounded ${
                currentView === item.view
                  ? isDark ? 'bg-[#1D1D24] text-white font-medium' : 'bg-[#F5F5F7] text-[#1D1D1F] font-medium'
                  : isDark ? 'text-[#8E8E93] hover:bg-[#16161B] hover:text-white' : 'text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className={`pt-2 border-t flex flex-col gap-2 ${isDark ? 'border-[#222228]' : 'border-[#E5E5EA]'}`}>
            {onOpenOnboarding && (
              <button
                onClick={() => {
                  onOpenOnboarding();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-sm text-[#0071E3] font-medium hover:underline"
              >
                Configuration Guide (First Launch)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
