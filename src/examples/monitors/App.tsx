import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model, { Computers, Instances } from "./Model";
import { Perf } from "r3f-perf";

export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
    >
      <Perf />
      <OrbitControls />
      <color attach="background" args={["black"]} />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        decay={0}
        position={[10, 20, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <ambientLight intensity={2} />
      <group position={[0, -1, 0]}>
        <Instances>
          <Computers />
        </Instances>
      </group>
    </Canvas>
  );
}
