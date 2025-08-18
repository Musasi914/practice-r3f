import { Canvas, useFrame } from "@react-three/fiber";
import "./style.css";
import {
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { MathUtils, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { useRef } from "react";
import { EffectComposer, N8AO } from "@react-three/postprocessing";

export default function App() {
  return (
    <div className="container">
      <div className="nav">
        <h1 className="label">LUSION</h1>
      </div>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 100 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

function Scene() {
  return (
    <>
      <OrbitControls />
      <color attach="background" args={["#141622"]} />
      <ambientLight intensity={2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.2}
        penumbra={1}
        intensity={30}
        castShadow
      />
      <Physics debug gravity={[0, 0, 0]}>
        <Pointer />
        {Array.from({ length: 8 }).map((_, i) => (
          <Connector key={i} />
        ))}
      </Physics>
      <EffectComposer enableNormalPass={false} multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>
      <Environment>
        <group>
          <Lightformer
            form="circle"
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
        </group>
      </Environment>
    </>
  );
}

function Connector() {
  const { nodes, materials } = useGLTF("/lusion/c-transformed.glb");
  const ref = useRef<RapierRigidBody>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current?.applyImpulse(
      new Vector3()
        .copy(ref.current.translation())
        .negate()
        .multiplyScalar(0.2),
      true
    );
  });
  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={[
        MathUtils.randFloatSpread(10),
        MathUtils.randFloatSpread(10),
        MathUtils.randFloatSpread(10),
      ]}
      colliders={false}
      ref={ref}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      <mesh
        castShadow
        receiveShadow
        scale={10}
        geometry={(nodes.connector as Mesh).geometry}
      >
        <meshStandardMaterial
          metalness={0.2}
          roughness={0.1}
          map={(materials.base as MeshStandardMaterial).map}
        />
      </mesh>
    </RigidBody>
  );
}

function Pointer() {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      new Vector3(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    );
  });
  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  );
}
