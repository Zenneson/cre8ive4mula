"use client";
import {
  ActionIcon,
  Badge,
  Box,
  Drawer,
  Group,
  Image,
  List,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { FaPlay } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { LiaEyeSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxShadowNone } from "react-icons/rx";
import { VscClearAll } from "react-icons/vsc";
import { usePortalState } from "../portalStore";
import classes from "./styles/notiDrawer.module.css";

const alerts = [
  // {
  //   id: 1,
  //   unread: true,
  //   type: "message",
  //   message: "Your task submission has been received.",
  //   time: new Date("2024-02-25T08:30:00"),
  // },
  // {
  //   id: 2,
  //   type: "ready",
  //   unread: false,
  //   message: "A designer has been assigned to your task.",
  //   time: new Date("2024-02-25T10:15:00"),
  // },
  // {
  //   id: 3,
  //   unread: false,
  //   type: "message",
  //   message: "Your task has been completed and is awaiting review.",
  //   time: new Date("2024-02-26T13:45:00"),
  // },
];

export default function NotiDrawer() {
  const { notiDrawerOpen, setNotiDrawerOpen } = usePortalState();

  const LedLight = (props) => {
    const { unread } = props;
    return (
      <Box
        className={`${classes.ledLightGlow} ${unread && classes.greenLight}`}
      />
    );
  };

  // TODO: Add logic to turn light yellow onClick
  const notiList = alerts.map((alert) => (
    <List.Item className={`altPanel ${classes.notiItem}`} key={alert.id}>
      <Badge
        className={classes.notiBadge}
        leftSection={<LedLight unread={alert.unread} />}
        variant="transparent"
        color={alert.unread ? "#fff" : "rgba(255, 255, 255, 0.25)"}
        size="xs"
      >
        {alert.type === "message" ? "New Task Message" : "Review Ready"}
      </Badge>
      <Group className={classes.notiActions} gap={3}>
        <Tooltip label="View">
          <ActionIcon
            className={classes.notiActionBtn}
            variant="transparent"
            size={"xs"}
          >
            <LiaEyeSolid color={"#fff"} size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon
            className={classes.notiActionBtn}
            variant="transparent"
            size={"xs"}
          >
            <RiDeleteBin6Line color={"#fff"} size={12} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <List mt={2}>
        <List.Item icon={<FaPlay size={10} />}>
          <Text c={"gray.7"} fw={600} fz={12} lh={1}>
            {alert.message}
          </Text>
        </List.Item>
        <List.Item icon={<IoMdTime size={14} />} ml={-2}>
          <Text c={"gray.0"} mt={-4} ml={-2} size="xs">
            {alert.time.toLocaleString()}
          </Text>
        </List.Item>
      </List>
    </List.Item>
  ));

  return (
    <Drawer
      classNames={{
        root: classes.notiDrawerRoot,
        content: classes.notiDrawerContent,
      }}
      withCloseButton={false}
      withOverlay={false}
      opened={notiDrawerOpen}
      position="right"
      size={410}
      onClose={() => setNotiDrawerOpen(false)}
    >
      <Box className={`panel ${classes.notiDrawerBox}`}>
        <Box className={`drawerTopBtns ${classes.notiCloseBtn}`}>
          <Tooltip position="left" label="Close" offset={15}>
            <Image
              className={classes.closeBtn}
              src="/img/clientDashboard/drawer/closeDrawer.svg"
              alt="Close"
              onClick={() => setNotiDrawerOpen(false)}
            />
          </Tooltip>
        </Box>
        <Group gap={5} w={"100%"} ml={40} mt={-3} mb={20}>
          <Title className={classes.notiTitle} tt={"uppercase"}>
            Notifications
          </Title>
          <Image
            className={`${classes.notiImg} ${
              notiDrawerOpen ? classes.shakingBell : ""
            }`}
            src="/img/menu/bell.svg"
            alt="Close"
          />
        </Group>
        {alerts.length === 0 ? (
          <Group ta={"center"} justify="center" gap={5} w={"100%"}>
            <RxShadowNone size={20} style={{ opacity: 0.35 }} />
            <Text className={classes.noNotiText}>No Notifications</Text>
          </Group>
        ) : (
          <>
            <List listStyleType="none" spacing={0}>
              {notiList}
            </List>
            <Group className={classes.clearListBtn} mt={-15} gap={5}>
              <VscClearAll color={"#fff"} size={15} />
              <Text tt={"uppercase"} c={"gray.0"} fz={11} fw={700}>
                Clear List
              </Text>
            </Group>
          </>
        )}
      </Box>
    </Drawer>
  );
}
