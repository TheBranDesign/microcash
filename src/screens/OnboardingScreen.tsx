import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { OnboardingIllustration } from '../components/Illustrations';

interface OnboardingScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

const SLIDES = [
  {
    badge: 'Accessible Micro-Support',
    title: 'Financial support when you need it',
    description:
      'Request illustrative micro-loans from $5 to $75 with a fast, mobile-first experience built for everyday global needs.',
  },
  {
    badge: 'Affordability-First UX',
    title: 'Simple income-based application experience',
    description:
      'No traditional credit-score application process. Eligibility focuses on your real income and repayment affordability.',
  },
  {
    badge: 'Clear & Predictable',
    title: 'Transparent and manageable repayment information',
    description:
      'See every illustrative fee, repayment date, and schedule upfront before you submit—subject to local regulations.',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onGetStarted,
  onSignIn,
}) => {
  const [slideIdx, setSlideIdx] = useState<0 | 1 | 2>(0);

  const handleNext = () => {
    if (slideIdx < 2) {
      setSlideIdx((prev) => (prev + 1) as 0 | 1 | 2);
    } else {
      onGetStarted();
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between px-5 py-5 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF]">
      {/* Header */}
      <div className="flex items-center justify-between">
        {slideIdx > 0 ? (
          <button
            onClick={() => setSlideIdx((prev) => (prev - 1) as 0 | 1 | 2)}
            className="w-9 h-9 rounded-full bg-royal-50 text-royal-700 flex items-center justify-center active:scale-95 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <BrandLogo size="sm" />
        )}
        <button
          onClick={onGetStarted}
          className="text-xs font-bold text-royal-600 hover:text-royal-700 px-2.5 py-1 rounded-lg"
        >
          Skip
        </button>
      </div>

      {/* Animated Slide Content */}
      <div className="my-auto py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.28 }}
            className="text-center"
          >
            <div className="mb-6 animate-float-slow">
              <OnboardingIllustration slide={slideIdx} />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-royal-50 border border-royal-100 text-[11px] font-bold text-royal-700 mb-3">
              {SLIDES[slideIdx].badge}
            </span>

            <h2 className="text-2xl font-extrabold text-navy tracking-tight leading-snug px-2">
              {SLIDES[slideIdx].title}
            </h2>

            <p className="text-sm text-charcoal mt-3 leading-relaxed px-2">
              {SLIDES[slideIdx].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-7">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setSlideIdx(idx as 0 | 1 | 2)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                slideIdx === idx
                  ? 'w-7 bg-gradient-to-r from-royal-600 to-turquoise-500'
                  : 'w-2 bg-royal-100 hover:bg-royal-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white font-bold text-sm shadow-fintech flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          {slideIdx < 2 ? 'Continue' : 'Get Started'}
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onSignIn}
          className="w-full py-3.5 px-5 rounded-2xl bg-royal-50 hover:bg-royal-100/80 text-royal-700 font-bold text-sm border border-royal-100 active:scale-[0.98] transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
