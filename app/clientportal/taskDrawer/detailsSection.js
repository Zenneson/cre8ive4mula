"use client";
import { taskColor } from "@libs/custom";
import { Badge, Box, Group, Image, Stack, Text, Title } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { RiArrowDropRightLine, RiArrowRightDoubleFill } from "react-icons/ri";
import { taskInfo } from "../../../public/data/taskData";
import { usePortalState } from "../portalStore";
import classes from "./styles/detailsSection.module.css";

export default function DetailsSection() {
  const { drawerState } = usePortalState();
  const task = taskInfo[2];
  const typeColor = taskColor(task.type);

  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: 0.1, duration: 0.3 },
  };

  return (
    <Box
      className={`panel ${classes.detailsSection}`}
      h={`${
        drawerState === "init"
          ? "calc(60vh - 30px)"
          : drawerState === "showDetails"
            ? "calc(100vh - 150px)"
            : "92px"
      }`}
      mr={5}
    >
      <Box h={"100%"}>
        <Stack className={classes.taskTitle} mb={20} gap={0}>
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
        <AnimatePresence>
          {drawerState !== "showChat" && (
            <Stack
              component={motion.div}
              {...animationProps}
              h={"100%"}
              gap={20}
              mt={5}
            >
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
                h={"calc(100% - 185px"}
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
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
