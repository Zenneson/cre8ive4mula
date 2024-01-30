import {
  Avatar,
  Badge,
  Box,
  ColorSwatch,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgAttachment } from "react-icons/cg";
import classes from "./styles/boardTask.module.css";

export default function BoardTask(props) {
  const { taskData } = props;

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
    <Box className="innerPanel" pos={"relative"} pb={10}>
      <Group justify="space-between" mb={5}>
        <Badge
          color={taskColor(taskData.type)}
          className={classes.taskType}
          size="xs"
        >
          {taskData.type}
        </Badge>
        <Group gap={5} mr={-7}>
          <Text fz={12} fw={600} c={"#fff"} opacity={0.4}>
            JAN 10th, 2024
          </Text>
          <BsThreeDotsVertical className={classes.taskMenuBtn} size={18} />
        </Group>
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
          size="sm"
          mr={10}
        >
          {taskData.files.length}
        </Badge>
        <Avatar.Group>{colorWay}</Avatar.Group>
      </Group>
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
    </Box>
  );
}
