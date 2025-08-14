import { OrbitControls } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode, ToneMappingMode } from "postprocessing";
import Drunk from "./molecules/Drunk";
import { useRef } from "react";

export default function EffectScene() {
  const drunkRef = useRef(null);
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <EffectComposer multisampling={0}>
        {/* <Vignette
          offset={0.2}
          darkness={0.8}
          blendFunction={BlendFunction.NORMAL}
        />
        <Glitch
          delay={[1.5, 3.5]} // min and max glitch delay
          duration={[0.6, 1.0]} // min and max glitch duration
          strength={[0.3, 1.0]} // min and max glitch strength
          mode={GlitchMode.SPORADIC} // glitch mode
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.85}
        />
        <Noise blendFunction={BlendFunction.SOFT_LIGHT} />
        <Bloom
          intensity={0.5} // The bloom intensity.
          mipmapBlur // Enables or disables mipmap blur.
        />
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        <Drunk
          frequency={20}
          amplitude={0.1}
          ref={drunkRef}
          blendFunction={BlendFunction.DARKEN}
        />

        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
      <ambientLight intensity={1} />
      <directionalLight position={[1, 2, 3]} intensity={2} />
      <OrbitControls />
      <mesh position={[2, 0, 0]} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color="orange"
          // emissive="orange"
          // emissiveIntensity={10}
          // toneMapped={false}
        />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh position={[0, -1.5, 0]} scale={10} rotation-x={-Math.PI / 2}>
        <planeGeometry />
        <meshStandardMaterial color="lightgreen" />
      </mesh>
    </>
  );
}
