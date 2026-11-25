import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarClock,
  Crown,
  Globe2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { AppState, ScreenId } from '../types';
import { COUNTRIES } from '../data/mockData';
import { BrandLogo } from '../components/BrandLogo';
import { AffordabilitySparkline } from '../components/Charts';

interface HomeDashboardScreenProps {
  state: AppState;
  onNavigate: (screen: ScreenId) => void;
}

export const HomeDashboardScreen: React.FC<HomeDashboardScreenProps> = ({
  state,
  onNavigate,
}) => {
  const [showNotif, setShowNotif] = useState(false);
  const firstName = state.user.fullName.split(' ')[0] || 'Victor';
  const country = COUNTRIES.find((c) => c.code === state.user.countryCode) || COUNTRIES[0];

  return (
    <div className="px-4 pt-2 pb-6 space-y-4 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF]">
      {/* Mobile Header */}
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <BrandLogo size="sm" showWordmark={false} />
            <span className="text-[11px] font-bold uppercase tracking-wider text-royal-600">
              MicroCash Global
            </span>
          </div>
          <h1 className="text-lg font-extrabold text-navy tracking-tight">
            Welcome back, {firstName}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('profile')}
            className="px-2.5 py-1.5 rounded-full bg-royal-50 border border-royal-100 text-xs font-bold text-royal-700 flex items-center gap-1"
            title="Country & Regulatory Info"
          >
            <span>{country.flag}</span>
            <span>{country.currency}</span>
          </button>
          <button
            onClick={() => setShowNotif((v) => !v)}
            className="relative w-9 h-9 rounded-full bg-white border border-royal-100 shadow-card flex items-center justify-center text-navy active:scale-95 transition"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-turquoise-500 ring-2 ring-white" />
          </button>
        </div>
      </header>

      {/* Inline Notification Banner if toggled */}
      {showNotif && (
        <div className="p-3 rounded-2xl bg-skyaccent-50 border border-skyaccent-100 text-xs text-navy flex items-start justify-between gap-2">
          <div>
            <p className="font-bold text-royal-700">Prototype Demo Active</p>
            <p className="text-charcoal mt-0.5">
              All balances, eligibility checks, and repayment schedules are simulated for
              demonstration.
            </p>
          </div>
          <button
            onClick={() => setShowNotif(false)}
            className="text-[11px] font-bold text-royal-600 shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Hero Available Loan Amount Card (Bright Royal-to-Turquoise Gradient) */}
      <section className="rounded-3xl p-5 bg-gradient-to-br from-[#1D4ED8] via-[#0EA5E9] to-[#06B6D4] text-white shadow-fintech-lg relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/15 blur-xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-turquoise-400/25 blur-xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Illustrative Loan Range
            </span>
            <span className="text-[11px] font-semibold text-turquoise-50">
              No Credit Score Check
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs font-medium text-blue-50">Max Illustrative Loan Amount</p>
              <div className="text-4xl font-extrabold tracking-tight tabular-nums mt-0.5">
                $75<span className="text-lg font-bold text-turquoise-100">.00</span>
              </div>
              <p className="text-[11px] text-blue-50 mt-1">
                Flexible micro-loans starting at <span className="font-bold text-white">$5</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('loan-amount')}
            className="mt-4 w-full py-3 px-4 rounded-2xl bg-white text-royal-700 font-extrabold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-blue-50 active:scale-[0.98] transition"
          >
            Apply for a Loan
            <ArrowRight className="w-4 h-4 text-turquoise-600" />
          </button>
        </div>
      </section>

      {/* Membership Status Card */}
      <section
        onClick={() => onNavigate('membership')}
        className="p-3.5 rounded-2xl bg-royal-50/80 border border-royal-100 flex items-center justify-between cursor-pointer active:scale-[0.99] transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-royal-100 flex items-center justify-center text-royal-600 shadow-xs">
            <Crown className="w-5 h-5 text-turquoise-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-navy">MicroCash Plus</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  state.membership.isActive
                    ? 'bg-turquoise-100 text-turquoise-600'
                    : 'bg-white text-slate-500 border border-slate-200'
                }`}
              >
                {state.membership.isActive ? 'Active · $5.99/mo' : 'Optional · $5.99/mo'}
              </span>
            </div>
            <p className="text-[11px] text-charcoal mt-0.5">
              {state.membership.isActive
                ? 'Separate from loan outcomes · Cancel anytime'
                : 'Optional membership · Does not guarantee approval'}
            </p>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-royal-600 shrink-0" />
      </section>

      {/* Financial Summary Bento Row */}
      <section className="grid grid-cols-2 gap-3">
        <div
          onClick={() => onNavigate('wallet')}
          className="p-3.5 rounded-2xl bg-white border border-royal-100 shadow-card cursor-pointer active:scale-[0.98] transition"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500">Demo Wallet</span>
            <Wallet className="w-4 h-4 text-royal-600" />
          </div>
          <div className="text-xl font-extrabold text-navy tabular-nums">
            ${state.walletBalance.toFixed(2)}
          </div>
          <p className="text-[10px] font-semibold text-turquoise-600 mt-1">
            Illustrative balance
          </p>
        </div>

        <div
          onClick={() => onNavigate('repayment')}
          className="p-3.5 rounded-2xl bg-white border border-royal-100 shadow-card cursor-pointer active:scale-[0.98] transition"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500">Next Repayment</span>
            <CalendarClock className="w-4 h-4 text-turquoise-600" />
          </div>
          <div className="text-xl font-extrabold text-navy tabular-nums">
            ${state.outstandingBalance.toFixed(2)}
          </div>
          <p className="text-[10px] font-semibold text-royal-600 mt-1">
            Due {state.nextRepaymentDate}
          </p>
        </div>
      </section>

      {/* Income & Affordability Sparkline Card */}
      <section className="p-4 rounded-2xl bg-white border border-royal-100 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xs font-extrabold text-navy flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-turquoise-500" />
              Affordability Readiness (Simulated)
            </h2>
            <p className="text-[11px] text-charcoal">
              Based on income consistency, not credit bureaus
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-turquoise-50 text-turquoise-600 text-[11px] font-bold tabular-nums">
            91 / 100
          </span>
        </div>
        <AffordabilitySparkline />
      </section>

      {/* Recent Activity */}
      <section className="p-4 rounded-2xl bg-white border border-royal-100 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-extrabold text-navy">Recent Activity</h2>
          <button
            onClick={() => onNavigate('wallet')}
            className="text-[11px] font-bold text-royal-600 hover:underline"
          >
            View All
          </button>
        </div>
        <div className="space-y-2.5">
          {state.transactions.slice(0, 3).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0 last:pb-0"
            >
              <div className="min-w-0 pr-2">
                <p className="text-xs font-bold text-navy truncate">{tx.title}</p>
                <p className="text-[10px] text-slate-400">
                  {tx.date} · {tx.subtitle}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`text-xs font-extrabold tabular-nums ${
                    tx.amount >= 0 ? 'text-turquoise-600' : 'text-navy'
                  }`}
                >
                  {tx.amount >= 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                </span>
                <span className="block text-[9px] font-semibold text-slate-400">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Availability & Demo Notice */}
      <div className="p-3 rounded-2xl bg-royal-50/60 border border-royal-100 flex items-center gap-2.5">
        <Globe2 className="w-4 h-4 text-royal-600 shrink-0" />
        <p className="text-[10px] text-charcoal leading-snug">
          <span className="font-bold text-navy">Simulated Prototype:</span> Global availability is
          subject to country-specific lending regulations.
        </p>
        <ShieldCheck className="w-4 h-4 text-turquoise-500 shrink-0" />
      </div>
    </div>
  );
};
