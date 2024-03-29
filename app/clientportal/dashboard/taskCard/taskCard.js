"use client";
import { Draggable } from "@hello-pangea/dnd";
import { taskColor } from "@libs/custom";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  ColorSwatch,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { MdDragIndicator, MdOutlineFiberNew } from "react-icons/md";
import { usePortalState } from "../../portalStore";
import classes from "./styles/taskCard.module.css";

export default function TaskCard(props) {
  const {
    num,
    viewTask,
    setViewTask,
    showDetails,
    setShowDetails,
    taskData,
    boardType,
    index,
    draggableId,
    scrollToElement,
  } = props;
  const [brightDetails, setBrightDetails] = useState(false);
  const { allowReorder, loaded, setLoaded, setDrawerOpen, setNotiDrawerOpen } =
    usePortalState();
  const frameRef = useRef();
  const { ref, width } = useElementSize();
  const infoListWidth = width;

  useEffect(() => {
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aniTime = loaded ? 0 : 0.3;
  const animationProps = {
    initial: {
      transform: loaded
        ? "perspective(400px) rotate3d(1, 0, 0, 0deg)"
        : "perspective(400px) rotate3d(1, 0, 0, -90deg)",
      transformOrigin: "top center",
      opacity: 0,
    },
    animate: {
      transform: "perspective(400px) rotate3d(1, 0, 0, 0deg)",
      opacity: 1,
    },
    exit: { opacity: 0 },
    transition: {
      animationTimingFunction: "ease-in-out",
      duration: 0.5,
      delay: 0.3 + num * aniTime,
    },
  };

  const colorWay = taskData?.colors?.map((color, index) => (
    <Avatar key={index} size={16} className={classes.colorSwatch}>
      <ColorSwatch color={color} />
    </Avatar>
  ));

  const tagsList = taskData?.tags?.map((tag, index) =>
    index < taskData?.tags.length - 1 ? `${tag}, ` : tag
  );

  const websitesList = taskData?.websites?.map((site, index) =>
    index < taskData?.websites.length - 1 ? `${site}, ` : site
  );

  return (
    <Draggable key={taskData} draggableId={`${draggableId}`} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <motion.div {...animationProps}>
            <Box mx={0} mt={index !== 0 ? 15 : 5}>
              <Box
                className={`innerPanel ${classes.taskFrame} ${
                  boardType === "Ready For Review" && classes.reviewReady
                } ${viewTask && classes.active} ${
                  allowReorder &&
                  boardType === "Submitted Tasks" &&
                  classes.reordering
                }`}
                onClick={() => {
                  if (boardType === "Submitted Tasks" && allowReorder) return;
                  scrollToElement(frameRef.current);
                  setViewTask(true);
                  setTimeout(() => {
                    setShowDetails(true);
                  }, 100);
                }}
                pos={"relative"}
                pt={5}
                pb={10}
                ref={frameRef}
                onMouseEnter={() => setBrightDetails(true)}
                onMouseLeave={() => setBrightDetails(false)}
              >
                <Center
                  {...provided.dragHandleProps}
                  className={`${classes.grabHandleFrame} ${
                    boardType === "Submitted Tasks" &&
                    allowReorder &&
                    classes.grabHandleShowing
                  }`}
                >
                  <MdDragIndicator
                    className={classes.grabHandleIcon}
                    size={30}
                  />
                </Center>
                <Group justify="space-between">
                  <Group gap={viewTask ? 5 : 0}>
                    <Badge
                      className={classes.taskType}
                      color={taskColor(taskData?.type)}
                      bg={viewTask ? taskColor(taskData?.type) : "transparent"}
                      variant={viewTask ? "filled" : "light"}
                      size={viewTask ? "xs" : "sm"}
                      ml={viewTask ? -7 : -9}
                    >
                      {taskData?.type}
                    </Badge>
                  </Group>
                  <Flex align={"center"} gap={0}>
                    <Text
                      className={classes.taskDate}
                      opacity={viewTask ? 1 : 0.25}
                    >
                      {taskData?.date}
                    </Text>
                    <Tooltip
                      label="Close"
                      position="top"
                      openDelay={500}
                      offset={-2}
                    >
                      <Image
                        className={classes.closeIcon}
                        src="/img/clientDashboard/dashboard/closePanel.svg"
                        alt={"Close"}
                        fit="contain"
                        w={viewTask ? 20 : 0}
                        mr={-7}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetails(false);
                          setViewTask(false);
                        }}
                      />
                    </Tooltip>
                  </Flex>
                </Group>
                <Title className={classes.title} truncate="end" lineClamp={2}>
                  {taskData?.title}
                </Title>
                <Group
                  gap={0}
                  mt={10}
                  opacity={viewTask || brightDetails ? 1 : 0.25}
                >
                  <Badge
                    className={classes.taskService}
                    color={taskColor(taskData?.type)}
                    variant="dot"
                    c={"#fff"}
                    size="sm"
                  >
                    {taskData?.service}
                  </Badge>
                  <Badge
                    className={classes.filesAttached}
                    rightSection={<CgAttachment size={10} />}
                    variant="dot"
                    size="sm"
                    c={"#fff"}
                    mr={5}
                  >
                    {taskData?.files.length}
                  </Badge>
                  <Avatar.Group>{colorWay}</Avatar.Group>
                </Group>
                <Group
                  className={`${classes.viewTaskFrame} ${
                    viewTask && classes.opened
                  }`}
                  justify="space-between"
                  pos={"relative"}
                >
                  <Stack
                    className={`${classes.infoList} ${
                      showDetails && classes.detailsShowing
                    }`}
                    w={infoListWidth}
                    gap={0}
                  >
                    {taskData?.tags && taskData?.tags.length > 0 && (
                      <Flex className={classes.addedTags} gap={5}>
                        <Image
                          src="/img/clientDashboard/hashtag.svg"
                          alt={"Style Keywords"}
                          fit="contain"
                          mt={7}
                          w={20}
                        />
                        <Text className={classes.tagsList}>{tagsList}</Text>
                      </Flex>
                    )}
                    {taskData?.websites && taskData?.websites.length > 0 && (
                      <Flex className={classes.addedWebsites} gap={5}>
                        <Image
                          src="/img/clientDashboard/website.svg"
                          alt={"Related Links"}
                          fit="contain"
                          mt={7}
                          w={20}
                        />
                        <Text className={classes.websitesList}>
                          {websitesList}
                        </Text>
                      </Flex>
                    )}
                  </Stack>
                  <Group
                    className={`${classes.taskBtnsFrame}  ${
                      showDetails && classes.detailsShowing
                    }`}
                    ref={ref}
                  >
                    <Group gap={2} ml={5}>
                      <Badge
                        className={classes.commentNum}
                        rightSection={<FaRegComments size={12} />}
                        color="gray.4"
                        variant="outline"
                        size="sm"
                      >
                        12
                      </Badge>
                      {taskData?.alerts && (
                        <MdOutlineFiberNew color={"#CED4DA"} size={27} />
                      )}
                    </Group>
                    <Button
                      className={`${classes.viewTaskBtn} ${
                        boardType === "Ready For Review" && classes.reviewBtn
                      }`}
                      variant="light"
                      onClick={() => {
                        setNotiDrawerOpen(false);
                        setDrawerOpen(true);
                      }}
                    >
                      {boardType === "Ready For Review" ? "Review" : "Open"}
                    </Button>
                  </Group>
                </Group>
              </Box>
            </Box>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
}
