"use client";
import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { motion } from "framer-motion";
import { usePortalState } from "../portalStore";
import classes from "./styles/clientHeader.module.css";

export default function ClientHeader() {
  const { activePanel, setActivePanel } = usePortalState();

  const animationProps = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.5 },
  };

  const panelLabel = (activePanel) => {
    switch (activePanel) {
      case 0:
        return "Dashboard";
      case 1:
        return "Submit Task";
      case 2:
        return "Archive";
      case 3:
        return "AI Image Generator";
      case 4:
        return "Account Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <motion.div {...animationProps}>
      <Group
        className={classes.headerFrame}
        justify="space-between"
        mt={7}
        mb={2}
        pr={13}
        pl={125}
      >
        <Stack gap={0}>
          <Flex align={"center"} gap={10}>
            <Title className={classes.companyName}>
              Sheaperd&rsquo;s Valley, LLC
            </Title>
            <Badge size="md">Pro</Badge>
          </Flex>
          <Text mt={-8} fw={700} fz={12} c={"#fff"} tt={"uppercase"}>
            <Text c={"gray.4"} fz={12} component="span">
              Cleint Portal -{" "}
            </Text>
            {panelLabel(activePanel)}
          </Text>
        </Stack>

        <Group gap={0}>
          <Tooltip
            position={"bottom"}
            withArrow
            label={"Notifications"}
            offset={5}
          >
            <Badge
              className={classes.notificationsBadge}
              size="md"
              mr={-5}
              circle
              color="deepred.7"
            >
              3
            </Badge>
          </Tooltip>
          <Box>
            <Tooltip
              position={"bottom"}
              withArrow
              label={"Notifications"}
              offset={-3}
            >
              <ActionIcon
                size="xl"
                variant="transparent"
                className={classes.topRightBtns}
                // onClick={}
              >
                <Image
                  src={`/img/menu/bell.svg`}
                  alt={"Notifications"}
                  height={25}
                />
              </ActionIcon>
            </Tooltip>
          </Box>
        </Group>
      </Group>
    </motion.div>
  );
}
