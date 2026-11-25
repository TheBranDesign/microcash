import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Crown,
  Info,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { MembershipState } from '../types';

interface MembershipScreenProps {
  membership: MembershipState;
  onUpdateMembership: (updated: MembershipState) => void;
  onBack: () => void;
  onSubmitApplication: () => void;
}

const BENEFITS = [
  'Priority application queue & instant status updates',
  'Zero illustrative platform fees on eligible demo requests',
  'Income & payday budgeting insights in your Wallet',
  'Dedicated multi-currency & international support tools',
];

export const MembershipScreen: React.FC<MembershipScreenProps> = ({
  membership,
  onUpdateMembership,
  onBack,
  onSubmitApplication,
}) => {
  const [consented, setConsented] = useState(membership.consented);

  const handleSubscribeAndContinue = () => {
    if (!consented) return;
    onUpdateMembership({
      ...membership,
      isActive: true,
      consented: true,
      enrolledAt: 'Nov 25, 2026',
    });
    onSubmitApplication();
  };

  const handleSkipMembership = () => {
    onUpdateMembership({
      ...membership,
      isActive: false,
      consented: false,
    });
    onSubmitApplication();
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
          Step 4 of 4 · Optional Plan
        </span>
        <div className="w-9" />
      </div>

      {/* Hero Membership Card */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-[#EFF6FF] via-[#FFFFFF] to-[#ECFEFF] border border-royal-200 shadow-fintech relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-royal-600 text-white text-[10px] font-bold uppercase tracking-wider">
            <Crown className="w-3 h-3 text-turquoise-100" /> MicroCash Plus
          </div>
          <span className="text-[11px] font-bold text-turquoise-600 bg-turquoise-50 px-2.5 py-1 rounded-full border border-turquoise-100">
            Optional
          </span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-navy tabular-nums">$5.99</span>
          <span className="text-xs font-bold text-slate-500">/ month</span>
        </div>
        <p className="text-xs text-charcoal mt-1">
          Separate financial wellness & priority tools subscription.
        </p>

        {/* Benefits */}
        <ul className="mt-4 space-y-2">
          {BENEFITS.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-navy font-medium">
              <span className="w-4 h-4 rounded-full bg-turquoise-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Billing & Cancellation Details */}
      <div className="p-4 rounded-2xl bg-white border border-royal-100 shadow-card space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-500">Billing Frequency</span>
          <span className="font-bold text-navy">{membership.billingFrequency}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Next Billing Date (Simulated)</span>
          <span className="font-bold text-navy">{membership.nextBillingDate}</span>
        </div>
        <div className="pt-2 border-t border-slate-100 text-[11px] text-charcoal leading-relaxed">
          <span className="font-bold text-navy">Cancellation Terms:</span> Cancel anytime in 1 tap
          inside your Account screen before your next billing date. No cancellation fees or lock-in.
        </div>
      </div>

      {/* Mandatory Business Rule Disclosure */}
      <div className="p-3.5 rounded-2xl bg-royal-50 border border-royal-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-royal-700 shrink-0 mt-0.5" />
        <p className="text-[11px] text-navy leading-relaxed">
          <span className="font-extrabold">Important:</span> Membership is{' '}
          <span className="underline decoration-turquoise-500 font-bold">completely optional</span>{' '}
          and <span className="font-bold">does NOT guarantee loan approval</span>. Subscription fees
          are strictly separate from loan amounts and repayment obligations.
        </p>
      </div>

      {/* Separate Explicit Consent Checkbox */}
      <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-royal-100 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded accent-royal-600 cursor-pointer"
        />
        <span className="text-[11px] text-charcoal leading-snug">
          I understand this is a simulated demo and explicitly consent to enrolling in the optional{' '}
          <span className="font-bold text-navy">$5.99/month</span> MicroCash Plus membership,
          independent of my loan application outcome.
        </span>
      </label>

      {/* Actions */}
      <div className="space-y-2.5">
        <button
          onClick={handleSubscribeAndContinue}
          disabled={!consented}
          className={`w-full py-3.5 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${
            consented
              ? 'bg-gradient-to-r from-royal-600 to-turquoise-500 text-white shadow-fintech active:scale-[0.98]'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Enroll ($5.99/mo Demo) & Submit Loan
        </button>

        <button
          onClick={handleSkipMembership}
          className="w-full py-3.5 px-5 rounded-2xl bg-royal-50 hover:bg-royal-100 text-royal-700 font-bold text-sm border border-royal-100 flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          Continue Without Membership (Free)
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-turquoise-500" />
          No real payment or subscription charge is processed
        </p>
      </div>
    </div>
  );
};
