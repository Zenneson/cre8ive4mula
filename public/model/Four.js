"use client";
import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import { MeshPhysicalMaterial } from "three";

export function Four() {
  const { nodes } = useGLTF("/model/four.gltf");

  const meshRef = useRef();
  useLayoutEffect(() => {
    const glassMaterial = new MeshPhysicalMaterial({
      transmission: 0.9, // High transmission for glass-like transparency
      roughness: 0, // Smooth surface for clear glass
      metalness: 0.1, // Slight metalness for a reflective surface
      reflectivity: 1, // High reflectivity for a glass-like look
      clearcoat: 1, // Add a clear coat for extra shininess
    });

    if (meshRef.current) {
      meshRef.current.material = glassMaterial;
    }
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={nodes.FourMesh.geometry}
      position={[0, 0, 0]} // Adjust position as needed
    />
  );
}

useGLTF.preload("/model/four.gltf");
