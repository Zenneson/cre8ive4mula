import { Box, Button, Input, Stack } from "@mantine/core";
import Link from "next/link";
import Editor from "../editor/editor";

export default function Blank() {
  return (
    <Stack
      className="panel"
      gap={30}
      align="flex-start"
      ml={"15%"}
      my={50}
      w={"70%"}
    >
      <Button component={Link} href={"/"}>
        HOMEPAGE
      </Button>
      <Input placeholder="Username" />
      <Box className="innerPanel">Content Area</Box>
      <Editor />
    </Stack>
  );
}
