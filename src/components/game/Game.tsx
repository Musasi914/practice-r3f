import Lights from "./Lights";
import Level from "./Level";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import useGame from "../../stores/useGame";

export default function Game() {
  const blockCount = useGame((state) => state.blockCount);
  const blockSeed = useGame((state) => state.blockSeed);
  return (
    <>
      <color attach="background" args={["#bdedfc"]} />
      <OrbitControls makeDefault enabled={false} />
      <Physics debug={false}>
        <Lights />
        <Level count={blockCount} seed={blockSeed} />

        <Player />
      </Physics>
    </>
  );
}
