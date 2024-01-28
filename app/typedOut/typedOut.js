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
        "CRE8IVE 4MULA",
        "CRE8IVE 4MULA = (Diversity of Perspectives + Collaboration) × Openness",
        "CRE8IVE 4MULA = (Curiosity + Experience) × Divergent Thinking × Persistence",
        "CRE8IVE 4MULA = (Self-awareness + Life Experiences) × Adaptability",
        "CRE8IVE 4MULA = (Inspiration + Intuition) × Critical Thinking",
        "CRE8IVE 4MULA = &fnof; (Knowledge, Imagination, Environment, Personality, Motivation)",
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
