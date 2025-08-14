import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export default function MouseScene() {
  const cube = useRef<Mesh>(null);
  useFrame(() => {
    cube.current.rotation.y += 0.01;
  });

  const eventHandler = (event) => {
    console.log(event);
    cube.current?.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`);
  };

  const gltf = useGLTF("/models/hamburger.glb");

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1} />
      <OrbitControls />
      <primitive
        object={gltf.scene}
        scale={0.25}
        position-y={1}
        onClick={(e) => {
          e.stopPropagation();
          console.log(e.object);
        }}
      />
      <mesh
        ref={cube}
        position={[2, 0, 0]}
        scale={1.5}
        onContextMenu={eventHandler}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh
        position={[-2, 0, 0]}
        onContextMenu={(e) => e.stopPropagation()}
        onPointerEnter={(e) => {
          e.stopPropagation();
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh position={[0, -1.5, 0]} scale={10} rotation-x={-Math.PI / 2}>
        <planeGeometry />
        <meshStandardMaterial color="lightgreen" />
      </mesh>
    </>
  );
}
