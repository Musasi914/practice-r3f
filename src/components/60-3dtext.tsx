import {
  Center,
  Instance,
  Instances,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh } from "three";
import { useControls } from "leva";

export default function Text3DScene() {
  const [matcap] = useMatcapTexture("27222B_677491_484F6A_5D657A");
  const instancesRef = useRef<InstancedMesh>(null);

  const instanceData = useMemo(() => {
    return Array.from({ length: 100 }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      scale: Math.random() * 0.2 + 0.2,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [
        number,
        number,
        number
      ],
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
      },
    }));
  }, []);

  useFrame(() => {
    if (instancesRef.current) {
      instancesRef.current.children.forEach((child, index) => {
        const data = instanceData[index];
        if (data) {
          child.rotation.x += data.rotationSpeed.x;
          child.rotation.y += data.rotationSpeed.y;
        }
      });
    }
  });
  return (
    <>
      <OrbitControls />
      <Center>
        <Text3D
          font="fonts/helvetiker_regular.typeface.json"
          size={1}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.022}
          bevelOffset={0}
        >
          Hello World
          <meshMatcapMaterial matcap={matcap} />
        </Text3D>
      </Center>

      <Instances limit={100} ref={instancesRef}>
        <torusGeometry />
        <meshMatcapMaterial matcap={matcap} />
        {instanceData.map((data, i) => (
          <Instance
            key={i}
            position={data.position}
            scale={data.scale}
            rotation={data.rotation}
          />
        ))}
      </Instances>
    </>
  );
}
