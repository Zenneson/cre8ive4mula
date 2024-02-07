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
import { useSetState } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
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

  const [helpMode, setHelpMode] = useState("");
  const HelpInfo = () => {
    if (helpMode === "style keywords") {
      return (
        <>
          <Text fz={13} ta={"center"}>
            Add keywords that define the style
            <br />
            you want for this task.
          </Text>
          <Text className={classes.dialogInfoEnter}>
            Press <Kbd size="xs">Enter</Kbd> to add the keyword to the list.
          </Text>
          <Text ta={"center"} fz={11} mt={7} fw={700}>
            10 Entires Allowed
          </Text>
        </>
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
          <Text ta={"center"} fz={11} mt={7} fw={700}>
            5 Entires Allowed
          </Text>
        </>
      );
    }
    if (helpMode === "websites") {
      return (
        <>
          <Text fz={13} ta={"center"}>
            Add all the websites you want to use
            <br />
            as a reference for your task.
          </Text>
          <Text className={classes.dialogInfoEnter}>
            Press <Kbd size="xs">Enter</Kbd> to add the site to the list.
          </Text>
          <Text ta={"center"} fz={11} mt={7} fw={700}>
            10 Entires Allowed
          </Text>
        </>
      );
    }
  };

  const [styleKeywords, setStyleKeywords] = useState([]);
  const [deliveryFormats, setDeliveryFormats] = useState([]);
  const [websites, setWebsites] = useSetState({
    value: [],
    isValid: true,
    invaidValue: "",
  });

  const styleKeywordsRef = useRef(null);
  const deliveryFormatsRef = useRef(null);
  const websitesRef = useRef(null);

  const AddTags = (props) => {
    const { placeholder, mode, tabIndex } = props;
    const valueMode = (mode) => {
      let handler = {};
      if (mode === "style keywords") {
        handler.var = styleKeywords;
        handler.setter = setStyleKeywords;
        handler.ref = styleKeywordsRef;
        return handler;
      }
      if (mode === "delivery formats") {
        handler.var = deliveryFormats;
        handler.setter = setDeliveryFormats;
        handler.ref = deliveryFormatsRef;
        return handler;
      }
      if (mode === "websites") {
        handler.var = websites.value;
        handler.ref = websitesRef;
        handler.setter = (newValue) => {
          const isValid = newValue.every((v) => v.match(/[.][a-zA-Z]+$/));
          if (isValid) {
            setWebsites({ value: newValue, isValid: true, invaidValue: "" });
          } else {
            setWebsites({ isValid: false, invaidValue: newValue });
          }
        };
        return handler;
      }
    };
    const { var: modeVar, setter: modeSetter, ref: modeRef } = valueMode(mode);

    const maxAllowed = mode === "delivery formats" ? 5 : 10;

    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === "Backspace") {
        event.preventDefault();
        setTimeout(() => {
          modeRef.current?.focus();
        }, 100);
      }
    };

    return (
      <Popover
        position="bottom-start"
        opened={!websites.isValid && mode === "websites"}
        offset={{ mainAxis: 20, crossAxis: -123 }}
      >
        <Popover.Target>
          <TagsInput
            ref={modeRef}
            tabIndex={tabIndex}
            value={modeVar}
            onChange={modeSetter}
            placeholder={
              modeVar.length >= maxAllowed ? "Limit Reached" : placeholder
            }
            onKeyDown={handleKeyDown}
            rightSectionWidth={50}
            rightSectionPointerEvents="none"
            rightSection={
              modeVar.length === 0
                ? ""
                : `${maxAllowed - modeVar.length} / ${maxAllowed}`
            }
            maxTags={maxAllowed}
            leftSectionWidth={50}
            leftSectionPointerEvents="all"
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
          />
        </Popover.Target>
        <Popover.Dropdown ta={"center"}>
          <Text fz={13} c={"#777"}>
            <Text component="span" fw={700}>
              &quot;{websites.invaidValue}&quot;
            </Text>{" "}
            is not valid. Must end with{" "}
            <Text component="span" fw={700}>
              &quot; . * * * &quot;
            </Text>{" "}
            (e.g. .com, .net, .org)
          </Text>
        </Popover.Dropdown>
      </Popover>
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
              autoFocus={true}
              placeholder="Title..."
              tabIndex={1}
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span="content">
            <ServiceSelect tabIndex={2} services={services} />
          </Grid.Col>
        </Grid>
        <Box hidden={choosenType?.title !== "Web Dev"}>
          <Textarea autosize minRows={2} placeholder="Intended Goal..." />
        </Box>
        <Textarea
          autosize
          tabIndex={3}
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
                tabIndex={4}
              />
              <AddTags
                placeholder="Delivery File Formats..."
                mode={"delivery formats"}
                tabIndex={5}
              />
            </>
          )}
          <AddTags placeholder="Websites..." mode={"websites"} tabIndex={6} />
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
