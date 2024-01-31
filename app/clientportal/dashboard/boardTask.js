import {
  Avatar,
  Badge,
  Box,
  Button,
  ColorSwatch,
  Flex,
  Group,
  Image,
  Indicator,
  Text,
  Title,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import classes from "./styles/boardTask.module.css";

export default function BoardTask(props) {
  const { taskData, boardType } = props;
  const [viewTask, setViewTask] = useState(false);
  const ref = useClickOutside(() => setViewTask(false));

  const taskColor = (type) => {
    switch (type) {
      case "Design":
        return "#f66345";
      case "Content":
        return "#f80800";
      case "Web Dev":
        return "#ffd941";
      default:
        return "#f66345";
    }
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
    <Indicator
      size={8}
      disabled={boardType !== "Tasks In-Progress" ? true : false}
    >
      <Box
        className={`innerPanel ${classes.taskFrame} ${
          boardType === "Ready For Review" && classes.reviewReady
        } ${viewTask && classes.active}`}
        onClick={() => setViewTask(!viewTask)}
        pos={"relative"}
        pb={10}
        ref={ref}
      >
        <Group justify="space-between" mb={5}>
          <Badge
            color={taskColor(taskData.type)}
            className={classes.taskType}
            size="xs"
            ml={-5}
          >
            {taskData.type}
          </Badge>
          <Text className={classes.taskDate}>JAN 10th, 2024</Text>
        </Group>
        <Title className={classes.title} truncate="end" lineClamp={2}>
          {taskData.title}
        </Title>
        <Group gap={0} mt={10}>
          <Badge
            className={classes.taskService}
            color={taskColor(taskData.type)}
            variant="dot"
            size="sm"
          >
            {taskData.service}
          </Badge>
          <Badge
            className={classes.filesAttached}
            rightSection={<CgAttachment size={10} />}
            variant="dot"
            size="sm"
            mr={5}
          >
            {taskData.files.length}
          </Badge>
          <Avatar.Group>{colorWay}</Avatar.Group>
        </Group>
        {viewTask && (
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
        )}
        <Group
          className={`${classes.viewTaskFrame} ${viewTask && classes.opened}`}
          justify="space-between"
        >
          <div className={classes.customDivider} />
          <Group gap={5} opacity={1} c="#fff">
            <Badge
              className={classes.commentNum}
              rightSection={<FaRegComments size={12} />}
              size="sm"
            >
              3
            </Badge>
            <Badge fw="700" size="xs" ml={2} color="#e23e3e">
              1 NEW
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
            <Box className={classes.taskBtnsFrame}>
              <FaRegTrashCan className={classes.deleteTaskBtn} size={16} />
              <Button className={classes.viewTaskBtn} variant="light">
                Open
              </Button>
            </Box>
          )}
        </Group>
      </Box>
    </Indicator>
  );
}
