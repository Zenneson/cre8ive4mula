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
        "( Diversity of Perspectives + Collaboration ) × Openness",
        "( Curiosity + Experience ) × Divergent Thinking × Persistence",
        "( Self-awareness + Life Experiences ) × Adaptability",
        "( Inspiration + Intuition ) × Critical Thinking",
        "&fnof; ( Knowledge, Imagination, Environment, Personality, Motivation )",
      ],
      typeSpeed: 40,
      backDelay: 5000,
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
