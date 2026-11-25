import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppState, IncomeInfo, MembershipState, ResultStatus, ScreenId, UserProfile } from './types';
import {
  INITIAL_PAYMENT_METHODS,
  INITIAL_TRANSACTIONS,
  calculateIllustrativeSummary,
} from './data/mockData';
import { MobileFrame } from './components/MobileFrame';
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { AuthScreen } from './screens/AuthScreen';
import { HomeDashboardScreen } from './screens/HomeDashboardScreen';
import { LoanAmountScreen } from './screens/LoanAmountScreen';
import { IncomeVerificationScreen } from './screens/IncomeVerificationScreen';
import { LoanSummaryScreen } from './screens/LoanSummaryScreen';
import { MembershipScreen } from './screens/MembershipScreen';
import { ApplicationResultScreen } from './screens/ApplicationResultScreen';
import { WalletScreen } from './screens/WalletScreen';
import { RepaymentScreen } from './screens/RepaymentScreen';
import { ProfileScreen } from './screens/ProfileScreen';

const createInitialState = (): AppState => ({
  currentScreen: 'splash',
  user: {
    fullName: 'Victor Lynn Laws Jr.',
    email: 'vlawsjr@gmail.com',
    phone: '(254) 878-3396',
    countryCode: 'US',
    verified: true,
  },
  selectedLoanAmount: 35,
  income: {
    employmentStatus: 'Full-Time Employed',
    incomeSource: 'Employer Direct Deposit',
    monthlyIncome: 2400,
    frequency: 'Bi-Weekly',
    nextPayday: '2026-12-04',
    documentName: null,
  },
  membership: {
    isActive: false,
    monthlyPrice: 5.99,
    billingFrequency: 'Monthly',
    nextBillingDate: 'Dec 25, 2026',
    consented: false,
    enrolledAt: null,
  },
  resultStatus: 'approved',
  walletBalance: 45.0,
  outstandingBalance: 46.8,
  nextRepaymentDate: 'Dec 04, 2026',
  transactions: INITIAL_TRANSACTIONS,
  paymentMethods: INITIAL_PAYMENT_METHODS,
  selectedPaymentMethodId: INITIAL_PAYMENT_METHODS[0].id,
});

