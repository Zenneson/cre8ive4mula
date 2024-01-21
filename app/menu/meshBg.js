"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function MeshBg() {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Return view, these are regular Three.js elements expressed in JSX
  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
