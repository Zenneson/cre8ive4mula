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
  const { activePanel, setNotiDrawerOpen } = usePortalState();

  const animationProps = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.5 },
  };

  const panelLabel = (activePanel) => {
    switch (activePanel) {
      case 0:
        return "Task Dashboard";
      case 1:
        return "Task Submission Form";
      case 2:
        return "Task Archive";
      case 3:
        return "AI Image Generator";
      case 4:
        return "Account Settings";
      default:
        return "Task Dashboard";
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

        <Group mt={-5} mr={-5} gap={0} onClick={() => setNotiDrawerOpen(true)}>
          <Tooltip
            position={"bottom"}
            withArrow
            label={"Notifications"}
            offset={5}
          >
            <Badge
              className={classes.notificationsBadge}
              color="#b9d5f6"
              c={"cobaltblue.9"}
              size="md"
              mr={-5}
              circle
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
              >
                <Image
                  src={`/img/menu/bell.svg`}
                  alt={"Notifications"}
                  height={27}
                />
              </ActionIcon>
            </Tooltip>
          </Box>
        </Group>
      </Group>
    </motion.div>
  );
}
