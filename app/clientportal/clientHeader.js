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
import { usePortalState } from "./portalStore";
import classes from "./styles/clientHeader.module.css";

export default function ClientHeader() {
  const { activePanel, setActivePanel } = usePortalState();

  const panelLabel = (activePanel) => {
    switch (activePanel) {
      case 0:
        return "Task Dashboard";
      case 1:
        return "Submission Form";
      case 2:
        return "Project Archive";
      case 3:
        return "Account Settings";
      default:
        return "Task Dashboard";
    }
  };

  return (
    <Group
      className={classes.headerFrame}
      justify="space-between"
      mb={"2px"}
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

      <Stack gap={0} align="flex-end">
        <Tooltip
          position={"bottom"}
          withArrow
          label={"Account Settings"}
          offset={5}
        >
          <Badge
            className={classes.userBadge}
            variant="light"
            color={"#fff"}
            size="md"
            tt={"inherit"}
            onClick={() => setActivePanel(3)}
          >
            useremail@gmail.com
          </Badge>
        </Tooltip>
        <Group gap={0}>
          <Box className={activePanel === 0 && classes.currentPanel}>
            <Tooltip
              position={"bottom"}
              withArrow
              label={"Dashboard"}
              offset={-3}
            >
              <ActionIcon
                size="xl"
                variant="transparent"
                className={classes.topRightBtns}
                onClick={() => setActivePanel(0)}
              >
                <Image
                  src={"/img/menu/dashboard.svg"}
                  alt={"Submit Task"}
                  height={25}
                />
              </ActionIcon>
            </Tooltip>
          </Box>
          <Box className={activePanel === 1 && classes.currentPanel}>
            <Tooltip
              position={"bottom"}
              withArrow
              label={"Submit Task"}
              offset={-3}
            >
              <ActionIcon
                size="xl"
                variant="transparent"
                className={classes.topRightBtns}
                onClick={() => setActivePanel(1)}
              >
                <Image
                  src={"/img/menu/submitTask.svg"}
                  alt={"Submit Task"}
                  height={25}
                />
              </ActionIcon>
            </Tooltip>
          </Box>
          <Box className={activePanel === 2 && classes.currentPanel}>
            <Tooltip
              position={"bottom"}
              withArrow
              label={"Archive"}
              offset={-3}
            >
              <ActionIcon
                size="xl"
                variant="transparent"
                className={classes.topRightBtns}
                onClick={() => setActivePanel(2)}
              >
                <Image
                  src={"/img/menu/fileRepo.svg"}
                  alt={"Archive"}
                  height={25}
                />
              </ActionIcon>
            </Tooltip>
          </Box>
        </Group>
      </Stack>
    </Group>
  );
}
