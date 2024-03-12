"use client";
import ModelScene from "@libs/modelScene";
import {
  Affix,
  Button,
  Center,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import Logo from "../logo/logo";
import TypedOut from "../typedOut/typedOut";
import classes from "./styles/intro.module.css";

export default function Intro() {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const PanelSwitch = () => {
    return (
      <Group justify="center" w={"100%"} pos={"fixed"} left={0} bottom="10px">
        <Image
          className={classes.leftArrow}
          onClick={prevStep}
          src={"/img/left.svg"}
          w={active !== 0 ? 40 : 0}
          alt="Left Arrow"
        />
        <Image
          className={classes.leftArrow}
          onClick={() => setActive(0)}
          src={"/img/return.svg"}
          w={active === 5 ? 40 : 0}
          alt="Return Arrow"
        />
        <Image
          className={classes.rightArrow}
          onClick={nextStep}
          src={"/img/right.svg"}
          w={active !== 5 ? 40 : 0}
          ml={active === 0 ? -20 : 0}
          alt="Right Arrow"
        />
      </Group>
    );
  };

  const LoginBtn = () => {
    return (
      <Button
        className={classes.loginBtn}
        component={Link}
        href={"/login"}
        w={130}
        h={36}
        leftSection={
          <Image
            className={classes.loginBtnImg}
            src={"/img/login.svg"}
            alt={"Login"}
          />
        }
      >
        <Text className={classes.loginBtnText}>Login</Text>
      </Button>
    );
  };

  const leftFunc = () => {
    switch (active) {
      case 0:
        return "0px";
      case 1:
        return "-100vw";
      case 2:
        return "-200vw";
      case 3:
        return "-300vw";
      case 4:
        return "-400vw";
      case 5:
        return "-500vw";
      default:
        return "0px";
    }
  };

  return (
    <>
      <Affix position={{ top: 20, left: 20 }}>
        <Link href="/clientportal">
          <Text c={"#000"}>Client Portal</Text>
        </Link>
      </Affix>
      <Affix position={{ top: 40, left: 20 }}>
        <Link href="/signup">
          <Text c={"#000"}>Sign Up</Text>
        </Link>
      </Affix>
      <Group
        className={classes.centerFrame}
        pos={"fixed"}
        w={"600vw"}
        h={"100vh"}
        gap={"0px"}
        left={leftFunc()}
      >
        <LoginBtn />
        <Center id="0" w={"100vw"} h={"100vh"} pos={"relative"}>
          <Stack direction={"column"} w={"100%"} align="center">
            <Logo />
            <TypedOut />
            {/* <Box w={"25%"} h={300} mb={50} bg={"rgba(255, 255, 255, 1)"} /> */}
          </Stack>
        </Center>
        <Center id="1" w={"100vw"} h={"100vh"} pos={"relative"}>
          <Button className={classes.blank} component={Link} href="/signup">
            Map Panel&apos;s Content Out
          </Button>
          <ModelScene />
        </Center>
        <Center id="2" w={"100vw"} h={"100vh"} pos={"relative"}>
          <Text>Services Breakdown</Text>
        </Center>
        <Center id="3" w={"100vw"} h={"100vh"} pos={"relative"}>
          <Text>Portfolio</Text>
        </Center>
        <Center id="4" w={"100vw"} h={"100vh"} pos={"relative"}>
          <Text>Price and Plans Breakdown</Text>
        </Center>
        <Center id="5" w={"100vw"} h={"100vh"} pos={"relative"}>
          <Text>Contact Info and CTA</Text>
        </Center>
        <PanelSwitch />
      </Group>
    </>
  );
}
