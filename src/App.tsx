import { Canvas } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import Game from "./components/game/Game";
import { KeyboardControls } from "@react-three/drei";
import { useState } from "react";
import Interface from "./components/game/Interface";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <KeyboardControls
        map={[
          { name: "moveForward", keys: ["ArrowUp", "KeyW"] },
          { name: "moveBackward", keys: ["ArrowDown", "KeyS"] },
          { name: "moveLeft", keys: ["ArrowLeft", "KeyA"] },
          { name: "moveRight", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          className="r3f"
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6],
          }}
        >
          {/* <Perf position="top-left" /> */}
          <Game />
        </Canvas>
        <Interface />
      </KeyboardControls>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ position: "absolute", bottom: 0, left: 0 }}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>
    </>
  );
}

export default App;
