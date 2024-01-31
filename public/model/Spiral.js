"use client";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MeshPhysicalMaterial } from "three";

export function Spiral(props) {
  const group = useRef();
  const { nodes } = useGLTF("/model/spiral.glb");

  const glassMaterial = new MeshPhysicalMaterial({
    transmission: 0, // Adjust for glass-like transparency
    roughness: 0, // Smooth surface for clear glass
    metalness: 0.25,
  });

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01; // Adjust rotation speed here
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="__root__">
          <mesh
            name="0053"
            geometry={nodes["0053"].geometry}
            material={glassMaterial}
            position={[0, 0, 0]}
            scale={1}
          />
        </group>
        <group name="IS-hemispheric-light" />
        <PerspectiveCamera
          name="IS-camera"
          makeDefault={false}
          far={10000}
          near={1}
          fov={45.837}
          position={[-7.926, 2, -1.089]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/model/spiral.glb");
