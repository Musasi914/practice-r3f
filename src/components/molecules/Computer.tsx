import { Html, useGLTF } from "@react-three/drei";
import type { ComponentProps } from "react";

// React.ComponentProps<'primitive'>は、primitiveコンポーネントに渡せるpropsの型を自動的に取得します。
export default function Computer(
  // objectプロパティを必須にせず、propsの型を拡張してobjectを省略可能にします
  props: Omit<ComponentProps<"primitive">, "object">
) {
  // useGLTFで3Dモデルを読み込んでいます。非同期処理ですが、dreiが内部でローディングを管理してくれます。
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  return (
    <primitive object={computer.scene} {...props}>
      <Html
        transform
        distanceFactor={1.1}
        position={[0, 1.5, -1.4]}
        rotation-x={-0.256}
      >
        <iframe
          src="https://loadmap.vercel.app/"
          style={{
            width: "1080px",
            height: "720px",
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "black",
          }}
        ></iframe>
      </Html>
    </primitive>
  );
}
