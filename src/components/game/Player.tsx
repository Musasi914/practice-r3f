import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import useGame from "../../stores/useGame";

export default function Player() {
  const body = useRef<RapierRigidBody>(null);
  const [sub, get] = useKeyboardControls();
  const [smoothedCameraPosition] = useState(new Vector3(10, 10, 10));
  const [smoothedCameraTarget] = useState(new Vector3());

  const { rapier, world } = useRapier();

  // zustand
  const phase = useGame((state) => state.phase);
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blockCount = useGame((state) => state.blockCount);

  useFrame(({ camera }, delta) => {
    // 物体の移動
    const { moveForward, moveBackward, moveLeft, moveRight } = get();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulesStrength = delta * 0.6;
    const torqueStrength = delta * 0.2;

    if (moveForward) {
      impulse.z -= impulesStrength;
      torque.x -= torqueStrength;
    }

    if (moveBackward) {
      impulse.z += impulesStrength;
      torque.x += torqueStrength;
    }

    if (moveLeft) {
      impulse.x -= impulesStrength;
      torque.z += torqueStrength;
    }

    if (moveRight) {
      impulse.x += impulesStrength;
      torque.z -= torqueStrength;
    }

    body.current?.applyImpulse(impulse, true);
    body.current?.applyTorqueImpulse(torque, true);

    // カメラ
    const bodyPosition = body.current?.translation();
    if (!bodyPosition) return;

    const cameraPosition = new Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.y += 0.65;
    cameraPosition.z += 2.25;

    const cameraTarget = new Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    camera.position.copy(smoothedCameraPosition);
    camera.lookAt(smoothedCameraTarget);

    //zustand
    if (bodyPosition.z < -(blockCount * 4 + 2)) {
      end();
    }

    if (bodyPosition.y < -4) {
      restart();
    }

    // console.log(phase);
  });

  // jump
  const jump = () => {
    const origin = body.current?.translation();
    if (!origin) return;
    origin.y -= 0.32;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);
    if (hit?.timeOfImpact != null && hit.timeOfImpact < 0.15) {
      body.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
    }
  };
  useEffect(() => {
    return sub(
      (state) => state.jump,
      (pressed) => {
        if (pressed) {
          jump();
        }
      }
    );
  }, []);

  // zustand
  const reset = () => {
    body.current?.setTranslation({ x: 0, y: 1, z: 0 }, true);
    body.current?.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.current?.setAngvel({ x: 0, y: 0, z: 0 }, true);
    restart();
  };
  useEffect(() => {
    return sub(() => {
      // any key pressed
      start();
    });
  });

  useEffect(() => {
    return useGame.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          reset();
        }
      }
    );
  });

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      position={[0, 1, 0]}
      restitution={0.2}
      friction={1}
      linearDamping={1.5}
      angularDamping={1.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
}
