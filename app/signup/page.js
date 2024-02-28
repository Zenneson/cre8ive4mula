import { Center, Stack } from "@mantine/core";
import SignupForm from "./signupForm";

export default function Signup() {
  return (
    <Center w={"100vw"}>
      <Stack gap={20} mt={150} mx={50}>
        <SignupForm />
      </Stack>
    </Center>
  );
}
