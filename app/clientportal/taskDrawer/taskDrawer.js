"use client";
import CustomLoader from "@libs/loader/customLoader";
import { Drawer, Flex, Group, Image, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
// import { taskInfo } from "../../../public/data/taskData";
import { usePortalState } from "../portalStore";
import DetailsSection from "./detailsSection/detailsSection";
import classes from "./styles/taskDrawer.module.css";
import TaskChat from "./taskChat/taskChat";

export default function TaskDrawer() {
  const { drawerOpen, setDrawerOpen, drawerState, setDrawerState } =
    usePortalState();

  const taskInfo = [];
  const [taskData, setTaskData] = useState(taskInfo || []);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (taskInfo && taskInfo.length > 0) {
      setTaskData(taskInfo);
      setDrawerState("init");
    } else {
      setDataLoaded(true);
      setDrawerState("showDetails");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      overlayProps={{ backgroundOpacity: 0.25, color: "#9dc4f3", blur: 7 }}
      position="right"
      size={"70%"}
      returnFocus
      opened={drawerOpen}
      onClose={drawerClose}
    >
      <Group className={"altPanel drawerTopBtns"} gap={10}>
        <Tooltip label="Edit Task">
          <Image
            className={classes.editTaskBtn}
            src="/img/clientDashboard/drawer/edit.svg"
            alt="Edit Task"
            mr={5}
          />
        </Tooltip>
        <Tooltip label="Send Task">
          <Image
            className={classes.emailTaskBtn}
            src="/img/clientDashboard/drawer/mail.svg"
            alt="Email Task"
            mx={5}
          />
        </Tooltip>
        <Tooltip
          label={drawerState === "showDetails" ? "Reset" : "Expand Details"}
        >
          <Image
            className={classes.expandBtn}
            src={
              drawerState === "showDetails"
                ? "/img/clientDashboard/drawer/reset.svg"
                : "/img/clientDashboard/drawer/expand.svg"
            }
            alt="Expand Details"
            onClick={handleDrawerHeight}
          />
        </Tooltip>
        <Tooltip label="Close">
          <Image
            className={classes.closeBtn}
            src="/img/clientDashboard/drawer/closeDrawer.svg"
            alt="Close"
            onClick={drawerClose}
          />
        </Tooltip>
      </Group>
      <Flex
        direction={"column"}
        h={"calc(100vh - 40px)"}
        className={
          !taskData || taskData.length === 0
            ? classes.taskDrawerContentWrapper
            : ""
        }
      >
        {dataLoaded ? (
          <CustomLoader mode={"default"} />
        ) : (
          <>
            <DetailsSection taskInfo={taskData} />
            <TaskChat />
          </>
        )}
      </Flex>
    </Drawer>
  );
}
