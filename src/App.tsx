import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Text3DScene from "./components/60-3dtext";

function App() {
  return (
    <>
      <Canvas shadows={true} camera={{ fov: 75, near: 0.1, far: 100, position: [3, 2, 6] }}>
        <Perf position="top-left" />
        <Text3DScene />
      </Canvas>
    </>
  );
}

export default App;
