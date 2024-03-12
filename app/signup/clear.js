"use client";
import { useSignupForm } from "@libs/store";
import { Button } from "@mantine/core";
import {} from "react";

export default function Clear() {
  const { setPaymentPanel, setClientInfo, setSignupAccount } = useSignupForm();

  return (
    <Button
      className={"removeDetails"}
      pos={"fixed"}
      top={10}
      right={10}
      onClick={() => {
        setPaymentPanel(-1);
        setClientInfo({});
        setSignupAccount("");
      }}
    >
      Clear SignUp Form
    </Button>
  );
}
