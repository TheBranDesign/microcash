import React from 'react';

export const OnboardingIllustration: React.FC<{ slide: 0 | 1 | 2 }> = ({ slide }) => {
  if (slide === 0) {
    // Financial support when you need it ($5 - $75 global card & pulse)
    return (
      <svg viewBox="0 0 260 200" fill="none" className="w-60 h-44 mx-auto">
        <circle cx="130" cy="100" r="82" fill="#EFF6FF" />
        <circle cx="130" cy="100" r="62" fill="#E0F2FE" />
        {/* Floating Fintech Card */}
        <rect x="48" y="54" width="164" height="96" rx="18" fill="url(#ob1-grad)" />
        <defs>
          <linearGradient id="ob1-grad" x1="48" y1="54" x2="212" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1D4ED8" />
            <stop offset="0.6" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect x="64" y="72" width="32" height="22" rx="5" fill="white" fillOpacity="0.28" />
        <circle cx="184" cy="82" r="12" fill="white" fillOpacity="0.22" />
        <text x="64" y="126" fill="white" fontSize="22" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
          $5 – $75
        </text>
        <text x="150" y="125" fill="#CCFBF1" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          GLOBAL
        </text>
        {/* Floating badge */}
        <rect x="148" y="34" width="76" height="30" rx="15" fill="white" stroke="#BFDBFE" strokeWidth="1.5" />
        <circle cx="164" cy="49" r="5" fill="#06B6D4" />
        <text x="174" y="53" fill="#0F172A" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          Fast UX
        </text>
      </svg>
    );
  }

  if (slide === 1) {
    // Simple income-based application experience (no credit score)
    return (
      <svg viewBox="0 0 260 200" fill="none" className="w-60 h-44 mx-auto">
        <circle cx="130" cy="100" r="82" fill="#ECFEFF" />
        <rect x="58" y="40" width="144" height="120" rx="20" fill="white" stroke="#BFDBFE" strokeWidth="2" />
        {/* Income bars */}
        <rect x="78" y="110" width="18" height="30" rx="6" fill="#DBEAFE" />
        <rect x="104" y="92" width="18" height="48" rx="6" fill="#38BDF8" />
        <rect x="130" y="76" width="18" height="64" rx="6" fill="#06B6D4" />
        <rect x="156" y="60" width="18" height="80" rx="6" fill="#1D4ED8" />
        {/* Check badge */}
        <circle cx="186" cy="54" r="18" fill="#06B6D4" />
        <path d="M178 54L183.5 59.5L194 49" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="44" y="132" width="104" height="28" rx="14" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
        <text x="58" y="150" fill="#1E40AF" fontSize="10.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          Income-Based
        </text>
      </svg>
    );
  }

  // Transparent and manageable repayment information
  return (
    <svg viewBox="0 0 260 200" fill="none" className="w-60 h-44 mx-auto">
      <circle cx="130" cy="100" r="82" fill="#F0F9FF" />
      <rect x="52" y="42" width="156" height="116" rx="20" fill="white" stroke="#BAE6FD" strokeWidth="2" />
      <rect x="70" y="60" width="120" height="16" rx="8" fill="#EFF6FF" />
      <rect x="70" y="60" width="84" height="16" rx="8" fill="url(#ob3-grad)" />
      <defs>
        <linearGradient id="ob3-grad" x1="70" y1="68" x2="154" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1D4ED8" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="100" r="6" fill="#06B6D4" />
      <rect x="94" y="96" width="86" height="8" rx="4" fill="#E2E8F0" />
      <circle cx="80" cy="124" r="6" fill="#1D4ED8" />
      <rect x="94" y="120" width="66" height="8" rx="4" fill="#E2E8F0" />
      <rect x="136" y="134" width="86" height="28" rx="14" fill="#1D4ED8" />
      <text x="150" y="152" fill="white" fontSize="10.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
        100% Clear
      </text>
    </svg>
  );
};
