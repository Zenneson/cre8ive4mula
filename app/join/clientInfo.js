"use client";
import { Box, Divider, Group, Input, Stack, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FaAsterisk } from "react-icons/fa";
import classes from "./styles/register.module.css";

// REGISTER FORM
export default function ClientInfo() {
  const form = useForm({
    initialValues: {
      companyName: "",
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const Required = () => {
    return (
      <Tooltip label="Required" offset={0}>
        <Box c={"#999"} pl={5}>
          <FaAsterisk opacity={0.4} size={12} />
        </Box>
      </Tooltip>
    );
  };

  return (
    <Stack className={classes.formStack} gap={20}>
      <Input
        placeholder="Company Name"
        name={"Company Name"}
        rightSectionPointerEvents="all"
        rightSectionWidth={40}
        rightSection={<Required />}
      />
      <Input
        placeholder="Title / Position"
        name={"Title"}
        rightSectionPointerEvents="all"
        rightSectionWidth={40}
        rightSection={<Required />}
      />
      <Divider opacity={0.2} />
      <Group grow>
        <Input
          placeholder="First Name"
          name={"First Name"}
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
        <Input
          placeholder="Last Name"
          name={"Last Name"}
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
      </Group>
      <Group grow>
        <Input
          placeholder="Email"
          name={"Email"}
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
        <Input
          placeholder="Phone"
          name={"Phone"}
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
      </Group>
    </Stack>
  );
}
