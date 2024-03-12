import { Center, Stack } from "@mantine/core";
import AccountBtns from "./accountBtns";
import Clear from "./clear";
import SignupForm from "./signupForm";

export default function Signup() {
  return (
    <Center w={"100vw"}>
      <Stack gap={20} mt={150} mx={50}>
        <Clear />
        <AccountBtns />
        <SignupForm />
      </Stack>
    </Center>
  );
}
