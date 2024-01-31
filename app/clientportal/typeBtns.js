"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { Button, ColorSwatch, Group, Stack, Title } from "@mantine/core";
import { useRef } from "react";
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

export default function TypeBtns() {
  return buttonsList;
}
