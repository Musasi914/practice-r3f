import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export default function DebugMesh() {
  const { position, color, visible } = useControls("box", {
    position: {
      value: { x: -2, y: 0 },
      min: { x: -4, y: -4 },
      max: { x: 4, y: 4 },
      step: 0.01,
      joystick: "invertY",
    },
    color: "#ff0000",
    visible: true,
  });
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 2, 3]} intensity={3} />
      <mesh position={[position.x, position.y, 0]} scale={1.5} visible={visible}>
        <boxGeometry />
        <meshPhongMaterial color={color} />
      </mesh>
      <mesh position-x={2}>
        <sphereGeometry />
        <meshPhongMaterial color="yellow" />
      </mesh>
      <mesh position-x={0} position-y={-1} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 10]} />
        <meshPhongMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
