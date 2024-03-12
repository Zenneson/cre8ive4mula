"use client";
import { Box } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import classes from "./styles/clouds.module.css";

export default function Clouds() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const cloudsRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: cloudsRef.current,
          highlightColor: "#0388fc",
          midtoneColor: "#37d4ff",
          lowlightColor: "#124987",
          baseColor: "#cfe8ff",
          blurFactor: 0.6,
          zoom: 1,
          speed: 1.25,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 400.0,
          minWidth: 400.0,
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

// backgroundColor: "#ffffff",
// sunColor: "#ff9919",
// sunGlareColor: "#ff6633",
// sunlightColor: "#ff9933",
// skyColor: "#64aaff",
// cloudColor: "#eaf3fc",
