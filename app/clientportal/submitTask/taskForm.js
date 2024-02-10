"use client";
import { taskColor } from "@libs/custom";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Dialog,
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
import { shallowEqual, useDebouncedState, useSetState } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { TbHelpSmall, TbHelpSquareFilled } from "react-icons/tb";
import { useSubissionData } from "../portalStore";
import ColorPanel from "./colorPanel";
import FilePanel from "./filePanel";
import ServiceSelect from "./serviceSelect";
import classes from "./styles/taskFrom.module.css";

export default function TaskForm(props) {
  const { typeServices, titleRef } = props;
  const { formData, setFormData, setSubmissionPanel } = useSubissionData();
  const [typeColor, setTypeColor] = useState();
  const [deliverInfo, setDeliverInfo] = useState(false);

  const [formTitle, setFormTitle] = useDebouncedState("", 200);
  const [formGoal, setFormGoal] = useDebouncedState("", 200);
  const [formDesc, setFormDesc] = useDebouncedState("", 200);

  const taskType = formData.type?.title;
  const taskService = formData?.service;
  const showReviewBtn =
    taskType === "Web Dev" && formTitle && formGoal && formDesc && taskService
      ? true
      : taskType !== "Web Dev" && formTitle && formDesc && taskService
        ? true
        : false;

  useEffect(() => {
    const equal = shallowEqual(
      { title: formData.title, goal: formData.goal, desc: formData.desc },
      {
        title: formTitle,
        goal: formGoal,
        desc: formDesc,
      }
    );
    if (equal) return;

    setFormData({
      title: formTitle,
      goal: formGoal,
      desc: formDesc,
    });
  }, [
    formTitle,
    formGoal,
    formDesc,
    formData.title,
    formData.goal,
    formData.desc,
    setFormData,
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

    const maxAllowed = mode === "deliveryFormats" ? 5 : 10;

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setTimeout(() => {
          modeRef.current?.focus();
        }, 100);
      }
    };

    useEffect(() => {
      const equal = shallowEqual(modeVar, formData[mode]);
      if (equal) return;
      setFormData({ [mode]: modeVar });
    }, [mode, modeVar]);

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
              &quot;{websites.invaidValue[websites.invaidValue.length - 1]}
              &quot;
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

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: 1 },
  };

  return (
    <motion.div {...animation}>
      <Box mt={-50}>
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
                ref={titleRef}
                autoFocus={true}
                placeholder="Title..."
                tabIndex={1}
                defaultValue={formTitle}
                onChange={(event) => setFormTitle(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span="content">
              <ServiceSelect
                typeServices={typeServices}
                setFormData={setFormData}
                tabIndex={2}
              />
            </Grid.Col>
          </Grid>
          <Box hidden={taskType !== "Web Dev"}>
            <Textarea
              autosize
              minRows={2}
              tabIndex={taskType === "Web Dev" ? 3 : "NaN"}
              placeholder="Intended Goal..."
              defaultValue={formGoal}
              onChange={(event) => setFormGoal(event.currentTarget.value)}
            />
          </Box>
          <Textarea
            autosize
            tabIndex={taskType === "Web Dev" ? 4 : 3}
            minRows={7}
            maxRows={7}
            placeholder="Description..."
            defaultValue={formDesc}
            onChange={(event) => setFormDesc(event.currentTarget.value)}
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
            <AddTags placeholder="Websites..." mode={"websites"} tabIndex={6} />
          </Stack>
        </Stack>
        <Stack mt={20} gap={20}>
          <ColorPanel setFormData={setFormData} choosenType={formData.type} />
          <FilePanel setFormData={setFormData} />
          <Group justify="flex-end">
            <Button
              className={classes.backBtn}
              mr={!showReviewBtn ? -15 : 0}
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
            {showReviewBtn && (
              <Button
                className={classes.reviewBtn}
                leftSection={<FaPlay size={10} />}
                onClick={() => setSubmissionPanel(2)}
              >
                Review
              </Button>
            )}
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
    </motion.div>
  );
}
