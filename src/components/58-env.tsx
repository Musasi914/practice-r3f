import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { DirectionalLightHelper, DoubleSide, Mesh, type DirectionalLight } from "three";

export default function EnvMesh() {
  // const directionalLight = useRef<DirectionalLight>(null);
  const box = useRef<Mesh>(null);
  // useHelper(directionalLight, DirectionalLightHelper, 1);
  useFrame(({ clock }) => {
    if (box.current) {
      box.current.rotation.y += 0.01;
      // box.current.position.y = 1.5 + Math.sin(clock.elapsedTime);
    }
  });

  const { environmentIntensity } = useControls({
    environmentIntensity: {
      value: 1,
      min: 0,
      max: 10,
    },
  });

  const scene = useThree((state) => state.scene);
  useEffect(() => {
    scene.environmentIntensity = environmentIntensity;
  }, [environmentIntensity]);
  return (
    <>
      <Environment background preset="sunset" ground={{ height: 5, radius: 60, scale: 16 }} />
      {/* <color args={["#000000"]} attach="background" /> */}
      {/* <Lightformer position-z={-5} scale={10} color="red" intensity={10} /> */}
      {/* <BakeShadows /> */}
      {/* <SoftShadows /> */}
      {/* <color attach="background" args={["ivory"]} /> */}
      <OrbitControls />
      {/* <ambientLight intensity={1.5} /> */}
      {/* <AccumulativeShadows position={[0, -0.99, 0]} scale={10} frames={Infinity} temporal opacity={0.5} blend={100}>
        <RandomizedLight position={[1, 2, 3]} amount={8} radius={1} ambient={0.5} intensity={4} bias={0.001} />
      </AccumulativeShadows> */}
      {/* <ContactShadows position={[0, -0.99, 0]} resolution={512} far={5} blur={2} /> */}
      {/* <directionalLight
        // ref={directionalLight}
        castShadow
        position={[1, 2, 3]}
        intensity={3}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6}
        shadow-camera-right={6}
      /> */}
      {/* <Sky /> */}
      <mesh position={[-2, 1, 0]} scale={1.5} castShadow ref={box}>
        <boxGeometry />
        <meshStandardMaterial color="purple" />
      </mesh>
      <mesh position-x={2} position-y={1} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh>
      {/* <mesh position-x={0} position-y={0} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="greenyellow" />
      </mesh> */}
    </>
  );
}
