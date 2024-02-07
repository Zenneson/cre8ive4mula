"use client";
import {
  Box,
  Button,
  CloseButton,
  FileButton,
  Grid,
  Group,
  HoverCard,
  Image,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { MdAttachment } from "react-icons/md";
import { PiUploadBold } from "react-icons/pi";
import classes from "./styles/filePanel.module.css";

export default function FilePanel(props) {
  const { setFormData } = props;
  const [files, setFiles] = useState([]);
  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  useEffect(() => {
    setFormData({ files: files });
  }, [files, setFormData]);

  const fileRow = files.map((file, index) => {
    return (
      <HoverCard
        key={index}
        position="top"
        shadow="md"
        openDelay={0}
        closeDelay={0}
        withArrow
      >
        <HoverCard.Target>
          <Image
            src="/img/paperclip.svg"
            alt={"Task Tags"}
            fit="contain"
            w={15}
          />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group gap={5} c={"#000"}>
            {file.name}
            <CloseButton
              variant="transparent"
              size={14}
              onClick={() => removeFile(file)}
            />
          </Group>
        </HoverCard.Dropdown>
      </HoverCard>
    );
  });

  return (
    <Grid gutter={20} className={`innerPanel ${classes.relatedFiles}`} p={20}>
      <Grid.Col span="3">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg">
          {(props) => (
            <Button
              {...props}
              leftSection={<PiUploadBold size={18} />}
              w={"100%"}
              py={8}
            >
              Files
            </Button>
          )}
        </FileButton>
      </Grid.Col>
      <Grid.Col span="auto">
        <Box className="altPanel" mih={40}>
          {fileRow.length === 0 ? (
            <Group gap={10} opacity={0.25}>
              <MdAttachment />
              <Text fz={11} fw={700} tt={"uppercase"}>
                Upladed Files
              </Text>
            </Group>
          ) : (
            <Group gap={10}>{fileRow}</Group>
          )}
        </Box>
      </Grid.Col>
    </Grid>
  );
}
