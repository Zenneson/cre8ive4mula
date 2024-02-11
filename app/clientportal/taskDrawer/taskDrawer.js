"use client";
import { Box, Drawer } from "@mantine/core";
import { usePortalState } from "../portalStore";
import classes from "./styles/taskDrawer.module.css";
import TaskChat from "./taskChat";

export default function TaskDrawer() {
  const { drawerOpen, setDrawerOpen } = usePortalState();

  return (
    <Drawer
      classNames={{
        root: classes.taskDrawerRoot,
        content: classes.taskDrawerContent,
      }}
      overlayProps={{ backgroundOpacity: 0.25, color: "#75acee", blur: 5 }}
      withCloseButton={false}
      position="right"
      size={"70%"}
      opened={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Box className={`innerPanel ${classes.topSection}`} mr={5}>
        <h1>Task Drawer</h1>
      </Box>
      <Box className={`innerPanel ${classes.bottomSection}`} mt={20} mr={5}>
        <TaskChat />
      </Box>
    </Drawer>
  );
}
