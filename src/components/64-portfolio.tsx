import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  Text,
} from "@react-three/drei";
import { Suspense } from "react";
import Computer from "./molecules/Computer";

export default function PortfolioScene() {
  return (
    <>
      <color attach="background" args={["#241a1a"]} />
      <Environment preset="city" />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]} // Vertical limits
        azimuth={[-1, 0.75]} // Horizontal limits
        damping={0.1}
        snap
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={10}
            color={"white"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <Suspense>
            <Computer position-y={-1.2} />
          </Suspense>
          <Text
            font="fonts/bangers-v20-latin-regular.woff"
            fontSize={1}
            position={[2, 0.75, 0.7]}
            rotation-y={-1.25}
          >
            BRUNO SIMON
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} scale={5} blur={2.4} />
    </>
  );
}
