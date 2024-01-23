"use client";
import { Box, Center, Image, Stack } from "@mantine/core";
import { useState } from "react";
import HomeStepper from "./homeStepper/homeStepper";
import Logo from "./logo/logo";
import classes from "./page.module.css";
import TypedOut from "./typedOut/typedOut";

export default function Home() {
  const [isUp, setIsUp] = useState(false);
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const PanelSwitch = () => {
    return (
      <Stack
        align="center"
        justify="center"
        w={"100%"}
        pos={"fixed"}
        bottom="10px"
      >
        <Image
          className={classes.upArrow}
          onClick={() => {
            isUp && active !== 0 ? prevStep() : setIsUp(false);
          }}
          src={"/img/upArrow.svg"}
          w={isUp ? "40px" : "0px"}
          alt="up arrow"
        />
        <Image
          className={`${classes.downArrow} ${
            active === 4 && classes.disabledArrow
          }`}
          onClick={() => {
            isUp ? nextStep() : setIsUp(true);
          }}
          src={"/img/downArrow.svg"}
          w={"40px"}
          alt="down arrow"
        />
      </Stack>
    );
  };

  return (
    <Box
      className={classes.centerFrame}
      w={"100vw"}
      h={"200vh"}
      pos={"fixed"}
      top={isUp ? "-100vh" : "0px"}
    >
      <Center w={"100vw"} h={"100vh"} pos={"relative"}>
        <Stack direction={"column"} w={"100%"} align="center">
          <Logo />
          <TypedOut />
        </Stack>
      </Center>
      <Center w={"100vw"} h={"100vh"} pos={"relative"}>
        <HomeStepper active={active} setActive={setActive} />
      </Center>
      <PanelSwitch />
    </Box>
  );
}
