"use client";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Dialog,
  FileInput,
  Grid,
  Group,
  HoverCard,
  Image,
  Kbd,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { TbHelpSmall, TbHelpSquareFilled } from "react-icons/tb";
import { usePortalState, useSubissionData } from "../../portalStore";
import ColorPanel from "../colorPanel/colorPanel";
import ServiceSelect from "../serviceSelect/serviceSelect";
import AddTags from "./addTags";
import classes from "./styles/taskFrom.module.css";

export default function TaskForm(props) {
  const { typeColor, typeServices, titleRef } = props;
  const { taskType, setFormData, setSubmissionPanel } = useSubissionData();
  const { helpMode, setHelpMode, deliverInfo, setDeliverInfo } =
    usePortalState();

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

  const [showReviewBtn, setShowReviewBtn] = useState(false);

  useEffect(() => {
    const isWebDevComplete =
      taskType === "Web Dev" &&
      form.values.title.length > 0 &&
      form.values.goal.length > 0 &&
      form.values.desc.length > 0 &&
      form.values.service.length > 0;
    const isOtherTaskComplete =
      taskType !== "Web Dev" &&
      form.values.title.length > 0 &&
      form.values.desc.length > 0 &&
      form.values.service.length > 0;
    setShowReviewBtn(isWebDevComplete || isOtherTaskComplete);
  }, [form?.values, taskType]);

  const enterBtnInfo = (subject) => (
    <>
      <Text className={classes.dialogInfoEnter}>
        Press <Kbd size="xs">Enter</Kbd> to add the {subject} to the list.
      </Text>
    </>
  );

  const HelpInfo = () => {
    if (helpMode === "styleKeywords") {
      return (
        <>
          <Text fz={13} ta={"center"}>
            Add keywords that define the style
            <br />
            you want for this task.
          </Text>
          {enterBtnInfo("keyword")}
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
          {enterBtnInfo("file type")}
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
          {enterBtnInfo("site")}
        </>
      );
    }
    if (helpMode === "files") {
      return (
        <>
          <Text fz={13} ta={"center"}>
            Upload any files that are relevant to
            <br />
            completing this task.
          </Text>
          {enterBtnInfo("file")}
        </>
      );
    }
  };

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: 1 },
  };

  return (
    <form onSubmit={() => console.log(form.values)}>
      <motion.div {...animation}>
        <Group
          className={classes.taskFormTitle}
          mt={-100}
          justify="space-between"
        >
          <Group gap="7">
            <Image
              src={"/img/clientDashboard/submit/addTask.svg"}
              alt={"Task Type"}
              height={30}
              opacity={0.5}
            />
            <Title order={2}>Add Details</Title>
            <RiArrowRightDoubleFill size={20} opacity={0.25} />
            <Badge
              className={classes.taskType}
              color={typeColor}
              c={taskType === "Web Dev" ? "#000" : "#fff"}
              size="sm"
              variant={"filled"}
            >
              {taskType}
            </Badge>
          </Group>
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
                  form={form}
                  placeholder="Style Defining Keywords..."
                  mode={"styleKeywords"}
                  deliverInfo={deliverInfo}
                  setDeliverInfo={setDeliverInfo}
                  tabIndex={taskType === "Web Dev" ? 5 : 4}
                />
                <AddTags
                  form={form}
                  placeholder="Delivery File Formats..."
                  mode={"deliveryFormats"}
                  deliverInfo={deliverInfo}
                  setDeliverInfo={setDeliverInfo}
                  tabIndex={taskType === "Web Dev" ? 6 : 5}
                />
              </>
            )}
            <AddTags
              form={form}
              placeholder="Relevant Websites..."
              mode={"websites"}
              deliverInfo={deliverInfo}
              setDeliverInfo={setDeliverInfo}
              tabIndex={6}
            />
            <FileInput
              {...form.getInputProps("files")}
              name="Upload files"
              placeholder="Upload Files..."
              multiple
              leftSectionWidth={50}
              leftSectionPointerEvents="all"
              leftSection={
                <ActionIcon
                  className={"actionBtnDimmed"}
                  variant="transparent"
                  color="#fff"
                  onClick={() => {
                    if (helpMode !== "files") {
                      setHelpMode("files");
                      setDeliverInfo(true);
                    } else {
                      setDeliverInfo(!deliverInfo);
                      if (deliverInfo) {
                        setTimeout(() => {
                          setHelpMode("");
                        }, 300);
                      }
                    }
                  }}
                >
                  <TbHelpSquareFilled size={30} />
                </ActionIcon>
              }
              rightSectionPointerEvents="all"
              rightSection={
                <ActionIcon
                  w={40}
                  mr={10}
                  className={"actionBtn actionBtnDimmed"}
                >
                  <FaPlus size={15} />
                </ActionIcon>
              }
            />
          </Stack>
        </Stack>
        <Stack mt={20} gap={20}>
          {taskType === "Design" && <ColorPanel form={form} />}
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
                onClick={() => {
                  setFormData(form.values);
                  setSubmissionPanel(2);
                }}
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
