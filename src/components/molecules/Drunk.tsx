import type { BlendFunction } from "postprocessing";
import DrunkEffect from "./DrunkEffect";

export default function Drunk(props: {
  frequency: number;
  amplitude: number;
  ref: React.Ref<DrunkEffect>;
  blendFunction: BlendFunction;
}) {
  const effect = new DrunkEffect(props);
  return <primitive ref={props.ref} object={effect} />;
}
