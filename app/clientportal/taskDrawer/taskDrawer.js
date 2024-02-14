"use client";
import { Drawer, Group, Image, Tooltip } from "@mantine/core";
import { usePortalState } from "../portalStore";
import DetailsSection from "./detailsSection/detailsSection";
import classes from "./styles/taskDrawer.module.css";
import TaskChat from "./taskChat/taskChat";

export default function TaskDrawer() {
  const { drawerOpen, setDrawerOpen, drawerState, setDrawerState } =
    usePortalState();

  const handleDrawerHeight = () => {
    const action = drawerState !== "showDetails" ? "showDetails" : "init";
    setDrawerState(action);
  };

  const drawerClose = () => {
    setDrawerOpen(false);
    setDrawerState("init");
  };

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
      onClose={drawerClose}
    >
      <Group className={`altPanel ${classes.drawerBtns}`} gap={10}>
        <Tooltip
          label={drawerState === "showDetails" ? "Reset" : "Expand Details"}
        >
          <Image
            className={classes.expandBtn}
            src={
              drawerState === "showDetails"
                ? "/img/reset.svg"
                : "/img/expand.svg"
            }
            alt="Expand Details"
            onClick={handleDrawerHeight}
          />
        </Tooltip>
        <Tooltip label="Close">
          <Image
            className={classes.closeBtn}
            src="/img/closeDrawer.svg"
            alt="close"
            onClick={drawerClose}
          />
        </Tooltip>
      </Group>
      <DetailsSection />
      <TaskChat />
    </Drawer>
  );
}
