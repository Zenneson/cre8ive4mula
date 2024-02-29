"use client";
import { formatPhoneNumber } from "@libs/custom";
import { Box, Divider, Group, Input, Stack, Tooltip } from "@mantine/core";
import { useState } from "react";
import { FaAsterisk } from "react-icons/fa";
import PasswordField from "./passwordField";
import classes from "./styles/signup.module.css";

export default function ClientInfo(props) {
  const { form } = props;
  const [phoneValue, setPhoneValue] = useState("");

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
        autocomplete="organization"
        rightSectionPointerEvents="all"
        rightSectionWidth={40}
        rightSection={<Required />}
      />
      <Input
        {...form.getInputProps("title")}
        placeholder="Title / Position"
        name={"title"}
        autocomplete="organization-title"
        rightSectionPointerEvents="all"
        rightSectionWidth={40}
        rightSection={<Required />}
      />
      <Divider opacity={0.2} />
      <Group grow>
        <Input
          {...form.getInputProps("firstName")}
          placeholder="First Name"
          name={"First Name"}
          autocomplete="given-name"
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
        <Input
          {...form.getInputProps("lastName")}
          placeholder="Last Name"
          name={"Last Name"}
          autocomplete="family-name"
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
      </Group>
      <Group grow>
        <Input
          {...form.getInputProps("email")}
          placeholder="Email"
          name={"email"}
          autocomplete="username"
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
        <Input
          name={"phone"}
          value={formatPhoneNumber(phoneValue) || ""}
          placeholder={"Phone #"}
          autocomplete="username"
          onChange={(event) => {
            const formatted = formatPhoneNumber(event.target.value);
            form.setFieldValue("phone", formatted);
            setPhoneValue(formatted);
          }}
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
      </Group>
      <Divider opacity={0.2} />
      <PasswordField form={form} />
    </Stack>
  );
}
