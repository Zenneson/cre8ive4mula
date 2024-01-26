"use client";
import { Box, Center } from "@mantine/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Form from "./form";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBL);

export default function Register() {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("./api/create-payment-intent.js", {
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
    <Center w={"100vw"} h={"100vh"}>
      <Box className="panel" w={500}>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <Form />
          </Elements>
        )}
      </Box>
    </Center>
  );
}
