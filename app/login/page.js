import { Box, Button, Input, Stack } from "@mantine/core";
import Link from "next/link";
import Editor from "../editor/editor";

export default function LoginPage() {
  return (
    <Stack p={50} w={1000} gap={50} align="flex-start">
      <Button className="linkBtn" component={Link} href={"/"}>
        HOMEPAGE
      </Button>
      <Input placeholder="Username" />
      <Box className="panel" p={20}>
        Panel
      </Box>
      <Editor />
    </Stack>
  );
}
