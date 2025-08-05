import { useEffect, useMemo, useRef } from "react";
import type { BufferGeometry } from "three";
import { DoubleSide } from "three";

export default function CustomObject() {
  const geometryRef = useRef<BufferGeometry>(null);
  const verticesCount = 10 * 3;

  useEffect(() => {
    geometryRef.current?.computeVertexNormals();
  }, []);

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, [verticesCount]);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  );
}
