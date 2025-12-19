import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* 
         Brand Symbol: " The Fiscal Hexagon"
         1. Hexagon Shape: Represents Technology, Structure, and Efficiency.
         2. Central Column: Represents Law, Stability, and Institutions.
         3. Rising Steps/Bars: Represents Finance, Growth, and Data Analysis.
      */}
      <div className="relative h-full aspect-square flex-shrink-0 transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] dark:group-hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full drop-shadow-sm">
          {/* Hexagon Container */}
          <path 
            d="M20 2L37.3205 12V32L20 42L2.67949 32V12L20 2Z" 
            className="fill-slate-900 dark:fill-white transition-colors" 
          />
          
          {/* Inner Graphic: Column transforming into Chart */}
          <g transform="translate(10, 11)">
             {/* Left Bar (Stability) */}
             <rect x="0" y="8" width="5" height="12" rx="1" className="fill-slate-400 dark:fill-slate-500" fillOpacity="0.5" />
             
             {/* Middle Bar (Growth) */}
             <rect x="7.5" y="4" width="5" height="16" rx="1" className="fill-emerald-500" />
             
             {/* Right Bar (Success/Tech) */}
             <rect x="15" y="0" width="5" height="20" rx="1" className="fill-emerald-300" />
             
             {/* Base line connecting them (Foundation) */}
             <path d="M0 23C0 21.8954 0.895431 21 2 21H18C19.1046 21 20 21.8954 20 23V23C20 24.1046 19.1046 25 18 25H2C0.89543 25 0 24.1046 0 23V23Z" className="fill-white dark:fill-slate-900 transition-colors" />
          </g>
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col justify-center">
            <div className="flex items-center gap-0.5">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight leading-none text-lg font-sans transition-colors group-hover:text-slate-700 dark:group-hover:text-slate-200">
                Portal<span className="text-emerald-600 dark:text-emerald-400">Fiscal</span>
                </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-[0.25em] uppercase leading-none mt-1">
              Pro
            </span>
        </div>
      )}
    </div>
  );
};