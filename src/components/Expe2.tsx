import {
  Center,
  Instance,
  Instances,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

export default function Expe2() {
  const [matcap] = useMatcapTexture("3E2335_D36A1B_8E4A2E_2842A5");
  const array = Array.from({ length: 100 }, () => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [
      number,
      number,
      number
    ],
  }));
  return (
    <>
      <OrbitControls />
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello world
          <meshMatcapMaterial matcap={matcap} />
        </Text3D>
      </Center>
      <Instances range={100} limit={100}>
        <torusGeometry />
        <meshMatcapMaterial matcap={matcap} />
        {array.map((props, index) => (
          <Material
            key={index}
            position={props.position}
            rotation={props.rotation}
          />
        ))}
      </Instances>
    </>
  );
}

function Material({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t;
    ref.current.rotation.y = t;
  });
  return (
    <group position={position} rotation={rotation}>
      <Instance scale={0.5} ref={ref} />
    </group>
  );
}
