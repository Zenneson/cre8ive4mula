"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { Button, ColorSwatch, Group, Stack, Title } from "@mantine/core";
import { useDidUpdate, useSessionStorage } from "@mantine/hooks";
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

const typeDef = {
  Design:
    "Design services encompass all aspects of graphic and web design. This includes the creation of visual elements, website layout design, and other design-related tasks, ensuring a cohesive and aesthetically pleasing visual identity.",
  Content:
    "Content services involve SEO, editing, and management of digital content. The focus is on optimizing content for search engines, refining the clarity and effectiveness of the text, and managing content to align with strategic goals.",
  "Web Dev":
    "Web Development services cover the addition of new features, maintenance, and overall management of websites. This includes ensuring website functionality, responsiveness, and security, as well as implementing updates and improvements.",
};

const MentBtn = ({ button }) => {
  const [choosenType, setChoosenType] = useSessionStorage({
    key: "submitData",
    defaultValue: null,
  });

  const active = choosenType && choosenType.title === button.text;
  const lottieRef1 = useRef();
  const lottieRef2 = useRef();

  const handleMouseEnter = () => {
    lottieRef1.current.play();
    lottieRef2.current.play();
  };

  const handleMouseLeave = () => {
    if (active) return;
    lottieRef1.current.stop();
    lottieRef2.current.stop();
  };

  const selectType = (buttonText) => {
    const desc = typeDef[buttonText];
    if (desc) {
      setChoosenType({ title: buttonText, desc });
    } else {
      console.log("No matching type found");
    }
  };

  useDidUpdate(() => {
    if (!active) {
      lottieRef1.current.stop();
      lottieRef2.current.stop();
    }
  }, [active]);

  return (
    <Button
      className={`${classes.submitType} ${active && classes.buttonActive}`}
      p={5}
      pt={15}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => selectType(button.text)}
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
