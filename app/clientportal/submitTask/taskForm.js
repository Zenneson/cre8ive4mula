"use client";
import { addAtSymbol, taskColor } from "@libs/custom";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  ColorPicker,
  FileButton,
  Grid,
  Group,
  Image,
  Popover,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FaHashtag } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5";
import { LuPaintBucket } from "react-icons/lu";
import { MdAttachment } from "react-icons/md";
import { PiUploadSimpleBold } from "react-icons/pi";
import classes from "./styles/taskFrom.module.css";

export default function TaskForm(props) {
  const { service, setActivePage, choosenType } = props;
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#0000FF");
  const [choosenService, setChoosenService] = useState("");
  const [typeColor, setTypeColor] = useState();

  useEffect(() => {
    if (!choosenType || !choosenType.title) return;
    setTypeColor(taskColor(choosenType.title));
  }, [choosenType]);

  return (
    <Box h={900}>
      <Group className={classes.taskFormTitle} justify="space-between" gap="7">
        <Group gap="7">
          <Image
            src={"/img/task.svg"}
            alt={"Task Type"}
            height={25}
            opacity={0.5}
          />
          <Title order={4}>Add Details:</Title>
        </Group>
        <Badge
          className={classes.taskType}
          color={typeColor}
          size="md"
          variant={"filled"}
        >
          {choosenType?.title}
        </Badge>
      </Group>
      <Stack className="panel" w={800} gap={20}>
        <Grid>
          <Grid.Col span="auto">
            <TextInput
              placeholder="Title..."
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span="content">
            <Select
              placeholder="Project Type..."
              clearable
              w={245}
              data={service}
              value={choosenService}
              onChange={setChoosenService}
              checkIconPosition="right"
              classNames={{
                dropdown: classes.selectDropdown,
                option: classes.selectOption,
                options: classes.options,
              }}
              comboboxProps={{
                position: "bottom",
                offset: 13,
              }}
            />
          </Grid.Col>
        </Grid>
        <Textarea
          autosize
          minRows={7}
          placeholder="Description..."
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
      </Stack>
      <Stack mt={20} gap={20}>
        <Box className="panel">
          <Textarea
            autosize
            minRows={2}
            placeholder="Task's Intended Goal..."
          />
        </Box>
        <Group align="flex-start" grow>
          <Stack className={`innerPanel ${classes.relatedFiles}`} p={20}>
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Button
                  {...props}
                  leftSection={<PiUploadSimpleBold size={17} />}
                >
                  Related Files
                </Button>
              )}
            </FileButton>
            <Box className="altPanel">
              <Group gap={10} opacity={0.25}>
                <MdAttachment />
                <Text fz={11} fw={700} tt={"uppercase"}>
                  Upladed Files
                </Text>
              </Group>
            </Box>
          </Stack>
          <Stack className={`innerPanel ${classes.addLinks}`} p={20}>
            <TextInput
              placeholder="Related Webpage URL"
              rightSectionWidth={50}
              rightSectionPointerEvents="all"
              rightSection={
                <ActionIcon
                  className={classes.addLinkBtn}
                  variant="light"
                  color="#777"
                >
                  <FaPlus size={20} />
                </ActionIcon>
              }
            />
            <Box className="altPanel">
              <Group gap={10} opacity={0.25}>
                <IoGlobeOutline size={15} />
                <Text fz={11} fw={700} tt={"uppercase"}>
                  Webpages Added
                </Text>
              </Group>
            </Box>
          </Stack>
        </Group>
        <Group align="flex-start" grow>
          <Stack className={`innerPanel ${classes.addColors}`} p={20}>
            <Popover
              classNames={{ dropdown: classes.colorPopoverDropdown }}
              width="target"
              position="top"
            >
              <Popover.Target>
                <Button>
                  <Group gap={5}>
                    <FaPlus />
                    Color
                  </Group>
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <ColorPicker
                  size="lg"
                  fullWidth
                  value={selectedColor}
                  onChange={setSelectedColor}
                  classNames={{
                    saturationOverlay: classes.pickerArea,
                    sliderOverlay: classes.pickerSlider,
                  }}
                />
                <TextInput
                  classNames={{
                    wrapper: classes.colorInputWrapper,
                    input: classes.colorInput,
                  }}
                  value={addAtSymbol(selectedColor, "#")}
                  onChange={(event) =>
                    setSelectedColor(event.currentTarget.value)
                  }
                  maxLength={7}
                  rightSectionPointerEvents="all"
                  rightSection={
                    <ActionIcon
                      className={classes.addColorBtn}
                      variant="light"
                      color="#777"
                    >
                      <FaPlus size={12} />
                    </ActionIcon>
                  }
                />
              </Popover.Dropdown>
            </Popover>
            <Box className="altPanel">
              <Group gap={10} opacity={0.25}>
                <LuPaintBucket size={15} />
                <Text fz={11} fw={700} tt={"uppercase"}>
                  Colors Added
                </Text>
              </Group>
            </Box>
          </Stack>
          <Stack className={`innerPanel ${classes.styleKeywords}`} p={20}>
            <TextInput
              placeholder="Style Keywords..."
              rightSectionWidth={50}
              rightSectionPointerEvents="all"
              rightSection={
                <ActionIcon
                  className={classes.addKeywordBtn}
                  variant="light"
                  color="#777"
                >
                  <FaPlus size={20} />
                </ActionIcon>
              }
            />
            <Box className="altPanel">
              <Group gap={10} opacity={0.25}>
                <FaHashtag size={15} />
                <Text fz={11} fw={700} tt={"uppercase"}>
                  Keywords Added
                </Text>
              </Group>
            </Box>
          </Stack>
        </Group>
        <Group justify="flex-end">
          <Button onClick={() => setActivePage(2)}>Review</Button>
        </Group>
      </Stack>
    </Box>
  );
}
