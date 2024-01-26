import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function WireBall(props) {
  const { nodes, materials } = useGLTF("/model/wireBall.glb");
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={1000}
        near={1}
        fov={45}
        position={[0, 0, 0]}
      />
      <ambientLight intensity={1} />
      <pointLight position={[4, 4, 4]} intensity={1} />
      <pointLight position={[-4, -4, -4]} intensity={1} />
      <mesh
        ref={meshRef}
        geometry={nodes.Icosphere.geometry}
        material={materials["Material.008"]}
        rotation={[0, 0, 0]}
        scale={2}
      >
        <meshStandardMaterial
          attach="material"
          metalness={0.5}
          roughness={0}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/model/wireBall.glb");
