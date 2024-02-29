"use client";
import { Box, Divider, Group, Input, Stack, Tooltip } from "@mantine/core";
import { FaAsterisk } from "react-icons/fa";
import { IMaskInput } from "react-imask";
import PasswordField from "./passwordField";
import classes from "./styles/signup.module.css";

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

  const mask = [
    { mask: "(000) 000-0000" },
    { mask: "[+0 ](000) 000-0000" },
    { mask: "[+00 ](000) 000-0000" },
  ];

  return (
    <Stack className={classes.formStack} gap={20}>
      <Input
        {...form.getInputProps("companyName")}
        placeholder="Company Name"
        name={"Company Name"}
        autoComplete="organization"
        rightSectionPointerEvents="all"
        rightSectionWidth={40}
        rightSection={<Required />}
        required
      />
      <Input
        {...form.getInputProps("title")}
        placeholder="Title / Position"
        name={"title"}
        autoComplete="organization-title"
        rightSectionPointerEvents="all"
        rightSectionWidth={40}
        rightSection={<Required />}
        required
      />
      <Divider opacity={0.2} />
      <Group gap={20} grow>
        <Input
          {...form.getInputProps("firstName")}
          placeholder="First Name"
          name={"First Name"}
          autoComplete="given-name"
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
          required
        />
        <Input
          {...form.getInputProps("lastName")}
          placeholder="Last Name"
          name={"Last Name"}
          autoComplete="family-name"
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
          required
        />
      </Group>
      <Group gap={20} grow>
        <Input
          {...form.getInputProps("email")}
          placeholder="Email"
          name={"email"}
          autoComplete="username"
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
          required
        />
        <Input
          {...form.getInputProps("phone")}
          name={"phone"}
          component={IMaskInput}
          mask={mask}
          onBlur={(event) => {
            form.setFieldValue("phone", event.target.value);
          }}
          placeholder={"Phone #"}
          autoComplete="username"
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
          required
        />
      </Group>
      <Divider opacity={0.2} />
      <PasswordField form={form} />
    </Stack>
  );
}
