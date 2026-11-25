import React from 'react';
import { AFFORDABILITY_TREND } from '../data/mockData';

export const AffordabilitySparkline: React.FC = () => {
  const width = 280;
  const height = 74;
  const padX = 10;
  const padY = 10;
  const minVal = 65;
  const maxVal = 96;

  const points = AFFORDABILITY_TREND.map((pt, i) => {
    const x = padX + (i / (AFFORDABILITY_TREND.length - 1)) * (width - padX * 2);
    const y = height - padY - ((pt.score - minVal) / (maxVal - minVal)) * (height - padY * 2);
    return { x, y, ...pt };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[74px] overflow-visible">
        <defs>
          <linearGradient id="mc-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="mc-line-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#mc-area-fill)" />
        <path
          d={linePath}
          fill="none"
          stroke="url(#mc-line-stroke)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, idx) => (
          <circle
            key={p.label}
            cx={p.x}
            cy={p.y}
            r={idx === points.length - 1 ? 4.5 : 2.5}
            fill={idx === points.length - 1 ? '#06B6D4' : '#1D4ED8'}
            stroke="#FFFFFF"
            strokeWidth={idx === points.length - 1 ? 2 : 1}
          />
        ))}
      </svg>
      <div className="flex justify-between px-1 mt-1">
        {AFFORDABILITY_TREND.map((p) => (
          <span key={p.label} className="text-[10px] font-medium text-slate-400">
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export const RepaymentRing: React.FC<{ paidRatio: number; label: string }> = ({
  paidRatio,
  label,
}) => {
  const clamped = Math.max(0, Math.min(1, paidRatio));
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - clamped);

  return (
    <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 76 76" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="mc-ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <circle cx="38" cy="38" r={r} fill="none" stroke="#E0F2FE" strokeWidth="7" />
        <circle
          cx="38"
          cy="38"
          r={r}
          fill="none"
          stroke="url(#mc-ring-grad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-extrabold text-[#0F172A] tabular-nums">
          {Math.round(clamped * 100)}%
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>
    </div>
  );
};
