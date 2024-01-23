"use client";
import { Box, Center } from "@mantine/core";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import classes from "./styles/typedOut.module.css";

export default function TypedOut() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Cre8ive 4mula",
        "Cre8ive 4mula = ( Diversity of Perspectives + Collaboration ) × Openness",
        "Cre8ive 4mula = ( Curiosity + Experience ) × Divergent Thinking × Persistence",
        "Cre8ive 4mula = ( Self-awareness + Life Experiences ) × Adaptability",
        "Cre8ive 4mula = ( Inspiration + Intuition ) × Critical Thinking",
        "Cre8ive 4mula = &fnof; ( Knowledge, Imagination, Environment, Personality, Motivation )",
      ],
      typeSpeed: 40,
      backDelay: 3500,
      backSpeed: 10,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Center h={"53px"}>
      <Box className={classes.typedPanel}>
        <span ref={el} />
      </Box>
    </Center>
  );
}
