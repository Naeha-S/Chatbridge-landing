import type { Variants, Transition } from 'framer-motion';

/**
 * ChatBridge Theme System
 * Exact constants corresponding to CSS variables and system properties defined in /src/index.css
 */

export const colors = {
  // Raw hex codes from src/index.css
  light: {
    bgPage: '#FBFBFA',
    bgSurface: '#FFFFFF',
    bgSubtle: '#F5F5F7',
    bgElevated: '#EBEBED',
    borderSubtle: '#E5E5EA',
    borderStrong: '#D1D1D6',
    textPrimary: '#1D1D1F',
    textSecondary: '#6E6E73',
    textTertiary: '#86868B',
    textBody: '#515154',
    textCode: '#333336',
    accent: '#0071E3',
    accentHover: '#0077ED',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
  },
  dark: {
    bgPage: '#040405',
    bgSurface: '#0E0E12',
    bgSubtle: '#14141A',
    bgElevated: '#1D1D26',
    borderSubtle: '#22222A',
    borderStrong: '#2D2D38',
    textPrimary: '#F5F5F7',
    textSecondary: '#8E8E93',
    textTertiary: '#6E6E75',
    textBody: '#A1A1A6',
    textCode: '#E5E5EA',
    accent: '#2997FF',
    accentHover: '#0071E3',
    success: '#30D158',
    danger: '#FF453A',
    warning: '#FF9F0A',
  },
  // Dynamic CSS-variable class mappings
  appBg: 'bg-[#FBFBFA] dark:bg-[#040405]',
  surfaceBg: 'bg-white dark:bg-[#0E0E12]',
  subtleBg: 'bg-[#F5F5F7] dark:bg-[#14141A]',
  elevatedBg: 'bg-[#EBEBED] dark:bg-[#1D1D26]',
  borderSubtle: 'border-[#E5E5EA] dark:border-[#22222A]',
  borderStrong: 'border-[#D1D1D6] dark:border-[#2D2D38]',
  textPrimary: 'text-[#1D1D1F] dark:text-[#F5F5F7]',
  textSecondary: 'text-[#6E6E73] dark:text-[#8E8E93]',
  textTertiary: 'text-[#86868B] dark:text-[#6E6E75]',
  textBody: 'text-[#515154] dark:text-[#A1A1A6]',
  textCode: 'text-[#333336] dark:text-[#E5E5EA]',
  accentText: 'text-[#0071E3] dark:text-[#2997FF]',
  accentBg: 'bg-[#0071E3] dark:bg-[#2997FF]',
  accentHoverBg: 'hover:bg-[#0077ED] dark:hover:bg-[#0071E3]',
  selection: 'selection:bg-[#0071E3] selection:text-white dark:selection:bg-[#2997FF] dark:selection:text-white',
} as const;

export const spacing = {
  container: 'max-w-6xl mx-auto px-4 sm:px-6',
  containerNarrow: 'max-w-5xl mx-auto px-4 sm:px-6',
  containerWide: 'max-w-7xl mx-auto px-4 sm:px-6',
  sectionPadding: 'py-20 md:py-28',
  sectionPaddingLarge: 'py-24 md:py-32',
  cardPadding: 'p-6 sm:p-8',
  cardPaddingCompact: 'p-4 sm:p-6',
  radiusOuter: 'rounded-3xl',
  radiusCard: 'rounded-2xl',
  radiusPill: 'rounded-full',
  radiusInner: 'rounded-xl',
  gapSmall: 'gap-2',
  gapMedium: 'gap-4',
  gapLarge: 'gap-6',
} as const;

export const typography = {
  eyebrow: 'text-xs font-mono font-medium tracking-wide uppercase',
  displayH1: 'text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08]',
  sectionH2: 'text-3xl sm:text-4xl font-semibold tracking-tight leading-tight',
  cardH3: 'text-lg sm:text-xl font-semibold tracking-tight',
  subheading: 'text-base sm:text-lg leading-relaxed max-w-2xl',
  body: 'text-sm sm:text-base leading-relaxed',
  caption: 'text-xs leading-normal',
  code: 'font-mono text-xs',
} as const;

/**
 * Apple-grade precision easing curves and motion presets
 */
export const MOTION_EASING = {
  appleEase: [0.16, 1, 0.3, 1] as [number, number, number, number],
  quickEase: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  subtleDecel: [0, 0, 0.2, 1] as [number, number, number, number],
};

export const MOTION_TRANSITIONS = {
  appleDefault: {
    duration: 0.45,
    ease: MOTION_EASING.appleEase,
  } as Transition,
  appleFast: {
    duration: 0.3,
    ease: MOTION_EASING.appleEase,
  } as Transition,
  appleSmooth: {
    duration: 0.55,
    ease: MOTION_EASING.appleEase,
  } as Transition,
};

export const MOTION_VARIANTS = {
  containerStagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      }
    }
  } as Variants,

  itemFadeInUp: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: MOTION_EASING.appleEase,
      }
    }
  } as Variants,

  fadeInUp: {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: MOTION_EASING.appleEase,
      }
    }
  } as Variants,

  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: MOTION_EASING.quickEase,
      }
    }
  } as Variants,

  cardScaleReveal: {
    hidden: { opacity: 0, y: 18, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: MOTION_EASING.appleEase,
      }
    }
  } as Variants,

  tabContentFade: {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: MOTION_EASING.quickEase,
      }
    },
    exit: {
      opacity: 0,
      y: -6,
      transition: {
        duration: 0.2,
        ease: MOTION_EASING.quickEase,
      }
    }
  } as Variants,
};

// Aliases for backwards compatibility with previous imports
export const THEME_COLORS = colors;
export const SPACING = spacing;
export const TYPOGRAPHY = typography;
