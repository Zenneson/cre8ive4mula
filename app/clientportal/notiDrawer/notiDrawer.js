"use client";
import {
  Box,
  Divider,
  Drawer,
  Group,
  Image,
  List,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { FaPlay } from "react-icons/fa";
import { FaRegHandPointUp } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { usePortalState } from "../portalStore";
import classes from "./styles/notiDrawer.module.css";

const alerts = [
  {
    id: 1,
    message: "Your task submission has been received.",
    time: new Date("2024-02-25T08:30:00"),
  },
  {
    id: 2,
    message: "A designer has been assigned to your task.",
    time: new Date("2024-02-25T10:15:00"),
  },
  {
    id: 3,
    message: "Your task has been completed and is awaiting review.",
    time: new Date("2024-02-26T13:45:00"),
  },
];

export default function NotiDrawer() {
  const { notiDrawerOpen, setNotiDrawerOpen } = usePortalState();

  const notiList = alerts.map((alert) => (
    <List.Item
      className={`altPanel ${classes.notiItem}`}
      key={alert.id}
      pt={17}
      mb={15}
    >
      <List>
        <List.Item icon={<FaPlay size={10} />}>
          <Text c={"gray.0"} fw={600} fz={14} lh={1}>
            {alert.message}
          </Text>
        </List.Item>
        <List.Item icon={<IoMdTime size={14} />} ml={-2}>
          <Text c={"deepblue.7"} mt={-2} ml={-2} size="xs">
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
      size={400}
      onClose={() => setNotiDrawerOpen(false)}
    >
      <Box className={`panel ${classes.notiDrawerBox}`}>
        <Box className={`altPanel drawerTopBtns ${classes.notiCloseBtn}`}>
          <Tooltip label="Close">
            <Image
              className={classes.closeBtn}
              src="/img/clientDashboard/drawer/closeDrawer.svg"
              alt="Close"
              onClick={() => setNotiDrawerOpen(false)}
            />
          </Tooltip>
        </Box>
        <Group gap={5} w={"100%"} justify="flex-end" mr={5}>
          <Image
            className={classes.notiImg}
            src="/img/menu/bell.svg"
            alt="Close"
          />
          <Title tt={"uppercase"} opacity={0.5} order={3} mt={-3}>
            Notifications
          </Title>
        </Group>
        <Divider
          w={180}
          ml={"auto"}
          size={"md"}
          opacity={0.1}
          mt={-5}
          mb={25}
        />
        <List spacing={0} icon={<FaRegHandPointUp opacity={0.3} size={25} />}>
          {notiList}
        </List>
      </Box>
    </Drawer>
  );
}
