import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileWarning,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ResultStatus } from '../types';

interface ApplicationResultScreenProps {
  status: ResultStatus;
  selectedAmount: number;
  onChangeStatus: (s: ResultStatus) => void;
  onContinueToWallet: () => void;
  onGoToIncome: () => void;
  onGoHome: () => void;
}

export const ApplicationResultScreen: React.FC<ApplicationResultScreenProps> = ({
  status,
  selectedAmount,
  onChangeStatus,
  onContinueToWallet,
  onGoToIncome,
  onGoHome,
}) => {
  return (
    <div className="px-4 pt-3 pb-6 space-y-4 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF] min-h-full flex flex-col justify-between">
      <div className="space-y-4">
        {/* Reviewer Demo State Switcher */}
        <div className="p-1.5 rounded-2xl bg-royal-50 border border-royal-100">
          <p className="text-[9px] font-bold uppercase tracking-wider text-royal-600 text-center mb-1.5">
            Preview All 3 Simulated Result States
          </p>
          <div className="grid grid-cols-3 gap-1">
            {(
              [
                { id: 'approved', label: 'Approved' },
                { id: 'review', label: 'Under Review' },
                { id: 'more-info', label: 'More Info' },
              ] as { id: ResultStatus; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => onChangeStatus(tab.id)}
                className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition ${
                  status === tab.id
                    ? 'bg-white text-royal-700 shadow-card'
                    : 'text-slate-500 hover:text-navy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === 'approved' && (
            <motion.div
              key="approved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl p-5 bg-gradient-to-b from-[#ECFEFF] via-[#FFFFFF] to-[#EFF6FF] border border-turquoise-200 shadow-fintech text-center relative overflow-hidden"
            >
              {/* Animated Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 16 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-royal-600 to-turquoise-500 text-white flex items-center justify-center mx-auto mb-4 shadow-fintech relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-turquoise-400"
                />
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-turquoise-100 text-turquoise-600 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" /> Approved – Simulated Demo
              </span>

              <h1 className="text-xl font-extrabold text-navy tracking-tight">
                Illustrative Request Approved
              </h1>
              <p className="text-xs text-charcoal mt-1">
                Application Ref: <span className="font-mono font-bold">MC-DEMO-8492</span>
              </p>

              <div className="my-5 p-4 rounded-2xl bg-white border border-royal-100 shadow-card">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Illustrative Approved Amount
                </span>
                <div className="text-4xl font-extrabold text-royal-700 tabular-nums mt-1">
                  ${selectedAmount.toFixed(2)}
                </div>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-royal-50 text-royal-700 text-[10px] font-bold">
                  Status: Simulated Disbursement Ready
                </span>
              </div>

              <div className="text-left space-y-2 bg-white/80 rounded-2xl p-3.5 border border-royal-100">
                <p className="text-[11px] font-extrabold text-navy">Next Steps (Demo)</p>
                <p className="text-[11px] text-charcoal leading-relaxed">
                  1. Simulated funds have been reflected in your Demo Wallet.
                  <br />
                  2. Review your illustrative repayment date aligned to your payday.
                </p>
              </div>
            </motion.div>
          )}

          {status === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl p-5 bg-gradient-to-b from-[#EFF6FF] to-[#FFFFFF] border border-royal-200 shadow-fintech text-center"
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-royal-100 text-royal-700 flex items-center justify-center mx-auto mb-4"
              >
                <Clock className="w-10 h-10" />
              </motion.div>

              <span className="inline-block px-3 py-1 rounded-full bg-royal-100 text-royal-700 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                Under Review
              </span>

              <h1 className="text-xl font-extrabold text-navy tracking-tight">
                Affordability Check in Progress
              </h1>
              <p className="text-xs text-charcoal mt-1.5 leading-relaxed">
                Your simulated request for <span className="font-bold">${selectedAmount}.00</span>{' '}
                is undergoing a standard income-affordability review.
              </p>

              <div className="my-5 p-4 rounded-2xl bg-royal-50/70 border border-royal-100 text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Application Status</span>
                  <span className="font-bold text-royal-700">Under Review (Demo)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Estimated Update</span>
                  <span className="font-bold text-navy">Within 2–4 hours (Simulated)</span>
                </div>
              </div>

              <p className="text-[11px] text-charcoal leading-relaxed">
                No credit bureau check is performed. You will receive an in-app notification once
                the simulated review completes.
              </p>
            </motion.div>
          )}

          {status === 'more-info' && (
            <motion.div
              key="more-info"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl p-5 bg-gradient-to-b from-[#F0F9FF] to-[#FFFFFF] border border-skyaccent-200 shadow-fintech text-center"
            >
              <div className="w-20 h-20 rounded-full bg-skyaccent-100 text-skyaccent-500 flex items-center justify-center mx-auto mb-4">
                <FileWarning className="w-10 h-10" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                Additional Information Required
              </span>

              <h1 className="text-xl font-extrabold text-navy tracking-tight">
                Quick Income Clarification Needed
              </h1>
              <p className="text-xs text-charcoal mt-1.5 leading-relaxed">
                To complete your simulated affordability assessment for{' '}
                <span className="font-bold">${selectedAmount}.00</span>, please provide one of the
                following:
              </p>

              <div className="my-4 p-4 rounded-2xl bg-white border border-royal-100 text-left space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-skyaccent-500 shrink-0 mt-0.5" />
                  <span className="text-charcoal">
                    Attach a recent paystub, mobile money statement, or gig earnings screenshot.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-skyaccent-500 shrink-0 mt-0.5" />
                  <span className="text-charcoal">
                    Confirm your upcoming payday date matches your pay frequency.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-3 rounded-2xl bg-royal-50/70 border border-royal-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-turquoise-600 shrink-0" />
          <p className="text-[10px] text-charcoal leading-snug">
            <span className="font-bold text-navy">Demo Disclaimer:</span> Simulated results do not
            represent real financial approval or a binding lending decision.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="space-y-2 pt-2">
        {status === 'approved' && (
          <button
            onClick={onContinueToWallet}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white font-bold text-sm shadow-fintech flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            Continue to Wallet
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {status === 'review' && (
          <button
            onClick={onGoHome}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white font-bold text-sm shadow-fintech flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            Return to Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {status === 'more-info' && (
          <button
            onClick={onGoToIncome}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white font-bold text-sm shadow-fintech flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            Update Income Information
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
