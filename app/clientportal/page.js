"use client";
import { Box, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { cache, useEffect } from "react";
import { usePortalState } from "../clientportal/portalStore";
import Dashboard from "./dashboard/dashboard";
import Navbar from "./navbar";
import classes from "./styles/clientPortal.module.css";
import SubmitTask from "./submitTask/submitTask";
import TypeBtns from "./submitTask/typeBtns";

export const TypeBtnsCache = cache(() => <TypeBtns />);

const animation = {
  initial: { y: -50, duration: 500 },
  animate: { y: 0, duration: 500 },
  exit: { y: 50, duration: 500 },
  transition: { type: "ease-in-out" },
};

export default function ClientPortal() {
  const { activePanel, setActivePanel } = usePortalState();
  useEffect(() => {
    if (activePanel !== 1) sessionStorage.removeItem("submitData");
  }, [activePanel]);

  return (
    <>
      <Navbar activePanel={activePanel} setActivePanel={setActivePanel} />

      {activePanel === 0 && (
        <Box
          component={motion.div}
          {...animation}
          className={classes.dashPanel}
          pl={125}
        >
          <Dashboard setActivePanel={setActivePanel} />
        </Box>
      )}
      {activePanel === 1 && (
        <Box
          component={motion.div}
          {...animation}
          className={classes.dashPanel}
        >
          <SubmitTask />
        </Box>
      )}
      {activePanel === 2 && (
        <Box
          component={motion.div}
          {...animation}
          className={classes.dashPanel}
          pl={125}
        >
          <Title>Archive</Title>
        </Box>
      )}
      {activePanel === 3 && (
        <Box
          component={motion.div}
          {...animation}
          className={classes.dashPanel}
          pl={125}
        >
          <Title>File Repository</Title>
        </Box>
      )}
      {activePanel === 4 && (
        <Box
          component={motion.div}
          {...animation}
          className={classes.dashPanel}
          pl={125}
        >
          <Title>Account Settings</Title>
        </Box>
      )}
    </>
  );
}
