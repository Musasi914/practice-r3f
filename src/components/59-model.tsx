import { OrbitControls } from "@react-three/drei";
import Humburger from "./molecules/Humburger";
import { Suspense } from "react";
import Fox from "./molecules/Fox";

export default function ModelScene() {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight position={[1, 2, 3]} intensity={4} castShadow shadow-bias={-0.001} />

      <mesh position-y={-1.5} scale={10} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Suspense fallback={null}>
        <Humburger scale={0.35} />
      </Suspense>
      <Suspense fallback={null}>
        <Fox />
      </Suspense>
    </>
  );
}
