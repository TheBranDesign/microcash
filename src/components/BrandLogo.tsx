import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showTagline = false,
}) => {
  const iconDims = size === 'lg' ? 'w-16 h-16' : size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const titleClass =
    size === 'lg'
      ? 'text-2xl font-extrabold tracking-tight'
      : size === 'sm'
      ? 'text-base font-extrabold tracking-tight'
      : 'text-lg font-extrabold tracking-tight';

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <div className={`${iconDims} relative shrink-0`}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="mc-bg-grad" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1D4ED8" />
              <stop offset="55%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="mc-arc-grad" x1="16" y1="44" x2="48" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CCFBF1" />
            </linearGradient>
          </defs>
          {/* Rounded squircle badge */}
          <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#mc-bg-grad)" />
          {/* Subtle inner light ring */}
          <rect x="4" y="4" width="56" height="56" rx="16" stroke="white" strokeOpacity="0.22" strokeWidth="1.5" />
          {/* Stylized M + upward cash pulse */}
          <path
            d="M16 42V24L25.5 34.5L32 27L38.5 34.5L48 22V42"
            stroke="url(#mc-arc-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Turquoise velocity spark dot */}
          <circle cx="48" cy="18" r="3.5" fill="#67E8F9" />
        </svg>
      </div>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={titleClass}>
            <span className="text-[#0F172A]">Micro</span>
            <span className="bg-gradient-to-r from-[#1D4ED8] to-[#06B6D4] bg-clip-text text-transparent">
              Cash
            </span>
          </span>
          {showTagline && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0891B2] mt-1">
              Global Micro-Access
            </span>
          )}
        </div>
      )}
    </div>
  );
};
