import { Box } from "@mantine/core";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { MeshPhysicalMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { WireBall } from "./model/WireBall";
import classes from "./styles/modelScene.module.css";

const GlassModel = () => {
  const gltf = useLoader(GLTFLoader, "/model/wireBall.glb");
  const modelRef = useRef();

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshPhysicalMaterial({
        transmission: 0.99,
        roughness: 0,
        reflectivity: 1,
        metalness: 0.5,
      });
    }
  });

  useFrame(() => {
    modelRef.current.rotation.y += 0.003;
    modelRef.current.rotation.x += 0.003;
  });

  return (
    <primitive ref={modelRef} object={gltf.scene} position={[2.5, 1.7, 1]} />
  );
};

export default function ModelScene() {
  return (
    <Box pos={"absolute"} top={0} left={0} w={"100%"} h={"100%"}>
      <Canvas className={classes.hashCanvas} camera={[0, 0, 0]}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <GlassModel />
        <WireBall />
        <OrbitControls />
        <Environment preset="night" />
      </Canvas>
    </Box>
  );
}
