import { Environment, Gltf, KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctrl from "ecctrl";
import { Perf } from "r3f-perf";

export default function App() {
  // const map = useMemo<KeyboardControlsEntry<string>[]>(
  //   () => [
  //     { name: "forward", keys: ["ArrowUp", "KeyW"] },
  //     { name: "back", keys: ["ArrowDown", "KeyS"] },
  //     { name: "left", keys: ["ArrowLeft", "KeyA"] },
  //     { name: "right", keys: ["ArrowRight", "KeyD"] },
  //     { name: "jump", keys: ["Space"] },
  //     { name: "run", keys: ["Shift"] },
  //   ],
  //   []
  // );
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <Canvas
      shadows
      onPointerDown={(e) => {
        // 型アサーションで requestPointerLock を安全に呼び出す
        if ((e.target as HTMLElement).requestPointerLock) {
          (e.target as HTMLElement).requestPointerLock();
        }
      }}
    >
      <Perf />
      <Environment files="/ecctrl/night.hdr" ground={{ scale: 100 }} />
      <directionalLight
        intensity={0.7}
        castShadow
        shadow-bias={-0.0004}
        position={[-20, 20, 20]}
      >
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
      </directionalLight>
      <ambientLight intensity={0.2} />
      <Physics debug={false} timeStep="vary">
        <KeyboardControls map={keyboardMap}>
          <Ecctrl>
            <Gltf
              castShadow
              receiveShadow
              scale={0.3}
              position={[0, -0.55, 0]}
              src="/ecctrl/ghost_w_tophat-transformed.glb"
            />
          </Ecctrl>
        </KeyboardControls>
        <RigidBody type="fixed" colliders="trimesh">
          <Gltf
            castShadow
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.11}
            src="/ecctrl/fantasy_game_inn2-transformed.glb"
          />
        </RigidBody>
      </Physics>
    </Canvas>
  );
}
