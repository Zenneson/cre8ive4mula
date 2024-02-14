"use client";
import { hexToRgb, taskColor } from "@libs/custom";
import {
  Badge,
  Box,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { taskInfo } from "../../../../public/data/taskData";
import ColorPuck from "../../colorPuck/colorPuck";
import { usePortalState } from "../../portalStore";
import classes from "./styles/detailsSection.module.css";

export default function DetailsSection() {
  const { drawerState } = usePortalState();
  const task = taskInfo[2];
  const typeColor = taskColor(task.type);
  const { ref, height } = useElementSize();

  const [colors, setColors] = useState([]);
  const [styleKeywords, setStyleKeywords] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [files, setFiles] = useState([]);
  const [infoHeight, setInfoHeight] = useState(0);

  useEffect(() => {
    setColors(task.colors || []);
    setStyleKeywords(task.styleKeywords || []);
    setWebsites(task.websites || []);
    setFiles(task.files || []);
  }, [task]);

  useEffect(() => {
    if (height === 0) return;
    setInfoHeight(height + 105);
  }, [height]);

  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: 0.1, duration: 0.3 },
  };

  const DetailsRow = (props) => {
    const { icon, alt, details } = props;
    return (
      <Group className={classes.detailsRow} my={5}>
        <Image
          src={`/img/clientDashboard/${icon}.svg`}
          alt={alt}
          fit="contain"
          w={25}
        />
        <Flex
          w={"calc(100% - 50px)"}
          wrap={"wrap"}
          rowGap={0}
          columnGap={5}
          align={"center"}
        >
          {details.map((detail, index) => (
            <Text key={index} c="#fff">
              {detail}
              {index < details.length - 1 && ","}
            </Text>
          ))}
        </Flex>
      </Group>
    );
  };

  const colorRow = colors.map((color, index) => {
    const rgb = hexToRgb(color);

    return <ColorPuck key={index} color={color} isTaskFrom={false} rgb={rgb} />;
  });

  return (
    <Box
      className={`panel ${classes.detailsSection}`}
      h={`${
        drawerState === "init"
          ? "calc(60vh - 30px)"
          : drawerState === "showDetails"
            ? "calc(100vh - 155px)"
            : "88px"
      }`}
      mr={5}
    >
      <Box h={"100%"}>
        <Stack className={classes.taskTitle} mb={20} ml={-7} gap={0}>
          <Group gap={5}>
            <Image
              src="/img/clientDashboard/taskIcon.svg"
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
                  size="xs"
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
              <Box pos={"relative"} className={classes.topDetails} ref={ref}>
                <Badge
                  className={classes.detailsBadge}
                  size="xs"
                  variant="gradient"
                  gradient={{ from: "#8fbaeb", to: "#7fb1ea", deg: 180 }}
                >
                  Details
                </Badge>
                <Stack
                  className={`altPanel ${classes.detailsPanel}`}
                  mb={task.type === "Web Dev" ? 20 : 5}
                  gap={0}
                >
                  <Group className={classes.dateRow} my={5}>
                    <Image
                      src="/img/clientDashboard/drawer/taskCalendar.svg"
                      alt={"Calendar"}
                      fit="contain"
                      opacity={0.5}
                      w={27}
                    />
                    <Text>{task.date}</Text>
                    <Image
                      src="/img/clientDashboard/drawer/clock.svg"
                      alt={"Clock"}
                      fit="contain"
                      opacity={0.5}
                      w={18}
                    />
                    <Text>{task.time}</Text>
                  </Group>
                  <Box hidden={task.type !== "Design"}>
                    {colors && colors.length > 0 && (
                      <Group className={classes.detailsRow} mt={5} mb={15}>
                        <Image
                          src="/img/clientDashboard/colorPalette.svg"
                          alt={"Color Palette"}
                          fit="contain"
                          w={25}
                        />
                        <Flex
                          justify={"flex-start"}
                          align={"center"}
                          gap={"20px"}
                          pl={"3px"}
                          mah={40}
                        >
                          {colorRow}
                        </Flex>
                      </Group>
                    )}
                    {styleKeywords && styleKeywords.length > 0 && (
                      <DetailsRow
                        icon={"hashtag"}
                        alt={"Style Keywords"}
                        details={styleKeywords}
                      />
                    )}
                  </Box>
                  {websites && websites.length > 0 && (
                    <DetailsRow
                      icon={"website"}
                      alt={"Related Links"}
                      details={websites}
                    />
                  )}
                  {files && files.length > 0 && (
                    <DetailsRow
                      icon={"paperclip"}
                      alt={"Project Files"}
                      details={files}
                    />
                  )}
                </Stack>
                {task.type === "Web Dev" && (
                  <Box pos={"relative"}>
                    <Badge
                      className={classes.descBadge}
                      size="xs"
                      variant="gradient"
                      gradient={{ from: "#8fbaeb", to: "#7fb1ea", deg: 180 }}
                    >
                      Goal
                    </Badge>
                    <Box className={classes.textPanel}>
                      <Text fz={14}>{task.goal}</Text>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box pos={"relative"} h={`calc(100% - ${infoHeight}px`}>
                <Badge
                  className={classes.descBadge}
                  size="xs"
                  variant="gradient"
                  gradient={{ from: "#8fbaeb", to: "#7fb1ea", deg: 180 }}
                >
                  Description
                </Badge>
                <Box
                  className={`${classes.textPanel} ${classes.taskDesc}`}
                  h={"100%"}
                >
                  <Text fz={14}>{task.desc}</Text>
                </Box>
              </Box>
            </Stack>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
