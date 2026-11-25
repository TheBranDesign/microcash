export type ScreenId =
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'home'
  | 'loan-amount'
  | 'income'
  | 'loan-summary'
  | 'membership'
  | 'result'
  | 'wallet'
  | 'repayment'
  | 'profile';

export type ResultStatus = 'approved' | 'review' | 'more-info';

export type EmploymentStatus =
  | 'Full-Time Employed'
  | 'Part-Time Employed'
  | 'Self-Employed / Freelance'
  | 'Gig / Platform Worker'
  | 'Other Regular Income';

export type IncomeFrequency = 'Weekly' | 'Bi-Weekly' | 'Semi-Monthly' | 'Monthly';

export interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  currency: string;
  regulatoryNote: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  verified: boolean;
}

export interface IncomeInfo {
  employmentStatus: EmploymentStatus;
  incomeSource: string;
  monthlyIncome: number;
  frequency: IncomeFrequency;
  nextPayday: string;
  documentName: string | null;
}

export interface MembershipState {
  isActive: boolean;
  monthlyPrice: number;
  billingFrequency: 'Monthly';
  nextBillingDate: string;
  consented: boolean;
  enrolledAt: string | null;
}

export interface TransactionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  amount: number;
  type: 'loan' | 'repayment' | 'membership';
  status: 'Simulated' | 'Scheduled' | 'Completed';
}

export interface PaymentMethod {
  id: string;
  label: string;
  detail: string;
  type: 'card' | 'mobile' | 'bank';
  isDefault?: boolean;
}

export interface AppState {
  currentScreen: ScreenId;
  user: UserProfile;
  selectedLoanAmount: number;
  income: IncomeInfo;
  membership: MembershipState;
  resultStatus: ResultStatus;
  walletBalance: number;
  outstandingBalance: number;
  nextRepaymentDate: string;
  transactions: TransactionItem[];
  paymentMethods: PaymentMethod[];
  selectedPaymentMethodId: string;
}
