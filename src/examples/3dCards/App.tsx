import {
  Environment,
  Image,
  ScrollControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";

import { useRef, useState } from "react";
import {
  DoubleSide,
  Mesh,
  RepeatWrapping,
  ShaderMaterial,
  Vector2,
  type Group,
} from "three";
export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
      <fog attach="fog" args={["#a79", 8.5, 12]} />
      <ScrollControls pages={4} infinite>
        <Rig rotation={[0, 0, 0.15]}>
          <Carousel />
        </Rig>
        <Banner position={[0, -0.15, 0]} rotation={[0, 0, 0.15]} />
      </ScrollControls>
      <Environment preset="dawn" background blur={0.8} />
    </Canvas>
  );
}

function Rig(props: {
  rotation: [number, number, number];
  children: React.ReactNode;
}) {
  const ref = useRef<Group>(null);
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2);

      easing.damp3(
        state.camera.position,
        [state.pointer.x * 2, state.pointer.y + 1.5, 10],
        0.3,
        delta
      );
      state.camera.lookAt(0, 0, 0);
    }
  });
  return (
    <group ref={ref} {...props}>
      {props.children}
    </group>
  );
}

function Carousel() {
  const radius = 1.4;
  const count = 8;
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/3dCards/img${i + 1}_.jpg`}
      position={[
        Math.sin(Math.PI * 2 * (i / count)) * radius,
        0,
        Math.cos(Math.PI * 2 * (i / count)) * radius,
      ]}
      rotation={[0, Math.PI * 2 * (i / count), 0]}
    />
  ));
}

function Card({
  url,
  ...props
}: {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const ref = useRef<Mesh>(null);
  const [hovered, hover] = useState(false);
  useFrame((state, delta) => {
    if (ref.current) {
      easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.2, delta);
      easing.damp(
        ref.current.material,
        "radius",
        hovered ? 0.25 : 0.1,
        0.2,
        delta
      );
      easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
    }
  });
  return (
    <Image
      ref={ref}
      url={url}
      {...props}
      side={DoubleSide}
      transparent
      onPointerOver={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
    />
  );
}

const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vec3 newPosition = position;
    newPosition.y += sin(uv.x * 3.1415 * 4.0 + time) * 0.2;
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vUv = uv;
  }
`;
const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D map;
  uniform vec2 mapRepeat;
  void main() {
    vec4 texColor = texture2D(map, vUv * mapRepeat);
    gl_FragColor = texColor;
  }
`;
function Banner(props: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const ref = useRef<Mesh>(null);
  const texture = useTexture("/3dCards/work_.png");
  texture.wrapS = texture.wrapT = RepeatWrapping;

  const scroll = useScroll();
  useFrame(() => {
    if (ref.current) {
      (ref.current.material as ShaderMaterial).uniforms.time.value +=
        Math.abs(scroll.delta) * 4;
    }
  });
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          map: { value: texture },
          mapRepeat: { value: new Vector2(30, 1) },
        }}
        side={DoubleSide}
      />
    </mesh>
  );
}
