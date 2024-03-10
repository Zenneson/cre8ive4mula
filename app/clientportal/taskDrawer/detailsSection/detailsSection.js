"use client";
import { hexToRgb, taskColor } from "@libs/custom";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
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

  const [colors, setColors] = useState([]);
  const [styleKeywords, setStyleKeywords] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setColors(task.colors || []);
    setStyleKeywords(task.styleKeywords || []);
    setWebsites(task.websites || []);
    setFiles(task.files || []);
  }, [task]);

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
      <Flex direction={"column"} mah={"calc(100% - 80px)"} h={"100%"}>
        <Stack mb={15} ml={-7} gap={0}>
          <Group gap={5}>
            <Image
              src="/img/clientDashboard/taskIcon.svg"
              alt="Task Icon"
              width={55}
              height={55}
            />
            <Stack gap={0} w={"calc(100% - 60px)"}>
              <Group gap={3}>
                <Badge color={typeColor} variant={"filled"} size="xs">
                  {task.type}
                </Badge>
                <RiArrowRightDoubleFill opacity={0.25} />
                <Text tt={"uppercase"} fz={14} fw={600}>
                  {task.service}
                </Text>
              </Group>
              <Title
                tt={"uppercase"}
                w={"calc(100% - 215px)"}
                lineClamp={1}
                order={3}
              >
                {task.title}
              </Title>
            </Stack>
          </Group>
        </Stack>
        <AnimatePresence>
          {drawerState !== "showChat" && (
            <Flex
              component={motion.div}
              {...animationProps}
              direction={"column"}
              gap={20}
              flex={1}
            >
              <Box pos={"relative"}>
                <Badge
                  className={`descBadge ${classes.detailsBadge}`}
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
                  <Group className={classes.dateRow} mt={5} mb={10}>
                    <Image
                      src="/img/clientDashboard/drawer/taskCalendar.svg"
                      alt={"Calendar"}
                      fit="contain"
                      opacity={0.25}
                      w={25}
                      ml={3.5}
                    />
                    <Text mr={10}>{task.date}</Text>
                    <Image
                      src="/img/clientDashboard/drawer/clock.svg"
                      alt={"Clock"}
                      fit="contain"
                      opacity={0.25}
                      w={23}
                      mr={-5}
                    />
                    <Text>{task.time}</Text>
                  </Group>
                  <Divider opacity={0.12} w={"98%"} mx={"auto"} />
                  <Box hidden={task.type !== "Design"}>
                    {colors && colors.length > 0 && (
                      <Group className={classes.detailsRow} my={5}>
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
                      className="descBadge"
                      size="xs"
                      variant="gradient"
                      gradient={{ from: "#8fbaeb", to: "#7fb1ea", deg: 180 }}
                    >
                      Goal
                    </Badge>
                    <Box className="textPanel" mih={55}>
                      <Text fz={14}>{task.goal}</Text>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box className="textBadgeFrame" flex={1}>
                <Badge
                  className="descBadge"
                  size="xs"
                  variant="gradient"
                  gradient={{ from: "#8fbaeb", to: "#7fb1ea", deg: 180 }}
                >
                  Description
                </Badge>
                <Box className={`textPanel ${classes.taskDesc}`} mih={91}>
                  <Text fz={14}>{task.desc}</Text>
                </Box>
              </Box>
            </Flex>
          )}
        </AnimatePresence>
      </Flex>
    </Box>
  );
}
