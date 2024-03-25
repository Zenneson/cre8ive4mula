"use client";
import { auth } from "@libs/firebase";
import { Box, Button, Divider, Group, Input, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useHotkeys } from "@mantine/hooks";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosHelpBuoy } from "react-icons/io";
import { LuFingerprint, LuKeyRound } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import classes from "./styles/login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => value.trim().length >= 6,
    },
  });

  const handleLogin = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        router.push("/clientportal");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const [email, setEmail] = useState(form.values.email || "");
  const [password, setPassword] = useState(form.values.password || "");
  useHotkeys([["Enter", () => handleLogin({ email, password })]], []);

  return (
    <form>
      <Stack gap={20}>
        <Divider
          opacity={0.2}
          label={<LuKeyRound color={"#fff"} size={18} />}
        />
        <Input
          required
          placeholder="Email Address"
          name="email"
          autoComplete="username"
          leftSectionWidth={40}
          leftSection={
            <Box c={"#999"} pt={7} pl={5}>
              <MdAlternateEmail size={23} />
            </Box>
          }
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          onBlur={() => form.setFieldValue("email", email)}
        />
        <Input
          required
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          leftSectionWidth={40}
          leftSection={
            <Box c={"#999"} pt={7} pl={5}>
              <LuFingerprint size={21} />
            </Box>
          }
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          onBlur={() => form.setFieldValue("password", password)}
        />
        <Group justify="space-between">
          <Link className={classes.forgotPassword} href="#">
            <Group gap={5}>
              <IoIosHelpBuoy size={20} />
              <Text fz={12}>Forgot Password?</Text>
            </Group>
          </Link>
          <Button
            className={classes.loginBtn}
            w={"30%"}
            onClick={() => handleLogin(form.values)}
          >
            Login
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
