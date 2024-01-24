import { Box } from "@mantine/core";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { MeshPhysicalMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import classes from "./styles/hashBg.module.css";

const GlassModel = () => {
  const gltf = useLoader(GLTFLoader, "/model/spiral.glb");
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

  return <primitive ref={modelRef} object={gltf.scene} position={[-3, 2, 1]} />;
};

const GlassBulb = () => {
  const gltf = useLoader(GLTFLoader, "/model/bulb.glb");
  const bulbRef = useRef();

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshPhysicalMaterial({
        transmission: 0.9,
        roughness: 0.1,
        reflectivity: 0.5,
        clearcoat: 1.0,
      });
    }
  });

  useFrame(() => {
    bulbRef.current.rotation.y += 0.01;
  });

  return <primitive ref={bulbRef} object={gltf.scene} position={[1, 1, -5]} />;
};

export default function HashBg() {
  return (
    <Box pos={"absolute"} top={0} left={0} w={"100%"} h={"100%"}>
      <Canvas className={classes.hashCanvas} camera={[0, 0, 0]}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <GlassModel />
        <GlassBulb />
        <OrbitControls />
        <Environment preset="night" />
      </Canvas>
    </Box>
  );
}
