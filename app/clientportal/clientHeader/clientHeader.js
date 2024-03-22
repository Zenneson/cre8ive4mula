"use client";
import {
  ActionIcon,
  Badge,
  Box,
  Center,
  Dialog,
  Flex,
  Group,
  Image,
  Kbd,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { TbHelpSmall } from "react-icons/tb";
import { usePortalState, useSubissionData } from "../portalStore";
import classes from "./styles/clientHeader.module.css";

export default function ClientHeader() {
  const {
    activePanel,
    deliverInfo,
    setDeliverInfo,
    helpMode,
    setHelpMode,
    setNotiDrawerOpen,
  } = usePortalState();
  const { submissionPanel } = useSubissionData();
  const [companyName, setCompanyName] = useState("Welcome to Cre8ive 4mula");

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

  const enterBtnInfo = (subject) => (
    <>
      <Text className={classes.dialogInfoEnter}>
        Press <Kbd size="xs">Enter</Kbd> to add the {subject} to the list.
      </Text>
    </>
  );

  const HelpInfo = () => {
    if (helpMode === "styleKeywords") {
      return (
        <>
          <Text fz={13} ta={"center"}>
            Add keywords that define the style
            <br />
            you want for this task.
          </Text>
          {enterBtnInfo("keyword")}
        </>
      );
    }
    if (helpMode === "deliveryFormats") {
      return (
        <>
          <Text fz={13} ta={"center"}>
            Add your perfered file types, such as <br />
            <Text component="span" fw={700} opacity={0.5} fz={17}>
              JPG, PNG, SVG, EPS, PDF, PSD,
            </Text>
            <br />
            or any other formats relevant to your needs.
          </Text>
          {enterBtnInfo("file type")}
        </>
      );
    }
    if (helpMode === "websites") {
      return (
        <>
          <Text fz={13} ta={"center"}>
            Add all the websites you want to use
            <br />
            as a reference for your task.
          </Text>
          {enterBtnInfo("site")}
        </>
      );
    }
    if (helpMode === "files") {
      return (
        <>
          <Text fz={13} ta={"center"}>
            Upload any files that are relevant to
            <br />
            completing this task.
          </Text>
          {enterBtnInfo("file")}
        </>
      );
    }
  };

  const closeHelp = () => {
    setTimeout(() => {
      setHelpMode("");
      setDeliverInfo(false);
    }, 300);
  };

  return (
    <motion.div {...animationProps}>
      <Group
        className={classes.topRightBtnsFrame}
        gap={0}
        onClick={() => setNotiDrawerOpen(true)}
      >
        <Tooltip
          position={"bottom"}
          withArrow
          label={"Notifications"}
          offset={5}
        >
          <Badge
            className={classes.notificationsBadge}
            variant="outline"
            color="#b9d5f6"
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
                src={`/img/menu/bellFull.svg`}
                alt={"Notifications"}
                height={25}
              />
            </ActionIcon>
          </Tooltip>
        </Box>
      </Group>
      <Dialog
        zIndex={1000}
        className="infoDialog"
        opened={deliverInfo && submissionPanel === 1}
        withCloseButton
        size={340}
        p={"20px 25px"}
        transitionProps={{
          transition: "slide-left",
          duration: 300,
        }}
        onClose={closeHelp}
      >
        <Center className="dialogIcon">
          <TbHelpSmall size={30} />
        </Center>
        <Box w={375} pr={55}>
          <HelpInfo />
        </Box>
      </Dialog>
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
            <Title className={classes.companyName}>{companyName}</Title>
            <Badge
              className={classes.accountBadge}
              size="lg"
              variant="gradient"
              gradient={{ from: "deepblue.3", to: "deepblue.9", deg: 180 }}
            >
              Pro
            </Badge>
          </Flex>
          <Text mt={-8} fw={700} fz={12} c={"#fff"} tt={"uppercase"}>
            <Text c={"gray.4"} fz={12} component="span">
              Cleint Portal -{" "}
            </Text>
            {panelLabel(activePanel)}
          </Text>
        </Stack>
      </Group>
    </motion.div>
  );
}
