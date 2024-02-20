"use client";
import { Box } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CLOUDS2 from "vanta/dist/vanta.clouds2.min";
import classes from "./styles/clouds.module.css";

export default function Clouds() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const cloudsRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS2({
          el: cloudsRef.current,
          skyColor: "#47b6ff",
          cloudColor: "#ffffff",
          lightColor: "#47b6ff",
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          speed: 1,
          texturePath: "/img/noise.png",
          THREE: THREE,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <Box ref={cloudsRef} className={classes.clouds} w={"100%"} h={"100%"} />
  );
}
