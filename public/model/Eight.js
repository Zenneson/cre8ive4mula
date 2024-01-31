"use client";
import { OrthographicCamera, useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/model/eight.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["8_remesh"].geometry}
        material={nodes["8_remesh"].material}
      />
      <OrthographicCamera
        makeDefault={false}
        far={10000000000}
        near={0}
        position={[2.419, -1.406, 6.314]}
        rotation={[0.301, 0.331, -0.1]}
      />
    </group>
  );
}

useGLTF.preload("/model/eight.gltf");
