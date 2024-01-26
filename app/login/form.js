"use client";
import { Box, Button, Center, Input, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

// LOGIN FORM
export default function Form() {
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
    <Center w={"100vw"} h={"100vh"}>
      <Box className="panel" w={400}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack>
            <Input
              required
              placeholder="Email"
              name="email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />
            <Input
              required
              placeholder="Password"
              type="password"
              name="password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password must be at least 6 characters long"
              }
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}
