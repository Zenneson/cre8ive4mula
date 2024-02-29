"use client";
import { taskColor } from "@libs/custom";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Dialog,
  Divider,
  Grid,
  Group,
  HoverCard,
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
import { useForm } from "@mantine/form";
import { shallowEqual, useSetState } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { TbHelpSmall, TbHelpSquareFilled } from "react-icons/tb";
import { useSubissionData } from "../../portalStore";
import ColorPanel from "../colorPanel/colorPanel";
import FilePanel from "../filePanel/filePanel";
import ServiceSelect from "../serviceSelect/serviceSelect";
import classes from "./styles/taskFrom.module.css";

export default function TaskForm(props) {
  const { typeServices, titleRef } = props;
  const { formData, setSubmissionPanel } = useSubissionData();
  const [typeColor, setTypeColor] = useState();
  const [deliverInfo, setDeliverInfo] = useState(false);

  const form = useForm({
    initialValues: {
      type: "",
      title: "",
      service: "",
      goal: "",
      desc: "",
      styleKeywords: [],
      deliveryFormats: [],
      websites: [],
      colors: [],
      files: [],
    },
  });

  const taskType = formData.type?.title;
  const [showReviewBtn, setShowReviewBtn] = useState(false);

  useEffect(() => {
    const isWebDevComplete =
      taskType === "Web Dev" &&
      form.values.title &&
      form.values.goal &&
      form.values.desc &&
      form.values.service;
    const isOtherTaskComplete =
      taskType !== "Web Dev" &&
      form.values.title &&
      form.values.desc &&
      form.values.service;
    setShowReviewBtn(isWebDevComplete || isOtherTaskComplete);
  }, [
    form.values.title,
    form.values.goal,
    form.values.desc,
    form.values.service,
    taskType,
  ]);

  useEffect(() => {
    if (!formData.type || !formData.type.title) return;
    setTypeColor(taskColor(formData.type.title));
  }, [formData.type]);

  const [helpMode, setHelpMode] = useState("");
  const HelpInfo = () => {
    if (helpMode === "styleKeywords") {
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
    if (helpMode === "deliveryFormats") {
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
      if (mode === "styleKeywords") {
        handler.var = styleKeywords;
        handler.setter = setStyleKeywords;
        handler.ref = styleKeywordsRef;
        return handler;
      }
      if (mode === "deliveryFormats") {
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

    const maxAllowed =
      mode === "deliveryFormats" ? 5 : mode === "websites" ? 7 : 10;

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setTimeout(() => {
          modeRef.current?.focus();
        }, 100);
      }
    };

    const pillWidth = () => {
      if (mode === "styleKeywords") return 57.5;
      if (mode === "deliveryFormats") return 123;
      if (mode === "websites") return 85.5;
    };

    useEffect(() => {
      const equal = shallowEqual(modeVar, form.values[mode]);
      if (equal || modeVar.length === 0) return;
      form.setFieldValue(mode, modeVar);
    }, [mode, modeVar]);

    return (
      <Popover
        position="bottom-start"
        opened={!websites.isValid && mode === "websites"}
        offset={{ mainAxis: 20, crossAxis: -123 }}
      >
        <Popover.Target>
          <TagsInput
            classNames={{
              wrapper: `inputWrapper ${classes.wrapperInput}`,
              input: `defaultInput ${classes.tagsInput}`,
              inputField: classes.tagsInputField,
              pillsList: classes.tagsPillsList,
            }}
            ref={modeRef}
            tabIndex={tabIndex}
            value={modeVar || form.values[mode]}
            onChange={modeSetter}
            placeholder={modeVar.length < maxAllowed - 2 ? placeholder : ""}
            mah={50}
            styles={{
              pill: {
                minWidth: pillWidth(),
                maxWidth: pillWidth(),
                justifyContent: "space-between",
              },
            }}
            onKeyDown={handleKeyDown}
            rightSectionWidth={50}
            rightSectionPointerEvents="none"
            rightSection={
              modeVar.length > 0 && (
                <Stack gap={0} align="center">
                  <Title c={"cobaltblue.4"} fz={12}>
                    {modeVar.length}
                  </Title>
                  <Divider w={15} color={"cobaltblue.4"} />
                  <Title c={"cobaltblue.4"} fz={12}>
                    {maxAllowed}
                  </Title>
                </Stack>
              )
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
                    setTimeout(() => {
                      setHelpMode("");
                    }, 300);
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
              &quot;{websites.invaidValue[websites.invaidValue.length - 1]}
              &quot;
            </Text>{" "}
            is not valid web address (e.g. .com, .net, .org)
          </Text>
        </Popover.Dropdown>
      </Popover>
    );
  };

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: 1 },
  };

  return (
    <form onSubmit={form.onSubmit()}>
      <motion.div {...animation}>
        <Group className={classes.taskFormTitle} justify="space-between">
          <Group gap="7">
            <Image
              src={"/img/clientDashboard/submit/addTask.svg"}
              alt={"Task Type"}
              height={25}
              opacity={0.5}
            />
            <Title order={4}>Add Details</Title>
          </Group>
          <Badge
            className={classes.taskType}
            color={typeColor}
            c={taskType === "Web Dev" ? "#000" : "#fff"}
            size="md"
            variant={"filled"}
          >
            {taskType}
          </Badge>
        </Group>
        <Stack className="panel" w={800} gap={20}>
          <Grid>
            <Grid.Col span="auto">
              <TextInput
                {...form.getInputProps("title")}
                ref={titleRef}
                autoFocus={true}
                placeholder="Title..."
                tabIndex={1}
              />
            </Grid.Col>
            <Grid.Col span="content">
              <ServiceSelect
                form={form}
                typeServices={typeServices}
                tabIndex={2}
              />
            </Grid.Col>
          </Grid>
          <Box hidden={taskType !== "Web Dev"}>
            <Textarea
              {...form.getInputProps("goal")}
              autosize
              minRows={2}
              tabIndex={taskType === "Web Dev" ? 3 : "NaN"}
              placeholder="Intended Goal..."
            />
          </Box>
          <Textarea
            {...form.getInputProps("desc")}
            placeholder="Description..."
            tabIndex={taskType === "Web Dev" ? 4 : 3}
            minRows={7}
            maxRows={7}
            autosize
          />
          <Stack hidden={taskType !== "Design"} gap={20}>
            {taskType === "Design" && (
              <>
                <AddTags
                  placeholder="Style Defining Keywords..."
                  mode={"styleKeywords"}
                  tabIndex={taskType === "Web Dev" ? 5 : 4}
                />
                <AddTags
                  placeholder="Delivery File Formats..."
                  mode={"deliveryFormats"}
                  tabIndex={taskType === "Web Dev" ? 6 : 5}
                />
              </>
            )}
            <AddTags
              placeholder="Relevant Websites..."
              mode={"websites"}
              tabIndex={6}
            />
          </Stack>
        </Stack>
        <Stack mt={20} gap={20}>
          <ColorPanel choosenType={formData.type} form={form} />
          <FilePanel form={form} />
          <Group justify="flex-end" gap={5}>
            <Button
              className={classes.backBtn}
              onClick={() => setSubmissionPanel(0)}
              leftSection={
                <FaPlay
                  size={10}
                  style={{
                    transform: "rotate(180deg)",
                  }}
                />
              }
            >
              Back
            </Button>
            {showReviewBtn ? (
              <Button
                className={classes.reviewBtn}
                rightSection={<FaPlay size={8} />}
                onClick={() => setSubmissionPanel(2)}
              >
                Review
              </Button>
            ) : (
              <HoverCard shadow="md" position="bottom" withArrow>
                <HoverCard.Target>
                  <Image
                    className={classes.helpIcon}
                    src={"/img/clientDashboard/submit/help.svg"}
                    alt={"Help Notice"}
                    height={25}
                  />
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text c={"#000"} fz={12}>
                    Add a title, description and
                    <br />
                    select a service to continue.
                  </Text>
                </HoverCard.Dropdown>
              </HoverCard>
            )}
          </Group>
        </Stack>
        <Dialog
          className="infoDialog"
          opened={deliverInfo}
          withCloseButton
          size={340}
          p={"20px 25px"}
          transitionProps={{
            transition: "slide-left",
            duration: 300,
          }}
          onClose={() => {
            setTimeout(() => {
              setHelpMode("");
              setDeliverInfo(false);
            }, 300);
          }}
        >
          <Center className="dialogIcon">
            <TbHelpSmall size={30} />
          </Center>
          <Box w={375} pr={55}>
            <HelpInfo />
          </Box>
        </Dialog>
      </motion.div>
    </form>
  );
}
