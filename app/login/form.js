"use client";
import { Box, Button, Group, Input, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useHover } from "@mantine/hooks";
import Link from "next/link";
import { FaAsterisk, FaGoogle, FaTwitter } from "react-icons/fa";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { MdAlternateEmail } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import classes from "./styles/login.module.css";

export default function Form() {
  const { hovered, ref } = useHover();

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
      <Stack>
        <Button.Group>
          <Button w={"25%"}>
            <FaGoogle />
          </Button>
          <Button w={"25%"} pos={"relative"}>
            <FaTwitter
              className={classes.twitterBird}
              opacity={0.02}
              size={32}
            />
            <Group>
              <FaXTwitter />
            </Group>
          </Button>
          <Button w={"25%"}>
            <FaFacebookF />
          </Button>
          <Button w={"25%"}>
            <GrInstagram />
          </Button>
        </Button.Group>
        <Box mb={3}>
          <Input
            required
            placeholder="Email Address"
            name="email"
            leftSectionWidth={45}
            leftSection={
              <Box c={"#999"} pt={7}>
                <MdAlternateEmail size={23} />
              </Box>
            }
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />
        </Box>
        <Box mb={3}>
          <Input
            required
            placeholder="Password"
            type="password"
            name="password"
            leftSectionWidth={45}
            leftSection={
              <Box c={"#999"} pt={7}>
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
        </Box>
        <Group justify="space-between">
          <Link href="#">
            <Group gap={5} ref={ref} opacity={hovered ? 1 : 0.3}>
              <TfiEmail size={15} opacity={0.3} />
              <Text fz={12}>Forgot Password?</Text>
            </Group>
          </Link>
          <Button w={"40%"}>Submit</Button>
        </Group>
      </Stack>
    </form>
  );
}
