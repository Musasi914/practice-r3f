import { Canvas } from "@react-three/fiber";
import Expe2 from "./components/Expe2";
import { useState } from "react";

function App() {
  const [rendering, setRendering] = useState(false);
  return (
    <>
      <Canvas frameloop="demand" shadows camera={{ position: [0, 4, 5] }}>
        <Expe2 />
      </Canvas>
      <button
        onClick={() => {
          setRendering(!rendering);
        }}
        style={{ position: "absolute", bottom: 0, left: 0 }}
      >
        rendering
      </button>
    </>
  );
}

export default App;
