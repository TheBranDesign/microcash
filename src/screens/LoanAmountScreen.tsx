import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, Info, Sparkles } from 'lucide-react';
import { QUICK_AMOUNTS, calculateIllustrativeSummary, getAmountDescription } from '../data/mockData';

interface LoanAmountScreenProps {
  amount: number;
  onChangeAmount: (val: number) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const LoanAmountScreen: React.FC<LoanAmountScreenProps> = ({
  amount,
  onChangeAmount,
  onBack,
  onContinue,
}) => {
  const { tier, description } = getAmountDescription(amount);
  const summary = calculateIllustrativeSummary(amount);
  const progressPct = ((amount - 5) / (75 - 5)) * 100;

  return (
    <div className="px-4 pt-2 pb-6 space-y-5 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF] min-h-full flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-royal-50 text-royal-700 flex items-center justify-center active:scale-95 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-royal-600">
            Step 1 of 4 · Amount
          </span>
          <div className="w-9" />
        </div>

        <div className="text-center">
          <h1 className="text-xl font-extrabold text-navy tracking-tight">
            Select Illustrative Loan Amount
          </h1>
          <p className="text-xs text-charcoal mt-1">
            Choose any amount from $5 to $75. No credit score check.
          </p>
        </div>

        {/* Large Animated Selected Amount Card */}
        <div className="rounded-3xl p-5 bg-gradient-to-br from-[#EFF6FF] via-[#FFFFFF] to-[#ECFEFF] border border-royal-100 shadow-fintech text-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-royal-100 text-[10px] font-bold text-royal-700 mb-2">
            <Sparkles className="w-3 h-3 text-turquoise-500" />
            {tier}
          </span>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={amount}
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              className="text-5xl font-extrabold tracking-tight text-navy tabular-nums my-1"
            >
              <span className="text-royal-600">$</span>
              {amount}
              <span className="text-xl font-bold text-slate-400">.00</span>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Slider */}
          <div className="mt-5 mb-2">
            <input
              type="range"
              min={5}
              max={75}
              step={1}
              value={amount}
              onChange={(e) => onChangeAmount(Number(e.target.value))}
              aria-label="Loan amount slider"
              className="microcash-slider"
              style={{
                background: `linear-gradient(to right, #1D4ED8 0%, #06B6D4 ${progressPct}%, #DBEAFE ${progressPct}%, #DBEAFE 100%)`,
              }}
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1.5 tabular-nums">
              <span>$5 min</span>
              <span>$40</span>
              <span>$75 max</span>
            </div>
          </div>
        </div>

        {/* Quick Selection Buttons */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Quick Select
          </p>
          <div className="grid grid-cols-3 gap-2">
            {QUICK_AMOUNTS.map((preset) => {
              const active = amount === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onChangeAmount(preset)}
                  className={`py-2.5 rounded-xl font-extrabold text-sm tabular-nums transition-all active:scale-95 ${
                    active
                      ? 'bg-gradient-to-r from-royal-600 to-turquoise-500 text-white shadow-sm'
                      : 'bg-white border border-royal-100 text-navy hover:bg-royal-50'
                  }`}
                >
                  ${preset}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clear Explanation of Selected Amount */}
        <div className="p-4 rounded-2xl bg-royal-50/70 border border-royal-100 space-y-2">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-navy">{tier} (${amount}.00)</p>
              <p className="text-xs text-charcoal mt-0.5 leading-relaxed">{description}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-royal-100 flex items-center justify-between text-xs">
            <span className="text-charcoal font-medium">Illustrative Total Repayment</span>
            <span className="font-extrabold text-royal-700 tabular-nums">
              ${summary.totalRepayment.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white font-bold text-sm shadow-fintech flex items-center justify-center gap-2 active:scale-[0.98] transition"
      >
        Continue to Income Check
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
