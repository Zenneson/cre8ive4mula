"use client";
import { addAtSymbol, taskColor } from "@libs/custom";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  ColorPicker,
  Dialog,
  FileButton,
  Grid,
  Group,
  Image,
  Kbd,
  Popover,
  Stack,
  TagsInput,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { LuPaintBucket } from "react-icons/lu";
import { MdAttachment } from "react-icons/md";
import { PiUploadSimpleBold } from "react-icons/pi";
import { TbHelpSmall, TbHelpSquareFilled } from "react-icons/tb";
import ServiceSelect from "./serviceSelect";
import classes from "./styles/taskFrom.module.css";

export default function TaskForm(props) {
  const { service, setActivePage, choosenType } = props;
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#0000FF");
  const [choosenService, setChoosenService] = useState("");
  const [typeColor, setTypeColor] = useState();
  const [deliverInfo, setDeliverInfo] = useState(false);

  useEffect(() => {
    if (!choosenType || !choosenType.title) return;
    setTypeColor(taskColor(choosenType.title));
  }, [choosenType]);

  const AddTags = (props) => {
    const { placeholder } = props;
    return (
      <TagsInput
        leftSection={
          <ActionIcon
            variant="transparent"
            color="#777"
            onClick={() => setDeliverInfo(!deliverInfo)}
          >
            <TbHelpSquareFilled className={classes.tagsInput} size={30} />
          </ActionIcon>
        }
        leftSectionWidth={50}
        leftSectionPointerEvents="all"
        placeholder={placeholder}
      />
    );
  };

  return (
    <Box h={900}>
      <Group className={classes.taskFormTitle} justify="space-between">
        <Group gap="7">
          <Image
            src={"/img/task.svg"}
            alt={"Task Type"}
            height={25}
            opacity={0.5}
          />
          <Title order={4}>Add Details</Title>
        </Group>
        <Badge
          className={classes.taskType}
          color={typeColor}
          c={choosenType?.title === "Web Dev" ? "#000" : "#fff"}
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
            <ServiceSelect
              service={service}
              choosenService={choosenService}
              setChoosenService={setChoosenService}
            />
          </Grid.Col>
        </Grid>
        <Box hidden={choosenType?.title !== "Web Dev"}>
          <Textarea autosize minRows={2} placeholder="Intended Goal..." />
        </Box>
        <Textarea
          autosize
          minRows={7}
          maxRows={7}
          placeholder="Description..."
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
        <Stack hidden={choosenType?.title !== "Design"} gap={20}>
          {choosenType?.title === "Design" && (
            <>
              <AddTags placeholder="Style Defining Keywords..." />
              <AddTags placeholder="Delivery File Formats..." />
            </>
          )}
          <AddTags placeholder="Websites..." />
        </Stack>
      </Stack>
      <Stack mt={20} gap={20}>
        <Box hidden={choosenType?.title !== "Design"}>
          <Grid
            gutter={20}
            className={`innerPanel ${classes.addColors}`}
            p={20}
          >
            <Grid.Col span="3">
              <Popover
                classNames={{ dropdown: classes.colorPopoverDropdown }}
                position="top"
                width="target"
              >
                <Popover.Target>
                  <Button w={"100%"}>
                    <Group gap={5}>
                      <FaPlus />
                      Color
                    </Group>
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <ColorPicker
                    size="sm"
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
                        variant="subtle"
                        color="#777"
                      >
                        <FaCirclePlus size={30} />
                      </ActionIcon>
                    }
                  />
                </Popover.Dropdown>
              </Popover>
            </Grid.Col>
            <Grid.Col span="auto">
              <Box className="altPanel">
                <Group gap={10} opacity={0.25}>
                  <LuPaintBucket size={15} />
                  <Text fz={11} fw={700} tt={"uppercase"}>
                    Colors Added
                  </Text>
                </Group>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
        <Grid
          gutter={20}
          className={`innerPanel ${classes.relatedFiles}`}
          p={20}
        >
          <Grid.Col span="3">
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Button
                  {...props}
                  w={"100%"}
                  leftSection={<PiUploadSimpleBold size={17} />}
                >
                  Files
                </Button>
              )}
            </FileButton>
          </Grid.Col>
          <Grid.Col span="auto">
            <Box className="altPanel">
              <Group gap={10} opacity={0.25}>
                <MdAttachment />
                <Text fz={11} fw={700} tt={"uppercase"}>
                  Upladed Files
                </Text>
              </Group>
            </Box>
          </Grid.Col>
        </Grid>
        <Group justify="flex-end">
          <Button
            className={classes.backBtn}
            leftSection={
              <FaPlay
                size={10}
                style={{
                  transform: "rotate(180deg)",
                }}
              />
            }
            onClick={() => setActivePage(0)}
          >
            Back
          </Button>
          <Button
            leftSection={<FaPlay size={10} />}
            onClick={() => setActivePage(2)}
          >
            Review
          </Button>
        </Group>
      </Stack>
      <Dialog
        className={classes.deliverInfoDialog}
        opened={deliverInfo}
        withCloseButton
        onClose={() => setDeliverInfo(false)}
        size={340}
        p={"20px 25px"}
      >
        <Center className={classes.dialogIcon}>
          <TbHelpSmall size={30} />
        </Center>
        <Box w={375} pr={55}>
          <Text fz={13} ta={"center"}>
            Add your perfered file types, such as <br />
            <Text component="span" fw={700} opacity={0.5} fz={17}>
              JPG, PNG, SVG, EPS, PDF, PSD,
            </Text>
            <br />
            or any other formats relevant to your needs.
          </Text>
          <Text className={classes.dialogInfoEnter}>
            Press <Kbd size="xs">Enter</Kbd> to add file type to the list.
          </Text>
        </Box>
      </Dialog>
    </Box>
  );
}
