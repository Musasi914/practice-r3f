import { Float, Text, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry();
const floorMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export function BlockStart({
  position = [0, 0, 0],
}: {
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      <Float>
        <Text
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Run
        </Text>
      </Float>
      <mesh
        receiveShadow
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        material={floorMaterial}
      />
    </group>
  );
}

export function BlockSpinner({
  position = [0, 0, 0],
}: {
  position?: [number, number, number];
}) {
  const [timeMultiplier] = useState(
    () => (Math.random() + 0.2) * (Math.random() > 0.5 ? 1 : -1)
  );
  const obstacle = useRef<RapierRigidBody>(null);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (obstacle.current) {
      obstacle.current.setNextKinematicRotation(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, time * timeMultiplier, 0)
        )
      );
    }
  });
  return (
    <group position={position}>
      {/* floor */}
      <mesh
        receiveShadow
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        material={floor2Material}
      />
      {/* obstacle */}
      <RigidBody
        type="kinematicPosition"
        ref={obstacle}
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        />
      </RigidBody>
    </group>
  );
}

export function BlockLimbo({
  position = [0, 0, 0],
}: {
  position?: [number, number, number];
}) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  const obstacle = useRef<RapierRigidBody>(null);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (obstacle.current) {
      obstacle.current.setNextKinematicTranslation({
        x: position[0],
        y: position[1] + Math.sin(time + timeOffset) + 1.15,
        z: position[2],
      });
    }
  });
  return (
    <group position={position}>
      {/* floor */}
      <mesh
        receiveShadow
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        material={floor2Material}
      />
      {/* obstacle */}
      <RigidBody
        type="kinematicPosition"
        ref={obstacle}
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        />
      </RigidBody>
    </group>
  );
}

export function BlockAxe({
  position = [0, 0, 0],
}: {
  position?: [number, number, number];
}) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  const obstacle = useRef<RapierRigidBody>(null);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (obstacle.current) {
      obstacle.current.setNextKinematicTranslation({
        x: position[0] + Math.sin(time + timeOffset) * 1.25,
        y: position[1] + 0.75,
        z: position[2],
      });
    }
  });
  return (
    <group position={position}>
      {/* floor */}
      <mesh
        receiveShadow
        geometry={boxGeometry}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        material={floor2Material}
      />
      {/* obstacle */}
      <RigidBody
        type="kinematicPosition"
        ref={obstacle}
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
        />
      </RigidBody>
    </group>
  );
}

export function BlockEnd({
  position = [0, 0, 0],
}: {
  position?: [number, number, number];
}) {
  const hamburger = useGLTF("models/hamburger.glb");
  hamburger.scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.isMesh) {
      child.castShadow = true;
    }
  });
  return (
    <group position={position}>
      <Text scale={1} position={[0, 2.25, 2]}>
        Finish
      </Text>
      <mesh
        receiveShadow
        geometry={boxGeometry}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        material={floorMaterial}
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        restitution={0.2}
        friction={0}
        position={[0, 0.25, 0]}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}

function Bounds({ length = 2 }: { length?: number }) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <mesh
        position={[2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        castShadow
      />
      <mesh
        position={[-2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        receiveShadow
      />
      <mesh
        position={[0, 0.75, -(length * 4) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[4, 1.5, 0.3]}
        receiveShadow
      />
      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
}

const DEFAULT_TYPES = [BlockSpinner, BlockLimbo, BlockAxe];
export default function Level({
  count = 5,
  types = DEFAULT_TYPES,
  seed = 0,
}: {
  count?: number;
  types?: (typeof BlockSpinner | typeof BlockLimbo | typeof BlockAxe)[];
  seed?: number;
}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [count, types, seed]);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />

      <Bounds length={count + 2} />
    </>
  );
}
