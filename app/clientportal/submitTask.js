"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import {
  Button,
  Center,
  ColorSwatch,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRef, useState } from "react";
import classes from "./styles/submitTask.module.css";

const buttons = [
  {
    text: "Design",
    color: "#ea5335",
    svg1: "/img/submit/psd.json",
    svg2: "/img/submit/ai.json",
  },
  {
    text: "Content",
    color: "#f80800",
    svg1: "/img/submit/docx.json",
    svg2: "/img/submit/pdf.json",
  },
  {
    text: "Web Dev",
    color: "#ffd941",
    svg1: "/img/submit/css.json",
    svg2: "/img/submit/js.json",
  },
];

const MentBtn = ({ button }) => {
  const lottieRef1 = useRef();
  const lottieRef2 = useRef();

  const handleMouseEnter = () => {
    lottieRef1.current.play();
    lottieRef2.current.play();
  };

  const handleMouseLeave = () => {
    lottieRef1.current.stop();
    lottieRef2.current.stop();
  };

  return (
    <Button
      className={classes.submitType}
      p={5}
      pt={15}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Stack gap={0} justify="center" align="center">
        <Group w={"87%"} gap={5} mb={-20}>
          <ColorSwatch
            className={classes.typeColor}
            size={10}
            color={button.color}
          />
          <Title order={5} ta={"left"}>
            {button.text}
          </Title>
        </Group>
        <Group grow gap={0}>
          <DotLottiePlayer ref={lottieRef1} src={button.svg1} loop />
          <DotLottiePlayer ref={lottieRef2} src={button.svg2} loop />
        </Group>
      </Stack>
    </Button>
  );
};

const buttonsList = buttons.map((button, i) => (
  <MentBtn key={i} button={button} />
));

export default function SubmitTask() {
  const [activePage, setActivePage] = useState(0);

  console.log("🚀 ~ SubmitTask ~ activePage:", activePage);

  const submitPage = () => {
    switch (activePage) {
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
    <Group
      className={classes.centerFrame}
      pos={"fixed"}
      top={0}
      left={submitPage()}
      w={"600vw"}
      gap={"0px"}
    >
      <Button.Group className={classes.nextPrev}>
        <Button
          onClick={() =>
            setActivePage((current) => (current > 0 ? current - 1 : current))
          }
        >
          Prev
        </Button>
        <Button
          onClick={() =>
            setActivePage((current) => (current < 5 ? current + 1 : current))
          }
        >
          Next
        </Button>
      </Button.Group>

      <Center id="0" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <Stack pt={200} gap={5}>
          <Group className={classes.chooseTypeTitle} gap="7">
            <Image
              src={"/img/task.svg"}
              alt={"Task Type"}
              height={30}
              opacity={0.5}
            />
            <Title order={4}>Task Type:</Title>
          </Group>
          <SimpleGrid cols={3} spacing={"xl"}>
            {buttonsList}
          </SimpleGrid>
        </Stack>
      </Center>
      <Center id="1" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <Text>Task Details</Text>
      </Center>
      <Center id="2" w={"calc(100vw - 110px)"} pos={"relative"} ml={"110px"}>
        <Text>Review Details</Text>
      </Center>
    </Group>
  );
}
