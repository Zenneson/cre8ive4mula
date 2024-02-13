"use client";
import { taskColor } from "@libs/custom";
import { Badge, Box, Group, Image, Stack, Text, Title } from "@mantine/core";
import { RiArrowDropRightLine, RiArrowRightDoubleFill } from "react-icons/ri";
import { taskInfo } from "../../../public/data/taskData";
import classes from "./styles/detailsSection.module.css";

export default function DetailsSection() {
  const task = taskInfo[2];
  const typeColor = taskColor(task.type);

  return (
    <Box className={`panel ${classes.detailsSection}`} mr={5}>
      <Box h={"100%"}>
        <Stack className={classes.taskTitle} mb={15} gap={0}>
          <Group gap={5}>
            <Image
              src="/img/taskIcon.svg"
              alt="Task Icon"
              width={55}
              height={55}
            />
            <Stack gap={0} w={"calc(100% - 60px)"}>
              <Group gap={3}>
                <Badge
                  className={classes.taskType}
                  color={typeColor}
                  variant={"filled"}
                  size="sm"
                >
                  {task.type}
                </Badge>
                <RiArrowRightDoubleFill opacity={0.25} />
                <Text tt={"uppercase"} fz={14} fw={600}>
                  {task.service}
                </Text>
              </Group>
              <Title
                tt={"uppercase"}
                w={"calc(100% - 100px)"}
                order={3}
                lineClamp={1}
              >
                {task.title}
              </Title>
            </Stack>
          </Group>
        </Stack>
        <Stack h={"100%"} gap={20} mt={5}>
          <Box className={classes.topDetails}>
            {task.type === "Web Dev" && (
              <Box className={classes.textPanel}>
                <Group gap={0}>
                  <RiArrowDropRightLine />
                  <Title tt={"uppercase"} mb={1} order={6}>
                    Intended goal
                  </Title>
                </Group>
                <Text fz={14}>{task.goal}</Text>
              </Box>
            )}
          </Box>
          <Box
            className={`${classes.textPanel} ${classes.taskDesc}`}
            h={"calc(100% - 180px"}
            // mah={"calc(100% - 180px"}
          >
            <Group gap={0}>
              <RiArrowDropRightLine />
              <Title tt={"uppercase"} mb={1} order={6}>
                Description
              </Title>
            </Group>
            <Text fz={14}>{task.desc}</Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
