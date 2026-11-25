import React, { useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarCheck,
  Crown,
  PlusCircle,
  Wallet,
} from 'lucide-react';
import { AppState, ScreenId } from '../types';
import { RepaymentRing } from '../components/Charts';

interface WalletScreenProps {
  state: AppState;
  onNavigate: (screen: ScreenId) => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({ state, onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'loan' | 'repayment' | 'membership'>('all');

  const filteredTx = state.transactions.filter((tx) =>
    filter === 'all' ? true : tx.type === filter
  );

  // Illustrative repayment progress
  const totalSimulatedCycle = state.outstandingBalance > 0 ? state.outstandingBalance + 25 : 75;
  const paidRatio =
    state.outstandingBalance === 0
      ? 1
      : Math.max(0.15, (totalSimulatedCycle - state.outstandingBalance) / totalSimulatedCycle);

  return (
    <div className="px-4 pt-3 pb-6 space-y-4 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF]">
      <header className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-royal-600">
            Simulated Account
          </span>
          <h1 className="text-xl font-extrabold text-navy tracking-tight">MicroCash Wallet</h1>
        </div>
        <button
          onClick={() => onNavigate('loan-amount')}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-royal-50 border border-royal-100 text-xs font-bold text-royal-700 active:scale-95 transition"
        >
          <PlusCircle className="w-3.5 h-3.5 text-turquoise-600" /> New Request
        </button>
      </header>

      {/* Dual Balance Hero */}
      <section className="rounded-3xl p-5 bg-gradient-to-br from-[#1D4ED8] via-[#0EA5E9] to-[#06B6D4] text-white shadow-fintech-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-50 flex items-center gap-1.5">
            <Wallet className="w-4 h-4" /> Illustrative Loan Balance
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
            Demo Funds
          </span>
        </div>
        <div className="text-4xl font-extrabold tabular-nums tracking-tight">
          ${state.walletBalance.toFixed(2)}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/20">
          <div>
            <p className="text-[10px] text-blue-100 font-semibold uppercase">Outstanding Balance</p>
            <p className="text-base font-extrabold tabular-nums mt-0.5">
              ${state.outstandingBalance.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-blue-100 font-semibold uppercase">Membership</p>
            <p className="text-xs font-extrabold mt-1 flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-turquoise-100" />
              {state.membership.isActive ? 'Plus ($5.99/mo)' : 'Free Basic'}
            </p>
          </div>
        </div>
      </section>

      {/* Repayment Summary Card */}
      <section className="p-4 rounded-2xl bg-white border border-royal-100 shadow-card flex items-center justify-between gap-3">
        <RepaymentRing paidRatio={paidRatio} label="Repaid" />
        <div className="flex-1 min-w-0">
          <h2 className="text-xs font-extrabold text-navy">Repayment Summary</h2>
          <p className="text-[11px] text-charcoal mt-0.5 leading-snug">
            {state.outstandingBalance > 0
              ? `Next illustrative payment of $${state.outstandingBalance.toFixed(2)} due ${state.nextRepaymentDate}.`
              : 'All illustrative loan balances are currently settled!'}
          </p>
          <button
            onClick={() => onNavigate('repayment')}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-royal-600 hover:underline"
          >
            <CalendarCheck className="w-3.5 h-3.5" /> Go to Repayment
          </button>
        </div>
      </section>

      {/* Transaction History */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-navy">Transaction History</h2>
          <span className="text-[10px] font-semibold text-slate-400">
            Loans & fees separated
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {(
            [
              { id: 'all', label: 'All' },
              { id: 'loan', label: 'Loans' },
              { id: 'repayment', label: 'Repayments' },
              { id: 'membership', label: 'Membership' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition ${
                filter === tab.id
                  ? 'bg-royal-600 text-white'
                  : 'bg-royal-50 text-charcoal hover:bg-royal-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filteredTx.map((tx) => {
            const isPositive = tx.amount >= 0;
            return (
              <div
                key={tx.id}
                className="p-3.5 rounded-2xl bg-white border border-royal-100 shadow-card flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isPositive
                        ? 'bg-turquoise-50 text-turquoise-600'
                        : tx.type === 'membership'
                        ? 'bg-royal-50 text-royal-600'
                        : 'bg-skyaccent-50 text-skyaccent-500'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-navy truncate">{tx.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {tx.date} · {tx.subtitle}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span
                    className={`text-xs font-extrabold tabular-nums ${
                      isPositive ? 'text-turquoise-600' : 'text-navy'
                    }`}
                  >
                    {isPositive
                      ? `+$${tx.amount.toFixed(2)}`
                      : `-$${Math.abs(tx.amount).toFixed(2)}`}
                  </span>
                  <span className="block text-[9px] font-semibold text-slate-400">{tx.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
