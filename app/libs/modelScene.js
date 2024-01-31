"use client";
import { Box } from "@mantine/core";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function ModelScene({ children, controls = false }) {
  return (
    <Box pos={"absolute"} top={0} left={0} w={"100%"} h={"100%"}>
      <Canvas
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
        camera={[0, 0, 0]}
      >
        {children}
        {controls && <OrbitControls />}
        <Environment preset="night" />
      </Canvas>
    </Box>
  );
}