export function App() {
  const [state, setState] = useState<AppState>(createInitialState);
  const [authInitialMode, setAuthInitialMode] = useState<'register' | 'login'>('register');

  const navigate = (screen: ScreenId) => {
    setState((prev) => ({ ...prev, currentScreen: screen }));
  };

  const handleAuthComplete = (updatedUser: UserProfile) => {
    setState((prev) => ({
      ...prev,
      user: updatedUser,
      currentScreen: 'home',
    }));
  };

  const handleSubmitApplication = () => {
    const summary = calculateIllustrativeSummary(state.selectedLoanAmount);
    // Determine simulated default outcome based on affordability ratio (can still be toggled on Result screen)
    const ratio =
      state.income.monthlyIncome > 0
        ? state.selectedLoanAmount / state.income.monthlyIncome
        : 1;
    const simulatedOutcome: ResultStatus =
      ratio <= 0.15 ? 'approved' : ratio <= 0.3 ? 'review' : 'more-info';

    setState((prev) => ({
      ...prev,
      resultStatus: simulatedOutcome,
      walletBalance:
        simulatedOutcome === 'approved'
          ? Number((prev.walletBalance + summary.principal).toFixed(2))
          : prev.walletBalance,
      outstandingBalance:
        simulatedOutcome === 'approved'
          ? Number((prev.outstandingBalance + summary.totalRepayment).toFixed(2))
          : prev.outstandingBalance,
      transactions:
        simulatedOutcome === 'approved'
          ? [
              {
                id: `tx-${Date.now()}`,
                title: 'Micro-Loan Demo Disbursement',
                subtitle: 'Illustrative Application Approved',
                date: 'Nov 25, 2026',
                amount: summary.principal,
                type: 'loan',
                status: 'Simulated',
              },
              ...prev.transactions,
            ]
          : prev.transactions,
      currentScreen: 'result',
    }));
  };

  const handleSimulatedPayment = (paidAmount: number) => {
    setState((prev) => ({
      ...prev,
      outstandingBalance: Math.max(0, Number((prev.outstandingBalance - paidAmount).toFixed(2))),
      transactions: [
        {
          id: `tx-pay-${Date.now()}`,
          title: 'Repayment Completed (Demo)',
          subtitle:
            prev.paymentMethods.find((p) => p.id === prev.selectedPaymentMethodId)?.label ||
            'Simulated Method',
          date: 'Nov 25, 2026',
          amount: -paidAmount,
          type: 'repayment',
          status: 'Completed',
        },
        ...prev.transactions,
      ],
    }));
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'splash':
        return <SplashScreen onContinue={() => navigate('onboarding')} />;
      case 'onboarding':
        return (
          <OnboardingScreen
            onGetStarted={() => {
              setAuthInitialMode('register');
              navigate('auth');
            }}
            onSignIn={() => {
              setAuthInitialMode('login');
              navigate('auth');
            }}
          />
        );
      case 'auth':
        return (
          <AuthScreen
            initialMode={authInitialMode}
            user={state.user}
            onComplete={handleAuthComplete}
          />
        );
      case 'home':
        return <HomeDashboardScreen state={state} onNavigate={navigate} />;
      case 'loan-amount':
        return (
          <LoanAmountScreen
            amount={state.selectedLoanAmount}
            onChangeAmount={(val) => setState((prev) => ({ ...prev, selectedLoanAmount: val }))}
            onBack={() => navigate('home')}
            onContinue={() => navigate('income')}
          />
        );
      case 'income':
        return (
          <IncomeVerificationScreen
            income={state.income}
            selectedLoanAmount={state.selectedLoanAmount}
            onUpdateIncome={(income: IncomeInfo) => setState((prev) => ({ ...prev, income }))}
            onBack={() => navigate('loan-amount')}
            onContinue={() => navigate('loan-summary')}
          />
        );
      case 'loan-summary':
        return (
          <LoanSummaryScreen
            selectedAmount={state.selectedLoanAmount}
            nextPayday={state.income.nextPayday}
            onBack={() => navigate('income')}
            onContinue={() => navigate('membership')}
          />
        );
      case 'membership':
        return (
          <MembershipScreen
            membership={state.membership}
            onUpdateMembership={(membership: MembershipState) =>
              setState((prev) => ({ ...prev, membership }))
            }
            onBack={() => navigate('loan-summary')}
            onSubmitApplication={handleSubmitApplication}
          />
        );
      case 'result':
        return (
          <ApplicationResultScreen
            status={state.resultStatus}
            selectedAmount={state.selectedLoanAmount}
            onChangeStatus={(resultStatus) => setState((prev) => ({ ...prev, resultStatus }))}
            onContinueToWallet={() => navigate('wallet')}
            onGoToIncome={() => navigate('income')}
            onGoHome={() => navigate('home')}
          />
        );
      case 'wallet':
        return <WalletScreen state={state} onNavigate={navigate} />;
      case 'repayment':
        return (
          <RepaymentScreen
            state={state}
            onSelectPaymentMethod={(id) =>
              setState((prev) => ({ ...prev, selectedPaymentMethodId: id }))
            }
            onSubmitSimulatedPayment={handleSimulatedPayment}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            state={state}
            onNavigate={navigate}
            onCancelMembership={() =>
              setState((prev) => ({
                ...prev,
                membership: { ...prev.membership, isActive: false, consented: false },
              }))
            }
            onResetDemo={() => setState({ ...createInitialState(), currentScreen: 'home' })}
          />
        );
    }
  };

  return (
    <MobileFrame currentScreen={state.currentScreen} onNavigate={navigate}>
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentScreen}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="min-h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </MobileFrame>
  );
}

export default App;
