"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
  IconCheck,
  IconArrowRight,
  IconSparkles,
  IconCode,
  IconFileCode,
  IconLock,
  IconChecklist
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  blurDataURL?: string;
}

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

export type CardData = {
  src: string;
  title: string;
  category: string;
  categorySlug?: string;
  description?: string;
  bullets?: string[];
  previewType?: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(true);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      setCanScrollLeft(true);
      setCanScrollRight(true);

      const { scrollLeft } = carouselRef.current;
      const cardWidth = isMobile() ? 280 : 380;
      const gap = isMobile() ? 12 : 16;
      const calculatedIndex = Math.round(scrollLeft / (cardWidth + gap));
      if (calculatedIndex >= 0 && calculatedIndex < items.length && calculatedIndex !== currentIndex) {
        setCurrentIndex(calculatedIndex);
      }
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current && items.length > 0) {
      const nextIndex = (currentIndex - 1 + items.length) % items.length;
      const cardWidth = isMobile() ? 280 : 380;
      const gap = isMobile() ? 12 : 16;
      const scrollPosition = nextIndex * (cardWidth + gap);

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(nextIndex);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current && items.length > 0) {
      const nextIndex = (currentIndex + 1) % items.length;
      const cardWidth = isMobile() ? 280 : 380;
      const gap = isMobile() ? 12 : 16;
      const scrollPosition = nextIndex * (cardWidth + gap);

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(nextIndex);
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 280 : 380;
      const gap = isMobile() ? 12 : 16;
      const scrollPosition = index * (cardWidth + gap);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-4 [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl",
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: 0.1 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl shrink-0"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dash Indicators & Navigation Buttons */}
        <div className="mt-4 flex items-center justify-between px-4 sm:px-6">
          {/* Pagination Dash Dots */}
          <div className="flex items-center gap-1.5">
            {items.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-purple-600 dark:bg-purple-400"
                    : "w-2 bg-neutral-300 dark:bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Nav Controls */}
          <div className="flex justify-end gap-2">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-neutral-200/80 dark:border-white/10 hover:scale-105 active:scale-95 transition-all text-neutral-800 dark:text-neutral-200 shadow-sm cursor-pointer"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <IconArrowNarrowLeft className="h-5 w-5" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-neutral-200/80 dark:border-white/10 hover:scale-105 active:scale-95 transition-all text-neutral-800 dark:text-neutral-200 shadow-sm cursor-pointer"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <IconArrowNarrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardData;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white/90 p-4 font-sans md:p-10 dark:bg-[#0A0C16]/95 backdrop-blur-2xl border border-neutral-200/80 dark:border-white/10 shadow-2xl"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity cursor-pointer"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <IconX className="h-5 w-5" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-semibold text-purple-600 dark:text-purple-400"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-2 text-2xl font-bold text-neutral-900 md:text-4xl dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-6 md:py-8">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-[31rem] sm:h-[33rem] w-80 sm:w-[22rem] flex-col justify-between overflow-hidden rounded-3xl bg-white/90 dark:bg-[#0D0F18]/90 border border-neutral-200/90 dark:border-white/10 p-5 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 text-left group cursor-pointer"
      >
        {/* Top Graphic Mockup Container */}
        <div className="w-full h-48 rounded-2xl bg-neutral-950 dark:bg-[#060810] border border-neutral-800 dark:border-white/10 p-3.5 relative overflow-hidden flex flex-col justify-between shadow-inner select-none">
          {/* Mockup Header Dots */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
              <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-[9px] text-neutral-500">ChatBridge Handoff</span>
          </div>

          {/* Graphic Mock Content based on previewType */}
          {card.previewType === "code" && (
            <div className="space-y-2 py-1 font-mono text-[10px] text-neutral-300">
              <div className="p-2 rounded bg-black/60 border border-white/5 leading-relaxed text-purple-300">
                <span className="text-pink-400">export default function</span> <span className="text-amber-300">ChatBridge</span>() &#123;<br />
                &nbsp;&nbsp;<span className="text-pink-400">const</span> context = <span className="text-cyan-300">await</span> capture();<br />
                &nbsp;&nbsp;<span className="text-pink-400">return</span> &lt;<span className="text-cyan-300">ContextBridge</span> preserve=&#123;<span className="text-emerald-400">true</span>&#125; /&gt;<br />
                &#125;
              </div>
              <div className="flex flex-wrap gap-1 pt-0.5">
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px]">Capture Context</span>
                <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[9px]">Switch Models</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px]">Continue</span>
              </div>
            </div>
          )}

          {card.previewType === "graph" && (
            <div className="flex flex-col items-center justify-center py-1 space-y-2">
              <div className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold shadow-md shadow-cyan-500/20">
                1M+ tokens
              </div>
              <div className="grid grid-cols-2 gap-1 w-full text-[9px] font-mono text-center">
                <span className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300">Research Papers</span>
                <span className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300">PDFs & Reports</span>
                <span className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300">Web Sources</span>
                <span className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300">Personal Notes</span>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 flex items-center gap-1">
                <IconSparkles className="w-3 h-3" /> Synthesize insights
              </span>
            </div>
          )}

          {card.previewType === "error" && (
            <div className="space-y-1.5 py-1 text-[10px] font-mono">
              <div className="p-2 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 leading-tight">
                <span className="font-bold">error[E0308]:</span> mismatched types expected 'usize' found '&str' -&gt; src/main.rs:32:23
              </div>
              <div className="space-y-1 text-[9px] text-neutral-300">
                <div className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-rose-400" /> Capture full error context</div>
                <div className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-rose-400" /> Analyze across files</div>
                <div className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-rose-400" /> Get targeted solutions</div>
              </div>
            </div>
          )}

          {card.previewType === "security" && (
            <div className="flex flex-col items-center justify-center py-1 space-y-1.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
                <IconLock className="w-5 h-5" />
              </div>
              <div className="grid grid-cols-2 gap-1 w-full text-[9px] font-mono text-emerald-300">
                <span className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-emerald-400" /> Encrypted locally</span>
                <span className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-emerald-400" /> Privacy first</span>
                <span className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-emerald-400" /> No data leaves</span>
                <span className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-emerald-400" /> Local storage</span>
              </div>
            </div>
          )}

          {card.previewType === "writing" && (
            <div className="space-y-2 py-1 text-[10px] font-mono text-amber-300">
              <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30 text-amber-200 leading-relaxed">
                Tone: Concise & Executive<br />
                Voice: B2B SaaS Founder<br />
                Constraints: No buzzwords
              </div>
              <div className="flex items-center justify-between text-[9px] text-neutral-400">
                <span>Preserved across Claude 3.7</span>
                <span className="text-amber-400 font-bold">100% Match</span>
              </div>
            </div>
          )}

          {card.previewType === "pipeline" && (
            <div className="space-y-1.5 py-1 text-[9px] font-mono text-neutral-300">
              <div className="p-1.5 rounded bg-blue-500/20 border border-blue-500/30 flex justify-between">
                <span>ChatGPT 4o</span> <span>Brainstorm</span>
              </div>
              <div className="p-1.5 rounded bg-purple-500/20 border border-purple-500/30 flex justify-between">
                <span>Claude 3.7</span> <span>TypeScript Code</span>
              </div>
              <div className="p-1.5 rounded bg-emerald-500/20 border border-emerald-500/30 flex justify-between">
                <span>Gemini 2.0</span> <span>Fact Grounding</span>
              </div>
            </div>
          )}
        </div>

        {/* Middle & Bottom Card Details */}
        <div className="space-y-3 mt-3.5 flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400 block">
              {card.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug tracking-tight">
              {card.title}
            </h3>
            {card.description && (
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
                {card.description}
              </p>
            )}
          </div>

          {/* 3 Checkmark Bullet Points */}
          {card.bullets && card.bullets.length > 0 && (
            <div className="space-y-1.5 pt-2.5 border-t border-neutral-200/80 dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300">
              {card.bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <IconCheck className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate text-[11px] font-medium text-neutral-700 dark:text-neutral-300">{b}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Explore Workflow CTA Button */}
          <div className="pt-2">
            <div className="w-full py-2.5 px-3 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold flex items-center justify-center gap-1.5 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all shadow-2xs">
              <span>Explore Workflow</span>
              <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        fill ? "absolute inset-0 object-cover" : "",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      alt={alt ? alt : "Background visual illustration"}
      {...rest}
    />
  );
};
