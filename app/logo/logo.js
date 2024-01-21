"use client";
import { Box, Center } from "@mantine/core";
import classes from "./styles/logo.module.css";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
};

export default function Logo() {
  return (
    <Center w={"100vw"} h={"100vh"} className={classes.logoCenterFramer}>
      <Box className={classes.logoFrame}></Box>
    </Center>
  );
}
