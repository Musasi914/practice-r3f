import { Instance, Instances, OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  // BallCollider,
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
  Physics,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Euler, InstancedMesh, Quaternion } from "three";

export default function PhysicsScene() {
  const cube = useRef<RapierRigidBody>(null);
  const twister = useRef<RapierRigidBody>(null);

  const [hitSound] = useState(() => {
    const audio = new Audio("/sound/hit.mp3");
    // 音声を事前に読み込む
    audio.load();
    // 音量を調整
    return audio;
  });

  // 安全な音声再生関数
  const playSound = () => {
    hitSound.currentTime = 0; // 音声を最初から再生
    hitSound.play().catch((error) => {
      console.log("音声再生に失敗しました:", error.message);
    });
  };

  const handleJump = () => {
    if (!cube.current) return;
    const mass = cube.current.mass();
    console.log(mass);
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, true);
    cube.current.applyTorqueImpulse(
      {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5,
      },
      true
    );

    // ユーザーインタラクション時に音声を有効にする
    playSound();
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new Euler(0, time * 3, 0);
    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current?.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle);
    const z = Math.sin(angle);
    twister.current?.setNextKinematicTranslation({ x, y: -1, z });
  });

  const onCollisionEnter = () => {
    console.log("colli");
    // 安全な音声再生関数を使用
    playSound();
  };

  const humburger = useGLTF("models/hamburger.glb");

  const cubeCount = 30;
  const instances = Array.from({ length: cubeCount }, (_, i) => ({
    position: [
      Math.random() * 10 - 5,
      Math.random() * 10 + 2,
      Math.random() * 10 - 5,
    ],
  }));

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.5 * Math.PI} />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5 * Math.PI}
      />
      <Physics debug gravity={[0, -9, 0]}>
        {/* ボール */}
        <RigidBody colliders="ball" position={[-1.5, 2, 0]}>
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* 四角 */}
        <RigidBody
          ref={cube}
          gravityScale={1}
          restitution={0}
          friction={0}
          colliders={false}
          position={[3, 2, 1]}
          scale={1.5}
          onCollisionEnter={onCollisionEnter}
          onCollisionExit={() => console.log("exit")}
          onSleep={() => console.log("sleep")}
          onWake={() => console.log("wake")}
        >
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={1.5} />
          <mesh castShadow onClick={handleJump}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        {/* 床 */}
        <RigidBody type="fixed" friction={0}>
          <mesh receiveShadow position={[0, -1.5, 0]}>
            <boxGeometry args={[10, 1, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        {/* 回転する棒 */}
        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]} position={[0, 1, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody position={[0, 4, 0]} colliders="hull">
          {/* <CylinderCollider args={[0.6, 1.25]} /> */}
          <primitive position-y={-0.7} object={humburger.scene} scale={0.25} />
        </RigidBody>

        <RigidBody type="fixed" restitution={2.5}>
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
        <InstancedRigidBodies instances={instances}>
          <instancedMesh args={[undefined, undefined, cubeCount]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
