"use client";
import { Box, Flex, Group, Stack, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "./navbar";
import classes from "./styles/dashboard.module.css";
import SubmitTask from "./submitTask";

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
            Company Name
          </Title>
          <Flex gap={20}>
            <Stack w="33%" className="panel" gap={20}>
              <Group gap={5} mt={-15} mb={-15}>
                <Title order={2} fw={900}>
                  7
                </Title>
                <Title order={6} fw={400}>
                  Submitted Tasks
                </Title>
              </Group>
              <Box className="innerPanel">Column 1</Box>
              <Box className="innerPanel">Column 1</Box>
              <Box className="innerPanel">Column 1</Box>
              <Box className="innerPanel">Column 1</Box>
              <Box className="innerPanel">Column 1</Box>
              <Box className="innerPanel">Column 1</Box>
              <Box className="innerPanel">Column 1</Box>
            </Stack>
            <Stack w="33%" className="panel" gap={20}>
              <Group gap={5} mt={-15} mb={-15}>
                <Title order={2} fw={900}>
                  3
                </Title>
                <Title order={6} fw={400}>
                  Tasks In-Progress
                </Title>
              </Group>
              <Box className="innerPanel">Column 2</Box>
              <Box className="innerPanel">Column 2</Box>
              <Box className="innerPanel">Column 2</Box>
            </Stack>
            <Stack w="33%" className="panel" gap={20}>
              <Group gap={5} mt={-15} mb={-15}>
                <Title order={2} fw={900}>
                  4
                </Title>
                <Title order={6} fw={400}>
                  Tasks Ready To Review
                </Title>
              </Group>
              <Box className="innerPanel">Column 3</Box>
              <Box className="innerPanel">Column 3</Box>
              <Box className="innerPanel">Column 3</Box>
              <Box className="innerPanel">Column 3</Box>
            </Stack>
          </Flex>
        </motion.div>
      )}
      {active === 1 && (
        <motion.div {...animation} className={classes.dashPanel}>
          <SubmitTask />
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
