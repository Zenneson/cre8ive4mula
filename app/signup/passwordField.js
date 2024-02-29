"use client";
import { Box, PasswordInput, Popover, Progress, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function PasswordField(props) {
  const { form } = props;
  const [shouldShowPopover, setShouldShowPopover] = useState(false);
  const [passValue, setPassValue] = useState("");

  const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
  ];

  const PasswordRequirement = ({ meets, label }) => {
    return (
      <Text
        c={meets ? "#00E8FC" : "red"}
        style={{ display: "flex", alignItems: "center" }}
        mt={7}
        size="sm"
      >
        {meets ? <FaCheck size={14} /> : <ImCross size={14} />}{" "}
        <Box component="span" ml={10}>
          {label}
        </Box>
      </Text>
    );
  };

  const getStrength = (password) => {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  };

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(passValue)}
    />
  ));

  const strength = getStrength(passValue);
  const color = strength === 100 ? "#00E8FC" : strength > 50 ? "yellow" : "red";

  useEffect(() => {
    if (strength === 100) {
      const timer = setTimeout(() => {
        setShouldShowPopover(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      if (passValue.length > 0) {
        setShouldShowPopover(true);
      }
    }
  }, [strength, passValue]);

  return (
    <Popover
      opened={shouldShowPopover && passValue.length > 0}
      position="bottom"
      width="target"
      shadow="md"
      withinPortal={false}
      transitionProps={{
        transition: "pop",
      }}
    >
      <Popover.Target>
        <PasswordInput
          {...form.getInputProps("password")}
          name="password"
          autocomplete={"current-password" || "new-password"}
          value={form.values.password}
          placeholder={passValue === "" ? "Create Password..." : ""}
          error={form.errors.password && "Password does not meet requirements"}
          onChange={(event) => {
            setPassValue(event.currentTarget.value);
            form.setFieldValue("password", event.currentTarget.value);
          }}
          styles={{
            visibilityToggle: {
              opacity: 0.3,
            },
          }}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Progress
          color={color}
          value={strength}
          size={5}
          style={{ marginBottom: 10 }}
        />
        <PasswordRequirement
          label="Includes at least 6 characters"
          meets={form.values.password.length > 5}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
