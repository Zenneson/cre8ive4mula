"use client";
import { Box, Button, Divider, Group, Input, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { FaAsterisk, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosHelpBuoy } from "react-icons/io";
import { LuKeyRound } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import classes from "./styles/login.module.css";

export default function Form() {
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

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack gap={20}>
        <Group grow>
          <Button className={classes.loginBtn}>
            <FaGoogle />
          </Button>
          <Button className={classes.loginBtn}>
            <FaXTwitter />
          </Button>
        </Group>
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
              <FaAsterisk size={18} />
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
