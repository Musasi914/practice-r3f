import {
  Center,
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei";

export default function PortalScene() {
  const { nodes } = useGLTF("portal/model/portal.glb");
  console.log(nodes);
  const bakedTexture = useTexture("portal/model/baked.jpg");
  bakedTexture.flipY = false;
  return (
    <>
      <color attach="background" args={["#030202"]} />
      <OrbitControls />
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        />
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        />
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        />
        <Sparkles
          count={40}
          scale={[3, 2, 3]}
          position-y={1}
          size={10}
          // speed={0.01}
          // color="white"
        />
      </Center>
    </>
  );
}
