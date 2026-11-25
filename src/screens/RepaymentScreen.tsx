import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { AppState } from '../types';

interface RepaymentScreenProps {
  state: AppState;
  onSelectPaymentMethod: (id: string) => void;
  onSubmitSimulatedPayment: (amount: number) => void;
}

export const RepaymentScreen: React.FC<RepaymentScreenProps> = ({
  state,
  onSelectPaymentMethod,
  onSubmitSimulatedPayment,
}) => {
  const [payMode, setPayMode] = useState<'full' | 'partial'>('full');
  const [partialAmount, setPartialAmount] = useState(
    Math.min(15, state.outstandingBalance || 15)
  );
  const [processing, setProcessing] = useState(false);
  const [paidReceipt, setPaidReceipt] = useState<number | null>(null);

  const amountToPay =
    state.outstandingBalance <= 0
      ? 0
      : payMode === 'full'
      ? state.outstandingBalance
      : Math.min(state.outstandingBalance, Math.max(5, partialAmount));

  const handlePay = () => {
    if (amountToPay <= 0) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaidReceipt(amountToPay);
      onSubmitSimulatedPayment(amountToPay);
    }, 750);
  };

  const getMethodIcon = (type: 'card' | 'mobile' | 'bank') => {
    if (type === 'card') return CreditCard;
    if (type === 'mobile') return Smartphone;
    return Building2;
  };

  return (
    <div className="px-4 pt-3 pb-6 space-y-4 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF]">
      <header>
        <span className="text-[11px] font-bold uppercase tracking-wider text-royal-600">
          Simulated Repayment
        </span>
        <h1 className="text-xl font-extrabold text-navy tracking-tight">
          Repayment & Schedule
        </h1>
      </header>

      {/* Outstanding Balance Card */}
      <section className="p-4 rounded-3xl bg-gradient-to-br from-[#EFF6FF] via-[#FFFFFF] to-[#ECFEFF] border border-royal-100 shadow-fintech">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-slate-500">Outstanding Balance (Demo)</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-royal-100 text-[10px] font-bold text-royal-700">
            <CalendarClock className="w-3 h-3 text-turquoise-500" />
            Due {state.nextRepaymentDate}
          </span>
        </div>
        <div className="text-4xl font-extrabold text-navy tabular-nums">
          ${state.outstandingBalance.toFixed(2)}
        </div>
        <p className="text-[11px] text-charcoal mt-1">
          {state.outstandingBalance > 0
            ? 'Pay in full or make an illustrative partial payment anytime with zero prepayment penalty.'
            : 'No outstanding illustrative balance remaining.'}
        </p>
      </section>

      {/* Payment Receipt Banner */}
      <AnimatePresence>
        {paidReceipt !== null && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3.5 rounded-2xl bg-turquoise-50 border border-turquoise-200 flex items-center gap-3"
          >
            <CheckCircle2 className="w-6 h-6 text-turquoise-600 shrink-0" />
            <div>
              <p className="text-xs font-extrabold text-navy">
                Simulated Payment Recorded (${paidReceipt.toFixed(2)})
              </p>
              <p className="text-[11px] text-charcoal">
                Your Demo Wallet and transaction history have been updated.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Amount Selection */}
      {state.outstandingBalance > 0 && (
        <section className="p-4 rounded-2xl bg-white border border-royal-100 shadow-card space-y-3">
          <h2 className="text-xs font-extrabold text-navy">Choose Payment Amount</h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPayMode('full')}
              className={`p-3 rounded-xl border text-left transition ${
                payMode === 'full'
                  ? 'bg-royal-50 border-royal-500 text-royal-700'
                  : 'bg-white border-royal-100 text-charcoal'
              }`}
            >
              <span className="block text-[10px] font-bold uppercase">Full Balance</span>
              <span className="text-base font-extrabold tabular-nums">
                ${state.outstandingBalance.toFixed(2)}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPayMode('partial')}
              className={`p-3 rounded-xl border text-left transition ${
                payMode === 'partial'
                  ? 'bg-royal-50 border-royal-500 text-royal-700'
                  : 'bg-white border-royal-100 text-charcoal'
              }`}
            >
              <span className="block text-[10px] font-bold uppercase">Partial Demo</span>
              <span className="text-base font-extrabold tabular-nums">
                ${Math.min(state.outstandingBalance, Math.max(5, partialAmount)).toFixed(2)}
              </span>
            </button>
          </div>

          {payMode === 'partial' && (
            <div>
              <label className="block text-[11px] font-bold text-charcoal mb-1">
                Custom Partial Amount ($5 – ${state.outstandingBalance.toFixed(2)})
              </label>
              <input
                type="number"
                min={5}
                max={state.outstandingBalance}
                value={partialAmount}
                onChange={(e) => setPartialAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-royal-50/60 border border-royal-100 text-sm font-bold text-navy tabular-nums outline-none focus:border-royal-500"
              />
            </div>
          )}
        </section>
      )}

      {/* Payment Method Interface */}
      <section className="space-y-2">
        <h2 className="text-xs font-extrabold text-navy">Payment Method (Simulated)</h2>
        <div className="space-y-2">
          {state.paymentMethods.map((pm) => {
            const Icon = getMethodIcon(pm.type);
            const selected = state.selectedPaymentMethodId === pm.id;
            return (
              <button
                key={pm.id}
                type="button"
                onClick={() => onSelectPaymentMethod(pm.id)}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition ${
                  selected
                    ? 'bg-royal-50/80 border-royal-500 shadow-xs'
                    : 'bg-white border-royal-100 hover:bg-royal-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      selected
                        ? 'bg-royal-600 text-white'
                        : 'bg-royal-50 text-royal-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-navy">{pm.label}</p>
                    <p className="text-[11px] text-slate-400">{pm.detail}</p>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selected ? 'border-royal-600' : 'border-slate-300'
                  }`}
                >
                  {selected && <div className="w-2 h-2 rounded-full bg-royal-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Submit Payment CTA */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          disabled={state.outstandingBalance <= 0 || processing}
          onClick={handlePay}
          className={`w-full py-3.5 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${
            state.outstandingBalance > 0
              ? 'bg-gradient-to-r from-royal-600 to-turquoise-500 text-white shadow-fintech active:scale-[0.98]'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {processing
            ? 'Processing Simulated Payment...'
            : state.outstandingBalance > 0
            ? `Submit Simulated Payment ($${amountToPay.toFixed(2)})`
            : 'Balance Settled'}
        </button>

        <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-turquoise-500" />
          Demonstration only — no real funds or cards are charged
        </p>
      </div>
    </div>
  );
};
