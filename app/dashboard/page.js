"use client";
import { Box, Group, Stack, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "./navbar";
import classes from "./styles/dashboard.module.css";

const animation = {
  initial: { y: -50, duration: 500 },
  animate: { y: 0, duration: 500 },
  exit: { y: 50, duration: 500 },
  transition: { type: "ease-in-out" },
};

export default function Dashboard() {
  const [active, setActive] = useState(0);

  return (
    <>
      <Navbar active={active} setActive={setActive} />

      {active === 0 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <Title className={classes.header} mb={"10px"} tt={"uppercase"}>
            Task Dashboard
          </Title>
          <Group grow>
            <Stack className="panel" gap={20}>
              <Box className="innerPanel">Column 1</Box>
              <Box className="innerPanel">Column 1</Box>
              <Box className="innerPanel">Column 1</Box>
            </Stack>
            <Stack className="panel" gap={20}>
              <Box className="innerPanel">Column 2</Box>
              <Box className="innerPanel">Column 2</Box>
              <Box className="innerPanel">Column 2</Box>
            </Stack>
            <Stack className="panel" gap={20}>
              <Box className="innerPanel">Column 3</Box>
              <Box className="innerPanel">Column 3</Box>
              <Box className="innerPanel">Column 3</Box>
            </Stack>
          </Group>
        </motion.div>
      )}
      {active === 1 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <Title>Submit Task</Title>
        </motion.div>
      )}
      {active === 2 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <Title>Archive</Title>
        </motion.div>
      )}
      {active === 3 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <Title>File Repository</Title>
        </motion.div>
      )}
    </>
  );
}
