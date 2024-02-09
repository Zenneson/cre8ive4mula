"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { tourTheme } from "@libs/tourTheme";
import { Button, ColorSwatch, Group, Stack, Title } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useSubissionData } from "../portalStore";
import classes from "./styles/typeBtns.module.css";

const buttons = [
  {
    text: "Design",
    color: tourTheme.colors.deeporange[5],
    svg1: "/img/submit/psd.json",
    svg2: "/img/submit/ai.json",
  },
  {
    text: "Content",
    color: tourTheme.colors.deepred[6],
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
  const { formData, setFormData } = useSubissionData();

  const active = formData.type && formData.type.title === button.text;
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
    if (formData.type?.title === buttonText) {
      setFormData({ type: {} });
      return;
    }
    if (desc) {
      setFormData({ type: { title: buttonText, desc } });
    }
  };

  useDidUpdate(() => {
    if (!lottieRef1.current || !lottieRef2.current) return;
    if (!active) {
      lottieRef1.current.stop();
      lottieRef2.current.stop();
    }
  }, [active]);

  return (
    <Button
      className={`${classes.submitType} ${active && classes.buttonActive}`}
      p={0}
      pt={15}
      mt={5}
      w={182}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => selectType(button.text)}
    >
      <Stack gap={0} justify="center" align="center">
        <Group pos={"relative"} w={"87%"} gap={5} mb={-10}>
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

const buttonsList = buttons.map((button, i) => {
  const animation = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 1, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { duration: 1, delay: 0.5 + i * 0.1 },
  };

  return (
    <motion.div key={i} {...animation}>
      <MentBtn index={i} button={button} />
    </motion.div>
  );
});

export default function TypeBtns() {
  return buttonsList;
}
