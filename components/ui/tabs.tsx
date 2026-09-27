"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

export type Tab = {
  title: string;
  value: string;
  shortTitle?: string;
  stageNumber?: string;
  content?: React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  autoLoop = true,
  intervalMs = 5000,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  autoLoop?: boolean;
  intervalMs?: number;
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeTab = propTabs[activeIdx] || propTabs[0];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % propTabs.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + propTabs.length) % propTabs.length);
    setProgress(0);
  };

  const handleSelectTab = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
    setIsUserInteracting(true);
    const timeout = setTimeout(() => setIsUserInteracting(false), 12000);
    return () => clearTimeout(timeout);
  };

  // Smooth auto-loop interval
  useEffect(() => {
    if (!autoLoop || isPaused || isUserInteracting) return;

    const intervalStep = 50;
    const totalSteps = intervalMs / intervalStep;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress(Math.min((step / totalSteps) * 100, 100));

      if (step >= totalSteps) {
        step = 0;
        setProgress(0);
        setActiveIdx((prev) => (prev + 1) % propTabs.length);
      }
    }, intervalStep);

    return () => clearInterval(timer);
  }, [autoLoop, isPaused, isUserInteracting, propTabs.length, intervalMs]);

  return (
    <div
      className="relative w-full flex flex-col"
      onMouseEnter={() => setIsUserInteracting(true)}
      onMouseLeave={() => setIsUserInteracting(false)}
    >
      {/* Controls & Tab Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 w-full">
        {/* Horizontal Scrollable Tabs */}
        <div
          role="tablist"
          aria-label="Continuity Architecture Stages"
          className={cn(
            "flex items-center gap-1.5 p-1.5 rounded-xl sm:rounded-full bg-neutral-100/90 dark:bg-[#12121A] border border-neutral-200/80 dark:border-white/10 backdrop-blur-md overflow-x-auto no-visible-scrollbar w-full md:w-auto shadow-xs",
            containerClassName
          )}
        >
          {propTabs.map((tab, idx) => {
            const isCurrent = activeIdx === idx;
            return (
              <button
                key={tab.value}
                role="tab"
                id={`arch-tab-${tab.value}`}
                aria-selected={isCurrent}
                aria-controls={`arch-tabpanel-${tab.value}`}
                onClick={() => handleSelectTab(idx)}
                className={cn(
                  "relative px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-full text-xs font-medium transition-all duration-200 shrink-0 select-none flex items-center gap-2",
                  isCurrent
                    ? "text-[#1D1D1F] dark:text-white font-semibold"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5",
                  tabClassName
                )}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="activeArchitectureTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    className={cn(
                      "absolute inset-0 bg-white dark:bg-[#1E1E2C] rounded-lg sm:rounded-full shadow-xs border border-neutral-200/90 dark:border-white/15",
                      activeTabClassName
                    )}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      isCurrent
                        ? "bg-[#0071E3] dark:bg-[#2997FF]"
                        : "bg-neutral-300 dark:bg-neutral-700"
                    )}
                  />
                  <span className="hidden sm:inline">{tab.title}</span>
                  <span className="sm:hidden">{tab.shortTitle || tab.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Auto-Loop Status & Step Controls */}
        <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 px-3 py-1.5 rounded-xl sm:rounded-full bg-neutral-100/90 dark:bg-[#12121A] border border-neutral-200/80 dark:border-white/10 text-xs font-mono backdrop-blur-md self-stretch md:self-auto shadow-xs">
          {/* Pause / Play Loop */}
          <div className="flex items-center gap-1.5 pr-2 border-r border-neutral-200 dark:border-white/10">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 transition-colors"
              title={isPaused ? "Resume auto-loop" : "Pause auto-loop"}
              aria-label={isPaused ? "Resume auto-loop" : "Pause auto-loop"}
            >
              {isPaused ? (
                <IconPlayerPlay className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <IconPlayerPause className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" />
              )}
            </button>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 select-none">
              {isPaused ? "Paused" : isUserInteracting ? "Interacting" : "Looping"}
            </span>
          </div>

          {/* Stepper Chevrons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 transition-colors active:scale-95"
              title="Previous Architecture Stage"
              aria-label="Previous Architecture Stage"
            >
              <IconChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-neutral-600 dark:text-neutral-400 px-1 font-mono font-medium">
              {activeIdx + 1} / {propTabs.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 transition-colors active:scale-95"
              title="Next Architecture Stage"
              aria-label="Next Architecture Stage"
            >
              <IconChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Loop Progress Indicator */}
          <div className="w-14 h-1 bg-neutral-200 dark:bg-white/10 rounded-full overflow-hidden ml-1 hidden sm:block">
            <div
              className="h-full bg-[#0071E3] dark:bg-[#2997FF] rounded-full transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Active Tab Panel with Smooth Crossfade & Guaranteed Natural Height */}
      <div
        role="tabpanel"
        id={`arch-tabpanel-${activeTab.value}`}
        aria-labelledby={`arch-tab-${activeTab.value}`}
        className={cn("w-full relative min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex flex-col", contentClassName)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="w-full flex-1 flex flex-col"
          >
            {activeTab.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
