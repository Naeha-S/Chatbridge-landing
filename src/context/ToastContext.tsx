import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, CopyIcon, CloseIcon, ShieldCheckIcon } from '../components/Icons';

export type ToastType = 'success' | 'copied' | 'saved' | 'info';

export interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
  toast: {
    success: (title: string, description?: string) => void;
    copied: (title?: string, description?: string) => void;
    saved: (title?: string, description?: string) => void;
    info: (title: string, description?: string) => void;
  };
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, type = 'success', duration = 3000 }: ToastOptions) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const newToast: ToastItem = {
        id,
        title,
        description,
        type,
        duration,
        createdAt: Date.now(),
      };

      setToasts((prev) => [newToast, ...prev.slice(0, 2)]); // Keep up to 3 visible

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
    },
    [dismissToast]
  );

  const toast = {
    success: useCallback((title: string, description?: string) => {
      showToast({ title, description, type: 'success' });
    }, [showToast]),

    copied: useCallback((title = 'Copied to clipboard', description?: string) => {
      showToast({
        title,
        description,
        type: 'copied',
        duration: 3200,
      });
    }, [showToast]),

    saved: useCallback((title = 'Saved successfully', description?: string) => {
      showToast({
        title,
        description,
        type: 'saved',
        duration: 3200,
      });
    }, [showToast]),

    info: useCallback((title: string, description?: string) => {
      showToast({ title, description, type: 'info' });
    }, [showToast]),
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'copied':
        return (
          <div className="w-7 h-7 rounded-lg bg-[#0071E3]/15 text-[#0071E3] flex items-center justify-center shrink-0 border border-[#0071E3]/25">
            <CopyIcon className="w-3.5 h-3.5" />
          </div>
        );
      case 'saved':
        return (
          <div className="w-7 h-7 rounded-lg bg-[#34C759]/15 text-[#34C759] flex items-center justify-center shrink-0 border border-[#34C759]/25">
            <CheckIcon className="w-3.5 h-3.5 text-[#34C759]" />
          </div>
        );
      case 'success':
        return (
          <div className="w-7 h-7 rounded-lg bg-[#34C759]/15 text-[#34C759] flex items-center justify-center shrink-0 border border-[#34C759]/25">
            <CheckIcon className="w-3.5 h-3.5 text-[#34C759]" />
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-7 h-7 rounded-lg bg-[#2997FF]/15 text-[#2997FF] flex items-center justify-center shrink-0 border border-[#2997FF]/25">
            <ShieldCheckIcon className="w-3.5 h-3.5" />
          </div>
        );
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, toast, dismissToast }}>
      {children}

      {/* Global Floating Toast Container */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence mode="sync">
          {toasts.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pointer-events-auto w-full p-3.5 rounded-2xl border shadow-xl backdrop-blur-xl bg-[#0E0E12]/95 dark:bg-[#0E0E12]/95 border-[#282836] dark:border-[#282836] text-white flex items-start justify-between gap-3 overflow-hidden relative group"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {getIcon(item.type || 'success')}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h4 className="text-xs font-semibold tracking-tight text-white line-clamp-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-[11px] text-[#A1A1A6] mt-0.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => dismissToast(item.id)}
                className="text-[#6E6E75] hover:text-white p-1 rounded-md transition-colors shrink-0 -mr-1 -mt-1"
                aria-label="Dismiss notification"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>

              {/* Progress bar line indicating timeout */}
              {item.duration && item.duration > 0 && (
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: item.duration / 1000, ease: 'linear' }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0071E3]/60 origin-left"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
