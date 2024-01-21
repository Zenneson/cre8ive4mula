"use client";
import { animated, useTransition } from "@react-spring/three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import classes from "./styles/numbersBg.module.css";

const models = [
  "/3d/4.glb",
  "/3d/8.glb",
  "/3d/divide.glb",
  "/3d/alert.glb",
  "/3d/and.glb",
  "/3d/at.glb",
];

const RandomModel = ({ path, position }) => {
  const gltf = useLoader(GLTFLoader, path);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={ref} object={gltf.scene} position={position} />;
};

const randomPosition = () => [
  (Math.random() - 0.5) * 5,
  (Math.random() - 0.5) * 5,
  1,
];

const modelsWithPositions = models.map((model) => ({
  path: model,
  position: randomPosition(),
}));

const Scene = () => {
  const [index, setIndex] = useState(0);
  const currentItem = modelsWithPositions[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % modelsWithPositions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const transitions = useTransition(currentItem, {
    key: (item) => item.path, // Unique key for each item
    from: { position: [1, 1, -100] }, // Starting position
    enter: { position: [1, 1, 100] }, // Enter position
    leave: { position: [1, 1, 100] }, // Leaving position
    config: { duration: 30000 },
  });

  return transitions((props, item) => (
    <animated.group position={props.position}>
      <RandomModel path={item.path} position={item.position} />
    </animated.group>
  ));
};

export default function NumbersBg() {
  return (
    <Canvas className={classes.bgCanvas}>
      <ambientLight
        castShadow={true}
        intensity={0.15}
        position={[-10, 10, 10]}
      />
      <pointLight castShadow={true} power={10} position={[-10, -10, 10]} />
      <spotLight
        castShadow={true}
        intensity={1}
        position={[0, 0, -50]}
        angle={0.15}
        penumbra={1}
        power={10}
      />
      <directionalLight castShadow={true} intensity={1} />
      <Scene />
    </Canvas>
  );
}
