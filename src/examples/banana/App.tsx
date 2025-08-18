import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
// https://github.com/pmndrs/drei
import {
  useGLTF,
  Detailed,
  Environment,
} from "@react-three/drei";
// https://github.com/pmndrs/react-postprocessing
// https://github.com/vanruesc/postprocessing
import {
  EffectComposer,
  DepthOfField,
  ToneMapping,
} from "@react-three/postprocessing";
import { Perf } from "r3f-perf";
import { ToneMappingMode } from "postprocessing";

export default function App({
  speed = 1,
  count = 80,
  depth = 80,
  easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}) {
  return (
    // No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
    // As of three > r154 if postprocessing is used the canvas can not have tonemapping (which is what "flat" is, no tonemapping)
    <Canvas
      flat
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}
    >
      <Perf />
      <spotLight
        position={[10, 20, 10]}
        penumbra={1}
        decay={0}
        intensity={3}
        color="orange"
      />
      <color attach="background" args={["#ffbf40"]} />
      {Array.from({ length: count }, (_, i) => (
        <Banana
          key={i}
          index={i}
          z={Math.round(easing(i / count) * depth)}
          speed={speed}
        />
      ))}
      <Environment preset="sunset" />
      <EffectComposer multisampling={0}>
        <DepthOfField
          target={[0, 0, 60]}
          focalLength={0.4}
          bokehScale={14}
          height={700}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}

function Banana({
  index,
  z,
  speed,
}: {
  index: number;
  z: number;
  speed: number;
}) {
  const { nodes, materials } = useGLTF("/banana/banana-v1-transformed.glb");

  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);

  const lodRef = useRef<THREE.LOD>(null);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height * 2),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });
  useFrame((state, delta) => {
    if (!lodRef.current) return;
    if (delta < 0.1) {
      lodRef.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y += delta * speed),
        -z
      );
    }
    lodRef.current.rotation.set(
      (data.rX += delta / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += delta / data.spin)
    );
    if (data.y > height * (index === 0 ? 4 : 1))
      data.y = -(height * (index === 0 ? 4 : 1));
  });

  // refの型エラーを修正するため、useRefの型をLODに変更します

  return (
    <Detailed ref={lodRef} distances={[0, 65, 80]}>
      <mesh
        geometry={(nodes.banana_high as THREE.Mesh).geometry}
        material={materials.skin}
      />
      <mesh
        geometry={(nodes.banana_mid as THREE.Mesh).geometry}
        material={materials.skin}
      />
      <mesh
        geometry={(nodes.banana_low as THREE.Mesh).geometry}
        material={materials.skin}
      />
    </Detailed>
  );
}
