import { loadStripe } from "@stripe/stripe-js";

export function getStripe() {
  let session;
  if (!session) {
    session = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return session;
}
