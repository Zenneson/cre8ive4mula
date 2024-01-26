import { Box } from "@mantine/core";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { WireBall } from "./model/WireBall";
import classes from "./styles/modelScene.module.css";

export default function ModelScene() {
  return (
    <Box pos={"absolute"} top={0} left={0} w={"100%"} h={"100%"}>
      <Canvas className={classes.hashCanvas} camera={[0, 0, 0]}>
        <WireBall />
        <OrbitControls />
        <Environment preset="night" />
      </Canvas>
    </Box>
  );
}
