"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
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
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  autoLoop = true,
  intervalMs = 4500,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  autoLoop?: boolean;
  intervalMs?: number;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
    setProgress(0);
  };

  const handleNext = () => {
    const currentIdx = propTabs.findIndex((t) => t.value === active.value);
    const nextIdx = (currentIdx + 1) % propTabs.length;
    moveSelectedTabToTop(nextIdx);
  };

  const handlePrev = () => {
    const currentIdx = propTabs.findIndex((t) => t.value === active.value);
    const prevIdx = (currentIdx - 1 + propTabs.length) % propTabs.length;
    moveSelectedTabToTop(prevIdx);
  };

  // Auto-looping timer cycling images and stages
  useEffect(() => {
    if (!autoLoop || isPaused || hovering) return;

    const intervalStep = 60;
    const totalSteps = intervalMs / intervalStep;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress(Math.min((step / totalSteps) * 100, 100));

      if (step >= totalSteps) {
        step = 0;
        setProgress(0);
        setActive((currentActive) => {
          const currentIdx = propTabs.findIndex((t) => t.value === currentActive.value);
          const nextIdx = (currentIdx + 1) % propTabs.length;
          const newTabs = [...propTabs];
          const selectedTab = newTabs.splice(nextIdx, 1);
          newTabs.unshift(selectedTab[0]);
          setTabs(newTabs);
          return newTabs[0];
        });
      }
    }, intervalStep);

    return () => clearInterval(timer);
  }, [autoLoop, isPaused, hovering, propTabs, intervalMs]);

  const activeIndex = propTabs.findIndex((t) => t.value === active.value);

  return (
    <div
      className="relative w-full flex flex-col"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Top Header Row with Tabs and Auto-Loop Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 w-full">
        {/* Tab Buttons */}
        <div
          className={cn(
            "flex flex-row items-center justify-start [perspective:1000px] relative overflow-x-auto no-visible-scrollbar max-w-full gap-1 p-1 rounded-full bg-neutral-200/60 dark:bg-white/5 border border-neutral-300/70 dark:border-white/10 backdrop-blur-md",
            containerClassName
          )}
        >
          {propTabs.map((tab, idx) => {
            const isCurrent = active.value === tab.value;
            return (
              <button
                key={tab.title}
                onClick={() => moveSelectedTabToTop(idx)}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0",
                  isCurrent
                    ? "text-neutral-900 dark:text-white font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white",
                  tabClassName
                )}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="clickedbutton"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    className={cn(
                      "absolute inset-0 bg-white dark:bg-neutral-800 rounded-full shadow-sm border border-neutral-200/80 dark:border-white/10",
                      activeTabClassName
                    )}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: isCurrent ? "#0071E3" : "transparent",
                    }}
                  />
                  {tab.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Auto-Loop Status & Interactive Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 px-2.5 py-1 rounded-full bg-neutral-200/60 dark:bg-white/5 border border-neutral-300/70 dark:border-white/10 text-xs font-mono backdrop-blur-md">
          <div className="flex items-center gap-1 pr-1.5 border-r border-neutral-300 dark:border-white/10">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 transition-colors"
              title={isPaused ? "Resume auto-loop" : "Pause auto-loop"}
              aria-label={isPaused ? "Resume auto-loop" : "Pause auto-loop"}
            >
              {isPaused ? (
                <IconPlayerPlay className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <IconPlayerPause className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              )}
            </button>
            <span className="text-[11px] text-neutral-600 dark:text-neutral-400 select-none">
              {isPaused ? "Paused" : hovering ? "Hovered" : "Looping"}
            </span>
          </div>

          {/* Quick Prev / Next Step Buttons */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={handlePrev}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 transition-colors"
              title="Previous Architecture Stage"
              aria-label="Previous Architecture Stage"
            >
              <IconChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-neutral-600 dark:text-neutral-400 px-1 font-mono font-medium">
              {activeIndex + 1}/{propTabs.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 transition-colors"
              title="Next Architecture Stage"
              aria-label="Next Architecture Stage"
            >
              <IconChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mini Progress Bar Line */}
          <div className="w-12 h-1 bg-neutral-300/70 dark:bg-white/10 rounded-full overflow-hidden ml-1">
            <div
              className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-2", contentClassName)}
      />
    </div>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
