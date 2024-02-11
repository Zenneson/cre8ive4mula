"use client";
import { Box, ScrollArea, Title } from "@mantine/core";
import { motion } from "framer-motion";
import Archive from "./archive/archive";
import Dashboard from "./dashboard/dashboard";
import { usePortalState } from "./portalStore";
import classes from "./styles/clientPortal.module.css";
import SubmitTask from "./submitTask/submitTask";

const animation = {
  initial: { y: -100, opacity: 0, duration: 500 },
  animate: { y: 0, opacity: 1, duration: 500 },
  transition: { type: "ease-in-out" },
};

export default function Panels(props) {
  const { taskData } = props;
  const { activePanel } = usePortalState();

  return (
    <>
      {activePanel === 0 && (
        <motion.div {...animation}>
          <Box
            component={ScrollArea}
            type="hover"
            {...animation}
            className={classes.dashPanel}
          >
            <Dashboard taskData={taskData} />
          </Box>
        </motion.div>
      )}
      {activePanel === 1 && (
        <motion.div {...animation}>
          <Box
            component={ScrollArea}
            type="hover"
            {...animation}
            className={classes.dashPanel}
          >
            <SubmitTask />
          </Box>
        </motion.div>
      )}
      {activePanel === 2 && (
        <motion.div {...animation}>
          <Box
            component={ScrollArea}
            type="hover"
            {...animation}
            className={classes.dashPanel}
            pt={60}
            pl={125}
          >
            <Archive />
          </Box>
        </motion.div>
      )}
      {activePanel === 3 && (
        <motion.div {...animation}>
          <Box
            component={ScrollArea}
            type="hover"
            {...animation}
            className={classes.dashPanel}
            pt={60}
            pl={125}
          >
            <Title>Account Settings</Title>
          </Box>
        </motion.div>
      )}
    </>
  );
}
