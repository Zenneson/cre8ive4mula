"use client";
import {
  Box,
  FileInput,
  Group,
  Select,
  Stack,
  TagsInput,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FaPaperclip } from "react-icons/fa6";
import classes from "./styles/register.module.css";

// REGISTER FORM
export default function BrandInfo() {
  const form = useForm({
    initialValues: {
      desiredService: "",
      companyDesc: "",
      goals: "",
      relatedURLs: [],
      companyFiles: [],
    },
  });

  return (
    <Stack className={classes.formStack} gap={20}>
      <Select placeholder="Most Desired Service" data={[]} />
      <Textarea placeholder="Company Description..." autosize minRows={6} />
      <Textarea placeholder="Goals..." autosize minRows={6} />
      <TagsInput placeholder="Related URLs..." />
      <FileInput
        name="Upload files"
        placeholder="Upload Company Logos, Brand Guidelines, or other company related files..."
        multiple
      />
      <Box className="altPanel">
        <Group gap={8}>
          <FaPaperclip />
          <Text opacity={0.5} tt={"uppercase"} fz={14} fw={700}>
            Uploaded Files
          </Text>
        </Group>
      </Box>
    </Stack>
  );
}
