import React, { useState } from 'react';
import {
  Home,
  CircleDollarSign,
  Wallet,
  CalendarCheck,
  User,
  Wifi,
  BatteryFull,
  Signal,
  Sparkles,
  ShieldCheck,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react';
import { ScreenId } from '../types';
import { BrandLogo } from './BrandLogo';

interface MobileFrameProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  children: React.ReactNode;
}

const SCREEN_DIRECTORY: { id: ScreenId; code: string; label: string }[] = [
  { id: 'splash', code: '01', label: 'Splash Screen' },
  { id: 'onboarding', code: '02', label: 'Onboarding (3 Slides)' },
  { id: 'auth', code: '03', label: 'Registration & Login' },
  { id: 'home', code: '04', label: 'Home Dashboard' },
  { id: 'loan-amount', code: '05', label: 'Loan Amount ($5–$75)' },
  { id: 'income', code: '06', label: 'Income Verification' },
  { id: 'loan-summary', code: '07', label: 'Loan Summary' },
  { id: 'membership', code: '08', label: 'Membership ($5.99/mo)' },
  { id: 'result', code: '09', label: 'Application Result' },
  { id: 'wallet', code: '10', label: 'Wallet' },
  { id: 'repayment', code: '11', label: 'Repayment' },
  { id: 'profile', code: '12', label: 'Profile & Disclosures' },
];

const NAV_TABS: { id: ScreenId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'loan-amount', label: 'Apply', icon: CircleDollarSign },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'repayment', label: 'Repay', icon: CalendarCheck },
  { id: 'profile', label: 'Account', icon: User },
];

const SCREENS_WITH_NAV: ScreenId[] = ['home', 'loan-amount', 'wallet', 'repayment', 'profile'];

export const MobileFrame: React.FC<MobileFrameProps> = ({
  currentScreen,
  onNavigate,
  children,
}) => {
  const [showStudioPanel, setShowStudioPanel] = useState(true);
  const showBottomNav = SCREENS_WITH_NAV.includes(currentScreen);

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-[#F8FBFF] via-[#FFFFFF] to-[#EFF6FF] flex items-center justify-center md:p-4 lg:p-6 relative overflow-hidden">
      {/* Subtle Light Fintech Background Grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.45] hidden md:block"
        style={{
          backgroundImage:
            'radial-gradient(#BFDBFE 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1160px] flex items-center justify-center gap-8">
        {/* Desktop Presentation Sidebar (Hidden on Mobile) */}
        {showStudioPanel && (
          <aside className="hidden lg:flex flex-col w-[350px] shrink-0 bg-white/90 backdrop-blur-md border border-royal-100 rounded-3xl p-6 shadow-fintech">
            <div className="flex items-center justify-between mb-4">
              <BrandLogo size="md" showTagline />
              <span className="px-2.5 py-1 rounded-full bg-turquoise-50 border border-turquoise-200 text-turquoise-600 text-[10px] font-bold uppercase tracking-wider">
                Demo Prototype
              </span>
            </div>

            <p className="text-xs text-charcoal leading-relaxed mb-4">
              Interactive mobile-first fintech presentation designed by{' '}
              <span className="font-bold text-navy">The Brand Design</span> for{' '}
              <span className="font-bold text-royal-700">Victor Lynn Laws Jr.</span>
            </p>

            <div className="bg-royal-50/70 border border-royal-100 rounded-2xl p-3 mb-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-royal-700 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-turquoise-600" />
                Compliance & Business Rules
              </div>
              <ul className="text-[11px] text-charcoal space-y-1 leading-snug">
                <li>• $5–$75 micro-loans, income-based UX (no credit score)</li>
                <li>• Optional $5.99/mo membership, separate from loan approval</li>
                <li>• Simulated demo only — no real lending or payments</li>
              </ul>
            </div>

            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Screen Navigator (All 11+ Screens)
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-[340px] overflow-y-auto pr-1">
              {SCREEN_DIRECTORY.map((s) => {
                const active = currentScreen === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => onNavigate(s.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all ${
                      active
                        ? 'bg-gradient-to-r from-royal-600 to-turquoise-500 text-white shadow-sm'
                        : 'text-charcoal hover:bg-royal-50 hover:text-royal-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded-md ${
                          active ? 'bg-white/20 text-white' : 'bg-royal-50 text-royal-600'
                        }`}
                      >
                        {s.code}
                      </span>
                      {s.label}
                    </span>
                    {active && <Sparkles className="w-3.5 h-3.5 opacity-90" />}
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Mobile Device Frame */}
        <div className="relative flex flex-col items-center">
          {/* Toggle Sidebar button on Desktop */}
          <button
            onClick={() => setShowStudioPanel((v) => !v)}
            className="hidden lg:inline-flex items-center gap-1.5 mb-2.5 px-3 py-1.5 rounded-full bg-white border border-royal-100 text-[11px] font-semibold text-charcoal hover:text-royal-600 shadow-card transition"
          >
            {showStudioPanel ? (
              <>
                <PanelRightClose className="w-3.5 h-3.5" /> Focus Phone View
              </>
            ) : (
              <>
                <PanelRightOpen className="w-3.5 h-3.5" /> Show Screen Navigator
              </>
            )}
          </button>

          {/* Smartphone Shell */}
          <div className="w-full md:w-[395px] h-[100dvh] md:h-[820px] md:max-h-[92dvh] bg-white md:rounded-[46px] md:border-[8px] md:border-[#E2E8F0] md:ring-1 md:ring-[#CBD5E1] md:shadow-fintech-lg flex flex-col overflow-hidden relative">
            {/* Realistic Light Status Bar */}
            <div className="shrink-0 h-11 px-6 pt-2 flex items-center justify-between bg-transparent z-30 select-none">
              <span className="text-[13px] font-bold text-[#0F172A] tabular-nums">9:41</span>
              {/* Subtle Dynamic Island Pill (Desktop frame) */}
              <div className="hidden md:block w-24 h-6 rounded-full bg-[#F1F5F9] border border-[#E2E8F0]" />
              <div className="flex items-center gap-1.5 text-[#0F172A]">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <BatteryFull className="w-4 h-4 text-royal-600" />
              </div>
            </div>

            {/* Scrollable App Viewport */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-white">
              {children}
            </main>

            {/* Fixed Bottom Navigation */}
            {showBottomNav && (
              <nav className="shrink-0 bg-white/95 backdrop-blur-md border-t border-royal-100 px-3 pt-2 pb-4 md:pb-3 z-30">
                <div className="grid grid-cols-5 gap-1">
                  {NAV_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = currentScreen === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => onNavigate(tab.id)}
                        className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all active:scale-95 ${
                          isActive ? 'text-royal-600' : 'text-slate-400 hover:text-charcoal'
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-xl transition-colors ${
                            isActive ? 'bg-royal-50 text-royal-600' : ''
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            )}

            {/* Home Indicator */}
            <div className="hidden md:flex shrink-0 h-4 bg-white items-center justify-center">
              <div className="w-28 h-1 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
