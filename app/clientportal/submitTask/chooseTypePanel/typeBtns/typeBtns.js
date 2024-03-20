"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { Button, ColorSwatch, Group, Stack, Title } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useSubissionData } from "../../../portalStore";
import classes from "./styles/typeBtns.module.css";

const MenuBtn = (props) => {
  const { button, color } = props;
  const { taskType, setTaskType } = useSubissionData();

  const active = taskType === button.text;
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
      h={130}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (active) {
          setTaskType("");
          return;
        }
        setTaskType(button.text);
      }}
    >
      <Stack gap={0} justify="center" align="center" pt={10}>
        <Group pos={"relative"} w={"87%"} gap={5} mb={-10}>
          <ColorSwatch className={classes.typeColor} size={10} color={color} />
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

export default function TypeBtns(props) {
  const { types } = props;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <MenuBtn button={types[0]} color={"#f35424"} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.65 }}
      >
        <MenuBtn button={types[1]} color={"#fc1851"} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <MenuBtn button={types[2]} color={"#ffd941"} />
      </motion.div>
    </>
  );
}
