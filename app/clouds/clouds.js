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
          sunGlareColor: "#0388fc",
          sunlightColor: "#00b0ff",
          skyColor: "#6aa4e7",
          cloudColor: "#cfe8ff",
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 400.0,
          minWidth: 400.0,
          texturePath: "/img/noise.png",
          THREE: THREE,
          speed: 1.5,
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

// backgroundColor: "#ffffff",
// sunColor: "#ff9919",
// sunGlareColor: "#ff6633",
// sunlightColor: "#ff9933",
// skyColor: "#64aaff",
// cloudColor: "#eaf3fc",
