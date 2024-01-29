"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import {
  Button,
  Center,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { useRef } from "react";
import classes from "./styles/submitTask.module.css";

const buttons = [
  {
    svg1: "/img/submit/psd.json",
    svg2: "/img/submit/ai.json",
    text: "Web or Graphic Design",
  },
  {
    svg1: "/img/submit/docx.json",
    svg2: "/img/submit/pdf.json",
    text: "Content Management",
  },
  {
    svg1: "/img/submit/css.json",
    svg2: "/img/submit/js.json",
    text: "Web Development",
  },
];

const MentBtn = ({ svg1, svg2, text }) => {
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
      pt={"lg"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Stack gap={10} justify="center" align="center">
        <Group grow gap={0}>
          <DotLottiePlayer ref={lottieRef1} src={svg1} loop />
          <DotLottiePlayer ref={lottieRef2} src={svg2} loop />
        </Group>
        <Title order={5}>{text}</Title>
      </Stack>
    </Button>
  );
};

const buttonsList = buttons.map((button, i) => (
  <MentBtn key={i} svg1={button.svg1} svg2={button.svg2} text={button.text} />
));

export default function SubmitTask() {
  return (
    <Center h="60%">
      <Stack gap={20}>
        <Divider
          label={"CHOOSE TASK TYPE"}
          labelPosition="left"
          opacity={0.4}
        />
        <SimpleGrid cols={3} spacing={"xl"}>
          {buttonsList}
        </SimpleGrid>
      </Stack>
    </Center>
  );
}
