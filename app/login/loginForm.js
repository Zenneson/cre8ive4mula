"use client";
import { auth } from "@libs/firebase";
import { Box, Button, Divider, Group, Input, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, form.values.email, form.values.password)
      .then(() => {
        console.log(`Signed in as ${form.values.email}`);
        router.push("/clientportal");
      })
      .catch((error) => {
        console.error("Error signing in with password and email", error);
      });
  };

  return (
    <form onSubmit={form.onSubmit(handleLogin)}>
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
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email && "Invalid email"}
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
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          error={
            form.errors.password &&
            "Password must be at least 6 characters long"
          }
        />
        <Group justify="space-between">
          <Link className={classes.forgotPassword} href="#">
            <Group gap={5}>
              <IoIosHelpBuoy size={20} />
              <Text fz={12}>Forgot Password?</Text>
            </Group>
          </Link>
          <Button className={classes.loginBtn} w={"30%"}>
            Login
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
