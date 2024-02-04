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
  Text,
  Title,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import { usePortalState } from "../portalStore";
import classes from "./styles/taskCard.module.css";

export default function TaskCard(props) {
  const { taskData, boardType, index, draggableId } = props;
  const [viewTask, setViewTask] = useState(false);
  const [brightDetails, setBrightDetails] = useState(false);
  const { allowReorder } = usePortalState();

  const animationProps = {
    initial: { x: 0, opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
    transition: { duration: 0.32 },
  };

  const colorWay = taskData.colors?.map((color, index) => (
    <Avatar key={index} size={16} className={classes.colorSwatch}>
      <ColorSwatch color={color} />
    </Avatar>
  ));

  const tagsList = taskData.tags?.map((tag, index) =>
    index < taskData.tags.length - 1 ? `${tag}, ` : tag
  );

  return (
    <Draggable key={taskData} draggableId={`${draggableId}`} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <motion.div {...animationProps}>
            <Box mx={0} mb={5} mt={index !== 0 ? 15 : 5}>
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
                  setViewTask(!viewTask);
                }}
                pos={"relative"}
                pb={10}
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
                <Group justify="space-between" mb={5}>
                  <Group gap={3}>
                    <Badge
                      color={taskColor(taskData.type)}
                      className={classes.taskType}
                      size="xs"
                      ml={-5}
                      variant={viewTask ? "filled" : "light"}
                    >
                      {taskData.type}
                    </Badge>
                    {taskData.alerts && (
                      <Badge
                        fw="700"
                        size={viewTask ? "sm" : "xs"}
                        ml={2}
                        variant={"filled"}
                        color={"blue.7"}
                        circle={!viewTask}
                      >
                        <Group gap={2}>
                          {taskData.alerts} {viewTask && "NEW"}{" "}
                          {viewTask && <FaRegComments size={12} />}
                        </Group>
                      </Badge>
                    )}
                  </Group>
                  <Text
                    className={classes.taskDate}
                    opacity={viewTask ? 1 : 0.25}
                  >
                    {taskData.date}
                  </Text>
                </Group>
                <Title className={classes.title} truncate="end" lineClamp={2}>
                  {taskData.title}
                </Title>
                <Group
                  gap={0}
                  mt={10}
                  opacity={viewTask || brightDetails ? 1 : 0.25}
                >
                  <Badge
                    className={classes.taskService}
                    color={taskColor(taskData.type)}
                    variant="dot"
                    c={"#fff"}
                    size="sm"
                  >
                    {taskData.service}
                  </Badge>
                  <Badge
                    className={classes.filesAttached}
                    rightSection={<CgAttachment size={10} />}
                    variant="dot"
                    size="sm"
                    c={"#fff"}
                    mr={5}
                  >
                    {taskData.files.length}
                  </Badge>
                  <Avatar.Group>{colorWay}</Avatar.Group>
                </Group>
                <Group
                  className={`${classes.viewTaskFrame} ${
                    viewTask && classes.opened
                  }`}
                  justify="space-between"
                >
                  <Flex className={classes.addedTags} gap={5}>
                    {taskData.tags && taskData.tags.length > 0 && (
                      <Image
                        src="/img/hashtag.svg"
                        alt={"Task Tags"}
                        fit="contain"
                        mt={7}
                        w={20}
                      />
                    )}
                    <Text className={classes.tagsList}>{tagsList}</Text>
                  </Flex>
                  <Group className={classes.taskBtnsFrame}>
                    <Group gap={5} ml={5} opacity={1} c="#fff">
                      <Badge
                        className={classes.commentNum}
                        rightSection={<FaRegComments size={12} />}
                        color="gray.4"
                        variant="outline"
                        size="sm"
                      >
                        12
                      </Badge>
                    </Group>
                    {boardType === "Ready For Review" ? (
                      <Button
                        className={`${classes.viewTaskBtn} ${classes.reviewBtn}`}
                        variant="light"
                      >
                        Review
                      </Button>
                    ) : (
                      <Button className={classes.viewTaskBtn} variant="light">
                        Open
                      </Button>
                    )}
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
