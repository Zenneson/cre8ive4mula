"use client";
import { Button, Checkbox, Divider, Group, Input, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

// REGISTER FORM
export default function Form() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      password: "",
    },
    validate: {
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => value.trim().length >= 6,
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Stack gap={20}>
        <Group grow w={"100%"} gap={20}>
          <Input
            required
            placeholder="First Name"
            name="firstName"
            value={form.values.firstName}
            onChange={(event) =>
              form.setFieldValue("firstName", event.currentTarget.value)
            }
            error={form.errors.firstName && "Invalid first name"}
          />
          <Input
            required
            placeholder="Last Name"
            name="lastName"
            value={form.values.lastName}
            onChange={(event) =>
              form.setFieldValue("lastName", event.currentTarget.value)
            }
            error={form.errors.lastName && "Invalid last name"}
          />
        </Group>
        <Input
          placeholder="Company Name"
          name="companyName"
          value={form.values.companyName}
          onChange={(event) =>
            form.setFieldValue("companyName", event.currentTarget.value)
          }
          error={form.errors.companyName && "Invalid company name"}
        />
        <Input
          placeholder="Email"
          name="email"
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email && "Invalid email"}
        />
        <Divider opacity={0.05} />
        <Input
          required
          placeholder="Password"
          type="password"
          name="password"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          error={
            form.errors.password &&
            "Password must be at least 6 characters long"
          }
        />
        <Input
          required
          placeholder="Corfim Password"
          type="password"
          name="confirmPassword"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("confirmPassword", event.currentTarget.value)
          }
          error={
            form.errors.password &&
            "Password must be at least 6 characters long"
          }
        />
        <Divider opacity={0.05} />

        <Group w={"100%"} justify="space-between">
          <Checkbox label="I agree to the terms and conditions" size="xs" />
          <Button
            w="40%"
            type="submit"
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </Button>
        </Group>
        {message && <div id="payment-message">{message}</div>}
      </Stack>
    </form>
  );
}
