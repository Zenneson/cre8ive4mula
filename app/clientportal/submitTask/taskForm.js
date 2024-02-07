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
import { FaCirclePlus } from "react-icons/fa6";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { LuPaintBucket } from "react-icons/lu";
import { MdAttachment } from "react-icons/md";
import { PiUploadBold } from "react-icons/pi";
import { TbHelpSmall, TbHelpSquareFilled } from "react-icons/tb";
import ServiceSelect from "./serviceSelect";
import classes from "./styles/taskFrom.module.css";

export default function TaskForm(props) {
  const { services, setSubmissionPanel, choosenType } = props;
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#0000FF");
  const [typeColor, setTypeColor] = useState();
  const [deliverInfo, setDeliverInfo] = useState(false);

  useEffect(() => {
    if (!choosenType || !choosenType.title) return;
    setTypeColor(taskColor(choosenType.title));
  }, [choosenType]);

  const [helpMode, setHelpMode] = useState("style keywords");
  const HelpInfo = () => {
    if (helpMode === "style keywords") {
      return (
        <Box>
          <Text fz={13} ta={"center"}>
            Add keywords that define the style
            <br />
            you want for your project.
          </Text>
          <Text className={classes.dialogInfoEnter}>
            Press <Kbd size="xs">Enter</Kbd> to add
            <br />
            the keyword to the list.
          </Text>
        </Box>
      );
    }
    if (helpMode === "delivery formats") {
      return (
        <>
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
        </>
      );
    }
    if (helpMode === "websites") {
      return (
        <Box px={30}>
          <Text fz={13} ta={"center"}>
            Add all the websites you want to use as a reference for your
            project.
          </Text>
          <Text className={classes.dialogInfoEnter}>
            Press <Kbd size="xs">Enter</Kbd> to add
            <br />
            the site to the list.
          </Text>
        </Box>
      );
    }
  };

  const AddTags = (props) => {
    const { placeholder, mode } = props;
    return (
      <TagsInput
        leftSection={
          <ActionIcon
            variant="transparent"
            color="#777"
            onClick={() => {
              if (helpMode === mode) {
                setDeliverInfo(false);
                setHelpMode("");
                return;
              }
              setHelpMode(mode);
              setDeliverInfo(true);
            }}
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
    <Box mt={-100}>
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
            <ServiceSelect services={services} />
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
              <AddTags
                placeholder="Style Defining Keywords..."
                mode={"style keywords"}
              />
              <AddTags
                placeholder="Delivery File Formats..."
                mode={"delivery formats"}
              />
            </>
          )}
          <AddTags placeholder="Websites..." mode={"websites"} />
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
                py={10}
              >
                <Popover.Target>
                  <Button
                    leftSection={<HiOutlineColorSwatch size={18} />}
                    w={"100%"}
                  >
                    Add Colors
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
            onClick={() => setSubmissionPanel(0)}
          >
            Back
          </Button>
          <Button
            leftSection={<FaPlay size={10} />}
            onClick={() => setSubmissionPanel(2)}
          >
            Review
          </Button>
        </Group>
      </Stack>
      <Dialog
        className={classes.deliverInfoDialog}
        opened={deliverInfo}
        withCloseButton
        size={340}
        p={"20px 25px"}
        onClose={() => {
          setDeliverInfo(false);
          setHelpMode("");
        }}
      >
        <Center className={classes.dialogIcon}>
          <TbHelpSmall size={30} />
        </Center>
        <Box w={375} pr={55}>
          <HelpInfo />
        </Box>
      </Dialog>
    </Box>
  );
}
