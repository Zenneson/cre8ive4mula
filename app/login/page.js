import { Box, Center, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { MdOutlineAccountCircle } from "react-icons/md";
import Form from "./form";
import classes from "./styles/login.module.css";

export default function Login() {
  return (
    <Center w={"100vw"} h={"100vh"}>
      <Stack gap={0}>
        <Stack gap={0} w={330} ml={35}>
          <Text className={classes.title}>CRE8IVE 4MULA</Text>
          <Divider mb={5} opacity={0.3} />
          <Title className={classes.subtitle}>Client Portal</Title>
        </Stack>
        <Box className="panel" w={400}>
          <Stack>
            <Divider
              mb={5}
              opacity={0.3}
              labelPosition="left"
              label={
                <Group gap={7}>
                  <MdOutlineAccountCircle size={20} />
                  <Text fz={14}>Sign In</Text>
                </Group>
              }
            />
            <Form />
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
}
