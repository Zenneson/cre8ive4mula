"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Form from "./form";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBL);

export default function Login() {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

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
        <Form />
      </Elements>
    )
  );
}
