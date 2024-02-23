"use client";
import { Box } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import classes from "./styles/clouds.module.css";

export default function Clouds() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const cloudsRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: cloudsRef.current,
          backgroundColor: "#ffffff",
          sunColor: "#ff9919",
          sunGlareColor: "#ff6633",
          sunlightColor: "#ff9933",
          skyColor: "#8fcef8",
          cloudColor: "#d8ebff",
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
