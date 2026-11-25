import React from 'react';
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ChevronLeft,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { calculateIllustrativeSummary } from '../data/mockData';

interface LoanSummaryScreenProps {
  selectedAmount: number;
  nextPayday: string;
  onBack: () => void;
  onContinue: () => void;
}

export const LoanSummaryScreen: React.FC<LoanSummaryScreenProps> = ({
  selectedAmount,
  nextPayday,
  onBack,
  onContinue,
}) => {
  const summary = calculateIllustrativeSummary(selectedAmount);

  const formattedDate = nextPayday
    ? new Date(`${nextPayday}T00:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Dec 04, 2026';

  return (
    <div className="px-4 pt-2 pb-6 space-y-4 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF] min-h-full flex flex-col justify-between">
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
            Step 3 of 4 · Summary
          </span>
          <div className="w-9" />
        </div>

        <div>
          <h1 className="text-xl font-extrabold text-navy tracking-tight">
            Transparent Loan Summary
          </h1>
          <p className="text-xs text-charcoal mt-1">
            Review all illustrative charges and repayment timing before proceeding.
          </p>
        </div>

        {/* Breakdown Card */}
        <div className="p-4 rounded-3xl bg-white border border-royal-100 shadow-fintech space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Selected Loan Amount
              </span>
              <div className="text-2xl font-extrabold text-navy tabular-nums mt-0.5">
                ${summary.principal.toFixed(2)}
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-royal-50 text-royal-700 text-[10px] font-bold">
              Illustrative Demo
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-charcoal">Illustrative Platform Fee (4%)</span>
              <span className="font-bold text-navy tabular-nums">
                ${summary.platformFee.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-charcoal">Illustrative Interest</span>
              <span className="font-bold text-turquoise-600 tabular-nums">
                ${summary.illustrativeInterest.toFixed(2)} (0% Demo)
              </span>
            </div>
            <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
              <span className="text-sm font-extrabold text-navy">Total Illustrative Repayment</span>
              <span className="text-lg font-extrabold text-royal-700 tabular-nums">
                ${summary.totalRepayment.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-royal-50/70 border border-royal-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarCheck2 className="w-4 h-4 text-royal-600" />
              <span className="text-xs font-bold text-navy">Target Repayment Date</span>
            </div>
            <span className="text-xs font-extrabold text-royal-700">{formattedDate}</span>
          </div>
        </div>

        {/* Visual Repayment Schedule */}
        <div className="p-4 rounded-2xl bg-white border border-royal-100 shadow-card">
          <h2 className="text-xs font-extrabold text-navy mb-3">Illustrative Repayment Schedule</h2>
          <div className="space-y-3">
            {[
              {
                step: 'Today · Disbursement (Simulated)',
                detail: `+$${summary.principal.toFixed(2)} to Demo Wallet if approved`,
                active: true,
              },
              {
                step: '48 Hours Prior · Friendly Reminder',
                detail: 'SMS & in-app alert before scheduled date',
                active: false,
              },
              {
                step: `${formattedDate} · Single Repayment`,
                detail: `$${summary.totalRepayment.toFixed(2)} via chosen payment method`,
                active: false,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    item.active ? 'text-turquoise-500' : 'text-royal-300'
                  }`}
                />
                <div>
                  <p className="text-xs font-bold text-navy">{item.step}</p>
                  <p className="text-[11px] text-charcoal">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Non-Binding Disclosure */}
        <div className="p-3 rounded-2xl bg-skyaccent-50 border border-skyaccent-100 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
          <p className="text-[10.5px] text-charcoal leading-relaxed">
            <span className="font-bold text-navy">Illustrative Terms Notice:</span> Figures shown
            are for demonstration purposes only and do not constitute legally approved loan terms or
            a guaranteed offer of credit.
          </p>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white font-bold text-sm shadow-fintech flex items-center justify-center gap-2 active:scale-[0.98] transition"
      >
        Next: Optional Membership
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
