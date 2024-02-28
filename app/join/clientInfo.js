"use client";
import { Box, Divider, Group, Input, Stack, Tooltip } from "@mantine/core";
import { FaAsterisk } from "react-icons/fa";
import classes from "./styles/register.module.css";

export default function ClientInfo(props) {
  const { form } = props;
  const Required = () => {
    return (
      <Tooltip label="Required" offset={0}>
        <Box c={"#999"} pl={5} pt={3}>
          <FaAsterisk opacity={0.4} size={12} />
        </Box>
      </Tooltip>
    );
  };

  return (
    <Stack className={classes.formStack} gap={20}>
      <Input
        {...form.getInputProps("companyName")}
        placeholder="Company Name"
        name={"Company Name"}
        rightSectionPointerEvents="all"
        rightSectionWidth={40}
        rightSection={<Required />}
      />
      <Input
        {...form.getInputProps("title")}
        placeholder="Title / Position"
        rightSectionPointerEvents="all"
        name={"Title"}
        rightSectionWidth={40}
        rightSection={<Required />}
      />
      <Divider opacity={0.2} />
      <Group grow>
        <Input
          {...form.getInputProps("firstName")}
          placeholder="First Name"
          name={"First Name"}
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
        <Input
          {...form.getInputProps("lastName")}
          placeholder="Last Name"
          name={"Last Name"}
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
      </Group>
      <Group grow>
        <Input
          {...form.getInputProps("email")}
          placeholder="Email"
          name={"Email"}
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
        <Input
          {...form.getInputProps("phone")}
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
