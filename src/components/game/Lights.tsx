import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { DirectionalLight } from "three";

export default function Lights() {
  const light = useRef<DirectionalLight>(null);
  useFrame(({ camera }) => {
    if (!light.current) return;
    light.current.position.z = camera.position.z + 1 - 11;
    light.current.target.position.z = camera.position.z - 11;
    light.current.target.updateMatrixWorld();
  });
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  );
}
