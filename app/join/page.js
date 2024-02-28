import { Center, Stack } from "@mantine/core";
import JoinForm from "./joinForm";

export default function Join() {
  return (
    <Center w={"100vw"}>
      <Stack gap={20} mt={150} mx={50}>
        <JoinForm />
      </Stack>
    </Center>
  );
}
