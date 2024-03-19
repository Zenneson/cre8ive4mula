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
import { VscClearAll } from "react-icons/vsc";
import { usePortalState, useSubissionData } from "../../portalStore";
import ColorPanel from "../colorPanel/colorPanel";
import ServiceSelect from "../serviceSelect/serviceSelect";
import AddTags from "./addTags";
import classes from "./styles/taskFrom.module.css";

export default function TaskForm(props) {
  const { typeColor, typeServices, titleRef } = props;
  const { taskType, formData, setFormData, setSubmissionPanel, setTaskType } =
    useSubissionData();
  const { helpMode, setHelpMode, deliverInfo, setDeliverInfo } =
    usePortalState();

  const initialValues = {
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
  };

  const form = useForm({ initialValues });
  const [selectedService, setSelectedService] = useState(formData.service);
  const [searchService, setSearchService] = useState("");
  const [showReviewBtn, setShowReviewBtn] = useState(false);

  useEffect(() => {
    if (form?.values.length > 0) return;

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
      form.values.service?.length > 0;
    setShowReviewBtn(isWebDevComplete || isOtherTaskComplete);
  }, [form, taskType]);

  useEffect(() => {
    form.setFieldValue("type", taskType);
    const isDirty = form.isDirty();

    return () => {
      if (!isDirty) {
        setTimeout(() => {
          setSubmissionPanel(0);
          setTaskType("");
        }, 500);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <form onSubmit={() => setFormData(form.values)}>
      <motion.div {...animation}>
        <Group
          className={classes.taskFormTitle}
          justify="space-between"
          mt={-100}
        >
          <Group gap={5}>
            <Image
              src={"/img/clientDashboard/submit/addTask.svg"}
              alt={"Task Type"}
              height={30}
              opacity={0.5}
              pb={3}
            />
            <Title order={4}>Add Details</Title>
            <RiArrowRightDoubleFill size={20} opacity={0.25} />
            <Badge
              className={classes.taskType}
              color={typeColor}
              variant={"filled"}
              size="xs"
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
                onBlur={() => setFormData(form.values)}
              />
            </Grid.Col>
            <Grid.Col span="content">
              <ServiceSelect
                form={form}
                tabIndex={2}
                typeServices={typeServices}
                value={selectedService}
                setValue={setSelectedService}
                search={searchService}
                setSearch={setSearchService}
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
              onBlur={() => setFormData(form.values)}
            />
          </Box>
          <Textarea
            {...form.getInputProps("desc")}
            placeholder="Description..."
            tabIndex={taskType === "Web Dev" ? 4 : 3}
            onBlur={() => setFormData(form.values)}
            minRows={7}
            maxRows={7}
            autosize
          />
          <Stack hidden={taskType !== "Design"} gap={20}>
            {taskType === "Design" && (
              <Group grow>
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
              </Group>
            )}
            <Group grow>
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
            </Group>
          </Stack>
          {taskType === "Design" && (
            <ColorPanel
              colors={form.values.colors}
              setColors={form.setFieldValue}
              form={form}
            />
          )}
        </Stack>
        <Stack mt={20} gap={20}>
          <Group justify="space-between">
            <Button
              className={classes.resetBtn}
              leftSection={<VscClearAll size={18} />}
              onClick={() => {
                form.reset();
                setSelectedService(null);
                setSearchService("");
                titleRef.current.focus();
              }}
            >
              Clear Form
            </Button>
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
