export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "KidQuest";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Interactive educational website for children";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";
export const signInDefoltValues = {
    email: '',
    password: '',
}

export const signUpDefoltValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export const PAYMENT_METHODS =process.env.PAYMENT_METHODS ? process.env.PAYMENT_METHODS.split(', ') : ['PayPal', 'Stripe'];

export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';


export const SUBSCRIPTION_PLANS = [
  {
    value: "MONTHLY",
    title: "Monthly",
    description: "Great to get started",
    price: 9.99,
    duration: "month",
    autoRenew: true,
    buttonText: "Choose Monthly",
    features: [
      "Full access to all subjects",
      "Unlimited quests and activities",
      "Track progress",
      "Cancel anytime",
    ],
  },
  {
    value: "THREE_MONTHS",
    title: "3 Months",
    description: "Save more",
    price: 24.99,
    duration: "3 months",
    autoRenew: true,
    buttonText: "Choose 3 Months",
    badge: "Most popular",
    features: [
      "All Monthly benefits",
      "Save 17%",
      "Priority support",
      "Cancel anytime",
    ],
  },
  {
    value: "YEARLY",
    title: "Yearly",
    description: "Best value",
    price: 79.99,
    duration: "year",
    autoRenew: false,
    buttonText: "Choose Yearly",
    features: [
      "All Monthly benefits",
      "Save 33%",
      "Priority support",
      "Cancel anytime",
    ],
  },
] as const;