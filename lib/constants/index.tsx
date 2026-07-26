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

export const SUBSCRIPTIONS = process.env.SUBSCRIPTIONS ? process.env.SUBSCRIPTIONS.split(', ') : ["MONTHLY", "THREE_MONTHS", "YEARLY"];