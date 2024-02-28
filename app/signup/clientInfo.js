"use client";
import { Box, Divider, Group, Input, Stack, Tooltip } from "@mantine/core";
import { useState } from "react";
import { FaAsterisk } from "react-icons/fa";
import PasswordField from "./passwordField";
import classes from "./styles/signup.module.css";

export default function ClientInfo(props) {
  const { form } = props;
  const [phoneValue, setPhoneValue] = useState("");

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.length === 0) return "";
    let phoneString = String(phoneNumber);
    phoneString = phoneString.replace(/\D/g, "");
    phoneString = phoneString.substring(0, 10);
    const formattedNumber =
      "(" +
      phoneString.substring(0, 3) +
      ") " +
      phoneString.substring(3, 6) +
      "-" +
      phoneString.substring(6, 10);

    return formattedNumber;
  };

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
          name={"email"}
          rightSectionPointerEvents="all"
          rightSectionWidth={40}
          rightSection={<Required />}
        />
        <Input
          // {...form.getInputProps("phone")}
          name={"phone"}
          value={formatPhoneNumber(phoneValue) || ""}
          placeholder={"Phone #"}
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
      <PasswordField form={form} />
    </Stack>
  );
}
