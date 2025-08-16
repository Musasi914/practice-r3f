import { Bvh, Sky } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Scene from "./Scene";
import {
  EffectComposer,
  N8AO,
  Outline,
  Selection,
  TiltShift2,
  ToneMapping,
} from "@react-three/postprocessing";
import { easing } from "maath";

export default function App() {
  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 1, 6], fov: 25, near: 1, far: 20 }}
    >
      <ambientLight intensity={4} />
      <Sky />

      <Bvh firstHitOnly>
        <Selection>
          <Scene rotation={[0, Math.PI / 2, 0]} position={[0, -1, 0]} />

          <Effects />
        </Selection>
      </Bvh>
    </Canvas>
  );
}

function Effects() {
  const { size } = useThree();
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        state.pointer.x,
        1 + state.pointer.y / 2,
        8 + Math.atan(state.pointer.x * 2),
      ],
      0.3,
      delta
    );
    state.camera.lookAt(state.camera.position.x * 0.9, 0, -4);
  });
  return (
    <EffectComposer stencilBuffer autoClear={false} multisampling={4}>
      <Outline
        visibleEdgeColor={0xffffff}
        hiddenEdgeColor={0xffffff}
        blur
        width={size.width * 1.25}
        edgeStrength={10}
      />
      <N8AO
        halfRes
        aoSamples={5}
        aoRadius={0.4}
        distanceFalloff={0.75}
        intensity={1}
      />
      <TiltShift2 samples={5} blur={0.1} />
      <ToneMapping mode={0.5} />
    </EffectComposer>
  );
}
