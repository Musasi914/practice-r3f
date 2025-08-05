import { Float, Html, MeshReflectorMaterial, OrbitControls, PivotControls, Text, TransformControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export default function Experience() {
  // 回転のため, TransformControlsのため
  const cubeRef = useRef<Mesh>(null);

  const sphereRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <OrbitControls makeDefault />
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <group>
        <PivotControls anchor={[0, 0, 0]} depthTest={false}>
          <mesh ref={sphereRef} position-x={-3}>
            <sphereGeometry />
            <meshStandardMaterial color="red" />
            <Html position={[1, 1, 0]} wrapperClass="label" center distanceFactor={10} occlude={[sphereRef, cubeRef]}>
              This is a sphere
            </Html>
          </mesh>
        </PivotControls>
        <TransformControls position-x={3} mode="translate">
          <mesh ref={cubeRef} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="pink" />
          </mesh>
        </TransformControls>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI / 2} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={0.75} color="greenyellow" />
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text color="salmon" position-y={2} fontSize={0.5} fontWeight={700} textAlign="center">
          Hello World
        </Text>
      </Float>
    </>
  );
}
