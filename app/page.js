"use client";
import { ActionIcon, Box, Center, Stack } from "@mantine/core";
import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import HomeStepper from "./homeStepper/homeStepper";
import Logo from "./logo/logo";
import classes from "./page.module.css";
import TypedOut from "./typedOut/typedOut";

export default function Home() {
  const [isUp, setIsUp] = useState(false);

  return (
    <Box
      className={classes.centerFrame}
      w={"100vw"}
      h={"200vh"}
      pos={"fixed"}
      top={isUp ? "-100vh" : "0px"}
    >
      <Center w={"100vw"} h={"100vh"} pos={"relative"}>
        <Stack direction={"column"} w={"100%"} align="center" spacing={"lg"}>
          <Logo />
          <TypedOut />
        </Stack>
        <Center
          w={"100%"}
          pos={"absolute"}
          bottom={0}
          left={0}
          onClick={() => setIsUp(true)}
        >
          <GoTriangleDown className={classes.learnMore} size={80} />
        </Center>
      </Center>
      <Center w={"100vw"} h={"100vh"} pos={"relative"}>
        <HomeStepper />
        <ActionIcon
          className={classes.upArrow}
          variant="transparent"
          c={"#fff"}
          onClick={() => setIsUp(false)}
        >
          <FaArrowAltCircleUp />
        </ActionIcon>
      </Center>
    </Box>
  );
}
