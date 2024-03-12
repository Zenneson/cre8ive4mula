"use client";
import { useSignupForm } from "@libs/store";
import { Box, Center, Group } from "@mantine/core";
import {} from "react";
import classes from "./styles/signup.module.css";

export default function AccountBtns() {
  const { signupAccount, setSignupAccount, setPaymentPanel } = useSignupForm();

  return (
    <Center>
      <Group
        className={signupAccount !== "" && classes.fadeOut}
        grow
        ta={"center"}
        w={500}
      >
        <Box
          className={`panel actionBtn ${classes.accountBtn}`}
          onClick={() => {
            setSignupAccount("pro");
            setPaymentPanel(0);
          }}
        >
          PRO
        </Box>
        <Box
          className={`panel actionBtn ${classes.accountBtn}`}
          onClick={() => {
            setSignupAccount("priemere");
            setPaymentPanel(0);
          }}
        >
          PRIEMERE
        </Box>
      </Group>
    </Center>
  );
}
