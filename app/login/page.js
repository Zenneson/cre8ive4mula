import { Box, Center, Divider, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import Form from "./form";
import classes from "./styles/login.module.css";

export default function Login() {
  return (
    <Center w={"100vw"} h={"100vh"}>
      <Stack gap={0}>
        <Stack gap={0} w={330} ml={35}>
          <Text
            className={classes.title}
            component={Link}
            scroll={false}
            href="/"
          >
            CRE8IVE 4MULA
          </Text>
          <Divider mb={5} opacity={0.3} />
          <Title className={classes.subtitle}>Client Portal</Title>
        </Stack>
        <Box className="panel" w={400}>
          <Form />
        </Box>
      </Stack>
    </Center>
  );
}
