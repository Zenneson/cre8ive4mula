"use client";
import { Box, Center } from "@mantine/core";
import { useEffect, useRef } from "react";
import classes from "./styles/customLoader.module.css";

export default function CustomLoader(props) {
  const { mode = false } = props;
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
    <Center
      className={`${classes.loaderBg}  ${mode === "default" && classes.blueBg}`}
    >
      <Box ref={frameRef} className={classes.loader}>
        {mode === "imgGen" ? (
          <>
            <span>C</span>
            <span>R</span>
            <span>E</span>
            <span>8</span>
          </>
        ) : (
          <>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
          </>
        )}
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </Box>
    </Center>
  );
}
