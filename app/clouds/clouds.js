"use client";
import { Box } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CLOUDS2 from "vanta/dist/vanta.clouds2.min";
import classes from "./styles/clouds.module.css";

export default function Clouds(props) {
  const [vantaEffect, setVantaEffect] = useState(null);
  const cloudsRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS2({
          el: cloudsRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          skyColor: "#47b6ff",
          cloudColor: "#ffffff",
          lightColor: "#47b6ff",
          speed: 1.5,
          texturePath: "/img/noise.png",
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
