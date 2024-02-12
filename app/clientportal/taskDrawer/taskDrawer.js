"use client";
import { Drawer, Group, Image, Tooltip } from "@mantine/core";
import { usePortalState } from "../portalStore";
import DetailsSection from "./detailsSection";
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
      returnFocus
      opened={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Group className={`altPanel ${classes.drawerBtns}`} gap={10}>
        <Tooltip label="Expand Details">
          <Image
            className={classes.expandBtn}
            src="/img/expand.svg"
            alt="Expand Details"
            onClick={() => setDrawerOpen(false)}
          />
        </Tooltip>
        <Tooltip label="Close">
          <Image
            className={classes.closeBtn}
            src="/img/closeDrawer.svg"
            alt="close"
            onClick={() => setDrawerOpen(false)}
          />
        </Tooltip>
      </Group>
      <DetailsSection />
      <TaskChat />
    </Drawer>
  );
}
