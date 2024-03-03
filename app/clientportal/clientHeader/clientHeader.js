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
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePortalState } from "../portalStore";
import classes from "./styles/clientHeader.module.css";

const AccountStatus = (props) => {
  const { lightOn } = props;

  const accountStatusAnimation = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      <AnimatePresence>
        {!lightOn && (
          <Title
            className={classes.accountStatus}
            component={motion.div}
            {...accountStatusAnimation}
            initial={{ y: 0, opacity: 1 }}
            fz={12}
            c={"#fff"}
          >
            Account Stauts
          </Title>
        )}
        {lightOn && (
          <Title
            className={classes.accountStatus}
            component={motion.div}
            {...accountStatusAnimation}
            fz={12}
            c={"#fff"}
          >
            Pro
          </Title>
        )}
      </AnimatePresence>
    </>
  );
};

export default function ClientHeader() {
  const { activePanel, setNotiDrawerOpen } = usePortalState();
  const [lightOn, setLightOn] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLightOn(true);
    }, 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const animationProps = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.5 },
  };

  const LedLight = () => (
    <Box
      className={`${classes.ledLightGlow} ${lightOn && classes.greenLight}`}
    />
  );

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
            <Badge
              className={classes.accountStatusBadge}
              leftSection={<LedLight />}
              size="lg"
              w={lightOn ? 68 : 161.4}
            >
              <AccountStatus lightOn={lightOn} />
            </Badge>
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
                  height={24}
                />
              </ActionIcon>
            </Tooltip>
          </Box>
        </Group>
      </Group>
    </motion.div>
  );
}
