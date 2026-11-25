import React from 'react';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  DollarSign,
  FileText,
  UploadCloud,
} from 'lucide-react';
import { EmploymentStatus, IncomeFrequency, IncomeInfo } from '../types';

interface IncomeVerificationScreenProps {
  income: IncomeInfo;
  selectedLoanAmount: number;
  onUpdateIncome: (updated: IncomeInfo) => void;
  onBack: () => void;
  onContinue: () => void;
}

const EMPLOYMENT_OPTIONS: EmploymentStatus[] = [
  'Full-Time Employed',
  'Part-Time Employed',
  'Self-Employed / Freelance',
  'Gig / Platform Worker',
  'Other Regular Income',
];

const FREQUENCY_OPTIONS: IncomeFrequency[] = [
  'Weekly',
  'Bi-Weekly',
  'Semi-Monthly',
  'Monthly',
];

export const IncomeVerificationScreen: React.FC<IncomeVerificationScreenProps> = ({
  income,
  selectedLoanAmount,
  onUpdateIncome,
  onBack,
  onContinue,
}) => {
  // Simple illustrative affordability ratio
  const ratio = income.monthlyIncome > 0 ? (selectedLoanAmount / income.monthlyIncome) * 100 : 100;
  const affordabilityLabel =
    ratio <= 8 ? 'Strong Illustrative Affordability' : ratio <= 20 ? 'Moderate Affordability' : 'Needs Review';

  const handleSimulatedUpload = () => {
    onUpdateIncome({
      ...income,
      documentName: 'Paystub_Nov2026_Demo.pdf',
    });
  };

  return (
    <div className="px-4 pt-2 pb-6 space-y-4 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-royal-50 text-royal-700 flex items-center justify-center active:scale-95 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-royal-600">
          Step 2 of 4 · Income
        </span>
        <div className="w-9" />
      </div>

      <div>
        <h1 className="text-xl font-extrabold text-navy tracking-tight">
          Income & Affordability
        </h1>
        <p className="text-xs text-charcoal mt-1">
          No credit bureau pull. We evaluate illustrative eligibility using income and repayment
          affordability.
        </p>
      </div>

      {/* Live Affordability Indicator */}
      <div className="p-3.5 rounded-2xl bg-skyaccent-50 border border-skyaccent-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-royal-600">
            Simulated Affordability Check
          </p>
          <p className="text-xs font-extrabold text-navy mt-0.5">{affordabilityLabel}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-white border border-royal-100 text-[11px] font-bold text-turquoise-600 tabular-nums">
          {ratio.toFixed(1)}% of income
        </span>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-bold text-charcoal mb-1">
            Employment Status
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={income.employmentStatus}
              onChange={(e) =>
                onUpdateIncome({
                  ...income,
                  employmentStatus: e.target.value as EmploymentStatus,
                })
              }
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 text-sm text-navy outline-none"
            >
              {EMPLOYMENT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-charcoal mb-1">Income Source</label>
          <input
            type="text"
            value={income.incomeSource}
            onChange={(e) => onUpdateIncome({ ...income, incomeSource: e.target.value })}
            placeholder="e.g., Employer Payroll, Freelance, Ride-share"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 text-sm text-navy outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-charcoal mb-1">
              Monthly Income (USD)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min={100}
                max={50000}
                value={income.monthlyIncome}
                onChange={(e) =>
                  onUpdateIncome({ ...income, monthlyIncome: Number(e.target.value) || 0 })
                }
                className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 text-sm font-bold text-navy tabular-nums outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-charcoal mb-1">
              Income Frequency
            </label>
            <select
              value={income.frequency}
              onChange={(e) =>
                onUpdateIncome({
                  ...income,
                  frequency: e.target.value as IncomeFrequency,
                })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 text-sm text-navy outline-none"
            >
              {FREQUENCY_OPTIONS.map((freq) => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-charcoal mb-1">Next Payday</label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={income.nextPayday}
              onChange={(e) => onUpdateIncome({ ...income, nextPayday: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 text-sm text-navy outline-none"
            />
          </div>
        </div>

        {/* Optional Income Verification Document Interface */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-charcoal">
              Income Document (Optional Demo)
            </span>
            <span className="text-[10px] font-semibold text-slate-400">Paystub / Statement</span>
          </div>

          {income.documentName ? (
            <div className="p-3 rounded-2xl bg-turquoise-50 border border-turquoise-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-turquoise-600" />
                <div>
                  <p className="text-xs font-bold text-navy">{income.documentName}</p>
                  <p className="text-[10px] text-turquoise-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Simulated document attached
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onUpdateIncome({ ...income, documentName: null })}
                className="text-[11px] font-bold text-slate-500 hover:text-rose-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSimulatedUpload}
              className="w-full p-4 rounded-2xl border-2 border-dashed border-royal-200 bg-royal-50/50 hover:bg-royal-50 flex flex-col items-center justify-center text-center transition active:scale-[0.99]"
            >
              <UploadCloud className="w-6 h-6 text-royal-600 mb-1.5" />
              <span className="text-xs font-bold text-navy">
                Tap to Attach Sample Income Proof
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                Simulated upload · No real files leave your device
              </span>
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white font-bold text-sm shadow-fintech flex items-center justify-center gap-2 active:scale-[0.98] transition"
      >
        Review Loan Summary
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
