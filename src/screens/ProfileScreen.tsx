import React from 'react';
import {
  Crown,
  Globe2,
  LogOut,
  RotateCcw,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { AppState, ScreenId } from '../types';
import { COUNTRIES } from '../data/mockData';

interface ProfileScreenProps {
  state: AppState;
  onNavigate: (screen: ScreenId) => void;
  onCancelMembership: () => void;
  onResetDemo: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  state,
  onNavigate,
  onCancelMembership,
  onResetDemo,
}) => {
  const country = COUNTRIES.find((c) => c.code === state.user.countryCode) || COUNTRIES[0];

  return (
    <div className="px-4 pt-3 pb-6 space-y-4 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF]">
      <header>
        <span className="text-[11px] font-bold uppercase tracking-wider text-royal-600">
          Account & Compliance
        </span>
        <h1 className="text-xl font-extrabold text-navy tracking-tight">Profile & Disclosures</h1>
      </header>

      {/* User Card */}
      <section className="p-4 rounded-3xl bg-white border border-royal-100 shadow-fintech flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-royal-600 to-turquoise-500 text-white font-extrabold text-lg flex items-center justify-center shrink-0">
          {state.user.fullName
            .split(' ')
            .slice(0, 2)
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-extrabold text-navy truncate">{state.user.fullName}</h2>
          <p className="text-xs text-charcoal truncate">{state.user.email}</p>
          <p className="text-[11px] text-turquoise-600 font-bold flex items-center gap-1 mt-0.5">
            <UserCheck className="w-3.5 h-3.5" /> Simulated Verified Profile · {country.flag}{' '}
            {country.name}
          </p>
        </div>
      </section>

      {/* Membership Management */}
      <section className="p-4 rounded-2xl bg-royal-50/70 border border-royal-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-turquoise-600" />
            <span className="text-xs font-extrabold text-navy">MicroCash Plus ($5.99/mo)</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              state.membership.isActive
                ? 'bg-turquoise-100 text-turquoise-600'
                : 'bg-white text-slate-500 border border-slate-200'
            }`}
          >
            {state.membership.isActive ? 'Active (Demo)' : 'Not Enrolled'}
          </span>
        </div>
        <p className="text-[11px] text-charcoal leading-relaxed">
          Optional membership is separate from loan applications and does not guarantee approval.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('membership')}
            className="flex-1 py-2 rounded-xl bg-white border border-royal-100 text-xs font-bold text-royal-700"
          >
            View Plan Details
          </button>
          {state.membership.isActive && (
            <button
              onClick={onCancelMembership}
              className="flex-1 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </section>

      {/* Regulatory & Prototype Disclosures */}
      <section className="p-4 rounded-2xl bg-white border border-royal-100 shadow-card space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-extrabold text-navy">
          <Globe2 className="w-4 h-4 text-royal-600" />
          Global Availability & Regulatory Notice
        </div>
        <p className="text-[11px] text-charcoal leading-relaxed">
          <span className="font-bold text-navy">{country.name}:</span> {country.regulatoryNote}
        </p>
        <div className="pt-2 border-t border-slate-100 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-turquoise-600 shrink-0 mt-0.5" />
          <p className="text-[10.5px] text-charcoal leading-relaxed">
            This application is a demonstration prototype built by{' '}
            <span className="font-bold text-navy">The Brand Design</span> for{' '}
            <span className="font-bold text-navy">Victor Lynn Laws Jr.</span> It uses simulated
            information only and does not make real lending decisions or process real payments.
          </p>
        </div>
      </section>

      {/* Reset & Restart */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={onResetDemo}
          className="py-3 px-4 rounded-2xl bg-royal-50 border border-royal-100 text-royal-700 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
        </button>
        <button
          onClick={() => onNavigate('onboarding')}
          className="py-3 px-4 rounded-2xl bg-white border border-slate-200 text-charcoal font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <LogOut className="w-3.5 h-3.5" /> View Onboarding
        </button>
      </div>
    </div>
  );
};
