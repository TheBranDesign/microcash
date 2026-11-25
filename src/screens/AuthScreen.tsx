import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react';
import { COUNTRIES } from '../data/mockData';
import { UserProfile } from '../types';
import { BrandLogo } from '../components/BrandLogo';

interface AuthScreenProps {
  initialMode?: 'register' | 'login';
  user: UserProfile;
  onComplete: (updatedUser: UserProfile) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'register',
  user,
  onComplete,
}) => {
  const [mode, setMode] = useState<'register' | 'login'>(initialMode);
  const [fullName, setFullName] = useState(user.fullName || 'Victor Lynn Laws Jr.');
  const [email, setEmail] = useState(user.email || 'vlawsjr@gmail.com');
  const [countryCode, setCountryCode] = useState(user.countryCode || 'US');
  const [phone, setPhone] = useState(user.phone || '(254) 878-3396');
  const [password, setPassword] = useState('MicroCash2026!');
  const [confirmPassword, setConfirmPassword] = useState('MicroCash2026!');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulated verification modal
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'register') {
      if (fullName.trim().length < 2) {
        setError('Please enter your full name.');
        return;
      }
      if (!email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      if (phone.trim().length < 7) {
        setError('Please enter a valid phone number.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    } else {
      if (!email.includes('@') || password.length < 6) {
        setError('Please enter a valid email and password.');
        return;
      }
    }

    setShowVerifyModal(true);
  };

  const handleVerifyOtp = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setShowVerifyModal(false);
      onComplete({
        fullName: fullName.trim() || 'Victor Laws',
        email: email.trim(),
        phone: phone.trim(),
        countryCode,
        verified: true,
      });
    }, 650);
  };

  return (
    <div className="min-h-full px-5 py-5 bg-gradient-to-b from-[#F8FBFF] to-[#FFFFFF] relative">
      <div className="flex items-center justify-between mb-5">
        <BrandLogo size="sm" />
        <span className="px-2.5 py-1 rounded-full bg-royal-50 text-royal-700 text-[10px] font-bold">
          Demo Account
        </span>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-royal-50 border border-royal-100 mb-5">
        <button
          type="button"
          onClick={() => {
            setMode('register');
            setError(null);
          }}
          className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'register'
              ? 'bg-white text-royal-700 shadow-card'
              : 'text-slate-500 hover:text-navy'
          }`}
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setError(null);
          }}
          className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'login'
              ? 'bg-white text-royal-700 shadow-card'
              : 'text-slate-500 hover:text-navy'
          }`}
        >
          Sign In
        </button>
      </div>

      <h1 className="text-xl font-extrabold text-navy tracking-tight">
        {mode === 'register' ? 'Join MicroCash Global' : 'Welcome back'}
      </h1>
      <p className="text-xs text-charcoal mt-1 mb-4">
        {mode === 'register'
          ? 'No credit-score check required. Verify your profile in seconds.'
          : 'Sign in to view your simulated micro-loan dashboard.'}
      </p>

      {error && (
        <div className="mb-3 px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 pb-4">
        {mode === 'register' && (
          <div>
            <label className="block text-[11px] font-bold text-charcoal mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 focus:ring-2 focus:ring-royal-100 text-sm text-navy outline-none transition"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[11px] font-bold text-charcoal mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 focus:ring-2 focus:ring-royal-100 text-sm text-navy outline-none transition"
            />
          </div>
        </div>

        {mode === 'register' && (
          <>
            <div>
              <label className="block text-[11px] font-bold text-charcoal mb-1">
                Country / Jurisdiction
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 focus:ring-2 focus:ring-royal-100 text-sm text-navy outline-none transition"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name} ({c.currency})
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[10px] text-royal-700 bg-royal-50/80 border border-royal-100 rounded-lg px-2.5 py-1.5 mt-1.5">
                {selectedCountry.regulatoryNote}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-charcoal mb-1">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="px-3 py-2.5 rounded-xl bg-royal-50 border border-royal-100 text-xs font-bold text-royal-700 flex items-center shrink-0">
                  {selectedCountry.flag} {selectedCountry.dialCode}
                </div>
                <div className="relative flex-1">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(254) 878-3396"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 focus:ring-2 focus:ring-royal-100 text-sm text-navy outline-none transition"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block text-[11px] font-bold text-charcoal mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 focus:ring-2 focus:ring-royal-100 text-sm text-navy outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-charcoal"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mode === 'register' && (
          <div>
            <label className="block text-[11px] font-bold text-charcoal mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPass ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-royal-100 focus:border-royal-500 focus:ring-2 focus:ring-royal-100 text-sm text-navy outline-none transition"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white font-bold text-sm shadow-fintech active:scale-[0.98] transition"
        >
          {mode === 'register' ? 'Continue & Verify' : 'Sign In (Simulated)'}
        </button>

        <p className="text-[10px] text-center text-slate-400 leading-relaxed pt-1">
          Demonstration prototype using simulated data. Global availability is subject to
          country-specific lending regulations.
        </p>
      </form>

      {/* Simulated Verification Modal */}
      <AnimatePresence>
        {showVerifyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-navy/25 backdrop-blur-xs flex items-end md:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="w-full bg-white rounded-3xl p-5 border border-royal-100 shadow-fintech-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-turquoise-50 text-turquoise-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-navy text-center">
                Simulated Identity Verification
              </h3>
              <p className="text-xs text-charcoal text-center mt-1 mb-4">
                Enter any 4-digit demo code sent to <span className="font-semibold">{phone}</span>
              </p>

              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="• • • •"
                className="w-full text-center tracking-[0.6em] font-mono text-xl font-bold py-3 rounded-2xl bg-royal-50/70 border border-royal-200 text-navy outline-none focus:border-royal-500 mb-3"
              />

              <button
                type="button"
                onClick={() => setOtpCode('4829')}
                className="w-full text-xs font-bold text-royal-600 hover:text-royal-700 mb-4"
              >
                Tap to auto-fill demo code (4829)
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(false)}
                  className="py-3 rounded-xl bg-slate-100 text-charcoal text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifying}
                  className="py-3 rounded-xl bg-gradient-to-r from-royal-600 to-turquoise-500 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  {verifying ? (
                    'Verifying...'
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Verify Now
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
