"use client";
import { Box, Center } from "@mantine/core";
import { useEffect, useRef } from "react";
import classes from "./styles/customLoader.module.css";

export default function CustomLoader() {
  const frameRef = useRef();

  useEffect(() => {
    const loaderDelay = () => {
      const loaderContainer = frameRef.current;
      if (loaderContainer) {
        const bars = loaderContainer.children;
        const time = 2 / bars.length;
        let startTime = 0;

        for (let i = 0; i < bars.length; i++) {
          bars[i].style.animationDelay = `${startTime}s`;
          startTime += time;
        }
      }
    };

    loaderDelay();
  }, []);

  return (
    <Center className={`${classes.loaderBg}  ${classes.blueBg}`}>
      <Box ref={frameRef} className={classes.loader}>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </Box>
    </Center>
  );
}
