"use client";
import { isEmpty } from "@libs/custom";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  CloseButton,
  FileInput,
  Grid,
  Group,
  HoverCard,
  Image,
  Popover,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { LuPanelBottomClose } from "react-icons/lu";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { TbHelpSquareFilled } from "react-icons/tb";
import { VscClearAll } from "react-icons/vsc";
import { usePortalState, useSubissionData } from "../../portalStore";
import ColorPanel from "../colorPanel/colorPanel";
import ServiceSelect from "../serviceSelect/serviceSelect";
import AddTags from "./addTags";
import classes from "./styles/taskFrom.module.css";

export default function TaskForm(props) {
  const { typeColor, typeServices, titleRef } = props;
  const {
    taskType,
    formData,
    setFormData,
    setSubmissionPanel,
    setTaskType,
    styleKeywords,
    deliveryFormats,
    websites,
    files,
    setFiles,
  } = useSubissionData();
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
  const [hoveringPopover, setHoveringPopover] = useState(false);
  const popoverDropdownRef = useClickOutside(() => setHoveringPopover(false));

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
    if (form.values.type !== taskType) form.setFieldValue("type", taskType);
  }, [form, taskType]);

  useEffect(() => {
    return () => {
      if (isEmpty(form.values)) {
        setTimeout(() => {
          setSubmissionPanel(0);
          form.setFieldValue("type", "");
          setTaskType("");
        }, 500);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: 1 },
  };

  const closeHelp = () => {
    setTimeout(() => {
      setHelpMode("");
      setDeliverInfo(false);
    }, 300);
  };

  return (
    <form>
      <motion.div {...animation}>
        <Group className={classes.taskFormTitle} justify="space-between">
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
                  icon={"hashtag"}
                  placeholder="Style Defining Keywords"
                  mode={"styleKeywords"}
                  deliverInfo={deliverInfo}
                  setDeliverInfo={setDeliverInfo}
                  tabIndex={taskType === "Web Dev" ? 5 : 4}
                />
                <AddTags
                  form={form}
                  icon={"files"}
                  placeholder="Delivery File Formats"
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
                icon={"website"}
                placeholder="Relevant Websites"
                mode={"websites"}
                deliverInfo={deliverInfo}
                setDeliverInfo={setDeliverInfo}
                tabIndex={6}
              />
              <Popover
                opened={hoveringPopover && tagsList.values.tags.length > 0}
                position="top"
                width={"target"}
                closeOnClickOutside={false}
              >
                <Popover.Target>
                  <FileInput
                    {...form.getInputProps("files")}
                    name="Upload files"
                    placeholder="Upload Files"
                    multiple
                    leftSectionWidth={50}
                    leftSectionPointerEvents="all"
                    leftSection={
                      <ActionIcon
                        className={"actionBtnDimmed"}
                        variant="transparent"
                        color="#777"
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
                        <TbHelpSquareFilled
                          className={classes.tagsInput}
                          size={30}
                        />
                      </ActionIcon>
                    }
                    rightSectionPointerEvents="all"
                    rightSection={
                      <ActionIcon
                        w={40}
                        mr={10}
                        className={"actionBtn actionBtnDimmed"}
                      >
                        <FaPlus size={12} />
                      </ActionIcon>
                    }
                  />
                </Popover.Target>
                <Popover.Dropdown
                  ref={popoverDropdownRef}
                  className="selectDropdown"
                  onMouseEnter={() => setHoveringPopover(true)}
                >
                  <Group justify="space-between" mb={10}>
                    <Group gap={7}>
                      <Image
                        className={classes.tagIcon}
                        opacity={0.25}
                        src={`/img/clientDashboard/paperclip.svg`}
                        alt={"Paperclip Icon | Attach Files"}
                        fit="contain"
                        w={30}
                      />
                      <Stack gap={0}>
                        <Text
                          tt={"uppercase"}
                          opacity={0.25}
                          c="dark.9"
                          fw={700}
                          fz={12}
                        >
                          Related Files
                        </Text>
                        <Text
                          tt={"uppercase"}
                          c="dark.9"
                          fw={100}
                          fz={12}
                          mr={8}
                          mt={-6}
                        >
                          {files.length === 10
                            ? "Max Reached"
                            : files.length + " / 10"}
                        </Text>
                      </Stack>
                    </Group>
                    <Group gap={5}>
                      <CloseButton
                        className={classes.closeBtn}
                        variant="transparent"
                        size="sm"
                        icon={<LuPanelBottomClose />}
                        onClick={() => setHoveringPopover(false)}
                      />
                    </Group>
                  </Group>
                  <Box className={classes.tagsListFrame}>{files}</Box>
                </Popover.Dropdown>
              </Popover>
            </Group>
          </Stack>
          {taskType === "Design" && (
            <ColorPanel
              form={form}
              colors={form.values.colors}
              setColors={form.setFieldValue}
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
                onClick={() => {
                  setSubmissionPanel(0);
                  closeHelp();
                }}
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
                    closeHelp();
                    setSubmissionPanel(2);
                    setFormData({
                      ...form.values,
                      styleKeywords,
                      deliveryFormats,
                      websites,
                    });
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
                    <Text c={"#000"} ta={"center"} fz={12}>
                      Add the title, service,
                      {taskType === "Web Dev" ? " intended goal, " : " "}
                      <br />
                      and description to continue.
                    </Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              )}
            </Group>
          </Group>
        </Stack>
      </motion.div>
    </form>
  );
}
