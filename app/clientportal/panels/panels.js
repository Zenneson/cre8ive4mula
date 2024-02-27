"use client";
import { Box, ScrollArea, Title } from "@mantine/core";
import { motion } from "framer-motion";
import Archive from "../archive/archive";
import Dashboard from "../dashboard/dashboard";
import ImgGen from "../imgGen/imgGen";
import { usePortalState } from "../portalStore";
import SubmitTask from "../submitTask/submitTask";
import classes from "./styles/panels.module.css";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { animationTimingFunction: "ease-in-out", duration: 0.5 },
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
            <ImgGen />
          </Box>
        </motion.div>
      )}{" "}
      {activePanel === 4 && (
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
