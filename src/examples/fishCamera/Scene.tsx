import { useSpring, a } from "@react-spring/three";
import { MeshWobbleMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MathUtils, MeshBasicMaterial, type Mesh } from "three";

export function Level() {
  const { nodes } = useGLTF("/fishCamera/level-react-draco.glb");
  return (
    <mesh
      geometry={(nodes.Level as Mesh).geometry}
      material={(nodes.Level as Mesh).material}
      rotation={nodes.Level.rotation}
      position={nodes.Level.position}
    />
  );
}

export function Sudo() {
  const { nodes } = useGLTF("/fishCamera/level-react-draco.glb");
  const [spring, api] = useSpring(
    () => ({ rotation: [Math.PI / 2, 0, 0.29], config: { friction: 40 } }),
    []
  );
  useEffect(() => {
    const sti = setInterval(() => {
      api.start({
        rotation: [
          Math.PI / 2 + MathUtils.randFloatSpread(0.5),
          0,
          0.29 + MathUtils.randFloatSpread(0.5),
        ],
      });
    }, 1000);

    return () => clearInterval(sti);
  }, []);
  return (
    <>
      <mesh
        geometry={(nodes.Sudo as Mesh).geometry}
        material={(nodes.Sudo as Mesh).material}
        rotation={nodes.Sudo.rotation}
        position={nodes.Sudo.position}
      />
      <a.mesh
        geometry={(nodes.SudoHead as Mesh).geometry}
        material={(nodes.SudoHead as Mesh).material}
        position={nodes.SudoHead.position}
        rotation={spring.rotation as unknown as [number, number, number]}
      />
    </>
  );
}

export function Camera() {
  const { nodes, materials } = useGLTF("/fishCamera/level-react-draco.glb");
  const [spring, api] = useSpring(
    () => ({
      "rotation-z": 0,
      config: { friction: 40, mass: 1 },
    }),
    []
  );
  useEffect(() => {
    const sti = setInterval(() => {
      api.start({ "rotation-z": MathUtils.randFloatSpread(1) });
    }, 1000);

    return () => clearInterval(sti);
  }, []);
  return (
    <a.group
      position={nodes.Camera001.position}
      rotation={nodes.Camera001.rotation}
      {...spring}
    >
      <mesh
        geometry={(nodes.Camera as Mesh).geometry}
        material={(nodes.Camera as Mesh).material}
      />
      <mesh
        geometry={(nodes.Camera_1 as Mesh).geometry}
        material={materials.Lens}
      />
    </a.group>
  );
}

export function Cactus() {
  const { nodes, materials } = useGLTF("/fishCamera/level-react-draco.glb");
  console.log(materials);
  return (
    <mesh
      geometry={(nodes.Cactus as Mesh).geometry}
      material={(nodes.Cactus as Mesh).material}
      position={nodes.Cactus.position}
      rotation={nodes.Cactus.rotation}
    >
      <MeshWobbleMaterial
        factor={0.4}
        map={(materials.Cactus as MeshBasicMaterial).map}
      />
    </mesh>
  );
}

export function Box() {
  const [hovered, hover] = useState(false);

  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[-0.8, 1.4, 0.4]}
      scale={0.15}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? "red" : "blue"} />
    </mesh>
  );
}
