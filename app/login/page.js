import { Box, Center, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import Form from "./form";
import classes from "./styles/login.module.css";

export default function Login() {
  return (
    <Center w={"100vw"} h={"100vh"}>
      <Stack gap={0} mt={-100}>
        <Stack gap={0}>
          <Text
            className={classes.title}
            component={Link}
            scroll={false}
            c="#fff"
            href="/"
          >
            CRE8IVE 4MULA
          </Text>
          <Title className={classes.subtitle}>Client Portal Login</Title>
        </Stack>
        <Box className="panel lightShadow" w={400}>
          <Form />
        </Box>
      </Stack>
    </Center>
  );
}
