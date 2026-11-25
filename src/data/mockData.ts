import { CountryOption, PaymentMethod, TransactionItem } from '../types';

export const COUNTRIES: CountryOption[] = [
  {
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
    currency: 'USD',
    regulatoryNote: 'Subject to state-level micro-lending & consumer finance regulations.',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    dialCode: '+44',
    flag: '🇬🇧',
    currency: 'GBP',
    regulatoryNote: 'Subject to FCA consumer credit authorization in your jurisdiction.',
  },
  {
    code: 'CA',
    name: 'Canada',
    dialCode: '+1',
    flag: '🇨🇦',
    currency: 'CAD',
    regulatoryNote: 'Subject to provincial consumer protection & small-sum lending rules.',
  },
  {
    code: 'KE',
    name: 'Kenya',
    dialCode: '+254',
    flag: '🇰🇪',
    currency: 'KES',
    regulatoryNote: 'Subject to Central Bank of Kenya digital credit provider licensing.',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    dialCode: '+234',
    flag: '🇳🇬',
    currency: 'NGN',
    regulatoryNote: 'Subject to FCCPC & CBN digital lending registration requirements.',
  },
  {
    code: 'PH',
    name: 'Philippines',
    dialCode: '+63',
    flag: '🇵🇭',
    currency: 'PHP',
    regulatoryNote: 'Subject to SEC Philippines & BSP micro-finance guidelines.',
  },
  {
    code: 'MX',
    name: 'Mexico',
    dialCode: '+52',
    flag: '🇲🇽',
    currency: 'MXN',
    regulatoryNote: 'Subject to CNBV & CONDUSEF fintech transparency standards.',
  },
  {
    code: 'BR',
    name: 'Brazil',
    dialCode: '+55',
    flag: '🇧🇷',
    currency: 'BRL',
    regulatoryNote: 'Subject to Banco Central do Brasil direct credit society rules.',
  },
  {
    code: 'IN',
    name: 'India',
    dialCode: '+91',
    flag: '🇮🇳',
    currency: 'INR',
    regulatoryNote: 'Subject to RBI digital lending & NBFC partnership regulations.',
  },
];

export const QUICK_AMOUNTS = [5, 10, 15, 25, 50, 75];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx-101',
    title: 'Micro-Loan Demo Disbursement',
    subtitle: 'Illustrative Bridge Credit #MC-2041',
    date: 'Nov 18, 2026',
    amount: 45.0,
    type: 'loan',
    status: 'Simulated',
  },
  {
    id: 'tx-102',
    title: 'Repayment Completed (Demo)',
    subtitle: 'Visa Debit •••• 4242',
    date: 'Nov 12, 2026',
    amount: -25.0,
    type: 'repayment',
    status: 'Completed',
  },
  {
    id: 'tx-103',
    title: 'MicroCash Plus Membership',
    subtitle: 'Optional Monthly Plan (Separate Fee)',
    date: 'Nov 01, 2026',
    amount: -5.99,
    type: 'membership',
    status: 'Simulated',
  },
];

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm-card',
    label: 'Visa Debit',
    detail: '•••• 4242 · Exp 09/28',
    type: 'card',
    isDefault: true,
  },
  {
    id: 'pm-mobile',
    label: 'Mobile Money Wallet',
    detail: 'Instant Mobile Transfer (Demo)',
    type: 'mobile',
  },
  {
    id: 'pm-bank',
    label: 'Linked Checking Account',
    detail: 'ACH / Local Bank •••• 8819',
    type: 'bank',
  },
];

export function calculateIllustrativeSummary(amount: number) {
  // Transparent, illustrative demo calculation only — not legally binding loan terms
  const platformFee = Number((amount * 0.04).toFixed(2));
  const illustrativeInterest = 0.0; // 0% illustrative interest in demo
  const totalRepayment = Number((amount + platformFee + illustrativeInterest).toFixed(2));
  return {
    principal: amount,
    platformFee,
    illustrativeInterest,
    totalRepayment,
  };
}

export function getAmountDescription(amount: number): {
  tier: string;
  description: string;
} {
  if (amount <= 15) {
    return {
      tier: 'Everyday Essentials',
      description: 'Ideal for transit fares, mobile data top-ups, or small daily groceries.',
    };
  }
  if (amount <= 35) {
    return {
      tier: 'Short-Term Bridge',
      description: 'Designed to cover utility bills, prescriptions, or unexpected minor expenses.',
    };
  }
  if (amount <= 55) {
    return {
      tier: 'Household Support',
      description: 'Helps manage family groceries, school supplies, or urgent bill gaps.',
    };
  }
  return {
    tier: 'Maximum Micro-Access',
    description: 'Our highest illustrative $75 tier for larger short-term cash-flow needs.',
  };
}

export const AFFORDABILITY_TREND = [
  { label: 'Jun', score: 72 },
  { label: 'Jul', score: 76 },
  { label: 'Aug', score: 79 },
  { label: 'Sep', score: 83 },
  { label: 'Oct', score: 86 },
  { label: 'Nov', score: 91 },
];
