import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 2600);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="min-h-full h-full flex flex-col justify-between px-6 py-8 bg-gradient-to-b from-[#DBEAFE]/70 via-[#EFF6FF] to-[#F8FBFF] relative overflow-hidden">
      {/* Decorative soft sky-blue orbs */}
      <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-turquoise-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-royal-100/70 blur-3xl pointer-events-none" />

      {/* Top badge */}
      <div className="flex justify-center pt-2 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-royal-100 text-[11px] font-semibold text-royal-700 shadow-card">
          <Globe2 className="w-3.5 h-3.5 text-turquoise-500" />
          Global Micro-Loan Prototype
        </span>
      </div>

      {/* Center animated logo */}
      <div className="flex flex-col items-center text-center relative z-10 my-auto">
        <motion.div
          initial={{ scale: 0.78, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative mb-6"
        >
          {/* Pulse rings */}
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-3xl bg-skyaccent-400/25 -m-3"
          />
          <div className="relative p-4 rounded-3xl bg-white shadow-fintech border border-royal-100">
            <BrandLogo size="lg" showWordmark={false} />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">
            Micro
            <span className="bg-gradient-to-r from-royal-600 to-turquoise-500 bg-clip-text text-transparent">
              Cash
            </span>
          </h1>
          <p className="text-sm font-medium text-charcoal mt-2 max-w-[240px] mx-auto leading-relaxed">
            Accessible $5–$75 micro-loans built around your real income, worldwide.
          </p>
        </motion.div>

        {/* Animated loading bar */}
        <div className="w-44 h-1.5 bg-royal-100 rounded-full overflow-hidden mt-8">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="h-full w-full bg-gradient-to-r from-royal-600 via-skyaccent-500 to-turquoise-500 rounded-full"
          />
        </div>
      </div>

      {/* Bottom CTA & Demo Disclosure */}
      <div className="relative z-10 space-y-3">
        <button
          onClick={onContinue}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white font-bold text-sm shadow-fintech flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          Enter Experience
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-turquoise-500" />
          Simulated Fintech Prototype · By The Brand Design
        </p>
      </div>
    </div>
  );
};
