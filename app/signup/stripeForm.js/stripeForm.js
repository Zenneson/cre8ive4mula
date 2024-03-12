"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";

export default function StripForm(props) {
  const { clientSecret } = props;
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBL);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    )
  );
}
