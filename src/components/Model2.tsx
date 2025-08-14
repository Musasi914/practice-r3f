import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function Model2() {
  const fox = useGLTF("/models/Fox/glTF/Fox.gltf");
  useEffect(() => {
    fox.scene.traverse((child) => (child.castShadow = true));
  }, [fox.scene]);
  const { actions } = useAnimations(fox.animations, fox.scene);

  useEffect(() => {
    // actionsが存在し、Runアニメーションがある場合のみ再生するように安全に記述します
    if (actions && actions.Run) {
      actions.Run.play();
      setTimeout(() => {
        actions.Survey.play();
        actions.Survey.crossFadeFrom(actions.Run, 1);
      }, 1000);
    }
  }, []);

  return <primitive object={fox.scene} scale={0.02} castShadow />;
}
