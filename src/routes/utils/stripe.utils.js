import {loadStripe} from '@stripe/stripe-js'

const publicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY

// 创建Stripe实例
export const stripePromise = loadStripe(publicKey);