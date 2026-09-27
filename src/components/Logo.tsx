import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
  badge?: string;
}

export const ChatBridgeLogo: React.FC<LogoProps> = ({
  className = 'w-7 h-7',
  size = 28,
  showText = false,
  textClassName = 'font-semibold text-sm tracking-tight text-[#1D1D1F] dark:text-white',
  badge,
}) => {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <img
          src="/logo.svg"
          alt="ChatBridge Logo"
          width={size}
          height={size}
          className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,113,227,0.25)] dark:drop-shadow-[0_2px_12px_rgba(99,102,241,0.35)] transition-transform duration-200 group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
      </div>
      {showText && (
        <div className="flex items-center gap-2">
          <span className={textClassName}>ChatBridge</span>
          {badge && (
            <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-[#0071E3] dark:text-[#38BDF8] bg-[#0071E3]/10 dark:bg-[#38BDF8]/10 px-1.5 py-0.5 rounded border border-[#0071E3]/20 dark:border-[#38BDF8]/20">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
