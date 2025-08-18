import { Canvas, useFrame } from "@react-three/fiber";
import { useStore } from "./store";
import {
  AccumulativeShadows,
  Center,
  Decal,
  RandomizedLight,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { easing } from "maath";
import { useRef } from "react";

export default function R3fCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 2.5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      eventPrefix="client"
      eventSource={document.getElementById("root")!}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[1, 1, 1]} intensity={1} />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
}

function Backdrop() {
  const shadows = useRef<any>(null);
  useFrame((state, delta) => {
    if (shadows.current) {
      easing.dampC(
        shadows.current.getMesh().material.color,
        undefined,
        0.25,
        delta
      );
    }
  });
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
      resolution={2048}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55 * Math.PI}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25 * Math.PI}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }: { children: React.ReactNode }) {
  const intro = useStore((state) => state.intro);
  const groupRef = useRef<Group>(null);
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [intro ? -state.viewport.width / 4 : 0, 0, 2],
      0.25,
      delta
    );
    if (groupRef.current) {
      easing.dampE(
        groupRef.current?.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });
  return <group ref={groupRef}>{children}</group>;
}

function Shirt() {
  const decal = useStore((state) => state.decal);
  const texture = useTexture(`/t-shirt/${decal}.png`);
  const { nodes, materials } = useGLTF("/t-shirt/shirt_baked_collapsed.glb");
  const color = useStore((state) => state.color);
  useFrame((_, delta) => {
    easing.dampC(
      (materials.lambert1 as MeshStandardMaterial).color,
      color,
      0.25,
      delta
    );
  });
  return (
    <mesh
      castShadow
      geometry={(nodes.T_Shirt_male as Mesh).geometry}
      material={materials.lambert1}
      dispose={null}
    >
      <Decal
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.15}
        map={texture}
      />
    </mesh>
  );
}
useGLTF.preload("/t-shirt/shirt_baked_collapsed.glb");
["/t-shirt/react.png", "/t-shirt/three2.png", "/t-shirt/pmndrs.png"].forEach(
  useTexture.preload
);
